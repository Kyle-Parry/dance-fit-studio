const cacheName = "static-site";

const assets = [
  "/",
  "/index.html",
  "/bookings.html",
  "/classes.html",
  "/contact.html",
  "/login.html",
  "/register.html",
  "/settings.html",
  "/special-occasions.html",
  "/js/bookings.js",
  "/js/classes.js",
  "/js/login.js",
  "/js/nav.js",
  "/js/register.js",
  "/js/settings.js",
  "/js/special-occasions.js",
  "/js/your-classes.js",
  "/assets/css/Account-setting-or-edit-profile.css",
  "/assets/css/Article-Clean.css",
  "/assets/css/Article-List.css",
  "/assets/css/Contact-Form-Clean.css",
  "/assets/css/Dark-Mode-Switch.css",
  "/assets/css/Footer-Basic.css",
  "/assets/css/Footer-Dark.css",
  "/assets/css/Highlight-Phone.css",
  "/assets/css/Login-Form-Clean.css",
  "/assets/css/Map-Clean.css",
  "/assets/css/Pretty-Registration-Form.css",
  "/assets/css/Registration-Form-with-Photo.css",
  "/assets/css/spinner.css",
  "/assets/css/Toggle-Switches.css",
  "/assets/bootstrap/css/bootstrap.min.css",
  "/assets/bootstrap/js/bootstrap.min.js",
];

self.addEventListener("install", (e) => {
  console.log("installed");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("activated");

  e.waitUntil(
    caches.keys().then((keys) => {
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
        );
      });
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("fetching");
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request);
    })
  );
});
