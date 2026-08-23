from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SIZE = 1024

canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(canvas)
draw.rounded_rectangle(
    (72, 72, SIZE - 72, SIZE - 72),
    radius=220,
    fill=(8, 10, 13, 255),
)

cyan = (91, 242, 223, 255)
white = (255, 255, 255, 170)
pink = (255, 93, 162, 255)

draw.line(((430, 270), (270, 270), (270, 430)), fill=cyan, width=26, joint="curve")
draw.line(((594, 270), (754, 270), (754, 430)), fill=cyan, width=26, joint="curve")
draw.line(((270, 594), (270, 754), (430, 754)), fill=cyan, width=26, joint="curve")
draw.line(((594, 754), (754, 754), (754, 594)), fill=cyan, width=26, joint="curve")
draw.line(((380, 512), (644, 512)), fill=white, width=10)
draw.polygon(
    ((512, 466), (558, 512), (512, 558), (466, 512)),
    fill=pink,
)

for filename, size in (("favicon.png", 64), ("apple-touch-icon.png", 180)):
    icon = canvas.resize((size, size), Image.Resampling.LANCZOS)
    icon.save(PUBLIC / filename, optimize=True)
