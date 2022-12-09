(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-register-reset-password-reset-password-module"],{

/***/ "+xUH":
/*!*************************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/reset-password-routing.module.ts ***!
  \*************************************************************************************/
/*! exports provided: ResetPasswordPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordPageRoutingModule", function() { return ResetPasswordPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _reset_password_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reset-password.page */ "d0ti");




const routes = [
    {
        path: '',
        component: _reset_password_page__WEBPACK_IMPORTED_MODULE_3__["ResetPasswordPage"]
    }
];
let ResetPasswordPageRoutingModule = class ResetPasswordPageRoutingModule {
};
ResetPasswordPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ResetPasswordPageRoutingModule);



/***/ }),

/***/ "2aAE":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/login-register/reset-password/reset-password.page.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"--height: 100% !important;position: fixed;--background:#ffaa00\"  class=\"app-background-mercurius-primary-color\">\n  <ion-grid   class=\"app-background-mercurius-primary-color\"  >\n    <ion-row class=\"ion-justify-content-center\" >\n      <ion-col size=\"1\"><ion-icon (click)=\"signIn()\" class=\"app-font-primary-color\" style=\"font-size: 16px !important;\"  name=\"caret-back-outline\"  ></ion-icon></ion-col>\n      <ion-col size=\"10\" >\n      </ion-col>\n      <ion-col size=\"1\"></ion-col>\n      </ion-row>\n    <ion-row class=\"ion-justify-content-center\" style=\"padding-top: 40px;margin-bottom: 25px;\">\n      <ion-col size=\"1\"></ion-col>\n      <ion-col size=\"10\" >\n        <ion-img alt=\"StraightLines.io\"  style=\"width: 100% !important;\" src=\"assets/img/StraightLines-tagline.png\" ></ion-img>\n      </ion-col>\n      <ion-col size=\"1\"></ion-col>\n  </ion-row>\n\n</ion-grid>\n<ion-grid   class=\" box\" style=\"margin-top:-5px;width: 100% !important;\">\n\n<ion-row  class=\"app-font-primary-color ion-text-center ion-justify-content-center\" style=\"padding: 75px 0px 0px 0px !important;\">\n<ion-col size=\"12\"  class=\"app-font-primary-color ion-text-center ion-justify-content-center\"  >\n  <ion-label style=\"font-size: 20px !important;\" style=\"margin-bottom: 15px;\">\n    <b class=\" app-title\">  Create New Password</b>\n     </ion-label>\n</ion-col>\n</ion-row>\n</ion-grid>\n\n<ion-grid style=\"background-color: white;min-height:100%;margin:0px !important;margin-left: 0px !important;margin-right: 0px;margin-top: -2px !important;\">\n  <form  [formGroup]=\"forgotPassword\" >\n    <!-- Username -->\n\n    <ion-grid class=\"ion-justify-content-center ion-text-center\" >\n      <ion-row lines=\"none\" class=\"app-font-primary-color ion-text-center ion-justify-content-center\">\n\n        <ion-label class=\"data font-size-18px  app-title\" style=\"margin-bottom: 30px;font-size: 14px;\">\n          Set your new password so that you can login and access<br> StraightLines\n        </ion-label>\n      </ion-row>\n    <!-- Password -->\n    <ion-item id=\"register-input-ion-item\" lines=\"none\" class=\"app-font-primary-color \" >\n      <ion-label position=\"stacked\" style=\"font-size: 12px;\">Password</ion-label>\n      <!-- <ion-label>Password</ion-label> -->\n\n      <!-- <ion-icon item-end class=\"hide-option\"  name=\"eye-off-outline\"> -->\n      <ion-input type=\"text\" [class]=\"passWordClass(classId) \" style=\"border-radius: 5px;margin-top: 5px;position: relative;z-index: -1;\" formControlName=\"password\" name=\"password\"\n      [class.is-invalid]=\"password?.invalid && password?.touched\"\n      required>\n\n    </ion-input>\n\n    <!-- <span style=\"position:absolute; right:8px;top:8px;\" class=\"fa fa-user \"></span> -->\n\n    <ion-icon *ngIf=\"hidePassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"passWord()\"  name=\"eye-off-outline\"></ion-icon>\n    <ion-icon *ngIf=\"!hidePassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"passWord()\" name=\"eye-outline\"></ion-icon>\n    <!-- <ion-label><ion-icon class=\"passwordIcon\" style=\"z-index: -1;position: absolute;\"  name=\"eye-off-outline\"></ion-icon></ion-label> -->\n    <!-- </ion-icon> -->\n\n\n</ion-item>\n<div class=\"content-data app-font-red-color\" style=\"text-align: left;margin-left:8%;\" *ngIf=\"password?.touched && password?.errors\">\n  <p class=\"app-font-red-color\" *ngIf=\"password?.errors?.required \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password is required!</p>\n  <p class=\"app-font-red-color\" *ngIf=\"password?.errors?.minlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password must be at 2 characters!</p>\n  <p class=\"app-font-red-color\" *ngIf=\"password?.errors?.maxlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password must be at 64 characters!</p>\n</div>\n    <!-- Confirm-Password -->\n    <ion-item id=\"register-input-ion-item\" lines=\"none\" class=\"app-font-primary-color \" >\n      <ion-label position=\"stacked\" style=\"font-size: 12px;\">Confirm Password</ion-label>\n      <ion-input type=\"text\" [class]=\"confirmPassWordClass(confirmClassId) \" style=\"border-radius: 5px;margin-top: 5px;position: relative;z-index: -1;\"   name=\"confirm-password\" formControlName=\"confirm_password\"\n      required></ion-input>\n      <ion-icon *ngIf=\"hideConfirmPassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"confirm_Password()\"  name=\"eye-off-outline\"></ion-icon>\n      <ion-icon *ngIf=\"!hideConfirmPassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"confirm_Password()\" name=\"eye-outline\"></ion-icon>\n\n  </ion-item>\n\n  <div class=\"content-data app-font-red-color\" style=\"text-align: left;margin-left:8%;\" *ngIf=\"confirm_password.touched && confirm_password.invalid\" >\n    <p class=\"app-font-red-color\" *ngIf=\"confirm_password.errors.required\"><ion-icon name=\"alert-circle-outline\"></ion-icon> Confirm Password is required.</p>\n    <p class=\"app-font-red-color\" *ngIf=\"confirm_password.errors.confirmedValidator\"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password and Confirm Password must be match.</p>\n</div>\n  </ion-grid>\n\n\n\n<ion-row  class=\"ion-justify-content-center\"  id=\"button\">\n<ion-button shape=\"round\"  class=\"app-button-primary \" id=\"get-start\"  *ngIf=\"forgotPassword?.invalid===false \" (click)=\"resetPass(forgotPassword)\" >Reset Password</ion-button>\n<ion-button shape=\"round\"  class=\"app-button-primary \" [disabled]=\"true\" id=\"get-start\"  *ngIf=\"forgotPassword?.invalid || emailValid==true  \" (click)=\"resetPass(forgotPassword)\" >Reset Password</ion-button>\n</ion-row>\n\n\n  </form>\n  <ion-row class=\"ion-justify-content-center data\"  id=\"sign-in\">\n  </ion-row>\n</ion-grid>\n  </ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

