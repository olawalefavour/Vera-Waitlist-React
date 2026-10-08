# Form collector verification

The form uses exactly the endpoint and public submission token from the supplied screenshots. No real signup was sent while building.

Mocked checks passed for field mapping, accepted JSON acknowledgement, invalid email, failed HTTP responses, HTML fallback, negative acknowledgements and network errors. TypeScript compilation passed.

Live collector verification remains outstanding: read-only GET/OPTIONS checks received HTTP 403 from this environment. A prior HEAD response was HTML. Neither establishes how a valid POST behaves in a visitor browser, so successful live collection has not been verified.

Before inviting visitors, submit your own test email in the page and confirm its record in your collector dashboard. If the browser blocks the request, allow the deployed origin in the collector CORS configuration. If POST returns HTML, configure /api/public/submit to reach the submission handler, or update src/lib/waitlist.ts with the collector’s working public API URL. Success must return JSON such as {"success":true}.

The page deliberately displays an error rather than falsely claiming a registration was saved. This project contains no independent database; signup records belong to your form collector.

The preview is published privately for review. Make the site public when ready to collect signups from others.
