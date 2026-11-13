# Moving Out Sale

Static bilingual (EN/ES) sale page. No build step. Edit only `data.js`.

## Change an item's status
In `data.js`, set `status` to `"available"`, `"booked"` or `"sold"`. Sold items are dimmed and the button is disabled; booked items show "Ask anyway". Update `CONFIG.lastUpdated` too.

## Add photos
Photos named `real-*.jpg` are your own; `ml-*.jpg` come from the MercadoLibre/Tata product pages. Real photos are listed first in each item.
Copy photos into `images/` and list the paths:
`images: ["images/tv-1.jpg", "images/tv-2.jpg"]`. With no images, a placeholder is shown. Keep photos reasonably small (under ~300 KB each).

## Set the WhatsApp number
`CONFIG.whatsapp` in `data.js`: digits only, country code 598, no `+`, no leading 0. Example: `"59899123456"`.

## After editing
When you change `data.js`, `app.js` or `styles.css`, bump the `?v=` number on its `<script>`/`<link>` tag in `index.html` (e.g. `?v=2` → `?v=3`) so visitors' browsers load the new version.

## Preview
Open `index.html` directly, or run `python3 -m http.server 8000`.

## Deploy
- **GitHub Pages**: push to a repo, then Settings > Pages > deploy from branch `main`, folder `/ (root)`.
- **Netlify**: drag and drop the folder at app.netlify.com/drop, or connect the repo (no build command, publish directory `.`).
