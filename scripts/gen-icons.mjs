import sharp from "sharp";
import { writeFileSync } from "node:fs";

const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="55%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#g)"/>
  <g fill="none" stroke="#fff" stroke-width="${size * 0.07}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M${size * 0.3} ${size * 0.38} l ${size * 0.14} ${size * 0.12} - ${size * 0.14} ${size * 0.12}"/>
    <path d="M${size * 0.52} ${size * 0.62} h ${size * 0.18}"/>
  </g>
</svg>`;

for (const size of [192, 512]) {
  const buf = await sharp(Buffer.from(svg(size))).png().toBuffer();
  writeFileSync(`public/icon-${size}.png`, buf);
}
console.log("icons written");
