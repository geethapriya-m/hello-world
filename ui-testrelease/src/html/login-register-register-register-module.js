(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-register-register-register-module"],{

/***/ "I3dt":
/*!*************************************************************************!*\
  !*** ./src/app/home/login-register/register/register-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: RegisterPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageRoutingModule", function() { return RegisterPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register.page */ "jdYH");




const routes = [
    {
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_3__["RegisterPage"]
    },
];
let RegisterPageRoutingModule = class RegisterPageRoutingModule {
};
RegisterPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RegisterPageRoutingModule);



/***/ }),

/***/ "NVgD":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/login-register/register/register.page.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"--height: 100% !important;position: fixed;\"  class=\"app-background-mercurius-primary-color\">\n    <ion-grid   class=\"app-background-mercurius-primary-color\" >\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-col size=\"1\"><ion-icon class=\"app-font-primary-color\" style=\"font-size: 16px !important;\"  name=\"caret-back-outline\"  (click)=\"signIn()\"></ion-icon></ion-col>\n        <ion-col size=\"10\" >\n          <ion-img alt=\"StraightLines.io\"  style=\"width: 100% !important;\" src=\"assets/img/StraightLines-tagline.png\" ></ion-img>\n        </ion-col>\n        <ion-col size=\"1\"></ion-col>\n    </ion-row>\n\n</ion-grid>\n<ion-grid   class=\"app-background-mercurius-primary-color\" style=\"min-height:100%;margin-top:-5px;z-index: -1 !important;position: absolute;padding: 100px 0px 0px 0px !important;width: 100% !important;\">\n\n<ion-row style=\"height: 300px !important;width: 100% !important;\" class=\"app-background-mercurius-primary-color\">\n<ion-col size=\"12\" class=\"app-background-mercurius-primary-color\" style=\"width: 100% !important;height: 100% !important;\">\n<ion-label></ion-label>\n</ion-col>\n</ion-row>\n</ion-grid>\n\n<ion-grid style=\"background-color: white;min-height:100%;margin:0px !important;border-top-left-radius: 15% !important;border-top-right-radius: 15%;z-index: 2 !important;position: relative;margin-left: 0px !important;margin-right: 0px;margin-top: 120px !important;\">\n\n\n\n\n\n\n    <ion-grid   class=\"data  app-font-primary-color ion-text-center ion-justify-content-center\" style=\"height: 100% auto;margin-left:0px 10px !important;z-index: 10 !important;margin-top: -100px !important;position: relative !important ;\">\n<ion-card style=\"border-radius:10px ;\">\n      <form [formGroup]=\"registrationForm\" >\n        <!-- Username -->\n\n        <ion-grid class=\"ion-justify-content-center ion-text-center\" >\n          <ion-row     id=\"Sign-Up-title\" >\n            <ion-col size=\"12\" class=\"ion-text-center\">\n              <ion-label><b class=\"app-font-primary-color app-title\" style=\"font-size: 32px;\">Sign Up</b></ion-label>\n            </ion-col>\n          </ion-row>\n        <!-- Fullname -->\n        <ion-item id=\"register-input-ion-item\" class=\"app-font-primary-color \" lines=\"none\" >\n          <ion-row>\n            <ion-col size=\"6\">\n              <ion-label position=\"stacked\">First Name</ion-label>\n              <ion-input type=\"text\"  :clear-input=\"true\" (keyup.enter)=\"gotoNextField(lastName)\" style=\"border-radius: 5px;margin-top: 5px;\" class=\"ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding app-font-primary-color\" formControlName=\"firstname\" name=\"firstname\"\n              [class.is-invalid]=\"firstname?.invalid && firstname?.touched\"\n              required></ion-input>\n              <div class=\"content-data app-font-red-color\" style=\"text-align: left;\" *ngIf=\"firstname?.touched && firstname?.errors\">\n                <p class=\"app-font-red-color\" *ngIf=\"firstname?.errors?.required \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Firstname is required!</p>\n                <p class=\"app-font-red-color\" *ngIf=\"firstname?.errors?.minlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Firstname must be at least 2 characters long!</p>\n                <p class=\"app-font-red-color\" *ngIf=\"firstname?.errors?.maxlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Firstname can't be longer than 64 characters!</p>\n              </div>\n            </ion-col>\n            <ion-col size=\"6\">\n              <ion-label position=\"stacked\">Last Name</ion-label>\n          <!-- <ion-input type=\"text\" class=\"ion-no-margin ion-no-padding\" formControlName=\"fullname\" name=\"fullname\"\n          [class.is-invalid]=\"fullname?.invalid && fullname?.touched\"\n          required></ion-input> -->\n          <ion-input type=\"text\" :clear-input=\"true\" (keyup.enter)=\"gotoNextField(emAil)\" #lastName style=\"border-radius: 5px;margin-top: 5px;\" class=\"ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding app-font-primary-color\" formControlName=\"lastname\" name=\"lastname\"\n          [class.is-invalid]=\"lastname?.invalid && lastname?.touched\"\n          required></ion-input>\n          <div class=\"content-data app-font-red-color\" style=\"text-align: left;\" *ngIf=\"lastname?.touched && lastname?.errors\">\n            <p class=\"app-font-red-color\" *ngIf=\"lastname?.errors?.required \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Lastname is required!</p>\n            <p class=\"app-font-red-color\" *ngIf=\"lastname?.errors?.minlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Lastname must be at least 2 characters long!</p>\n            <p class=\"app-font-red-color\" *ngIf=\"lastname?.errors?.maxlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Lastname can't be longer than 64 characters!</p>\n          </div>\n            </ion-col>\n          </ion-row>\n\n        </ion-item>\n\n        <!-- Email -->\n        <ion-item id=\"register-input-ion-item\" lines=\"none\"   class=\"app-font-primary-color\" >\n          <ion-label position=\"stacked\">Email</ion-label>\n          <ion-input type=\"email\" clear-input=\"true\" (focusout)=\"emailFocusOut()\" (keyup.enter)=\"gotoNextField(pHone)\" #emAil style=\"border-radius: 5px;margin-top: 5px;\" class=\" ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding app-font-primary-color\" formControlName=\"email\" name=\"email\"\n          [class.is-invalid]=\"email?.invalid && email?.touched\"\n          required></ion-input>\n          <div class=\"content-data app-font-red-color\" style=\"text-align: left;\" *ngIf=\"email?.touched && email?.errors\">\n            <p class=\"app-font-red-color\" *ngIf=\"email?.errors?.required \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Email is required!</p>\n            <p class=\"app-font-red-color\" *ngIf=\"email?.errors?.minlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Email must be at least 6 characters long!</p>\n\n            <p class=\"app-font-red-color\" *ngIf=\"email?.errors?.pattern \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Enter a valid email!</p>\n          </div>\n        <div  class=\"content-data app-font-red-color\" style=\"text-align: left;\">\n          <p class=\"app-font-red-color\" *ngIf=\"emailValid==true\"><ion-icon name=\"alert-circle-outline\"></ion-icon>Account already exists!!</p>\n        </div>\n        </ion-item>\n        <!-- Phone -->\n        <ion-item lines=\"none\" id=\"register-input-ion-item\" class=\"app-font-primary-color \" >\n          <ion-label position=\"stacked\">Phone</ion-label>\n           <ion-input type=\"number\" :clear-input=\"true\" (focusout)=\"phoneFocusOut()\" (keyup)=\"changePhoneValue()\" (keyup.enter)=\"gotoNextField(paSSword)\" #pHone class=\"ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding\" style=\"border-radius: 5px;margin-top: 5px;--background:white\" formControlName=\"phone\" name=\"phone\"\n           [class.is-invalid]=\"phone?.invalid \"></ion-input>\n           <div class=\"content-data app-font-red-color\" style=\"text-align: left;\" *ngIf=\" phone?.errors\">\n            <p class=\"app-font-red-color\" *ngIf=\"phone?.errors?.pattern \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Enter a valid phone!</p>\n             <p class=\"app-font-red-color\" *ngIf=\"phone?.errors?.minlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Phone must be at least 10 characters long!</p>\n             <p class=\"app-font-red-color\" *ngIf=\"phone?.errors?.maxlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Phone must be at least 10 characters long!</p>\n           </div>\n           <div  class=\"content-data app-font-red-color\" style=\"text-align: left;\">\n            <p class=\"app-font-red-color\" *ngIf=\"phoneValid==true\"><ion-icon name=\"alert-circle-outline\"></ion-icon>Phone number already exists!!</p>\n          </div>\n         </ion-item>\n        <!-- Password -->\n        <ion-item id=\"register-input-ion-item\" lines=\"none\" class=\"app-font-primary-color \" >\n          <ion-label position=\"stacked\">Password</ion-label>\n          <ion-input type=\"text\" [class]=\"passWordClass(classId) \" (focusin)=\"clearInputPassword($event)\" (keyup.enter)=\"gotoNextField(conPass)\" #paSSword style=\"border-radius: 5px;margin-top: 5px;position: relative;z-index: -1;\" formControlName=\"password\" name=\"password\"\n          [class.is-invalid]=\"password?.invalid && password?.touched\"\n          required>\n        </ion-input>\n        <ion-icon *ngIf=\"hidePassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"passWord()\"  name=\"eye-off-outline\"></ion-icon>\n        <ion-icon *ngIf=\"!hidePassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"passWord()\" name=\"eye-outline\"></ion-icon>\n    </ion-item>\n    <div class=\"content-data app-font-red-color\" style=\"text-align: left;margin-left:8%;\" *ngIf=\"password?.touched && password?.errors\">\n      <p class=\"app-font-red-color\" *ngIf=\"password?.errors?.required \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password is required!</p>\n      <p class=\"app-font-red-color\" *ngIf=\"password?.errors?.minlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password must be at 2 characters!</p>\n      <p class=\"app-font-red-color\" *ngIf=\"password?.errors?.maxlength \"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password must be at 64 characters!</p>\n    </div>\n        <!-- Confirm-Password -->\n        <ion-item id=\"register-input-ion-item\" lines=\"none\" class=\"app-font-primary-color \" >\n          <ion-label position=\"stacked\">Confirm Password</ion-label>\n          <ion-input type=\"text\" (focusin)=\"clearInputCoPassword($event)\" [class]=\"confirmPassWordClass(confirmClassId) \" #conPass  style=\"border-radius: 5px;margin-top: 5px;position: relative;z-index: -1;\"   name=\"confirm-password\" formControlName=\"confirm_password\"\n          required></ion-input>\n          <ion-icon *ngIf=\"hideConfirmPassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"confirm_Password()\"  name=\"eye-off-outline\"></ion-icon>\n          <ion-icon *ngIf=\"!hideConfirmPassword\" class=\"app-font-primary-color\" style=\"position:absolute; right:6%;font-size: 20px;bottom: 10px;z-index: 1;\" (click)=\"confirm_Password()\" name=\"eye-outline\"></ion-icon>\n      </ion-item>\n      <div class=\"content-data app-font-red-color\" style=\"text-align: left;margin-left:8%;\" *ngIf=\"confirm_password.touched && confirm_password.invalid\" >\n        <p class=\"app-font-red-color\" *ngIf=\"confirm_password.errors.required\"><ion-icon name=\"alert-circle-outline\"></ion-icon> Confirm Password is required.</p>\n        <p class=\"app-font-red-color\" *ngIf=\"confirm_password.errors.confirmedValidator\"><ion-icon name=\"alert-circle-outline\"></ion-icon> Password and Confirm Password must be match.</p>\n    </div>\n      </ion-grid>\n    <ion-row  class=\"ion-justify-content-center\"  id=\"button\">\n      <ion-button shape=\"round\" (click)=\"onSubmit(registrationForm)\"  class=\"app-button-primary\" id=\"get-start\" [disabled]=\"registrationForm?.invalid || emailValid==true || phoneValid==true\" >Submit</ion-button>\n    </ion-row>\n      </form>\n    </ion-card>\n    </ion-grid>\n    <ion-row class=\"ion-justify-content-center data\"  id=\"sign-in\">\n      <ion-label style=\"margin-left: 2%;\">Already have an account? <b (click)=\"signIn()\">Sign In</b></ion-label>\n    </ion-row>\n  </ion-grid>\n    </ion-content>\n");

