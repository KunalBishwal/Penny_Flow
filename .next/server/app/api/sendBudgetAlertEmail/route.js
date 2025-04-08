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
exports.id = "app/api/sendBudgetAlertEmail/route";
exports.ids = ["app/api/sendBudgetAlertEmail/route"];
exports.modules = {

/***/ "(rsc)/./app/api/sendBudgetAlertEmail/route.ts":
/*!***********************************************!*\
  !*** ./app/api/sendBudgetAlertEmail/route.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n\n\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_1__.createTransport({\n    host: \"sandbox.smtp.mailtrap.io\",\n    port: 2525,\n    secure: false,\n    auth: {\n        user: '14616f6211aaa9',\n        pass: '11c0c2ccd09121'\n    },\n    logger: true,\n    debug: true\n});\nasync function POST(request) {\n    const { to, budget, currency } = await request.json();\n    console.log(\"📧 Sending budget alert email to:\", to);\n    if (!to) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Recipient email is missing\"\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const mailOptions = {\n            from: '\"PennyFlow\" <noreply@pennyflow.com>',\n            to,\n            subject: \"💸 Budget Alert - You’ve Exceeded Your Monthly Limit!\",\n            html: `\n        <div style=\"font-family: Arial, sans-serif; color: #333;\">\n          <h2 style=\"color: #e63946;\">🚨 Budget Alert!</h2>\n          <p>Hi there,</p>\n          <p>Just a heads-up! You've exceeded your monthly budget of <strong>${currency} ${budget}</strong>. Time to pump the brakes on those expenses!</p>\n          <p>Stay money-smart! 💸</p>\n          <hr />\n          <small>This is an automated message from PennyFlow. Do not reply.</small>\n        </div>\n      `\n        };\n        console.log(\"📧 Sending email with options:\", mailOptions);\n        const result = await transporter.sendMail(mailOptions);\n        console.log(\"✅ Email sent:\", result.messageId);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            messageId: result.messageId\n        });\n    } catch (error) {\n        console.error(\"❌ Error sending email:\", error?.message || error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to send email\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlbmRCdWRnZXRBbGVydEVtYWlsL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNQO0FBR3BDLE1BQU1FLGNBQWNELHVEQUEwQixDQUMxQztJQUNFRyxNQUFNO0lBQ05DLE1BQU07SUFDTkMsUUFBUTtJQUNSQyxNQUFNO1FBQ0pDLE1BQU07UUFDTkMsTUFBTTtJQUNSO0lBQ0FDLFFBQVE7SUFDUkMsT0FBTztBQUNUO0FBSUcsZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsTUFBTSxFQUFFQyxFQUFFLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUgsUUFBUUksSUFBSTtJQUNuREMsUUFBUUMsR0FBRyxDQUFDLHFDQUFxQ0w7SUFFakQsSUFBSSxDQUFDQSxJQUFJO1FBQ1AsT0FBT2QscURBQVlBLENBQUNpQixJQUFJLENBQUM7WUFBRUcsT0FBTztRQUE2QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNsRjtJQUVBLElBQUk7UUFDRixNQUFNQyxjQUFjO1lBQ2xCQyxNQUFNO1lBQ05UO1lBQ0FVLFNBQVM7WUFDVEMsTUFBTSxDQUFDOzs7OzZFQUlnRSxFQUFFVCxTQUFTLENBQUMsRUFBRUQsT0FBTzs7Ozs7TUFLNUYsQ0FBQztRQUNIO1FBQ0FHLFFBQVFDLEdBQUcsQ0FBQyxrQ0FBa0NHO1FBRTlDLE1BQU1JLFNBQVMsTUFBTXhCLFlBQVl5QixRQUFRLENBQUNMO1FBQzFDSixRQUFRQyxHQUFHLENBQUMsaUJBQWlCTyxPQUFPRSxTQUFTO1FBQzdDLE9BQU81QixxREFBWUEsQ0FBQ2lCLElBQUksQ0FBQztZQUFFVyxXQUFXRixPQUFPRSxTQUFTO1FBQUM7SUFDekQsRUFBRSxPQUFPUixPQUFZO1FBQ25CRixRQUFRRSxLQUFLLENBQUMsMEJBQTBCQSxPQUFPUyxXQUFXVDtRQUMxRCxPQUFPcEIscURBQVlBLENBQUNpQixJQUFJLENBQUM7WUFBRUcsT0FBT0EsTUFBTVMsT0FBTyxJQUFJO1FBQXVCLEdBQUc7WUFBRVIsUUFBUTtRQUFJO0lBQzdGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxIVE1MIENTU1xcV0VCIERFViBDT1VSU0UgSFxcUmVhY3RcXEhhY2thdGhvblxcdHJ5XFx0cnkxXFxleHBlbnNlLXRyYWNrZXJcXGFwcFxcYXBpXFxzZW5kQnVkZ2V0QWxlcnRFbWFpbFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCI7XHJcblxyXG5cclxuY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydChcclxuICAgIHtcclxuICAgICAgaG9zdDogXCJzYW5kYm94LnNtdHAubWFpbHRyYXAuaW9cIixcclxuICAgICAgcG9ydDogMjUyNSxcclxuICAgICAgc2VjdXJlOiBmYWxzZSwgXHJcbiAgICAgIGF1dGg6IHtcclxuICAgICAgICB1c2VyOiAnMTQ2MTZmNjIxMWFhYTknLFxyXG4gICAgICAgIHBhc3M6ICcxMWMwYzJjY2QwOTEyMScsXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvZ2dlcjogdHJ1ZSwgIFxyXG4gICAgICBkZWJ1ZzogdHJ1ZSwgICBcclxuICAgIH1cclxuICApO1xyXG4gIFxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIGNvbnN0IHsgdG8sIGJ1ZGdldCwgY3VycmVuY3kgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gIGNvbnNvbGUubG9nKFwi8J+TpyBTZW5kaW5nIGJ1ZGdldCBhbGVydCBlbWFpbCB0bzpcIiwgdG8pO1xyXG5cclxuICBpZiAoIXRvKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJSZWNpcGllbnQgZW1haWwgaXMgbWlzc2luZ1wiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgIGZyb206ICdcIlBlbm55Rmxvd1wiIDxub3JlcGx5QHBlbm55Zmxvdy5jb20+JyxcclxuICAgICAgdG8sXHJcbiAgICAgIHN1YmplY3Q6IFwi8J+SuCBCdWRnZXQgQWxlcnQgLSBZb3XigJl2ZSBFeGNlZWRlZCBZb3VyIE1vbnRobHkgTGltaXQhXCIsXHJcbiAgICAgIGh0bWw6IGBcclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBjb2xvcjogIzMzMztcIj5cclxuICAgICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjZTYzOTQ2O1wiPvCfmqggQnVkZ2V0IEFsZXJ0ITwvaDI+XHJcbiAgICAgICAgICA8cD5IaSB0aGVyZSw8L3A+XHJcbiAgICAgICAgICA8cD5KdXN0IGEgaGVhZHMtdXAhIFlvdSd2ZSBleGNlZWRlZCB5b3VyIG1vbnRobHkgYnVkZ2V0IG9mIDxzdHJvbmc+JHtjdXJyZW5jeX0gJHtidWRnZXR9PC9zdHJvbmc+LiBUaW1lIHRvIHB1bXAgdGhlIGJyYWtlcyBvbiB0aG9zZSBleHBlbnNlcyE8L3A+XHJcbiAgICAgICAgICA8cD5TdGF5IG1vbmV5LXNtYXJ0ISDwn5K4PC9wPlxyXG4gICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICA8c21hbGw+VGhpcyBpcyBhbiBhdXRvbWF0ZWQgbWVzc2FnZSBmcm9tIFBlbm55Rmxvdy4gRG8gbm90IHJlcGx5Ljwvc21hbGw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGAsXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coXCLwn5OnIFNlbmRpbmcgZW1haWwgd2l0aCBvcHRpb25zOlwiLCBtYWlsT3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xyXG4gICAgY29uc29sZS5sb2coXCLinIUgRW1haWwgc2VudDpcIiwgcmVzdWx0Lm1lc3NhZ2VJZCk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlSWQ6IHJlc3VsdC5tZXNzYWdlSWQgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBzZW5kaW5nIGVtYWlsOlwiLCBlcnJvcj8ubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBzZW5kIGVtYWlsXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIm5vZGVtYWlsZXIiLCJ0cmFuc3BvcnRlciIsImNyZWF0ZVRyYW5zcG9ydCIsImhvc3QiLCJwb3J0Iiwic2VjdXJlIiwiYXV0aCIsInVzZXIiLCJwYXNzIiwibG9nZ2VyIiwiZGVidWciLCJQT1NUIiwicmVxdWVzdCIsInRvIiwiYnVkZ2V0IiwiY3VycmVuY3kiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3RhdHVzIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwic3ViamVjdCIsImh0bWwiLCJyZXN1bHQiLCJzZW5kTWFpbCIsIm1lc3NhZ2VJZCIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/sendBudgetAlertEmail/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendBudgetAlertEmail%2Froute&page=%2Fapi%2FsendBudgetAlertEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendBudgetAlertEmail%2Froute.ts&appDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendBudgetAlertEmail%2Froute&page=%2Fapi%2FsendBudgetAlertEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendBudgetAlertEmail%2Froute.ts&appDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_HTML_CSS_WEB_DEV_COURSE_H_React_Hackathon_try_try1_expense_tracker_app_api_sendBudgetAlertEmail_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/sendBudgetAlertEmail/route.ts */ \"(rsc)/./app/api/sendBudgetAlertEmail/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/sendBudgetAlertEmail/route\",\n        pathname: \"/api/sendBudgetAlertEmail\",\n        filename: \"route\",\n        bundlePath: \"app/api/sendBudgetAlertEmail/route\"\n    },\n    resolvedPagePath: \"C:\\\\HTML CSS\\\\WEB DEV COURSE H\\\\React\\\\Hackathon\\\\try\\\\try1\\\\expense-tracker\\\\app\\\\api\\\\sendBudgetAlertEmail\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_HTML_CSS_WEB_DEV_COURSE_H_React_Hackathon_try_try1_expense_tracker_app_api_sendBudgetAlertEmail_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZW5kQnVkZ2V0QWxlcnRFbWFpbCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc2VuZEJ1ZGdldEFsZXJ0RW1haWwlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzZW5kQnVkZ2V0QWxlcnRFbWFpbCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDSFRNTCUyMENTUyU1Q1dFQiUyMERFViUyMENPVVJTRSUyMEglNUNSZWFjdCU1Q0hhY2thdGhvbiU1Q3RyeSU1Q3RyeTElNUNleHBlbnNlLXRyYWNrZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNIVE1MJTIwQ1NTJTVDV0VCJTIwREVWJTIwQ09VUlNFJTIwSCU1Q1JlYWN0JTVDSGFja2F0aG9uJTVDdHJ5JTVDdHJ5MSU1Q2V4cGVuc2UtdHJhY2tlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0U7QUFDbko7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXEhUTUwgQ1NTXFxcXFdFQiBERVYgQ09VUlNFIEhcXFxcUmVhY3RcXFxcSGFja2F0aG9uXFxcXHRyeVxcXFx0cnkxXFxcXGV4cGVuc2UtdHJhY2tlclxcXFxhcHBcXFxcYXBpXFxcXHNlbmRCdWRnZXRBbGVydEVtYWlsXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zZW5kQnVkZ2V0QWxlcnRFbWFpbC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NlbmRCdWRnZXRBbGVydEVtYWlsXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zZW5kQnVkZ2V0QWxlcnRFbWFpbC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXEhUTUwgQ1NTXFxcXFdFQiBERVYgQ09VUlNFIEhcXFxcUmVhY3RcXFxcSGFja2F0aG9uXFxcXHRyeVxcXFx0cnkxXFxcXGV4cGVuc2UtdHJhY2tlclxcXFxhcHBcXFxcYXBpXFxcXHNlbmRCdWRnZXRBbGVydEVtYWlsXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendBudgetAlertEmail%2Froute&page=%2Fapi%2FsendBudgetAlertEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendBudgetAlertEmail%2Froute.ts&appDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/nodemailer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendBudgetAlertEmail%2Froute&page=%2Fapi%2FsendBudgetAlertEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendBudgetAlertEmail%2Froute.ts&appDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CHTML%20CSS%5CWEB%20DEV%20COURSE%20H%5CReact%5CHackathon%5Ctry%5Ctry1%5Cexpense-tracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();