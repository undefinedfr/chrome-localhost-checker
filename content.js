(() => {
  // hostname to check
  if (!location.hostname.includes(".localhost") && !location.hostname.includes(".local")) return;

  const PREFIX = "🟢 ";

  const applyPrefix = () => {
    const current = document.title || "";
    if (!current.startsWith(PREFIX)) {
      document.title = PREFIX + current;
    }
  };

  // Applique dès que <title> existe
  const waitForTitle = () => {
    const titleEl = document.querySelector("head > title");
    if (titleEl) {
      applyPrefix();
      // Observe les changements de titre (SPA, frameworks qui le modifient)
      new MutationObserver(applyPrefix).observe(titleEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    } else {
      // <title> pas encore présent, on attend qu'il soit ajouté au <head>
      const headObserver = new MutationObserver(() => {
        const t = document.querySelector("head > title");
        if (t) {
          headObserver.disconnect();
          waitForTitle();
        }
      });
      headObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }
  };

  waitForTitle();
})();
