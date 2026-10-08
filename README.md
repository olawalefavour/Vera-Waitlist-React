# Vera Ecosystem — React waitlist

## Open in VS Code

Extract this project, open its folder in VS Code, and use Node.js 22.13 or newer:

```bash
npm install
npm run dev
```

Open the local address printed in the terminal. To create and inspect a production build:

```bash
npm run build
npm run preview
```

Deploy `dist/` to a static hosting provider. For Vercel, select Vite, build command `npm run build`, output directory `dist`.

## Edit these files

* `src/App.tsx`: copy, page sections, FAQ, form, and video dialog.
* `src/index.css`: colours, layouts, responsive breakpoints, and motion.
* `src/lib/waitlist.ts`: your form collector URL and public submit-only key.
* `public/assets`: supplied logos and 42-second video.
* `index.html`: title, description, and favicon.

The collector receives `access_key`, `name`, `email`, and `message`. The message contains the chosen role and optional idea. The form has loading, success, timeout, and error states. It does not report success for an HTML response or failed request. The token is intentionally public and submit-only, as documented in your integration screenshot.

The endpoint and token match the supplied integration screenshots. Your collector must support JSON POST requests and allow CORS from localhost and your deployed domain. No real waitlist entries were submitted during development. See INTEGRATION-NOTES.md for the connection result.

The Foundry tabs are illustrative previews, not a working AI product. Only the supplied community URL is used; verified social/contact links can be added later. The short privacy and terms notices describe this waitlist; edit them to match your operations before public launch.

The supplied video is included exactly as provided. Its footage and audio are inherited from that original file. Original logos are preserved and cropped visually with CSS.

Built with React 19, TypeScript, Vite, Tailwind CSS, Radix UI, and Lucide. CSS motion respects reduced-motion preferences. Optional WebMCP support opens the visible form and never submits information.
