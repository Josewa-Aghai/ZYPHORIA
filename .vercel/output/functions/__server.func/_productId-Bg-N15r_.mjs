import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { R as Route$1 } from "./_ssr/router-BBlvTmye.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "node:crypto";
function RouteComponent() {
  const product = Route$1.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-8 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-[55%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name, className: "w-full rounded-2xl object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-[45%] p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block mb-4", children: "← Back to all products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", children: product.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
          "$",
          product.price.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-6 py-2 rounded-lg border", children: "Add to Cart" })
      ] })
    ] })
  ] });
}
export {
  RouteComponent as component
};
