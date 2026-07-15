# React Netlify Site

A responsive React 19 starter built with Vite and configured for automatic Netlify production deployments through GitHub Actions.

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

## CI/CD

The deployment flow mirrors `tristansly.com`:

1. Push to `master`.
2. GitHub Actions installs dependencies, lints, and builds the site.
3. `nwtgck/actions-netlify@v3` publishes `dist` as the production deploy.

The GitHub repository needs these Actions secrets:

- `NETLIFY_AUTH_TOKEN`: a Netlify personal access token.
- `NETLIFY_SITE_ID`: the API ID of the Netlify site.

Never commit either value. The included `netlify.toml` contains only public build and routing configuration.

## Netlify plan

This is a static site with no Functions, databases, forms, paid extensions, or automatic recharge requirements. It is compatible with Netlify's Free plan and remains subject to the account's included usage limits.
