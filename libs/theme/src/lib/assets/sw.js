if (!self.define) {
  const e = e => {
      "require" !== e && (e += ".js")
      let s = Promise.resolve()
      return (
        r[e] ||
          (s = new Promise(async s => {
            if ("document" in self) {
              const r = document.createElement("script")
              ;(r.src = e), document.head.appendChild(r), (r.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!r[e]) throw new Error(`Module ${e} didn’t register its module`)
          return r[e]
        })
      )
    },
    s = (s, r) => {
      Promise.all(s.map(e)).then(e => r(1 === e.length ? e[0] : e))
    },
    r = { require: Promise.resolve(s) }
  self.define = (s, t, n) => {
    r[s] ||
      (r[s] = Promise.resolve().then(() => {
        let r = {}
        const i = { uri: location.origin + s.slice(1) }
        return Promise.all(
          t.map(s => {
            switch (s) {
              case "exports":
                return r
              case "module":
                return i
              default:
                return e(s)
            }
          })
        ).then(e => {
          const s = n(...e)
          return r.default || (r.default = s), r
        })
      }))
  }
}
define("./sw.js", ["./workbox-bcde4d08"], function (e) {
  "use strict"
  e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/assets/css/bundle-971dca4751997edcc96c.css",
          revision: "88c5090591a6151db398976870c81e1f",
        },
        {
          url: "/assets/js/app-d91b90fa7481c3d801de.js",
          revision: "d528079cd63dd8de6fbbc13d50f65775",
        },
        {
          url: "/assets/js/theme-3850b17f8c92706e7259.js",
          revision: "d5036058cd757283c5bded3588c16ae2",
        },
      ],
      {}
    ),
    e.registerRoute(
      /\/(images|assets|admin-assets)\//,
      new e.NetworkFirst(),
      "GET"
    ),
    e.registerRoute(/\/api\//, new e.NetworkOnly(), "GET"),
    e.registerRoute(
      /\/ajax\/payment_form_settings/,
      new e.NetworkOnly(),
      "GET"
    ),
    e.registerRoute(
      /\//,
      new e.NetworkFirst({ networkTimeoutSeconds: 10, plugins: [] }),
      "GET"
    )
})
