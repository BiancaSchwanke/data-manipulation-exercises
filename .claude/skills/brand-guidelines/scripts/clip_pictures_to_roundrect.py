"""
Fix pptxgenjs's missing "clip image to rounded rect" support.

pptxgenjs can only clip a picture to a rect or an ellipse (`rounding: true`
in addImage only ever emits `prstGeom prst="ellipse"` — see its source,
there's no roundRect option). The common workaround scripts in this repo use
is to draw a rounded-rect *outline* on top of a plain rectangular photo to
fake a framed look. That doesn't actually clip anything: the photo's own
square corners still stick out past the outline's rounded corners, which
shows up as a visible "leak" of image pixels at each corner.

The OOXML format itself has no such limitation — a `<p:pic>` can carry a
`roundRect` preset geometry exactly like an autoshape can, PowerPoint and
LibreOffice both honor it. This script finds every `<p:pic>` immediately
followed by a `<p:sp>` outline shape with matching position/size and a
`roundRect` geometry (the exact "fake frame" pattern above), copies that
roundRect geometry (radius included) onto the picture itself, and leaves the
outline shape in place on top (now redundant as a mask, still fine as a
crisp 1px border). Slides without this pattern are left untouched.

Usage: python3 clip_pictures_to_roundrect.py deck.pptx [-o out.pptx]
"""
import argparse, re, shutil, zipfile, pathlib

PIC_OR_SP = re.compile(r"<p:pic>.*?</p:pic>|<p:sp>.*?</p:sp>", re.S)
OFF_EXT = re.compile(r'<a:off x="(\d+)" y="(\d+)"/>\s*<a:ext cx="(\d+)" cy="(\d+)"/>')
PRSTGEOM = re.compile(r'<a:prstGeom prst="(\w+)">(.*?)</a:prstGeom>', re.S)
PIC_PRSTGEOM_RECT = re.compile(r'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>')


def geom_key(block):
    m = OFF_EXT.search(block)
    return m.groups() if m else None


def fix_slide_xml(xml):
    blocks = list(PIC_OR_SP.finditer(xml))
    changed = False
    out = xml
    # Walk pairs looking for <p:pic> immediately followed by a roundRect <p:sp>
    # with the same off/ext.
    for i in range(len(blocks) - 1):
        pic_m, sp_m = blocks[i], blocks[i + 1]
        pic_block, sp_block = pic_m.group(0), sp_m.group(0)
        if not pic_block.startswith("<p:pic>") or not sp_block.startswith("<p:sp>"):
            continue
        sp_geom = PRSTGEOM.search(sp_block)
        if not sp_geom or sp_geom.group(1) != "roundRect":
            continue
        if geom_key(pic_block) != geom_key(sp_block):
            continue
        pic_geom = PRSTGEOM.search(pic_block)
        if not pic_geom or pic_geom.group(1) != "rect":
            continue
        new_pic_block = (
            pic_block[: pic_geom.start()]
            + f'<a:prstGeom prst="roundRect">{sp_geom.group(2)}</a:prstGeom>'
            + pic_block[pic_geom.end() :]
        )
        out = out.replace(pic_block, new_pic_block, 1)
        changed = True
    return out, changed


def process(pptx_path, out_path):
    pptx_path, out_path = pathlib.Path(pptx_path), pathlib.Path(out_path)
    if pptx_path != out_path:
        shutil.copyfile(pptx_path, out_path)

    with zipfile.ZipFile(pptx_path) as zin:
        names = zin.namelist()
        contents = {n: zin.read(n) for n in names}

    total_fixed = 0
    for name in names:
        if not re.match(r"ppt/slides/slide\d+\.xml$", name):
            continue
        xml = contents[name].decode("utf-8")
        new_xml, changed = fix_slide_xml(xml)
        if changed:
            n_fixed = len(re.findall(r'<a:prstGeom prst="roundRect">', new_xml)) - len(
                re.findall(r'<a:prstGeom prst="roundRect">', xml)
            )
            total_fixed += n_fixed
            contents[name] = new_xml.encode("utf-8")

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zout:
        for name in names:
            zout.writestr(name, contents[name])

    print(f"clipped {total_fixed} picture(s) to their matching rounded-rect frame in {out_path}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("pptx")
    ap.add_argument("-o", "--output")
    args = ap.parse_args()
    process(args.pptx, args.output or args.pptx)
