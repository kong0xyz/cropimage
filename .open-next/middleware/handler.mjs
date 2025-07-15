
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.0";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/.pnpm/cookie@1.0.2/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/cookie@1.0.2/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var a = r[o] = { exports: {} }, f = true;
        try {
          e[o](a, a.exports, t), f = false;
        } finally {
          f && delete r[o];
        }
        return a.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, a) => {
          if (o) {
            a = a || 0;
            for (var f = e2.length; f > 0 && e2[f - 1][2] > a; f--) e2[f] = e2[f - 1];
            e2[f] = [o, n, a];
            return;
          }
          for (var i = 1 / 0, f = 0; f < e2.length; f++) {
            for (var [o, n, a] = e2[f], l = true, u = 0; u < o.length; u++) (false & a || i >= a) && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (l = false, a < i && (i = a));
            if (l) {
              e2.splice(f--, 1);
              var c = n();
              void 0 !== c && (r2 = c);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, (() => {
        var e2, r2 = Object.getPrototypeOf ? (e3) => Object.getPrototypeOf(e3) : (e3) => e3.__proto__;
        t.t = function(o, n) {
          if (1 & n && (o = this(o)), 8 & n || "object" == typeof o && o && (4 & n && o.__esModule || 16 & n && "function" == typeof o.then)) return o;
          var a = /* @__PURE__ */ Object.create(null);
          t.r(a);
          var f = {};
          e2 = e2 || [null, r2({}), r2([]), r2(r2)];
          for (var i = 2 & n && o; "object" == typeof i && !~e2.indexOf(i); i = r2(i)) Object.getOwnPropertyNames(i).forEach((e3) => f[e3] = () => o[e3]);
          return f.default = () => o, t.d(a, f), a;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.e = () => Promise.resolve(), t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, a, [f, i, l] = o2, u = 0;
          if (f.some((r4) => 0 !== e2[r4])) {
            for (n in i) t.o(i, n) && (t.m[n] = i[n]);
            if (l) var c = l(t);
          }
          for (r3 && r3(o2); u < f.length; u++) a = f[u], t.o(e2, a) && e2[a] && e2[a][0](), e2[a] = 0;
          return t.O(c);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[550], { 20: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"Home","about":"About","pricing":"Pricing","blog":"Blog","docs":"Docs","sitemap":"Sitemap"},"pricing":{"header":"Pricing","title":"Simple, Transparent Pricing","description":"Choose the plan that works for you\\nAll plans include access to our platform, lead generation tools, and dedicated support."},"common":{"welcome":"Welcome","language":"Language","switchLanguage":"Switch Language","signIn":"Sign In","signUp":"Sign Up","signOut":"Sign Out","scrollToTop":"Back to Top","share":{"button":"Share","title":"Share to","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"Email","copyLink":"Copy Link","copySuccess":"Link copied to clipboard","copyFailed":"Copy failed"},"comingSoon":{"title":"Coming Soon","description":"This feature is under development, please stay tuned.","action":"Back to Home"}},"blog":{"title":"Blog","description":"Explore the latest tech articles, tutorials and insights","backToBlog":"Back to Blog","readArticle":"Read Article","readMore":"Read More","readingTime":"min read","min":"min","noArticles":"No Articles","noArticlesDescription":"No articles have been published yet, please check back later.","articlesCount":"articles","categories":"Categories","tags":"Tags","recentPosts":"Recent Posts","relatedArticles":"Related Articles","shareArticle":"Share Article","featured":"Featured","tableOfContents":"Table of Contents","hotTags":"Hot Tags","quickNavigation":"Quick Navigation","viewAllCategories":"View All Categories","viewAllTags":"View All Tags","allCategories":"All Categories","allTags":"All Tags","category":{"title":"Category","allCategories":"All Categories","allCategoriesDescription":"Explore exciting content across different topics, {count} categories in total","noCategoriesTitle":"No Categories","noCategoriesDescription":"No categories exist yet, they will be created automatically when articles are published.","articlesInCategory":"Found {count} articles","hotCategories":"Hot Categories","categoryOverview":"Category Overview","categoryCloud":"Category Cloud"},"tag":{"title":"Tag","allTags":"All Tags","allTagsDescription":"Discover topics of interest, {count} tags in total","tagCloud":"Tag Cloud","noTagsTitle":"No Tags","noTagsDescription":"No tags exist yet, they will be created automatically when articles are published.","articlesWithTag":"Found {count} articles"},"pagination":{"previous":"Previous","next":"Next","navigation":"Pagination Navigation","pageInfo":"Page {current} of {total}","pageX":"Page {page}"},"noResults":{"category":"No articles in this category yet.","tag":"No articles with this tag yet."}},"footer":{"allRightsReserved":"All rights reserved.","featured":"Featured","resources":"Resources","legal":"Legal","about":"About","privacy":"Privacy Policy","terms":"Terms of Service","sitemap":"Sitemap"},"meta":{"global":{"title":"Next Maker | The next-generation framework for building online tools.","description":"Build the future of online tools with a next-generation framework.","keywords":"Next.js, Shadcn UI, Better Auth, Resend, Stripe, Supabase, Drizzle ORM, Tailwind CSS, TypeScript, React, Node.js"},"about":{"title":"About Us","description":"Learn about how we are committed to providing high-quality online services to users, and explore our team background and company mission."},"pricing":{"title":"Pricing - Choose the plan that works for you","description":"View our pricing plans, from free entry-level packages to full-featured enterprise solutions that meet all your online tool needs."},"terms":{"title":"Terms of Service","description":"Learn about the legal terms, conditions, rights, and responsibilities of using our website and services. Please read carefully before using our online tools."},"privacy":{"title":"Privacy Policy","description":"Learn how we collect, use, and protect your personal information. Our privacy policy details how we process and protect user data."},"docs":{"title":"Docs - Use guides and detailed instructions","description":"Get detailed documentation and guides to help you make the most of our online tools."},"blog":{"title":"Blog","description":"Explore the latest tech articles, tutorials and insights"}},"docs":{"translations":{"search":"Search","searchNoResult":"No results found","toc":"Table of Contents","tocNoHeadings":"No headings found","lastUpdate":"Last Updated","chooseLanguage":"Choose Language","nextPage":"Next Page","previousPage":"Previous Page","chooseTheme":"Choose Theme","editOnGithub":"Edit on Github"}}}');
    }, 41: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"Inicio","about":"Acerca de","pricing":"Precios","blog":"Blog","docs":"Documentaci\xF3n","sitemap":"Mapa del sitio"},"pricing":{"header":"Precios","title":"Precios simples y transparentes","description":"Elige el plan que mejor funcione para ti\\nTodos los planes incluyen acceso a nuestra plataforma, herramientas de generaci\xF3n de leads y soporte dedicado."},"common":{"welcome":"Bienvenido","language":"Idioma","switchLanguage":"Cambiar idioma","signIn":"Iniciar sesi\xF3n","signUp":"Registrarse","signOut":"Cerrar sesi\xF3n","scrollToTop":"Volver arriba","share":{"button":"Compartir","title":"Compartir en","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"Correo electr\xF3nico","copyLink":"Copiar Enlace","copySuccess":"Enlace copiado al portapapeles","copyFailed":"Error al copiar"},"comingSoon":{"title":"Pr\xF3ximamente","description":"Esta funci\xF3n est\xE1 en desarrollo, por favor mantente atento","action":"Volver a inicio"}},"blog":{"title":"Blog","description":"Explora los \xFAltimos art\xEDculos t\xE9cnicos, tutoriales y perspectivas","backToBlog":"Volver al blog","readArticle":"Leer art\xEDculo","readMore":"Leer m\xE1s","readingTime":"min de lectura","min":"min","noArticles":"Sin art\xEDculos","noArticlesDescription":"A\xFAn no se han publicado art\xEDculos, vuelve m\xE1s tarde.","articlesCount":"art\xEDculos","categories":"Categor\xEDas","tags":"Etiquetas","recentPosts":"Art\xEDculos recientes","relatedArticles":"Art\xEDculos relacionados","shareArticle":"Compartir art\xEDculo","featured":"Destacado","tableOfContents":"Tabla de contenidos","hotTags":"Etiquetas populares","quickNavigation":"Navegaci\xF3n r\xE1pida","viewAllCategories":"Ver todas las categor\xEDas","viewAllTags":"Ver todas las etiquetas","allCategories":"Todas las categor\xEDas","allTags":"Todas las etiquetas","category":{"title":"Categor\xEDa","allCategories":"Todas las categor\xEDas","allCategoriesDescription":"Explora contenido emocionante sobre diferentes temas, {count} categor\xEDas en total","noCategoriesTitle":"Sin categor\xEDas","noCategoriesDescription":"A\xFAn no existen categor\xEDas, se crear\xE1n autom\xE1ticamente cuando se publiquen art\xEDculos.","articlesInCategory":"{count} art\xEDculos encontrados","hotCategories":"Categor\xEDas populares","categoryOverview":"Resumen de categor\xEDas","categoryCloud":"Nube de categor\xEDas"},"tag":{"title":"Etiqueta","allTags":"Todas las etiquetas","allTagsDescription":"Descubre temas de inter\xE9s, {count} etiquetas en total","tagCloud":"Nube de etiquetas","noTagsTitle":"Sin etiquetas","noTagsDescription":"A\xFAn no existen etiquetas, se crear\xE1n autom\xE1ticamente cuando se publiquen art\xEDculos.","articlesWithTag":"{count} art\xEDculos encontrados"},"pagination":{"previous":"Anterior","next":"Siguiente","navigation":"Navegaci\xF3n de paginaci\xF3n","pageInfo":"P\xE1gina {current} de {total}","pageX":"P\xE1gina {page}"},"noResults":{"category":"A\xFAn no hay art\xEDculos en esta categor\xEDa.","tag":"A\xFAn no hay art\xEDculos con esta etiqueta."}},"footer":{"allRightsReserved":"Todos los derechos reservados.","featured":"Destacado","resources":"Recursos","legal":"Legal","about":"Acerca de","privacy":"Pol\xEDtica de privacidad","terms":"T\xE9rminos de servicio","sitemap":"Mapa del sitio"},"meta":{"global":{"title":"Next Maker | La plataforma de nueva generaci\xF3n para crear herramientas en l\xEDnea","description":"Construye el futuro de las herramientas en l\xEDnea con una plataforma de nueva generaci\xF3n.","keywords":""},"about":{"title":"Acerca de nosotros","description":"Descubre c\xF3mo nos comprometemos a proporcionar servicios en l\xEDnea de alta calidad a los usuarios, y explora la historia de nuestro equipo y la misi\xF3n de nuestra empresa."},"pricing":{"title":"Precios - Elige el plan que mejor se adapte a tus necesidades","description":"Consulta nuestros planes de precios, desde paquetes gratuitos b\xE1sicos hasta soluciones empresariales completas, que satisfacen todas tus necesidades de herramientas en l\xEDnea."},"terms":{"title":"T\xE9rminos de servicio","description":"Inf\xF3rmate sobre los t\xE9rminos legales, condiciones, derechos y responsabilidades de utilizar nuestro sitio web y servicios. Por favor, lee atentamente antes de utilizar nuestras herramientas en l\xEDnea."},"privacy":{"title":"Pol\xEDtica de privacidad","description":"Descubre c\xF3mo recopilamos, utilizamos y protegemos tu informaci\xF3n personal. Nuestra pol\xEDtica de privacidad detalla c\xF3mo procesamos y protegemos los datos de los usuarios."},"docs":{"title":"Documentaci\xF3n - Gu\xEDas de uso e instrucciones detalladas","description":"Obtenga documentaci\xF3n y gu\xEDas detalladas para aprovechar al m\xE1ximo nuestras herramientas en l\xEDnea."},"blog":{"title":"Blog","description":"Explora los \xFAltimos art\xEDculos t\xE9cnicos, tutoriales y conocimientos"}},"docs":{"translations":{"search":"Buscar","searchNoResult":"No se encontraron resultados","toc":"Tabla de contenidos","tocNoHeadings":"No se encontraron encabezados","lastUpdate":"\xDAltima actualizaci\xF3n","chooseLanguage":"Elegir idioma","nextPage":"P\xE1gina siguiente","previousPage":"P\xE1gina anterior","chooseTheme":"Elegir tema","editOnGithub":"Editar en GitHub"}}}');
    }, 77: (e, t, r) => {
      "use strict";
      var n = r(965), i = r(225), a = Symbol.for("react.element"), o = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment"), l = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), g = Symbol.for("react.memo_cache_sentinel");
      Symbol.for("react.postpone");
      var h = Symbol.iterator;
      function m(e10) {
        return null === e10 || "object" != typeof e10 ? null : "function" == typeof (e10 = h && e10[h] || e10["@@iterator"]) ? e10 : null;
      }
      var _ = Symbol.asyncIterator;
      function y(e10) {
        tw(function() {
          throw e10;
        });
      }
      var v = Promise, b = "function" == typeof queueMicrotask ? queueMicrotask : function(e10) {
        v.resolve(null).then(e10).catch(y);
      }, w = null, S = 0;
      function C(e10, t2) {
        if (0 !== t2.byteLength) if (2048 < t2.byteLength) 0 < S && (e10.enqueue(new Uint8Array(w.buffer, 0, S)), w = new Uint8Array(2048), S = 0), e10.enqueue(t2);
        else {
          var r2 = w.length - S;
          r2 < t2.byteLength && (0 === r2 ? e10.enqueue(w) : (w.set(t2.subarray(0, r2), S), e10.enqueue(w), t2 = t2.subarray(r2)), w = new Uint8Array(2048), S = 0), w.set(t2, S), S += t2.byteLength;
        }
        return true;
      }
      var T = new TextEncoder();
      function E(e10) {
        return T.encode(e10);
      }
      function R(e10) {
        return e10.byteLength;
      }
      function x(e10, t2) {
        "function" == typeof e10.error ? e10.error(t2) : e10.close();
      }
      var O = Symbol.for("react.client.reference"), P = Symbol.for("react.server.reference");
      function k(e10, t2, r2) {
        return Object.defineProperties(e10, { $$typeof: { value: O }, $$id: { value: t2 }, $$async: { value: r2 } });
      }
      var N = Function.prototype.bind, A = Array.prototype.slice;
      function L() {
        var e10 = N.apply(this, arguments);
        if (this.$$typeof === P) {
          var t2 = A.call(arguments, 1);
          return Object.defineProperties(e10, { $$typeof: { value: P }, $$id: { value: this.$$id }, $$bound: t2 = { value: this.$$bound ? this.$$bound.concat(t2) : t2 }, bind: { value: L, configurable: true } });
        }
        return e10;
      }
      var I = Promise.prototype, M = { get: function(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "$$id":
            return e10.$$id;
          case "$$async":
            return e10.$$async;
          case "name":
            return e10.name;
          case "displayName":
          case "defaultProps":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          case "then":
            throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
        }
        throw Error("Cannot access " + String(e10.name) + "." + String(t2) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } };
      function D(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "$$id":
            return e10.$$id;
          case "$$async":
            return e10.$$async;
          case "name":
            return e10.name;
          case "defaultProps":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "__esModule":
            var r2 = e10.$$id;
            return e10.default = k(function() {
              throw Error("Attempted to call the default export of " + r2 + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
            }, e10.$$id + "#", e10.$$async), true;
          case "then":
            if (e10.then) return e10.then;
            if (e10.$$async) return;
            var n2 = k({}, e10.$$id, true), i2 = new Proxy(n2, j);
            return e10.status = "fulfilled", e10.value = i2, e10.then = k(function(e11) {
              return Promise.resolve(e11(i2));
            }, e10.$$id + "#then", false);
        }
        if ("symbol" == typeof t2) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
        return (n2 = e10[t2]) || (Object.defineProperty(n2 = k(function() {
          throw Error("Attempted to call " + String(t2) + "() from the server but " + String(t2) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, e10.$$id + "#" + t2, e10.$$async), "name", { value: t2 }), n2 = e10[t2] = new Proxy(n2, M)), n2;
      }
      var j = { get: function(e10, t2) {
        return D(e10, t2);
      }, getOwnPropertyDescriptor: function(e10, t2) {
        var r2 = Object.getOwnPropertyDescriptor(e10, t2);
        return r2 || (r2 = { value: D(e10, t2), writable: false, configurable: false, enumerable: false }, Object.defineProperty(e10, t2, r2)), r2;
      }, getPrototypeOf: function() {
        return I;
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } }, q = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = q.d;
      function U(e10) {
        if (null == e10) return null;
        var t2, r2 = false, n2 = {};
        for (t2 in e10) null != e10[t2] && (r2 = true, n2[t2] = e10[t2]);
        return r2 ? n2 : null;
      }
      q.d = { f: $.f, r: $.r, D: function(e10) {
        if ("string" == typeof e10 && e10) {
          var t2 = ey();
          if (t2) {
            var r2 = t2.hints, n2 = "D|" + e10;
            r2.has(n2) || (r2.add(n2), eb(t2, "D", e10));
          } else $.D(e10);
        }
      }, C: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "C|" + (null == t2 ? "null" : t2) + "|" + e10;
            n2.has(i2) || (n2.add(i2), "string" == typeof t2 ? eb(r2, "C", [e10, t2]) : eb(r2, "C", e10));
          } else $.C(e10, t2);
        }
      }, L: function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = ey();
          if (n2) {
            var i2 = n2.hints, a2 = "L";
            if ("image" === t2 && r2) {
              var o2 = r2.imageSrcSet, s2 = r2.imageSizes, l2 = "";
              "string" == typeof o2 && "" !== o2 ? (l2 += "[" + o2 + "]", "string" == typeof s2 && (l2 += "[" + s2 + "]")) : l2 += "[][]" + e10, a2 += "[image]" + l2;
            } else a2 += "[" + t2 + "]" + e10;
            i2.has(a2) || (i2.add(a2), (r2 = U(r2)) ? eb(n2, "L", [e10, t2, r2]) : eb(n2, "L", [e10, t2]));
          } else $.L(e10, t2, r2);
        }
      }, m: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "m|" + e10;
            if (n2.has(i2)) return;
            return n2.add(i2), (t2 = U(t2)) ? eb(r2, "m", [e10, t2]) : eb(r2, "m", e10);
          }
          $.m(e10, t2);
        }
      }, X: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "X|" + e10;
            if (n2.has(i2)) return;
            return n2.add(i2), (t2 = U(t2)) ? eb(r2, "X", [e10, t2]) : eb(r2, "X", e10);
          }
          $.X(e10, t2);
        }
      }, S: function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = ey();
          if (n2) {
            var i2 = n2.hints, a2 = "S|" + e10;
            if (i2.has(a2)) return;
            return i2.add(a2), (r2 = U(r2)) ? eb(n2, "S", [e10, "string" == typeof t2 ? t2 : 0, r2]) : "string" == typeof t2 ? eb(n2, "S", [e10, t2]) : eb(n2, "S", e10);
          }
          $.S(e10, t2, r2);
        }
      }, M: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "M|" + e10;
            if (n2.has(i2)) return;
            return n2.add(i2), (t2 = U(t2)) ? eb(r2, "M", [e10, t2]) : eb(r2, "M", e10);
          }
          $.M(e10, t2);
        }
      } };
      var B = "function" == typeof AsyncLocalStorage, G = B ? new AsyncLocalStorage() : null;
      "object" == typeof async_hooks && async_hooks.createHook, "object" == typeof async_hooks && async_hooks.executionAsyncId;
      var z = Symbol.for("react.temporary.reference"), V = { get: function(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "name":
          case "displayName":
          case "defaultProps":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
        }
        throw Error("Cannot access " + String(t2) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
      }, set: function() {
        throw Error("Cannot assign to a temporary client reference from a server module.");
      } }, H = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
      function F() {
      }
      var W = null;
      function K() {
        if (null === W) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
        var e10 = W;
        return W = null, e10;
      }
      var X = null, J = 0, Z = null;
      function Y() {
        var e10 = Z || [];
        return Z = null, e10;
      }
      var Q = { readContext: er, use: function(e10) {
        if (null !== e10 && "object" == typeof e10 || "function" == typeof e10) {
          if ("function" == typeof e10.then) {
            var t2 = J;
            J += 1, null === Z && (Z = []);
            var r2 = Z, n2 = e10, i2 = t2;
            switch (void 0 === (i2 = r2[i2]) ? r2.push(n2) : i2 !== n2 && (n2.then(F, F), n2 = i2), n2.status) {
              case "fulfilled":
                return n2.value;
              case "rejected":
                throw n2.reason;
              default:
                switch ("string" == typeof n2.status ? n2.then(F, F) : ((r2 = n2).status = "pending", r2.then(function(e11) {
                  if ("pending" === n2.status) {
                    var t3 = n2;
                    t3.status = "fulfilled", t3.value = e11;
                  }
                }, function(e11) {
                  if ("pending" === n2.status) {
                    var t3 = n2;
                    t3.status = "rejected", t3.reason = e11;
                  }
                })), n2.status) {
                  case "fulfilled":
                    return n2.value;
                  case "rejected":
                    throw n2.reason;
                }
                throw W = n2, H;
            }
          }
          e10.$$typeof === l && er();
        }
        if (e10.$$typeof === O) {
          if (null != e10.value && e10.value.$$typeof === l) throw Error("Cannot read a Client Context from a Server Component.");
          throw Error("Cannot use() an already resolved Client Reference.");
        }
        throw Error("An unsupported type was passed to use(): " + String(e10));
      }, useCallback: function(e10) {
        return e10;
      }, useContext: er, useEffect: ee, useImperativeHandle: ee, useLayoutEffect: ee, useInsertionEffect: ee, useMemo: function(e10) {
        return e10();
      }, useReducer: ee, useRef: ee, useState: ee, useDebugValue: function() {
      }, useDeferredValue: ee, useTransition: ee, useSyncExternalStore: ee, useId: function() {
        if (null === X) throw Error("useId can only be used while React is rendering");
        var e10 = X.identifierCount++;
        return ":" + X.identifierPrefix + "S" + e10.toString(32) + ":";
      }, useHostTransitionStatus: ee, useFormState: ee, useActionState: ee, useOptimistic: ee, useMemoCache: function(e10) {
        for (var t2 = Array(e10), r2 = 0; r2 < e10; r2++) t2[r2] = g;
        return t2;
      }, useCacheRefresh: function() {
        return et;
      } };
      function ee() {
        throw Error("This Hook is not supported in Server Components.");
      }
      function et() {
        throw Error("Refreshing the cache is not supported in Server Components.");
      }
      function er() {
        throw Error("Cannot read a Client Context from a Server Component.");
      }
      var en = { getCacheForType: function(e10) {
        var t2 = (t2 = ey()) ? t2.cache : /* @__PURE__ */ new Map(), r2 = t2.get(e10);
        return void 0 === r2 && (r2 = e10(), t2.set(e10, r2)), r2;
      } }, ei = i.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      if (!ei) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      var ea = Array.isArray, eo = Object.getPrototypeOf;
      function es(e10) {
        return Object.prototype.toString.call(e10).replace(/^\[object (.*)\]$/, function(e11, t2) {
          return t2;
        });
      }
      function el(e10) {
        switch (typeof e10) {
          case "string":
            return JSON.stringify(10 >= e10.length ? e10 : e10.slice(0, 10) + "...");
          case "object":
            if (ea(e10)) return "[...]";
            if (null !== e10 && e10.$$typeof === eu) return "client";
            return "Object" === (e10 = es(e10)) ? "{...}" : e10;
          case "function":
            return e10.$$typeof === eu ? "client" : (e10 = e10.displayName || e10.name) ? "function " + e10 : "function";
          default:
            return String(e10);
        }
      }
      var eu = Symbol.for("react.client.reference");
      function ec(e10, t2) {
        var r2 = es(e10);
        if ("Object" !== r2 && "Array" !== r2) return r2;
        r2 = -1;
        var n2 = 0;
        if (ea(e10)) {
          for (var i2 = "[", a2 = 0; a2 < e10.length; a2++) {
            0 < a2 && (i2 += ", ");
            var s2 = e10[a2];
            s2 = "object" == typeof s2 && null !== s2 ? ec(s2) : el(s2), "" + a2 === t2 ? (r2 = i2.length, n2 = s2.length, i2 += s2) : i2 = 10 > s2.length && 40 > i2.length + s2.length ? i2 + s2 : i2 + "...";
          }
          i2 += "]";
        } else if (e10.$$typeof === o) i2 = "<" + function e11(t3) {
          if ("string" == typeof t3) return t3;
          switch (t3) {
            case c:
              return "Suspense";
            case d:
              return "SuspenseList";
          }
          if ("object" == typeof t3) switch (t3.$$typeof) {
            case u:
              return e11(t3.render);
            case p:
              return e11(t3.type);
            case f:
              var r3 = t3._payload;
              t3 = t3._init;
              try {
                return e11(t3(r3));
              } catch (e12) {
              }
          }
          return "";
        }(e10.type) + "/>";
        else {
          if (e10.$$typeof === eu) return "client";
          for (s2 = 0, i2 = "{", a2 = Object.keys(e10); s2 < a2.length; s2++) {
            0 < s2 && (i2 += ", ");
            var l2 = a2[s2], g2 = JSON.stringify(l2);
            i2 += ('"' + l2 + '"' === g2 ? l2 : g2) + ": ", g2 = "object" == typeof (g2 = e10[l2]) && null !== g2 ? ec(g2) : el(g2), l2 === t2 ? (r2 = i2.length, n2 = g2.length, i2 += g2) : i2 = 10 > g2.length && 40 > i2.length + g2.length ? i2 + g2 : i2 + "...";
          }
          i2 += "}";
        }
        return void 0 === t2 ? i2 : -1 < r2 && 0 < n2 ? "\n  " + i2 + "\n  " + (e10 = " ".repeat(r2) + "^".repeat(n2)) : "\n  " + i2;
      }
      var ed = Object.prototype, ep = JSON.stringify;
      function ef(e10) {
        console.error(e10);
      }
      function eg() {
      }
      function eh(e10, t2, r2, n2, i2, a2, o2, s2, l2, u2, c2) {
        if (null !== ei.A && ei.A !== en) throw Error("Currently React only supports one RSC renderer at a time.");
        ei.A = en, l2 = /* @__PURE__ */ new Set(), s2 = [];
        var d2 = /* @__PURE__ */ new Set();
        this.type = e10, this.status = 10, this.flushScheduled = false, this.destination = this.fatalError = null, this.bundlerConfig = r2, this.cache = /* @__PURE__ */ new Map(), this.pendingChunks = this.nextChunkId = 0, this.hints = d2, this.abortListeners = /* @__PURE__ */ new Set(), this.abortableTasks = l2, this.pingedTasks = s2, this.completedImportChunks = [], this.completedHintChunks = [], this.completedRegularChunks = [], this.completedErrorChunks = [], this.writtenSymbols = /* @__PURE__ */ new Map(), this.writtenClientReferences = /* @__PURE__ */ new Map(), this.writtenServerReferences = /* @__PURE__ */ new Map(), this.writtenObjects = /* @__PURE__ */ new WeakMap(), this.temporaryReferences = o2, this.identifierPrefix = i2 || "", this.identifierCount = 1, this.taintCleanupQueue = [], this.onError = void 0 === n2 ? ef : n2, this.onPostpone = void 0 === a2 ? eg : a2, this.onAllReady = u2, this.onFatalError = c2, e10 = eR(this, t2, null, false, l2), s2.push(e10);
      }
      function em() {
      }
      var e_ = null;
      function ey() {
        if (e_) return e_;
        if (B) {
          var e10 = G.getStore();
          if (e10) return e10;
        }
        return null;
      }
      function ev(e10, t2, r2) {
        var n2 = eR(e10, null, t2.keyPath, t2.implicitSlot, e10.abortableTasks);
        switch (r2.status) {
          case "fulfilled":
            return n2.model = r2.value, eE(e10, n2), n2.id;
          case "rejected":
            return eB(e10, n2, r2.reason), n2.id;
          default:
            if (12 === e10.status) return e10.abortableTasks.delete(n2), n2.status = 3, t2 = ep(ex(e10.fatalError)), ej(e10, n2.id, t2), n2.id;
            "string" != typeof r2.status && (r2.status = "pending", r2.then(function(e11) {
              "pending" === r2.status && (r2.status = "fulfilled", r2.value = e11);
            }, function(e11) {
              "pending" === r2.status && (r2.status = "rejected", r2.reason = e11);
            }));
        }
        return r2.then(function(t3) {
          n2.model = t3, eE(e10, n2);
        }, function(t3) {
          0 === n2.status && (eB(e10, n2, t3), eW(e10));
        }), n2.id;
      }
      function eb(e10, t2, r2) {
        t2 = E(":H" + t2 + (r2 = ep(r2)) + "\n"), e10.completedHintChunks.push(t2), eW(e10);
      }
      function ew(e10) {
        if ("fulfilled" === e10.status) return e10.value;
        if ("rejected" === e10.status) throw e10.reason;
        throw e10;
      }
      function eS() {
      }
      function eC(e10, t2, r2, n2, i2) {
        var a2 = t2.thenableState;
        if (t2.thenableState = null, J = 0, Z = a2, i2 = n2(i2, void 0), 12 === e10.status) throw "object" == typeof i2 && null !== i2 && "function" == typeof i2.then && i2.$$typeof !== O && i2.then(eS, eS), null;
        return i2 = function(e11, t3, r3, n3) {
          if ("object" != typeof n3 || null === n3 || n3.$$typeof === O) return n3;
          if ("function" == typeof n3.then) return "fulfilled" === n3.status ? n3.value : function(e12) {
            switch (e12.status) {
              case "fulfilled":
              case "rejected":
                break;
              default:
                "string" != typeof e12.status && (e12.status = "pending", e12.then(function(t4) {
                  "pending" === e12.status && (e12.status = "fulfilled", e12.value = t4);
                }, function(t4) {
                  "pending" === e12.status && (e12.status = "rejected", e12.reason = t4);
                }));
            }
            return { $$typeof: f, _payload: e12, _init: ew };
          }(n3);
          var i3 = m(n3);
          return i3 ? ((e11 = {})[Symbol.iterator] = function() {
            return i3.call(n3);
          }, e11) : "function" != typeof n3[_] || "function" == typeof ReadableStream && n3 instanceof ReadableStream ? n3 : ((e11 = {})[_] = function() {
            return n3[_]();
          }, e11);
        }(e10, 0, 0, i2), n2 = t2.keyPath, a2 = t2.implicitSlot, null !== r2 ? t2.keyPath = null === n2 ? r2 : n2 + "," + r2 : null === n2 && (t2.implicitSlot = true), e10 = eL(e10, t2, eG, "", i2), t2.keyPath = n2, t2.implicitSlot = a2, e10;
      }
      function eT(e10, t2, r2) {
        return null !== t2.keyPath ? (e10 = [o, s, t2.keyPath, { children: r2 }], t2.implicitSlot ? [e10] : e10) : r2;
      }
      function eE(e10, t2) {
        var r2 = e10.pingedTasks;
        r2.push(t2), 1 === r2.length && (e10.flushScheduled = null !== e10.destination, 21 === e10.type || 10 === e10.status ? b(function() {
          return eV(e10);
        }) : tw(function() {
          return eV(e10);
        }, 0));
      }
      function eR(e10, t2, r2, n2, i2) {
        e10.pendingChunks++;
        var a2 = e10.nextChunkId++;
        "object" != typeof t2 || null === t2 || null !== r2 || n2 || e10.writtenObjects.set(t2, ex(a2));
        var s2 = { id: a2, status: 0, model: t2, keyPath: r2, implicitSlot: n2, ping: function() {
          return eE(e10, s2);
        }, toJSON: function(t3, r3) {
          var n3 = s2.keyPath, i3 = s2.implicitSlot;
          try {
            var a3 = eL(e10, s2, this, t3, r3);
          } catch (u2) {
            if (t3 = "object" == typeof (t3 = s2.model) && null !== t3 && (t3.$$typeof === o || t3.$$typeof === f), 12 === e10.status) s2.status = 3, n3 = e10.fatalError, a3 = t3 ? "$L" + n3.toString(16) : ex(n3);
            else if ("object" == typeof (r3 = u2 === H ? K() : u2) && null !== r3 && "function" == typeof r3.then) {
              var l2 = (a3 = eR(e10, s2.model, s2.keyPath, s2.implicitSlot, e10.abortableTasks)).ping;
              r3.then(l2, l2), a3.thenableState = Y(), s2.keyPath = n3, s2.implicitSlot = i3, a3 = t3 ? "$L" + a3.id.toString(16) : ex(a3.id);
            } else s2.keyPath = n3, s2.implicitSlot = i3, e10.pendingChunks++, n3 = e10.nextChunkId++, i3 = eI(e10, r3, s2), eD(e10, n3, i3), a3 = t3 ? "$L" + n3.toString(16) : ex(n3);
          }
          return a3;
        }, thenableState: null };
        return i2.add(s2), s2;
      }
      function ex(e10) {
        return "$" + e10.toString(16);
      }
      function eO(e10, t2, r2) {
        return e10 = ep(r2), E(t2 = t2.toString(16) + ":" + e10 + "\n");
      }
      function eP(e10, t2, r2, n2) {
        var i2 = n2.$$async ? n2.$$id + "#async" : n2.$$id, a2 = e10.writtenClientReferences, s2 = a2.get(i2);
        if (void 0 !== s2) return t2[0] === o && "1" === r2 ? "$L" + s2.toString(16) : ex(s2);
        try {
          var l2 = e10.bundlerConfig, u2 = n2.$$id;
          s2 = "";
          var c2 = l2[u2];
          if (c2) s2 = c2.name;
          else {
            var d2 = u2.lastIndexOf("#");
            if (-1 !== d2 && (s2 = u2.slice(d2 + 1), c2 = l2[u2.slice(0, d2)]), !c2) throw Error('Could not find the module "' + u2 + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
          }
          if (true === c2.async && true === n2.$$async) throw Error('The module "' + u2 + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.');
          var p2 = true === c2.async || true === n2.$$async ? [c2.id, c2.chunks, s2, 1] : [c2.id, c2.chunks, s2];
          e10.pendingChunks++;
          var f2 = e10.nextChunkId++, g2 = ep(p2), h2 = f2.toString(16) + ":I" + g2 + "\n", m2 = E(h2);
          return e10.completedImportChunks.push(m2), a2.set(i2, f2), t2[0] === o && "1" === r2 ? "$L" + f2.toString(16) : ex(f2);
        } catch (n3) {
          return e10.pendingChunks++, t2 = e10.nextChunkId++, r2 = eI(e10, n3, null), eD(e10, t2, r2), ex(t2);
        }
      }
      function ek(e10, t2) {
        return t2 = eR(e10, t2, null, false, e10.abortableTasks), ez(e10, t2), t2.id;
      }
      function eN(e10, t2, r2) {
        e10.pendingChunks++;
        var n2 = e10.nextChunkId++;
        return eq(e10, n2, t2, r2), ex(n2);
      }
      var eA = false;
      function eL(e10, t2, r2, n2, i2) {
        if (t2.model = i2, i2 === o) return "$";
        if (null === i2) return null;
        if ("object" == typeof i2) {
          switch (i2.$$typeof) {
            case o:
              var l2 = null, c2 = e10.writtenObjects;
              if (null === t2.keyPath && !t2.implicitSlot) {
                var d2 = c2.get(i2);
                if (void 0 !== d2) if (eA !== i2) return d2;
                else eA = null;
                else -1 === n2.indexOf(":") && void 0 !== (r2 = c2.get(r2)) && (l2 = r2 + ":" + n2, c2.set(i2, l2));
              }
              return r2 = (n2 = i2.props).ref, "object" == typeof (e10 = function e11(t3, r3, n3, i3, a2, l3) {
                if (null != a2) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
                if ("function" == typeof n3 && n3.$$typeof !== O && n3.$$typeof !== z) return eC(t3, r3, i3, n3, l3);
                if (n3 === s && null === i3) return n3 = r3.implicitSlot, null === r3.keyPath && (r3.implicitSlot = true), l3 = eL(t3, r3, eG, "", l3.children), r3.implicitSlot = n3, l3;
                if (null != n3 && "object" == typeof n3 && n3.$$typeof !== O) switch (n3.$$typeof) {
                  case f:
                    if (n3 = (0, n3._init)(n3._payload), 12 === t3.status) throw null;
                    return e11(t3, r3, n3, i3, a2, l3);
                  case u:
                    return eC(t3, r3, i3, n3.render, l3);
                  case p:
                    return e11(t3, r3, n3.type, i3, a2, l3);
                }
                return t3 = i3, i3 = r3.keyPath, null === t3 ? t3 = i3 : null !== i3 && (t3 = i3 + "," + t3), l3 = [o, n3, t3, l3], r3 = r3.implicitSlot && null !== t3 ? [l3] : l3;
              }(e10, t2, i2.type, i2.key, void 0 !== r2 ? r2 : null, n2)) && null !== e10 && null !== l2 && (c2.has(e10) || c2.set(e10, l2)), e10;
            case f:
              if (t2.thenableState = null, i2 = (n2 = i2._init)(i2._payload), 12 === e10.status) throw null;
              return eL(e10, t2, eG, "", i2);
            case a:
              throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
          }
          if (i2.$$typeof === O) return eP(e10, r2, n2, i2);
          if (void 0 !== e10.temporaryReferences && void 0 !== (l2 = e10.temporaryReferences.get(i2))) return "$T" + l2;
          if (c2 = (l2 = e10.writtenObjects).get(i2), "function" == typeof i2.then) {
            if (void 0 !== c2) {
              if (null !== t2.keyPath || t2.implicitSlot) return "$@" + ev(e10, t2, i2).toString(16);
              if (eA !== i2) return c2;
              eA = null;
            }
            return e10 = "$@" + ev(e10, t2, i2).toString(16), l2.set(i2, e10), e10;
          }
          if (void 0 !== c2) if (eA !== i2) return c2;
          else eA = null;
          else if (-1 === n2.indexOf(":") && void 0 !== (c2 = l2.get(r2))) {
            if (d2 = n2, ea(r2) && r2[0] === o) switch (n2) {
              case "1":
                d2 = "type";
                break;
              case "2":
                d2 = "key";
                break;
              case "3":
                d2 = "props";
                break;
              case "4":
                d2 = "_owner";
            }
            l2.set(i2, c2 + ":" + d2);
          }
          if (ea(i2)) return eT(e10, t2, i2);
          if (i2 instanceof Map) return "$Q" + ek(e10, i2 = Array.from(i2)).toString(16);
          if (i2 instanceof Set) return "$W" + ek(e10, i2 = Array.from(i2)).toString(16);
          if ("function" == typeof FormData && i2 instanceof FormData) return "$K" + ek(e10, i2 = Array.from(i2.entries())).toString(16);
          if (i2 instanceof Error) return "$Z";
          if (i2 instanceof ArrayBuffer) return eN(e10, "A", new Uint8Array(i2));
          if (i2 instanceof Int8Array) return eN(e10, "O", i2);
          if (i2 instanceof Uint8Array) return eN(e10, "o", i2);
          if (i2 instanceof Uint8ClampedArray) return eN(e10, "U", i2);
          if (i2 instanceof Int16Array) return eN(e10, "S", i2);
          if (i2 instanceof Uint16Array) return eN(e10, "s", i2);
          if (i2 instanceof Int32Array) return eN(e10, "L", i2);
          if (i2 instanceof Uint32Array) return eN(e10, "l", i2);
          if (i2 instanceof Float32Array) return eN(e10, "G", i2);
          if (i2 instanceof Float64Array) return eN(e10, "g", i2);
          if (i2 instanceof BigInt64Array) return eN(e10, "M", i2);
          if (i2 instanceof BigUint64Array) return eN(e10, "m", i2);
          if (i2 instanceof DataView) return eN(e10, "V", i2);
          if ("function" == typeof Blob && i2 instanceof Blob) return function(e11, t3) {
            function r3(t4) {
              s2 || (s2 = true, e11.abortListeners.delete(n3), eB(e11, a2, t4), eW(e11), o2.cancel(t4).then(r3, r3));
            }
            function n3(t4) {
              s2 || (s2 = true, e11.abortListeners.delete(n3), eB(e11, a2, t4), eW(e11), o2.cancel(t4).then(r3, r3));
            }
            var i3 = [t3.type], a2 = eR(e11, i3, null, false, e11.abortableTasks), o2 = t3.stream().getReader(), s2 = false;
            return e11.abortListeners.add(n3), o2.read().then(function t4(l3) {
              if (!s2) if (!l3.done) return i3.push(l3.value), o2.read().then(t4).catch(r3);
              else e11.abortListeners.delete(n3), s2 = true, eE(e11, a2);
            }).catch(r3), "$B" + a2.id.toString(16);
          }(e10, i2);
          if (l2 = m(i2)) return (n2 = l2.call(i2)) === i2 ? "$i" + ek(e10, Array.from(n2)).toString(16) : eT(e10, t2, Array.from(n2));
          if ("function" == typeof ReadableStream && i2 instanceof ReadableStream) return function(e11, t3, r3) {
            function n3(t4) {
              l3 || (l3 = true, e11.abortListeners.delete(i3), eB(e11, s2, t4), eW(e11), o2.cancel(t4).then(n3, n3));
            }
            function i3(t4) {
              l3 || (l3 = true, e11.abortListeners.delete(i3), eB(e11, s2, t4), eW(e11), o2.cancel(t4).then(n3, n3));
            }
            var a2 = r3.supportsBYOB;
            if (void 0 === a2) try {
              r3.getReader({ mode: "byob" }).releaseLock(), a2 = true;
            } catch (e12) {
              a2 = false;
            }
            var o2 = r3.getReader(), s2 = eR(e11, t3.model, t3.keyPath, t3.implicitSlot, e11.abortableTasks);
            e11.abortableTasks.delete(s2), e11.pendingChunks++, t3 = s2.id.toString(16) + ":" + (a2 ? "r" : "R") + "\n", e11.completedRegularChunks.push(E(t3));
            var l3 = false;
            return e11.abortListeners.add(i3), o2.read().then(function t4(r4) {
              if (!l3) if (r4.done) e11.abortListeners.delete(i3), r4 = s2.id.toString(16) + ":C\n", e11.completedRegularChunks.push(E(r4)), eW(e11), l3 = true;
              else try {
                s2.model = r4.value, e11.pendingChunks++, eU(e11, s2, s2.model), eW(e11), o2.read().then(t4, n3);
              } catch (e12) {
                n3(e12);
              }
            }, n3), ex(s2.id);
          }(e10, t2, i2);
          if ("function" == typeof (l2 = i2[_])) return null !== t2.keyPath ? (e10 = [o, s, t2.keyPath, { children: i2 }], e10 = t2.implicitSlot ? [e10] : e10) : (n2 = l2.call(i2), e10 = function(e11, t3, r3, n3) {
            function i3(t4) {
              s2 || (s2 = true, e11.abortListeners.delete(a2), eB(e11, o2, t4), eW(e11), "function" == typeof n3.throw && n3.throw(t4).then(i3, i3));
            }
            function a2(t4) {
              s2 || (s2 = true, e11.abortListeners.delete(a2), eB(e11, o2, t4), eW(e11), "function" == typeof n3.throw && n3.throw(t4).then(i3, i3));
            }
            r3 = r3 === n3;
            var o2 = eR(e11, t3.model, t3.keyPath, t3.implicitSlot, e11.abortableTasks);
            e11.abortableTasks.delete(o2), e11.pendingChunks++, t3 = o2.id.toString(16) + ":" + (r3 ? "x" : "X") + "\n", e11.completedRegularChunks.push(E(t3));
            var s2 = false;
            return e11.abortListeners.add(a2), n3.next().then(function t4(r4) {
              if (!s2) if (r4.done) {
                if (e11.abortListeners.delete(a2), void 0 === r4.value) var l3 = o2.id.toString(16) + ":C\n";
                else try {
                  var u2 = ek(e11, r4.value);
                  l3 = o2.id.toString(16) + ":C" + ep(ex(u2)) + "\n";
                } catch (e12) {
                  i3(e12);
                  return;
                }
                e11.completedRegularChunks.push(E(l3)), eW(e11), s2 = true;
              } else try {
                o2.model = r4.value, e11.pendingChunks++, eU(e11, o2, o2.model), eW(e11), n3.next().then(t4, i3);
              } catch (e12) {
                i3(e12);
              }
            }, i3), ex(o2.id);
          }(e10, t2, i2, n2)), e10;
          if (i2 instanceof Date) return "$D" + i2.toJSON();
          if ((e10 = eo(i2)) !== ed && (null === e10 || null !== eo(e10))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + ec(r2, n2));
          return i2;
        }
        if ("string" == typeof i2) return "Z" === i2[i2.length - 1] && r2[n2] instanceof Date ? "$D" + i2 : 1024 <= i2.length && null !== R ? (e10.pendingChunks++, t2 = e10.nextChunkId++, e$(e10, t2, i2), ex(t2)) : e10 = "$" === i2[0] ? "$" + i2 : i2;
        if ("boolean" == typeof i2) return i2;
        if ("number" == typeof i2) return Number.isFinite(i2) ? 0 === i2 && -1 / 0 == 1 / i2 ? "$-0" : i2 : 1 / 0 === i2 ? "$Infinity" : -1 / 0 === i2 ? "$-Infinity" : "$NaN";
        if (void 0 === i2) return "$undefined";
        if ("function" == typeof i2) {
          if (i2.$$typeof === O) return eP(e10, r2, n2, i2);
          if (i2.$$typeof === P) return void 0 !== (n2 = (t2 = e10.writtenServerReferences).get(i2)) ? e10 = "$F" + n2.toString(16) : (n2 = null === (n2 = i2.$$bound) ? null : Promise.resolve(n2), e10 = ek(e10, { id: i2.$$id, bound: n2 }), t2.set(i2, e10), e10 = "$F" + e10.toString(16)), e10;
          if (void 0 !== e10.temporaryReferences && void 0 !== (e10 = e10.temporaryReferences.get(i2))) return "$T" + e10;
          if (i2.$$typeof === z) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
          if (/^on[A-Z]/.test(n2)) throw Error("Event handlers cannot be passed to Client Component props." + ec(r2, n2) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
          throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + ec(r2, n2));
        }
        if ("symbol" == typeof i2) {
          if (void 0 !== (l2 = (t2 = e10.writtenSymbols).get(i2))) return ex(l2);
          if (Symbol.for(l2 = i2.description) !== i2) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + i2.description + ") cannot be found among global symbols." + ec(r2, n2));
          return e10.pendingChunks++, n2 = e10.nextChunkId++, r2 = eO(e10, n2, "$S" + l2), e10.completedImportChunks.push(r2), t2.set(i2, n2), ex(n2);
        }
        if ("bigint" == typeof i2) return "$n" + i2.toString(10);
        throw Error("Type " + typeof i2 + " is not supported in Client Component props." + ec(r2, n2));
      }
      function eI(e10, t2) {
        var r2 = e_;
        e_ = null;
        try {
          var n2 = e10.onError, i2 = B ? G.run(void 0, n2, t2) : n2(t2);
        } finally {
          e_ = r2;
        }
        if (null != i2 && "string" != typeof i2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof i2 + '" instead');
        return i2 || "";
      }
      function eM(e10, t2) {
        (0, e10.onFatalError)(t2), null !== e10.destination ? (e10.status = 14, x(e10.destination, t2)) : (e10.status = 13, e10.fatalError = t2);
      }
      function eD(e10, t2, r2) {
        r2 = { digest: r2 }, t2 = E(t2 = t2.toString(16) + ":E" + ep(r2) + "\n"), e10.completedErrorChunks.push(t2);
      }
      function ej(e10, t2, r2) {
        t2 = E(t2 = t2.toString(16) + ":" + r2 + "\n"), e10.completedRegularChunks.push(t2);
      }
      function eq(e10, t2, r2, n2) {
        e10.pendingChunks++;
        var i2 = new Uint8Array(n2.buffer, n2.byteOffset, n2.byteLength);
        i2 = (n2 = 2048 < n2.byteLength ? i2.slice() : i2).byteLength, t2 = E(t2 = t2.toString(16) + ":" + r2 + i2.toString(16) + ","), e10.completedRegularChunks.push(t2, n2);
      }
      function e$(e10, t2, r2) {
        if (null === R) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
        e10.pendingChunks++;
        var n2 = (r2 = E(r2)).byteLength;
        t2 = E(t2 = t2.toString(16) + ":T" + n2.toString(16) + ","), e10.completedRegularChunks.push(t2, r2);
      }
      function eU(e10, t2, r2) {
        var n2 = t2.id;
        "string" == typeof r2 && null !== R ? e$(e10, n2, r2) : r2 instanceof ArrayBuffer ? eq(e10, n2, "A", new Uint8Array(r2)) : r2 instanceof Int8Array ? eq(e10, n2, "O", r2) : r2 instanceof Uint8Array ? eq(e10, n2, "o", r2) : r2 instanceof Uint8ClampedArray ? eq(e10, n2, "U", r2) : r2 instanceof Int16Array ? eq(e10, n2, "S", r2) : r2 instanceof Uint16Array ? eq(e10, n2, "s", r2) : r2 instanceof Int32Array ? eq(e10, n2, "L", r2) : r2 instanceof Uint32Array ? eq(e10, n2, "l", r2) : r2 instanceof Float32Array ? eq(e10, n2, "G", r2) : r2 instanceof Float64Array ? eq(e10, n2, "g", r2) : r2 instanceof BigInt64Array ? eq(e10, n2, "M", r2) : r2 instanceof BigUint64Array ? eq(e10, n2, "m", r2) : r2 instanceof DataView ? eq(e10, n2, "V", r2) : (r2 = ep(r2, t2.toJSON), ej(e10, t2.id, r2));
      }
      function eB(e10, t2, r2) {
        e10.abortableTasks.delete(t2), t2.status = 4, r2 = eI(e10, r2, t2), eD(e10, t2.id, r2);
      }
      var eG = {};
      function ez(e10, t2) {
        if (0 === t2.status) {
          t2.status = 5;
          try {
            eA = t2.model;
            var r2 = eL(e10, t2, eG, "", t2.model);
            if (eA = r2, t2.keyPath = null, t2.implicitSlot = false, "object" == typeof r2 && null !== r2) e10.writtenObjects.set(r2, ex(t2.id)), eU(e10, t2, r2);
            else {
              var n2 = ep(r2);
              ej(e10, t2.id, n2);
            }
            e10.abortableTasks.delete(t2), t2.status = 1;
          } catch (r3) {
            if (12 === e10.status) {
              e10.abortableTasks.delete(t2), t2.status = 3;
              var i2 = ep(ex(e10.fatalError));
              ej(e10, t2.id, i2);
            } else {
              var a2 = r3 === H ? K() : r3;
              if ("object" == typeof a2 && null !== a2 && "function" == typeof a2.then) {
                t2.status = 0, t2.thenableState = Y();
                var o2 = t2.ping;
                a2.then(o2, o2);
              } else eB(e10, t2, a2);
            }
          } finally {
          }
        }
      }
      function eV(e10) {
        var t2 = ei.H;
        ei.H = Q;
        var r2 = e_;
        X = e_ = e10;
        var n2 = 0 < e10.abortableTasks.size;
        try {
          var i2 = e10.pingedTasks;
          e10.pingedTasks = [];
          for (var a2 = 0; a2 < i2.length; a2++) ez(e10, i2[a2]);
          null !== e10.destination && eH(e10, e10.destination), n2 && 0 === e10.abortableTasks.size && (0, e10.onAllReady)();
        } catch (t3) {
          eI(e10, t3, null), eM(e10, t3);
        } finally {
          ei.H = t2, X = null, e_ = r2;
        }
      }
      function eH(e10, t2) {
        w = new Uint8Array(2048), S = 0;
        try {
          for (var r2 = e10.completedImportChunks, n2 = 0; n2 < r2.length; n2++) e10.pendingChunks--, C(t2, r2[n2]);
          r2.splice(0, n2);
          var i2 = e10.completedHintChunks;
          for (n2 = 0; n2 < i2.length; n2++) C(t2, i2[n2]);
          i2.splice(0, n2);
          var a2 = e10.completedRegularChunks;
          for (n2 = 0; n2 < a2.length; n2++) e10.pendingChunks--, C(t2, a2[n2]);
          a2.splice(0, n2);
          var o2 = e10.completedErrorChunks;
          for (n2 = 0; n2 < o2.length; n2++) e10.pendingChunks--, C(t2, o2[n2]);
          o2.splice(0, n2);
        } finally {
          e10.flushScheduled = false, w && 0 < S && (t2.enqueue(new Uint8Array(w.buffer, 0, S)), w = null, S = 0);
        }
        0 === e10.pendingChunks && (e10.status = 14, t2.close(), e10.destination = null);
      }
      function eF(e10) {
        e10.flushScheduled = null !== e10.destination, B ? b(function() {
          G.run(e10, eV, e10);
        }) : b(function() {
          return eV(e10);
        }), tw(function() {
          10 === e10.status && (e10.status = 11);
        }, 0);
      }
      function eW(e10) {
        false === e10.flushScheduled && 0 === e10.pingedTasks.length && null !== e10.destination && (e10.flushScheduled = true, tw(function() {
          e10.flushScheduled = false;
          var t2 = e10.destination;
          t2 && eH(e10, t2);
        }, 0));
      }
      function eK(e10, t2) {
        if (13 === e10.status) e10.status = 14, x(t2, e10.fatalError);
        else if (14 !== e10.status && null === e10.destination) {
          e10.destination = t2;
          try {
            eH(e10, t2);
          } catch (t3) {
            eI(e10, t3, null), eM(e10, t3);
          }
        }
      }
      function eX(e10, t2) {
        try {
          11 >= e10.status && (e10.status = 12);
          var r2 = e10.abortableTasks;
          if (0 < r2.size) {
            var n2 = void 0 === t2 ? Error("The render was aborted by the server without a reason.") : "object" == typeof t2 && null !== t2 && "function" == typeof t2.then ? Error("The render was aborted by the server with a promise.") : t2, i2 = eI(e10, n2, null), a2 = e10.nextChunkId++;
            e10.fatalError = a2, e10.pendingChunks++, eD(e10, a2, i2, n2), r2.forEach(function(t3) {
              if (5 !== t3.status) {
                t3.status = 3;
                var r3 = ex(a2);
                t3 = eO(e10, t3.id, r3), e10.completedErrorChunks.push(t3);
              }
            }), r2.clear(), (0, e10.onAllReady)();
          }
          var o2 = e10.abortListeners;
          if (0 < o2.size) {
            var s2 = void 0 === t2 ? Error("The render was aborted by the server without a reason.") : "object" == typeof t2 && null !== t2 && "function" == typeof t2.then ? Error("The render was aborted by the server with a promise.") : t2;
            o2.forEach(function(e11) {
              return e11(s2);
            }), o2.clear();
          }
          null !== e10.destination && eH(e10, e10.destination);
        } catch (t3) {
          eI(e10, t3, null), eM(e10, t3);
        }
      }
      function eJ(e10, t2) {
        var r2 = "", n2 = e10[t2];
        if (n2) r2 = n2.name;
        else {
          var i2 = t2.lastIndexOf("#");
          if (-1 !== i2 && (r2 = t2.slice(i2 + 1), n2 = e10[t2.slice(0, i2)]), !n2) throw Error('Could not find the module "' + t2 + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
        }
        return n2.async ? [n2.id, n2.chunks, r2, 1] : [n2.id, n2.chunks, r2];
      }
      var eZ = /* @__PURE__ */ new Map();
      function eY(e10) {
        var t2 = globalThis.__next_require__(e10);
        return "function" != typeof t2.then || "fulfilled" === t2.status ? null : (t2.then(function(e11) {
          t2.status = "fulfilled", t2.value = e11;
        }, function(e11) {
          t2.status = "rejected", t2.reason = e11;
        }), t2);
      }
      function eQ() {
      }
      function e0(e10) {
        for (var t2 = e10[1], n2 = [], i2 = 0; i2 < t2.length; ) {
          var a2 = t2[i2++];
          t2[i2++];
          var o2 = eZ.get(a2);
          if (void 0 === o2) {
            o2 = r.e(a2), n2.push(o2);
            var s2 = eZ.set.bind(eZ, a2, null);
            o2.then(s2, eQ), eZ.set(a2, o2);
          } else null !== o2 && n2.push(o2);
        }
        return 4 === e10.length ? 0 === n2.length ? eY(e10[0]) : Promise.all(n2).then(function() {
          return eY(e10[0]);
        }) : 0 < n2.length ? Promise.all(n2) : null;
      }
      function e1(e10) {
        var t2 = globalThis.__next_require__(e10[0]);
        if (4 === e10.length && "function" == typeof t2.then) if ("fulfilled" === t2.status) t2 = t2.value;
        else throw t2.reason;
        return "*" === e10[2] ? t2 : "" === e10[2] ? t2.__esModule ? t2.default : t2 : t2[e10[2]];
      }
      var e2 = Object.prototype.hasOwnProperty;
      function e3(e10, t2, r2, n2) {
        this.status = e10, this.value = t2, this.reason = r2, this._response = n2;
      }
      function e4(e10) {
        return new e3("pending", null, null, e10);
      }
      function e5(e10, t2) {
        for (var r2 = 0; r2 < e10.length; r2++) (0, e10[r2])(t2);
      }
      function e6(e10, t2) {
        if ("pending" !== e10.status && "blocked" !== e10.status) e10.reason.error(t2);
        else {
          var r2 = e10.reason;
          e10.status = "rejected", e10.reason = t2, null !== r2 && e5(r2, t2);
        }
      }
      function e9(e10, t2, r2) {
        if ("pending" !== e10.status) e10 = e10.reason, "C" === t2[0] ? e10.close("C" === t2 ? '"$undefined"' : t2.slice(1)) : e10.enqueueModel(t2);
        else {
          var n2 = e10.value, i2 = e10.reason;
          if (e10.status = "resolved_model", e10.value = t2, e10.reason = r2, null !== n2) switch (tr(e10), e10.status) {
            case "fulfilled":
              e5(n2, e10.value);
              break;
            case "pending":
            case "blocked":
            case "cyclic":
              if (e10.value) for (t2 = 0; t2 < n2.length; t2++) e10.value.push(n2[t2]);
              else e10.value = n2;
              if (e10.reason) {
                if (i2) for (t2 = 0; t2 < i2.length; t2++) e10.reason.push(i2[t2]);
              } else e10.reason = i2;
              break;
            case "rejected":
              i2 && e5(i2, e10.reason);
          }
        }
      }
      function e8(e10, t2, r2) {
        return new e3("resolved_model", (r2 ? '{"done":true,"value":' : '{"done":false,"value":') + t2 + "}", -1, e10);
      }
      function e7(e10, t2, r2) {
        e9(e10, (r2 ? '{"done":true,"value":' : '{"done":false,"value":') + t2 + "}", -1);
      }
      e3.prototype = Object.create(Promise.prototype), e3.prototype.then = function(e10, t2) {
        switch ("resolved_model" === this.status && tr(this), this.status) {
          case "fulfilled":
            e10(this.value);
            break;
          case "pending":
          case "blocked":
          case "cyclic":
            e10 && (null === this.value && (this.value = []), this.value.push(e10)), t2 && (null === this.reason && (this.reason = []), this.reason.push(t2));
            break;
          default:
            t2(this.reason);
        }
      };
      var te = null, tt = null;
      function tr(e10) {
        var t2 = te, r2 = tt;
        te = e10, tt = null;
        var n2 = -1 === e10.reason ? void 0 : e10.reason.toString(16), i2 = e10.value;
        e10.status = "cyclic", e10.value = null, e10.reason = null;
        try {
          var a2 = JSON.parse(i2), o2 = function e11(t3, r3, n3, i3, a3) {
            if ("string" == typeof i3) return function(e12, t4, r4, n4, i4) {
              if ("$" === n4[0]) {
                switch (n4[1]) {
                  case "$":
                    return n4.slice(1);
                  case "@":
                    return ti(e12, t4 = parseInt(n4.slice(2), 16));
                  case "F":
                    return n4 = ts(e12, n4 = n4.slice(2), t4, r4, td), function(e13, t5, r5, n5, i5, a5) {
                      var o5 = eJ(e13._bundlerConfig, t5);
                      if (t5 = e0(o5), r5) r5 = Promise.all([r5, t5]).then(function(e14) {
                        e14 = e14[0];
                        var t6 = e1(o5);
                        return t6.bind.apply(t6, [null].concat(e14));
                      });
                      else {
                        if (!t5) return e1(o5);
                        r5 = Promise.resolve(t5).then(function() {
                          return e1(o5);
                        });
                      }
                      return r5.then(ta(n5, i5, a5, false, e13, td, []), to(n5)), null;
                    }(e12, n4.id, n4.bound, te, t4, r4);
                  case "T":
                    var a4, o4;
                    if (void 0 === i4 || void 0 === e12._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
                    return a4 = e12._temporaryReferences, o4 = new Proxy(o4 = Object.defineProperties(function() {
                      throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    }, { $$typeof: { value: z } }), V), a4.set(o4, i4), o4;
                  case "Q":
                    return ts(e12, n4 = n4.slice(2), t4, r4, tl);
                  case "W":
                    return ts(e12, n4 = n4.slice(2), t4, r4, tu);
                  case "K":
                    t4 = n4.slice(2);
                    var s3 = e12._prefix + t4 + "_", l2 = new FormData();
                    return e12._formData.forEach(function(e13, t5) {
                      t5.startsWith(s3) && l2.append(t5.slice(s3.length), e13);
                    }), l2;
                  case "i":
                    return ts(e12, n4 = n4.slice(2), t4, r4, tc);
                  case "I":
                    return 1 / 0;
                  case "-":
                    return "$-0" === n4 ? -0 : -1 / 0;
                  case "N":
                    return NaN;
                  case "u":
                    return;
                  case "D":
                    return new Date(Date.parse(n4.slice(2)));
                  case "n":
                    return BigInt(n4.slice(2));
                }
                switch (n4[1]) {
                  case "A":
                    return tp(e12, n4, ArrayBuffer, 1, t4, r4);
                  case "O":
                    return tp(e12, n4, Int8Array, 1, t4, r4);
                  case "o":
                    return tp(e12, n4, Uint8Array, 1, t4, r4);
                  case "U":
                    return tp(e12, n4, Uint8ClampedArray, 1, t4, r4);
                  case "S":
                    return tp(e12, n4, Int16Array, 2, t4, r4);
                  case "s":
                    return tp(e12, n4, Uint16Array, 2, t4, r4);
                  case "L":
                    return tp(e12, n4, Int32Array, 4, t4, r4);
                  case "l":
                    return tp(e12, n4, Uint32Array, 4, t4, r4);
                  case "G":
                    return tp(e12, n4, Float32Array, 4, t4, r4);
                  case "g":
                    return tp(e12, n4, Float64Array, 8, t4, r4);
                  case "M":
                    return tp(e12, n4, BigInt64Array, 8, t4, r4);
                  case "m":
                    return tp(e12, n4, BigUint64Array, 8, t4, r4);
                  case "V":
                    return tp(e12, n4, DataView, 1, t4, r4);
                  case "B":
                    return t4 = parseInt(n4.slice(2), 16), e12._formData.get(e12._prefix + t4);
                }
                switch (n4[1]) {
                  case "R":
                    return tg(e12, n4, void 0);
                  case "r":
                    return tg(e12, n4, "bytes");
                  case "X":
                    return tm(e12, n4, false);
                  case "x":
                    return tm(e12, n4, true);
                }
                return ts(e12, n4 = n4.slice(1), t4, r4, td);
              }
              return n4;
            }(t3, r3, n3, i3, a3);
            if ("object" == typeof i3 && null !== i3) if (void 0 !== a3 && void 0 !== t3._temporaryReferences && t3._temporaryReferences.set(i3, a3), Array.isArray(i3)) for (var o3 = 0; o3 < i3.length; o3++) i3[o3] = e11(t3, i3, "" + o3, i3[o3], void 0 !== a3 ? a3 + ":" + o3 : void 0);
            else for (o3 in i3) e2.call(i3, o3) && (r3 = void 0 !== a3 && -1 === o3.indexOf(":") ? a3 + ":" + o3 : void 0, void 0 !== (r3 = e11(t3, i3, o3, i3[o3], r3)) ? i3[o3] = r3 : delete i3[o3]);
            return i3;
          }(e10._response, { "": a2 }, "", a2, n2);
          if (null !== tt && 0 < tt.deps) tt.value = o2, e10.status = "blocked";
          else {
            var s2 = e10.value;
            e10.status = "fulfilled", e10.value = o2, null !== s2 && e5(s2, o2);
          }
        } catch (t3) {
          e10.status = "rejected", e10.reason = t3;
        } finally {
          te = t2, tt = r2;
        }
      }
      function tn(e10, t2) {
        e10._closed = true, e10._closedReason = t2, e10._chunks.forEach(function(e11) {
          "pending" === e11.status && e6(e11, t2);
        });
      }
      function ti(e10, t2) {
        var r2 = e10._chunks, n2 = r2.get(t2);
        return n2 || (n2 = null != (n2 = e10._formData.get(e10._prefix + t2)) ? new e3("resolved_model", n2, t2, e10) : e10._closed ? new e3("rejected", null, e10._closedReason, e10) : e4(e10), r2.set(t2, n2)), n2;
      }
      function ta(e10, t2, r2, n2, i2, a2, o2) {
        if (tt) {
          var s2 = tt;
          n2 || s2.deps++;
        } else s2 = tt = { deps: +!n2, value: null };
        return function(n3) {
          for (var l2 = 1; l2 < o2.length; l2++) n3 = n3[o2[l2]];
          t2[r2] = a2(i2, n3), "" === r2 && null === s2.value && (s2.value = t2[r2]), s2.deps--, 0 === s2.deps && "blocked" === e10.status && (n3 = e10.value, e10.status = "fulfilled", e10.value = s2.value, null !== n3 && e5(n3, s2.value));
        };
      }
      function to(e10) {
        return function(t2) {
          return e6(e10, t2);
        };
      }
      function ts(e10, t2, r2, n2, i2) {
        var a2 = parseInt((t2 = t2.split(":"))[0], 16);
        switch ("resolved_model" === (a2 = ti(e10, a2)).status && tr(a2), a2.status) {
          case "fulfilled":
            for (n2 = 1, r2 = a2.value; n2 < t2.length; n2++) r2 = r2[t2[n2]];
            return i2(e10, r2);
          case "pending":
          case "blocked":
          case "cyclic":
            var o2 = te;
            return a2.then(ta(o2, r2, n2, "cyclic" === a2.status, e10, i2, t2), to(o2)), null;
          default:
            throw a2.reason;
        }
      }
      function tl(e10, t2) {
        return new Map(t2);
      }
      function tu(e10, t2) {
        return new Set(t2);
      }
      function tc(e10, t2) {
        return t2[Symbol.iterator]();
      }
      function td(e10, t2) {
        return t2;
      }
      function tp(e10, t2, r2, n2, i2, a2) {
        return t2 = parseInt(t2.slice(2), 16), t2 = e10._formData.get(e10._prefix + t2), t2 = r2 === ArrayBuffer ? t2.arrayBuffer() : t2.arrayBuffer().then(function(e11) {
          return new r2(e11);
        }), n2 = te, t2.then(ta(n2, i2, a2, false, e10, td, []), to(n2)), null;
      }
      function tf(e10, t2, r2, n2) {
        var i2 = e10._chunks;
        for (r2 = new e3("fulfilled", r2, n2, e10), i2.set(t2, r2), e10 = e10._formData.getAll(e10._prefix + t2), t2 = 0; t2 < e10.length; t2++) "C" === (i2 = e10[t2])[0] ? n2.close("C" === i2 ? '"$undefined"' : i2.slice(1)) : n2.enqueueModel(i2);
      }
      function tg(e10, t2, r2) {
        t2 = parseInt(t2.slice(2), 16);
        var n2 = null;
        r2 = new ReadableStream({ type: r2, start: function(e11) {
          n2 = e11;
        } });
        var i2 = null;
        return tf(e10, t2, r2, { enqueueModel: function(t3) {
          if (null === i2) {
            var r3 = new e3("resolved_model", t3, -1, e10);
            tr(r3), "fulfilled" === r3.status ? n2.enqueue(r3.value) : (r3.then(function(e11) {
              return n2.enqueue(e11);
            }, function(e11) {
              return n2.error(e11);
            }), i2 = r3);
          } else {
            r3 = i2;
            var a2 = e4(e10);
            a2.then(function(e11) {
              return n2.enqueue(e11);
            }, function(e11) {
              return n2.error(e11);
            }), i2 = a2, r3.then(function() {
              i2 === a2 && (i2 = null), e9(a2, t3, -1);
            });
          }
        }, close: function() {
          if (null === i2) n2.close();
          else {
            var e11 = i2;
            i2 = null, e11.then(function() {
              return n2.close();
            });
          }
        }, error: function(e11) {
          if (null === i2) n2.error(e11);
          else {
            var t3 = i2;
            i2 = null, t3.then(function() {
              return n2.error(e11);
            });
          }
        } }), r2;
      }
      function th() {
        return this;
      }
      function tm(e10, t2, r2) {
        t2 = parseInt(t2.slice(2), 16);
        var n2 = [], i2 = false, a2 = 0, o2 = {};
        return o2[_] = function() {
          var t3, r3 = 0;
          return (t3 = { next: t3 = function(t4) {
            if (void 0 !== t4) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
            if (r3 === n2.length) {
              if (i2) return new e3("fulfilled", { done: true, value: void 0 }, null, e10);
              n2[r3] = e4(e10);
            }
            return n2[r3++];
          } })[_] = th, t3;
        }, tf(e10, t2, r2 = r2 ? o2[_]() : o2, { enqueueModel: function(t3) {
          a2 === n2.length ? n2[a2] = e8(e10, t3, false) : e7(n2[a2], t3, false), a2++;
        }, close: function(t3) {
          for (i2 = true, a2 === n2.length ? n2[a2] = e8(e10, t3, true) : e7(n2[a2], t3, true), a2++; a2 < n2.length; ) e7(n2[a2++], '"$undefined"', true);
        }, error: function(t3) {
          for (i2 = true, a2 === n2.length && (n2[a2] = e4(e10)); a2 < n2.length; ) e6(n2[a2++], t3);
        } }), r2;
      }
      function t_(e10, t2, r2) {
        var n2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData();
        return { _bundlerConfig: e10, _prefix: t2, _formData: n2, _chunks: /* @__PURE__ */ new Map(), _closed: false, _closedReason: null, _temporaryReferences: r2 };
      }
      function ty(e10) {
        tn(e10, Error("Connection closed."));
      }
      function tv(e10, t2, r2) {
        var n2 = eJ(e10, t2);
        return e10 = e0(n2), r2 ? Promise.all([r2, e10]).then(function(e11) {
          e11 = e11[0];
          var t3 = e1(n2);
          return t3.bind.apply(t3, [null].concat(e11));
        }) : e10 ? Promise.resolve(e10).then(function() {
          return e1(n2);
        }) : Promise.resolve(e1(n2));
      }
      function tb(e10, t2, r2) {
        if (ty(e10 = t_(t2, r2, void 0, e10)), (e10 = ti(e10, 0)).then(function() {
        }), "fulfilled" !== e10.status) throw e10.reason;
        return e10.value;
      }
      t.createClientModuleProxy = function(e10) {
        return new Proxy(e10 = k({}, e10, false), j);
      }, t.createTemporaryReferenceSet = function() {
        return /* @__PURE__ */ new WeakMap();
      }, t.decodeAction = function(e10, t2) {
        var r2 = new FormData(), n2 = null;
        return e10.forEach(function(i2, a2) {
          a2.startsWith("$ACTION_") ? a2.startsWith("$ACTION_REF_") ? (i2 = tb(e10, t2, i2 = "$ACTION_" + a2.slice(12) + ":"), n2 = tv(t2, i2.id, i2.bound)) : a2.startsWith("$ACTION_ID_") && (n2 = tv(t2, i2 = a2.slice(11), null)) : r2.append(a2, i2);
        }), null === n2 ? null : n2.then(function(e11) {
          return e11.bind(null, r2);
        });
      }, t.decodeFormState = function(e10, t2, r2) {
        var n2 = t2.get("$ACTION_KEY");
        if ("string" != typeof n2) return Promise.resolve(null);
        var i2 = null;
        if (t2.forEach(function(e11, n3) {
          n3.startsWith("$ACTION_REF_") && (i2 = tb(t2, r2, "$ACTION_" + n3.slice(12) + ":"));
        }), null === i2) return Promise.resolve(null);
        var a2 = i2.id;
        return Promise.resolve(i2.bound).then(function(t3) {
          return null === t3 ? null : [e10, n2, a2, t3.length - 1];
        });
      }, t.decodeReply = function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = new FormData();
          n2.append("0", e10), e10 = n2;
        }
        return t2 = ti(e10 = t_(t2, "", r2 ? r2.temporaryReferences : void 0, e10), 0), ty(e10), t2;
      }, t.decodeReplyFromAsyncIterable = function(e10, t2, r2) {
        function n2(e11) {
          tn(a2, e11), "function" == typeof i2.throw && i2.throw(e11).then(n2, n2);
        }
        var i2 = e10[_](), a2 = t_(t2, "", r2 ? r2.temporaryReferences : void 0);
        return i2.next().then(function e11(t3) {
          if (t3.done) ty(a2);
          else {
            var r3 = (t3 = t3.value)[0];
            if ("string" == typeof (t3 = t3[1])) {
              a2._formData.append(r3, t3);
              var o2 = a2._prefix;
              if (r3.startsWith(o2)) {
                var s2 = a2._chunks;
                r3 = +r3.slice(o2.length), (s2 = s2.get(r3)) && e9(s2, t3, r3);
              }
            } else a2._formData.append(r3, t3);
            i2.next().then(e11, n2);
          }
        }, n2), ti(a2, 0);
      }, t.registerClientReference = function(e10, t2, r2) {
        return k(e10, t2 + "#" + r2, false);
      }, t.registerServerReference = function(e10, t2, r2) {
        return Object.defineProperties(e10, { $$typeof: { value: P }, $$id: { value: null === r2 ? t2 : t2 + "#" + r2, configurable: true }, $$bound: { value: null, configurable: true }, bind: { value: L, configurable: true } });
      };
      let tw = "function" == typeof globalThis.setImmediate && globalThis.propertyIsEnumerable("setImmediate") ? globalThis.setImmediate : setTimeout;
      t.renderToReadableStream = function(e10, t2, r2) {
        var n2 = new eh(20, e10, t2, r2 ? r2.onError : void 0, r2 ? r2.identifierPrefix : void 0, r2 ? r2.onPostpone : void 0, r2 ? r2.temporaryReferences : void 0, void 0, void 0, em, em);
        if (r2 && r2.signal) {
          var i2 = r2.signal;
          if (i2.aborted) eX(n2, i2.reason);
          else {
            var a2 = function() {
              eX(n2, i2.reason), i2.removeEventListener("abort", a2);
            };
            i2.addEventListener("abort", a2);
          }
        }
        return new ReadableStream({ type: "bytes", start: function() {
          eF(n2);
        }, pull: function(e11) {
          eK(n2, e11);
        }, cancel: function(e11) {
          n2.destination = null, eX(n2, e11);
        } }, { highWaterMark: 0 });
      }, t.unstable_prerender = function(e10, t2, r2) {
        return new Promise(function(n2, i2) {
          var a2 = new eh(21, e10, t2, r2 ? r2.onError : void 0, r2 ? r2.identifierPrefix : void 0, r2 ? r2.onPostpone : void 0, r2 ? r2.temporaryReferences : void 0, void 0, void 0, function() {
            n2({ prelude: new ReadableStream({ type: "bytes", start: function() {
              eF(a2);
            }, pull: function(e11) {
              eK(a2, e11);
            }, cancel: function(e11) {
              a2.destination = null, eX(a2, e11);
            } }, { highWaterMark: 0 }) });
          }, i2);
          if (r2 && r2.signal) {
            var o2 = r2.signal;
            if (o2.aborted) eX(a2, o2.reason);
            else {
              var s2 = function() {
                eX(a2, o2.reason), o2.removeEventListener("abort", s2);
              };
              o2.addEventListener("abort", s2);
            }
          }
          eF(a2);
        });
      };
    }, 80: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"Startseite","about":"\xDCber uns","pricing":"Preise","blog":"Blog","docs":"Dokumentation","sitemap":"Sitemap"},"pricing":{"header":"Preise","title":"Einfache, transparente Preisgestaltung","description":"W\xE4hlen Sie den Plan, der f\xFCr Sie funktioniert\\nAlle Pl\xE4ne beinhalten Zugang zu unserer Plattform, Lead-Generierungstools und dedizierten Support."},"common":{"welcome":"Willkommen","language":"Sprache","switchLanguage":"Sprache wechseln","signIn":"Anmelden","signUp":"Registrieren","signOut":"Abmelden","scrollToTop":"Nach oben","share":{"button":"Teilen","title":"Teilen auf","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"E-Mail","copyLink":"Link kopieren","copySuccess":"Link in die Zwischenablage kopiert","copyFailed":"Kopieren fehlgeschlagen"},"comingSoon":{"title":"Demn\xE4chst verf\xFCgbar","description":"Diese Funktion befindet sich in der Entwicklung, bitte bleiben Sie dran","action":"Zur\xFCck zur Startseite"}},"blog":{"title":"Blog","description":"Entdecken Sie die neuesten Tech-Artikel, Tutorials und Einblicke","backToBlog":"Zur\xFCck zum Blog","readArticle":"Artikel lesen","readMore":"Mehr lesen","readingTime":"Min. Lesezeit","min":"Min","noArticles":"Keine Artikel","noArticlesDescription":"Es wurden noch keine Artikel ver\xF6ffentlicht, schauen Sie sp\xE4ter wieder vorbei.","articlesCount":"Artikel","categories":"Kategorien","tags":"Tags","recentPosts":"Neueste Beitr\xE4ge","relatedArticles":"Verwandte Artikel","shareArticle":"Artikel teilen","featured":"Hervorgehoben","tableOfContents":"Inhaltsverzeichnis","hotTags":"Beliebte Tags","quickNavigation":"Schnellnavigation","viewAllCategories":"Alle Kategorien anzeigen","viewAllTags":"Alle Tags anzeigen","allCategories":"Alle Kategorien","allTags":"Alle Tags","category":{"title":"Kategorie","allCategories":"Alle Kategorien","allCategoriesDescription":"Entdecken Sie spannende Inhalte zu verschiedenen Themen, insgesamt {count} Kategorien","noCategoriesTitle":"Keine Kategorien","noCategoriesDescription":"Es existieren noch keine Kategorien, sie werden automatisch erstellt, wenn Artikel ver\xF6ffentlicht werden.","articlesInCategory":"{count} Artikel gefunden","hotCategories":"Beliebte Kategorien","categoryOverview":"Kategorie-\xDCbersicht","categoryCloud":"Kategorie-Wolke"},"tag":{"title":"Tag","allTags":"Alle Tags","allTagsDescription":"Entdecken Sie interessante Themen, insgesamt {count} Tags","tagCloud":"Tag-Wolke","noTagsTitle":"Keine Tags","noTagsDescription":"Es existieren noch keine Tags, sie werden automatisch erstellt, wenn Artikel ver\xF6ffentlicht werden.","articlesWithTag":"{count} Artikel gefunden"},"pagination":{"previous":"Vorherige","next":"N\xE4chste","navigation":"Seitennummerierung","pageInfo":"Seite {current} von {total}","pageX":"Seite {page}"},"noResults":{"category":"Noch keine Artikel in dieser Kategorie.","tag":"Noch keine Artikel mit diesem Tag."}},"footer":{"allRightsReserved":"Alle Rechte vorbehalten.","featured":"Empfohlen","resources":"Ressourcen","legal":"Rechtliches","about":"\xDCber uns","privacy":"Datenschutzrichtlinie","terms":"Nutzungsbedingungen","sitemap":"Sitemap"},"meta":{"global":{"title":"Next Maker | Die Framework der n\xE4chsten Generation zum Erstellen von Online-Tools","description":"Bauen Sie die Zukunft von Online-Tools mit einem Framework der n\xE4chsten Generation.","keywords":""},"about":{"title":"\xDCber uns","description":"Erfahren Sie, wie wir uns daf\xFCr einsetzen, Benutzern hochwertige Online-Dienste anzubieten, und entdecken Sie die Geschichte unseres Teams und die Mission unseres Unternehmens."},"pricing":{"title":"Preise - W\xE4hlen Sie den Plan, der am besten zu Ihren Anforderungen passt","description":"Sehen Sie sich unsere Preispl\xE4ne an, von kostenlosen Einstiegspaketen bis hin zu vollst\xE4ndigen Unternehmensl\xF6sungen, die alle Ihre Anforderungen an Online-Tools erf\xFCllen."},"terms":{"title":"Nutzungsbedingungen","description":"Informieren Sie sich \xFCber die rechtlichen Bedingungen, Rechte und Verantwortlichkeiten bei der Nutzung unserer Website und Dienste. Bitte lesen Sie diese sorgf\xE4ltig durch, bevor Sie unsere Online-Tools verwenden."},"privacy":{"title":"Datenschutzrichtlinie","description":"Erfahren Sie, wie wir Ihre pers\xF6nlichen Daten sammeln, verwenden und sch\xFCtzen. Unsere Datenschutzrichtlinie erl\xE4utert im Detail, wie wir Benutzerdaten verarbeiten und sch\xFCtzen."},"docs":{"title":"Dokumentation - Nutzungsanleitungen und detaillierte Anweisungen","description":"Erhalten Sie detaillierte Dokumentationen und Anleitungen, um unsere Online-Tools optimal zu nutzen."},"blog":{"title":"Blog","description":"Entdecken Sie die neuesten Tech-Artikel, Tutorials und Einblicke"}},"docs":{"translations":{"search":"Suchen","searchNoResult":"Keine Ergebnisse gefunden","toc":"Inhaltsverzeichnis","tocNoHeadings":"Keine \xDCberschriften gefunden","lastUpdate":"Letzte Aktualisierung","chooseLanguage":"Sprache w\xE4hlen","nextPage":"N\xE4chste Seite","previousPage":"Vorherige Seite","chooseTheme":"Theme w\xE4hlen","editOnGithub":"Auf Github bearbeiten"}}}');
    }, 91: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => n });
      var n = function(e2) {
        return e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect", e2;
      }({});
    }, 96: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredLanguages = n;
      var t = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var n2 = t.exec(e2);
        if (!n2) return null;
        var i2 = n2[1], a2 = n2[2], o2 = i2;
        a2 && (o2 += "-" + a2);
        var s = 1;
        if (n2[3]) for (var l = n2[3].split(";"), u = 0; u < l.length; u++) {
          var c = l[u].split("=");
          "q" === c[0] && (s = parseFloat(c[1]));
        }
        return { prefix: i2, suffix: a2, q: s, i: r2, full: o2 };
      }
      function n(e2, t2) {
        var n2 = function(e3) {
          for (var t3 = e3.split(","), n3 = 0, i2 = 0; n3 < t3.length; n3++) {
            var a2 = r(t3[n3].trim(), n3);
            a2 && (t3[i2++] = a2);
          }
          return t3.length = i2, t3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!t2) return n2.filter(o).sort(i).map(a);
        var s = t2.map(function(e3, t3) {
          for (var i2 = { o: -1, q: 0, s: 0 }, a2 = 0; a2 < n2.length; a2++) {
            var o2 = function(e4, t4, n3) {
              var i3 = r(e4);
              if (!i3) return null;
              var a3 = 0;
              if (t4.full.toLowerCase() === i3.full.toLowerCase()) a3 |= 4;
              else if (t4.prefix.toLowerCase() === i3.full.toLowerCase()) a3 |= 2;
              else if (t4.full.toLowerCase() === i3.prefix.toLowerCase()) a3 |= 1;
              else if ("*" !== t4.full) return null;
              return { i: n3, o: t4.i, q: t4.q, s: a3 };
            }(e3, n2[a2], t3);
            o2 && 0 > (i2.s - o2.s || i2.q - o2.q || i2.o - o2.o) && (i2 = o2);
          }
          return i2;
        });
        return s.filter(o).sort(i).map(function(e3) {
          return t2[s.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function a(e2) {
        return e2.full;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 102: (e, t, r) => {
      "use strict";
      var n = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return s;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return a;
      } });
      let i = r(443), a = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function o(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: u, mode: c, redirect: d, referrer: p, referrerPolicy: f } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: u, mode: c, redirect: d, referrer: p, referrerPolicy: f } };
      }
      async function s(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, a);
        if (!r2) return e2(t2);
        let { testData: s2, proxyPort: l2 } = r2, u = await o(s2, t2), c = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(u), next: { internal: true } });
        if (!c.ok) throw Object.defineProperty(Error(`Proxy request failed: ${c.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await c.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
        }
        let { status: f, headers: g, body: h } = d.response;
        return new Response(h ? n.from(h, "base64") : null, { status: f, headers: new Headers(g) });
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : s(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 114: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"\u0413\u043B\u0430\u0432\u043D\u0430\u044F","about":"\u041E \u043D\u0430\u0441","pricing":"\u0426\u0435\u043D\u044B","blog":"\u0411\u043B\u043E\u0433","docs":"\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F","sitemap":"\u041A\u0430\u0440\u0442\u0430 \u0441\u0430\u0439\u0442\u0430"},"pricing":{"header":"\u0426\u0435\u043D\u044B","title":"\u041F\u0440\u043E\u0441\u0442\u044B\u0435 \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0435 \u0446\u0435\u043D\u044B","description":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043B\u0430\u043D, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0432\u0430\u043C\\n\u0412\u0441\u0435 \u043F\u043B\u0430\u043D\u044B \u0432\u043A\u043B\u044E\u0447\u0430\u044E\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043D\u0430\u0448\u0435\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435, \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u043B\u0438\u0434\u043E\u0432 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0443\u044E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443."},"common":{"welcome":"\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C","language":"\u042F\u0437\u044B\u043A","switchLanguage":"\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u044F\u0437\u044B\u043A","signIn":"\u0412\u043E\u0439\u0442\u0438","signUp":"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F","signOut":"\u0412\u044B\u0439\u0442\u0438","scrollToTop":"\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430\u0432\u0435\u0440\u0445","share":{"button":"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F","title":"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u0432","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430","copyLink":"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443","copySuccess":"\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430","copyFailed":"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"},"comingSoon":{"title":"\u0421\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E","description":"\u042D\u0442\u0430 \u0444\u0443\u043D\u043A\u0446\u0438\u044F \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043B\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\u043C\u0438","action":"\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E"}},"blog":{"title":"\u0411\u043B\u043E\u0433","description":"\u0418\u0437\u0443\u0447\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438, \u0443\u0440\u043E\u043A\u0438 \u0438 \u0438\u0434\u0435\u0438","backToBlog":"\u041D\u0430\u0437\u0430\u0434 \u0432 \u0431\u043B\u043E\u0433","readArticle":"\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E","readMore":"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u0435\u0435","readingTime":"\u043C\u0438\u043D \u0447\u0442\u0435\u043D\u0438\u044F","min":"\u043C\u0438\u043D","noArticles":"\u041D\u0435\u0442 \u0441\u0442\u0430\u0442\u0435\u0439","noArticlesDescription":"\u0421\u0442\u0430\u0442\u044C\u0438 \u0435\u0449\u0435 \u043D\u0435 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u044B, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0442\u0435\u0441\u044C \u043F\u043E\u0437\u0436\u0435.","articlesCount":"\u0441\u0442\u0430\u0442\u0435\u0439","categories":"\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438","tags":"\u0422\u0435\u0433\u0438","recentPosts":"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438","relatedArticles":"\u0421\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u044C\u0438","shareArticle":"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u0441\u0442\u0430\u0442\u044C\u0435\u0439","featured":"\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u044B\u0435","tableOfContents":"\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435","hotTags":"\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0442\u0435\u0433\u0438","quickNavigation":"\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F","viewAllCategories":"\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438","viewAllTags":"\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u0442\u0435\u0433\u0438","allCategories":"\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438","allTags":"\u0412\u0441\u0435 \u0442\u0435\u0433\u0438","category":{"title":"\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F","allCategories":"\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438","allCategoriesDescription":"\u0418\u0441\u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043D\u0430 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u0442\u0435\u043C\u044B, \u0432\u0441\u0435\u0433\u043E {count} \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439","noCategoriesTitle":"\u041D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439","noCategoriesDescription":"\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0435\u0449\u0435 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442, \u043E\u043D\u0438 \u0431\u0443\u0434\u0443\u0442 \u0441\u043E\u0437\u0434\u0430\u043D\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0440\u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0435\u0439.","articlesInCategory":"\u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0441\u0442\u0430\u0442\u0435\u0439","hotCategories":"\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438","categoryOverview":"\u041E\u0431\u0437\u043E\u0440 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439","categoryCloud":"\u041E\u0431\u043B\u0430\u043A\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439"},"tag":{"title":"\u0422\u0435\u0433","allTags":"\u0412\u0441\u0435 \u0442\u0435\u0433\u0438","allTagsDescription":"\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0435 \u0442\u0435\u043C\u044B, \u0432\u0441\u0435\u0433\u043E {count} \u0442\u0435\u0433\u043E\u0432","tagCloud":"\u041E\u0431\u043B\u0430\u043A\u043E \u0442\u0435\u0433\u043E\u0432","noTagsTitle":"\u041D\u0435\u0442 \u0442\u0435\u0433\u043E\u0432","noTagsDescription":"\u0422\u0435\u0433\u0438 \u0435\u0449\u0435 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442, \u043E\u043D\u0438 \u0431\u0443\u0434\u0443\u0442 \u0441\u043E\u0437\u0434\u0430\u043D\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0440\u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0435\u0439.","articlesWithTag":"\u041D\u0430\u0439\u0434\u0435\u043D\u043E {count} \u0441\u0442\u0430\u0442\u0435\u0439"},"pagination":{"previous":"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F","next":"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F","navigation":"\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u043C","pageInfo":"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 {current} \u0438\u0437 {total}","pageX":"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 {page}"},"noResults":{"category":"\u0412 \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0441\u0442\u0430\u0442\u0435\u0439.","tag":"\u0421\u0442\u0430\u0442\u0435\u0439 \u0441 \u044D\u0442\u0438\u043C \u0442\u0435\u0433\u043E\u043C \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."}},"footer":{"allRightsReserved":"\u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B.","featured":"\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435","resources":"\u0420\u0435\u0441\u0443\u0440\u0441\u044B","legal":"\u041F\u0440\u0430\u0432\u043E\u0432\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F","about":"\u041E \u043D\u0430\u0441","privacy":"\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438","terms":"\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F","sitemap":"\u041A\u0430\u0440\u0442\u0430 \u0441\u0430\u0439\u0442\u0430"},"meta":{"global":{"title":"Next Maker | \u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043A\u043E\u043B\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043E\u043D\u043B\u0430\u0439\u043D-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432","description":"\u0421\u043E\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u043E\u043D\u043B\u0430\u0439\u043D-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0441 \u0444\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u043E\u043C \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043A\u043E\u043B\u0435\u043D\u0438\u044F.","keywords":""},"about":{"title":"\u041E \u043D\u0430\u0441","description":"\u0423\u0437\u043D\u0430\u0439\u0442\u0435, \u043A\u0430\u043A \u043C\u044B \u0441\u0442\u0440\u0435\u043C\u0438\u043C\u0441\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C \u0432\u044B\u0441\u043E\u043A\u043E\u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u0435\u0440\u0432\u0438\u0441\u044B, \u0438 \u043F\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u0438\u0441\u0442\u043E\u0440\u0438\u0435\u0439 \u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0438 \u043C\u0438\u0441\u0441\u0438\u0435\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438."},"pricing":{"title":"\u0426\u0435\u043D\u044B - \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043B\u0430\u043D, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u044F\u043C","description":"\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0438\u043C\u0438 \u0442\u0430\u0440\u0438\u0444\u043D\u044B\u043C\u0438 \u043F\u043B\u0430\u043D\u0430\u043C\u0438, \u043E\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0445 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u0430\u043A\u0435\u0442\u043E\u0432 \u0434\u043E \u043F\u043E\u043B\u043D\u043E\u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0440\u0435\u0448\u0435\u043D\u0438\u0439, \u043E\u0442\u0432\u0435\u0447\u0430\u044E\u0449\u0438\u0445 \u0432\u0441\u0435\u043C \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u044F\u043C \u0432 \u043E\u043D\u043B\u0430\u0439\u043D-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u0445."},"terms":{"title":"\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F","description":"\u041E\u0437\u043D\u0430\u043A\u043E\u043C\u044C\u0442\u0435\u0441\u044C \u0441 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u043C\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438, \u043F\u0440\u0430\u0432\u0430\u043C\u0438 \u0438 \u043E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u044F\u043C\u0438 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u043D\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u0438 \u0443\u0441\u043B\u0443\u0433. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0434 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u043D\u0430\u0448\u0438\u0445 \u043E\u043D\u043B\u0430\u0439\u043D-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432."},"privacy":{"title":"\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438","description":"\u0423\u0437\u043D\u0430\u0439\u0442\u0435, \u043A\u0430\u043A \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0432\u0430\u0448\u0443 \u043B\u0438\u0447\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E. \u041D\u0430\u0448\u0430 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E \u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442, \u043A\u0430\u043A \u043C\u044B \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439."},"docs":{"title":"\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F - \u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043F\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044E \u0438 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438","description":"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u043F\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044E \u043D\u0430\u0448\u0438\u0445 \u043E\u043D\u043B\u0430\u0439\u043D-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432."},"blog":{"title":"\u0411\u043B\u043E\u0433","description":"\u0418\u0437\u0443\u0447\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438, \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443"}},"docs":{"translations":{"search":"\u041F\u043E\u0438\u0441\u043A","searchNoResult":"\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E","toc":"\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435","tocNoHeadings":"\u041D\u0435\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432","lastUpdate":"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435","chooseLanguage":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u044F\u0437\u044B\u043A","nextPage":"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430","previousPage":"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430","chooseTheme":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u0435\u043C\u0443","editOnGithub":"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430 GitHub"}}}');
    }, 120: (e, t, r) => {
      "use strict";
      r.d(t, { s: () => n });
      let n = (0, r(198).xl)();
    }, 159: (e, t, r) => {
      "use strict";
      r.d(t, { t3: () => l, I3: () => d, Ui: () => u, xI: () => o, Pk: () => s });
      var n = r(225), i = r(486);
      r(636), r(933), r(325), r(591);
      let a = "function" == typeof n.unstable_postpone;
      function o(e2, t2, r2) {
        let n2 = Object.defineProperty(new i.F(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function s(e2, t2) {
        t2 && "cache" !== t2.type && "unstable-cache" !== t2.type && ("prerender" === t2.type || "prerender-legacy" === t2.type) && (t2.revalidate = 0);
      }
      function l(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2 = n2.dynamicTracking;
          i2 && null === i2.syncDynamicErrorWithStack && (i2.syncDynamicExpression = t2, i2.syncDynamicErrorWithStack = r2, true === n2.validating && (i2.syncDynamicLogged = true)), function(e3, t3, r3) {
            let n3 = f(`Route ${e3} needs to bail out of prerendering at this point because it used ${t3}.`);
            r3.controller.abort(n3);
            let i3 = r3.dynamicTracking;
            i3 && i3.dynamicAccesses.push({ stack: i3.isDebugDynamicAccesses ? Error().stack : void 0, expression: t3 });
          }(e2, t2, n2);
        }
        throw f(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function u(e2, t2, r2) {
        (function() {
          if (!a) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), n.unstable_postpone(c(e2, t2));
      }
      function c(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function d(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && p(e2.message);
      }
      function p(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === p(c("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      function f(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 198: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => o });
      let n = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function o() {
        return a ? new a() : new i();
      }
    }, 225: (e, t, r) => {
      "use strict";
      e.exports = r(953);
    }, 229: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => a });
      var n = r(905), i = r(301);
      function a(e2) {
        return (0, i.nJ)(e2) || (0, n.RM)(e2);
      }
    }, 245: (e) => {
      "use strict";
      e.exports = JSON.parse(`{"menu":{"home":"Accueil","about":"\xC0 propos","pricing":"Tarifs","blog":"Blog","docs":"Documentation","sitemap":"Plan du site"},"pricing":{"header":"Tarifs","title":"Tarification simple et transparente","description":"Choisissez le forfait qui vous convient\\nTous les forfaits comprennent l'acc\xE8s \xE0 notre plateforme, des outils de g\xE9n\xE9ration de leads et un support d\xE9di\xE9."},"common":{"welcome":"Bienvenue","language":"Langue","switchLanguage":"Changer de langue","signIn":"Se connecter","signUp":"S'inscrire","signOut":"Se d\xE9connecter","scrollToTop":"Retour en haut","share":{"button":"Partager","title":"Partager sur","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"E-mail","copyLink":"Copier le lien","copySuccess":"Lien copi\xE9 dans le presse-papiers","copyFailed":"\xC9chec de la copie"},"comingSoon":{"title":"Bient\xF4t disponible","description":"Cette fonctionnalit\xE9 est en cours de d\xE9veloppement, veuillez rester \xE0 l'\xE9coute","action":"Retour \xE0 l'accueil"}},"blog":{"title":"Blog","description":"Explorez les derniers articles techniques, tutoriels et perspectives","backToBlog":"Retour au blog","readArticle":"Lire l'article","readMore":"Lire plus","readingTime":"min de lecture","min":"min","noArticles":"Aucun article","noArticlesDescription":"Aucun article n'a encore \xE9t\xE9 publi\xE9, revenez plus tard.","articlesCount":"articles","categories":"Cat\xE9gories","tags":"Tags","recentPosts":"Articles r\xE9cents","relatedArticles":"Articles connexes","shareArticle":"Partager l'article","featured":"\xC0 la une","tableOfContents":"Table des mati\xE8res","hotTags":"Tags populaires","quickNavigation":"Navigation rapide","viewAllCategories":"Voir toutes les cat\xE9gories","viewAllTags":"Voir tous les tags","allCategories":"Toutes les cat\xE9gories","allTags":"Tous les tags","category":{"title":"Cat\xE9gorie","allCategories":"Toutes les cat\xE9gories","allCategoriesDescription":"Explorez du contenu passionnant sur diff\xE9rents sujets, {count} cat\xE9gories au total","noCategoriesTitle":"Aucune cat\xE9gorie","noCategoriesDescription":"Aucune cat\xE9gorie n'existe encore, elles seront cr\xE9\xE9es automatiquement lors de la publication d'articles.","articlesInCategory":"{count} articles trouv\xE9s","hotCategories":"Cat\xE9gories populaires","categoryOverview":"Aper\xE7u des cat\xE9gories","categoryCloud":"Nuage de cat\xE9gories"},"tag":{"title":"Tag","allTags":"Tous les tags","allTagsDescription":"D\xE9couvrez des sujets d'int\xE9r\xEAt, {count} tags au total","tagCloud":"Nuage de tags","noTagsTitle":"Aucun tag","noTagsDescription":"Aucun tag n'existe encore, ils seront cr\xE9\xE9s automatiquement lors de la publication d'articles.","articlesWithTag":"{count} articles trouv\xE9s"},"pagination":{"previous":"Pr\xE9c\xE9dent","next":"Suivant","navigation":"Navigation de pagination","pageInfo":"Page {current} sur {total}","pageX":"Page {page}"},"noResults":{"category":"Aucun article dans cette cat\xE9gorie pour le moment.","tag":"Aucun article avec ce tag pour le moment."}},"footer":{"allRightsReserved":"Tous droits r\xE9serv\xE9s.","featured":"En vedette","resources":"Ressources","legal":"Mentions l\xE9gales","about":"\xC0 propos","privacy":"Politique de confidentialit\xE9","terms":"Conditions d'utilisation","sitemap":"Plan du site"},"meta":{"global":{"title":"Next Maker | La plateforme de nouvelle g\xE9n\xE9ration pour cr\xE9er des outils en ligne","description":"Construisez l'avenir des outils en ligne avec une plateforme de nouvelle g\xE9n\xE9ration.","keywords":""},"about":{"title":"\xC0 propos de nous","description":"D\xE9couvrez comment nous nous engageons \xE0 fournir des services en ligne de haute qualit\xE9 aux utilisateurs, et explorez l'histoire de notre \xE9quipe et la mission de notre entreprise."},"pricing":{"title":"Tarifs - Choisissez le forfait qui r\xE9pond le mieux \xE0 vos besoins","description":"Consultez nos offres tarifaires, des forfaits gratuits de base aux solutions d'entreprise compl\xE8tes, r\xE9pondant \xE0 tous vos besoins en mati\xE8re d'outils en ligne."},"terms":{"title":"Conditions d'utilisation","description":"Informez-vous sur les conditions l\xE9gales, les droits et les responsabilit\xE9s li\xE9s \xE0 l'utilisation de notre site web et de nos services. Veuillez lire attentivement avant d'utiliser nos outils en ligne."},"privacy":{"title":"Politique de confidentialit\xE9","description":"D\xE9couvrez comment nous collectons, utilisons et prot\xE9geons vos informations personnelles. Notre politique de confidentialit\xE9 d\xE9taille comment nous traitons et prot\xE9geons les donn\xE9es des utilisateurs."},"docs":{"title":"Documentation - Guides d'utilisation et instructions d\xE9taill\xE9es","description":"Obtenez une documentation et des guides d\xE9taill\xE9s pour tirer le meilleur parti de nos outils en ligne."},"blog":{"title":"Blog","description":"Explorez les derniers articles techniques, tutoriels et perspectives"}},"docs":{"translations":{"search":"Rechercher","searchNoResult":"Aucun r\xE9sultat trouv\xE9","toc":"Table des mati\xE8res","tocNoHeadings":"Aucun titre trouv\xE9","lastUpdate":"Derni\xE8re mise \xE0 jour","chooseLanguage":"Choisir la langue","nextPage":"Page suivante","previousPage":"Page pr\xE9c\xE9dente","chooseTheme":"Choisir le th\xE8me","editOnGithub":"Modifier sur Github"}}}`);
    }, 262: (e, t, r) => {
      "use strict";
      var n = r(225), i = Symbol.for("react.transitional.element");
      if (Symbol.for("react.fragment"), !n.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      t.jsx = function(e2, t2, r2) {
        var n2 = null;
        if (void 0 !== r2 && (n2 = "" + r2), void 0 !== t2.key && (n2 = "" + t2.key), "key" in t2) for (var a in r2 = {}, t2) "key" !== a && (r2[a] = t2[a]);
        else r2 = t2;
        return { $$typeof: i, type: e2, key: n2, ref: void 0 !== (t2 = r2.ref) ? t2 : null, props: r2 };
      };
    }, 288: (e) => {
      "use strict";
      e.exports = r, e.exports.preferredCharsets = r;
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var o = function(e3) {
          for (var r3 = e3.split(","), n2 = 0, i2 = 0; n2 < r3.length; n2++) {
            var a2 = function(e4, r4) {
              var n3 = t.exec(e4);
              if (!n3) return null;
              var i3 = n3[1], a3 = 1;
              if (n3[2]) for (var o2 = n3[2].split(";"), s2 = 0; s2 < o2.length; s2++) {
                var l = o2[s2].trim().split("=");
                if ("q" === l[0]) {
                  a3 = parseFloat(l[1]);
                  break;
                }
              }
              return { charset: i3, q: a3, i: r4 };
            }(r3[n2].trim(), n2);
            a2 && (r3[i2++] = a2);
          }
          return r3.length = i2, r3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!r2) return o.filter(a).sort(n).map(i);
        var s = r2.map(function(e3, t2) {
          for (var r3 = { o: -1, q: 0, s: 0 }, n2 = 0; n2 < o.length; n2++) {
            var i2 = function(e4, t3, r4) {
              var n3 = 0;
              if (t3.charset.toLowerCase() === e4.toLowerCase()) n3 |= 1;
              else if ("*" !== t3.charset) return null;
              return { i: r4, o: t3.i, q: t3.q, s: n3 };
            }(e3, o[n2], t2);
            i2 && 0 > (r3.s - i2.s || r3.q - i2.q || r3.o - i2.o) && (r3 = i2);
          }
          return r3;
        });
        return s.filter(a).sort(n).map(function(e3) {
          return r2[s.indexOf(e3)];
        });
      }
      function n(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function i(e2) {
        return e2.charset;
      }
      function a(e2) {
        return e2.q > 0;
      }
    }, 301: (e, t, r) => {
      "use strict";
      r.d(t, { nJ: () => o, oJ: () => i, zB: () => a });
      var n = r(91);
      let i = "NEXT_REDIRECT";
      var a = function(e2) {
        return e2.push = "push", e2.replace = "replace", e2;
      }({});
      function o(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, a2] = t2, o2 = t2.slice(2, -2).join(";"), s = Number(t2.at(-2));
        return r2 === i && ("replace" === a2 || "push" === a2) && "string" == typeof o2 && !isNaN(s) && s in n.Q;
      }
    }, 310: (e, t, r) => {
      "use strict";
      r.d(t, { X: () => function e2(t2) {
        if ((0, a.p)(t2) || "object" == typeof t2 && null !== t2 && "digest" in t2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === t2.digest || (0, s.h)(t2) || (0, o.I3)(t2) || "object" == typeof t2 && null !== t2 && t2.$$typeof === i || (0, n.T)(t2)) throw t2;
        t2 instanceof Error && "cause" in t2 && e2(t2.cause);
      } });
      var n = r(591);
      let i = Symbol.for("react.postpone");
      var a = r(229), o = r(159), s = r(486);
    }, 325: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n });
      let n = (0, r(198).xl)();
    }, 330: (e, t, r) => {
      "use strict";
      var n;
      (n = r(77)).renderToReadableStream, n.decodeReply, n.decodeReplyFromAsyncIterable, n.decodeAction, n.decodeFormState, n.registerServerReference, t.YR = n.registerClientReference, n.createClientModuleProxy, n.createTemporaryReferenceSet;
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 374: (e) => {
      "use strict";
      e.exports = JSON.parse(`{"menu":{"home":"Home","about":"Chi siamo","pricing":"Prezzi","blog":"Blog","docs":"Documentazione","sitemap":"Mappa del sito"},"pricing":{"header":"Prezzi","title":"Prezzi semplici e trasparenti","description":"Scegli il piano adatto a te\\nTutti i piani includono l'accesso alla nostra piattaforma, strumenti di generazione di lead e supporto dedicato."},"common":{"welcome":"Benvenuto","language":"Lingua","switchLanguage":"Cambia lingua","signIn":"Accedi","signUp":"Registrati","signOut":"Disconnetti","scrollToTop":"Torna in cima","share":{"button":"Condividi","title":"Condividi su","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"E-mail","copyLink":"Copia link","copySuccess":"Link copiato negli appunti","copyFailed":"Copia fallita"},"comingSoon":{"title":"Prossimamente","description":"Questa funzionalit\xE0 \xE8 in fase di sviluppo, resta sintonizzato.","action":"Torna alla home"}},"blog":{"title":"Blog","description":"Esplora gli ultimi articoli tecnici, tutorial e approfondimenti","backToBlog":"Torna al blog","readArticle":"Leggi articolo","readMore":"Leggi di pi\xF9","readingTime":"min di lettura","min":"min","noArticles":"Nessun articolo","noArticlesDescription":"Non sono ancora stati pubblicati articoli, ricontrolla pi\xF9 tardi.","articlesCount":"articoli","categories":"Categorie","tags":"Tag","recentPosts":"Articoli recenti","relatedArticles":"Articoli correlati","shareArticle":"Condividi articolo","featured":"In evidenza","tableOfContents":"Indice","hotTags":"Tag popolari","quickNavigation":"Navigazione rapida","viewAllCategories":"Vedi tutte le categorie","viewAllTags":"Vedi tutti i tag","allCategories":"Tutte le categorie","allTags":"Tutti i tag","category":{"title":"Categoria","allCategories":"Tutte le categorie","allCategoriesDescription":"Esplora contenuti interessanti su diversi argomenti, {count} categorie in totale","noCategoriesTitle":"Nessuna categoria","noCategoriesDescription":"Non esistono ancora categorie, verranno create automaticamente quando verranno pubblicati gli articoli.","articlesInCategory":"{count} articoli trovati","hotCategories":"Categorie popolari","categoryOverview":"Panoramica categorie","categoryCloud":"Nuvola di categorie"},"tag":{"title":"Tag","allTags":"Tutti i tag","allTagsDescription":"Scopri argomenti di interesse, {count} tag in totale","tagCloud":"Nuvola di tag","noTagsTitle":"Nessun tag","noTagsDescription":"Non esistono ancora tag, verranno creati automaticamente quando verranno pubblicati gli articoli.","articlesWithTag":"{count} articoli trovati"},"pagination":{"previous":"Precedente","next":"Successivo","navigation":"Navigazione paginazione","pageInfo":"Pagina {current} di {total}","pageX":"Pagina {page}"},"noResults":{"category":"Nessun articolo in questa categoria ancora.","tag":"Nessun articolo con questo tag ancora."}},"footer":{"allRightsReserved":"Tutti i diritti riservati.","featured":"In evidenza","resources":"Risorse","legal":"Legale","about":"Chi siamo","privacy":"Politica sulla privacy","terms":"Termini di servizio","sitemap":"Mappa del sito"},"meta":{"global":{"title":"Next Maker | Il framework di nuova generazione per costruire strumenti online.","description":"Costruisci il futuro degli strumenti online con un framework di nuova generazione.","keywords":""},"about":{"title":"Chi siamo","description":"Scopri come ci impegniamo a fornire servizi online di alta qualit\xE0 agli utenti e esplora il background del nostro team e la missione dell'azienda."},"pricing":{"title":"Prezzi - Scegli il piano adatto a te","description":"Visualizza i nostri piani tariffari, dai pacchetti gratuiti di base alle soluzioni aziendali complete che soddisfano tutte le tue esigenze di strumenti online."},"terms":{"title":"Termini di servizio","description":"Informati sui termini legali, condizioni, diritti e responsabilit\xE0 dell'utilizzo del nostro sito web e servizi. Si prega di leggere attentamente prima di utilizzare i nostri strumenti online."},"privacy":{"title":"Politica sulla privacy","description":"Scopri come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali. La nostra politica sulla privacy descrive in dettaglio come elaboriamo e proteggiamo i dati degli utenti."},"docs":{"title":"Documentazione - Guide per l'uso e istruzioni dettagliate","description":"Ottieni documentazione e guide dettagliate per sfruttare al massimo i nostri strumenti online."},"blog":{"title":"Blog","description":"Esplora gli ultimi articoli tecnici, tutorial e approfondimenti"}},"docs":{"translations":{"search":"Cerca","searchNoResult":"Nessun risultato trovato","toc":"Indice","tocNoHeadings":"Nessun titolo trovato","lastUpdate":"Ultimo aggiornamento","chooseLanguage":"Scegli lingua","nextPage":"Pagina successiva","previousPage":"Pagina precedente","chooseTheme":"Scegli tema","editOnGithub":"Modifica su Github"}}}`);
    }, 404: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, a = t2.split(n), o = (r2 || {}).decode || e2, s = 0; s < a.length; s++) {
              var l = a[s], u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(), d = l.substr(++u, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[c] && (i2[c] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, o));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var a = n2 || {}, o = a.encode || r;
            if ("function" != typeof o) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var s = o(t2);
            if (s && !i.test(s)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + s;
            if (null != a.maxAge) {
              var u = a.maxAge - 0;
              if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(u);
            }
            if (a.domain) {
              if (!i.test(a.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + a.domain;
            }
            if (a.path) {
              if (!i.test(a.path)) throw TypeError("option path is invalid");
              l += "; Path=" + a.path;
            }
            if (a.expires) {
              if ("function" != typeof a.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly && (l += "; HttpOnly"), a.secure && (l += "; Secure"), a.sameSite) switch ("string" == typeof a.sameSite ? a.sameSite.toLowerCase() : a.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 406: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => rG });
      var i, a = {};
      async function o() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(a), r.d(a, { config: () => rq, middleware: () => rj });
      let s = null;
      async function l() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        s || (s = o());
        let e10 = await s;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function u(...e10) {
        let t10 = await o();
        try {
          var r2;
          await (null == t10 || null == (r2 = t10.onRequestError) ? void 0 : r2.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let c = null;
      function d() {
        return c || (c = l()), c;
      }
      function p(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r2) {
          if ("then" === r2) return {};
          throw Object.defineProperty(Error(p(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, construct() {
          throw Object.defineProperty(Error(p(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, apply(r2, n2, i2) {
          if ("function" == typeof i2[0]) return i2[0](t10);
          throw Object.defineProperty(Error(p(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), d();
      class f extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class g extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class h extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let m = "_N_T_", _ = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function y(e10) {
        var t10, r2, n2, i2, a2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, a2 = false; l2(); ) if ("," === (r2 = e10.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), i2 = s2; s2 < e10.length && "=" !== (r2 = e10.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (a2 = true, s2 = i2, o2.push(e10.substring(t10, n2)), t10 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!a2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function v(e10) {
        let t10 = {}, r2 = [];
        if (e10) for (let [n2, i2] of e10.entries()) "set-cookie" === n2.toLowerCase() ? (r2.push(...y(i2)), t10[n2] = 1 === r2.length ? r2[0] : r2) : t10[n2] = i2;
        return t10;
      }
      function b(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ..._, GROUP: { builtinReact: [_.reactServerComponents, _.actionBrowser], serverOnly: [_.reactServerComponents, _.actionBrowser, _.instrument, _.middleware], neutralTarget: [_.apiNode, _.apiEdge], clientOnly: [_.serverSideRendering, _.appPagesBrowser], bundled: [_.reactServerComponents, _.actionBrowser, _.serverSideRendering, _.appPagesBrowser, _.shared, _.instrument, _.middleware], appPages: [_.reactServerComponents, _.serverSideRendering, _.appPagesBrowser, _.actionBrowser] } });
      let w = Symbol("response"), S = Symbol("passThrough"), C = Symbol("waitUntil");
      class T {
        constructor(e10, t10) {
          this[S] = false, this[C] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[w] || (this[w] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[S] = true;
        }
        waitUntil(e10) {
          if ("external" === this[C].kind) return (0, this[C].function)(e10);
          this[C].promises.push(e10);
        }
      }
      class E extends T {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new f({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new f({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function R(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function x(e10) {
        let t10 = e10.indexOf("#"), r2 = e10.indexOf("?"), n2 = r2 > -1 && (t10 < 0 || r2 < t10);
        return n2 || t10 > -1 ? { pathname: e10.substring(0, n2 ? r2 : t10), query: n2 ? e10.substring(r2, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function O(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r2, query: n2, hash: i2 } = x(e10);
        return "" + t10 + r2 + n2 + i2;
      }
      function P(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r2, query: n2, hash: i2 } = x(e10);
        return "" + r2 + t10 + n2 + i2;
      }
      function k(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r2 } = x(e10);
        return r2 === t10 || r2.startsWith(t10 + "/");
      }
      let N = /* @__PURE__ */ new WeakMap();
      function A(e10, t10) {
        let r2;
        if (!t10) return { pathname: e10 };
        let n2 = N.get(t10);
        n2 || (n2 = t10.map((e11) => e11.toLowerCase()), N.set(t10, n2));
        let i2 = e10.split("/", 2);
        if (!i2[1]) return { pathname: e10 };
        let a2 = i2[1].toLowerCase(), o2 = n2.indexOf(a2);
        return o2 < 0 ? { pathname: e10 } : (r2 = t10[o2], { pathname: e10 = e10.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
      let L = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function I(e10, t10) {
        return new URL(String(e10).replace(L, "localhost"), t10 && String(t10).replace(L, "localhost"));
      }
      let M = Symbol("NextURLInternal");
      class D {
        constructor(e10, t10, r2) {
          let n2, i2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n2 = t10, i2 = r2 || {}) : i2 = r2 || t10 || {}, this[M] = { url: I(e10, n2 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r2, n2, i2;
          let a2 = function(e11, t11) {
            var r3, n3;
            let { basePath: i3, i18n: a3, trailingSlash: o3 } = null != (r3 = t11.nextConfig) ? r3 : {}, s3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : o3 };
            i3 && k(s3.pathname, i3) && (s3.pathname = function(e12, t12) {
              if (!k(e12, t12)) return e12;
              let r4 = e12.slice(t12.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(s3.pathname, i3), s3.basePath = i3);
            let l2 = s3.pathname;
            if (s3.pathname.startsWith("/_next/data/") && s3.pathname.endsWith(".json")) {
              let e12 = s3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              s3.buildId = e12[0], l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (s3.pathname = l2);
            }
            if (a3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(s3.pathname) : A(s3.pathname, a3.locales);
              s3.locale = e12.detectedLocale, s3.pathname = null != (n3 = e12.pathname) ? n3 : s3.pathname, !e12.detectedLocale && s3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : A(l2, a3.locales)).detectedLocale && (s3.locale = e12.detectedLocale);
            }
            return s3;
          }(this[M].url.pathname, { nextConfig: this[M].options.nextConfig, parseData: true, i18nProvider: this[M].options.i18nProvider }), o2 = function(e11, t11) {
            let r3;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r3 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r3 = e11.hostname;
            }
            return r3.toLowerCase();
          }(this[M].url, this[M].options.headers);
          this[M].domainLocale = this[M].options.i18nProvider ? this[M].options.i18nProvider.detectDomainLocale(o2) : function(e11, t11, r3) {
            if (e11) for (let a3 of (r3 && (r3 = r3.toLowerCase()), e11)) {
              var n3, i3;
              if (t11 === (null == (n3 = a3.domain) ? void 0 : n3.split(":", 1)[0].toLowerCase()) || r3 === a3.defaultLocale.toLowerCase() || (null == (i3 = a3.locales) ? void 0 : i3.some((e12) => e12.toLowerCase() === r3))) return a3;
            }
          }(null == (t10 = this[M].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r2 = this[M].domainLocale) ? void 0 : r2.defaultLocale) || (null == (i2 = this[M].options.nextConfig) || null == (n2 = i2.i18n) ? void 0 : n2.defaultLocale);
          this[M].url.pathname = a2.pathname, this[M].defaultLocale = s2, this[M].basePath = a2.basePath ?? "", this[M].buildId = a2.buildId, this[M].locale = a2.locale ?? s2, this[M].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r2, n2) {
            if (!t11 || t11 === r2) return e11;
            let i2 = e11.toLowerCase();
            return !n2 && (k(i2, "/api") || k(i2, "/" + t11.toLowerCase())) ? e11 : O(e11, "/" + t11);
          }((e10 = { basePath: this[M].basePath, buildId: this[M].buildId, defaultLocale: this[M].options.forceLocale ? void 0 : this[M].defaultLocale, locale: this[M].locale, pathname: this[M].url.pathname, trailingSlash: this[M].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = R(t10)), e10.buildId && (t10 = P(O(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = O(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : P(t10, "/") : R(t10);
        }
        formatSearch() {
          return this[M].url.search;
        }
        get buildId() {
          return this[M].buildId;
        }
        set buildId(e10) {
          this[M].buildId = e10;
        }
        get locale() {
          return this[M].locale ?? "";
        }
        set locale(e10) {
          var t10, r2;
          if (!this[M].locale || !(null == (r2 = this[M].options.nextConfig) || null == (t10 = r2.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[M].locale = e10;
        }
        get defaultLocale() {
          return this[M].defaultLocale;
        }
        get domainLocale() {
          return this[M].domainLocale;
        }
        get searchParams() {
          return this[M].url.searchParams;
        }
        get host() {
          return this[M].url.host;
        }
        set host(e10) {
          this[M].url.host = e10;
        }
        get hostname() {
          return this[M].url.hostname;
        }
        set hostname(e10) {
          this[M].url.hostname = e10;
        }
        get port() {
          return this[M].url.port;
        }
        set port(e10) {
          this[M].url.port = e10;
        }
        get protocol() {
          return this[M].url.protocol;
        }
        set protocol(e10) {
          this[M].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[M].url = I(e10), this.analyze();
        }
        get origin() {
          return this[M].url.origin;
        }
        get pathname() {
          return this[M].url.pathname;
        }
        set pathname(e10) {
          this[M].url.pathname = e10;
        }
        get hash() {
          return this[M].url.hash;
        }
        set hash(e10) {
          this[M].url.hash = e10;
        }
        get search() {
          return this[M].url.search;
        }
        set search(e10) {
          this[M].url.search = e10;
        }
        get password() {
          return this[M].url.password;
        }
        set password(e10) {
          this[M].url.password = e10;
        }
        get username() {
          return this[M].url.username;
        }
        set username(e10) {
          this[M].url.username = e10;
        }
        get basePath() {
          return this[M].basePath;
        }
        set basePath(e10) {
          this[M].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new D(String(this), this[M].options);
        }
      }
      var j = r(646);
      let q = Symbol("internal request");
      class $ extends Request {
        constructor(e10, t10 = {}) {
          let r2 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          b(r2), e10 instanceof Request ? super(e10, t10) : super(r2, t10);
          let n2 = new D(r2, { headers: v(this.headers), nextConfig: t10.nextConfig });
          this[q] = { cookies: new j.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[q].cookies;
        }
        get nextUrl() {
          return this[q].nextUrl;
        }
        get page() {
          throw new g();
        }
        get ua() {
          throw new h();
        }
        get url() {
          return this[q].url;
        }
      }
      class U {
        static get(e10, t10, r2) {
          let n2 = Reflect.get(e10, t10, r2);
          return "function" == typeof n2 ? n2.bind(e10) : n2;
        }
        static set(e10, t10, r2, n2) {
          return Reflect.set(e10, t10, r2, n2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let B = Symbol("internal response"), G = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function z(e10, t10) {
        var r2;
        if (null == e10 || null == (r2 = e10.request) ? void 0 : r2.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r3 = [];
          for (let [n2, i2] of e10.request.headers) t10.set("x-middleware-request-" + n2, i2), r3.push(n2);
          t10.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class V extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r2 = this.headers, n2 = new Proxy(new j.ResponseCookies(r2), { get(e11, n3, i2) {
            switch (n3) {
              case "delete":
              case "set":
                return (...i3) => {
                  let a2 = Reflect.apply(e11[n3], e11, i3), o2 = new Headers(r2);
                  return a2 instanceof j.ResponseCookies && r2.set("x-middleware-set-cookie", a2.getAll().map((e12) => (0, j.stringifyCookie)(e12)).join(",")), z(t10, o2), a2;
                };
              default:
                return U.get(e11, n3, i2);
            }
          } });
          this[B] = { cookies: n2, url: t10.url ? new D(t10.url, { headers: v(r2), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[B].cookies;
        }
        static json(e10, t10) {
          let r2 = Response.json(e10, t10);
          return new V(r2.body, r2);
        }
        static redirect(e10, t10) {
          let r2 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!G.has(r2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n2 = "object" == typeof t10 ? t10 : {}, i2 = new Headers(null == n2 ? void 0 : n2.headers);
          return i2.set("Location", b(e10)), new V(null, { ...n2, headers: i2, status: r2 });
        }
        static rewrite(e10, t10) {
          let r2 = new Headers(null == t10 ? void 0 : t10.headers);
          return r2.set("x-middleware-rewrite", b(e10)), z(t10, r2), new V(null, { ...t10, headers: r2 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), z(e10, t10), new V(null, { ...e10, headers: t10 });
        }
      }
      function H(e10, t10) {
        let r2 = "string" == typeof t10 ? new URL(t10) : t10, n2 = new URL(e10, t10), i2 = n2.origin === r2.origin;
        return { url: i2 ? n2.toString().slice(r2.origin.length) : n2.toString(), isRelative: i2 };
      }
      let F = "Next-Router-Prefetch", W = ["RSC", "Next-Router-State-Tree", F, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], K = "_rsc";
      class X extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new X();
        }
      }
      class J extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r2, n2) {
            if ("symbol" == typeof r2) return U.get(t10, r2, n2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            if (void 0 !== a2) return U.get(t10, a2, n2);
          }, set(t10, r2, n2, i2) {
            if ("symbol" == typeof r2) return U.set(t10, r2, n2, i2);
            let a2 = r2.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return U.set(t10, o2 ?? r2, n2, i2);
          }, has(t10, r2) {
            if ("symbol" == typeof r2) return U.has(t10, r2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== i2 && U.has(t10, i2);
          }, deleteProperty(t10, r2) {
            if ("symbol" == typeof r2) return U.deleteProperty(t10, r2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === i2 || U.deleteProperty(t10, i2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r2) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return X.callable;
              default:
                return U.get(e11, t10, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new J(e10);
        }
        append(e10, t10) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t10] : Array.isArray(r2) ? r2.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r2, n2] of this.entries()) e10.call(t10, n2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r2 = this.get(t10);
            yield [t10, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var Z = r(325), Y = r(933);
      class Q extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new Q();
        }
      }
      class ee {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r2) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return Q.callable;
              default:
                return U.get(e11, t10, r2);
            }
          } });
        }
      }
      let et = Symbol.for("next.mutated.cookies");
      class er {
        static wrap(e10, t10) {
          let r2 = new j.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r2.set(t11);
          let n2 = [], i2 = /* @__PURE__ */ new Set(), a2 = () => {
            let e11 = Z.J.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n2 = r2.getAll().filter((e12) => i2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n2) {
                let r3 = new j.ResponseCookies(new Headers());
                r3.set(t11), e12.push(r3.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r2, { get(e11, t11, r3) {
            switch (t11) {
              case et:
                return n2;
              case "delete":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              case "set":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              default:
                return U.get(e11, t11, r3);
            }
          } });
          return o2;
        }
      }
      function en(e10) {
        if ("action" !== (0, Y.XN)(e10).phase) throw new Q();
      }
      var ei = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(ei || {}), ea = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(ea || {}), eo = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(eo || {}), es = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(es || {}), el = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(el || {}), eu = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(eu || {}), ec = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(ec || {}), ed = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(ed || {}), ep = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(ep || {}), ef = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(ef || {}), eg = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(eg || {}), eh = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eh || {});
      let em = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], e_ = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function ey(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ev, propagation: eb, trace: ew, SpanStatusCode: eS, SpanKind: eC, ROOT_CONTEXT: eT } = n = r(614);
      class eE extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eR = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eE;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: eS.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, ex = /* @__PURE__ */ new Map(), eO = n.createContextKey("next.rootSpanId"), eP = 0, ek = () => eP++, eN = { set(e10, t10, r2) {
        e10.push({ key: t10, value: r2 });
      } };
      class eA {
        getTracerInstance() {
          return ew.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ev;
        }
        getTracePropagationData() {
          let e10 = ev.active(), t10 = [];
          return eb.inject(e10, t10, eN), t10;
        }
        getActiveScopeSpan() {
          return ew.getSpan(null == ev ? void 0 : ev.active());
        }
        withPropagatedContext(e10, t10, r2) {
          let n2 = ev.active();
          if (ew.getSpanContext(n2)) return t10();
          let i2 = eb.extract(n2, e10, r2);
          return ev.with(i2, t10);
        }
        trace(...e10) {
          var t10;
          let [r2, n2, i2] = e10, { fn: a2, options: o2 } = "function" == typeof n2 ? { fn: n2, options: {} } : { fn: i2, options: { ...n2 } }, s2 = o2.spanName ?? r2;
          if (!em.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan) return a2();
          let l2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan()), u2 = false;
          l2 ? (null == (t10 = ew.getSpanContext(l2)) ? void 0 : t10.isRemote) && (u2 = true) : (l2 = (null == ev ? void 0 : ev.active()) ?? eT, u2 = true);
          let c2 = ek();
          return o2.attributes = { "next.span_name": s2, "next.span_type": r2, ...o2.attributes }, ev.with(l2.setValue(eO, c2), () => this.getTracerInstance().startActiveSpan(s2, o2, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, n3 = () => {
              ex.delete(c2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && e_.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            u2 && ex.set(c2, new Map(Object.entries(o2.attributes ?? {})));
            try {
              if (a2.length > 1) return a2(e11, (t13) => eR(e11, t13));
              let t12 = a2(e11);
              if (ey(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw eR(e11, t13), t13;
              }).finally(n3);
              return e11.end(), n3(), t12;
            } catch (t12) {
              throw eR(e11, t12), n3(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r2, n2, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return em.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, o2 = arguments[a2];
            if ("function" != typeof o2) return t10.trace(r2, e11, () => i2.apply(this, arguments));
            {
              let n3 = t10.getContext().bind(ev.active(), o2);
              return t10.trace(r2, e11, (e12, t11) => (arguments[a2] = function(e13) {
                return null == t11 || t11(e13), n3.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t10, r2] = e10, n2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r2, n2);
        }
        getSpanContext(e10) {
          return e10 ? ew.setSpan(ev.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ev.active().getValue(eO);
          return ex.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r2 = ev.active().getValue(eO), n2 = ex.get(r2);
          n2 && n2.set(e10, t10);
        }
      }
      let eL = (() => {
        let e10 = new eA();
        return () => e10;
      })(), eI = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eI);
      class eM {
        constructor(e10, t10, r2, n2) {
          var i2;
          let a2 = e10 && function(e11, t11) {
            let r3 = J.from(e11.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o2 = null == (i2 = r2.get(eI)) ? void 0 : i2.value;
          this._isEnabled = !!(!a2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eI, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eI, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eD(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of y(r2)) n2.append("set-cookie", e11);
          for (let e11 of new j.ResponseCookies(n2).getAll()) t10.set(e11);
        }
      }
      var ej = r(528), eq = r.n(ej);
      class e$ extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      class eU {
        constructor(e10, t10) {
          this.cache = /* @__PURE__ */ new Map(), this.sizes = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10 || (() => 1);
        }
        set(e10, t10) {
          if (!e10 || !t10) return;
          let r2 = this.calculateSize(t10);
          if (r2 > this.maxSize) return void console.warn("Single item size exceeds maxSize");
          this.cache.has(e10) && (this.totalSize -= this.sizes.get(e10) || 0), this.cache.set(e10, t10), this.sizes.set(e10, r2), this.totalSize += r2, this.touch(e10);
        }
        has(e10) {
          return !!e10 && (this.touch(e10), !!this.cache.get(e10));
        }
        get(e10) {
          if (!e10) return;
          let t10 = this.cache.get(e10);
          if (void 0 !== t10) return this.touch(e10), t10;
        }
        touch(e10) {
          let t10 = this.cache.get(e10);
          void 0 !== t10 && (this.cache.delete(e10), this.cache.set(e10, t10), this.evictIfNecessary());
        }
        evictIfNecessary() {
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) this.evictLeastRecentlyUsed();
        }
        evictLeastRecentlyUsed() {
          let e10 = this.cache.keys().next().value;
          if (void 0 !== e10) {
            let t10 = this.sizes.get(e10) || 0;
            this.totalSize -= t10, this.cache.delete(e10), this.sizes.delete(e10);
          }
        }
        reset() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        keys() {
          return [...this.cache.keys()];
        }
        remove(e10) {
          this.cache.has(e10) && (this.totalSize -= this.sizes.get(e10) || 0, this.cache.delete(e10), this.sizes.delete(e10));
        }
        clear() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      r(356).Buffer, new eU(52428800, (e10) => e10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eB = Symbol.for("@next/cache-handlers-map"), eG = Symbol.for("@next/cache-handlers-set"), ez = globalThis;
      function eV() {
        if (ez[eB]) return ez[eB].entries();
      }
      async function eH(e10, t10) {
        if (!e10) return t10();
        let r2 = eF(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r3 = new Set(e11.pendingRevalidatedTags), n2 = new Set(e11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: t12.pendingRevalidatedTags.filter((e12) => !r3.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !n2.has(e12)) };
          }(r2, eF(e10));
          await eK(e10, t11);
        }
      }
      function eF(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eW(e10, t10) {
        if (0 === e10.length) return;
        let r2 = [];
        t10 && r2.push(t10.revalidateTag(e10));
        let n2 = function() {
          if (ez[eG]) return ez[eG].values();
        }();
        if (n2) for (let t11 of n2) r2.push(t11.expireTags(...e10));
        await Promise.all(r2);
      }
      async function eK(e10, t10) {
        let r2 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], n2 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, i2 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eW(r2, e10.incrementalCache), ...Object.values(n2), ...i2]);
      }
      let eX = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class eJ {
        disable() {
          throw eX;
        }
        getStore() {
        }
        run() {
          throw eX;
        }
        exit() {
          throw eX;
        }
        enterWith() {
          throw eX;
        }
        static bind(e10) {
          return e10;
        }
      }
      let eZ = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage, eY = eZ ? new eZ() : new eJ();
      class eQ {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r2, this.callbackQueue = new (eq())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (ey(e10)) this.waitUntil || e0(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || e0();
          let r2 = Y.FP.getStore();
          r2 && this.workUnitStores.add(r2);
          let n2 = eY.getStore(), i2 = n2 ? n2.rootTaskSpawnPhase : null == r2 ? void 0 : r2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let a2 = (t10 = async () => {
            try {
              await eY.run({ rootTaskSpawnPhase: i2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, eZ ? eZ.bind(t10) : eJ.bind(t10));
          this.callbackQueue.add(a2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = Z.J.getStore();
          if (!e10) throw Object.defineProperty(new e$("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eH(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new e$("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function e0() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function e1(e10) {
        let t10, r2 = { then: (n2, i2) => (t10 || (t10 = e10()), t10.then((e11) => {
          r2.value = e11;
        }).catch(() => {
        }), t10.then(n2, i2)) };
        return r2;
      }
      class e2 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e3() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let e4 = Symbol.for("@next/request-context"), e5 = (e10) => {
        let t10 = ["/layout"];
        if (e10.startsWith("/")) {
          let r2 = e10.split("/");
          for (let e11 = 1; e11 < r2.length + 1; e11++) {
            let n2 = r2.slice(0, e11).join("/");
            n2 && (n2.endsWith("/page") || n2.endsWith("/route") || (n2 = `${n2}${!n2.endsWith("/") ? "/" : ""}layout`), t10.push(n2));
          }
        }
        return t10;
      };
      async function e6(e10, t10, r2) {
        let n2 = [], i2 = r2 && r2.size > 0;
        for (let t11 of e5(e10)) t11 = `${m}${t11}`, n2.push(t11);
        if (t10.pathname && !i2) {
          let e11 = `${m}${t10.pathname}`;
          n2.push(e11);
        }
        return { tags: n2, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r3 = eV();
          if (r3) for (let [n3, i3] of r3) "getExpiration" in i3 && t11.set(n3, e1(async () => i3.getExpiration(...e11)));
          return t11;
        }(n2) };
      }
      class e9 extends $ {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new f({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new f({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new f({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let e8 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, e7 = (e10, t10) => eL().withPropagatedContext(e10.headers, t10, e8), te = false;
      async function tt(e10) {
        var t10;
        let n2, i2;
        if (!te && (te = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(571);
          e11(), e7 = t11(e7);
        }
        await d();
        let a2 = void 0 !== globalThis.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let o2 = new D(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...o2.searchParams.keys()]) {
          let t11 = o2.searchParams.getAll(e11), r2 = function(e12) {
            for (let t12 of ["nxtP", "nxtI"]) if (e12 !== t12 && e12.startsWith(t12)) return e12.substring(t12.length);
            return null;
          }(e11);
          if (r2) {
            for (let e12 of (o2.searchParams.delete(r2), t11)) o2.searchParams.append(r2, e12);
            o2.searchParams.delete(e11);
          }
        }
        let s2 = o2.buildId;
        o2.buildId = "";
        let l2 = function(e11) {
          let t11 = new Headers();
          for (let [r2, n3] of Object.entries(e11)) for (let e12 of Array.isArray(n3) ? n3 : [n3]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r2, e12));
          return t11;
        }(e10.request.headers), u2 = l2.has("x-nextjs-data"), c2 = "1" === l2.get("RSC");
        u2 && "/index" === o2.pathname && (o2.pathname = "/");
        let p2 = /* @__PURE__ */ new Map();
        if (!a2) for (let e11 of W) {
          let t11 = e11.toLowerCase(), r2 = l2.get(t11);
          null !== r2 && (p2.set(t11, r2), l2.delete(t11));
        }
        let f2 = new e9({ page: e10.page, input: function(e11) {
          let t11 = "string" == typeof e11, r2 = t11 ? new URL(e11) : e11;
          return r2.searchParams.delete(K), t11 ? r2.toString() : r2;
        }(o2).toString(), init: { body: e10.request.body, headers: l2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        u2 && Object.defineProperty(f2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e3() }) }));
        let g2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[e4];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), h2 = new E({ request: f2, page: e10.page, context: g2 ? { waitUntil: g2 } : void 0 });
        if ((n2 = await e7(f2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = h2.waitUntil.bind(h2), r2 = new e2();
            return eL().trace(eh.execute, { spanName: `middleware ${f2.method} ${f2.nextUrl.pathname}`, attributes: { "http.target": f2.nextUrl.pathname, "http.method": f2.method } }, async () => {
              try {
                var n3, a3, o3, l3, u3, c3;
                let d2 = e3(), p3 = await e6("/", f2.nextUrl, null), g3 = (u3 = f2.nextUrl, c3 = (e11) => {
                  i2 = e11;
                }, function(e11, t12, r3, n4, i3, a4, o4, s3, l4, u4, c4) {
                  function d3(e12) {
                    r3 && r3.setHeader("Set-Cookie", e12);
                  }
                  let p4 = {};
                  return { type: "request", phase: e11, implicitTags: a4, url: { pathname: n4.pathname, search: n4.search ?? "" }, rootParams: i3, get headers() {
                    return p4.headers || (p4.headers = function(e12) {
                      let t13 = J.from(e12);
                      for (let e13 of W) t13.delete(e13.toLowerCase());
                      return J.seal(t13);
                    }(t12.headers)), p4.headers;
                  }, get cookies() {
                    if (!p4.cookies) {
                      let e12 = new j.RequestCookies(J.from(t12.headers));
                      eD(t12, e12), p4.cookies = ee.seal(e12);
                    }
                    return p4.cookies;
                  }, set cookies(value) {
                    p4.cookies = value;
                  }, get mutableCookies() {
                    if (!p4.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r4 = new j.RequestCookies(J.from(e13));
                        return er.wrap(r4, t13);
                      }(t12.headers, o4 || (r3 ? d3 : void 0));
                      eD(t12, e12), p4.mutableCookies = e12;
                    }
                    return p4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return p4.userspaceMutableCookies || (p4.userspaceMutableCookies = function(e12) {
                      let t13 = new Proxy(e12, { get(e13, r4, n5) {
                        switch (r4) {
                          case "delete":
                            return function(...r5) {
                              return en("cookies().delete"), e13.delete(...r5), t13;
                            };
                          case "set":
                            return function(...r5) {
                              return en("cookies().set"), e13.set(...r5), t13;
                            };
                          default:
                            return U.get(e13, r4, n5);
                        }
                      } });
                      return t13;
                    }(this.mutableCookies)), p4.userspaceMutableCookies;
                  }, get draftMode() {
                    return p4.draftMode || (p4.draftMode = new eM(l4, t12, this.cookies, this.mutableCookies)), p4.draftMode;
                  }, renderResumeDataCache: s3 ?? null, isHmrRefresh: u4, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache };
                }("action", f2, void 0, u3, {}, p3, c3, void 0, d2, false, void 0)), m3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r3, requestEndedState: n4, isPrefetchRequest: i3, buildId: a4, previouslyRevalidatedTags: o4 }) {
                  var s3;
                  let l4 = { isStaticGeneration: !r3.shouldWaitOnAllReady && !r3.supportsDynamicResponse && !r3.isDraftMode && !r3.isPossibleServerAction, page: e11, fallbackRouteParams: t12, route: (s3 = e11.split("/").reduce((e12, t13, r4, n5) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r4 === n5.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? s3 : "/" + s3, incrementalCache: r3.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r3.cacheLifeProfiles, isRevalidate: r3.isRevalidate, isPrerendering: r3.nextExport, fetchCache: r3.fetchCache, isOnDemandRevalidate: r3.isOnDemandRevalidate, isDraftMode: r3.isDraftMode, requestEndedState: n4, isPrefetchRequest: i3, buildId: a4, reactLoadableManifest: (null == r3 ? void 0 : r3.reactLoadableManifest) || {}, assetPrefix: (null == r3 ? void 0 : r3.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r4, onAfterTaskError: n5 } = e12;
                    return new eQ({ waitUntil: t13, onClose: r4, onTaskError: n5 });
                  }(r3), dynamicIOEnabled: r3.experimental.dynamicIO, dev: r3.dev ?? false, previouslyRevalidatedTags: o4, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t13 = eV();
                    if (t13) for (let [r4, n5] of t13) "refreshTags" in n5 && e12.set(r4, e1(async () => n5.refreshTags()));
                    return e12;
                  }() };
                  return r3.store = l4, l4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (a3 = e10.request.nextConfig) || null == (n3 = a3.experimental) ? void 0 : n3.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) || null == (o3 = l3.experimental) ? void 0 : o3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: t11, onClose: r2.onClose.bind(r2), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: f2.headers.has(F), buildId: s2 ?? "", previouslyRevalidatedTags: [] });
                return await Z.J.run(m3, () => Y.FP.run(g3, e10.handler, f2, h2));
              } finally {
                setTimeout(() => {
                  r2.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(f2, h2);
        })) && !(n2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        n2 && i2 && n2.headers.set("set-cookie", i2);
        let m2 = null == n2 ? void 0 : n2.headers.get("x-middleware-rewrite");
        if (n2 && m2 && (c2 || !a2)) {
          let t11 = new D(m2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          a2 || t11.host !== f2.nextUrl.host || (t11.buildId = s2 || t11.buildId, n2.headers.set("x-middleware-rewrite", String(t11)));
          let { url: r2, isRelative: i3 } = H(t11.toString(), o2.toString());
          !a2 && u2 && n2.headers.set("x-nextjs-rewrite", r2), c2 && i3 && (o2.pathname !== t11.pathname && n2.headers.set("x-nextjs-rewritten-path", t11.pathname), o2.search !== t11.search && n2.headers.set("x-nextjs-rewritten-query", t11.search.slice(1)));
        }
        let _2 = null == n2 ? void 0 : n2.headers.get("Location");
        if (n2 && _2 && !a2) {
          let t11 = new D(_2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          n2 = new Response(n2.body, n2), t11.host === o2.host && (t11.buildId = s2 || t11.buildId, n2.headers.set("Location", t11.toString())), u2 && (n2.headers.delete("Location"), n2.headers.set("x-nextjs-redirect", H(t11.toString(), o2.toString()).url));
        }
        let y2 = n2 || V.next(), v2 = y2.headers.get("x-middleware-override-headers"), b2 = [];
        if (v2) {
          for (let [e11, t11] of p2) y2.headers.set(`x-middleware-request-${e11}`, t11), b2.push(e11);
          b2.length > 0 && y2.headers.set("x-middleware-override-headers", v2 + "," + b2.join(","));
        }
        return { response: y2, waitUntil: ("internal" === h2[C].kind ? Promise.all(h2[C].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: f2.fetchMetrics };
      }
      var tr = r(91), tn = r(301);
      let ti = r(120).s;
      function ta(e10, t10, r2) {
        void 0 === r2 && (r2 = tr.Q.TemporaryRedirect);
        let n2 = Object.defineProperty(Error(tn.oJ), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return n2.digest = tn.oJ + ";" + t10 + ";" + e10 + ";" + r2 + ";", n2;
      }
      function to(e10, t10) {
        var r2;
        throw null != t10 || (t10 = (null == ti || null == (r2 = ti.getStore()) ? void 0 : r2.isAction) ? tn.zB.push : tn.zB.replace), ta(e10, t10, tr.Q.TemporaryRedirect);
      }
      function ts(e10, t10) {
        throw void 0 === t10 && (t10 = tn.zB.replace), ta(e10, t10, tr.Q.PermanentRedirect);
      }
      var tl = r(905);
      tl.s8, tl.s8, tl.s8, r(310).X;
      var tu = r(225);
      function tc(e10) {
        var t10, r2;
        return { ...e10, localePrefix: "object" == typeof (r2 = e10.localePrefix) ? r2 : { mode: r2 || "always" }, localeCookie: !!((t10 = e10.localeCookie) ?? 1) && { name: "NEXT_LOCALE", sameSite: "lax", ..."object" == typeof t10 && t10 }, localeDetection: e10.localeDetection ?? true, alternateLinks: e10.alternateLinks ?? true };
      }
      var td = r.t(tu, 2)["use".trim()];
      function tp(e10) {
        return ("object" == typeof e10 ? null == e10.host && null == e10.hostname : !/^[a-z]+:/i.test(e10)) && !function(e11) {
          let t10 = "object" == typeof e11 ? e11.pathname : e11;
          return null != t10 && !t10.startsWith("/");
        }(e10);
      }
      function tf(e10, t10) {
        let r2 = e10;
        return /^\/(\?.*)?$/.test(t10) && (t10 = t10.slice(1)), r2 += t10;
      }
      function tg(e10, t10, r2) {
        return "string" == typeof e10 ? e10 : e10[t10] || r2;
      }
      function th(e10) {
        let t10 = function() {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch {
            return false;
          }
        }();
        if ("/" !== e10) {
          let r2 = e10.endsWith("/");
          t10 && !r2 ? e10 += "/" : !t10 && r2 && (e10 = e10.slice(0, -1));
        }
        return e10;
      }
      function tm(e10, t10) {
        let r2 = th(e10), n2 = th(t10);
        return ty(r2).test(n2);
      }
      function t_(e10, t10) {
        return "never" !== t10.mode && t10.prefixes?.[e10] || "/" + e10;
      }
      function ty(e10) {
        let t10 = e10.replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "?(.*)").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
        return RegExp(`^${t10}$`);
      }
      function tv(e10) {
        return e10.includes("[[...");
      }
      function tb(e10) {
        return e10.includes("[...");
      }
      function tw(e10) {
        return e10.includes("[");
      }
      function tS(e10, t10) {
        let r2 = e10.split("/"), n2 = t10.split("/"), i2 = Math.max(r2.length, n2.length);
        for (let e11 = 0; e11 < i2; e11++) {
          let t11 = r2[e11], i3 = n2[e11];
          if (!t11 && i3) return -1;
          if (t11 && !i3) return 1;
          if (t11 || i3) {
            if (!tw(t11) && tw(i3)) return -1;
            if (tw(t11) && !tw(i3)) return 1;
            if (!tb(t11) && tb(i3)) return -1;
            if (tb(t11) && !tb(i3)) return 1;
            if (!tv(t11) && tv(i3)) return -1;
            if (tv(t11) && !tv(i3)) return 1;
          }
        }
        return 0;
      }
      function tC(e10) {
        return "function" == typeof e10.then;
      }
      let tT = (0, r(330).YR)(function() {
        throw Error(`Attempted to call the default export of "/Users/shankai/codebase/kong0/next-maker/node_modules/.pnpm/next-intl@4.1.0_next@15.3.3_react-dom@19.1.0_react@19.1.0__react@19.1.0__react@19.1.0_typescript@5.8.3/node_modules/next-intl/dist/esm/production/navigation/shared/BaseLink.js" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.`);
      }, "/Users/shankai/codebase/kong0/next-maker/node_modules/.pnpm/next-intl@4.1.0_next@15.3.3_react-dom@19.1.0_react@19.1.0__react@19.1.0__react@19.1.0_typescript@5.8.3/node_modules/next-intl/dist/esm/production/navigation/shared/BaseLink.js", "default");
      function tE(e10) {
        let t10 = new URLSearchParams();
        for (let [r2, n2] of Object.entries(e10)) Array.isArray(n2) ? n2.forEach((e11) => {
          t10.append(r2, String(e11));
        }) : t10.set(r2, String(n2));
        return "?" + t10.toString();
      }
      var tR = r(994);
      function tx(e10, t10, r2, n2) {
        var i2 = null == n2 || "number" == typeof n2 || "boolean" == typeof n2 ? n2 : r2(n2), a2 = t10.get(i2);
        return void 0 === a2 && (a2 = e10.call(this, n2), t10.set(i2, a2)), a2;
      }
      function tO(e10, t10, r2) {
        var n2 = Array.prototype.slice.call(arguments, 3), i2 = r2(n2), a2 = t10.get(i2);
        return void 0 === a2 && (a2 = e10.apply(this, n2), t10.set(i2, a2)), a2;
      }
      var tP = function() {
        return JSON.stringify(arguments);
      }, tk = function() {
        function e10() {
          this.cache = /* @__PURE__ */ Object.create(null);
        }
        return e10.prototype.get = function(e11) {
          return this.cache[e11];
        }, e10.prototype.set = function(e11, t10) {
          this.cache[e11] = t10;
        }, e10;
      }(), tN = { create: function() {
        return new tk();
      } }, tA = { variadic: function(e10, t10) {
        var r2, n2;
        return r2 = t10.cache.create(), n2 = t10.serializer, tO.bind(this, e10, r2, n2);
      }, monadic: function(e10, t10) {
        var r2, n2;
        return r2 = t10.cache.create(), n2 = t10.serializer, tx.bind(this, e10, r2, n2);
      } }, tL = function(e10) {
        return e10.MISSING_MESSAGE = "MISSING_MESSAGE", e10.MISSING_FORMAT = "MISSING_FORMAT", e10.ENVIRONMENT_FALLBACK = "ENVIRONMENT_FALLBACK", e10.INSUFFICIENT_PATH = "INSUFFICIENT_PATH", e10.INVALID_MESSAGE = "INVALID_MESSAGE", e10.INVALID_KEY = "INVALID_KEY", e10.FORMATTING_ERROR = "FORMATTING_ERROR", e10;
      }(tL || {});
      function tI(...e10) {
        return e10.filter(Boolean).join(".");
      }
      function tM(e10) {
        return tI(e10.namespace, e10.key);
      }
      function tD(e10) {
        console.error(e10);
      }
      function tj(e10, t10) {
        var r2, n2, i2, a2, o2;
        return r2 = (...t11) => new e10(...t11), n2 = t10, a2 = (i2 = { cache: { create: () => ({ get: (e11) => n2[e11], set(e11, t11) {
          n2[e11] = t11;
        } }) }, strategy: tA.variadic }).cache ? i2.cache : tN, o2 = i2 && i2.serializer ? i2.serializer : tP, (i2 && i2.strategy ? i2.strategy : function(e11, t11) {
          var r3, n3, i3 = 1 === e11.length ? tx : tO;
          return r3 = t11.cache.create(), n3 = t11.serializer, i3.bind(this, e11, r3, n3);
        })(r2, { cache: a2, serializer: o2 });
      }
      var tq = r(159), t$ = r(636), tU = r(591);
      let tB = { current: null }, tG = "function" == typeof tu.cache ? tu.cache : (e10) => e10, tz = console.warn;
      function tV(e10) {
        return function(...t10) {
          tz(e10(...t10));
        };
      }
      tG((e10) => {
        try {
          tz(tB.current);
        } finally {
          tB.current = null;
        }
      });
      let tH = /* @__PURE__ */ new WeakMap(), tF = tV(function(e10, t10) {
        let r2 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t10}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      });
      function tW() {
        return this.getAll().map((e10) => [e10.name, e10]).values();
      }
      function tK(e10) {
        for (let e11 of this.getAll()) this.delete(e11.name);
        return e10;
      }
      let tX = /* @__PURE__ */ new WeakMap();
      function tJ(e10) {
        let t10 = tX.get(e10);
        if (t10) return t10;
        let r2 = Promise.resolve(e10);
        return tX.set(e10, r2), Object.defineProperties(r2, { append: { value: e10.append.bind(e10) }, delete: { value: e10.delete.bind(e10) }, get: { value: e10.get.bind(e10) }, has: { value: e10.has.bind(e10) }, set: { value: e10.set.bind(e10) }, getSetCookie: { value: e10.getSetCookie.bind(e10) }, forEach: { value: e10.forEach.bind(e10) }, keys: { value: e10.keys.bind(e10) }, values: { value: e10.values.bind(e10) }, entries: { value: e10.entries.bind(e10) }, [Symbol.iterator]: { value: e10[Symbol.iterator].bind(e10) } }), r2;
      }
      function tZ(e10) {
        return "string" == typeof e10 ? `'${e10}'` : "...";
      }
      let tY = tV(tQ);
      function tQ(e10, t10) {
        let r2 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t10}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }
      function t0() {
        let e10 = workAsyncStorage.getStore(), t10 = workUnitAsyncStorage.getStore();
        switch ((!e10 || !t10) && throwForMissingRequestStore("draftMode"), t10.type) {
          case "request":
            return t1(t10.draftMode, e10);
          case "cache":
          case "unstable-cache":
            let r2 = getDraftModeProviderForCacheScope(e10, t10);
            if (r2) return t1(r2, e10);
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            return t3(null);
          default:
            return t10;
        }
      }
      function t1(e10, t10) {
        let r2, n2 = t2.get(t0);
        return n2 || (r2 = t3(e10), t2.set(e10, r2), r2);
      }
      r(486);
      let t2 = /* @__PURE__ */ new WeakMap();
      function t3(e10) {
        let t10 = new t4(e10), r2 = Promise.resolve(t10);
        return Object.defineProperty(r2, "isEnabled", { get: () => t10.isEnabled, set(e11) {
          Object.defineProperty(r2, "isEnabled", { value: e11, writable: true, enumerable: true });
        }, enumerable: true, configurable: true }), r2.enable = t10.enable.bind(t10), r2.disable = t10.disable.bind(t10), r2;
      }
      class t4 {
        constructor(e10) {
          this._provider = e10;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          t6("draftMode().enable()"), null !== this._provider && this._provider.enable();
        }
        disable() {
          t6("draftMode().disable()"), null !== this._provider && this._provider.disable();
        }
      }
      let t5 = tV(function(e10, t10) {
        let r2 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t10}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      });
      function t6(e10) {
        let t10 = workAsyncStorage.getStore(), r2 = workUnitAsyncStorage.getStore();
        if (t10) {
          if (r2) {
            if ("cache" === r2.type) throw Object.defineProperty(Error(`Route ${t10.route} used "${e10}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E246", enumerable: false, configurable: true });
            else if ("unstable-cache" === r2.type) throw Object.defineProperty(Error(`Route ${t10.route} used "${e10}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E259", enumerable: false, configurable: true });
            else if ("after" === r2.phase) throw Object.defineProperty(Error(`Route ${t10.route} used "${e10}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E348", enumerable: false, configurable: true });
          }
          if (t10.dynamicShouldError) throw Object.defineProperty(new StaticGenBailoutError(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e10}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (r2) {
            if ("prerender" === r2.type) {
              let n2 = Object.defineProperty(Error(`Route ${t10.route} used ${e10} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              abortAndThrowOnSynchronousRequestDataAccess(t10.route, e10, n2, r2);
            } else if ("prerender-ppr" === r2.type) postponeWithTracking(t10.route, e10, r2.dynamicTracking);
            else if ("prerender-legacy" === r2.type) {
              r2.revalidate = 0;
              let n2 = Object.defineProperty(new DynamicServerError(`Route ${t10.route} couldn't be rendered statically because it used \`${e10}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t10.dynamicUsageDescription = e10, t10.dynamicUsageStack = n2.stack, n2;
            }
          }
        }
      }
      let t9 = "X-NEXT-INTL-LOCALE", t8 = (0, tu.cache)(function() {
        return { locale: void 0 };
      }), t7 = (0, tu.cache)(async function() {
        let e10 = function() {
          let e11 = Z.J.getStore(), t10 = Y.FP.getStore();
          if (e11) {
            if (t10 && "after" === t10.phase && !function() {
              let e12 = eY.getStore();
              return (null == e12 ? void 0 : e12.rootTaskSpawnPhase) === "action";
            }()) throw Object.defineProperty(Error(`Route ${e11.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
            if (e11.forceStatic) return tJ(J.seal(new Headers({})));
            if (t10) {
              if ("cache" === t10.type) throw Object.defineProperty(Error(`Route ${e11.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
              else if ("unstable-cache" === t10.type) throw Object.defineProperty(Error(`Route ${e11.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
            }
            if (e11.dynamicShouldError) throw Object.defineProperty(new t$.f(`Route ${e11.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
            if (t10) if ("prerender" === t10.type) {
              var r2 = e11.route, n2 = t10;
              let i2 = tX.get(n2);
              if (i2) return i2;
              let a2 = (0, tU.W)(n2.renderSignal, "`headers()`");
              return tX.set(n2, a2), Object.defineProperties(a2, { append: { value: function() {
                let e12 = `\`headers().append(${tZ(arguments[0])}, ...)\``, t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, delete: { value: function() {
                let e12 = `\`headers().delete(${tZ(arguments[0])})\``, t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, get: { value: function() {
                let e12 = `\`headers().get(${tZ(arguments[0])})\``, t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, has: { value: function() {
                let e12 = `\`headers().has(${tZ(arguments[0])})\``, t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, set: { value: function() {
                let e12 = `\`headers().set(${tZ(arguments[0])}, ...)\``, t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, getSetCookie: { value: function() {
                let e12 = "`headers().getSetCookie()`", t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, forEach: { value: function() {
                let e12 = "`headers().forEach(...)`", t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, keys: { value: function() {
                let e12 = "`headers().keys()`", t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, values: { value: function() {
                let e12 = "`headers().values()`", t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, entries: { value: function() {
                let e12 = "`headers().entries()`", t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } }, [Symbol.iterator]: { value: function() {
                let e12 = "`headers()[Symbol.iterator]()`", t11 = tQ(r2, e12);
                (0, tq.t3)(r2, e12, t11, n2);
              } } }), a2;
            } else "prerender-ppr" === t10.type ? (0, tq.Ui)(e11.route, "headers", t10.dynamicTracking) : "prerender-legacy" === t10.type && (0, tq.xI)("headers", e11, t10);
            (0, tq.Pk)(e11, t10);
          }
          return tJ((0, Y.XN)("headers").headers);
        }();
        return tC(e10) ? await e10 : e10;
      }), re = (0, tu.cache)(async function() {
        let e10;
        try {
          e10 = (await t7()).get(t9) || void 0;
        } catch (e11) {
          if (e11 instanceof Error && "DYNAMIC_SERVER_USAGE" === e11.digest) {
            let t10 = Error("Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#static-rendering", { cause: e11 });
            throw t10.digest = e11.digest, t10;
          }
          throw e11;
        }
        return e10;
      });
      async function rt() {
        return t8().locale || await re();
      }
      let rr = async ({ requestLocale: e10 }) => {
        var t10;
        let n2 = await e10, i2 = (t10 = ru.locales, t10.includes(n2)) ? n2 : ru.defaultLocale;
        return { locale: i2, messages: (await r(691)(`./${i2}.json`)).default };
      }, rn = (0, tu.cache)(function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }), ri = (0, tu.cache)(async function(e10, t10) {
        let r2 = e10({ locale: t10, get requestLocale() {
          return t10 ? Promise.resolve(t10) : rt();
        } });
        if (tC(r2) && (r2 = await r2), !r2.locale) throw Error("No locale was returned from `getRequestConfig`.\n\nSee https://next-intl.dev/docs/usage/configuration#i18n-request");
        return r2;
      }), ra = (0, tu.cache)(function(e10) {
        return { getDateTimeFormat: tj(Intl.DateTimeFormat, e10.dateTime), getNumberFormat: tj(Intl.NumberFormat, e10.number), getPluralRules: tj(Intl.PluralRules, e10.pluralRules), getRelativeTimeFormat: tj(Intl.RelativeTimeFormat, e10.relativeTime), getListFormat: tj(Intl.ListFormat, e10.list), getDisplayNames: tj(Intl.DisplayNames, e10.displayNames) };
      }), ro = (0, tu.cache)(function() {
        return { dateTime: {}, number: {}, message: {}, relativeTime: {}, pluralRules: {}, list: {}, displayNames: {} };
      }), rs = (0, tu.cache)(async function(e10) {
        let t10 = await ri(rr, e10);
        return { ...function({ formats: e11, getMessageFallback: t11, messages: r2, onError: n2, ...i2 }) {
          return { ...i2, formats: e11 || void 0, messages: r2 || void 0, onError: n2 || tD, getMessageFallback: t11 || tM };
        }(t10), _formatters: ra(ro()), timeZone: t10.timeZone || rn() };
      });
      async function rl() {
        return (await rs()).locale;
      }
      let ru = { defaultLocale: "en", locales: ["en", "de", "fr", "es", "zh", "hi", "ja", "ko", "ru", "it", "pt"], localePrefix: "as-needed" }, { Link: rc, redirect: rd, usePathname: rp, useRouter: rf, getPathname: rg } = function(e10) {
        let { config: t10, ...r2 } = function(e11, t11) {
          let r3 = tc(t11 || {}), n3 = r3.pathnames, i2 = (0, tu.forwardRef)(function({ href: t12, locale: i3, ...o3 }, s2) {
            let l2, u2;
            "object" == typeof t12 ? (l2 = t12.pathname, u2 = t12.params) : l2 = t12;
            let c2 = tp(t12), d2 = e11(), p2 = tC(d2) ? td(d2) : d2, f2 = c2 ? a2({ locale: i3 || p2, href: null == n3 ? l2 : { pathname: l2, params: u2 }, forcePrefix: null != i3 || void 0 }) : l2;
            return (0, tR.jsx)(tT, { ref: s2, href: "object" == typeof t12 ? { ...t12, pathname: f2 } : f2, locale: i3, localeCookie: r3.localeCookie, ...o3 });
          });
          function a2(e12) {
            let t12, { forcePrefix: i3, href: a3, locale: o3 } = e12;
            return null == n3 ? "object" == typeof a3 ? (t12 = a3.pathname, a3.query && (t12 += tE(a3.query))) : t12 = a3 : t12 = function({ pathname: e13, locale: t13, params: r4, pathnames: n4, query: i4 }) {
              function a4(e14) {
                let t14 = n4[e14];
                return t14 || (t14 = e14), t14;
              }
              function o4(e14, n5) {
                let a5 = tg(e14, t13, n5);
                return r4 && Object.entries(r4).forEach(([e15, t14]) => {
                  let r5, n6;
                  Array.isArray(t14) ? (r5 = `(\\[)?\\[...${e15}\\](\\])?`, n6 = t14.map((e16) => String(e16)).join("/")) : (r5 = `\\[${e15}\\]`, n6 = String(t14)), a5 = a5.replace(RegExp(r5, "g"), n6);
                }), a5 = th(a5 = a5.replace(/\[\[\.\.\..+\]\]/g, "")), i4 && (a5 += tE(i4)), a5;
              }
              if ("string" == typeof e13) return o4(a4(e13), e13);
              {
                let { pathname: t14, ...r5 } = e13;
                return { ...r5, pathname: o4(a4(t14), t14) };
              }
            }({ locale: o3, ..."string" == typeof a3 ? { pathname: a3 } : a3, pathnames: r3.pathnames }), function(e13, t13, r4, n4) {
              let i4, { mode: a4 } = r4.localePrefix;
              return void 0 !== n4 ? i4 = n4 : tp(e13) && ("always" === a4 ? i4 = true : "as-needed" === a4 && (i4 = r4.domains ? !r4.domains.some((e14) => e14.defaultLocale === t13) : t13 !== r4.defaultLocale)), i4 ? tf(t_(t13, r4.localePrefix), e13) : e13;
            }(t12, o3, r3, i3);
          }
          function o2(e12) {
            return function(t12, ...r4) {
              return e12(a2(t12), ...r4);
            };
          }
          return { config: r3, Link: i2, redirect: o2(to), permanentRedirect: o2(ts), getPathname: a2 };
        }(rl, e10);
        function n2(e11) {
          return () => {
            throw Error(`\`${e11}\` is not supported in Server Components. You can use this hook if you convert the calling component to a Client Component.`);
          };
        }
        return { ...r2, usePathname: n2("usePathname"), useRouter: n2("useRouter") };
      }(ru);
      function rh(e10, t10, r2, n2) {
        let i2 = "";
        return i2 += function(e11, t11) {
          if (!t11) return e11;
          let r3 = e11 = e11.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
          return Object.entries(t11).forEach(([e12, t12]) => {
            r3 = r3.replace(`[${e12}]`, t12);
          }), r3;
        }(r2, function(e11, t11) {
          let r3 = th(t11), n3 = th(e11), i3 = ty(n3).exec(r3);
          if (!i3) return;
          let a2 = {};
          for (let e12 = 1; e12 < i3.length; e12++) {
            let t12 = n3.match(/\[([^\]]+)\]/g)?.[e12 - 1].replace(/[[\]]/g, "");
            t12 && (a2[t12] = i3[e12]);
          }
          return a2;
        }(t10, e10)), i2 = th(i2);
      }
      function rm(e10, t10, r2) {
        e10.endsWith("/") || (e10 += "/");
        let n2 = r_(t10, r2), i2 = RegExp(`^(${n2.map(([, e11]) => e11.replaceAll("/", "\\/")).join("|")})/(.*)`, "i"), a2 = e10.match(i2), o2 = a2 ? "/" + a2[2] : e10;
        return "/" !== o2 && (o2 = th(o2)), o2;
      }
      function r_(e10, t10, r2 = true) {
        let n2 = e10.map((e11) => [e11, t_(e11, t10)]);
        return r2 && n2.sort((e11, t11) => t11[1].length - e11[1].length), n2;
      }
      function ry(e10, t10, r2, n2) {
        let i2 = r_(t10, r2);
        for (let [t11, r3] of (n2 && i2.sort(([e11], [t12]) => {
          if (e11 === n2.defaultLocale) return -1;
          if (t12 === n2.defaultLocale) return 1;
          let r4 = n2.locales.includes(e11), i3 = n2.locales.includes(t12);
          return r4 && !i3 ? -1 : !r4 && i3 ? 1 : 0;
        }), i2)) {
          let n3, i3;
          if (e10 === r3 || e10.startsWith(r3 + "/")) n3 = i3 = true;
          else {
            let t12 = e10.toLowerCase(), a2 = r3.toLowerCase();
            (t12 === a2 || t12.startsWith(a2 + "/")) && (n3 = false, i3 = true);
          }
          if (i3) return { locale: t11, prefix: r3, matchedPrefix: e10.slice(0, r3.length), exact: n3 };
        }
      }
      function rv(e10, t10, r2) {
        let n2 = e10;
        return t10 && (n2 = tf(t10, n2)), r2 && (n2 += r2), n2;
      }
      function rb(e10) {
        return e10.get("x-forwarded-host") ?? e10.get("host") ?? void 0;
      }
      function rw(e10, t10) {
        return t10.defaultLocale === e10 || t10.locales.includes(e10);
      }
      function rS(e10, t10, r2) {
        let n2;
        return e10 && rw(t10, e10) && (n2 = e10), n2 || (n2 = r2.find((e11) => e11.defaultLocale === t10)), n2 || (n2 = r2.find((e11) => e11.locales.includes(t10))), n2;
      }
      r(446), "undefined" == typeof URLPattern || URLPattern, /* @__PURE__ */ new WeakMap();
      Object.create;
      function rC(e10, t10, r2) {
        if (r2 || 2 == arguments.length) for (var n2, i2 = 0, a2 = t10.length; i2 < a2; i2++) !n2 && i2 in t10 || (n2 || (n2 = Array.prototype.slice.call(t10, 0, i2)), n2[i2] = t10[i2]);
        return e10.concat(n2 || Array.prototype.slice.call(t10));
      }
      Object.create;
      var rT = ("function" == typeof SuppressedError && SuppressedError, { supplemental: { languageMatching: { "written-new": [{ paradigmLocales: { _locales: "en en_GB es es_419 pt_BR pt_PT" } }, { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } }, { $cnsar: { _value: "HK+MO" } }, { $americas: { _value: "019" } }, { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } }, { no: { _desired: "nb", _distance: "1" } }, { bs: { _desired: "hr", _distance: "4" } }, { bs: { _desired: "sh", _distance: "4" } }, { hr: { _desired: "sh", _distance: "4" } }, { sr: { _desired: "sh", _distance: "4" } }, { aa: { _desired: "ssy", _distance: "4" } }, { de: { _desired: "gsw", _distance: "4", _oneway: "true" } }, { de: { _desired: "lb", _distance: "4", _oneway: "true" } }, { no: { _desired: "da", _distance: "8" } }, { nb: { _desired: "da", _distance: "8" } }, { ru: { _desired: "ab", _distance: "30", _oneway: "true" } }, { en: { _desired: "ach", _distance: "30", _oneway: "true" } }, { nl: { _desired: "af", _distance: "20", _oneway: "true" } }, { en: { _desired: "ak", _distance: "30", _oneway: "true" } }, { en: { _desired: "am", _distance: "30", _oneway: "true" } }, { es: { _desired: "ay", _distance: "20", _oneway: "true" } }, { ru: { _desired: "az", _distance: "30", _oneway: "true" } }, { ur: { _desired: "bal", _distance: "20", _oneway: "true" } }, { ru: { _desired: "be", _distance: "20", _oneway: "true" } }, { en: { _desired: "bem", _distance: "30", _oneway: "true" } }, { hi: { _desired: "bh", _distance: "30", _oneway: "true" } }, { en: { _desired: "bn", _distance: "30", _oneway: "true" } }, { zh: { _desired: "bo", _distance: "20", _oneway: "true" } }, { fr: { _desired: "br", _distance: "20", _oneway: "true" } }, { es: { _desired: "ca", _distance: "20", _oneway: "true" } }, { fil: { _desired: "ceb", _distance: "30", _oneway: "true" } }, { en: { _desired: "chr", _distance: "20", _oneway: "true" } }, { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } }, { fr: { _desired: "co", _distance: "20", _oneway: "true" } }, { fr: { _desired: "crs", _distance: "20", _oneway: "true" } }, { sk: { _desired: "cs", _distance: "20" } }, { en: { _desired: "cy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ee", _distance: "30", _oneway: "true" } }, { en: { _desired: "eo", _distance: "30", _oneway: "true" } }, { es: { _desired: "eu", _distance: "20", _oneway: "true" } }, { da: { _desired: "fo", _distance: "20", _oneway: "true" } }, { nl: { _desired: "fy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ga", _distance: "20", _oneway: "true" } }, { en: { _desired: "gaa", _distance: "30", _oneway: "true" } }, { en: { _desired: "gd", _distance: "20", _oneway: "true" } }, { es: { _desired: "gl", _distance: "20", _oneway: "true" } }, { es: { _desired: "gn", _distance: "20", _oneway: "true" } }, { hi: { _desired: "gu", _distance: "30", _oneway: "true" } }, { en: { _desired: "ha", _distance: "30", _oneway: "true" } }, { en: { _desired: "haw", _distance: "20", _oneway: "true" } }, { fr: { _desired: "ht", _distance: "20", _oneway: "true" } }, { ru: { _desired: "hy", _distance: "30", _oneway: "true" } }, { en: { _desired: "ia", _distance: "30", _oneway: "true" } }, { en: { _desired: "ig", _distance: "30", _oneway: "true" } }, { en: { _desired: "is", _distance: "20", _oneway: "true" } }, { id: { _desired: "jv", _distance: "20", _oneway: "true" } }, { en: { _desired: "ka", _distance: "30", _oneway: "true" } }, { fr: { _desired: "kg", _distance: "30", _oneway: "true" } }, { ru: { _desired: "kk", _distance: "30", _oneway: "true" } }, { en: { _desired: "km", _distance: "30", _oneway: "true" } }, { en: { _desired: "kn", _distance: "30", _oneway: "true" } }, { en: { _desired: "kri", _distance: "30", _oneway: "true" } }, { tr: { _desired: "ku", _distance: "30", _oneway: "true" } }, { ru: { _desired: "ky", _distance: "30", _oneway: "true" } }, { it: { _desired: "la", _distance: "20", _oneway: "true" } }, { en: { _desired: "lg", _distance: "30", _oneway: "true" } }, { fr: { _desired: "ln", _distance: "30", _oneway: "true" } }, { en: { _desired: "lo", _distance: "30", _oneway: "true" } }, { en: { _desired: "loz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "lua", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mai", _distance: "20", _oneway: "true" } }, { en: { _desired: "mfe", _distance: "30", _oneway: "true" } }, { fr: { _desired: "mg", _distance: "30", _oneway: "true" } }, { en: { _desired: "mi", _distance: "20", _oneway: "true" } }, { en: { _desired: "ml", _distance: "30", _oneway: "true" } }, { ru: { _desired: "mn", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mr", _distance: "30", _oneway: "true" } }, { id: { _desired: "ms", _distance: "30", _oneway: "true" } }, { en: { _desired: "mt", _distance: "30", _oneway: "true" } }, { en: { _desired: "my", _distance: "30", _oneway: "true" } }, { en: { _desired: "ne", _distance: "30", _oneway: "true" } }, { nb: { _desired: "nn", _distance: "20" } }, { no: { _desired: "nn", _distance: "20" } }, { en: { _desired: "nso", _distance: "30", _oneway: "true" } }, { en: { _desired: "ny", _distance: "30", _oneway: "true" } }, { en: { _desired: "nyn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "oc", _distance: "20", _oneway: "true" } }, { en: { _desired: "om", _distance: "30", _oneway: "true" } }, { en: { _desired: "or", _distance: "30", _oneway: "true" } }, { en: { _desired: "pa", _distance: "30", _oneway: "true" } }, { en: { _desired: "pcm", _distance: "20", _oneway: "true" } }, { en: { _desired: "ps", _distance: "30", _oneway: "true" } }, { es: { _desired: "qu", _distance: "30", _oneway: "true" } }, { de: { _desired: "rm", _distance: "20", _oneway: "true" } }, { en: { _desired: "rn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "rw", _distance: "30", _oneway: "true" } }, { hi: { _desired: "sa", _distance: "30", _oneway: "true" } }, { en: { _desired: "sd", _distance: "30", _oneway: "true" } }, { en: { _desired: "si", _distance: "30", _oneway: "true" } }, { en: { _desired: "sn", _distance: "30", _oneway: "true" } }, { en: { _desired: "so", _distance: "30", _oneway: "true" } }, { en: { _desired: "sq", _distance: "30", _oneway: "true" } }, { en: { _desired: "st", _distance: "30", _oneway: "true" } }, { id: { _desired: "su", _distance: "20", _oneway: "true" } }, { en: { _desired: "sw", _distance: "30", _oneway: "true" } }, { en: { _desired: "ta", _distance: "30", _oneway: "true" } }, { en: { _desired: "te", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tg", _distance: "30", _oneway: "true" } }, { en: { _desired: "ti", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tk", _distance: "30", _oneway: "true" } }, { en: { _desired: "tlh", _distance: "30", _oneway: "true" } }, { en: { _desired: "tn", _distance: "30", _oneway: "true" } }, { en: { _desired: "to", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tt", _distance: "30", _oneway: "true" } }, { en: { _desired: "tum", _distance: "30", _oneway: "true" } }, { zh: { _desired: "ug", _distance: "20", _oneway: "true" } }, { ru: { _desired: "uk", _distance: "20", _oneway: "true" } }, { en: { _desired: "ur", _distance: "30", _oneway: "true" } }, { ru: { _desired: "uz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "wo", _distance: "30", _oneway: "true" } }, { en: { _desired: "xh", _distance: "30", _oneway: "true" } }, { en: { _desired: "yi", _distance: "30", _oneway: "true" } }, { en: { _desired: "yo", _distance: "30", _oneway: "true" } }, { zh: { _desired: "za", _distance: "20", _oneway: "true" } }, { en: { _desired: "zu", _distance: "30", _oneway: "true" } }, { ar: { _desired: "aao", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abv", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acm", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acw", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acx", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acy", _distance: "10", _oneway: "true" } }, { ar: { _desired: "adf", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aec", _distance: "10", _oneway: "true" } }, { ar: { _desired: "afb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apc", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apd", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ars", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ary", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "auz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "avl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "pga", _distance: "10", _oneway: "true" } }, { ar: { _desired: "shu", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } }, { az: { _desired: "azb", _distance: "10", _oneway: "true" } }, { et: { _desired: "vro", _distance: "10", _oneway: "true" } }, { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fub", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fue", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fui", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gui", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gun", _distance: "10", _oneway: "true" } }, { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } }, { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } }, { kln: { _desired: "enb", _distance: "10", _oneway: "true" } }, { kln: { _desired: "eyo", _distance: "10", _oneway: "true" } }, { kln: { _desired: "niq", _distance: "10", _oneway: "true" } }, { kln: { _desired: "oki", _distance: "10", _oneway: "true" } }, { kln: { _desired: "pko", _distance: "10", _oneway: "true" } }, { kln: { _desired: "sgc", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tec", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tuy", _distance: "10", _oneway: "true" } }, { kok: { _desired: "gom", _distance: "10", _oneway: "true" } }, { kpe: { _desired: "gkp", _distance: "10", _oneway: "true" } }, { luy: { _desired: "ida", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lkb", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lko", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lks", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lri", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lrm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lsm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lto", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lts", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lwg", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nle", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nyd", _distance: "10", _oneway: "true" } }, { luy: { _desired: "rag", _distance: "10", _oneway: "true" } }, { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } }, { mg: { _desired: "msh", _distance: "10", _oneway: "true" } }, { mg: { _desired: "skg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "txy", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } }, { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "btj", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bve", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } }, { ms: { _desired: "coa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "dup", _distance: "10", _oneway: "true" } }, { ms: { _desired: "hji", _distance: "10", _oneway: "true" } }, { ms: { _desired: "id", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jak", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jax", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lce", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "liw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "max", _distance: "10", _oneway: "true" } }, { ms: { _desired: "meo", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "min", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } }, { ms: { _desired: "msi", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mui", _distance: "10", _oneway: "true" } }, { ms: { _desired: "orn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "ors", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pel", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pse", _distance: "10", _oneway: "true" } }, { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "urk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } }, { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } }, { ne: { _desired: "dty", _distance: "10", _oneway: "true" } }, { om: { _desired: "gax", _distance: "10", _oneway: "true" } }, { om: { _desired: "hae", _distance: "10", _oneway: "true" } }, { om: { _desired: "orc", _distance: "10", _oneway: "true" } }, { or: { _desired: "spv", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pst", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qub", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qud", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quf", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qug", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quk", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qul", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qup", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qur", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qus", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qux", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quy", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qva", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qve", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qws", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sro", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aae", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aat", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aln", _distance: "10", _oneway: "true" } }, { syr: { _desired: "aii", _distance: "10", _oneway: "true" } }, { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } }, { yi: { _desired: "yih", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "gan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hak", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } }, { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } }, { zh: { _desired: "nan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } }, { zh: { _desired: "yue", _distance: "10", _oneway: "true" } }, { "*": { _desired: "*", _distance: "80" } }, { "en-Latn": { _desired: "am-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "az-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "bn-Beng", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "bo-Tibt", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "hy-Armn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ka-Geor", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "km-Khmr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "kn-Knda", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "lo-Laoo", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ml-Mlym", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "my-Mymr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ne-Deva", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "or-Orya", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "pa-Guru", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ps-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "sd-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "si-Sinh", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ta-Taml", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "te-Telu", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ti-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "tk-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ur-Arab", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "uz-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "yi-Hebr", _distance: "10", _oneway: "true" } }, { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } }, { "zh-Hans": { _desired: "za-Latn", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "zh-Hant": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "ar-Arab": { _desired: "ar-Latn", _distance: "20", _oneway: "true" } }, { "bn-Beng": { _desired: "bn-Latn", _distance: "20", _oneway: "true" } }, { "gu-Gujr": { _desired: "gu-Latn", _distance: "20", _oneway: "true" } }, { "hi-Deva": { _desired: "hi-Latn", _distance: "20", _oneway: "true" } }, { "kn-Knda": { _desired: "kn-Latn", _distance: "20", _oneway: "true" } }, { "ml-Mlym": { _desired: "ml-Latn", _distance: "20", _oneway: "true" } }, { "mr-Deva": { _desired: "mr-Latn", _distance: "20", _oneway: "true" } }, { "ta-Taml": { _desired: "ta-Latn", _distance: "20", _oneway: "true" } }, { "te-Telu": { _desired: "te-Latn", _distance: "20", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Latn", _distance: "20", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Latn", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hani", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hrkt", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hani", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hang", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "ko-Hang": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "*-*": { _desired: "*-*", _distance: "50" } }, { "ar-*-$maghreb": { _desired: "ar-*-$maghreb", _distance: "4" } }, { "ar-*-$!maghreb": { _desired: "ar-*-$!maghreb", _distance: "4" } }, { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } }, { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } }, { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } }, { "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" } }, { "en-*-*": { _desired: "en-*-*", _distance: "5" } }, { "es-*-$americas": { _desired: "es-*-$americas", _distance: "4" } }, { "es-*-$!americas": { _desired: "es-*-$!americas", _distance: "4" } }, { "es-*-*": { _desired: "es-*-*", _distance: "5" } }, { "pt-*-$americas": { _desired: "pt-*-$americas", _distance: "4" } }, { "pt-*-$!americas": { _desired: "pt-*-$!americas", _distance: "4" } }, { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } }, { "zh-Hant-$cnsar": { _desired: "zh-Hant-$cnsar", _distance: "4" } }, { "zh-Hant-$!cnsar": { _desired: "zh-Hant-$!cnsar", _distance: "4" } }, { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } }, { "*-*-*": { _desired: "*-*-*", _distance: "4" } }] } } }), rE = { "001": ["001", "001-status-grouping", "002", "005", "009", "011", "013", "014", "015", "017", "018", "019", "021", "029", "030", "034", "035", "039", "053", "054", "057", "061", "142", "143", "145", "150", "151", "154", "155", "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "EZ", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "QO", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UN", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], "002": ["002", "002-status-grouping", "011", "014", "015", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EA", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IC", "IO", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], "003": ["003", "013", "021", "029", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"], "005": ["005", "AR", "BO", "BR", "BV", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE"], "009": ["009", "053", "054", "057", "061", "AC", "AQ", "AS", "AU", "CC", "CK", "CP", "CX", "DG", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF", "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "QO", "SB", "TA", "TK", "TO", "TV", "UM", "VU", "WF", "WS"], "011": ["011", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"], "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"], "014": ["014", "BI", "DJ", "ER", "ET", "IO", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "SS", "TF", "TZ", "UG", "YT", "ZM", "ZW"], "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"], "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"], "018": ["018", "BW", "LS", "NA", "SZ", "ZA"], "019": ["003", "005", "013", "019", "019-status-grouping", "021", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BM", "BO", "BQ", "BR", "BS", "BV", "BZ", "CA", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GL", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PM", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "US", "UY", "VC", "VE", "VG", "VI"], "021": ["021", "BM", "CA", "GL", "PM", "US"], "029": ["029", "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"], "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"], "035": ["035", "BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"], "039": ["039", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "PT", "RS", "SI", "SM", "VA", "XK"], "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"], "054": ["054", "FJ", "NC", "PG", "SB", "VU"], "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"], "061": ["061", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"], 142: ["030", "034", "035", "142", "143", "145", "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"], 143: ["143", "KG", "KZ", "TJ", "TM", "UZ"], 145: ["145", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"], 150: ["039", "150", "151", "154", "155", "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CQ", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA", "XK"], 151: ["151", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"], 154: ["154", "AX", "CQ", "DK", "EE", "FI", "FO", "GB", "GG", "IE", "IM", "IS", "JE", "LT", "LV", "NO", "SE", "SJ"], 155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"], 202: ["011", "014", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], 419: ["005", "013", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BO", "BQ", "BR", "BS", "BV", "BZ", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "UY", "VC", "VE", "VG", "VI"], EU: ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "EU", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"], EZ: ["AT", "BE", "CY", "DE", "EE", "ES", "EZ", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"], QO: ["AC", "AQ", "CP", "DG", "QO", "TA"], UN: ["AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UN", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"] }, rR = /-u(?:-[0-9a-z]{2,8})+/gi;
      function rx(e10, t10, r2) {
        if (void 0 === r2 && (r2 = Error), !e10) throw new r2(t10);
      }
      function rO(e10, t10, r2) {
        var n2 = t10.split("-"), i2 = n2[0], a2 = n2[1], o2 = n2[2], s2 = true;
        if (o2 && "$" === o2[0]) {
          var l2 = "!" !== o2[1], u2 = (l2 ? r2[o2.slice(1)] : r2[o2.slice(2)]).map(function(e11) {
            return rE[e11] || [e11];
          }).reduce(function(e11, t11) {
            return rC(rC([], e11, true), t11, true);
          }, []);
          s2 && (s2 = u2.indexOf(e10.region || "") > 1 == l2);
        } else s2 && (s2 = !e10.region || "*" === o2 || o2 === e10.region);
        return s2 && (s2 = !e10.script || "*" === a2 || a2 === e10.script), s2 && (s2 = !e10.language || "*" === i2 || i2 === e10.language), s2;
      }
      function rP(e10) {
        return [e10.language, e10.script, e10.region].filter(Boolean).join("-");
      }
      function rk(e10, t10, r2) {
        for (var n2 = 0, i2 = r2.matches; n2 < i2.length; n2++) {
          var a2 = i2[n2], o2 = rO(e10, a2.desired, r2.matchVariables) && rO(t10, a2.supported, r2.matchVariables);
          if (a2.oneway || o2 || (o2 = rO(e10, a2.supported, r2.matchVariables) && rO(t10, a2.desired, r2.matchVariables)), o2) {
            var s2 = 10 * a2.distance;
            if (r2.paradigmLocales.indexOf(rP(e10)) > -1 != r2.paradigmLocales.indexOf(rP(t10)) > -1) return s2 - 1;
            return s2;
          }
        }
        throw Error("No matching distance found");
      }
      function rN(e10) {
        return Intl.getCanonicalLocales(e10)[0];
      }
      var rA = r(780);
      function rL(e10, t10, r2) {
        let n2, a2 = new rA({ headers: { "accept-language": e10.get("accept-language") || void 0 } }).languages();
        try {
          let e11 = t10.slice().sort((e12, t11) => t11.length - e12.length);
          n2 = function(e12, t11, r3, n3, a3, o2) {
            "lookup" === r3.localeMatcher ? l2 = function(e13, t12, r4) {
              for (var n4 = { locale: "" }, i2 = 0; i2 < t12.length; i2++) {
                var a4 = t12[i2], o3 = a4.replace(rR, ""), s3 = function(e14, t13) {
                  for (var r5 = t13; ; ) {
                    if (e14.indexOf(r5) > -1) return r5;
                    var n5 = r5.lastIndexOf("-");
                    if (!~n5) return;
                    n5 >= 2 && "-" === r5[n5 - 2] && (n5 -= 2), r5 = r5.slice(0, n5);
                  }
                }(e13, o3);
                if (s3) return n4.locale = s3, a4 !== o3 && (n4.extension = a4.slice(o3.length, a4.length)), n4;
              }
              return n4.locale = r4(), n4;
            }(Array.from(e12), t11, o2) : (c2 = Array.from(e12), f2 = [], g2 = t11.reduce(function(e13, t12) {
              var r4 = t12.replace(rR, "");
              return f2.push(r4), e13[r4] = t12, e13;
            }, {}), (void 0 === h2 && (h2 = 838), m2 = 1 / 0, _2 = { matchedDesiredLocale: "", distances: {} }, f2.forEach(function(e13, t12) {
              _2.distances[e13] || (_2.distances[e13] = {}), c2.forEach(function(r4) {
                var n4, a4, o3, s3, l3, u3, c3 = (n4 = new Intl.Locale(e13).maximize(), a4 = new Intl.Locale(r4).maximize(), o3 = { language: n4.language, script: n4.script || "", region: n4.region || "" }, s3 = { language: a4.language, script: a4.script || "", region: a4.region || "" }, l3 = 0, u3 = function() {
                  var e14, t13;
                  if (!i) {
                    var r5 = null == (t13 = null == (e14 = rT.supplemental.languageMatching["written-new"][0]) ? void 0 : e14.paradigmLocales) ? void 0 : t13._locales.split(" "), n5 = rT.supplemental.languageMatching["written-new"].slice(1, 5);
                    i = { matches: rT.supplemental.languageMatching["written-new"].slice(5).map(function(e15) {
                      var t14 = Object.keys(e15)[0], r6 = e15[t14];
                      return { supported: t14, desired: r6._desired, distance: +r6._distance, oneway: "true" === r6.oneway };
                    }, {}), matchVariables: n5.reduce(function(e15, t14) {
                      var r6 = Object.keys(t14)[0], n6 = t14[r6];
                      return e15[r6.slice(1)] = n6._value.split("+"), e15;
                    }, {}), paradigmLocales: rC(rC([], r5, true), r5.map(function(e15) {
                      return new Intl.Locale(e15.replace(/_/g, "-")).maximize().toString();
                    }), true) };
                  }
                  return i;
                }(), o3.language !== s3.language && (l3 += rk({ language: n4.language, script: "", region: "" }, { language: a4.language, script: "", region: "" }, u3)), o3.script !== s3.script && (l3 += rk({ language: n4.language, script: o3.script, region: "" }, { language: a4.language, script: o3.script, region: "" }, u3)), o3.region !== s3.region && (l3 += rk(o3, s3, u3)), l3 + 0 + 40 * t12);
                _2.distances[e13][r4] = c3, c3 < m2 && (m2 = c3, _2.matchedDesiredLocale = e13, _2.matchedSupportedLocale = r4);
              });
            }), m2 >= h2 && (_2.matchedDesiredLocale = void 0, _2.matchedSupportedLocale = void 0), y2 = _2).matchedSupportedLocale && y2.matchedDesiredLocale && (d2 = y2.matchedSupportedLocale, p2 = g2[y2.matchedDesiredLocale].slice(y2.matchedDesiredLocale.length) || void 0), l2 = d2 ? { locale: d2, extension: p2 } : { locale: o2() }), null == l2 && (l2 = { locale: o2(), extension: "" });
            var s2, l2, u2, c2, d2, p2, f2, g2, h2, m2, _2, y2, v2 = l2.locale, b2 = a3[v2], w2 = { locale: "en", dataLocale: v2 };
            u2 = l2.extension ? function(e13) {
              rx(e13 === e13.toLowerCase(), "Expected extension to be lowercase"), rx("-u-" === e13.slice(0, 3), "Expected extension to be a Unicode locale extension");
              for (var t12, r4 = [], n4 = [], i2 = e13.length, a4 = 3; a4 < i2; ) {
                var o3 = e13.indexOf("-", a4), s3 = void 0;
                s3 = -1 === o3 ? i2 - a4 : o3 - a4;
                var l3 = e13.slice(a4, a4 + s3);
                rx(s3 >= 2, "Expected a subtag to have at least 2 characters"), void 0 === t12 && 2 != s3 ? -1 === r4.indexOf(l3) && r4.push(l3) : 2 === s3 ? (t12 = { key: l3, value: "" }, void 0 === n4.find(function(e14) {
                  return e14.key === (null == t12 ? void 0 : t12.key);
                }) && n4.push(t12)) : (null == t12 ? void 0 : t12.value) === "" ? t12.value = l3 : (rx(void 0 !== t12, "Expected keyword to be defined"), t12.value += "-" + l3), a4 += s3 + 1;
              }
              return { attributes: r4, keywords: n4 };
            }(l2.extension).keywords : [];
            for (var S2 = [], C2 = function(e13) {
              var t12, n4, i2 = null != (s2 = null == b2 ? void 0 : b2[e13]) ? s2 : [];
              rx(Array.isArray(i2), "keyLocaleData for ".concat(e13, " must be an array"));
              var a4 = i2[0];
              rx(void 0 === a4 || "string" == typeof a4, "value must be a string or undefined");
              var o3 = void 0, l3 = u2.find(function(t13) {
                return t13.key === e13;
              });
              if (l3) {
                var c3 = l3.value;
                "" !== c3 ? i2.indexOf(c3) > -1 && (o3 = { key: e13, value: a4 = c3 }) : i2.indexOf("true") > -1 && (o3 = { key: e13, value: a4 = "true" });
              }
              var d3 = r3[e13];
              rx(null == d3 || "string" == typeof d3, "optionsValue must be a string or undefined"), "string" == typeof d3 && (t12 = e13.toLowerCase(), n4 = d3.toLowerCase(), rx(void 0 !== t12, "ukey must be defined"), "" === (d3 = n4) && (d3 = "true")), d3 !== a4 && i2.indexOf(d3) > -1 && (a4 = d3, o3 = void 0), o3 && S2.push(o3), w2[e13] = a4;
            }, T2 = 0; T2 < n3.length; T2++) C2(n3[T2]);
            var E2 = [];
            return S2.length > 0 && (v2 = function(e13, t12, r4) {
              rx(-1 === e13.indexOf("-u-"), "Expected locale to not have a Unicode locale extension");
              for (var n4, i2 = "-u", a4 = 0; a4 < t12.length; a4++) {
                var o3 = t12[a4];
                i2 += "-".concat(o3);
              }
              for (var s3 = 0; s3 < r4.length; s3++) {
                var l3 = r4[s3], u3 = l3.key, c3 = l3.value;
                i2 += "-".concat(u3), "" !== c3 && (i2 += "-".concat(c3));
              }
              if ("-u" === i2) return rN(e13);
              var d3 = e13.indexOf("-x-");
              return rN(-1 === d3 ? e13 + i2 : e13.slice(0, d3) + i2 + e13.slice(d3));
            }(v2, [], S2)), w2.locale = v2, w2;
          }(e11, Intl.getCanonicalLocales(a2), { localeMatcher: "best fit" }, [], {}, function() {
            return r2;
          }).locale;
        } catch {
        }
        return n2;
      }
      function rI(e10, t10) {
        if (e10.localeCookie && t10.has(e10.localeCookie.name)) {
          let r2 = t10.get(e10.localeCookie.name)?.value;
          if (r2 && e10.locales.includes(r2)) return r2;
        }
      }
      function rM(e10, t10, r2, n2) {
        let i2;
        return n2 && (i2 = ry(n2, e10.locales, e10.localePrefix)?.locale), !i2 && e10.localeDetection && (i2 = rI(e10, r2)), !i2 && e10.localeDetection && (i2 = rL(t10, e10.locales, e10.defaultLocale)), i2 || (i2 = e10.defaultLocale), i2;
      }
      let rD = function(e10) {
        let t10 = tc(e10);
        return function(e11) {
          var r2, n2;
          let i2;
          try {
            i2 = decodeURI(e11.nextUrl.pathname);
          } catch {
            return V.next();
          }
          let a2 = i2.replace(/\\/g, "%5C").replace(/\/+/g, "/"), { domain: o2, locale: s2 } = (r2 = e11.headers, n2 = e11.cookies, t10.domains ? function(e12, t11, r3, n3) {
            let i3, a3 = function(e13, t12) {
              let r4 = rb(e13);
              if (r4) return t12.find((e14) => e14.domain === r4);
            }(t11, e12.domains);
            if (!a3) return { locale: rM(e12, t11, r3, n3) };
            if (n3) {
              let t12 = ry(n3, e12.locales, e12.localePrefix, a3)?.locale;
              if (t12) {
                if (!rw(t12, a3)) return { locale: t12, domain: a3 };
                i3 = t12;
              }
            }
            if (!i3 && e12.localeDetection) {
              let t12 = rI(e12, r3);
              t12 && rw(t12, a3) && (i3 = t12);
            }
            if (!i3 && e12.localeDetection) {
              let e13 = rL(t11, a3.locales, a3.defaultLocale);
              e13 && (i3 = e13);
            }
            return i3 || (i3 = a3.defaultLocale), { locale: i3, domain: a3 };
          }(t10, r2, n2, a2) : { locale: rM(t10, r2, n2, a2) }), l2 = o2 ? o2.defaultLocale === s2 : s2 === t10.defaultLocale, u2 = t10.domains?.filter((e12) => rw(s2, e12)) || [], c2 = null != t10.domains && !o2;
          function d2(t11) {
            var r3;
            let n3 = new URL(t11, e11.url);
            e11.nextUrl.basePath && (r3 = n3.pathname, n3.pathname = th(e11.nextUrl.basePath + r3));
            let i3 = new Headers(e11.headers);
            return i3.set(t9, s2), V.rewrite(n3, { request: { headers: i3 } });
          }
          function p2(r3, n3) {
            var i3;
            let a3 = new URL(r3, e11.url);
            if (a3.pathname = th(a3.pathname), u2.length > 0 && !n3 && o2) {
              let e12 = rS(o2, s2, u2);
              e12 && (n3 = e12.domain, e12.defaultLocale === s2 && "as-needed" === t10.localePrefix.mode && (a3.pathname = rm(a3.pathname, t10.locales, t10.localePrefix)));
            }
            return n3 && (a3.host = n3, e11.headers.get("x-forwarded-host")) && (a3.protocol = e11.headers.get("x-forwarded-proto") ?? e11.nextUrl.protocol, a3.port = n3.split(":")[1] ?? e11.headers.get("x-forwarded-port") ?? ""), e11.nextUrl.basePath && (i3 = a3.pathname, a3.pathname = th(e11.nextUrl.basePath + i3)), v2 = true, V.redirect(a3.toString());
          }
          let f2 = rm(a2, t10.locales, t10.localePrefix), g2 = ry(a2, t10.locales, t10.localePrefix, o2), h2 = null != g2, m2 = "never" === t10.localePrefix.mode || l2 && "as-needed" === t10.localePrefix.mode, _2, y2, v2, b2 = f2, w2 = t10.pathnames;
          if (w2) {
            let r3;
            if ([r3, y2] = function(e12, t11, r4) {
              for (let n3 of Object.keys(e12).sort(tS)) {
                let i3 = e12[n3];
                if ("string" == typeof i3) {
                  if (tm(i3, t11)) return [void 0, n3];
                } else {
                  let a3 = Object.entries(i3), o3 = a3.findIndex(([e13]) => e13 === r4);
                  for (let [r5] of (o3 > 0 && a3.unshift(a3.splice(o3, 1)[0]), a3)) if (tm(tg(e12[n3], r5, n3), t11)) return [r5, n3];
                }
              }
              for (let r5 of Object.keys(e12)) if (tm(r5, t11)) return [void 0, r5];
              return [void 0, void 0];
            }(w2, f2, s2), y2) {
              let n3 = w2[y2], i3 = tg(n3, s2, y2);
              if (tm(i3, f2)) b2 = rh(f2, i3, y2);
              else {
                let a3;
                a3 = r3 ? tg(n3, r3, y2) : y2;
                let o3 = m2 ? void 0 : t_(s2, t10.localePrefix);
                _2 = p2(rv(rh(f2, a3, i3), o3, e11.nextUrl.search));
              }
            }
          }
          if (!_2) if ("/" !== b2 || h2) {
            let r3 = rv(b2, `/${s2}`, e11.nextUrl.search);
            if (h2) {
              let n3 = rv(f2, g2.prefix, e11.nextUrl.search);
              if ("never" === t10.localePrefix.mode) _2 = p2(rv(f2, void 0, e11.nextUrl.search));
              else if (g2.exact) if (l2 && m2) _2 = p2(rv(f2, void 0, e11.nextUrl.search));
              else if (t10.domains) {
                let e12 = rS(o2, g2.locale, u2);
                _2 = o2?.domain === e12?.domain || c2 ? d2(r3) : p2(n3, e12?.domain);
              } else _2 = d2(r3);
              else _2 = p2(n3);
            } else _2 = m2 ? d2(r3) : p2(rv(f2, t_(s2, t10.localePrefix), e11.nextUrl.search));
          } else _2 = m2 ? d2(rv(b2, `/${s2}`, e11.nextUrl.search)) : p2(rv(f2, t_(s2, t10.localePrefix), e11.nextUrl.search));
          return function(e12, t11, r3, n3, i3) {
            if (!n3.localeCookie) return;
            let { name: a3, ...o3 } = n3.localeCookie, s3 = rL(e12.headers, i3?.locales || n3.locales, n3.defaultLocale), l3 = e12.cookies.has(a3), u3 = l3 && e12.cookies.get(a3)?.value !== r3;
            (l3 ? u3 : s3 !== r3) && t11.cookies.set(a3, r3, { path: e12.nextUrl.basePath || void 0, ...o3 });
          }(e11, _2, s2, t10, o2), !v2 && "never" !== t10.localePrefix.mode && t10.alternateLinks && t10.locales.length > 1 && _2.headers.set("Link", function({ internalTemplateName: e12, localizedPathnames: t11, request: r3, resolvedLocale: n3, routing: i3 }) {
            let a3 = r3.nextUrl.clone(), o3 = rb(r3.headers);
            function s3(e13, t12) {
              var n4;
              return e13.pathname = th(e13.pathname), r3.nextUrl.basePath && ((e13 = new URL(e13)).pathname = (n4 = e13.pathname, th(r3.nextUrl.basePath + n4))), `<${e13.toString()}>; rel="alternate"; hreflang="${t12}"`;
            }
            function l3(r4, i4) {
              return t11 && "object" == typeof t11 ? rh(r4, t11[n3] ?? e12, t11[i4] ?? e12) : r4;
            }
            o3 && (a3.port = "", a3.host = o3), a3.protocol = r3.headers.get("x-forwarded-proto") ?? a3.protocol, a3.pathname = rm(a3.pathname, i3.locales, i3.localePrefix);
            let u3 = r_(i3.locales, i3.localePrefix, false).flatMap(([e13, r4]) => {
              let n4;
              function o4(e14) {
                return "/" === e14 ? r4 : r4 + e14;
              }
              if (i3.domains) return i3.domains.filter((t12) => rw(e13, t12)).map((t12) => ((n4 = new URL(a3)).port = "", n4.host = t12.domain, n4.pathname = l3(a3.pathname, e13), e13 === t12.defaultLocale && "always" !== i3.localePrefix.mode || (n4.pathname = o4(n4.pathname)), s3(n4, e13)));
              {
                let r5;
                r5 = t11 && "object" == typeof t11 ? l3(a3.pathname, e13) : a3.pathname, e13 === i3.defaultLocale && "always" !== i3.localePrefix.mode || (r5 = o4(r5)), n4 = new URL(r5, a3);
              }
              return s3(n4, e13);
            });
            if (!i3.domains || 0 === i3.domains.length) {
              let e13 = l3(a3.pathname, i3.defaultLocale);
              if (e13) {
                let t12 = new URL(e13, a3);
                u3.push(s3(t12, "x-default"));
              }
            }
            return u3.join(", ");
          }({ routing: t10, internalTemplateName: y2, localizedPathnames: null != y2 && w2 ? w2[y2] : void 0, request: e11, resolvedLocale: s2 })), _2;
        };
      }(ru);
      async function rj(e10) {
        let { pathname: t10 } = e10.nextUrl;
        if (t10.startsWith("/api/") || t10.startsWith("/_next/") || t10.includes(".") || "/favicon.ico" === t10) return V.next();
        try {
          return rD(e10);
        } catch (e11) {
          return console.error("Middleware error:", e11), V.next();
        }
      }
      let rq = { matcher: ["/((?!api|_next|favicon.ico|ads.txt|robots.txt|sitemap.xml|.*\\..*).*)"] };
      r(229);
      let r$ = { ...a }, rU = r$.middleware || r$.default, rB = "/src/middleware";
      if ("function" != typeof rU) throw Object.defineProperty(Error(`The Middleware "${rB}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function rG(e10) {
        return tt({ ...e10, page: rB, handler: async (...e11) => {
          try {
            return await rU(...e11);
          } catch (i2) {
            let t10 = e11[0], r2 = new URL(t10.url), n2 = r2.pathname + r2.search;
            throw await u(i2, { path: n2, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), i2;
          }
        } });
      }
    }, 443: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return o;
      }, withRequest: function() {
        return a;
      } });
      let n = new (r(521)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function a(e2, t2, r2) {
        let a2 = i(e2, t2);
        return a2 ? n.run(a2, r2) : r2();
      }
      function o(e2, t2) {
        let r2 = n.getStore();
        return r2 || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 446: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, a2) {
          !function(o2, s) {
            "use strict";
            var l = "function", u = "undefined", c = "object", d = "string", p = "major", f = "model", g = "name", h = "type", m = "vendor", _ = "version", y = "architecture", v = "console", b = "mobile", w = "tablet", S = "smarttv", C = "wearable", T = "embedded", E = "Amazon", R = "Apple", x = "ASUS", O = "BlackBerry", P = "Browser", k = "Chrome", N = "Firefox", A = "Google", L = "Huawei", I = "Microsoft", M = "Motorola", D = "Opera", j = "Samsung", q = "Sharp", $ = "Sony", U = "Xiaomi", B = "Zebra", G = "Facebook", z = "Chromium OS", V = "Mac OS", H = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, F = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, W = function(e2, t2) {
              return typeof e2 === d && -1 !== K(t2).indexOf(K(e2));
            }, K = function(e2) {
              return e2.toLowerCase();
            }, X = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === u ? e2 : e2.substring(0, 350);
            }, J = function(e2, t2) {
              for (var r2, n2, i3, a3, o3, u2, d2 = 0; d2 < t2.length && !o3; ) {
                var p2 = t2[d2], f2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < p2.length && !o3 && p2[r2]; ) if (o3 = p2[r2++].exec(e2)) for (i3 = 0; i3 < f2.length; i3++) u2 = o3[++n2], typeof (a3 = f2[i3]) === c && a3.length > 0 ? 2 === a3.length ? typeof a3[1] == l ? this[a3[0]] = a3[1].call(this, u2) : this[a3[0]] = a3[1] : 3 === a3.length ? typeof a3[1] !== l || a3[1].exec && a3[1].test ? this[a3[0]] = u2 ? u2.replace(a3[1], a3[2]) : void 0 : this[a3[0]] = u2 ? a3[1].call(this, u2, a3[2]) : void 0 : 4 === a3.length && (this[a3[0]] = u2 ? a3[3].call(this, u2.replace(a3[1], a3[2])) : s) : this[a3] = u2 || s;
                d2 += 2;
              }
            }, Z = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === c && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (W(t2[r2][n2], e2)) return "?" === r2 ? s : r2;
              } else if (W(t2[r2], e2)) return "?" === r2 ? s : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [_, [g, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [_, [g, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [g, _], [/opios[\/ ]+([\w\.]+)/i], [_, [g, D + " Mini"]], [/\bopr\/([\w\.]+)/i], [_, [g, D]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [g, _], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [_, [g, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [_, [g, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [_, [g, "WeChat"]], [/konqueror\/([\w\.]+)/i], [_, [g, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [_, [g, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [_, [g, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[g, /(.+)/, "$1 Secure " + P], _], [/\bfocus\/([\w\.]+)/i], [_, [g, N + " Focus"]], [/\bopt\/([\w\.]+)/i], [_, [g, D + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [_, [g, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [_, [g, "Dolphin"]], [/coast\/([\w\.]+)/i], [_, [g, D + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [_, [g, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [_, [g, N]], [/\bqihu|(qi?ho?o?|360)browser/i], [[g, "360 " + P]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[g, /(.+)/, "$1 " + P], _], [/(comodo_dragon)\/([\w\.]+)/i], [[g, /_/g, " "], _], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [g, _], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [g], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[g, G], _], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [g, _], [/\bgsa\/([\w\.]+) .*safari\//i], [_, [g, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [_, [g, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [_, [g, k + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[g, k + " WebView"], _], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [_, [g, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [g, _], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [_, [g, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [_, g], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [g, [_, Z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [g, _], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[g, "Netscape"], _], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [_, [g, N + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [g, _], [/(cobalt)\/([\w\.]+)/i], [g, [_, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, K]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", K]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, K]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [f, [m, j], [h, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [f, [m, j], [h, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [f, [m, R], [h, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [f, [m, R], [h, w]], [/(macintosh);/i], [f, [m, R]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [f, [m, q], [h, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [f, [m, L], [h, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [f, [m, L], [h, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[f, /_/g, " "], [m, U], [h, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[f, /_/g, " "], [m, U], [h, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [f, [m, "OPPO"], [h, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [f, [m, "Vivo"], [h, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [f, [m, "Realme"], [h, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [f, [m, M], [h, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [f, [m, M], [h, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [f, [m, "LG"], [h, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [f, [m, "LG"], [h, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [f, [m, "Lenovo"], [h, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[f, /_/g, " "], [m, "Nokia"], [h, b]], [/(pixel c)\b/i], [f, [m, A], [h, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [f, [m, A], [h, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [f, [m, $], [h, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[f, "Xperia Tablet"], [m, $], [h, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [f, [m, "OnePlus"], [h, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [f, [m, E], [h, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[f, /(.+)/g, "Fire Phone $1"], [m, E], [h, b]], [/(playbook);[-\w\),; ]+(rim)/i], [f, m, [h, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [f, [m, O], [h, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [f, [m, x], [h, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [f, [m, x], [h, b]], [/(nexus 9)/i], [f, [m, "HTC"], [h, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [f, /_/g, " "], [h, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [f, [m, "Acer"], [h, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [f, [m, "Meizu"], [h, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, f, [h, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, f, [h, w]], [/(surface duo)/i], [f, [m, I], [h, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [f, [m, "Fairphone"], [h, b]], [/(u304aa)/i], [f, [m, "AT&T"], [h, b]], [/\bsie-(\w*)/i], [f, [m, "Siemens"], [h, b]], [/\b(rct\w+) b/i], [f, [m, "RCA"], [h, w]], [/\b(venue[\d ]{2,7}) b/i], [f, [m, "Dell"], [h, w]], [/\b(q(?:mv|ta)\w+) b/i], [f, [m, "Verizon"], [h, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [f, [m, "Barnes & Noble"], [h, w]], [/\b(tm\d{3}\w+) b/i], [f, [m, "NuVision"], [h, w]], [/\b(k88) b/i], [f, [m, "ZTE"], [h, w]], [/\b(nx\d{3}j) b/i], [f, [m, "ZTE"], [h, b]], [/\b(gen\d{3}) b.+49h/i], [f, [m, "Swiss"], [h, b]], [/\b(zur\d{3}) b/i], [f, [m, "Swiss"], [h, w]], [/\b((zeki)?tb.*\b) b/i], [f, [m, "Zeki"], [h, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], f, [h, w]], [/\b(ns-?\w{0,9}) b/i], [f, [m, "Insignia"], [h, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [f, [m, "NextBook"], [h, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], f, [h, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], f, [h, b]], [/\b(ph-1) /i], [f, [m, "Essential"], [h, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [f, [m, "Envizen"], [h, w]], [/\b(trio[-\w\. ]+) b/i], [f, [m, "MachSpeed"], [h, w]], [/\btu_(1491) b/i], [f, [m, "Rotor"], [h, w]], [/(shield[\w ]+) b/i], [f, [m, "Nvidia"], [h, w]], [/(sprint) (\w+)/i], [m, f, [h, b]], [/(kin\.[onetw]{3})/i], [[f, /\./g, " "], [m, I], [h, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [f, [m, B], [h, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [f, [m, B], [h, b]], [/smart-tv.+(samsung)/i], [m, [h, S]], [/hbbtv.+maple;(\d+)/i], [[f, /^/, "SmartTV"], [m, j], [h, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [h, S]], [/(apple) ?tv/i], [m, [f, R + " TV"], [h, S]], [/crkey/i], [[f, k + "cast"], [m, A], [h, S]], [/droid.+aft(\w)( bui|\))/i], [f, [m, E], [h, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [f, [m, q], [h, S]], [/(bravia[\w ]+)( bui|\))/i], [f, [m, $], [h, S]], [/(mitv-\w{5}) bui/i], [f, [m, U], [h, S]], [/Hbbtv.*(technisat) (.*);/i], [m, f, [h, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, X], [f, X], [h, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, f, [h, v]], [/droid.+; (shield) bui/i], [f, [m, "Nvidia"], [h, v]], [/(playstation [345portablevi]+)/i], [f, [m, $], [h, v]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [f, [m, I], [h, v]], [/((pebble))app/i], [m, f, [h, C]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [f, [m, R], [h, C]], [/droid.+; (glass) \d/i], [f, [m, A], [h, C]], [/droid.+; (wt63?0{2,3})\)/i], [f, [m, B], [h, C]], [/(quest( 2| pro)?)/i], [f, [m, G], [h, C]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [h, T]], [/(aeobc)\b/i], [f, [m, E], [h, T]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [f, [h, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [f, [h, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, b]], [/(android[-\w\. ]{0,9});.+buil/i], [f, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [_, [g, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [_, [g, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [g, _], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [_, g]], os: [[/microsoft (windows) (vista|xp)/i], [g, _], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [g, [_, Z, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[g, "Windows"], [_, Z, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[_, /_/g, "."], [g, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[g, V], [_, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [_, g], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [g, _], [/\(bb(10);/i], [_, [g, O]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [_, [g, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [_, [g, N + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [_, [g, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [_, [g, "watchOS"]], [/crkey\/([\d\.]+)/i], [_, [g, k + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[g, z], _], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [g, _], [/(sunos) ?([\w\.\d]*)/i], [[g, "Solaris"], _], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [g, _]] }, ee = function(e2, t2) {
              if (typeof e2 === c && (t2 = e2, e2 = s), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof o2 !== u && o2.navigator ? o2.navigator : s, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : s, a3 = t2 ? H(Q, t2) : Q, v2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[g] = s, t3[_] = s, J.call(t3, n2, a3.browser), t3[p] = typeof (e3 = t3[_]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : s, v2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[g] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = s, J.call(e3, n2, a3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = s, e3[f] = s, e3[h] = s, J.call(e3, n2, a3.device), v2 && !e3[h] && i3 && i3.mobile && (e3[h] = b), v2 && "Macintosh" == e3[f] && r2 && typeof r2.standalone !== u && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[f] = "iPad", e3[h] = w), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[g] = s, e3[_] = s, J.call(e3, n2, a3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[g] = s, e3[_] = s, J.call(e3, n2, a3.os), v2 && !e3[g] && i3 && "Unknown" != i3.platform && (e3[g] = i3.platform.replace(/chrome os/i, z).replace(/macos/i, V)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? X(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = F([g, _, p]), ee.CPU = F([y]), ee.DEVICE = F([f, m, h, v, b, S, w, C, T]), ee.ENGINE = ee.OS = F([g, _]), typeof a2 !== u ? (i2.exports && (a2 = i2.exports = ee), a2.UAParser = ee) : r.amdO ? void 0 === (n = function() {
              return ee;
            }.call(t, r, t, e)) || (e.exports = n) : typeof o2 !== u && (o2.UAParser = ee);
            var et = typeof o2 !== u && (o2.jQuery || o2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, a = {};
        function o(e2) {
          var t2 = a[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = a[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, o), n2 = false;
          } finally {
            n2 && delete a[e2];
          }
          return r2.exports;
        }
        o.ab = "//", e.exports = o(226);
      })();
    }, 486: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => i, h: () => a });
      let n = "DYNAMIC_SERVER_USAGE";
      class i extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = n;
        }
      }
      function a(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === n;
      }
    }, 501: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"In\xEDcio","about":"Sobre","pricing":"Pre\xE7os","blog":"Blog","docs":"Documenta\xE7\xE3o","sitemap":"Mapa do site"},"pricing":{"header":"Pre\xE7os","title":"Pre\xE7os simples e transparentes","description":"Escolha o plano que funciona para voc\xEA\\nTodos os planos incluem acesso \xE0 nossa plataforma, ferramentas de gera\xE7\xE3o de leads e suporte dedicado."},"common":{"welcome":"Bem-vindo","language":"Idioma","switchLanguage":"Mudar idioma","signIn":"Entrar","signUp":"Cadastrar","signOut":"Sair","scrollToTop":"Voltar ao topo","share":{"button":"Compartilhar","title":"Compartilhar em","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"E-mail","copyLink":"Copiar Link","copySuccess":"Link copiado para a \xE1rea de transfer\xEAncia","copyFailed":"Falha ao copiar"},"comingSoon":{"title":"Em breve","description":"Este recurso est\xE1 em desenvolvimento, fique ligado.","action":"Voltar ao in\xEDcio"}},"blog":{"title":"Blog","description":"Explore os \xFAltimos artigos t\xE9cnicos, tutoriais e perspectivas","backToBlog":"Voltar ao blog","readArticle":"Ler artigo","readMore":"Ler mais","readingTime":"min de leitura","min":"min","noArticles":"Sem artigos","noArticlesDescription":"Ainda n\xE3o foram publicados artigos, volte mais tarde.","articlesCount":"artigos","categories":"Categorias","tags":"Tags","recentPosts":"Artigos recentes","relatedArticles":"Artigos relacionados","shareArticle":"Compartilhar artigo","featured":"Em destaque","tableOfContents":"\xCDndice","hotTags":"Tags populares","quickNavigation":"Navega\xE7\xE3o r\xE1pida","viewAllCategories":"Ver todas as categorias","viewAllTags":"Ver todas as tags","allCategories":"Todas as categorias","allTags":"Todas as tags","category":{"title":"Categoria","allCategories":"Todas as categorias","allCategoriesDescription":"Explore conte\xFAdo interessante sobre diferentes t\xF3picos, {count} categorias no total","noCategoriesTitle":"Sem categorias","noCategoriesDescription":"Ainda n\xE3o existem categorias, elas ser\xE3o criadas automaticamente quando artigos forem publicados.","articlesInCategory":"{count} artigos encontrados","hotCategories":"Categorias populares","categoryOverview":"Vis\xE3o geral das categorias","categoryCloud":"Nuvem de categorias"},"tag":{"title":"Tag","allTags":"Todas as tags","allTagsDescription":"Descubra t\xF3picos de interesse, {count} tags no total","tagCloud":"Nuvem de tags","noTagsTitle":"Sem tags","noTagsDescription":"Ainda n\xE3o existem tags, elas ser\xE3o criadas automaticamente quando artigos forem publicados.","articlesWithTag":"{count} artigos encontrados"},"pagination":{"previous":"Anterior","next":"Pr\xF3ximo","navigation":"Navega\xE7\xE3o de pagina\xE7\xE3o","pageInfo":"P\xE1gina {current} de {total}","pageX":"P\xE1gina {page}"},"noResults":{"category":"Ainda n\xE3o h\xE1 artigos nesta categoria.","tag":"Ainda n\xE3o h\xE1 artigos com esta tag."}},"footer":{"allRightsReserved":"Todos os direitos reservados.","featured":"Destaque","resources":"Recursos","legal":"Legal","about":"Sobre","privacy":"Pol\xEDtica de privacidade","terms":"Termos de servi\xE7o","sitemap":"Mapa do site"},"meta":{"global":{"title":"Next Maker | A plataforma de pr\xF3xima gera\xE7\xE3o para construir ferramentas online.","description":"Construa o futuro das ferramentas online com uma plataforma de pr\xF3xima gera\xE7\xE3o.","keywords":""},"about":{"title":"Sobre n\xF3s","description":"Saiba como estamos comprometidos em fornecer servi\xE7os online de alta qualidade aos usu\xE1rios e conhe\xE7a o hist\xF3rico da nossa equipe e a miss\xE3o da empresa."},"pricing":{"title":"Pre\xE7os - Escolha o plano que funciona para voc\xEA","description":"Confira nossos planos de pre\xE7os, desde pacotes gratuitos de n\xEDvel b\xE1sico at\xE9 solu\xE7\xF5es empresariais completas que atendem a todas as suas necessidades de ferramentas online."},"terms":{"title":"Termos de servi\xE7o","description":"Saiba mais sobre os termos legais, condi\xE7\xF5es, direitos e responsabilidades de usar nosso site e servi\xE7os. Por favor, leia atentamente antes de usar nossas ferramentas online."},"privacy":{"title":"Pol\xEDtica de privacidade","description":"Saiba como coletamos, usamos e protegemos suas informa\xE7\xF5es pessoais. Nossa pol\xEDtica de privacidade detalha como processamos e protegemos os dados dos usu\xE1rios."},"docs":{"title":"Documenta\xE7\xE3o - Guias de uso e instru\xE7\xF5es detalhadas","description":"Obtenha documenta\xE7\xE3o detalhada e guias para ajud\xE1-lo a aproveitar ao m\xE1ximo nossas ferramentas online."},"blog":{"title":"Blog","description":"Explore os \xFAltimos artigos t\xE9cnicos, tutoriais e insights"}},"docs":{"translations":{"search":"Buscar","searchNoResult":"Nenhum resultado encontrado","toc":"\xCDndice","tocNoHeadings":"Nenhum t\xEDtulo encontrado","lastUpdate":"\xDAltima atualiza\xE7\xE3o","chooseLanguage":"Escolher idioma","nextPage":"Pr\xF3xima p\xE1gina","previousPage":"P\xE1gina anterior","chooseTheme":"Escolher tema","editOnGithub":"Editar no Github"}}}');
    }, 513: (e, t, r) => {
      "use strict";
      var n = r(225);
      function i() {
      }
      var a = { d: { f: i, r: function() {
        throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
      }, D: i, C: i, L: i, m: i, X: i, S: i, M: i }, p: 0, findDOMNode: null };
      if (!n.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      function o(e2, t2) {
        return "font" === e2 ? "" : "string" == typeof t2 ? "use-credentials" === t2 ? t2 : "" : void 0;
      }
      t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, t.preconnect = function(e2, t2) {
        "string" == typeof e2 && (t2 = t2 ? "string" == typeof (t2 = t2.crossOrigin) ? "use-credentials" === t2 ? t2 : "" : void 0 : null, a.d.C(e2, t2));
      }, t.prefetchDNS = function(e2) {
        "string" == typeof e2 && a.d.D(e2);
      }, t.preinit = function(e2, t2) {
        if ("string" == typeof e2 && t2 && "string" == typeof t2.as) {
          var r2 = t2.as, n2 = o(r2, t2.crossOrigin), i2 = "string" == typeof t2.integrity ? t2.integrity : void 0, s = "string" == typeof t2.fetchPriority ? t2.fetchPriority : void 0;
          "style" === r2 ? a.d.S(e2, "string" == typeof t2.precedence ? t2.precedence : void 0, { crossOrigin: n2, integrity: i2, fetchPriority: s }) : "script" === r2 && a.d.X(e2, { crossOrigin: n2, integrity: i2, fetchPriority: s, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0 });
        }
      }, t.preinitModule = function(e2, t2) {
        if ("string" == typeof e2) if ("object" == typeof t2 && null !== t2) {
          if (null == t2.as || "script" === t2.as) {
            var r2 = o(t2.as, t2.crossOrigin);
            a.d.M(e2, { crossOrigin: r2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0 });
          }
        } else null == t2 && a.d.M(e2);
      }, t.preload = function(e2, t2) {
        if ("string" == typeof e2 && "object" == typeof t2 && null !== t2 && "string" == typeof t2.as) {
          var r2 = t2.as, n2 = o(r2, t2.crossOrigin);
          a.d.L(e2, r2, { crossOrigin: n2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0, type: "string" == typeof t2.type ? t2.type : void 0, fetchPriority: "string" == typeof t2.fetchPriority ? t2.fetchPriority : void 0, referrerPolicy: "string" == typeof t2.referrerPolicy ? t2.referrerPolicy : void 0, imageSrcSet: "string" == typeof t2.imageSrcSet ? t2.imageSrcSet : void 0, imageSizes: "string" == typeof t2.imageSizes ? t2.imageSizes : void 0, media: "string" == typeof t2.media ? t2.media : void 0 });
        }
      }, t.preloadModule = function(e2, t2) {
        if ("string" == typeof e2) if (t2) {
          var r2 = o(t2.as, t2.crossOrigin);
          a.d.m(e2, { as: "string" == typeof t2.as && "script" !== t2.as ? t2.as : void 0, crossOrigin: r2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0 });
        } else a.d.m(e2);
      }, t.version = "19.2.0-canary-3fbfb9ba-20250409";
    }, 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 528: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function n2() {
          }
          function i2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function a(e3, t3, n3, a2, o2) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s2 = new i2(n3, a2 || e3, o2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], s2] : e3._events[l].push(s2) : (e3._events[l] = s2, e3._eventsCount++), e3;
          }
          function o(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new n2() : delete e3._events[t3];
          }
          function s() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r2 = false)), s.prototype.eventNames = function() {
            var e3, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e3 = this._events) t2.call(e3, n3) && i3.push(r2 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
          }, s.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a2 = n3.length, o2 = Array(a2); i3 < a2; i3++) o2[i3] = n3[i3].fn;
            return o2;
          }, s.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s.prototype.emit = function(e3, t3, n3, i3, a2, o2) {
            var s2 = r2 ? r2 + e3 : e3;
            if (!this._events[s2]) return false;
            var l, u, c = this._events[s2], d = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e3, c.fn, void 0, true), d) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, n3), true;
                case 4:
                  return c.fn.call(c.context, t3, n3, i3), true;
                case 5:
                  return c.fn.call(c.context, t3, n3, i3, a2), true;
                case 6:
                  return c.fn.call(c.context, t3, n3, i3, a2, o2), true;
              }
              for (u = 1, l = Array(d - 1); u < d; u++) l[u - 1] = arguments[u];
              c.fn.apply(c.context, l);
            } else {
              var p, f = c.length;
              for (u = 0; u < f; u++) switch (c[u].once && this.removeListener(e3, c[u].fn, void 0, true), d) {
                case 1:
                  c[u].fn.call(c[u].context);
                  break;
                case 2:
                  c[u].fn.call(c[u].context, t3);
                  break;
                case 3:
                  c[u].fn.call(c[u].context, t3, n3);
                  break;
                case 4:
                  c[u].fn.call(c[u].context, t3, n3, i3);
                  break;
                default:
                  if (!l) for (p = 1, l = Array(d - 1); p < d; p++) l[p - 1] = arguments[p];
                  c[u].fn.apply(c[u].context, l);
              }
            }
            return true;
          }, s.prototype.on = function(e3, t3, r3) {
            return a(this, e3, t3, r3, false);
          }, s.prototype.once = function(e3, t3, r3) {
            return a(this, e3, t3, r3, true);
          }, s.prototype.removeListener = function(e3, t3, n3, i3) {
            var a2 = r2 ? r2 + e3 : e3;
            if (!this._events[a2]) return this;
            if (!t3) return o(this, a2), this;
            var s2 = this._events[a2];
            if (s2.fn) s2.fn !== t3 || i3 && !s2.once || n3 && s2.context !== n3 || o(this, a2);
            else {
              for (var l = 0, u = [], c = s2.length; l < c; l++) (s2[l].fn !== t3 || i3 && !s2[l].once || n3 && s2[l].context !== n3) && u.push(s2[l]);
              u.length ? this._events[a2] = 1 === u.length ? u[0] : u : o(this, a2);
            }
            return this;
          }, s.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && o(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = r2, s.EventEmitter = s, e2.exports = s;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let n2 = 0, i2 = e3.length;
            for (; i2 > 0; ) {
              let a = i2 / 2 | 0, o = n2 + a;
              0 >= r2(e3[o], t3) ? (n2 = ++o, i2 -= a + 1) : i2 = a;
            }
            return n2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r2(574);
          class i2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r3);
              let i3 = n2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(i3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = i2;
        }, 816: (e2, t2, r2) => {
          let n2 = r2(213);
          class i2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let a = (e3, t3, r3) => new Promise((a2, o) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a2(e3);
            let s = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  a2(r3());
                } catch (e4) {
                  o(e4);
                }
                return;
              }
              let n3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, s2 = r3 instanceof Error ? r3 : new i2(n3);
              "function" == typeof e3.cancel && e3.cancel(), o(s2);
            }, t3);
            n2(e3.then(a2, o), () => {
              clearTimeout(s);
            });
          });
          e2.exports = a, e2.exports.default = a, e2.exports.TimeoutError = i2;
        } }, r = {};
        function n(e2) {
          var i2 = r[e2];
          if (void 0 !== i2) return i2.exports;
          var a = r[e2] = { exports: {} }, o = true;
          try {
            t[e2](a, a.exports, n), o = false;
          } finally {
            o && delete r[e2];
          }
          return a.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true });
          let e2 = n(993), t2 = n(816), r2 = n(821), a = () => {
          }, o = new t2.TimeoutError();
          class s extends e2 {
            constructor(e3) {
              var t3, n2, i2, o2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = a, this._resolveIdle = a, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (n2 = null == (t3 = e3.intervalCap) ? void 0 : t3.toString()) ? n2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = a, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = a, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((n2, i2) => {
                let a2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let a3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && i2(o);
                    });
                    n2(await a3);
                  } catch (e4) {
                    i2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(a2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          i.default = s;
        })(), e.exports = i;
      })();
    }, 535: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"\u9996\u9875","about":"\u5173\u4E8E","pricing":"\u5B9A\u4EF7","blog":"\u535A\u5BA2","docs":"\u6587\u6863","sitemap":"\u7F51\u7AD9\u5730\u56FE"},"pricing":{"header":"\u5B9A\u4EF7","title":"\u7B80\u5355\u900F\u660E\u7684\u5B9A\u4EF7","description":"\u9009\u62E9\u9002\u5408\u60A8\u7684\u65B9\u6848\\n\u6240\u6709\u65B9\u6848\u5305\u62EC\u5BF9\u6211\u4EEC\u7684\u5E73\u53F0\u3001\u6F5C\u5728\u5BA2\u6237\u751F\u6210\u5DE5\u5177\u548C\u4E13\u7528\u7684\u652F\u6301\u3002"},"common":{"welcome":"\u6B22\u8FCE","language":"\u8BED\u8A00","switchLanguage":"\u5207\u6362\u8BED\u8A00","signIn":"\u767B\u5F55","signUp":"\u6CE8\u518C","signOut":"\u9000\u51FA","scrollToTop":"\u56DE\u5230\u9876\u90E8","share":{"button":"\u5206\u4EAB","title":"\u5206\u4EAB\u5230","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"\u90AE\u4EF6","copyLink":"\u590D\u5236\u94FE\u63A5","copySuccess":"\u94FE\u63A5\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","copyFailed":"\u590D\u5236\u5931\u8D25"},"comingSoon":{"title":"\u656C\u8BF7\u671F\u5F85","description":"\u8FD9\u4E2A\u529F\u80FD\u6B63\u5728\u5F00\u53D1\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85","action":"\u8FD4\u56DE\u9996\u9875"}},"blog":{"title":"\u535A\u5BA2","description":"\u63A2\u7D22\u6700\u65B0\u7684\u6280\u672F\u6587\u7AE0\u3001\u6559\u7A0B\u548C\u89C1\u89E3","backToBlog":"\u8FD4\u56DE\u535A\u5BA2","readArticle":"\u9605\u8BFB\u6587\u7AE0","readMore":"\u9605\u8BFB\u66F4\u591A","readingTime":"\u5206\u949F\u9605\u8BFB","min":"\u5206\u949F","noArticles":"\u6682\u65E0\u6587\u7AE0","noArticlesDescription":"\u8FD8\u6CA1\u6709\u53D1\u5E03\u4EFB\u4F55\u6587\u7AE0\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u67E5\u770B\u3002","articlesCount":"\u7BC7\u6587\u7AE0","categories":"\u5206\u7C7B","tags":"\u6807\u7B7E","recentPosts":"\u6700\u8FD1\u6587\u7AE0","relatedArticles":"\u76F8\u5173\u6587\u7AE0","shareArticle":"\u5206\u4EAB\u6587\u7AE0","featured":"\u7CBE\u9009","tableOfContents":"\u76EE\u5F55","hotTags":"\u70ED\u95E8\u6807\u7B7E","quickNavigation":"\u5FEB\u6377\u5BFC\u822A","viewAllCategories":"\u67E5\u770B\u5168\u90E8\u5206\u7C7B","viewAllTags":"\u67E5\u770B\u6240\u6709\u6807\u7B7E","allCategories":"\u6240\u6709\u5206\u7C7B","allTags":"\u6240\u6709\u6807\u7B7E","category":{"title":"\u5206\u7C7B","allCategories":"\u6240\u6709\u5206\u7C7B","allCategoriesDescription":"\u63A2\u7D22\u4E0D\u540C\u4E3B\u9898\u7684\u7CBE\u5F69\u5185\u5BB9\uFF0C\u5171 {count} \u4E2A\u5206\u7C7B","noCategoriesTitle":"\u6682\u65E0\u5206\u7C7B","noCategoriesDescription":"\u8FD8\u6CA1\u6709\u4EFB\u4F55\u5206\u7C7B\uFF0C\u53D1\u5E03\u6587\u7AE0\u540E\u4F1A\u81EA\u52A8\u521B\u5EFA\u5206\u7C7B\u3002","articlesInCategory":"\u5171\u627E\u5230 {count} \u7BC7\u6587\u7AE0","hotCategories":"\u70ED\u95E8\u5206\u7C7B","categoryOverview":"\u5206\u7C7B\u6982\u89C8","categoryCloud":"\u5206\u7C7B\u4E91"},"tag":{"title":"\u6807\u7B7E","allTags":"\u6240\u6709\u6807\u7B7E","allTagsDescription":"\u53D1\u73B0\u611F\u5174\u8DA3\u7684\u4E3B\u9898\uFF0C\u5171 {count} \u4E2A\u6807\u7B7E","tagCloud":"\u6807\u7B7E\u4E91","noTagsTitle":"\u6682\u65E0\u6807\u7B7E","noTagsDescription":"\u8FD8\u6CA1\u6709\u4EFB\u4F55\u6807\u7B7E\uFF0C\u53D1\u5E03\u6587\u7AE0\u540E\u4F1A\u81EA\u52A8\u521B\u5EFA\u6807\u7B7E\u3002","articlesWithTag":"\u5171\u627E\u5230 {count} \u7BC7\u6587\u7AE0"},"pagination":{"previous":"\u4E0A\u4E00\u9875","next":"\u4E0B\u4E00\u9875","navigation":"\u5206\u9875\u5BFC\u822A","pageInfo":"\u7B2C {current} \u9875\uFF0C\u5171 {total} \u9875","pageX":"\u7B2C{page}\u9875"},"noResults":{"category":"\u8FD9\u4E2A\u5206\u7C7B\u4E0B\u8FD8\u6CA1\u6709\u4EFB\u4F55\u6587\u7AE0\u3002","tag":"\u8FD9\u4E2A\u6807\u7B7E\u4E0B\u8FD8\u6CA1\u6709\u4EFB\u4F55\u6587\u7AE0\u3002"}},"footer":{"allRightsReserved":"\u7248\u6743\u6240\u6709\u3002","featured":"\u7CBE\u9009","resources":"\u8D44\u6E90","legal":"\u6CD5\u5F8B","about":"\u5173\u4E8E","privacy":"\u9690\u79C1\u653F\u7B56","terms":"\u670D\u52A1\u6761\u6B3E","sitemap":"\u7AD9\u70B9\u5730\u56FE"},"meta":{"global":{"title":"Next Maker | \u4E0B\u4E00\u4EE3\u6784\u5EFA\u5728\u7EBF\u5DE5\u5177\u7684\u6846\u67B6","description":"\u4E0B\u4E00\u4EE3\u6784\u5EFA\u672A\u6765\u5728\u7EBF\u5DE5\u5177\u7684\u6846\u67B6\u3002","keywords":"Next Maker, \u5728\u7EBF\u5DE5\u5177, \u6846\u67B6, \u6784\u5EFA, \u5F00\u53D1, \u5DE5\u5177"},"about":{"title":"\u5173\u4E8E\u6211\u4EEC","description":"\u4E86\u89E3\u6211\u4EEC\u5982\u4F55\u81F4\u529B\u4E8E\u4E3A\u7528\u6237\u63D0\u4F9B\u9AD8\u8D28\u91CF\u7684\u5728\u7EBF\u670D\u52A1\uFF0C\u5E76\u63A2\u7D22\u6211\u4EEC\u7684\u56E2\u961F\u80CC\u666F\u548C\u516C\u53F8\u4F7F\u547D\u3002"},"pricing":{"title":"\u5B9A\u4EF7 - \u9009\u62E9\u6700\u9002\u5408\u60A8\u9700\u6C42\u7684\u65B9\u6848","description":"\u67E5\u770B\u6211\u4EEC\u7684\u5B9A\u4EF7\u65B9\u6848\uFF0C\u4ECE\u514D\u8D39\u7684\u5165\u95E8\u5957\u9910\u5230\u5168\u529F\u80FD\u7684\u4F01\u4E1A\u89E3\u51B3\u65B9\u6848\uFF0C\u6EE1\u8DB3\u60A8\u6240\u6709\u7684\u5728\u7EBF\u5DE5\u5177\u9700\u6C42\u3002"},"terms":{"title":"\u670D\u52A1\u6761\u6B3E","description":"\u4E86\u89E3\u4F7F\u7528\u6211\u4EEC\u7F51\u7AD9\u548C\u670D\u52A1\u7684\u6CD5\u5F8B\u6761\u6B3E\u3001\u6761\u4EF6\u3001\u6743\u5229\u548C\u8D23\u4EFB\u3002\u5728\u4F7F\u7528\u6211\u4EEC\u7684\u5728\u7EBF\u5DE5\u5177\u524D\u8BF7\u4ED4\u7EC6\u9605\u8BFB\u3002"},"privacy":{"title":"\u9690\u79C1\u653F\u7B56","description":"\u4E86\u89E3\u6211\u4EEC\u5982\u4F55\u6536\u96C6\u3001\u4F7F\u7528\u548C\u4FDD\u62A4\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F\u3002\u6211\u4EEC\u7684\u9690\u79C1\u653F\u7B56\u8BE6\u7EC6\u8BF4\u660E\u4E86\u6211\u4EEC\u5BF9\u7528\u6237\u6570\u636E\u7684\u5904\u7406\u65B9\u5F0F\u548C\u4FDD\u62A4\u63AA\u65BD\u3002"},"docs":{"title":"\u6587\u6863 - \u4F7F\u7528\u6307\u5357\u548C\u8BE6\u7EC6\u8BF4\u660E","description":"\u83B7\u53D6\u8BE6\u7EC6\u7684\u6587\u6863\u548C\u6307\u5357\uFF0C\u5E2E\u52A9\u60A8\u5145\u5206\u5229\u7528\u6211\u4EEC\u7684\u5728\u7EBF\u5DE5\u5177\u3002"},"blog":{"title":"\u535A\u5BA2","description":"\u63A2\u7D22\u6700\u65B0\u7684\u6280\u672F\u6587\u7AE0\u3001\u6559\u7A0B\u548C\u89C1\u89E3"}},"docs":{"translations":{"search":"\u641C\u7D22","searchNoResult":"\u6CA1\u6709\u627E\u5230\u7ED3\u679C","toc":"\u76EE\u5F55","tocNoHeadings":"\u6CA1\u6709\u627E\u5230\u76EE\u5F55","lastUpdate":"\u6700\u540E\u66F4\u65B0","chooseLanguage":"\u9009\u62E9\u8BED\u8A00","nextPage":"\u4E0B\u4E00\u9875","previousPage":"\u4E0A\u4E00\u9875","chooseTheme":"\u9009\u62E9\u4E3B\u9898","editOnGithub":"\u5728 Github \u4E0A\u7F16\u8F91"}}}');
    }, 552: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"\u0939\u094B\u092E","about":"\u0939\u092E\u093E\u0930\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902","pricing":"\u092E\u0942\u0932\u094D\u092F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923","blog":"\u092C\u094D\u0932\u0949\u0917","docs":"\u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C","sitemap":"\u0938\u093E\u0907\u091F\u092E\u0948\u092A"},"pricing":{"header":"\u092E\u0942\u0932\u094D\u092F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923","title":"\u0938\u0930\u0932, \u092A\u093E\u0930\u0926\u0930\u094D\u0936\u0940 \u092E\u0942\u0932\u094D\u092F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923","description":"\u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924 \u092F\u094B\u091C\u0928\u093E \u091A\u0941\u0928\u0947\u0902\\n\u0938\u092D\u0940 \u092F\u094B\u091C\u0928\u093E\u0913\u0902 \u092E\u0947\u0902 \u0939\u092E\u093E\u0930\u0947 \u092A\u094D\u0932\u0947\u091F\u092B\u0949\u0930\u094D\u092E, \u0932\u0940\u0921 \u091C\u0928\u0930\u0947\u0936\u0928 \u091F\u0942\u0932\u094D\u0938 \u0914\u0930 \u0938\u092E\u0930\u094D\u092A\u093F\u0924 \u0938\u0939\u093E\u092F\u0924\u093E \u0924\u0915 \u092A\u0939\u0941\u0902\u091A \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0964"},"common":{"welcome":"\u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948","language":"\u092D\u093E\u0937\u093E","switchLanguage":"\u092D\u093E\u0937\u093E \u092C\u0926\u0932\u0947\u0902","signIn":"\u0938\u093E\u0907\u0928 \u0907\u0928","signUp":"\u0938\u093E\u0907\u0928 \u0905\u092A","signOut":"\u0938\u093E\u0907\u0928 \u0906\u0909\u091F","scrollToTop":"\u0936\u0940\u0930\u094D\u0937 \u092A\u0930 \u0935\u093E\u092A\u0938 \u091C\u093E\u090F\u0902","share":{"button":"\u0938\u093E\u091D\u093E \u0915\u0930\u0947\u0902","title":"\u0938\u093E\u091D\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"\u0908\u092E\u0947\u0932","copyLink":"\u0932\u093F\u0902\u0915 \u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902","copySuccess":"\u0932\u093F\u0902\u0915 \u0915\u094D\u0932\u093F\u092A\u092C\u094B\u0930\u094D\u0921 \u092E\u0947\u0902 \u0915\u0949\u092A\u0940 \u0915\u093F\u092F\u093E \u0917\u092F\u093E","copyFailed":"\u0915\u0949\u092A\u0940 \u0915\u0930\u0928\u0947 \u092E\u0947\u0902 \u0935\u093F\u092B\u0932"},"comingSoon":{"title":"\u091C\u0932\u094D\u0926 \u0906 \u0930\u0939\u093E \u0939\u0948","description":"\u092F\u0939 \u0938\u0941\u0935\u093F\u0927\u093E \u0935\u093F\u0915\u093E\u0938 \u0915\u0947 \u0905\u0927\u0940\u0928 \u0939\u0948, \u0915\u0943\u092A\u092F\u093E \u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902","action":"\u0939\u094B\u092E \u092A\u0930 \u0935\u093E\u092A\u0938 \u091C\u093E\u090F\u0902"}},"blog":{"title":"\u092C\u094D\u0932\u0949\u0917","description":"\u0928\u0935\u0940\u0928\u0924\u092E \u0924\u0915\u0928\u0940\u0915\u0940 \u0932\u0947\u0916, \u091F\u094D\u092F\u0942\u091F\u094B\u0930\u093F\u092F\u0932 \u0914\u0930 \u0905\u0902\u0924\u0930\u094D\u0926\u0943\u0937\u094D\u091F\u093F \u0915\u093E \u0905\u0928\u094D\u0935\u0947\u0937\u0923 \u0915\u0930\u0947\u0902","backToBlog":"\u092C\u094D\u0932\u0949\u0917 \u092A\u0930 \u0935\u093E\u092A\u0938 \u091C\u093E\u090F\u0902","readArticle":"\u0932\u0947\u0916 \u092A\u0922\u093C\u0947\u0902","readMore":"\u0914\u0930 \u092A\u0922\u093C\u0947\u0902","readingTime":"\u092E\u093F\u0928\u091F \u092A\u0922\u093C\u0928\u0947 \u0915\u093E \u0938\u092E\u092F","min":"\u092E\u093F\u0928\u091F","noArticles":"\u0915\u094B\u0908 \u0932\u0947\u0916 \u0928\u0939\u0940\u0902","noArticlesDescription":"\u0905\u092D\u0940 \u0924\u0915 \u0915\u094B\u0908 \u0932\u0947\u0916 \u092A\u094D\u0930\u0915\u093E\u0936\u093F\u0924 \u0928\u0939\u0940\u0902 \u0939\u0941\u0906 \u0939\u0948, \u092C\u093E\u0926 \u092E\u0947\u0902 \u091C\u093E\u0902\u091A\u0947\u0902\u0964","articlesCount":"\u0932\u0947\u0916","categories":"\u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0902","tags":"\u091F\u0948\u0917","recentPosts":"\u0939\u093E\u0932 \u0915\u0947 \u0932\u0947\u0916","relatedArticles":"\u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u0932\u0947\u0916","shareArticle":"\u0932\u0947\u0916 \u0938\u093E\u091D\u093E \u0915\u0930\u0947\u0902","featured":"\u0935\u093F\u0936\u0947\u0937 \u0930\u0941\u092A \u0938\u0947 \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u093F\u0924","tableOfContents":"\u0935\u093F\u0937\u092F-\u0938\u0942\u091A\u0940","hotTags":"\u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F \u091F\u0948\u0917","quickNavigation":"\u0924\u094D\u0935\u0930\u093F\u0924 \u0928\u0947\u0935\u093F\u0917\u0947\u0936\u0928","viewAllCategories":"\u0938\u092D\u0940 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0902 \u0926\u0947\u0916\u0947\u0902","viewAllTags":"\u0938\u092D\u0940 \u091F\u0948\u0917 \u0926\u0947\u0916\u0947\u0902","allCategories":"\u0938\u092D\u0940 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0902","allTags":"\u0938\u092D\u0940 \u091F\u0948\u0917","category":{"title":"\u0936\u094D\u0930\u0947\u0923\u0940","allCategories":"\u0938\u092D\u0940 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0902","allCategoriesDescription":"\u0935\u093F\u092D\u093F\u0928\u094D\u0928 \u0935\u093F\u0937\u092F\u094B\u0902 \u092A\u0930 \u0930\u094B\u091A\u0915 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u093E \u0905\u0928\u094D\u0935\u0947\u0937\u0923 \u0915\u0930\u0947\u0902, \u0915\u0941\u0932 {count} \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0902","noCategoriesTitle":"\u0915\u094B\u0908 \u0936\u094D\u0930\u0947\u0923\u0940 \u0928\u0939\u0940\u0902","noCategoriesDescription":"\u0905\u092D\u0940 \u0924\u0915 \u0915\u094B\u0908 \u0936\u094D\u0930\u0947\u0923\u0940 \u092E\u094C\u091C\u0942\u0926 \u0928\u0939\u0940\u0902 \u0939\u0948, \u0935\u0947 \u0932\u0947\u0916 \u092A\u094D\u0930\u0915\u093E\u0936\u093F\u0924 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0938\u094D\u0935\u091A\u093E\u0932\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u092C\u0928\u093E\u0908 \u091C\u093E\u090F\u0902\u0917\u0940\u0964","articlesInCategory":"{count} \u0932\u0947\u0916 \u092E\u093F\u0932\u0947","hotCategories":"\u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0902","categoryOverview":"\u0936\u094D\u0930\u0947\u0923\u0940 \u0905\u0935\u0932\u094B\u0915\u0928","categoryCloud":"\u0936\u094D\u0930\u0947\u0923\u0940 \u0915\u094D\u0932\u093E\u0909\u0921"},"tag":{"title":"\u091F\u0948\u0917","allTags":"\u0938\u092D\u0940 \u091F\u0948\u0917","allTagsDescription":"\u0926\u093F\u0932\u091A\u0938\u094D\u092A \u0935\u093F\u0937\u092F\u094B\u0902 \u0915\u0940 \u0916\u094B\u091C \u0915\u0930\u0947\u0902, \u0915\u0941\u0932 {count} \u091F\u0948\u0917","tagCloud":"\u091F\u0948\u0917 \u0915\u094D\u0932\u093E\u0909\u0921","noTagsTitle":"\u0915\u094B\u0908 \u091F\u0948\u0917 \u0928\u0939\u0940\u0902","noTagsDescription":"\u0905\u092D\u0940 \u0924\u0915 \u0915\u094B\u0908 \u091F\u0948\u0917 \u092E\u094C\u091C\u0942\u0926 \u0928\u0939\u0940\u0902 \u0939\u0948, \u0935\u0947 \u0932\u0947\u0916 \u092A\u094D\u0930\u0915\u093E\u0936\u093F\u0924 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0938\u094D\u0935\u091A\u093E\u0932\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u092C\u0928\u093E\u090F \u091C\u093E\u090F\u0902\u0917\u0947\u0964","articlesWithTag":"{count} \u0932\u0947\u0916 \u092E\u093F\u0932\u0947"},"pagination":{"previous":"\u092A\u093F\u091B\u0932\u093E","next":"\u0905\u0917\u0932\u093E","navigation":"\u092A\u0947\u091C\u093F\u0928\u0947\u0936\u0928 \u0928\u0947\u0935\u093F\u0917\u0947\u0936\u0928","pageInfo":"\u092A\u0943\u0937\u094D\u0920 {current} \u0915\u093E {total}","pageX":"\u092A\u0943\u0937\u094D\u0920 {page}"},"noResults":{"category":"\u0907\u0938 \u0936\u094D\u0930\u0947\u0923\u0940 \u092E\u0947\u0902 \u0905\u092D\u0940 \u0924\u0915 \u0915\u094B\u0908 \u0932\u0947\u0916 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964","tag":"\u0907\u0938 \u091F\u0948\u0917 \u0915\u0947 \u0938\u093E\u0925 \u0905\u092D\u0940 \u0924\u0915 \u0915\u094B\u0908 \u0932\u0947\u0916 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964"}},"footer":{"allRightsReserved":"\u0938\u0930\u094D\u0935\u093E\u0927\u093F\u0915\u093E\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948\u0964","featured":"\u0935\u093F\u0936\u0947\u0937","resources":"\u0938\u0902\u0938\u093E\u0927\u0928","legal":"\u0915\u093E\u0928\u0942\u0928\u0940","about":"\u0939\u092E\u093E\u0930\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902","privacy":"\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u0940\u0924\u093F","terms":"\u0938\u0947\u0935\u093E \u0915\u0940 \u0936\u0930\u094D\u0924\u0947\u0902","sitemap":"\u0938\u093E\u0907\u091F\u092E\u0948\u092A"},"meta":{"global":{"title":"Next Maker | \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0942\u0932\u094D\u0938 \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u0917\u0932\u0940 \u092A\u0940\u0922\u093C\u0940 \u0915\u093E \u092B\u094D\u0930\u0947\u092E\u0935\u0930\u094D\u0915","description":"\u0905\u0917\u0932\u0940 \u092A\u0940\u0922\u093C\u0940 \u0915\u0947 \u092B\u094D\u0930\u0947\u092E\u0935\u0930\u094D\u0915 \u0915\u0947 \u0938\u093E\u0925 \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0942\u0932\u094D\u0938 \u0915\u093E \u092D\u0935\u093F\u0937\u094D\u092F \u092C\u0928\u093E\u090F\u0902\u0964","keywords":""},"about":{"title":"\u0939\u092E\u093E\u0930\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902","description":"\u091C\u093E\u0928\u0947\u0902 \u0915\u093F \u0939\u092E \u0909\u092A\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E\u0913\u0902 \u0915\u094B \u0909\u091A\u094D\u091A \u0917\u0941\u0923\u0935\u0924\u094D\u0924\u093E \u0935\u093E\u0932\u0940 \u0911\u0928\u0932\u093E\u0907\u0928 \u0938\u0947\u0935\u093E\u090F\u0902 \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0948\u0938\u0947 \u092A\u094D\u0930\u0924\u093F\u092C\u0926\u094D\u0927 \u0939\u0948\u0902, \u0914\u0930 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0915\u0940 \u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u093F \u0914\u0930 \u0915\u0902\u092A\u0928\u0940 \u0915\u0947 \u092E\u093F\u0936\u0928 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u091C\u093E\u0928\u0947\u0902\u0964"},"pricing":{"title":"\u092E\u0942\u0932\u094D\u092F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923 - \u0905\u092A\u0928\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E\u0913\u0902 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0938\u092C\u0938\u0947 \u0909\u092A\u092F\u0941\u0915\u094D\u0924 \u092F\u094B\u091C\u0928\u093E \u091A\u0941\u0928\u0947\u0902","description":"\u0939\u092E\u093E\u0930\u0940 \u092E\u0942\u0932\u094D\u092F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923 \u092F\u094B\u091C\u0928\u093E\u0913\u0902 \u0915\u094B \u0926\u0947\u0916\u0947\u0902, \u092E\u0941\u092B\u094D\u0924 \u092A\u094D\u0930\u093E\u0930\u0902\u092D\u093F\u0915 \u092A\u0948\u0915\u0947\u091C \u0938\u0947 \u0932\u0947\u0915\u0930 \u092A\u0942\u0930\u094D\u0923-\u0938\u0941\u0935\u093F\u0927\u093E \u0935\u093E\u0932\u0947 \u090F\u0902\u091F\u0930\u092A\u094D\u0930\u093E\u0907\u091C\u093C \u0938\u092E\u093E\u0927\u093E\u0928 \u0924\u0915, \u091C\u094B \u0906\u092A\u0915\u0940 \u0938\u092D\u0940 \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0942\u0932 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E\u0913\u0902 \u0915\u094B \u092A\u0942\u0930\u093E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964"},"terms":{"title":"\u0938\u0947\u0935\u093E \u0915\u0940 \u0936\u0930\u094D\u0924\u0947\u0902","description":"\u0939\u092E\u093E\u0930\u0940 \u0935\u0947\u092C\u0938\u093E\u0907\u091F \u0914\u0930 \u0938\u0947\u0935\u093E\u0913\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0915\u093E\u0928\u0942\u0928\u0940 \u0928\u093F\u092F\u092E\u094B\u0902, \u0936\u0930\u094D\u0924\u094B\u0902, \u0905\u0927\u093F\u0915\u093E\u0930\u094B\u0902 \u0914\u0930 \u091C\u093F\u092E\u094D\u092E\u0947\u0926\u093E\u0930\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u091C\u093E\u0928\u0947\u0902\u0964 \u0939\u092E\u093E\u0930\u0947 \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0942\u0932\u094D\u0938 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0915\u0943\u092A\u092F\u093E \u0927\u094D\u092F\u093E\u0928 \u0938\u0947 \u092A\u0922\u093C\u0947\u0902\u0964"},"privacy":{"title":"\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u0940\u0924\u093F","description":"\u091C\u093E\u0928\u0947\u0902 \u0915\u093F \u0939\u092E \u0906\u092A\u0915\u0940 \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0915\u094B \u0915\u0948\u0938\u0947 \u090F\u0915\u0924\u094D\u0930, \u0909\u092A\u092F\u094B\u0917 \u0914\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964 \u0939\u092E\u093E\u0930\u0940 \u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u0940\u0924\u093F \u092E\u0947\u0902 \u0935\u093F\u0938\u094D\u0924\u093E\u0930 \u0938\u0947 \u092C\u0924\u093E\u092F\u093E \u0917\u092F\u093E \u0939\u0948 \u0915\u093F \u0939\u092E \u0909\u092A\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E \u0921\u0947\u091F\u093E \u0915\u094B \u0915\u0948\u0938\u0947 \u0938\u0902\u0938\u093E\u0927\u093F\u0924 \u0914\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964"},"docs":{"title":"\u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C - \u0909\u092A\u092F\u094B\u0917 \u0917\u093E\u0907\u0921 \u0914\u0930 \u0935\u093F\u0938\u094D\u0924\u0943\u0924 \u0928\u093F\u0930\u094D\u0926\u0947\u0936","description":"\u0939\u092E\u093E\u0930\u0947 \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0942\u0932\u094D\u0938 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0938\u094D\u0924\u093E\u0930 \u0938\u0947 \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C \u0914\u0930 \u0928\u093F\u0930\u094D\u0926\u0947\u0936 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964"},"blog":{"title":"\u092C\u094D\u0932\u0949\u0917","description":"\u0928\u0935\u0940\u0928\u0924\u092E \u0924\u0915\u0928\u0940\u0915\u0940 \u0932\u0947\u0916, \u091F\u094D\u092F\u0942\u091F\u094B\u0930\u093F\u092F\u0932 \u0914\u0930 \u0905\u0902\u0924\u0930\u094D\u0926\u0943\u0937\u094D\u091F\u093F \u0915\u093E \u0905\u0928\u094D\u0935\u0947\u0937\u0923 \u0915\u0930\u0947\u0902"}},"docs":{"translations":{"search":"\u0916\u094B\u091C","searchNoResult":"\u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E","toc":"\u0935\u093F\u0937\u092F-\u0938\u0942\u091A\u0940","tocNoHeadings":"\u0915\u094B\u0908 \u0936\u0940\u0930\u094D\u0937\u0915 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E","lastUpdate":"\u0905\u0902\u0924\u093F\u092E \u0905\u092A\u0921\u0947\u091F","chooseLanguage":"\u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902","nextPage":"\u0905\u0917\u0932\u093E \u092A\u0943\u0937\u094D\u0920","previousPage":"\u092A\u093F\u091B\u0932\u093E \u092A\u0943\u0937\u094D\u0920","chooseTheme":"\u0925\u0940\u092E \u091A\u0941\u0928\u0947\u0902","editOnGithub":"Github \u092A\u0930 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902"}}}');
    }, 571: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return a;
      }, wrapRequestHandler: function() {
        return o;
      } });
      let n = r(443), i = r(102);
      function a() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function o(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 591: (e, t, r) => {
      "use strict";
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === i;
      }
      r.d(t, { T: () => n, W: () => s });
      let i = "HANGING_PROMISE_REJECTION";
      class a extends Error {
        constructor(e2) {
          super(`During prerendering, ${e2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${e2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = e2, this.digest = i;
        }
      }
      let o = /* @__PURE__ */ new WeakMap();
      function s(e2, t2) {
        if (e2.aborted) return Promise.reject(new a(t2));
        {
          let r2 = new Promise((r3, n2) => {
            let i2 = n2.bind(null, new a(t2)), s2 = o.get(e2);
            if (s2) s2.push(i2);
            else {
              let t3 = [i2];
              o.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return r2.catch(l), r2;
        }
      }
      function l() {
      }
    }, 614: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), i2 = r2(172), a2 = r2(930), o = "context", s = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(o, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o) || s;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o, a2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), i2 = r2(912), a2 = r2(957), o = r2(172);
          class s {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, o.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let u = (0, o.getGlobal)("diag"), c = (0, i2.createLogLevelDiagLogger)(null != (s2 = r3.logLevel) ? s2 : a2.DiagLogLevel.INFO, e4);
                if (u && !r3.suppressOverrideMessage) {
                  let e5 = null != (l = Error().stack) ? l : "<failed to generate stacktrace>";
                  u.warn(`Current logger will be overwritten from ${e5}`), c.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o.registerGlobal)("diag", c, t4, true);
              }, t4.disable = () => {
                (0, o.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
          }
          t3.DiagAPI = s;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), i2 = r2(172), a2 = r2(930), o = "metrics";
          class s {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(o, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(o, a2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = s;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), i2 = r2(874), a2 = r2(194), o = r2(277), s = r2(369), l = r2(930), u = "propagation", c = new i2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = s.createBaggage, this.getBaggage = o.getBaggage, this.getActiveBaggage = o.getActiveBaggage, this.setBaggage = o.setBaggage, this.deleteBaggage = o.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(u, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(u, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(u) || c;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), i2 = r2(846), a2 = r2(139), o = r2(607), s = r2(930), l = "trace";
          class u {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o.deleteSpan, this.getSpan = o.getSpan, this.getActiveSpan = o.getActiveSpan, this.getSpanContext = o.getSpanContext, this.setSpan = o.setSpan, this.setSpanContext = o.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, s.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, s.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = u;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = a2, t3.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), i2 = r2(993), a2 = r2(830), o = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0, t3.context = r2(491).ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class i2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0, t3.diag = r2(930).DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          }
          function a2(e3, t4, r3) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), i2 = r2(521), a2 = r2(130), o = i2.VERSION.split(".")[0], s = Symbol.for(`opentelemetry.js.api.${o}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var a3;
            let o2 = l[s] = null != (a3 = l[s]) ? a3 : { version: i2.VERSION };
            if (!n3 && o2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (o2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return o2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null == (t4 = l[s]) ? void 0 : t4.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null == (r3 = l[s]) ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[s];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function o(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return o(e4);
              let s = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s.prerelease || a3.major !== s.major) return o(e4);
              if (0 === a3.major) return a3.minor === s.minor && a3.patch <= s.patch ? (t4.add(e4), true) : o(e4);
              return a3.minor <= s.minor ? (t4.add(e4), true) : o(e4);
            };
          }
          t3._makeCompatibilityCheck = a2, t3.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0, t3.metrics = r2(653).MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = a2;
          class o extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = o;
          class s {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = s;
          class l extends s {
          }
          t3.NoopObservableCounterMetric = l;
          class u extends s {
          }
          t3.NoopObservableGaugeMetric = u;
          class c extends s {
          }
          t3.NoopObservableUpDownCounterMetric = c, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new o(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new u(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0, t3.propagation = r2(181).PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0, t3.trace = r2(997).TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class i2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), i2 = r2(607), a2 = r2(403), o = r2(139), s = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = s.active()) {
              var n3;
              if (null == t4 ? void 0 : t4.root) return new a2.NonRecordingSpan();
              let l2 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let a3, o2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (a3 = t4, l2 = r3) : (a3 = t4, o2 = r3, l2 = n3);
              let u = null != o2 ? o2 : s.active(), c = this.startSpan(e3, a3, u), d = (0, i2.setSpan)(u, c);
              return s.with(d, l2, void 0, c);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class a2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t4, r3)) ? i3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = a2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), i2 = r2(403), a2 = r2(491), o = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s(e3) {
            return e3.getValue(o) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(o, t4);
          }
          t3.getSpan = s, t3.getActiveSpan = function() {
            return s(a2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(o);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null == (t4 = s(e3)) ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r3.slice(0, i3), o = r3.slice(i3 + 1, t4.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o) && e4.set(a2, o);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o = /^[ -~]{0,255}[!-~]$/, s = /,|=/;
          t3.validateKey = function(e3) {
            return a2.test(e3);
          }, t3.validateValue = function(e3) {
            return o.test(e3) && !s.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), i2 = r2(403), a2 = /^([0-9a-f]{32})$/i, o = /^[0-9a-f]{16}$/i;
          function s(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return o.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = s, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return s(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var a2 = n[e2] = { exports: {} }, o = true;
          try {
            t2[e2].call(a2.exports, a2, a2.exports, i), o = false;
          } finally {
            o && delete n[e2];
          }
          return a2.exports;
        }
        i.ab = "//";
        var a = {};
        (() => {
          Object.defineProperty(a, "__esModule", { value: true }), a.trace = a.propagation = a.metrics = a.diag = a.context = a.INVALID_SPAN_CONTEXT = a.INVALID_TRACEID = a.INVALID_SPANID = a.isValidSpanId = a.isValidTraceId = a.isSpanContextValid = a.createTraceState = a.TraceFlags = a.SpanStatusCode = a.SpanKind = a.SamplingDecision = a.ProxyTracerProvider = a.ProxyTracer = a.defaultTextMapSetter = a.defaultTextMapGetter = a.ValueType = a.createNoopMeter = a.DiagLogLevel = a.DiagConsoleLogger = a.ROOT_CONTEXT = a.createContextKey = a.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(a, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(a, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(a, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(a, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = i(957);
          Object.defineProperty(a, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var o = i(102);
          Object.defineProperty(a, "createNoopMeter", { enumerable: true, get: function() {
            return o.createNoopMeter;
          } });
          var s = i(901);
          Object.defineProperty(a, "ValueType", { enumerable: true, get: function() {
            return s.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(a, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(a, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var u = i(125);
          Object.defineProperty(a, "ProxyTracer", { enumerable: true, get: function() {
            return u.ProxyTracer;
          } });
          var c = i(846);
          Object.defineProperty(a, "ProxyTracerProvider", { enumerable: true, get: function() {
            return c.ProxyTracerProvider;
          } });
          var d = i(996);
          Object.defineProperty(a, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var p = i(357);
          Object.defineProperty(a, "SpanKind", { enumerable: true, get: function() {
            return p.SpanKind;
          } });
          var f = i(847);
          Object.defineProperty(a, "SpanStatusCode", { enumerable: true, get: function() {
            return f.SpanStatusCode;
          } });
          var g = i(475);
          Object.defineProperty(a, "TraceFlags", { enumerable: true, get: function() {
            return g.TraceFlags;
          } });
          var h = i(98);
          Object.defineProperty(a, "createTraceState", { enumerable: true, get: function() {
            return h.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(a, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(a, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(a, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var _ = i(476);
          Object.defineProperty(a, "INVALID_SPANID", { enumerable: true, get: function() {
            return _.INVALID_SPANID;
          } }), Object.defineProperty(a, "INVALID_TRACEID", { enumerable: true, get: function() {
            return _.INVALID_TRACEID;
          } }), Object.defineProperty(a, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return _.INVALID_SPAN_CONTEXT;
          } });
          let y = i(67);
          Object.defineProperty(a, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let v = i(506);
          Object.defineProperty(a, "diag", { enumerable: true, get: function() {
            return v.diag;
          } });
          let b = i(886);
          Object.defineProperty(a, "metrics", { enumerable: true, get: function() {
            return b.metrics;
          } });
          let w = i(939);
          Object.defineProperty(a, "propagation", { enumerable: true, get: function() {
            return w.propagation;
          } });
          let S = i(845);
          Object.defineProperty(a, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), a.default = { context: y.context, diag: v.diag, metrics: b.metrics, propagation: w.propagation, trace: S.trace };
        })(), e.exports = a;
      })();
    }, 616: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredMediaTypes = n;
      var t = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var n2 = t.exec(e2);
        if (!n2) return null;
        var i2 = /* @__PURE__ */ Object.create(null), a2 = 1, o2 = n2[2], u = n2[1];
        if (n2[3]) for (var c = function(e3) {
          for (var t2 = e3.split(";"), r3 = 1, n3 = 0; r3 < t2.length; r3++) s(t2[n3]) % 2 == 0 ? t2[++n3] = t2[r3] : t2[n3] += ";" + t2[r3];
          t2.length = n3 + 1;
          for (var r3 = 0; r3 < t2.length; r3++) t2[r3] = t2[r3].trim();
          return t2;
        }(n2[3]).map(l), d = 0; d < c.length; d++) {
          var p = c[d], f = p[0].toLowerCase(), g = p[1], h = g && '"' === g[0] && '"' === g[g.length - 1] ? g.slice(1, -1) : g;
          if ("q" === f) {
            a2 = parseFloat(h);
            break;
          }
          i2[f] = h;
        }
        return { type: u, subtype: o2, params: i2, q: a2, i: r2 };
      }
      function n(e2, t2) {
        var n2 = function(e3) {
          for (var t3 = function(e4) {
            for (var t4 = e4.split(","), r2 = 1, n4 = 0; r2 < t4.length; r2++) s(t4[n4]) % 2 == 0 ? t4[++n4] = t4[r2] : t4[n4] += "," + t4[r2];
            return t4.length = n4 + 1, t4;
          }(e3), n3 = 0, i2 = 0; n3 < t3.length; n3++) {
            var a2 = r(t3[n3].trim(), n3);
            a2 && (t3[i2++] = a2);
          }
          return t3.length = i2, t3;
        }(void 0 === e2 ? "*/*" : e2 || "");
        if (!t2) return n2.filter(o).sort(i).map(a);
        var l2 = t2.map(function(e3, t3) {
          for (var i2 = { o: -1, q: 0, s: 0 }, a2 = 0; a2 < n2.length; a2++) {
            var o2 = function(e4, t4, n3) {
              var i3 = r(e4), a3 = 0;
              if (!i3) return null;
              if (t4.type.toLowerCase() == i3.type.toLowerCase()) a3 |= 4;
              else if ("*" != t4.type) return null;
              if (t4.subtype.toLowerCase() == i3.subtype.toLowerCase()) a3 |= 2;
              else if ("*" != t4.subtype) return null;
              var o3 = Object.keys(t4.params);
              if (o3.length > 0) if (!o3.every(function(e5) {
                return "*" == t4.params[e5] || (t4.params[e5] || "").toLowerCase() == (i3.params[e5] || "").toLowerCase();
              })) return null;
              else a3 |= 1;
              return { i: n3, o: t4.i, q: t4.q, s: a3 };
            }(e3, n2[a2], t3);
            o2 && 0 > (i2.s - o2.s || i2.q - o2.q || i2.o - o2.o) && (i2 = o2);
          }
          return i2;
        });
        return l2.filter(o).sort(i).map(function(e3) {
          return t2[l2.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function a(e2) {
        return e2.type + "/" + e2.subtype;
      }
      function o(e2) {
        return e2.q > 0;
      }
      function s(e2) {
        for (var t2 = 0, r2 = 0; -1 !== (r2 = e2.indexOf('"', r2)); ) t2++, r2++;
        return t2;
      }
      function l(e2) {
        var t2, r2, n2 = e2.indexOf("=");
        return -1 === n2 ? t2 = e2 : (t2 = e2.slice(0, n2), r2 = e2.slice(n2 + 1)), [t2, r2];
      }
    }, 636: (e, t, r) => {
      "use strict";
      r.d(t, { f: () => n });
      class n extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 646: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, a = {};
      function o(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function s(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = s(e2), { domain: i2, expires: a2, httponly: o2, maxage: l2, path: d2, samesite: p2, secure: f, partitioned: g, priority: h } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m, _, y = { name: t2, value: decodeURIComponent(r2), domain: i2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof l2 && { maxAge: Number(l2) }, path: d2, ...p2 && { sameSite: u.includes(m = (m = p2).toLowerCase()) ? m : void 0 }, ...f && { secure: true }, ...h && { priority: c.includes(_ = (_ = h).toLowerCase()) ? _ : void 0 }, ...g && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(a, { RequestCookies: () => d, ResponseCookies: () => p, parseCookie: () => s, parseSetCookie: () => l, stringifyCookie: () => o }), e.exports = ((e2, a2, o2, s2) => {
        if (a2 && "object" == typeof a2 || "function" == typeof a2) for (let l2 of n(a2)) i.call(e2, l2) || l2 === o2 || t(e2, l2, { get: () => a2[l2], enumerable: !(s2 = r(a2, l2)) || s2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), a);
      var u = ["strict", "lax", "none"], c = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of s(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => o(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => o(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, p = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = o(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(o).join("; ");
        }
      };
    }, 685: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredEncodings = n;
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e2, t2, r2) {
        var n2 = 0;
        if (t2.encoding.toLowerCase() === e2.toLowerCase()) n2 |= 1;
        else if ("*" !== t2.encoding) return null;
        return { encoding: e2, i: r2, o: t2.i, q: t2.q, s: n2 };
      }
      function n(e2, n2, s) {
        var l = function(e3) {
          for (var n3 = e3.split(","), i2 = false, a2 = 1, o2 = 0, s2 = 0; o2 < n3.length; o2++) {
            var l2 = function(e4, r2) {
              var n4 = t.exec(e4);
              if (!n4) return null;
              var i3 = n4[1], a3 = 1;
              if (n4[2]) for (var o3 = n4[2].split(";"), s3 = 0; s3 < o3.length; s3++) {
                var l3 = o3[s3].trim().split("=");
                if ("q" === l3[0]) {
                  a3 = parseFloat(l3[1]);
                  break;
                }
              }
              return { encoding: i3, q: a3, i: r2 };
            }(n3[o2].trim(), o2);
            l2 && (n3[s2++] = l2, i2 = i2 || r("identity", l2), a2 = Math.min(a2, l2.q || 1));
          }
          return i2 || (n3[s2++] = { encoding: "identity", q: a2, i: o2 }), n3.length = s2, n3;
        }(e2 || ""), u = s ? function(e3, t2) {
          if (e3.q !== t2.q) return t2.q - e3.q;
          var r2 = s.indexOf(e3.encoding), n3 = s.indexOf(t2.encoding);
          return -1 === r2 && -1 === n3 ? t2.s - e3.s || e3.o - t2.o || e3.i - t2.i : -1 !== r2 && -1 !== n3 ? r2 - n3 : -1 === r2 ? 1 : -1;
        } : i;
        if (!n2) return l.filter(o).sort(u).map(a);
        var c = n2.map(function(e3, t2) {
          for (var n3 = { encoding: e3, o: -1, q: 0, s: 0 }, i2 = 0; i2 < l.length; i2++) {
            var a2 = r(e3, l[i2], t2);
            a2 && 0 > (n3.s - a2.s || n3.q - a2.q || n3.o - a2.o) && (n3 = a2);
          }
          return n3;
        });
        return c.filter(o).sort(u).map(function(e3) {
          return n2[c.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i;
      }
      function a(e2) {
        return e2.encoding;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 686: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"\u30DB\u30FC\u30E0","about":"\u6982\u8981","pricing":"\u6599\u91D1","blog":"\u30D6\u30ED\u30B0","docs":"\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8","sitemap":"\u30B5\u30A4\u30C8\u30DE\u30C3\u30D7"},"pricing":{"header":"\u6599\u91D1","title":"\u30B7\u30F3\u30D7\u30EB\u3067\u900F\u660E\u306A\u6599\u91D1","description":"\u3042\u306A\u305F\u306B\u5408\u3063\u305F\u30D7\u30E9\u30F3\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\\n\u3059\u3079\u3066\u306E\u30D7\u30E9\u30F3\u306B\u306F\u3001\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0\u3078\u306E\u30A2\u30AF\u30BB\u30B9\u3001\u30EA\u30FC\u30C9\u751F\u6210\u30C4\u30FC\u30EB\u3001\u5C02\u7528\u30B5\u30DD\u30FC\u30C8\u304C\u542B\u307E\u308C\u3066\u3044\u307E\u3059\u3002"},"common":{"welcome":"\u3088\u3046\u3053\u305D","language":"\u8A00\u8A9E","switchLanguage":"\u8A00\u8A9E\u3092\u5207\u308A\u66FF\u3048\u308B","signIn":"\u30ED\u30B0\u30A4\u30F3","signUp":"\u767B\u9332","signOut":"\u30ED\u30B0\u30A2\u30A6\u30C8","scrollToTop":"\u30C8\u30C3\u30D7\u3078\u623B\u308B","share":{"button":"\u30B7\u30A7\u30A2","title":"\u5171\u6709\u5148","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"\u30E1\u30FC\u30EB","copyLink":"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC","copySuccess":"\u30EA\u30F3\u30AF\u304C\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3055\u308C\u307E\u3057\u305F","copyFailed":"\u30B3\u30D4\u30FC\u306B\u5931\u6557\u3057\u307E\u3057\u305F"},"comingSoon":{"title":"\u8FD1\u65E5\u516C\u958B","description":"\u3053\u306E\u6A5F\u80FD\u306F\u958B\u767A\u4E2D\u3067\u3059\u3002\u304A\u697D\u3057\u307F\u306B\u3002","action":"\u30DB\u30FC\u30E0\u306B\u623B\u308B"}},"blog":{"title":"\u30D6\u30ED\u30B0","description":"\u6700\u65B0\u306E\u6280\u8853\u8A18\u4E8B\u3001\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u3068\u30A4\u30F3\u30B5\u30A4\u30C8\u3092\u63A2\u7D22","backToBlog":"\u30D6\u30ED\u30B0\u306B\u623B\u308B","readArticle":"\u8A18\u4E8B\u3092\u8AAD\u3080","readMore":"\u7D9A\u304D\u3092\u8AAD\u3080","readingTime":"\u5206\u8AAD\u4E86","min":"\u5206","noArticles":"\u8A18\u4E8B\u306A\u3057","noArticlesDescription":"\u307E\u3060\u8A18\u4E8B\u304C\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u5F8C\u3067\u3082\u3046\u4E00\u5EA6\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002","articlesCount":"\u8A18\u4E8B","categories":"\u30AB\u30C6\u30B4\u30EA\u30FC","tags":"\u30BF\u30B0","recentPosts":"\u6700\u8FD1\u306E\u8A18\u4E8B","relatedArticles":"\u95A2\u9023\u8A18\u4E8B","shareArticle":"\u8A18\u4E8B\u3092\u30B7\u30A7\u30A2","featured":"\u304A\u3059\u3059\u3081","tableOfContents":"\u76EE\u6B21","hotTags":"\u4EBA\u6C17\u30BF\u30B0","quickNavigation":"\u30AF\u30A4\u30C3\u30AF\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3","viewAllCategories":"\u3059\u3079\u3066\u306E\u30AB\u30C6\u30B4\u30EA\u30FC\u3092\u898B\u308B","viewAllTags":"\u3059\u3079\u3066\u306E\u30BF\u30B0\u3092\u898B\u308B","allCategories":"\u3059\u3079\u3066\u306E\u30AB\u30C6\u30B4\u30EA\u30FC","allTags":"\u3059\u3079\u3066\u306E\u30BF\u30B0","category":{"title":"\u30AB\u30C6\u30B4\u30EA\u30FC","allCategories":"\u3059\u3079\u3066\u306E\u30AB\u30C6\u30B4\u30EA\u30FC","allCategoriesDescription":"\u3055\u307E\u3056\u307E\u306A\u30C8\u30D4\u30C3\u30AF\u306E\u8208\u5473\u6DF1\u3044\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u63A2\u7D22\u3001\u5408\u8A08{count}\u500B\u306E\u30AB\u30C6\u30B4\u30EA\u30FC","noCategoriesTitle":"\u30AB\u30C6\u30B4\u30EA\u30FC\u306A\u3057","noCategoriesDescription":"\u307E\u3060\u30AB\u30C6\u30B4\u30EA\u30FC\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u8A18\u4E8B\u304C\u516C\u958B\u3055\u308C\u308B\u3068\u81EA\u52D5\u7684\u306B\u4F5C\u6210\u3055\u308C\u307E\u3059\u3002","articlesInCategory":"{count}\u4EF6\u306E\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F","hotCategories":"\u4EBA\u6C17\u30AB\u30C6\u30B4\u30EA\u30FC","categoryOverview":"\u30AB\u30C6\u30B4\u30EA\u30FC\u6982\u8981","categoryCloud":"\u30AB\u30C6\u30B4\u30EA\u30FC\u30AF\u30E9\u30A6\u30C9"},"tag":{"title":"\u30BF\u30B0","allTags":"\u3059\u3079\u3066\u306E\u30BF\u30B0","allTagsDescription":"\u8208\u5473\u6DF1\u3044\u30C8\u30D4\u30C3\u30AF\u3092\u767A\u898B\u3001\u5408\u8A08{count}\u500B\u306E\u30BF\u30B0","tagCloud":"\u30BF\u30B0\u30AF\u30E9\u30A6\u30C9","noTagsTitle":"\u30BF\u30B0\u306A\u3057","noTagsDescription":"\u307E\u3060\u30BF\u30B0\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u8A18\u4E8B\u304C\u516C\u958B\u3055\u308C\u308B\u3068\u81EA\u52D5\u7684\u306B\u4F5C\u6210\u3055\u308C\u307E\u3059\u3002","articlesWithTag":"{count}\u4EF6\u306E\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u3057\u305F"},"pagination":{"previous":"\u524D\u3078","next":"\u6B21\u3078","navigation":"\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3","pageInfo":"{total}\u30DA\u30FC\u30B8\u4E2D{current}\u30DA\u30FC\u30B8\u76EE","pageX":"\u30DA\u30FC\u30B8 {page}"},"noResults":{"category":"\u3053\u306E\u30AB\u30C6\u30B4\u30EA\u30FC\u306B\u306F\u307E\u3060\u8A18\u4E8B\u304C\u3042\u308A\u307E\u305B\u3093\u3002","tag":"\u3053\u306E\u30BF\u30B0\u306E\u8A18\u4E8B\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002"}},"footer":{"allRightsReserved":"\u3059\u3079\u3066\u306E\u6A29\u5229\u306F\u4E88\u7D04\u3055\u308C\u3066\u3044\u307E\u3059\u3002","featured":"\u304A\u3059\u3059\u3081","resources":"\u30EA\u30BD\u30FC\u30B9","legal":"\u6CD5\u7684\u60C5\u5831","about":"\u6982\u8981","privacy":"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC","terms":"\u5229\u7528\u898F\u7D04","sitemap":"\u30B5\u30A4\u30C8\u30DE\u30C3\u30D7"},"meta":{"global":{"title":"Next Maker | \u30AA\u30F3\u30E9\u30A4\u30F3\u30C4\u30FC\u30EB\u69CB\u7BC9\u306E\u305F\u3081\u306E\u6B21\u4E16\u4EE3\u30D5\u30EC\u30FC\u30E0\u30EF\u30FC\u30AF","description":"\u6B21\u4E16\u4EE3\u30D5\u30EC\u30FC\u30E0\u30EF\u30FC\u30AF\u3067\u30AA\u30F3\u30E9\u30A4\u30F3\u30C4\u30FC\u30EB\u306E\u672A\u6765\u3092\u69CB\u7BC9\u3057\u307E\u3057\u3087\u3046\u3002","keywords":""},"about":{"title":"\u4F1A\u793E\u6982\u8981","description":"\u30E6\u30FC\u30B6\u30FC\u306B\u9AD8\u54C1\u8CEA\u306E\u30AA\u30F3\u30E9\u30A4\u30F3\u30B5\u30FC\u30D3\u30B9\u3092\u63D0\u4F9B\u3059\u308B\u305F\u3081\u306E\u53D6\u308A\u7D44\u307F\u3068\u3001\u79C1\u305F\u3061\u306E\u30C1\u30FC\u30E0\u80CC\u666F\u3084\u4F01\u696D\u4F7F\u547D\u306B\u3064\u3044\u3066\u8A73\u3057\u304F\u77E5\u3063\u3066\u304F\u3060\u3055\u3044\u3002"},"pricing":{"title":"\u6599\u91D1 - \u3042\u306A\u305F\u306E\u30CB\u30FC\u30BA\u306B\u6700\u9069\u306A\u30D7\u30E9\u30F3\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044","description":"\u7121\u6599\u306E\u5165\u9580\u30D1\u30C3\u30B1\u30FC\u30B8\u304B\u3089\u6A5F\u80FD\u6E80\u8F09\u306E\u4F01\u696D\u5411\u3051\u30BD\u30EA\u30E5\u30FC\u30B7\u30E7\u30F3\u307E\u3067\u3001\u3042\u3089\u3086\u308B\u30AA\u30F3\u30E9\u30A4\u30F3\u30C4\u30FC\u30EB\u306E\u30CB\u30FC\u30BA\u3092\u6E80\u305F\u3059\u6599\u91D1\u30D7\u30E9\u30F3\u3092\u3054\u89A7\u304F\u3060\u3055\u3044\u3002"},"terms":{"title":"\u5229\u7528\u898F\u7D04","description":"\u79C1\u305F\u3061\u306E\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8\u3068\u30B5\u30FC\u30D3\u30B9\u3092\u4F7F\u7528\u3059\u308B\u969B\u306E\u6CD5\u7684\u6761\u9805\u3001\u6761\u4EF6\u3001\u6A29\u5229\u3001\u8CAC\u4EFB\u306B\u3064\u3044\u3066\u5B66\u3073\u307E\u3057\u3087\u3046\u3002\u30AA\u30F3\u30E9\u30A4\u30F3\u30C4\u30FC\u30EB\u3092\u3054\u5229\u7528\u306B\u306A\u308B\u524D\u306B\u6CE8\u610F\u6DF1\u304F\u304A\u8AAD\u307F\u304F\u3060\u3055\u3044\u3002"},"privacy":{"title":"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC","description":"\u500B\u4EBA\u60C5\u5831\u306E\u53CE\u96C6\u3001\u4F7F\u7528\u3001\u4FDD\u8B77\u65B9\u6CD5\u306B\u3064\u3044\u3066\u5B66\u3073\u307E\u3057\u3087\u3046\u3002\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC\u3067\u306F\u3001\u30E6\u30FC\u30B6\u30FC\u30C7\u30FC\u30BF\u306E\u51E6\u7406\u3068\u4FDD\u8B77\u65B9\u6CD5\u306B\u3064\u3044\u3066\u8A73\u3057\u304F\u8AAC\u660E\u3057\u3066\u3044\u307E\u3059\u3002"},"docs":{"title":"\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 - \u4F7F\u7528\u30AC\u30A4\u30C9\u3068\u8A73\u7D30\u8AAC\u660E","description":"\u5F53\u793E\u306E\u30AA\u30F3\u30E9\u30A4\u30F3\u30C4\u30FC\u30EB\u3092\u6700\u5927\u9650\u306B\u6D3B\u7528\u3059\u308B\u305F\u3081\u306E\u8A73\u7D30\u306A\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3068\u30AC\u30A4\u30C9\u3092\u5165\u624B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},"blog":{"title":"\u30D6\u30ED\u30B0","description":"\u6700\u65B0\u306E\u6280\u8853\u8A18\u4E8B\u3001\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u3001\u77E5\u898B\u3092\u63A2\u7D22"}},"docs":{"translations":{"search":"\u691C\u7D22","searchNoResult":"\u7D50\u679C\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","toc":"\u76EE\u6B21","tocNoHeadings":"\u898B\u51FA\u3057\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","lastUpdate":"\u6700\u7D42\u66F4\u65B0\u65E5","chooseLanguage":"\u8A00\u8A9E\u3092\u9078\u629E","nextPage":"\u6B21\u306E\u30DA\u30FC\u30B8","previousPage":"\u524D\u306E\u30DA\u30FC\u30B8","chooseTheme":"\u30C6\u30FC\u30DE\u3092\u9078\u629E","editOnGithub":"GitHub \u3067\u7DE8\u96C6"}}}');
    }, 691: (e, t, r) => {
      var n = { "./de.json": 80, "./en.json": 20, "./es.json": 41, "./fr.json": 245, "./hi.json": 552, "./it.json": 374, "./ja.json": 686, "./ko.json": 771, "./pt.json": 501, "./ru.json": 114, "./zh.json": 535 };
      function i(e2) {
        return Promise.resolve().then(() => {
          if (!r.o(n, e2)) {
            var t2 = Error("Cannot find module '" + e2 + "'");
            throw t2.code = "MODULE_NOT_FOUND", t2;
          }
          var i2 = n[e2];
          return r.t(i2, 19);
        });
      }
      i.keys = () => Object.keys(n), i.id = 691, e.exports = i;
    }, 771: (e) => {
      "use strict";
      e.exports = JSON.parse('{"menu":{"home":"\uD648","about":"\uC6B0\uB9AC\uC5D0 \uB300\uD574","pricing":"\uAC00\uACA9","blog":"\uBE14\uB85C\uADF8","docs":"\uBB38\uC11C","sitemap":"\uC0AC\uC774\uD2B8 \uB9F5"},"pricing":{"header":"\uAC00\uACA9","title":"\uAC04\uB2E8\uD558\uACE0 \uD22C\uBA85\uD55C \uAC00\uACA9","description":"\uB2F9\uC2E0\uC5D0\uAC8C \uB9DE\uB294 \uD50C\uB79C\uC744 \uC120\uD0DD\uD558\uC138\uC694\\n\uBAA8\uB4E0 \uD50C\uB79C\uC5D0\uB294 \uD50C\uB7AB\uD3FC \uC811\uADFC, \uB9AC\uB4DC \uC0DD\uC131 \uB3C4\uAD6C, \uC804\uB2F4 \uC9C0\uC6D0\uC774 \uD3EC\uD568\uB429\uB2C8\uB2E4."},"common":{"welcome":"\uD658\uC601\uD569\uB2C8\uB2E4","language":"\uC5B8\uC5B4","switchLanguage":"\uC5B8\uC5B4 \uBCC0\uACBD","signIn":"\uB85C\uADF8\uC778","signUp":"\uAC00\uC785\uD558\uAE30","signOut":"\uB85C\uADF8\uC544\uC6C3","scrollToTop":"\uB9E8 \uC704\uB85C","share":{"button":"\uACF5\uC720","title":"\uACF5\uC720\uD558\uAE30","facebook":"Facebook","twitter":"Twitter","linkedin":"LinkedIn","reddit":"Reddit","email":"\uC774\uBA54\uC77C","copyLink":"\uB9C1\uD06C \uBCF5\uC0AC","copySuccess":"\uB9C1\uD06C\uAC00 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4","copyFailed":"\uBCF5\uC0AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"},"comingSoon":{"title":"\uACE7 \uC81C\uACF5 \uC608\uC815","description":"\uC774 \uAE30\uB2A5\uC740 \uAC1C\uBC1C \uC911\uC785\uB2C8\uB2E4. \uAE30\uB300\uD574 \uC8FC\uC138\uC694","action":"\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"}},"blog":{"title":"\uBE14\uB85C\uADF8","description":"\uCD5C\uC2E0 \uAE30\uC220 \uBB38\uC11C, \uD29C\uD1A0\uB9AC\uC5BC \uBC0F \uC778\uC0AC\uC774\uD2B8\uB97C \uD0D0\uC0C9\uD558\uC138\uC694","backToBlog":"\uBE14\uB85C\uADF8\uB85C \uB3CC\uC544\uAC00\uAE30","readArticle":"\uAE30\uC0AC \uC77D\uAE30","readMore":"\uB354 \uC77D\uAE30","readingTime":"\uBD84 \uC77D\uAE30","min":"\uBD84","noArticles":"\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","noArticlesDescription":"\uC544\uC9C1 \uAC8C\uC2DC\uB41C \uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uB098\uC911\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD574 \uC8FC\uC138\uC694.","articlesCount":"\uAC1C\uC758 \uAE00","categories":"\uCE74\uD14C\uACE0\uB9AC","tags":"\uD0DC\uADF8","recentPosts":"\uCD5C\uADFC \uAE00","relatedArticles":"\uAD00\uB828 \uAE00","shareArticle":"\uAE00 \uACF5\uC720\uD558\uAE30","featured":"\uCD94\uCC9C","tableOfContents":"\uBAA9\uCC28","hotTags":"\uC778\uAE30 \uD0DC\uADF8","quickNavigation":"\uBE60\uB978 \uD0D0\uC0C9","viewAllCategories":"\uBAA8\uB4E0 \uCE74\uD14C\uACE0\uB9AC \uBCF4\uAE30","viewAllTags":"\uBAA8\uB4E0 \uD0DC\uADF8 \uBCF4\uAE30","allCategories":"\uBAA8\uB4E0 \uCE74\uD14C\uACE0\uB9AC","allTags":"\uBAA8\uB4E0 \uD0DC\uADF8","category":{"title":"\uCE74\uD14C\uACE0\uB9AC","allCategories":"\uBAA8\uB4E0 \uCE74\uD14C\uACE0\uB9AC","allCategoriesDescription":"\uB2E4\uC591\uD55C \uC8FC\uC81C\uC758 \uD765\uBBF8\uB85C\uC6B4 \uCF58\uD150\uCE20\uB97C \uD0D0\uC0C9\uD558\uC138\uC694, \uCD1D {count}\uAC1C\uC758 \uCE74\uD14C\uACE0\uB9AC","noCategoriesTitle":"\uCE74\uD14C\uACE0\uB9AC \uC5C6\uC74C","noCategoriesDescription":"\uC544\uC9C1 \uCE74\uD14C\uACE0\uB9AC\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uAE00\uC774 \uAC8C\uC2DC\uB418\uBA74 \uC790\uB3D9\uC73C\uB85C \uC0DD\uC131\uB429\uB2C8\uB2E4.","articlesInCategory":"{count}\uAC1C\uC758 \uAE00\uC744 \uCC3E\uC558\uC2B5\uB2C8\uB2E4","hotCategories":"\uC778\uAE30 \uCE74\uD14C\uACE0\uB9AC","categoryOverview":"\uCE74\uD14C\uACE0\uB9AC \uAC1C\uC694","categoryCloud":"\uCE74\uD14C\uACE0\uB9AC \uD074\uB77C\uC6B0\uB4DC"},"tag":{"title":"\uD0DC\uADF8","allTags":"\uBAA8\uB4E0 \uD0DC\uADF8","allTagsDescription":"\uAD00\uC2EC \uC788\uB294 \uC8FC\uC81C\uB97C \uBC1C\uACAC\uD558\uC138\uC694, \uCD1D {count}\uAC1C\uC758 \uD0DC\uADF8","tagCloud":"\uD0DC\uADF8 \uD074\uB77C\uC6B0\uB4DC","noTagsTitle":"\uD0DC\uADF8 \uC5C6\uC74C","noTagsDescription":"\uC544\uC9C1 \uD0DC\uADF8\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uAE00\uC774 \uAC8C\uC2DC\uB418\uBA74 \uC790\uB3D9\uC73C\uB85C \uC0DD\uC131\uB429\uB2C8\uB2E4.","articlesWithTag":"{count}\uAC1C\uC758 \uAE00\uC744 \uCC3E\uC558\uC2B5\uB2C8\uB2E4"},"pagination":{"previous":"\uC774\uC804","next":"\uB2E4\uC74C","navigation":"\uD398\uC774\uC9C0 \uB124\uBE44\uAC8C\uC774\uC158","pageInfo":"{total}\uD398\uC774\uC9C0 \uC911 {current}\uD398\uC774\uC9C0","pageX":"\uD398\uC774\uC9C0 {page}"},"noResults":{"category":"\uC774 \uCE74\uD14C\uACE0\uB9AC\uC5D0\uB294 \uC544\uC9C1 \uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.","tag":"\uC774 \uD0DC\uADF8\uAC00 \uC788\uB294 \uAE00\uC774 \uC544\uC9C1 \uC5C6\uC2B5\uB2C8\uB2E4."}},"footer":{"allRightsReserved":"\uBAA8\uB4E0 \uAD8C\uB9AC \uBCF4\uC720.","featured":"\uCD94\uCC9C","resources":"\uB9AC\uC18C\uC2A4","legal":"\uBC95\uC801 \uACE0\uC9C0","about":"\uC6B0\uB9AC\uC5D0 \uB300\uD574","privacy":"\uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638\uC815\uCC45","terms":"\uC11C\uBE44\uC2A4 \uC57D\uAD00","sitemap":"\uC0AC\uC774\uD2B8 \uB9F5"},"meta":{"global":{"title":"Next Maker | \uC628\uB77C\uC778 \uB3C4\uAD6C \uAD6C\uCD95\uC744 \uC704\uD55C \uCC28\uC138\uB300 \uD504\uB808\uC784\uC6CC\uD06C","description":"\uCC28\uC138\uB300 \uD504\uB808\uC784\uC6CC\uD06C\uB85C \uC628\uB77C\uC778 \uB3C4\uAD6C\uC758 \uBBF8\uB798\uB97C \uAD6C\uCD95\uD558\uC138\uC694.","keywords":""},"about":{"title":"\uC6B0\uB9AC\uC5D0 \uB300\uD574","description":"\uC0AC\uC6A9\uC790\uC5D0\uAC8C \uACE0\uD488\uC9C8 \uC628\uB77C\uC778 \uC11C\uBE44\uC2A4\uB97C \uC81C\uACF5\uD558\uAE30 \uC704\uD55C \uC6B0\uB9AC\uC758 \uB178\uB825\uACFC \uD300 \uBC30\uACBD \uBC0F \uD68C\uC0AC \uBBF8\uC158\uC5D0 \uB300\uD574 \uC54C\uC544\uBCF4\uC138\uC694."},"pricing":{"title":"\uAC00\uACA9 - \uADC0\uD558\uC758 \uC694\uAD6C\uC5D0 \uAC00\uC7A5 \uC801\uD569\uD55C \uD50C\uB79C\uC744 \uC120\uD0DD\uD558\uC138\uC694","description":"\uBB34\uB8CC \uAE30\uBCF8 \uD328\uD0A4\uC9C0\uBD80\uD130 \uBAA8\uB4E0 \uAE30\uB2A5\uC744 \uAC16\uCD98 \uAE30\uC5C5\uC6A9 \uC194\uB8E8\uC158\uAE4C\uC9C0, \uBAA8\uB4E0 \uC628\uB77C\uC778 \uB3C4\uAD6C \uC694\uAD6C \uC0AC\uD56D\uC744 \uCDA9\uC871\uD558\uB294 \uAC00\uACA9 \uD50C\uB79C\uC744 \uD655\uC778\uD558\uC138\uC694."},"terms":{"title":"\uC11C\uBE44\uC2A4 \uC57D\uAD00","description":"\uC6F9\uC0AC\uC774\uD2B8 \uBC0F \uC11C\uBE44\uC2A4 \uC0AC\uC6A9\uC5D0 \uAD00\uD55C \uBC95\uC801 \uC870\uD56D, \uC870\uAC74, \uAD8C\uB9AC \uBC0F \uCC45\uC784\uC5D0 \uB300\uD574 \uC54C\uC544\uBCF4\uC138\uC694. \uC628\uB77C\uC778 \uB3C4\uAD6C\uB97C \uC0AC\uC6A9\uD558\uAE30 \uC804\uC5D0 \uC8FC\uC758 \uAE4A\uAC8C \uC77D\uC5B4\uBCF4\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4."},"privacy":{"title":"\uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638\uC815\uCC45","description":"\uADC0\uD558\uC758 \uAC1C\uC778 \uC815\uBCF4\uB97C \uC218\uC9D1, \uC0AC\uC6A9 \uBC0F \uBCF4\uD638\uD558\uB294 \uBC29\uBC95\uC5D0 \uB300\uD574 \uC54C\uC544\uBCF4\uC138\uC694. \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638\uC815\uCC45\uC740 \uC0AC\uC6A9\uC790 \uB370\uC774\uD130 \uCC98\uB9AC \uBC0F \uBCF4\uD638 \uBC29\uBC95\uC5D0 \uB300\uD574 \uC790\uC138\uD788 \uC124\uBA85\uD569\uB2C8\uB2E4."},"docs":{"title":"\uBB38\uC11C - \uC0AC\uC6A9 \uAC00\uC774\uB4DC \uBC0F \uC124\uBA85\uC11C","description":"\uC6B0\uB9AC\uC758 \uC628\uB77C\uC778 \uB3C4\uAD6C\uB97C \uCD5C\uB300\uD55C \uD65C\uC6A9\uD558\uAE30 \uC704\uD55C \uC0C1\uC138\uD55C \uBB38\uC11C\uC640 \uAC00\uC774\uB4DC\uB97C \uD655\uC778\uD558\uC138\uC694."},"blog":{"title":"\uBE14\uB85C\uADF8","description":"\uCD5C\uC2E0 \uAE30\uC220 \uAE30\uC0AC, \uD29C\uD1A0\uB9AC\uC5BC \uBC0F \uC778\uC0AC\uC774\uD2B8 \uD0D0\uC0C9"}},"docs":{"translations":{"search":"\uAC80\uC0C9","searchNoResult":"\uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4","toc":"\uBAA9\uCC28","tocNoHeadings":"\uC81C\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","lastUpdate":"\uB9C8\uC9C0\uB9C9 \uC5C5\uB370\uC774\uD2B8","chooseLanguage":"\uC5B8\uC5B4 \uC120\uD0DD","nextPage":"\uB2E4\uC74C \uD398\uC774\uC9C0","previousPage":"\uC774\uC804 \uD398\uC774\uC9C0","chooseTheme":"\uD14C\uB9C8 \uC120\uD0DD","editOnGithub":"Github\uC5D0\uC11C \uD3B8\uC9D1"}}}');
    }, 780: (e, t, r) => {
      "use strict";
      var n = r(288), i = r(685), a = r(96), o = r(616);
      function s(e2) {
        if (!(this instanceof s)) return new s(e2);
        this.request = e2;
      }
      e.exports = s, e.exports.Negotiator = s, s.prototype.charset = function(e2) {
        var t2 = this.charsets(e2);
        return t2 && t2[0];
      }, s.prototype.charsets = function(e2) {
        return n(this.request.headers["accept-charset"], e2);
      }, s.prototype.encoding = function(e2, t2) {
        var r2 = this.encodings(e2, t2);
        return r2 && r2[0];
      }, s.prototype.encodings = function(e2, t2) {
        return i(this.request.headers["accept-encoding"], e2, (t2 || {}).preferred);
      }, s.prototype.language = function(e2) {
        var t2 = this.languages(e2);
        return t2 && t2[0];
      }, s.prototype.languages = function(e2) {
        return a(this.request.headers["accept-language"], e2);
      }, s.prototype.mediaType = function(e2) {
        var t2 = this.mediaTypes(e2);
        return t2 && t2[0];
      }, s.prototype.mediaTypes = function(e2) {
        return o(this.request.headers.accept, e2);
      }, s.prototype.preferredCharset = s.prototype.charset, s.prototype.preferredCharsets = s.prototype.charsets, s.prototype.preferredEncoding = s.prototype.encoding, s.prototype.preferredEncodings = s.prototype.encodings, s.prototype.preferredLanguage = s.prototype.language, s.prototype.preferredLanguages = s.prototype.languages, s.prototype.preferredMediaType = s.prototype.mediaType, s.prototype.preferredMediaTypes = s.prototype.mediaTypes;
    }, 905: (e, t, r) => {
      "use strict";
      r.d(t, { RM: () => a, s8: () => i });
      let n = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), i = "NEXT_HTTP_ERROR_FALLBACK";
      function a(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === i && n.has(Number(r2));
      }
    }, 933: (e, t, r) => {
      "use strict";
      r.d(t, { XN: () => i, FP: () => n });
      let n = (0, r(198).xl)();
      function i(e2) {
        let t2 = n.getStore();
        switch (!t2 && function(e3) {
          throw Object.defineProperty(Error(`\`${e3}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
        }(e2), t2.type) {
          case "request":
          default:
            return t2;
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", { value: "E401", enumerable: false, configurable: true });
          case "cache":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E37", enumerable: false, configurable: true });
          case "unstable-cache":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E69", enumerable: false, configurable: true });
        }
      }
    }, 953: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray, a = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), g = Symbol.iterator, h = Object.prototype.hasOwnProperty, m = Object.assign;
      function _(e2, t2, r2, n2, i2, o2) {
        return { $$typeof: a, type: e2, key: t2, ref: void 0 !== (r2 = o2.ref) ? r2 : null, props: o2 };
      }
      function y(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === a;
      }
      var v = /\/+/g;
      function b(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function w() {
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var s2 = [], l2 = 0;
        return !function e3(t3, r3, s3, l3, u2) {
          var c2, d2, p2, h2 = typeof t3;
          ("undefined" === h2 || "boolean" === h2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (h2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case a:
                case o:
                  m2 = true;
                  break;
                case f:
                  return e3((m2 = t3._init)(t3._payload), r3, s3, l3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === l3 ? "." + b(t3, 0) : l3, i(u2) ? (s3 = "", null != m2 && (s3 = m2.replace(v, "$&/") + "/"), e3(u2, r3, s3, "", function(e4) {
            return e4;
          })) : null != u2 && (y(u2) && (c2 = u2, d2 = s3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(v, "$&/") + "/") + m2, u2 = _(c2.type, d2, void 0, void 0, void 0, c2.props)), r3.push(u2)), 1;
          m2 = 0;
          var S2 = "" === l3 ? "." : l3 + ":";
          if (i(t3)) for (var C2 = 0; C2 < t3.length; C2++) h2 = S2 + b(l3 = t3[C2], C2), m2 += e3(l3, r3, s3, h2, u2);
          else if ("function" == typeof (C2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = g && p2[g] || p2["@@iterator"]) ? p2 : null)) for (t3 = C2.call(t3), C2 = 0; !(l3 = t3.next()).done; ) h2 = S2 + b(l3 = l3.value, C2++), m2 += e3(l3, r3, s3, h2, u2);
          else if ("object" === h2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(w, w) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, s3, l3, u2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, s2, "", "", function(e3) {
          return t2.call(r2, e3, l2++);
        }), s2;
      }
      function C(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function T() {
        return /* @__PURE__ */ new WeakMap();
      }
      function E() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!y(e2)) throw Error(n(143));
        return e2;
      } }, t.Fragment = s, t.Profiler = u, t.StrictMode = l, t.Suspense = d, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, t.cache = function(e2) {
        return function() {
          var t2 = r.A;
          if (!t2) return e2.apply(null, arguments);
          var n2 = t2.getCacheForType(T);
          void 0 === (t2 = n2.get(e2)) && (t2 = E(), n2.set(e2, t2)), n2 = 0;
          for (var i2 = arguments.length; n2 < i2; n2++) {
            var a2 = arguments[n2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = E(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = E(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (n2 = t2).s = 1, n2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, t.captureOwnerStack = function() {
        return null;
      }, t.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var i2 = m({}, e2.props), a2 = e2.key, o2 = void 0;
        if (null != t2) for (s2 in void 0 !== t2.ref && (o2 = void 0), void 0 !== t2.key && (a2 = "" + t2.key), t2) h.call(t2, s2) && "key" !== s2 && "__self" !== s2 && "__source" !== s2 && ("ref" !== s2 || void 0 !== t2.ref) && (i2[s2] = t2[s2]);
        var s2 = arguments.length - 2;
        if (1 === s2) i2.children = r2;
        else if (1 < s2) {
          for (var l2 = Array(s2), u2 = 0; u2 < s2; u2++) l2[u2] = arguments[u2 + 2];
          i2.children = l2;
        }
        return _(e2.type, a2, void 0, void 0, o2, i2);
      }, t.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) h.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return _(e2, a2, void 0, void 0, null, i2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: c, render: e2 };
      }, t.isValidElement = y, t.lazy = function(e2) {
        return { $$typeof: f, _payload: { _status: -1, _result: e2 }, _init: C };
      }, t.memo = function(e2, t2) {
        return { $$typeof: p, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.use = function(e2) {
        return r.H.use(e2);
      }, t.useCallback = function(e2, t2) {
        return r.H.useCallback(e2, t2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return r.H.useId();
      }, t.useMemo = function(e2, t2) {
        return r.H.useMemo(e2, t2);
      }, t.version = "19.2.0-canary-3fbfb9ba-20250409";
    }, 965: (e, t, r) => {
      "use strict";
      e.exports = r(513);
    }, 994: (e, t, r) => {
      "use strict";
      e.exports = r(262);
    } }, (e) => {
      var t = e(e.s = 406);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|favicon.ico|ads.txt|robots.txt|sitemap.xml|.*\\..*).*))(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["mdx", "md", "jsx", "js", "tsx", "ts"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "hostname": "images.unsplash.com" }], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": true, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/shankai/codebase/kong0/next-maker", "experimental": { "nodeMiddleware": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "viewTransition": false, "routerBFCache": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "useCache": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "serverExternalPackages": ["typescript", "twoslash"], "turbopack": { "rules": { "*.{md,mdx}": { "loaders": [{ "loader": "fumadocs-mdx/loader-mdx", "options": { "configPath": "/Users/shankai/codebase/kong0/next-maker/source.config.ts", "outDir": ".source" } }], "as": "*.js" } }, "root": "/Users/shankai/codebase/kong0/next-maker" } };
var BuildId = "gboG0HIViRQBv6bEnz0v4";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/manifest.webmanifest", "regex": "^/manifest\\.webmanifest(?:/)?$", "routeKeys": {}, "namedRegex": "^/manifest\\.webmanifest(?:/)?$" }, { "page": "/robots.txt", "regex": "^/robots\\.txt(?:/)?$", "routeKeys": {}, "namedRegex": "^/robots\\.txt(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }], "dynamic": [{ "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/about", "regex": "^/([^/]+?)/about(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/about(?:/)?$" }, { "page": "/[locale]/blog", "regex": "^/([^/]+?)/blog(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog(?:/)?$" }, { "page": "/[locale]/blog/categories", "regex": "^/([^/]+?)/blog/categories(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/categories(?:/)?$" }, { "page": "/[locale]/blog/category/[category]", "regex": "^/([^/]+?)/blog/category/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPcategory": "nxtPcategory" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/category/(?<nxtPcategory>[^/]+?)(?:/)?$" }, { "page": "/[locale]/blog/tag/[tag]", "regex": "^/([^/]+?)/blog/tag/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPtag": "nxtPtag" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/tag/(?<nxtPtag>[^/]+?)(?:/)?$" }, { "page": "/[locale]/blog/tags", "regex": "^/([^/]+?)/blog/tags(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/tags(?:/)?$" }, { "page": "/[locale]/blog/[...slug]", "regex": "^/([^/]+?)/blog/(.+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPslug": "nxtPslug" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/(?<nxtPslug>.+?)(?:/)?$" }, { "page": "/[locale]/dirs", "regex": "^/([^/]+?)/dirs(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/dirs(?:/)?$" }, { "page": "/[locale]/docs/[[...slug]]", "regex": "^/([^/]+?)/docs(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPslug": "nxtPslug" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/docs(?:/(?<nxtPslug>.+?))?(?:/)?$" }, { "page": "/[locale]/privacy", "regex": "^/([^/]+?)/privacy(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/privacy(?:/)?$" }, { "page": "/[locale]/terms", "regex": "^/([^/]+?)/terms(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/terms(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/manifest.webmanifest": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/manifest+json", "x-next-cache-tags": "_N_T_/layout,_N_T_/manifest.webmanifest/layout,_N_T_/manifest.webmanifest/route,_N_T_/manifest.webmanifest" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/manifest.webmanifest", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/robots.txt": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/robots.txt", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": { "/[locale]/blog/category/[category]": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/([^/]+?)/blog/category/([^/]+?)(?:/)?$", "dataRoute": "/[locale]/blog/category/[category].rsc", "fallback": null, "dataRouteRegex": "^/([^/]+?)/blog/category/([^/]+?)\\.rsc$", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/[locale]/blog/tag/[tag]": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/([^/]+?)/blog/tag/([^/]+?)(?:/)?$", "dataRoute": "/[locale]/blog/tag/[tag].rsc", "fallback": null, "dataRouteRegex": "^/([^/]+?)/blog/tag/([^/]+?)\\.rsc$", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "notFoundRoutes": [], "preview": { "previewModeId": "428e293e560c1b1b151ec554f1f9a0d4", "previewModeSigningKey": "ce7664b20f258f5af64d99eab4802f43442538f2673743115bd7d5d10ef45fdf", "previewModeEncryptionKey": "5bdaf542044a06ee59f737878638a27bb40890f2b4411fb597417adcabe71ef4" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|favicon.ico|ads.txt|robots.txt|sitemap.xml|.*\\..*).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!api|_next|favicon.ico|ads.txt|robots.txt|sitemap.xml|.*\\..*).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "gboG0HIViRQBv6bEnz0v4", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "pQwMUnR0Cpskchuvaq9JJfJUHpQh8GnJ1p4kBNQTUNg=", "__NEXT_PREVIEW_MODE_ID": "428e293e560c1b1b151ec554f1f9a0d4", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "5bdaf542044a06ee59f737878638a27bb40890f2b4411fb597417adcabe71ef4", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "ce7664b20f258f5af64d99eab4802f43442538f2673743115bd7d5d10ef45fdf" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/manifest.webmanifest/route": "/manifest.webmanifest", "/robots.txt/route": "/robots.txt", "/sitemap.xml/route": "/sitemap.xml", "/api/config/route": "/api/config", "/api/search/route": "/api/search", "/[locale]/dirs/page": "/[locale]/dirs", "/[locale]/(main)/about/page": "/[locale]/about", "/[locale]/(main)/page": "/[locale]", "/[locale]/(main)/terms/page": "/[locale]/terms", "/[locale]/(main)/privacy/page": "/[locale]/privacy", "/[locale]/docs/[[...slug]]/page": "/[locale]/docs/[[...slug]]", "/[locale]/(main)/blog/[...slug]/page": "/[locale]/blog/[...slug]", "/[locale]/(main)/blog/categories/page": "/[locale]/blog/categories", "/[locale]/(main)/blog/page": "/[locale]/blog", "/[locale]/(main)/blog/tags/page": "/[locale]/blog/tags", "/[locale]/(main)/blog/category/[category]/page": "/[locale]/blog/category/[category]", "/[locale]/(main)/blog/tag/[tag]/page": "/[locale]/blog/tag/[tag]" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/.pnpm/@opennextjs+aws@3.7.0/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const config = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(config?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(config?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(config?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
