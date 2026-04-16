# Localhost Title Prefix

Chrome extension (Manifest V3) that prepends a configurable prefix to the `<title>` of tabs whose hostname matches user-defined rules. Handy for spotting a dev tab at a glance among a stack of production tabs.

Example: on `app.localhost`, the title `My App` becomes `🟢 My App`.

## Features

- **Multiple conditions** — define as many rules as you need (e.g. one for `.localhost`, one for `.staging`, etc.).
- **Multiple patterns per condition** — a condition applies if the hostname contains **at least one** of its patterns.
- **Custom prefix** — emoji, text, brackets… whatever you like.
- **Per-condition toggle** — temporarily disable a rule without deleting it.
- **Live updates** — configuration changes are propagated to open tabs immediately.
- **SPA-friendly** — a `MutationObserver` re-applies the prefix when the framework (React, Vue, etc.) changes the title.
- **Stacked prefixes** — if several conditions match, their prefixes are concatenated in order (e.g. `🟢 [DEV] My Title`).

## Local installation

1. Clone the repo:
   ```bash
   git clone git@github.com:undefinedfr/chrome-localhost-checker.git
   ```
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top-right).
4. Click **"Load unpacked"** and select the repo folder.
5. The extension is installed. On first launch, a default rule is created: prefix `🟢 ` for hostnames containing `.localhost` or `.local`.

## Configuration

- Click the extension icon (or right-click → **Options**) to open the settings page.
- **Add a condition**: button at the top of the page.
- For each condition:
  - **Name** — free-form label (for your reference).
  - **Prefix** — what gets prepended to the title (e.g. `🟢 `, `[DEV] `, `🔴 PROD `).
  - **Patterns** — a list of strings; the condition applies if `location.hostname` contains any of them (e.g. `.localhost`, `.local`, `staging.mysite.com`).
  - **Enabled** — toggle to enable/disable the condition.
- Settings are saved automatically (`chrome.storage.sync`, synced across your signed-in Chromes).

## Project structure

```
.
├── manifest.json      # Manifest V3: permissions, content script, options
├── background.js      # Service worker: defaults + opens options on click
├── content.js         # Applies prefixes and observes title changes
├── options.html       # Settings UI
├── options.css        # Styles
└── options.js         # CRUD logic + persistence
```

## Permissions

- `storage` — to persist the conditions.
- `<all_urls>` on the content script — required because patterns are user-defined (thus unknown at packaging time). The script bails out immediately if no condition matches the current hostname.

## Development

After editing the code, hit the reload button on the extension card at `chrome://extensions`, then reload the affected tabs.
