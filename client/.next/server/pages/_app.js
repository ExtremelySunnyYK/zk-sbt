/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(wagmi__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi/providers/alchemy */ \"wagmi/providers/alchemy\");\n/* harmony import */ var wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi/providers/public */ \"wagmi/providers/public\");\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(wagmi_providers_public__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_2__]);\n_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\nconst { chains , provider , webSocketProvider  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.configureChains)([\n    wagmi__WEBPACK_IMPORTED_MODULE_3__.chain.goerli,\n    wagmi__WEBPACK_IMPORTED_MODULE_3__.chain.localhost,\n    // chain.mainnet,\n    // chain.polygon,\n    // chain.optimism,\n    // chain.arbitrum,\n    ...process.env.NEXT_PUBLIC_ENABLE_TESTNETS === \"true\" ? [\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.chain.goerli,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.chain.kovan,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.chain.rinkeby,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.chain.ropsten\n    ] : [], \n], [\n    (0,wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_4__.alchemyProvider)({\n        // This is Alchemy's default API key.\n        // You can get your own at https://dashboard.alchemyapi.io\n        apiKey: \"_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC\"\n    }),\n    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_5__.publicProvider)(), \n]);\nconst { connectors  } = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_2__.getDefaultWallets)({\n    appName: \"RainbowKit App\",\n    chains\n});\nconst wagmiClient = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.createClient)({\n    autoConnect: true,\n    connectors,\n    provider,\n    webSocketProvider\n});\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_3__.WagmiConfig, {\n        client: wagmiClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_2__.RainbowKitProvider, {\n            chains: chains,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/yk/code/spartan-labs/zk-sbt/client/pages/_app.tsx\",\n                lineNumber: 47,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/yk/code/spartan-labs/zk-sbt/client/pages/_app.tsx\",\n            lineNumber: 46,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/yk/code/spartan-labs/zk-sbt/client/pages/_app.tsx\",\n        lineNumber: 45,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUErQjtBQUNZO0FBRW9DO0FBQ0w7QUFDaEI7QUFDRjtBQUV4RCxNQUFNLEVBQUVRLE1BQU0sR0FBRUMsUUFBUSxHQUFFQyxpQkFBaUIsR0FBRSxHQUFHUCxzREFBZSxDQUM3RDtJQUNFRCwrQ0FBWTtJQUNaQSxrREFBZTtJQUNmLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtPQUNkVyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsMkJBQTJCLEtBQUssTUFBTSxHQUNsRDtRQUFDYiwrQ0FBWTtRQUFFQSw4Q0FBVztRQUFFQSxnREFBYTtRQUFFQSxnREFBYTtLQUFDLEdBQ3pELEVBQUU7Q0FDUCxFQUNEO0lBQ0VJLHdFQUFlLENBQUM7UUFDZCxxQ0FBcUM7UUFDckMsMERBQTBEO1FBQzFEYSxNQUFNLEVBQUUsa0NBQWtDO0tBQzNDLENBQUM7SUFDRlosc0VBQWMsRUFBRTtDQUNqQixDQUNGO0FBRUQsTUFBTSxFQUFFYSxVQUFVLEdBQUUsR0FBR25CLHlFQUFpQixDQUFDO0lBQ3ZDb0IsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QmIsTUFBTTtDQUNQLENBQUM7QUFFRixNQUFNYyxXQUFXLEdBQUdsQixtREFBWSxDQUFDO0lBQy9CbUIsV0FBVyxFQUFFLElBQUk7SUFDakJILFVBQVU7SUFDVlgsUUFBUTtJQUNSQyxpQkFBaUI7Q0FDbEIsQ0FBQztBQUVGLFNBQVNjLEtBQUssQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBWSxFQUFFO0lBQ2pELHFCQUNFLDhEQUFDckIsOENBQVc7UUFBQ3NCLE1BQU0sRUFBRUwsV0FBVztrQkFDOUIsNEVBQUN0QixzRUFBa0I7WUFBQ1EsTUFBTSxFQUFFQSxNQUFNO3NCQUNoQyw0RUFBQ2lCLFNBQVM7Z0JBQUUsR0FBR0MsU0FBUzs7Ozs7b0JBQUk7Ozs7O2dCQUNUOzs7OztZQUNULENBQ2Q7QUFDSixDQUFDO0FBRUQsaUVBQWVGLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0ICdAcmFpbmJvdy1tZS9yYWluYm93a2l0L3N0eWxlcy5jc3MnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB7IFJhaW5ib3dLaXRQcm92aWRlciwgZ2V0RGVmYXVsdFdhbGxldHMgfSBmcm9tICdAcmFpbmJvdy1tZS9yYWluYm93a2l0JztcbmltcG9ydCB7IGNoYWluLCBjb25maWd1cmVDaGFpbnMsIGNyZWF0ZUNsaWVudCwgV2FnbWlDb25maWcgfSBmcm9tICd3YWdtaSc7XG5pbXBvcnQgeyBhbGNoZW15UHJvdmlkZXIgfSBmcm9tICd3YWdtaS9wcm92aWRlcnMvYWxjaGVteSc7XG5pbXBvcnQgeyBwdWJsaWNQcm92aWRlciB9IGZyb20gJ3dhZ21pL3Byb3ZpZGVycy9wdWJsaWMnO1xuXG5jb25zdCB7IGNoYWlucywgcHJvdmlkZXIsIHdlYlNvY2tldFByb3ZpZGVyIH0gPSBjb25maWd1cmVDaGFpbnMoXG4gIFtcbiAgICBjaGFpbi5nb2VybGksXG4gICAgY2hhaW4ubG9jYWxob3N0LFxuICAgIC8vIGNoYWluLm1haW5uZXQsXG4gICAgLy8gY2hhaW4ucG9seWdvbixcbiAgICAvLyBjaGFpbi5vcHRpbWlzbSxcbiAgICAvLyBjaGFpbi5hcmJpdHJ1bSxcbiAgICAuLi4ocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRU5BQkxFX1RFU1RORVRTID09PSAndHJ1ZSdcbiAgICAgID8gW2NoYWluLmdvZXJsaSwgY2hhaW4ua292YW4sIGNoYWluLnJpbmtlYnksIGNoYWluLnJvcHN0ZW5dXG4gICAgICA6IFtdKSxcbiAgXSxcbiAgW1xuICAgIGFsY2hlbXlQcm92aWRlcih7XG4gICAgICAvLyBUaGlzIGlzIEFsY2hlbXkncyBkZWZhdWx0IEFQSSBrZXkuXG4gICAgICAvLyBZb3UgY2FuIGdldCB5b3VyIG93biBhdCBodHRwczovL2Rhc2hib2FyZC5hbGNoZW15YXBpLmlvXG4gICAgICBhcGlLZXk6ICdfZ2c3d1NTaTBLTUJzZEtuR1ZmSER1ZXE2eE1COUVrQycsXG4gICAgfSksXG4gICAgcHVibGljUHJvdmlkZXIoKSxcbiAgXVxuKTtcblxuY29uc3QgeyBjb25uZWN0b3JzIH0gPSBnZXREZWZhdWx0V2FsbGV0cyh7XG4gIGFwcE5hbWU6ICdSYWluYm93S2l0IEFwcCcsXG4gIGNoYWlucyxcbn0pO1xuXG5jb25zdCB3YWdtaUNsaWVudCA9IGNyZWF0ZUNsaWVudCh7XG4gIGF1dG9Db25uZWN0OiB0cnVlLFxuICBjb25uZWN0b3JzLFxuICBwcm92aWRlcixcbiAgd2ViU29ja2V0UHJvdmlkZXIsXG59KTtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxXYWdtaUNvbmZpZyBjbGllbnQ9e3dhZ21pQ2xpZW50fT5cbiAgICAgIDxSYWluYm93S2l0UHJvdmlkZXIgY2hhaW5zPXtjaGFpbnN9PlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8L1JhaW5ib3dLaXRQcm92aWRlcj5cbiAgICA8L1dhZ21pQ29uZmlnPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJSYWluYm93S2l0UHJvdmlkZXIiLCJnZXREZWZhdWx0V2FsbGV0cyIsImNoYWluIiwiY29uZmlndXJlQ2hhaW5zIiwiY3JlYXRlQ2xpZW50IiwiV2FnbWlDb25maWciLCJhbGNoZW15UHJvdmlkZXIiLCJwdWJsaWNQcm92aWRlciIsImNoYWlucyIsInByb3ZpZGVyIiwid2ViU29ja2V0UHJvdmlkZXIiLCJnb2VybGkiLCJsb2NhbGhvc3QiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfRU5BQkxFX1RFU1RORVRTIiwia292YW4iLCJyaW5rZWJ5Iiwicm9wc3RlbiIsImFwaUtleSIsImNvbm5lY3RvcnMiLCJhcHBOYW1lIiwid2FnbWlDbGllbnQiLCJhdXRvQ29ubmVjdCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY2xpZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("wagmi");

/***/ }),

/***/ "wagmi/providers/alchemy":
/*!******************************************!*\
  !*** external "wagmi/providers/alchemy" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("wagmi/providers/alchemy");

/***/ }),

/***/ "wagmi/providers/public":
/*!*****************************************!*\
  !*** external "wagmi/providers/public" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("wagmi/providers/public");

/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();