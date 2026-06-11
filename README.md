# Wizards of Learning Site

Landing page prototype for Wizards of Learning built with React, Vite, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

## Google Sheet-driven content flow

This repo supports a simple Google Sheet workflow for a static site:

1. Edit the content in one Google Sheet.
2. Pull the content into [src/siteContent.js](./src/siteContent.js) with a script.
3. Build and deploy the static site as usual.

### Setup

1. Create a Google Sheet from [GOOGLE_SHEET_TEMPLATE.csv](./GOOGLE_SHEET_TEMPLATE.csv).
2. Publish the content tab as CSV or use its export URL.
3. Copy `.env.example` to `.env.local`.
4. Put your `GOOGLE_SHEET_CSV_URL` into `.env.local`.

### Pull content from Google Sheet

```bash
npm run sheet:pull
```

After that, rebuild or redeploy:

```bash
npm run build
npm run deploy
```

## Deploy

```bash
npm run deploy
```