/***/ }),

/***/ "EBmS":
/*!*****************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/reset-password.module.ts ***!
  \*****************************************************************************/
/*! exports provided: ResetPasswordPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordPageModule", function() { return ResetPasswordPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _reset_password_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reset-password-routing.module */ "+xUH");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _reset_password_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reset-password.page */ "d0ti");








let ResetPasswordPageModule = class ResetPasswordPageModule {
};
ResetPasswordPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
            _reset_password_routing_module__WEBPACK_IMPORTED_MODULE_5__["ResetPasswordPageRoutingModule"]
        ],
        declarations: [_reset_password_page__WEBPACK_IMPORTED_MODULE_7__["ResetPasswordPage"]]
    })
], ResetPasswordPageModule);



/***/ }),

/***/ "d0ti":
/*!***************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/reset-password.page.ts ***!
  \***************************************************************************/
/*! exports provided: ResetPasswordPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordPage", function() { return ResetPasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_reset_password_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./reset-password.page.html */ "2aAE");
/* harmony import */ var _reset_password_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reset-password.page.scss */ "iBan");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_services_forgot_password_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/forgot-password.service */ "j8Zn");
/* harmony import */ var src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/json/apis.json */ "B+pZ");
var src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! src/app/json/apis.json */ "B+pZ", 1);
/* harmony import */ var src_app_services_login_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/login.service */ "EFyh");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_10__);











