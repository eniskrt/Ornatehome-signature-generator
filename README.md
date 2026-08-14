# Ornate Home Email Signature Generator

A lightweight Next.js application for creating standardized, email-safe Ornate Home signatures. Employee data stays in the browser and the copied result is a table-based HTML fragment compatible with Gmail, Outlook, and Apple Mail.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Local image URLs are suitable for previewing only; recipients cannot access them.

## Production build

```bash
npm run build
npm start
```

## Deploying to Vercel

Import the repository into Vercel, keep the detected Next.js settings, add the environment variable below, and deploy. Point `signature.ornatehome.com` to the Vercel project when the custom domain is ready.

## Environment variable

Set this in Vercel for Production (and Preview if desired):

```text
NEXT_PUBLIC_SIGNATURE_BASE_URL=https://signature.ornatehome.com
```

The generator uses this value to create absolute image URLs in copied signatures. Without it, the current browser origin is used and the app displays a warning on localhost.

After the first Vercel deployment, copy the production URL and set it as `NEXT_PUBLIC_SIGNATURE_BASE_URL` under **Project Settings → Environment Variables** for Production. Redeploy after changing this public variable because Next.js includes it in the browser build. If a custom domain is added later, update the value to that domain and redeploy once more.

## Replacing designer assets

Replace the placeholder PNG files in `public/assets/signature/` without changing their names:

- `ornate-home-logo.png`
- `inc-5000-2026.png`
- `phone.png`
- `email.png`
- `location.png`
- `website.png`

The logo renders at 205px wide, the Inc. artwork at 145px, and contact icons at 17×17px. Supplying artwork near 2× those dimensions produces sharp results on high-density displays. The Inc. PNG should include its ranking text; the HTML does not duplicate it.

Designer contact-icon SVGs live in `public/assets/signature/svg-icons/`. Run `npm run assets:icons` after replacing them. This creates the 34×34 transparent PNG versions used by the email signature, preserving compatibility with Outlook clients that do not reliably display SVG images.

## Gmail usage

1. Open the deployed generator and enter the employee details.
2. Select **Copy Signature**.
3. In Gmail, open Settings → See all settings → General → Signature.
4. Paste into the signature editor and save changes.

## Outlook usage

1. Open the deployed generator and enter the employee details.
2. Select **Copy Signature**.
3. In Outlook, open Settings → Accounts → Signatures (or Mail → Compose and reply).
4. Create or edit a signature, paste it, and save.

**Copy HTML** places the raw HTML source on the clipboard for IT or developer use. Employee values are HTML-escaped before insertion, and phone, email, website, and map destinations are generated as clickable links.
