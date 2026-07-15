# Portfolio image assets

These folders contain web-ready derivatives of Jean Ruiu's original photographs. The originals in `/home/tristan/Downloads/photos` are preserved unchanged.

- `portfolio/full/`: 2400 px long edge, used only by the full-screen viewer and hero.
- `portfolio/display/`: 1400 px long edge, used by the homepage and opening sequence.
- `portfolio/thumb/`: 360 px long edge, used by the viewer filmstrip and 69-frame index.

All derivatives are metadata-stripped sRGB WebP files. `src/portfolioData.js` maps filenames to ordered frame metadata and descriptive alternative text.

`jean-ruiu-headshot.webp` is the optimized contact-section self-portrait sourced from `/home/tristan/Downloads/headshto.jpg`; the original remains unchanged.

`social/jean-ruiu-photography.jpg` is the metadata-stripped 1200 × 630 Open Graph crop of `portfolio/full/dsf-8226.webp`, used for large link previews on Discord and other social platforms.

When adding a photograph, export the same normalized filename into all three directories and add its metadata to `rawFrames` in `src/portfolioData.js`.