let ResetPasswordPage = class ResetPasswordPage {
    constructor(navCtrl, fb, actRoute, loginSer, forgot_pass) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.actRoute = actRoute;
        this.loginSer = loginSer;
        this.forgot_pass = forgot_pass;
        this.hidePassword = true;
        this.hideConfirmPassword = true;
        this.classId = 0;
        this.confirmClassId = 0;
        this.actRoute.queryParams.subscribe(params => {
            this.email_id_for_reset_password = params.email;
            this.token_for_reset_password = params.verificationcode;
        });
    }
    ngOnInit() {
        this.actRoute.queryParams.subscribe(params => {
            this.email_id_for_reset_password = params.email;
            this.token_for_reset_password = params.verificationcode;
        });
        this.getUserData(this.email_id_for_reset_password);
        this.forgotPassword = this.fb.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.email_id_for_reset_password, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(64)])),
            confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
        }, {
            validator: this.ConfirmedValidator('password', 'confirm_password')
        });
        this.forgot_pass.emailVerify(this.email_id_for_reset_password).subscribe((response) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        }), (error) => {
            this.errorMsg = error.error.text;
            this.url_token = this.errorMsg;
            if (String(this.url_token) == "Invalid email id.") {
                this.emailValid = true;
            }
            else {
                this.emailValid = false;
            }
        }, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        }));
    }
    getUserData(email) {
        var getUserData = { "username": email };
        this.loginSer.getUserAllDetails(getUserData).subscribe((respons) => {
            if (respons) {
                this.forgot_pass.verifyEmailForFP(this.token_for_reset_password).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    this.email_is_verfied = res;
                    if (this.email_is_verfied == false) {
                        this.navCtrl.navigateBack([src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_8__.apis.login_api]);
                    }
                    else {
                        this.loginSer.getUserAllDetails({ "username": email }).subscribe((res) => {
                            var temp;
                            temp = res;
                            this.tokenforresetPassword = temp.token;
                        }, (err) => { }, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                        }));
                    }
                }), (error) => {
                    this.errorMsg = error;
                }, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                }));
            }
        }, (error) => {
            this.errorMsg = error;
            console.log(this.errorMsg);
        }, () => {
        });
    }
    signIn() {
        this.navCtrl.navigateBack(src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_8__.apis.login_api);
    }
    ConfirmedValidator(controlName, matchingControlName) {
        return (formGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    }
    get email() {
        return this.forgotPassword.get('email');
    }
    get password() {
        return this.forgotPassword.get('password');
    }
    get confirm_password() {
        return this.forgotPassword.get('confirm_password');
    }
    // focusOut(){
    // var email=this.forgotPassword.value.email
    // this.forgot_pass.emailVerify(email).subscribe(
    //   async (response)=>{
    //   },
    //   (error: any)=>{
    //     this.errorMsg=error.error.text;
    //     this.url_token=this.errorMsg
    //     if(String(this.url_token)=="Invalid email id."){
    //       this.emailValid=true
    //
    // }
    // if(String(this.url_token).substr(0,47)=="https://18.119.62.157:2020/reset-password?token="){
    //   this.emailValid=false
    // }
    // if(String(this.url_token).substr(0,45)=="https://3.13.254.87:2021/reset-password?token="){
    //   this.emailValid=false
    // }
    // if(String(this.url_token).substr(0,45)=="https://52.14.8.217:2020/reset-password?token="){
    //   this.emailValid=false
    // }
    // if(String(this.url_token).substr(0,47)=="https://3.140.109.198:2020/reset-password?token="){
    //   this.emailValid=false
    // }
    // },
    //     async () => {
    //     }
    //   )
    // }
    changeEmailID() {
        if (this.emailValid == true) {
            return this.emailValid = false;
        }
    }
    passwordChanged(pass) {
        // this.navCtrl.navigateForward('password-changed-message')
    }
    resetPass(pass) {
        this.forgot_pass.updatePass(this.tokenforresetPassword, this.forgotPassword.value.password).subscribe((response) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            sweetalert2__WEBPACK_IMPORTED_MODULE_10___default.a.fire({
                title: 'Success!',
                html: 'Your password changed successfully.',
                icon: 'success',
                showCancelButton: false,
                imageHeight: '250px',
                heightAuto: false,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#ff6700',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.navCtrl.navigateBack(src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_8__.apis.login_api);
                }
            });
        }), (error) => {
            this.errorMsg = error;
            if (this.errorMsg.error.text == 'Your password successfully updated.' && this.errorMsg.status == 200) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_10___default.a.fire({
                    title: 'Success!',
                    html: 'Your password changed successfully.',
                    icon: 'success',
                    showCancelButton: false,
                    imageHeight: '250px',
                    heightAuto: false,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#ff6700',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.navCtrl.navigateBack(src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_8__.apis.login_api);
                    }
                });
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_10___default.a.fire({
                    title: 'Error!',
                    html: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    showCancelButton: false,
                    imageHeight: '250px',
                    heightAuto: false,
                    confirmButtonColor: '#FF0000',
                }).then((result) => {
                    this.ngOnInit();
                });
            }
        }, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        }));
    }
    confirm_Password() {
        if (this.hideConfirmPassword == true) {
            this.hideConfirmPassword = false, this.confirmClassId = 1;
        }
        else {
            this.hideConfirmPassword = true, this.confirmClassId = 0;
        }
        return this.hideConfirmPassword, this.confirmClassId;
    }
    passWord() {
        if (this.hidePassword == true) {
            return this.hidePassword = false, this.classId = 1;
        }
        else {
            return this.hidePassword = true, this.classId = 0;
        }
    }
    passWordClass(cId) {
        if (0 == cId) {
            return 'password  form-control app-font-primary-color ion-border-1px-mercurius-secondary-color ion-no-margin ion-no-padding';
        }
        else if (0 != cId) {
            return 'form-control app-font-primary-color ion-border-1px-mercurius-secondary-color ion-no-margin ion-no-padding';
        }
    }
    confirmPassWordClass(cId) {
        if (0 == cId) {
            return 'password  form-control app-font-primary-color ion-border-1px-mercurius-secondary-color ion-no-margin ion-no-padding';
        }
        else if (0 != cId) {
            return 'form-control app-font-primary-color ion-border-1px-mercurius-secondary-colorion-no-margin ion-no-padding';
        }
    }
};
ResetPasswordPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: src_app_services_login_service__WEBPACK_IMPORTED_MODULE_9__["LoginService"] },
    { type: src_app_services_forgot_password_service__WEBPACK_IMPORTED_MODULE_7__["ForgotPasswordService"] }
];
ResetPasswordPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-reset-password',
        template: _raw_loader_reset_password_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_reset_password_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ResetPasswordPage);



