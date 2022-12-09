(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shift-category-info-shift-category-info-module"],{

/***/ "9Lkm":
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/dashboard/work_load_data/add-new-shift-definition/shift-category-info/shift-category-info-routing.module.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: ShiftCategoryInfoPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftCategoryInfoPageRoutingModule", function() { return ShiftCategoryInfoPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _shift_category_info_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shift-category-info.page */ "FIBp");




const routes = [
    {
        path: '',
        component: _shift_category_info_page__WEBPACK_IMPORTED_MODULE_3__["ShiftCategoryInfoPage"]
    }
];
let ShiftCategoryInfoPageRoutingModule = class ShiftCategoryInfoPageRoutingModule {
};
ShiftCategoryInfoPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ShiftCategoryInfoPageRoutingModule);



/***/ }),

/***/ "ngK4":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/dashboard/work_load_data/add-new-shift-definition/shift-category-info/shift-category-info.module.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: ShiftCategoryInfoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftCategoryInfoPageModule", function() { return ShiftCategoryInfoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _shift_category_info_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shift-category-info-routing.module */ "9Lkm");
/* harmony import */ var _shift_category_info_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shift-category-info.page */ "FIBp");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");








let ShiftCategoryInfoPageModule = class ShiftCategoryInfoPageModule {
};
ShiftCategoryInfoPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
            _shift_category_info_routing_module__WEBPACK_IMPORTED_MODULE_5__["ShiftCategoryInfoPageRoutingModule"]
        ],
        declarations: [_shift_category_info_page__WEBPACK_IMPORTED_MODULE_6__["ShiftCategoryInfoPage"]],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
    })
], ShiftCategoryInfoPageModule);



/***/ })

}]);
//# sourceMappingURL=shift-category-info-shift-category-info-module.js.map