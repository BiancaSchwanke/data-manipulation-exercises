const path = require("path");

const COLORS = {
  black: "000000",
  lime: "DAFF94",
  coral: "FF7C51",
  white: "FFFFFF",
};

// Real brand fonts (bundled in the brand-guidelines skill as actual .ttf files).
// PowerPoint/LibreOffice render these correctly only if the fonts are installed
// locally, or the .pptx has "embed fonts in file" turned on before sharing —
// pptxgenjs itself can't embed them. See brand-guidelines/SKILL.md.
const FONT_TITLE = "Libre Baskerville";
const FONT_MONO = "JetBrains Mono";
const FONT_BODY = "Arial";

// Real texture/icon assets extracted straight from the report PDF (see
// brand-guidelines/assets/textures/ and the extraction script in this skill)
// instead of approximating them with text glyphs.
let TEXTURES_DIR = null;
function setTexturesDir(dir) {
  TEXTURES_DIR = dir;
}
function tex(name) {
  if (!TEXTURES_DIR) throw new Error("call setTexturesDir(dir) before using texture-based helpers");
  return path.join(TEXTURES_DIR, name);
}

// The arrow icon asset points NE (↗) by default. pptxgenjs `rotate` is in
// clockwise degrees, so rotating it 90/180/270 walks it around the other
// three corners without needing four separate source images.
const ARROW_ROTATION = { NE: 0, SE: 90, SW: 180, NW: 270 };

function addPlusGridTexture(slide, { slideW, slideH }) {
  // Real asset is a 1920x1080 (16:9) full-bleed tile — only stretch it onto
  // a 16:9 canvas, or the crosses go oval. Use addPlusGrid (glyph-based) for
  // any other aspect ratio, e.g. the 4:5 Instagram canvas.
  slide.addImage({ path: tex("plus-grid-on-black.png"), x: 0, y: 0, w: slideW, h: slideH });
}

function addPlusGrid(slide, { color, x0, y0, cols, rows, dx, dy, size = 10 }) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      slide.addText("+", {
        x: x0 + c * dx - 0.15,
        y: y0 + r * dy - 0.15,
        w: 0.3,
        h: 0.3,
        fontFace: FONT_BODY,
        fontSize: size,
        color,
        align: "center",
        valign: "middle",
        margin: 0,
      });
    }
  }
}

function addCornerArrows(slide, { colorName = "lime", slideW, slideH, inset = 0.35, size = 0.35 }) {
  const iconPath = tex(`arrow-${colorName}.png`);
  const corners = [
    { key: "NW", x: inset, y: inset },
    { key: "NE", x: slideW - inset - size, y: inset },
    { key: "SW", x: inset, y: slideH - inset - size },
    { key: "SE", x: slideW - inset - size, y: slideH - inset - size },
  ];
  corners.forEach((c) => {
    slide.addImage({ path: iconPath, x: c.x, y: c.y, w: size, h: size, rotate: ARROW_ROTATION[c.key] });
  });
}

function addGlobeIcon(slide, { x, y, size = 0.3, colorName = "black" }) {
  slide.addImage({ path: tex(`globe-${colorName}.png`), x, y, w: size, h: size });
}

function addOvalBadge(slide, text, { x, y, w, h, lineColor, textColor, colorName = "black", fontSize = 20, withGlobe = true }) {
  slide.addShape("ellipse", {
    x,
    y,
    w,
    h,
    fill: { type: "none" },
    line: { color: lineColor, width: 1.5 },
  });
  slide.addText(text, {
    x,
    y,
    w,
    h,
    align: "center",
    valign: "middle",
    italic: true,
    fontFace: FONT_TITLE,
    fontSize,
    color: textColor,
    margin: 0,
  });
  if (withGlobe) {
    const size = h * 0.42;
    addGlobeIcon(slide, { x: x + w - size * 0.7, y: y + h / 2 - size / 2, size, colorName });
  }
}

function addDiagonalArrow(slide, { x, y, colorName = "lime", size = 0.32 }) {
  slide.addImage({ path: tex(`arrow-${colorName}.png`), x, y, w: size, h: size, rotate: ARROW_ROTATION.SE });
}

// Same source asset as addDiagonalArrow/addCornerArrows, but lets the caller
// pick which corner the arrow points to instead of assuming SE.
function addArrowIcon(slide, { x, y, size = 0.32, colorName = "lime", corner = "NE" }) {
  slide.addImage({ path: tex(`arrow-${colorName}.png`), x, y, w: size, h: size, rotate: ARROW_ROTATION[corner] });
}

function addLogo(slide, logoAbsPath, { x, y, w }) {
  const h = w / 3.336; // native aspect ratio of arpejo-report-logo.png
  slide.addImage({ path: logoAbsPath, x, y, w, h });
}

function addHeaderStrip(slide, { slideW, color, month, fontSize = 10, yOffset = 0.25 }) {
  slide.addText("report↗", {
    x: 0.4,
    y: yOffset,
    w: 2,
    h: 0.3,
    fontFace: FONT_MONO,
    bold: true,
    fontSize,
    color,
    align: "left",
    margin: 0,
  });
  slide.addText("arpejo", {
    x: slideW / 2 - 1,
    y: yOffset,
    w: 2,
    h: 0.3,
    fontFace: FONT_TITLE,
    italic: true,
    fontSize,
    color,
    align: "center",
    margin: 0,
  });
  slide.addText(month, {
    x: slideW - 2.4,
    y: yOffset,
    w: 2,
    h: 0.3,
    fontFace: FONT_MONO,
    fontSize,
    color,
    align: "right",
    margin: 0,
  });
}

module.exports = {
  COLORS,
  FONT_TITLE,
  FONT_MONO,
  FONT_BODY,
  setTexturesDir,
  addPlusGrid,
  addPlusGridTexture,
  addCornerArrows,
  addGlobeIcon,
  addOvalBadge,
  addDiagonalArrow,
  addArrowIcon,
  addLogo,
  addHeaderStrip,
};