/***/ }),

/***/ "eAfL":
/*!*****************************************************************!*\
  !*** ./src/app/home/login-register/register/register.module.ts ***!
  \*****************************************************************/
/*! exports provided: RegisterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _register_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register-routing.module */ "I3dt");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register.page */ "jdYH");







let RegisterPageModule = class RegisterPageModule {
};
RegisterPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _register_routing_module__WEBPACK_IMPORTED_MODULE_5__["RegisterPageRoutingModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot({ scrollAssist: false }),
        ],
        declarations: [_register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]]
    })
], RegisterPageModule);



/***/ }),

/***/ "jdYH":
/*!***************************************************************!*\
  !*** ./src/app/home/login-register/register/register.page.ts ***!
  \***************************************************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./register.page.html */ "NVgD");
/* harmony import */ var _register_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.page.scss */ "nU2W");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_services_email_validation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/email-validation.service */ "+xEj");
/* harmony import */ var src_app_services_registration_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/registration.service */ "rMDH");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/json/apis.json */ "B+pZ");
var src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! src/app/json/apis.json */ "B+pZ", 1);
/* harmony import */ var src_app_services_phone_verification_phone_verification_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/phone-verification/phone-verification.service */ "mlEv");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_trial_period_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/trial-period.service */ "9dBu");













