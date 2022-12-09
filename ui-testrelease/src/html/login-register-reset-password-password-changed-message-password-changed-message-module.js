(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-register-reset-password-password-changed-message-password-changed-message-module"],{

/***/ "2FNE":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/login-register/reset-password/password-changed-message/password-changed-message.page.html ***!
  \******************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"--height: 100% !important;position: fixed;--background:#ffaa00\"  class=\"app-background-mercurius-primary-color\">\n  <ion-grid   class=\"app-background-mercurius-primary-color\"  >\n    <ion-row class=\"ion-justify-content-center\" >\n      <ion-col size=\"1\"><ion-icon (click)=\"signIn()\" class=\"app-font-primary-color\" style=\"font-size: 16px !important;\"  name=\"caret-back-outline\"  ></ion-icon></ion-col>\n      <ion-col size=\"10\" >\n      </ion-col>\n      <ion-col size=\"1\"></ion-col>\n      </ion-row>\n    <ion-row class=\"ion-justify-content-center\" style=\"padding-top: 40px;margin-bottom: 25px;\">\n      <ion-col size=\"1\"></ion-col>\n      <ion-col size=\"10\" >\n        <ion-img alt=\"StraightLines.io\"  style=\"width: 100% !important;\" src=\"assets/img/StraightLines-tagline.png\" ></ion-img>\n      </ion-col>\n      <ion-col size=\"1\"></ion-col>\n  </ion-row>\n\n</ion-grid>\n<ion-grid   class=\" box\" style=\"margin-top:-5px;padding: 75px 0px 0px 0px !important;width: 100% !important;\">\n\n<ion-row  >\n<ion-col size=\"12\"  style=\"width: 100% !important;height: 100% !important;\">\n<ion-label></ion-label>\n</ion-col>\n</ion-row>\n</ion-grid>\n\n<ion-grid style=\"background-color: white;min-height:100%;margin:0px !important;margin-left: 0px !important;margin-right: 0px;margin-top: -2px !important;\">\n<ion-row  class=\"ion-justify-content-center\"  id=\"button\">\n  <ion-button shape=\"round\"  class=\"app-button-primary \" id=\"get-start\" (click)=\"signIn()\" >Sign In</ion-button>\n</ion-row>\n  <ion-row class=\"ion-justify-content-center data\"  id=\"sign-in\">\n  </ion-row>\n</ion-grid>\n  </ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

/***/ }),

/***/ "OyB1":
/*!****************************************************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/password-changed-message/password-changed-message.module.ts ***!
  \****************************************************************************************************************/
/*! exports provided: PasswordChangedMessagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordChangedMessagePageModule", function() { return PasswordChangedMessagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _password_changed_message_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./password-changed-message-routing.module */ "wc1o");
/* harmony import */ var _password_changed_message_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./password-changed-message.page */ "gcp/");







let PasswordChangedMessagePageModule = class PasswordChangedMessagePageModule {
};
PasswordChangedMessagePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _password_changed_message_routing_module__WEBPACK_IMPORTED_MODULE_5__["PasswordChangedMessagePageRoutingModule"]
        ],
        declarations: [_password_changed_message_page__WEBPACK_IMPORTED_MODULE_6__["PasswordChangedMessagePage"]]
    })
], PasswordChangedMessagePageModule);



/***/ }),

/***/ "gcp/":
/*!**************************************************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/password-changed-message/password-changed-message.page.ts ***!
  \**************************************************************************************************************/
/*! exports provided: PasswordChangedMessagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordChangedMessagePage", function() { return PasswordChangedMessagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_password_changed_message_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./password-changed-message.page.html */ "2FNE");
/* harmony import */ var _password_changed_message_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./password-changed-message.page.scss */ "hMsI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/json/apis.json */ "B+pZ");
var src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! src/app/json/apis.json */ "B+pZ", 1);






let PasswordChangedMessagePage = class PasswordChangedMessagePage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ngOnInit() {
    }
    signIn() {
        this.navCtrl.navigateBack(src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_5__.apis.login_api);
    }
};
PasswordChangedMessagePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] }
];
PasswordChangedMessagePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-password-changed-message',
        template: _raw_loader_password_changed_message_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_password_changed_message_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PasswordChangedMessagePage);



