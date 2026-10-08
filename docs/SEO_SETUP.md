# Vera Ecosystem waitlist SEO setup

## Implementation overview

The Vite entry document contains the page title and description, canonical URL, indexing directives, social-sharing metadata, and one JSON-LD graph describing the Organization and WebSite. The public directory contains crawler instructions, a one-URL XML sitemap, the Google Search Console verification file, the branded social preview image, and the existing Vera assets. The page keeps its existing React waitlist, interactions, and animations; the main heading now clearly describes idea validation, and below-the-fold partner marks are lazy-loaded. Reduced-motion preferences are already respected by the site stylesheet.

There are no external fonts or newly added runtime dependencies. Vercel's Vite build serves files from `public/` at the site root and serves these exact static paths ahead of the SPA entry document. There is no Vercel rewrite configuration in this project, so no rewrite is needed.

## SEO-related files

- `index.html` — language, viewport, metadata, canonical, icons, and structured data.
- `src/App.tsx` — meaningful validation-led H1/copy and lazy loading for partner images.
- `public/googlef8250451ac82f5f9.html` — Google Search Console HTML verification file.
- `public/robots.txt` — crawler access and sitemap location.
- `public/sitemap.xml` — canonical public homepage.
- `public/og-image.png` — 1200 × 630 Vera-branded social preview.
- `public/favicon.svg` — existing branded favicon (retained).
- `public/assets/vera-logo.png` — existing brand logo used for the Apple touch icon and Organization logo.
- `docs/SEO_SETUP.md` — this guide.

## Google Search Console verification

1. Deploy the production build to `https://waitlist.veraecosystem.com/`.
2. In Google Search Console, add or open the property for the waitlist host and choose the HTML file verification method.
3. Before clicking Verify, open `https://waitlist.veraecosystem.com/googlef8250451ac82f5f9.html` in a private browser window. Confirm it returns HTTP 200 and exactly `google-site-verification: googlef8250451ac82f5f9.html`, without a login or redirect to the application.
4. Click **Verify** in Search Console. Verification is not complete until Google confirms it there; deploying this file alone does not verify the property.
5. Leave the verification file publicly deployed while the property depends on it.

No DNS/SPF record changes are part of this HTML-file verification method.

## Deploying on Vercel

Use the existing Vercel project connected to this repository. Select the Vite framework preset, use `npm run build` as the build command, and `dist` as the output directory. Ensure the production domain `waitlist.veraecosystem.com` is assigned to that project and HTTPS is enabled. Deploy after merging/pushing these changes, then run the production URL checks below.

Do not add a catch-all rewrite that sends public static file requests to `index.html`. Vercel serves Vite `public/` files from the root of `dist/` by default; the project currently has no `vercel.json` rewrite that supersedes this behavior.

## Submit the sitemap

After deployment, open `https://waitlist.veraecosystem.com/sitemap.xml` and confirm it returns the XML sitemap containing only the canonical homepage. In Search Console, select the waitlist property, open **Sitemaps**, submit `sitemap.xml`, and review the processing status and any reported errors.

## Test robots.txt and static files

Open `https://waitlist.veraecosystem.com/robots.txt` and confirm it returns HTTP 200 with `Allow: /` and the sitemap URL. Verify that neither the landing page nor the Google file is disallowed. Also check the verification URL and `https://waitlist.veraecosystem.com/og-image.png` return HTTP 200. These checks require a live deployment; a successful local build only confirms the files are included in the build output.

## Test social previews

Use the public production URL with the Facebook Sharing Debugger, LinkedIn Post Inspector, and a social-card validator for X/Twitter. If a platform has cached an older preview, request a re-scrape there. Confirm that the title, description, and 1200 × 630 image appear as expected. Messaging apps such as WhatsApp may cache previews independently.

## Inspect indexing status

In Search Console, use URL Inspection for `https://waitlist.veraecosystem.com/`. Test the live URL, review the page Google can fetch, then request indexing after deployment. Later, check indexed status, crawl/indexing issues, and sitemap discovery in Search Console. A successful request is not a guarantee or an immediate confirmation of indexing.

## Measure SEO and performance

- Use PageSpeed Insights on the deployed URL for mobile and desktop Core Web Vitals and Lighthouse diagnostics.
- Use Search Console's Core Web Vitals report and Performance report for real-user field data, queries, impressions, clicks, and average position as data becomes available.
- Re-test the production page after significant content, asset, or script changes. Check Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift, and compare mobile results as well as desktop.
- Test the responsive layout and waitlist form manually after deployment. Confirm animations still work and that reduced-motion settings suppress them.

## Maintenance recommendations

- Keep the title, description, canonical, social preview, and on-page copy accurate as the waitlist offering changes.
- Keep the sitemap limited to live, canonical, indexable pages; update it when real public pages are launched.
- Recheck verification and public static URLs after deployment or routing changes.
- Use descriptive alt text for meaningful images, optimize newly added image assets, and lazy-load only offscreen content.
- Review Search Console coverage, crawl issues, search queries, and Core Web Vitals regularly. Avoid unsupported claims, keyword stuffing, and fabricated organization details or profiles.

## When veraecosystem.com launches

Make `https://veraecosystem.com/` the canonical homepage and primary Search Console property if it becomes the official main site. Move the Organization and WebSite canonical identity/URLs and logo references to the live main domain, and maintain a sitemap on that domain containing its real public pages. Update internal links, structured data, social metadata, and other brand references to the main domain where appropriate. Decide whether the waitlist subdomain remains a distinct, useful landing page or becomes a permanent redirect to the corresponding main-site waitlist page; avoid serving duplicate homepage content with competing canonicals. If the subdomain remains independently useful, keep a self-canonical URL for its distinct content and use accurate organization references to the main site. Re-submit the main-domain sitemap and verify the main domain in Search Console. Do not redirect or retire the Google verification file/property until Search Console ownership and any migration requirements are handled.

## Remaining manual actions

- Deploy these changes to Vercel and confirm the production hostname and HTTPS.
- Verify the HTML file in Google Search Console; verification is intentionally not claimed as complete here.
- Submit the sitemap in Search Console and request indexing.
- Test live robots, verification, and social preview URLs after deployment; those production checks cannot be established by a local build.
