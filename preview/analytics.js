// Cloudflare Web Analytics (free, cookieless). Paste the site token from
// Cloudflare dashboard > Analytics & Logs > Web Analytics > Add a site.
// Empty token = beacon not loaded.
(function () {
  var CF_BEACON_TOKEN = "";
  if (!CF_BEACON_TOKEN) return;
  var s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }));
  document.head.appendChild(s);
})();