let RegisterPage = class RegisterPage {
    constructor(navCtrl, fb, route, alertCtrl, trialPeriodSer, register, loadingController, PV, EV) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.route = route;
        this.alertCtrl = alertCtrl;
        this.trialPeriodSer = trialPeriodSer;
        this.register = register;
        this.loadingController = loadingController;
        this.PV = PV;
        this.EV = EV;
        this.checkEmployee = false;
        this.hidePassword = true;
        this.hideConfirmPassword = true;
        this.classId = 0;
        this.confirmClassId = 0;
        this.trialPeriod = 3;
        this.rolid = 3;
        this.route.queryParams.subscribe(params => {
            this.empUser = params.email;
            this.empFname = params.firstname;
            this.empLname = params.lastname;
            this.rolid = params.role;
        });
        if (this.rolid > 3 || this.rolid < 1 || this.rolid == undefined) {
            this.rolid = 3;
        }
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.empUser = params.email;
            this.empFname = params.firstname;
            this.empLname = params.lastname;
            this.rolid = params.role;
            if (this.rolid > 3 || this.rolid < 1 || this.rolid == undefined) {
                this.rolid = 3;
            }
        });
        this.registrationForm = this.fb.group({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            firstname: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(64)])),
            // phone:new FormControl('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
            // username:new FormControl('',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(8)])),
            lastname: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(64)])),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^[0-9]{10}$')])),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(64)])),
            confirm_password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            facilityid: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('198'),
        }, {
            validator: this.ConfirmedValidator('password', 'confirm_password')
        });
        if (this.empUser != undefined && this.empUser != null) {
            this.checkEmployee = true;
            this.registrationForm.controls.email.disable();
            this.registrationForm.controls.email.setValue(this.empUser);
        }
        else {
            this.checkEmployee = false;
            this.registrationForm.controls.email.enable();
        }
        if (this.empFname != undefined && this.empFname != null) {
            this.registrationForm.controls.firstname.disable();
            this.registrationForm.controls.firstname.setValue(this.empFname);
        }
        else {
            this.registrationForm.controls.firstname.enable();
        }
        if (this.empLname != undefined && this.empLname != null) {
            this.registrationForm.controls.lastname.disable();
            this.registrationForm.controls.lastname.setValue(this.empLname);
        }
        else {
            this.registrationForm.controls.lastname.enable();
        }
        this.trialPeriodSer.trialperiod.subscribe(trialPeriod => {
            this.trialPeriod = trialPeriod;
        });
        if (this.trialPeriod == undefined || this.trialPeriod == null) {
            this.trialPeriod = 3;
        }
    }
    gotoNextField(nextElement) {
        nextElement.setFocus();
    }
    get username() {
        return this.registrationForm.get('username');
    }
    get firstname() {
        return this.registrationForm.get('firstname');
    }
    get lastname() {
        return this.registrationForm.get('lastname');
    }
    get email() {
        return this.registrationForm.get('email');
    }
    get phone() {
        return this.registrationForm.get('phone');
    }
    get password() {
        return this.registrationForm.get('password');
    }
    get confirm_password() {
        return this.registrationForm.get('confirm_password');
    }
    get facilityid() {
        return this.registrationForm.get('facilityid');
    }
    onSubmit(data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                cssClass: 'custom-loading',
                spinner: 'bubbles',
                message: 'Please Wait...',
                duration: 10000,
            });
            yield this.loading.present();
            var registerData = {
                "username": this.registrationForm.controls.email.value,
                "password": this.registrationForm.controls.password.value,
                "firstname": this.registrationForm.controls.firstname.value,
                "lastname": this.registrationForm.controls.lastname.value,
                "email": "",
                "createdby": " ",
                "phone": String(this.registrationForm.controls.phone.value),
                "facilityid": ""
            };
            this.EV.emailValidator({ 'username': this.registrationForm.controls.email.value }).subscribe((response) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                this.emailMessage = response;
                if (String(this.emailMessage.message) === "It's a new Email!") {
                    return this.finalSubmit();
                }
                else if (String(this.emailMessage.message) === "Email Exists!") {
                    yield this.loading.dismiss();
                    return this.emailValid = true;
                }
            }), (err) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                console.log(err);
                yield this.loading.dismiss();
            }), () => { });
        });
    }
    clearInputPassword(event) {
        this.registrationForm.controls.password.setValue('');
    }
    clearInputCoPassword(event) {
        this.registrationForm.controls.confirm_password.setValue('');
    }
    finalSubmit() {
        var registerData;
        if (this.rolid == 3) {
            registerData = {
                "username": this.registrationForm.controls.email.value,
                "password": this.registrationForm.controls.password.value,
                "firstname": this.registrationForm.controls.firstname.value,
                "lastname": this.registrationForm.controls.lastname.value,
                "email": "",
                "createdby": " ",
                "role_id_ref": this.rolid,
                "phone": String(this.registrationForm.controls.phone.value),
                "facilityid": "",
                "start_date": new Date().getFullYear() + '-' + (Number(new Date().getMonth()) + + +1) + '-' + new Date().getDate(),
                "end_date": null,
                "trial_period": this.trialPeriod,
            };
        }
        else {
            registerData = {
                "username": this.registrationForm.controls.email.value,
                "password": this.registrationForm.controls.password.value,
                "firstname": this.registrationForm.controls.firstname.value,
                "lastname": this.registrationForm.controls.lastname.value,
                "email": "",
                "createdby": " ",
                "role_id_ref": this.rolid,
                "phone": String(this.registrationForm.controls.phone.value),
                "facilityid": "",
                "start_date": null,
                "end_date": null,
                "trial_period": 0,
            };
        }
        this.register.registerNewUser(registerData).subscribe((response) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.EV.emailVerification(this.registrationForm.controls.email.value).subscribe((response) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                // this.register.sendNotificationAfterCreatingAnAccount(this.registrationForm.controls.email.value,this.registrationForm.controls.firstname.value,this.registrationForm.controls.lastname.value).subscribe((res)=>{
                // },(err)=>{console.log(err)},()=>{})
                yield this.loading.dismiss();
                sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
                    title: 'Success!',
                    html: 'Your account is created!<br> A verification link has been sent to your email account.',
                    icon: 'success',
                    showCancelButton: false,
                    imageHeight: '250px',
                    heightAuto: false,
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#ff6700',
                }).then((result) => {
                    this.registrationForm.reset();
                    if (result.isConfirmed) {
                        this.navCtrl.navigateForward('login');
                    }
                });
            }), (error) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                yield this.loading.dismiss();
                sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
                    title: 'Error!',
                    html: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    showCancelButton: false,
                    imageHeight: '250px',
                    heightAuto: false,
                    // confirmButtonText: 'Continue',
                    confirmButtonColor: '#FF0000',
                }).then((result) => {
                    this.registrationForm.reset();
                });
            }));
        }), (error) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.errorMsg = error;
            console.log(this.errorMsg);
            yield this.loading.dismiss();
            sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
                title: 'Error!',
                html: 'Something went wrong. Please try again later.',
                icon: 'error',
                showCancelButton: false,
                imageHeight: '250px',
                heightAuto: false,
                // confirmButtonText: 'Continue',
                confirmButtonColor: '#FF0000',
            }).then((result) => {
                this.registrationForm.reset();
            });
        }), () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        }));
    }
    test() {
        // Swal.fire('Congrats!', 'Your account is created!', 'success')
        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
            title: 'Success!',
            html: 'Your account is created!<br> A verification link has been sent to your email account.',
            icon: 'success',
            showCancelButton: false,
            imageHeight: '250px',
            heightAuto: false,
            confirmButtonText: 'Continue',
            confirmButtonColor: '#ff6700',
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });
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
    emailFocusOut() {
        var email = { 'username': this.registrationForm.controls.email.value };
        this.EV.emailValidator(email).subscribe((response) => {
            this.emailMessage = response;
            //
            if (String(this.emailMessage.message) === "It's a new Email!") {
                return this.emailValid = false;
            }
            else if (String(this.emailMessage.message) === "Email Exists!") {
                return this.emailValid = true;
            }
        }, (err) => { console.log(err); }, () => { });
    }
    phoneFocusOut() {
        var phone = { 'phone': this.registrationForm.value.phone };
        if (this.registrationForm.value.phone !== null && this.registrationForm.value.phone !== '') {
            this.PV.phoneValidator(phone).subscribe((response) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                this.phoneMessage = response;
                if (String(this.phoneMessage.message) === "Phone no is null or empty") {
                    // if(this.registrationForm.value.phone==null || this.registrationForm.value.phone==''){
                    return this.phoneValid = false;
                    // }
                }
                else if (String(this.phoneMessage.message) === "Phone number Exists!") {
                    return this.phoneValid = true;
                }
            }));
        }
    }
    changePhoneValue() {
        if (this.registrationForm.value.phone == null || this.registrationForm.value.phone == '') {
            return this.phoneValid = false;
        }
    }
    signIn() {
        this.navCtrl.navigateBack(src_app_json_apis_json__WEBPACK_IMPORTED_MODULE_9__.apis.login_api);
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
            return 'form-control app-font-primary-color ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding';
        }
    }
    confirmPassWordClass(cId) {
        if (0 == cId) {
            return 'password  form-control app-font-primary-color ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding';
        }
        else if (0 != cId) {
            return 'form-control app-font-primary-color ion-no-margin ion-border-1px-mercurius-secondary-color ion-no-padding';
        }
    }
};
RegisterPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: src_app_services_trial_period_service__WEBPACK_IMPORTED_MODULE_12__["TrialPeriodService"] },
    { type: src_app_services_registration_service__WEBPACK_IMPORTED_MODULE_7__["RegistrationService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"] },
    { type: src_app_services_phone_verification_phone_verification_service__WEBPACK_IMPORTED_MODULE_10__["PhoneVerificationService"] },
    { type: src_app_services_email_validation_service__WEBPACK_IMPORTED_MODULE_6__["EmailValidationService"] }
];
RegisterPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-register',
        template: _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_register_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RegisterPage);



