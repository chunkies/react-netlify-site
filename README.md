# Jean Ruiu Photography Portfolio

A responsive React 19 photography portfolio built with Vite. It presents 69 original photographs in a curated homepage sequence, full-screen viewer, and complete visual index.

## Local development

```bash
npm install
npm run dev
```

Before committing a change, run:

```bash
npm run lint
npm run build
```

## Photography assets

The source photographs remain untouched in `/home/tristan/Downloads/photos`. Web-ready, metadata-stripped sRGB derivatives live under `public/images/portfolio/`:

- `full/`: 2400 px long edge for the full-screen viewer.
- `display/`: 1400 px long edge for the homepage and opening sequence.
- `thumb/`: 360 px long edge for the filmstrip and complete index.

`src/portfolioData.js` is the ordered source of truth for all 69 frames, their descriptive alternative text, categories, image paths, and homepage selections. Add a matching image to each size directory, then add one entry to `rawFrames`. Every entry automatically appears in the viewer and index.

The viewer supports previous/next controls, thumbnail selection, Left/Right arrow keys, `I` for the complete index, Escape to close, focus trapping, focus restoration, and horizontal swipe gestures on touch screens.

The motion system uses premium, low-amplitude entrances and image reveals. It automatically removes spatial movement and parallax when the visitor enables `prefers-reduced-motion`.

## CI/CD

The deployment flow mirrors `tristansly.com` without enabling a second Netlify-native Git deploy:

1. Pull requests install dependencies, lint, and build for validation.
2. A push to `master` repeats validation.
3. After validation, `nwtgck/actions-netlify@v3` publishes `dist` as the production deploy.

The workflow can also be run manually. Manual runs only deploy when they target `master`; other branches are validation-only.

The GitHub repository needs these Actions secrets:

- `NETLIFY_AUTH_TOKEN`: a Netlify personal access token.
- `NETLIFY_SITE_ID`: the API ID of the Netlify site.

Never commit either value. The included `netlify.toml` contains only public build and routing configuration. Matching `_redirects` and `_headers` files live under `public/` so the GitHub Action includes those rules in the uploaded `dist` directory.

## Custom domain

`jeanruiu.com` is attached to the Netlify site and uses external DNS at GoDaddy. The apex points to Netlify with `A @ 75.2.60.5`; `www` should be a CNAME to `tristan-react-launchpad.netlify.app`. Keep the GoDaddy nameservers and existing email/DKIM records unchanged.

The production portfolio uses Jean's approved Gmail address, Instagram profile, phone number, and self-portrait. Search indexing is enabled for the published site.

## Netlify plan

This is a static site with no Functions, databases, forms, paid extensions, or automatic recharge requirements. It is compatible with Netlify's Free plan and remains subject to the account's included usage limits.
