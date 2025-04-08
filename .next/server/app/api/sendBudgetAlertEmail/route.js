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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n// /api/sendBudgetAlertEmail.ts\n\n\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_1__.createTransport({\n    host: \"sandbox.smtp.mailtrap.io\",\n    port: 2525,\n    secure: false,\n    auth: {\n        user: \"14616f6211aaa9\",\n        pass: \"11c0c2ccd09121\"\n    },\n    logger: true,\n    debug: true\n});\nasync function POST(request) {\n    // Now we destructure \"message\" along with the other parameters\n    const { to, budget, currency, message } = await request.json();\n    console.log(\"📧 Sending budget alert email to:\", to);\n    if (!to) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Recipient email is missing\"\n        }, {\n            status: 400\n        });\n    }\n    // Determine subject and HTML content based on the provided message\n    let subject = \"\";\n    let htmlContent = \"\";\n    if (message.includes(\"50%\") || message.includes(\"50\")) {\n        subject = \"⚠️ Budget Alert - 50% of Budget Used\";\n        htmlContent = `\n      <div style=\"font-family: Arial, sans-serif; color: #333;\">\n        <h2 style=\"color: #e63946;\">🚨 50% Budget Alert!</h2>\n        <p>Hi there,</p>\n        <p>${message}</p>\n        <hr />\n        <small>This is an automated message from PennyFlow. Do not reply.</small>\n      </div>\n    `;\n    } else {\n        subject = \"💸 Budget Alert - You’ve Exceeded Your Monthly Limit!\";\n        htmlContent = `\n      <div style=\"font-family: Arial, sans-serif; color: #333;\">\n        <h2 style=\"color: #e63946;\">🚨 Budget Alert!</h2>\n        <p>Hi there,</p>\n        <p>${message}</p>\n        <hr />\n        <small>This is an automated message from PennyFlow. Do not reply.</small>\n      </div>\n    `;\n    }\n    try {\n        const mailOptions = {\n            from: '\"PennyFlow\" <noreply@pennyflow.com>',\n            to,\n            subject,\n            html: htmlContent\n        };\n        console.log(\"📧 Sending email with options:\", mailOptions);\n        const result = await transporter.sendMail(mailOptions);\n        console.log(\"✅ Email sent:\", result.messageId);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            messageId: result.messageId\n        });\n    } catch (error) {\n        console.error(\"❌ Error sending email:\", error?.message || error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to send email\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlbmRCdWRnZXRBbGVydEVtYWlsL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUErQjtBQUNZO0FBQ1A7QUFFcEMsTUFBTUUsY0FBY0QsdURBQTBCLENBQUM7SUFDN0NHLE1BQU07SUFDTkMsTUFBTTtJQUNOQyxRQUFRO0lBQ1JDLE1BQU07UUFDSkMsTUFBTTtRQUNOQyxNQUFNO0lBQ1I7SUFDQUMsUUFBUTtJQUNSQyxPQUFPO0FBQ1Q7QUFFTyxlQUFlQyxLQUFLQyxPQUFnQjtJQUN6QywrREFBK0Q7SUFDL0QsTUFBTSxFQUFFQyxFQUFFLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxPQUFPLEVBQUUsR0FBRyxNQUFNSixRQUFRSyxJQUFJO0lBQzVEQyxRQUFRQyxHQUFHLENBQUMscUNBQXFDTjtJQUVqRCxJQUFJLENBQUNBLElBQUk7UUFDUCxPQUFPZCxxREFBWUEsQ0FBQ2tCLElBQUksQ0FDdEI7WUFBRUcsT0FBTztRQUE2QixHQUN0QztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7SUFFQSxtRUFBbUU7SUFDbkUsSUFBSUMsVUFBVTtJQUNkLElBQUlDLGNBQWM7SUFFbEIsSUFBSVAsUUFBUVEsUUFBUSxDQUFDLFVBQVVSLFFBQVFRLFFBQVEsQ0FBQyxPQUFPO1FBQ3JERixVQUFVO1FBQ1ZDLGNBQWMsQ0FBQzs7OztXQUlSLEVBQUVQLFFBQVE7Ozs7SUFJakIsQ0FBQztJQUNILE9BQU87UUFDTE0sVUFBVTtRQUNWQyxjQUFjLENBQUM7Ozs7V0FJUixFQUFFUCxRQUFROzs7O0lBSWpCLENBQUM7SUFDSDtJQUVBLElBQUk7UUFDRixNQUFNUyxjQUFjO1lBQ2xCQyxNQUFNO1lBQ05iO1lBQ0FTO1lBQ0FLLE1BQU1KO1FBQ1I7UUFDQUwsUUFBUUMsR0FBRyxDQUFDLGtDQUFrQ007UUFFOUMsTUFBTUcsU0FBUyxNQUFNM0IsWUFBWTRCLFFBQVEsQ0FBQ0o7UUFDMUNQLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUJTLE9BQU9FLFNBQVM7UUFDN0MsT0FBTy9CLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQUVhLFdBQVdGLE9BQU9FLFNBQVM7UUFBQztJQUN6RCxFQUFFLE9BQU9WLE9BQVk7UUFDbkJGLFFBQVFFLEtBQUssQ0FBQywwQkFBMEJBLE9BQU9KLFdBQVdJO1FBQzFELE9BQU9yQixxREFBWUEsQ0FBQ2tCLElBQUksQ0FDdEI7WUFBRUcsT0FBT0EsTUFBTUosT0FBTyxJQUFJO1FBQXVCLEdBQ2pEO1lBQUVLLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcSFRNTCBDU1NcXFdFQiBERVYgQ09VUlNFIEhcXFJlYWN0XFxIYWNrYXRob25cXHRyeVxcdHJ5MVxcZXhwZW5zZS10cmFja2VyXFxhcHBcXGFwaVxcc2VuZEJ1ZGdldEFsZXJ0RW1haWxcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC9hcGkvc2VuZEJ1ZGdldEFsZXJ0RW1haWwudHNcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCI7XHJcblxyXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICBob3N0OiBcInNhbmRib3guc210cC5tYWlsdHJhcC5pb1wiLFxyXG4gIHBvcnQ6IDI1MjUsXHJcbiAgc2VjdXJlOiBmYWxzZSxcclxuICBhdXRoOiB7XHJcbiAgICB1c2VyOiBcIjE0NjE2ZjYyMTFhYWE5XCIsXHJcbiAgICBwYXNzOiBcIjExYzBjMmNjZDA5MTIxXCIsXHJcbiAgfSxcclxuICBsb2dnZXI6IHRydWUsXHJcbiAgZGVidWc6IHRydWUsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIC8vIE5vdyB3ZSBkZXN0cnVjdHVyZSBcIm1lc3NhZ2VcIiBhbG9uZyB3aXRoIHRoZSBvdGhlciBwYXJhbWV0ZXJzXHJcbiAgY29uc3QgeyB0bywgYnVkZ2V0LCBjdXJyZW5jeSwgbWVzc2FnZSB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgY29uc29sZS5sb2coXCLwn5OnIFNlbmRpbmcgYnVkZ2V0IGFsZXJ0IGVtYWlsIHRvOlwiLCB0byk7XHJcblxyXG4gIGlmICghdG8pIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJSZWNpcGllbnQgZW1haWwgaXMgbWlzc2luZ1wiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIERldGVybWluZSBzdWJqZWN0IGFuZCBIVE1MIGNvbnRlbnQgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG1lc3NhZ2VcclxuICBsZXQgc3ViamVjdCA9IFwiXCI7XHJcbiAgbGV0IGh0bWxDb250ZW50ID0gXCJcIjtcclxuXHJcbiAgaWYgKG1lc3NhZ2UuaW5jbHVkZXMoXCI1MCVcIikgfHwgbWVzc2FnZS5pbmNsdWRlcyhcIjUwXCIpKSB7XHJcbiAgICBzdWJqZWN0ID0gXCLimqDvuI8gQnVkZ2V0IEFsZXJ0IC0gNTAlIG9mIEJ1ZGdldCBVc2VkXCI7XHJcbiAgICBodG1sQ29udGVudCA9IGBcclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgY29sb3I6ICMzMzM7XCI+XHJcbiAgICAgICAgPGgyIHN0eWxlPVwiY29sb3I6ICNlNjM5NDY7XCI+8J+aqCA1MCUgQnVkZ2V0IEFsZXJ0ITwvaDI+XHJcbiAgICAgICAgPHA+SGkgdGhlcmUsPC9wPlxyXG4gICAgICAgIDxwPiR7bWVzc2FnZX08L3A+XHJcbiAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgPHNtYWxsPlRoaXMgaXMgYW4gYXV0b21hdGVkIG1lc3NhZ2UgZnJvbSBQZW5ueUZsb3cuIERvIG5vdCByZXBseS48L3NtYWxsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN1YmplY3QgPSBcIvCfkrggQnVkZ2V0IEFsZXJ0IC0gWW914oCZdmUgRXhjZWVkZWQgWW91ciBNb250aGx5IExpbWl0IVwiO1xyXG4gICAgaHRtbENvbnRlbnQgPSBgXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGNvbG9yOiAjMzMzO1wiPlxyXG4gICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjZTYzOTQ2O1wiPvCfmqggQnVkZ2V0IEFsZXJ0ITwvaDI+XHJcbiAgICAgICAgPHA+SGkgdGhlcmUsPC9wPlxyXG4gICAgICAgIDxwPiR7bWVzc2FnZX08L3A+XHJcbiAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgPHNtYWxsPlRoaXMgaXMgYW4gYXV0b21hdGVkIG1lc3NhZ2UgZnJvbSBQZW5ueUZsb3cuIERvIG5vdCByZXBseS48L3NtYWxsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgIGZyb206ICdcIlBlbm55Rmxvd1wiIDxub3JlcGx5QHBlbm55Zmxvdy5jb20+JyxcclxuICAgICAgdG8sXHJcbiAgICAgIHN1YmplY3QsXHJcbiAgICAgIGh0bWw6IGh0bWxDb250ZW50LFxyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKFwi8J+TpyBTZW5kaW5nIGVtYWlsIHdpdGggb3B0aW9uczpcIiwgbWFpbE9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxuICAgIGNvbnNvbGUubG9nKFwi4pyFIEVtYWlsIHNlbnQ6XCIsIHJlc3VsdC5tZXNzYWdlSWQpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZUlkOiByZXN1bHQubWVzc2FnZUlkIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3Igc2VuZGluZyBlbWFpbDpcIiwgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIHNlbmQgZW1haWxcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJub2RlbWFpbGVyIiwidHJhbnNwb3J0ZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJob3N0IiwicG9ydCIsInNlY3VyZSIsImF1dGgiLCJ1c2VyIiwicGFzcyIsImxvZ2dlciIsImRlYnVnIiwiUE9TVCIsInJlcXVlc3QiLCJ0byIsImJ1ZGdldCIsImN1cnJlbmN5IiwibWVzc2FnZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzdGF0dXMiLCJzdWJqZWN0IiwiaHRtbENvbnRlbnQiLCJpbmNsdWRlcyIsIm1haWxPcHRpb25zIiwiZnJvbSIsImh0bWwiLCJyZXN1bHQiLCJzZW5kTWFpbCIsIm1lc3NhZ2VJZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/sendBudgetAlertEmail/route.ts\n");

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