/***/ }),

/***/ "iBan":
/*!*****************************************************************************!*\
  !*** ./src/app/home/login-register/reset-password/reset-password.page.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-shape-divider-top-1626281823 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n  line-height: 0;\n  transform: rotate(180deg);\n}\n\n.custom-shape-divider-top-1626281823 svg {\n  position: relative;\n  display: block;\n  width: calc(145% + 1.3px);\n  height: 200px;\n}\n\n.custom-shape-divider-top-1626281823 .shape-fill {\n  fill: #ffaa00;\n}\n\n.box {\n  width: 100%;\n  background-color: #fff;\n  border: solid 0px #ffaa00;\n  border-color: #fff #ffaa00 #ffaa00 #ffaa00;\n  border-radius: 50%/100px 100px 0 0;\n}\n\n#center {\n  margin-top: 20%;\n}\n\n/** For mobile devices **/\n\n@media (max-device-height: 568px) {\n  .custom-shape-divider-top-1626281823 svg {\n    width: calc(146% + 1.3px);\n    height: 95px;\n  }\n\n  #top {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 20%;\n  }\n\n  #center {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 80%;\n    overflow-x: scroll;\n    overflow: hidden;\n    position: fixed;\n  }\n\n  #Sign-Up-title {\n    margin-top: -5%;\n    font-size: 16px;\n    text-align: right;\n  }\n\n  #sign-in {\n    margin-top: 0%;\n    margin-bottom: 5%;\n  }\n\n  #button {\n    margin-top: 0%;\n  }\n\n  #check-box-terms-and-conditions {\n    margin-top: 0%;\n  }\n}\n\n@media (max-device-height: 700px) {\n  .custom-shape-divider-top-1626281823 svg {\n    width: calc(146% + 1.3px);\n    height: 105px;\n  }\n\n  #top {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 20%;\n  }\n\n  #center {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 80%;\n    overflow: hidden;\n    overflow-x: scroll;\n    position: fixed;\n  }\n\n  #sign-in {\n    margin-top: 0%;\n    margin-bottom: 5%;\n  }\n\n  #button {\n    margin-top: 0%;\n  }\n\n  #check-box-terms-and-conditions {\n    margin-top: 0%;\n  }\n}\n\n#Sign-Up-title {\n  padding: 6%;\n  font-size: 38px;\n  text-align: right;\n}\n\n#sign-in {\n  margin-top: 5%;\n}\n\n#button {\n  margin-top: 5%;\n}\n\n#check-box-terms-and-conditions {\n  margin-top: 5%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxccmVzZXQtcGFzc3dvcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxXQUFBO0VBQ0Esc0JBQUE7RUFFQSx5QkFBQTtFQUNBLDBDQUFBO0VBQ0Esa0NBQUE7QUFDRjs7QUFDQTtFQUNBLGVBQUE7QUFFQTs7QUFBQSx5QkFBQTs7QUFRQTtFQUNFO0lBQ0UseUJBQUE7SUFDQSxZQUFBO0VBSkY7O0VBT0U7SUFDRSxTQUFBO0lBQVMsV0FBQTtJQUFhLFdBQUE7SUFBWSxXQUFBO0VBRHRDOztFQUdFO0lBQ0UsU0FBQTtJQUFTLFdBQUE7SUFBYSxXQUFBO0lBQ3RCLFdBQUE7SUFDQSxrQkFBQTtJQUNBLGdCQUFBO0lBQ0EsZUFBQTtFQUVKOztFQUFFO0lBQ0UsZUFBQTtJQUNBLGVBQUE7SUFBZ0IsaUJBQUE7RUFJcEI7O0VBRkU7SUFDRSxjQUFBO0lBQ0EsaUJBQUE7RUFLSjs7RUFIRTtJQUNFLGNBQUE7RUFNSjs7RUFKRTtJQUNFLGNBQUE7RUFPSjtBQUNGOztBQUxBO0VBQ0E7SUFDRSx5QkFBQTtJQUNBLGFBQUE7RUFPQTs7RUFKQTtJQUNFLFNBQUE7SUFBUyxXQUFBO0lBQWEsV0FBQTtJQUFZLFdBQUE7RUFVcEM7O0VBUEE7SUFDRSxTQUFBO0lBQVMsV0FBQTtJQUFhLFdBQUE7SUFDdEIsV0FBQTtJQUNBLGdCQUFBO0lBQ0Esa0JBQUE7SUFDQSxlQUFBO0VBWUY7O0VBVEE7SUFDRSxjQUFBO0lBQ0EsaUJBQUE7RUFZRjs7RUFWQTtJQUNFLGNBQUE7RUFhRjs7RUFYQTtJQUNFLGNBQUE7RUFjRjtBQUNGOztBQVpBO0VBQ0EsV0FBQTtFQUFZLGVBQUE7RUFDWixpQkFBQTtBQWVBOztBQWJBO0VBQ0EsY0FBQTtBQWdCQTs7QUFkQTtFQUNBLGNBQUE7QUFpQkE7O0FBZkE7RUFDQSxjQUFBO0FBa0JBIiwiZmlsZSI6InJlc2V0LXBhc3N3b3JkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tc2hhcGUtZGl2aWRlci10b3AtMTYyNjI4MTgyMyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG59XG5cbi5jdXN0b20tc2hhcGUtZGl2aWRlci10b3AtMTYyNjI4MTgyMyBzdmcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogY2FsYygxNDUlICsgMS4zcHgpO1xuICBoZWlnaHQ6IDIwMHB4O1xufVxuXG4uY3VzdG9tLXNoYXBlLWRpdmlkZXItdG9wLTE2MjYyODE4MjMgLnNoYXBlLWZpbGwge1xuICBmaWxsOiAjZmZhYTAwO1xufVxuLmJveCB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAvLyBoZWlnaHQ6IDEwMHB4O1xuICBib3JkZXI6IHNvbGlkIDBweCAjZmZhYTAwO1xuICBib3JkZXItY29sb3I6ICNmZmYgI2ZmYWEwMCAjZmZhYTAwICNmZmFhMDA7XG4gIGJvcmRlci1yYWRpdXM6IDUwJS8xMDBweCAxMDBweCAwIDA7XG59XG4jY2VudGVye1xubWFyZ2luLXRvcDogMjAlO1xufVxuLyoqIEZvciBtb2JpbGUgZGV2aWNlcyAqKi9cbi8vIEBtZWRpYSAobWF4LXdpZHRoOiAzNjVweCkge1xuLy8gICAuY3VzdG9tLXNoYXBlLWRpdmlkZXItdG9wLTE2MjYyODE4MjMgc3ZnIHtcbi8vICAgICAgIHdpZHRoOiBjYWxjKDE0NSUgKyAxLjNweCk7XG4vLyAgICAgICBoZWlnaHQ6IDE4MHB4O1xuLy8gICB9XG4vLyB9XG5cbkBtZWRpYSAobWF4LWRldmljZS1oZWlnaHQ6IDU2OHB4KSB7XG4gIC5jdXN0b20tc2hhcGUtZGl2aWRlci10b3AtMTYyNjI4MTgyMyBzdmcge1xuICAgIHdpZHRoOiBjYWxjKDE0NiUgKyAxLjNweCk7XG4gICAgaGVpZ2h0OiA5NXB4O1xuICAgIH1cblxuICAgICN0b3B7XG4gICAgICBtYXJnaW46MDtwYWRkaW5nOiAwJSA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAyMCU7XG4gICAgfVxuICAgICNjZW50ZXJ7XG4gICAgICBtYXJnaW46MDtwYWRkaW5nOiAwJSA7d2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDgwJTtcbiAgICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgfVxuICAgICNTaWduLVVwLXRpdGxlIHtcbiAgICAgIG1hcmdpbi10b3A6IC01JTtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDt0ZXh0LWFsaWduOiByaWdodDtcbiAgICB9XG4gICAgI3NpZ24taW57XG4gICAgICBtYXJnaW4tdG9wOiAwJTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDUlO1xuICAgIH1cbiAgICAjYnV0dG9ue1xuICAgICAgbWFyZ2luLXRvcDogMCU7XG4gICAgfVxuICAgICNjaGVjay1ib3gtdGVybXMtYW5kLWNvbmRpdGlvbnN7XG4gICAgICBtYXJnaW4tdG9wOiAwJTtcbiAgICB9XG59XG5AbWVkaWEgKG1heC1kZXZpY2UtaGVpZ2h0OiA3MDBweCkge1xuLmN1c3RvbS1zaGFwZS1kaXZpZGVyLXRvcC0xNjI2MjgxODIzIHN2ZyB7XG4gIHdpZHRoOiBjYWxjKDE0NiUgKyAxLjNweCk7XG4gIGhlaWdodDogMTA1cHg7XG4gIH1cblxuICAjdG9we1xuICAgIG1hcmdpbjowO3BhZGRpbmc6IDAlIDt3aWR0aDogMTAwJTtoZWlnaHQ6IDIwJTtcbiAgICAvLyBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gICNjZW50ZXJ7XG4gICAgbWFyZ2luOjA7cGFkZGluZzogMCUgO3dpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogODAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgfVxuXG4gICNzaWduLWlue1xuICAgIG1hcmdpbi10b3A6IDAlO1xuICAgIG1hcmdpbi1ib3R0b206IDUlO1xuICB9XG4gICNidXR0b257XG4gICAgbWFyZ2luLXRvcDogMCU7XG4gIH1cbiAgI2NoZWNrLWJveC10ZXJtcy1hbmQtY29uZGl0aW9uc3tcbiAgICBtYXJnaW4tdG9wOiAwJTtcbiAgfVxufVxuI1NpZ24tVXAtdGl0bGUge1xucGFkZGluZzogNiU7Zm9udC1zaXplOiAzOHB4O1xudGV4dC1hbGlnbjogcmlnaHQ7XG59XG4jc2lnbi1pbntcbm1hcmdpbi10b3A6IDUlO1xufVxuI2J1dHRvbntcbm1hcmdpbi10b3A6IDUlO1xufVxuI2NoZWNrLWJveC10ZXJtcy1hbmQtY29uZGl0aW9uc3tcbm1hcmdpbi10b3A6IDUlO1xufVxuIl19 */");

/***/ })

}]);
//# sourceMappingURL=login-register-reset-password-reset-password-module.js.map