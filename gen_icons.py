#!/usr/bin/env python3
"""Generate simple PNG icons for the Bassie PWA."""
import struct, zlib, math

def make_png(size, bg_color, emoji_char=None):
    """Create a simple solid-color PNG with a snake emoji-style icon."""
    w = h = size
    # Simple dark background with a green circle
    pixels = []
    cx, cy, r = w/2, h/2, w*0.42

    for y in range(h):
        row = []
        for x in range(w):
            dx, dy = x - cx, y - cy
            dist = math.sqrt(dx*dx + dy*dy)

            if dist <= r:
                # Green circle
                row.extend([78, 203, 113, 255])
            elif dist <= r + 3:
                # Slight border
                row.extend([39, 100, 56, 255])
            else:
                # Dark bg
                row.extend([13, 13, 26, 255])
        pixels.append(row)

    # Build PNG
    def chunk(name, data):
        c = name + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)

    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)  # 8-bit RGB
    # RGBA = colortype 6
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)

    raw = b''
    for row in pixels:
        raw += b'\x00' + bytes(row)

    idat = zlib.compress(raw, 9)

    return (
        b'\x89PNG\r\n\x1a\n' +
        chunk(b'IHDR', ihdr) +
        chunk(b'IDAT', idat) +
        chunk(b'IEND', b'')
    )

for size in [192, 512]:
    data = make_png(size, (13, 13, 26))
    with open(f'icon-{size}.png', 'wb') as f:
        f.write(data)
    print(f'icon-{size}.png written ({len(data)} bytes)')
