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

draw = ImageDraw.Draw(canvas)
draw.ellipse((250, 330, 630, 710), outline=(91, 242, 223, 255), width=24)
draw.ellipse((394, 330, 774, 710), outline=(255, 93, 162, 255), width=24)
draw.polygon(
    ((512, 472), (560, 520), (512, 568), (464, 520)),
    fill=(255, 255, 255, 255),
)

for filename, size in (("favicon.png", 64), ("apple-touch-icon.png", 180)):
    icon = canvas.resize((size, size), Image.Resampling.LANCZOS)
    icon.save(PUBLIC / filename, optimize=True)