/***/ }),

/***/ "hMsI":
/*!****************************************************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/password-changed-message/password-changed-message.page.scss ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-shape-divider-bottom-1626277749 {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n  line-height: 0;\n}\n\n.custom-shape-divider-bottom-1626277749 svg {\n  position: relative;\n  display: block;\n  width: calc(170% + 1.3px);\n  height: 227px;\n}\n\n.box {\n  width: 100%;\n  background-color: #fff;\n  border: solid 0px #ffaa00;\n  border-color: #fff #ffaa00 #ffaa00 #ffaa00;\n  border-radius: 50%/100px 100px 0 0;\n}\n\n.custom-shape-divider-bottom-1626277749 .shape-fill {\n  fill: #ffaa00;\n}\n\n@media (min-device-height: 700px) {\n  #wo {\n    height: 300px;\n  }\n\n  #top {\n    margin: 0;\n    padding: 0% 0% 0% 0%;\n    width: 100%;\n    height: 40%;\n  }\n\n  #top-woo-hoo {\n    margin-top: 25%;\n  }\n\n  #center {\n    height: 25%;\n  }\n\n  #bottom {\n    margin: 0;\n    padding: 0% 0% 0% 0%;\n    width: 100%;\n    bottom: 0% !important;\n    height: 25%;\n    position: fixed;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHBhc3N3b3JkLWNoYW5nZWQtbWVzc2FnZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxXQUFBO0VBQ0Esc0JBQUE7RUFFQSx5QkFBQTtFQUNBLDBDQUFBO0VBQ0Esa0NBQUE7QUFDRjs7QUFDQTtFQUNFLGFBQUE7QUFFRjs7QUE0Q0E7RUFHSTtJQUVNLGFBQUE7RUE1Q1I7O0VBOENJO0lBQ0UsU0FBQTtJQUFTLG9CQUFBO0lBQXFCLFdBQUE7SUFBWSxXQUFBO0VBeENoRDs7RUEwQ0k7SUFDRSxlQUFBO0VBdkNOOztFQXlDSTtJQUNFLFdBQUE7RUF0Q047O0VBd0NJO0lBQ0UsU0FBQTtJQUFTLG9CQUFBO0lBQXFCLFdBQUE7SUFBWSxxQkFBQTtJQUFxQixXQUFBO0lBQVksZUFBQTtFQWhDakY7QUFDRiIsImZpbGUiOiJwYXNzd29yZC1jaGFuZ2VkLW1lc3NhZ2UucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1zaGFwZS1kaXZpZGVyLWJvdHRvbS0xNjI2Mjc3NzQ5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBsaW5lLWhlaWdodDogMDtcbn1cblxuLmN1c3RvbS1zaGFwZS1kaXZpZGVyLWJvdHRvbS0xNjI2Mjc3NzQ5IHN2ZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiBjYWxjKDE3MCUgKyAxLjNweCk7XG4gIGhlaWdodDogMjI3cHg7XG59XG4uYm94IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIC8vIGhlaWdodDogMTAwcHg7XG4gIGJvcmRlcjogc29saWQgMHB4ICNmZmFhMDA7XG4gIGJvcmRlci1jb2xvcjogI2ZmZiAjZmZhYTAwICNmZmFhMDAgI2ZmYWEwMDtcbiAgYm9yZGVyLXJhZGl1czogNTAlLzEwMHB4IDEwMHB4IDAgMDtcbn1cbi5jdXN0b20tc2hhcGUtZGl2aWRlci1ib3R0b20tMTYyNjI3Nzc0OSAuc2hhcGUtZmlsbCB7XG4gIGZpbGw6ICNmZmFhMDA7XG59XG5cbi8vIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OjgwMHB4KSB7XG4vLyAgICN3b3tcbi8vICAgICAvLyAgaGVpZ2h0OiAyOTAuMTgzO1xuLy8gICAgIGhlaWdodDogMjkwcHg7XG4vLyAgICAgfVxuLy8gICAgICN0b3Atd29vLWhvb3tcbi8vICAgICAgIG1hcmdpbi10b3A6IDAlO1xuLy8gICAgICAgYm9yZGVyOiAxcHggc29saWQ7XG4vLyAgICAgfVxuLy8gI3RvcHtcbi8vICAgbWFyZ2luOjA7cGFkZGluZzogMCUgMCUgMCUgMCU7d2lkdGg6IDEwMCU7aGVpZ2h0OiA0MCU7XG4vLyB9XG4vLyAjY2VudGVye1xuLy8gICBoZWlnaHQ6MjUlXG4vLyB9XG4vLyAjYm90dG9te1xuLy8gICBtYXJnaW46MDtwYWRkaW5nOiAwJSAwJSAwJSAwJTt3aWR0aDogMTAwJTtib3R0b206MCUgIWltcG9ydGFudDtoZWlnaHQ6IDIwJTtcbi8vIH1cblxuLy8gfVxuXG4vLyBAbWVkaWEgKG1pbi13aWR0aDogNzAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkgIHtcbi8vICAgI3dve1xuLy8gICAgIC8vICBoZWlnaHQ6IDI5MC4xODM7XG4vLyAgICAgaGVpZ2h0OiAzMDBweDtcbi8vICAgICB9XG4vLyAjdG9we1xuLy8gICBtYXJnaW46MDtwYWRkaW5nOiAwJSAwJSAwJSAwJTt3aWR0aDogMTAwJTtoZWlnaHQ6IDQwJTtcbi8vIH1cbi8vICN0b3Atd29vLWhvb3tcbi8vICAgbWFyZ2luLXRvcDogMjUlO1xuLy8gfVxuLy8gI2NlbnRlcntcbi8vICAgaGVpZ2h0OjI1JVxuLy8gfVxuLy8gI2JvdHRvbXtcbi8vICAgbWFyZ2luOjA7cGFkZGluZzogMCUgMCUgMCUgMCU7d2lkdGg6IDEwMCU7Ym90dG9tOjAlICFpbXBvcnRhbnQ7aGVpZ2h0OiAyNSU7cG9zaXRpb246IGZpeGVkO1xuLy8gfVxuXG4vLyB9XG5cblxuXG5AbWVkaWFcblxuICAobWluLWRldmljZS1oZWlnaHQ6IDcwMHB4KSB7XG4gICAgI3dve1xuICAgICAgICAgIC8vICBoZWlnaHQ6IDI5MC4xODM7XG4gICAgICAgICAgaGVpZ2h0OiAzMDBweDtcbiAgICAgICAgICB9XG4gICAgICAjdG9we1xuICAgICAgICBtYXJnaW46MDtwYWRkaW5nOiAwJSAwJSAwJSAwJTt3aWR0aDogMTAwJTtoZWlnaHQ6IDQwJTtcbiAgICAgIH1cbiAgICAgICN0b3Atd29vLWhvb3tcbiAgICAgICAgbWFyZ2luLXRvcDogMjUlO1xuICAgICAgfVxuICAgICAgI2NlbnRlcntcbiAgICAgICAgaGVpZ2h0OjI1JVxuICAgICAgfVxuICAgICAgI2JvdHRvbXtcbiAgICAgICAgbWFyZ2luOjA7cGFkZGluZzogMCUgMCUgMCUgMCU7d2lkdGg6IDEwMCU7Ym90dG9tOjAlICFpbXBvcnRhbnQ7aGVpZ2h0OiAyNSU7cG9zaXRpb246IGZpeGVkO1xuICAgICAgfVxufVxuIl19 */");

/***/ }),

/***/ "wc1o":
/*!************************************************************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/password-changed-message/password-changed-message-routing.module.ts ***!
  \************************************************************************************************************************/
/*! exports provided: PasswordChangedMessagePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordChangedMessagePageRoutingModule", function() { return PasswordChangedMessagePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _password_changed_message_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./password-changed-message.page */ "gcp/");




const routes = [
    {
        path: '',
        component: _password_changed_message_page__WEBPACK_IMPORTED_MODULE_3__["PasswordChangedMessagePage"]
    }
];
let PasswordChangedMessagePageRoutingModule = class PasswordChangedMessagePageRoutingModule {
};
PasswordChangedMessagePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PasswordChangedMessagePageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=login-register-reset-password-password-changed-message-password-changed-message-module.js.map