/***/ }),

/***/ "nU2W":
/*!*****************************************************************!*\
  !*** ./src/app/home/login-register/register/register.page.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".password {\n  -webkit-text-security: disc;\n}\n\n.show-pass {\n  -webkit-text-security: none;\n}\n\n.hide-pass {\n  -webkit-text-security: disc;\n}\n\n.custom-shape-divider-top-1626283200 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n  line-height: 0;\n  transform: rotate(180deg);\n}\n\n.custom-shape-divider-top-1626283200 svg {\n  position: relative;\n  display: block;\n  width: calc(154% + 1.3px);\n  height: 150px;\n}\n\n.custom-shape-divider-top-1626283200 .shape-fill {\n  fill: #ffaa00;\n}\n\n@media (max-device-height: 568px) {\n  .custom-shape-divider-top-1626283200 svg {\n    width: calc(146% + 1.3px);\n    height: 95px;\n  }\n\n  #top {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 20%;\n  }\n\n  #center {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 80%;\n    overflow-x: scroll;\n    overflow: hidden;\n    position: fixed;\n  }\n\n  #Sign-Up-title {\n    margin-top: -5%;\n    font-size: 16px;\n    text-align: right;\n  }\n\n  #sign-in {\n    margin-top: 0%;\n    margin-bottom: 5%;\n  }\n\n  #button {\n    margin-top: 0%;\n    margin-bottom: 5%;\n  }\n\n  #check-box-terms-and-conditions {\n    margin-top: 0%;\n  }\n}\n\n@media (max-device-height: 700px) {\n  .custom-shape-divider-top-1626283200 svg {\n    width: calc(146% + 1.3px);\n    height: 105px;\n  }\n\n  #top {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 20%;\n  }\n\n  #center {\n    margin: 0;\n    padding: 0%;\n    width: 100%;\n    height: 80%;\n    overflow: hidden;\n    overflow-x: scroll;\n    position: fixed;\n  }\n\n  #sign-in {\n    margin-top: 3%;\n    margin-bottom: 5%;\n  }\n\n  #button {\n    margin-top: 0%;\n    margin-bottom: 5%;\n  }\n\n  #check-box-terms-and-conditions {\n    margin-top: 0%;\n  }\n}\n\n#Sign-Up-title {\n  padding: 6%;\n  font-size: 38px;\n  text-align: right;\n}\n\n#sign-in {\n  margin-top: 3%;\n}\n\n#button {\n  margin-top: 5%;\n  margin-bottom: 5%;\n}\n\n#check-box-terms-and-conditions {\n  margin-top: 5%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxccmVnaXN0ZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsMkJBQUE7QUFERjs7QUFHQTtFQUNFLDJCQUFBO0FBQUY7O0FBRUE7RUFDRSwyQkFBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUVGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxhQUFBO0FBRUY7O0FBQ0E7RUFDRSxhQUFBO0FBRUY7O0FBQ0E7RUFDSTtJQUNFLHlCQUFBO0lBQ0EsWUFBQTtFQUVKOztFQUNJO0lBQ0UsU0FBQTtJQUFTLFdBQUE7SUFBYSxXQUFBO0lBQVksV0FBQTtFQUt4Qzs7RUFISTtJQUNFLFNBQUE7SUFBUyxXQUFBO0lBQWEsV0FBQTtJQUN0QixXQUFBO0lBQ0Esa0JBQUE7SUFDQSxnQkFBQTtJQUNBLGVBQUE7RUFRTjs7RUFOSTtJQUNFLGVBQUE7SUFDQSxlQUFBO0lBQWdCLGlCQUFBO0VBVXRCOztFQVJJO0lBQ0UsY0FBQTtJQUNBLGlCQUFBO0VBV047O0VBVEk7SUFDRSxjQUFBO0lBQ0EsaUJBQUE7RUFZTjs7RUFWSTtJQUNFLGNBQUE7RUFhTjtBQUNGOztBQVhBO0VBQ0U7SUFDRSx5QkFBQTtJQUNBLGFBQUE7RUFhRjs7RUFWRTtJQUNFLFNBQUE7SUFBUyxXQUFBO0lBQWEsV0FBQTtJQUFZLFdBQUE7RUFnQnRDOztFQWJFO0lBQ0UsU0FBQTtJQUFTLFdBQUE7SUFBYSxXQUFBO0lBQ3RCLFdBQUE7SUFDQSxnQkFBQTtJQUNBLGtCQUFBO0lBQ0EsZUFBQTtFQWtCSjs7RUFmRTtJQUNFLGNBQUE7SUFDQSxpQkFBQTtFQWtCSjs7RUFoQkU7SUFDRSxjQUFBO0lBQ0EsaUJBQUE7RUFtQko7O0VBakJFO0lBQ0UsY0FBQTtFQW9CSjtBQUNGOztBQWxCQTtFQUNFLFdBQUE7RUFBWSxlQUFBO0VBQ1osaUJBQUE7QUFxQkY7O0FBbkJBO0VBQ0UsY0FBQTtBQXNCRjs7QUFwQkE7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7QUF1QkY7O0FBckJBO0VBQ0UsY0FBQTtBQXdCRiIsImZpbGUiOiJyZWdpc3Rlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLnBhc3N3b3Jke1xuICAtd2Via2l0LXRleHQtc2VjdXJpdHk6IGRpc2M7XG59XG4uc2hvdy1wYXNze1xuICAtd2Via2l0LXRleHQtc2VjdXJpdHk6bm9uZTtcbn1cbi5oaWRlLXBhc3N7XG4gIC13ZWJraXQtdGV4dC1zZWN1cml0eTpkaXNjO1xufVxuLmN1c3RvbS1zaGFwZS1kaXZpZGVyLXRvcC0xNjI2MjgzMjAwIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBsaW5lLWhlaWdodDogMDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbn1cblxuLmN1c3RvbS1zaGFwZS1kaXZpZGVyLXRvcC0xNjI2MjgzMjAwIHN2ZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiBjYWxjKDE1NCUgKyAxLjNweCk7XG4gIGhlaWdodDogMTUwcHg7XG59XG5cbi5jdXN0b20tc2hhcGUtZGl2aWRlci10b3AtMTYyNjI4MzIwMCAuc2hhcGUtZmlsbCB7XG4gIGZpbGw6ICNmZmFhMDA7XG59XG5cbkBtZWRpYSAobWF4LWRldmljZS1oZWlnaHQ6IDU2OHB4KSB7XG4gICAgLmN1c3RvbS1zaGFwZS1kaXZpZGVyLXRvcC0xNjI2MjgzMjAwIHN2ZyB7XG4gICAgICB3aWR0aDogY2FsYygxNDYlICsgMS4zcHgpO1xuICAgICAgaGVpZ2h0OiA5NXB4O1xuICAgICAgfVxuXG4gICAgICAjdG9we1xuICAgICAgICBtYXJnaW46MDtwYWRkaW5nOiAwJSA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAyMCU7XG4gICAgICB9XG4gICAgICAjY2VudGVye1xuICAgICAgICBtYXJnaW46MDtwYWRkaW5nOiAwJSA7d2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogODAlO1xuICAgICAgICBvdmVyZmxvdy14OiBzY3JvbGw7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIH1cbiAgICAgICNTaWduLVVwLXRpdGxlIHtcbiAgICAgICAgbWFyZ2luLXRvcDogLTUlO1xuICAgICAgICBmb250LXNpemU6IDE2cHg7dGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICB9XG4gICAgICAjc2lnbi1pbntcbiAgICAgICAgbWFyZ2luLXRvcDogMCU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDUlO1xuICAgICAgfVxuICAgICAgI2J1dHRvbntcbiAgICAgICAgbWFyZ2luLXRvcDogMCU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDUlO1xuICAgICAgfVxuICAgICAgI2NoZWNrLWJveC10ZXJtcy1hbmQtY29uZGl0aW9uc3tcbiAgICAgICAgbWFyZ2luLXRvcDogMCU7XG4gICAgICB9XG59XG5AbWVkaWEgKG1heC1kZXZpY2UtaGVpZ2h0OiA3MDBweCkge1xuICAuY3VzdG9tLXNoYXBlLWRpdmlkZXItdG9wLTE2MjYyODMyMDAgc3ZnIHtcbiAgICB3aWR0aDogY2FsYygxNDYlICsgMS4zcHgpO1xuICAgIGhlaWdodDogMTA1cHg7XG4gICAgfVxuXG4gICAgI3RvcHtcbiAgICAgIG1hcmdpbjowO3BhZGRpbmc6IDAlIDt3aWR0aDogMTAwJTtoZWlnaHQ6IDIwJTtcbiAgICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICAgICNjZW50ZXJ7XG4gICAgICBtYXJnaW46MDtwYWRkaW5nOiAwJSA7d2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDgwJTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBvdmVyZmxvdy14OiBzY3JvbGw7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgfVxuXG4gICAgI3NpZ24taW57XG4gICAgICBtYXJnaW4tdG9wOiAzJTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDUlO1xuICAgIH1cbiAgICAjYnV0dG9ue1xuICAgICAgbWFyZ2luLXRvcDogMCU7XG4gICAgICBtYXJnaW4tYm90dG9tOiA1JTtcbiAgICB9XG4gICAgI2NoZWNrLWJveC10ZXJtcy1hbmQtY29uZGl0aW9uc3tcbiAgICAgIG1hcmdpbi10b3A6IDAlO1xuICAgIH1cbn1cbiNTaWduLVVwLXRpdGxlIHtcbiAgcGFkZGluZzogNiU7Zm9udC1zaXplOiAzOHB4O1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbiNzaWduLWlue1xuICBtYXJnaW4tdG9wOiAzJTtcbn1cbiNidXR0b257XG4gIG1hcmdpbi10b3A6IDUlO1xuICBtYXJnaW4tYm90dG9tOiA1JTtcbn1cbiNjaGVjay1ib3gtdGVybXMtYW5kLWNvbmRpdGlvbnN7XG4gIG1hcmdpbi10b3A6IDUlO1xufVxuIl19 */");

/***/ })

}]);
//# sourceMappingURL=login-register-register-register-module.js.map