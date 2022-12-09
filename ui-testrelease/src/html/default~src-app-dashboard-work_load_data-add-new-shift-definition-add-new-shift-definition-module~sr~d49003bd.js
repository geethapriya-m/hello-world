(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~src-app-dashboard-work_load_data-add-new-shift-definition-add-new-shift-definition-module~sr~d49003bd"],{

/***/ "GgdF":
/*!***************************************************************************************************!*\
  !*** ./src/app/dashboard/work_load_data/add-new-shift-definition/time-picker/time-picker.page.ts ***!
  \***************************************************************************************************/
/*! exports provided: TimePickerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimePickerPage", function() { return TimePickerPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_time_picker_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./time-picker.page.html */ "M66H");
/* harmony import */ var _time_picker_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time-picker.page.scss */ "jc3j");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _shift_category_info_shift_category_info_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shift-category-info/shift-category-info.page */ "FIBp");
/* harmony import */ var _shift_category_start_time_shift_category_start_time_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shift-category-start-time/shift-category-start-time.page */ "fvPb");
/* harmony import */ var src_app_model_shiftDefinition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/model/shiftDefinition */ "Ck8E");
/* harmony import */ var src_app_services_work_load_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/work-load.service */ "FcOq");
/* harmony import */ var src_app_json_work_load_data_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/json/work-load-data.json */ "V1zY");
var src_app_json_work_load_data_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! src/app/json/work-load-data.json */ "V1zY", 1);
var TimePickerPage_1;












let TimePickerPage = TimePickerPage_1 = class TimePickerPage {
    constructor(addNewShiftDefinition, modalCtrl, shiftDefSer, navCtrl, formBuilder) {
        this.addNewShiftDefinition = addNewShiftDefinition;
        this.modalCtrl = modalCtrl;
        this.shiftDefSer = shiftDefSer;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.work_load_data = src_app_json_work_load_data_json__WEBPACK_IMPORTED_MODULE_10__;
        this.arrangeShiftdefintionG = [];
        this.arrangeShiftdefintionL = [];
        this.allll = [];
        this.allShiftName = [];
        this.testing = "testing";
        this.user_defined_shift_name = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // user_defined_shift_name=['A','B','C','D']
        this.select_shift_name = [];
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.auto = true;
        this.hhmm = 'hh';
        this.ampm = 'am';
        this.dial = [];
        this.dialhr = [];
        this.hour = '12';
        this.minute = '00';
        this.shift = [];
        // shiftAlies='A'
        this.addnewShiftDefinition = new src_app_model_shiftDefinition__WEBPACK_IMPORTED_MODULE_8__["ShiftDefinition"]();
        // addNewShiftDefinitionForm: FormGroup;
        this.date = new Date;
        this.date1 = new Date;
        this.onChange = (v) => { };
        this.onTouched = () => { };
        // // get ShiftAlies(){
        // return this.addNewShiftDefinitionForm.get('shiftAlies')
        // }
        this.registerOnChange = (fn) => this.onChange = fn;
        //
        this.registerOnTouched = (fn) => this.onTouched = fn;
        const j = 84;
        for (let min = 1; min <= 12; min++) {
            const hh = String(min);
            const x = 1 + Math.sin(Math.PI * 2 * (min / 12));
            const y = 1 - Math.cos(Math.PI * 2 * (min / 12));
            this.dialhr.push({ top: j * y + 'px', left: j * x + 'px', hh });
        }
        for (let min = 1; min <= 60; min++) {
            let mm = String('00' + min).slice(-2);
            const x = 1 + Math.sin(Math.PI * 2 * (min / 60));
            const y = 1 - Math.cos(Math.PI * 2 * (min / 60));
            if (mm === '60') {
                mm = "00";
                this.dial.push({ top: j * y + 'px', left: j * x + 'px', mm });
            }
            else {
                this.dial.push({ top: j * y + 'px', left: j * x + 'px', mm });
            }
        }
    }
    ngOnInit() {
        this.user_data = JSON.parse(sessionStorage.getItem('userData'));
        this.midShift_start = 2300;
        this.midShift_end = 700;
        this.dayShift_start = 700;
        this.dayShift_end = 1500;
        this.eveShift_start = 1500;
        this.eveShift_end = 2300;
        if (this.midShift_start > 1200) {
            this.midShift_start = this.midShift_start + -+2400;
        }
        this.midAvg = (this.midShift_start + + +this.midShift_end) / 2;
        this.dayAvg = (this.dayShift_start + + +this.dayShift_end) / 2;
        this.eveAvg = (this.eveShift_start + + +this.eveShift_end) / 2;
        this.allShiftData = JSON.parse(localStorage.getItem('allShift'));
        if (this.allShiftData != null) {
            for (var i = 0; i < this.allShiftData.length; i++) {
                if (this.allShiftData[i].sh_name != null) {
                    this.allShiftName.push(this.allShiftData[i].sh_name);
                }
            }
        }
        this.allShiftName = this.user_defined_shift_name.filter(val => !this.allShiftName.includes(val));
        if (this.allShiftName.length > 0) {
            this.addnewShiftDefinition.sh_category = this.allShiftName[0];
        }
        else {
            this.addnewShiftDefinition.sh_category = 'N/A';
        }
    }
    writeValue() {
        let hh = this.date.getHours(), mm = this.date.getMinutes();
        this.ampm = hh < 12 ? 'am' : 'pm';
        this.hour = String(hh % 12 || 12);
        this.minute = String('00' + (mm)).slice(-2);
        this.time1 = String(hh % 12 || 12);
        //8 hours
        if (this.ampm == 'pm') {
            let addHh = (Number(this.hour) + 20);
            if (24 <= addHh) {
                this.ampm248 = addHh % 24;
                this.hour8 = this.ampm248;
                if (Number(this.hour) == 12 && this.ampm == 'pm') {
                    this.addampm8 = 'pm';
                }
                else {
                    this.addampm8 = this.ampm248 < 12 ? 'am' : 'pm';
                }
            }
            else {
                this.addampm8 = this.ampm248 < 12 ? 'am' : 'pm';
                this.hour8 = addHh % 12 || 12;
            }
        }
        else {
            let addHh = (Number(this.hour) + 8);
            this.hour8 = addHh % 12 || 12;
            if (Number(this.hour) == 12 && this.ampm == 'am') {
                this.addampm8 = 'am';
            }
            else {
                this.addampm8 = addHh < 12 ? 'am' : 'pm';
            }
        }
        if (this.ampm == 'am') {
            if (Number(this.hour) < 10) {
                if (Number(this.hour) == 12 && this.ampm === 'am') {
                    this.start_time = '00' + ':' + this.minute + ':00';
                }
                else {
                    this.start_time = '0' + Number(this.hour) + ':' + this.minute + ':00';
                }
            }
            else {
                if (Number(this.hour) == 12 && this.ampm == 'am') {
                    this.start_time = '00' + ':' + this.minute + ':00';
                }
                else {
                    this.start_time = Number(this.hour) + ':' + this.minute + ':00';
                }
            }
        }
        else if (this.ampm == 'pm') {
            if (Number(this.hour) == 12) {
                this.start_time = Number(this.hour) + ':' + this.minute + ':00';
            }
            else {
                this.start_time = (Number(this.hour) + + +12) + ':' + this.minute + ':00';
            }
        }
        this.end_time = this.hour8 + ':' + this.minute + ':00';
        this.convertTimetoString = Array.from(this.start_time);
        this.convert_start_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        this.convertTimetoString = Array.from(this.end_time);
        this.convert_end_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        if (Number(this.convert_start_shift_time_to_number) >= 2300 && Number(this.convert_start_shift_time_to_number) <= 2400) {
            this.convert_start_shift_time_to_number = Number(this.convert_start_shift_time_to_number) + -+2400;
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if ((Number(this.convert_start_shift_time_to_number) >= this.midShift_start) && (Number(this.convert_start_shift_time_to_number) <= this.midShift_end)) {
            // if(Number(this.c)>2300 && Number(this.c)<2400){this.c=Number(this.c)+ - +2400
            // }
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.dayShift_start && Number(this.convert_start_shift_time_to_number) <= this.dayShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.dayAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "E";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "D";
            }
            else {
                this.s_category = "DE";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.eveShift_start && Number(this.convert_start_shift_time_to_number) <= this.eveShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.eveAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "M";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "E";
            }
            else {
                this.s_category = "EM";
            }
        }
        //9 hours
        if (this.ampm == 'pm') {
            let addHh = (Number(this.hour) + 21);
            if (24 <= addHh) {
                this.ampm249 = addHh % 24;
                this.hour9 = this.ampm249;
                if (Number(this.hour) == 12 && this.ampm == 'pm') {
                    this.addampm9 = 'pm';
                }
                else {
                    this.addampm9 = this.ampm249 < 12 ? 'am' : 'pm';
                }
            }
            else {
                this.addampm9 = this.ampm24 < 12 ? 'am' : 'pm';
                this.hour9 = addHh % 12 || 12;
            }
        }
        else {
            let addHh = (Number(this.hour) + 9);
            this.hour9 = addHh % 12 || 12;
            if (Number(this.hour) == 12 && this.ampm == 'am') {
                this.addampm9 = 'am';
            }
            else {
                this.addampm9 = addHh < 12 ? 'am' : 'pm';
            }
        }
        //10 hours
        if (this.ampm == 'pm') {
            let addHh = (Number(this.hour) + 22);
            if (24 <= addHh) {
                this.ampm2410 = addHh % 24;
                this.hour10 = this.ampm2410;
                if (Number(this.hour) == 12 && this.ampm == 'pm') {
                    this.addampm10 = 'pm';
                }
                else {
                    this.addampm10 = this.ampm2410 < 12 ? 'am' : 'pm';
                }
            }
            else {
                this.addampm10 = this.ampm2410 < 12 ? 'am' : 'pm';
                this.hour10 = addHh % 12 || 12;
            }
        }
        else {
            let addHh = (Number(this.hour) + 10);
            this.hour10 = addHh % 12 || 12;
            if (Number(this.hour) == 12 && this.ampm == 'am') {
                this.addampm10 = 'am';
            }
            else {
                this.addampm10 = addHh < 12 ? 'am' : 'pm';
            }
        }
    }
    timeChange($event) {
        if (this.hhmm === 'hh') {
            this.hour = $event;
            if (this.ampm == 'pm') {
                this.t8 = Number(this.hour) + 20;
                if (this.t8 > 23) {
                    this.hour8 = this.t8 - 24;
                    if (Number(this.hour) == 12) {
                        this.addampm8 = 'pm';
                    }
                    else {
                        this.addampm8 = 'am';
                    }
                }
                else {
                    this.hour8 = this.t8 - 12;
                    this.addampm8 = 'pm';
                }
            }
            else if (this.ampm == 'am') {
                this.t8 = Number(this.hour) + 8;
                if (this.t8 > 23) {
                }
                else {
                    if (this.t8 > 12) {
                        this.hour8 = this.t8 - 12;
                        if (Number(this.hour) == 12) {
                            this.addampm8 = 'am';
                        }
                        else {
                            this.addampm8 = 'pm';
                        }
                    }
                    else {
                        if (Number(this.hour) < 4) {
                            this.addampm8 = 'am';
                        }
                        else {
                            this.addampm8 = 'pm';
                        }
                        this.hour8 = this.t8;
                    }
                }
                this.end_time = this.hour8 + ':' + this.minute + ':00';
            }
            if (this.ampm == 'pm') {
                this.t9 = Number(this.hour) + 21;
                if (this.t9 > 23) {
                    this.hour9 = this.t9 - 24;
                    this.addampm9 = 'am';
                }
                else {
                    this.hour9 = this.t9 - 12;
                    this.addampm9 = 'pm';
                }
            }
            else if (this.ampm == 'am') {
                this.t9 = Number(this.hour) + 9;
                if (this.t9 > 23) {
                }
                else {
                    if (this.t9 > 12) {
                        this.addampm9 = 'pm';
                        this.hour9 = this.t9 - 12;
                    }
                    else {
                        this.addampm9 = 'am';
                        this.hour9 = this.t9;
                    }
                }
            }
            if (this.ampm == 'pm') {
                this.t10 = Number(this.hour) + 22;
                if (this.t10 > 23) {
                    this.hour10 = this.t10 - 24;
                    this.addampm10 = 'am';
                }
                else {
                    this.hour10 = this.t10 - 12;
                    this.addampm10 = 'pm';
                }
            }
            else if (this.ampm == 'am') {
                this.t10 = Number(this.hour) + 10;
                if (this.t10 > 23) {
                }
                else {
                    if (this.t10 > 12) {
                        this.addampm10 = 'pm';
                        this.hour10 = this.t10 - 12;
                    }
                    else {
                        this.addampm9 = 'am';
                        this.hour10 = this.t10;
                    }
                }
            }
            // if (this.auto==true) {
            //   this.hhmm = 'mm';
            // }
        }
        else {
            this.minute = $event;
        }
        this.shiftTime = Number(this.hour);
        // let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
        // if (this.ampm === 'am' && hh === 12 || hh === 24) {
        //   hh = 12;
        // }
        // this.date.setHours(hh);
        // this.date.setMinutes(+this.minute);
        // this.onChange(this.date);
        // this.time=this.date
        if (this.ampm == 'am') {
            if (Number(this.hour) < 10) {
                if (Number(this.hour) == 12 && this.ampm === 'am') {
                    this.start_time = '00' + ':' + this.minute + ':00';
                }
                else {
                    this.start_time = '0' + Number(this.hour) + ':' + this.minute + ':00';
                }
            }
            else {
                if (Number(this.hour) == 12 && this.ampm == 'am') {
                    this.start_time = '00' + ':' + this.minute + ':00';
                }
                else {
                    this.start_time = Number(this.hour) + ':' + this.minute + ':00';
                }
            }
        }
        else if (this.ampm == 'pm') {
            if (Number(this.hour) == 12) {
                this.start_time = Number(this.hour) + ':' + this.minute + ':00';
            }
            else {
                this.start_time = (Number(this.hour) + + +12) + ':' + this.minute + ':00';
            }
        }
        if (this.addampm8 == 'pm') {
            this.updated_hour8 = this.hour8 + 12;
        }
        else {
            if (this.hour8 == 0) {
                this.updated_hour8 = 24;
            }
            else {
                this.updated_hour8 = this.hour8;
            }
        }
        if (Number(this.updated_hour8) < 10) {
            if (Number(this.updated_hour8) == 12 && this.addampm8 == 'am') {
                this.end_time = '00' + ':' + this.minute + ':00';
            }
            else {
                this.end_time = '0' + Number(this.hour8) + ':' + this.minute + ':00';
            }
        }
        else {
            if (Number(this.updated_hour8) == 12 && this.addampm8 == 'am') {
                this.end_time = '00' + ':' + this.minute + ':00';
            }
            else {
                this.end_time = Number(this.updated_hour8) + ':' + this.minute + ':00';
            }
        }
        // this.end_time=this.hour8+':'+this.minute+':00'
        this.convertTimetoString = Array.from(this.start_time);
        this.convert_start_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        this.convertTimetoString = Array.from(this.end_time);
        this.convert_end_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        // this.e=Number(this.c)+ - +Number(this.midAvg)
        if (Number(this.convert_start_shift_time_to_number) >= 2300 && Number(this.convert_start_shift_time_to_number) <= 2400) {
            this.convert_start_shift_time_to_number = Number(this.convert_start_shift_time_to_number) + -+2400;
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if ((Number(this.convert_start_shift_time_to_number) >= this.midShift_start) && (Number(this.convert_start_shift_time_to_number) <= this.midShift_end)) {
            // if(Number(this.c)>2300 && Number(this.c)<2400){this.c=Number(this.c)+ - +2400
            // }
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.dayShift_start && Number(this.convert_start_shift_time_to_number) <= this.dayShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.dayAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "E";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "D";
            }
            else {
                this.s_category = "DE";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.eveShift_start && Number(this.convert_start_shift_time_to_number) <= this.eveShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.eveAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "M";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "E";
            }
            else {
                this.s_category = "EM";
            }
        }
    }
    rotateHand() {
        const deg = this.hhmm === 'hh' ? +this.hour * 5 : +this.minute;
        return `rotate(${deg * 6}deg)`;
    }
    rotateHandMin() {
        const deg = this.hhmm === 'mm' ? +this.minute : +this.hour * 5;
        return `rotate(${deg * 6}deg)`;
    }
    cancel() {
        this.navCtrl.navigateBack('workload-data-generate');
    }
    ConvertStringToNumber(input) {
        var numeric = Number(input);
        return numeric;
    }
    changeAm() {
        // if(this.addnewShiftDefinition.shift_category=='A'){
        // this.t8=Number(this.hour8)
        this.t8 = Number(this.hour) + 8;
        if (this.t8 > 23) {
        }
        else {
            if (this.t8 > 12) {
                this.hour8 = this.t8 - 12;
                if (Number(this.hour) == 12) {
                    this.addampm8 = 'am';
                }
                else {
                    this.addampm8 = 'pm';
                }
            }
            else {
                if (Number(this.hour) < 4) {
                    this.addampm8 = 'am';
                }
                else {
                    this.addampm8 = 'pm';
                }
                this.hour8 = this.t8;
            }
            if (this.hour8 < 10) {
                this.end_time = '0' + this.hour8 + ':' + this.minute + ':00';
            }
            else {
                this.end_time = this.hour8 + ':' + this.minute + ':00';
            }
        }
        if (Number(this.hour) == 12) {
            this.start_time = '00' + ':' + this.minute + ':00';
        }
        else {
            this.start_time = Number(this.hour) + ':' + this.minute + ':00';
        }
        if (Number(this.hour) < 10) {
            if (Number(this.hour) == 12) {
                this.start_time = '00' + ':' + this.minute + ':00';
            }
            else {
                this.start_time = '0' + Number(this.hour) + ':' + this.minute + ':00';
            }
        }
        else {
            if (Number(this.hour) == 12) {
                this.start_time = '00' + ':' + this.minute + ':00';
            }
            else {
                this.start_time = Number(this.hour) + ':' + this.minute + ':00';
            }
        }
        this.convertTimetoString = Array.from(this.start_time);
        this.convert_start_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        this.convertTimetoString = Array.from(this.end_time);
        this.convert_end_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        if (Number(this.convert_start_shift_time_to_number) >= 2300 && Number(this.convert_start_shift_time_to_number) <= 2400) {
            this.convert_start_shift_time_to_number = Number(this.convert_start_shift_time_to_number) + -+2400;
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if ((Number(this.convert_start_shift_time_to_number) >= this.midShift_start) && (Number(this.convert_start_shift_time_to_number) <= this.midShift_end)) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.dayShift_start && Number(this.convert_start_shift_time_to_number) <= this.dayShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.dayAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "E";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "D";
            }
            else {
                this.s_category = "DE";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.eveShift_start && Number(this.convert_start_shift_time_to_number) <= this.eveShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.eveAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "M";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "E";
            }
            else {
                this.s_category = "EM";
            }
        }
    }
    changePm() {
        //   this.t8=Number(this.hour)+20
        //   if(this.t8>23){
        //
        //     this.hour8=this.t8-24
        //     this.addampm8='am'
        //   }else{
        //     this.hour8=this.t8
        //     this.addampm8='pm'
        // }
        this.t8 = Number(this.hour) + 20;
        if (this.t8 > 23) {
            this.hour8 = this.t8 - 24;
            if (Number(this.hour) == 12) {
                this.addampm8 = 'pm';
            }
            else {
                this.addampm8 = 'am';
            }
        }
        else {
            this.hour8 = this.t8 - 12;
            this.addampm8 = 'pm';
        }
        // let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
        //     if (this.ampm === 'am' && hh === 12 || hh === 24) {
        //       hh = 12;
        //     }
        //     this.date.setHours(hh);
        //     this.date.setMinutes(+this.minute);
        //     this.onChange(this.date);
        //     this.time=this.date
        this.start_time = Number(this.hour) + + +12 + ':' + this.minute + ':00';
        this.end_time = this.hour8 + ':' + this.minute + ':00';
        if (Number(this.hour) == 12) {
            this.start_time = Number(this.hour) + ':' + this.minute + ':00';
        }
        else {
            this.start_time = (Number(this.hour) + + +12) + ':' + this.minute + ':00';
        }
        this.convertTimetoString = Array.from(this.start_time);
        this.convert_start_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        this.convertTimetoString = Array.from(this.end_time);
        this.convert_end_shift_time_to_number = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
        if (Number(this.convert_start_shift_time_to_number) >= 2300 && Number(this.convert_start_shift_time_to_number) <= 2400) {
            this.convert_start_shift_time_to_number = Number(this.convert_start_shift_time_to_number) + -+2400;
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if ((Number(this.convert_start_shift_time_to_number) >= this.midShift_start) && (Number(this.convert_start_shift_time_to_number) <= this.midShift_end)) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.midAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "D";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "M";
            }
            else {
                this.s_category = "MD";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.dayShift_start && Number(this.convert_start_shift_time_to_number) <= this.dayShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.dayAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "E";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "D";
            }
            else {
                this.s_category = "DE";
            }
        }
        else if (Number(this.convert_start_shift_time_to_number) >= this.eveShift_start && Number(this.convert_start_shift_time_to_number) <= this.eveShift_end) {
            this.shiftCategory_diff = Number(this.convert_start_shift_time_to_number) + -+Number(this.eveAvg);
            if (this.shiftCategory_diff > 0) {
                this.s_category = "M";
            }
            else if (this.shiftCategory_diff < 0) {
                this.s_category = "E";
            }
            else {
                this.s_category = "EM";
            }
        }
    }
    shiftCategoryInfo() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: _shift_category_info_shift_category_info_page__WEBPACK_IMPORTED_MODULE_6__["ShiftCategoryInfoPage"],
                cssClass: 'shiftCategoryInfo',
                swipeToClose: true
                // mode:'md'
            });
            return yield modal.present();
        });
    }
    shiftCategoryStartTime() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: _shift_category_start_time_shift_category_start_time_page__WEBPACK_IMPORTED_MODULE_7__["ShiftCategoryStartTimePage"],
                cssClass: 'shiftCategoryStartTimeInfo',
                swipeToClose: true
                // mode:'md'
            });
            return yield modal.present();
        });
    }
    set() {
        // this.addnewShiftDefinition.shift_starttime
        if (this.s_category == 'M') {
            this.s_category = 1;
        }
        else if (this.s_category == 'E') {
            this.s_category = 2;
        }
        else if (this.s_category == 'D') {
            this.s_category = 3;
        }
        else if (this.s_category == 'MD') {
            this.s_category = 4;
        }
        else if (this.s_category == 'DE') {
            this.s_category = 5;
        }
        else if (this.s_category == 'EM') {
            this.s_category = 6;
        }
        let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
        if (this.ampm === 'am' && hh === 12 || hh === 24) {
            hh = 12;
        }
        this.date.setHours(hh);
        this.date.setMinutes(+this.minute);
        this.onChange(this.date);
        this.time = this.date;
        this.start_time = hh + ':' + this.minute + ':00';
        var user_data = JSON.parse(sessionStorage.getItem('userData'));
        this.end_time = this.hour8 + ':' + this.minute + ':00';
        this.result = this.time.toLocaleTimeString('it-IT');
        this.test1 = { "sh_starttime": this.start_time, "sh_endtime": this.end_time, "sh_duration": 8, "sh_created_by": "user", "sh_name": this.addnewShiftDefinition.sh_category, "sh_category_id": this.s_category, "userid": user_data.id, "sh_include_exclude": "I" };
        this.addnewShiftDefinition.sh_starttime = this.start_time;
        this.addNewShiftDefinition.addNewShiftDefinition(this.test1).subscribe((data) => {
            this.result = data;
            localStorage.setItem('newSHiftDefinition', JSON.stringify(this.result));
        }, (error) => this.errorMsg = error, () => {
            this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe((res) => {
                this.allShift = res;
                // let res=[]
                var user_all_shift = [];
                for (var i = 0; i < this.allShift.length; i++) {
                    if (Number(this.allShift[i].userid) == Number(user_data.id)) {
                        user_all_shift.push(this.allShift[i]);
                    }
                }
                localStorage.setItem('allShift', JSON.stringify(user_all_shift));
                this.allll = [];
                this.allShiftData = JSON.parse(localStorage.getItem('allShift'));
                for (var i = 0; i < this.allShiftData.length; i++) {
                    this.convertTimetoString = Array.from(this.allShiftData[i].sh_starttime);
                    this.sh_startTime = this.convertTimetoString[0] + this.convertTimetoString[1] + this.convertTimetoString[3] + this.convertTimetoString[4];
                    // this.sh_startTime=Array.from(this.allShiftData[i].sh_starttime)
                    // this.sh_startTime=Number(this.sh_startTime)
                    this.shift_name = this.allShiftData[i].sh_name;
                    this.work_load_data.push({ "id": 9 + i,
                        "startTime": this.sh_startTime,
                        // "s_category":1,
                        "Sun": "0",
                        "Mon": "0",
                        "Tue": "0",
                        "Wed": "0",
                        "Thu": "0",
                        "Fri": "0",
                        "Sat": "0",
                        "shiftName": this.shift_name,
                        "shift_duration": 8,
                        "shiftCategory": this.allShiftData[i].sh_category_id,
                        "shift_created_by": 'user',
                        "sh_include_exclude": this.allShiftData[i].sh_include_exclude
                    });
                    // this.allShift[i])
                }
                this.arrangeShiftdefintionG = [];
                this.arrangeShiftdefintionL = [];
                for (var i = 0; i < this.work_load_data.length; i++) {
                    if (Number(this.work_load_data[i].startTime) > 2200) {
                        this.arrangeShiftdefintionG.push(this.work_load_data[i]);
                    }
                    else if (Number(this.work_load_data[i].startTime) <= 2200) {
                        this.arrangeShiftdefintionL.push(this.work_load_data[i]);
                    }
                }
                this.arrangeShiftdefintionG.sort((a, b) => a.startTime.localeCompare(b.startTime));
                this.arrangeShiftdefintionL.sort((a, b) => a.startTime.localeCompare(b.startTime));
                this.work_load_data = [];
                // this.work_load_data.push(this.arrangeShiftdefintionG)
                for (var i = 0; i < this.arrangeShiftdefintionG.length; i++) {
                    this.work_load_data.push(this.arrangeShiftdefintionG[i]);
                }
                for (var i = 0; i < this.arrangeShiftdefintionL.length; i++) {
                    this.work_load_data.push(this.arrangeShiftdefintionL[i]);
                }
                for (var i = 0; i < this.work_load_data.length; i++) {
                    // this.shift_name=this.allShiftData[i].sh_name
                    if (this.work_load_data[i].shiftName != null) {
                        // this.allShiftName.push({"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
                        if (Number(this.work_load_data[i].startTime) > 2200 || Number(this.work_load_data[i].startTime) < 600) {
                            this.allShiftName.push({ "id": i + 1, "shift_name": this.work_load_data[i].shiftName, "startTime": this.work_load_data[i].startTime, "shiftPattern": 'M' + this.work_load_data[i].startTime });
                        }
                        else if (Number(this.work_load_data[i].startTime) > 500 && Number(this.work_load_data[i].startTime) < 1300) {
                            this.allShiftName.push({ "id": i + 1, "shift_name": this.work_load_data[i].shiftName, "startTime": this.work_load_data[i].startTime, "shiftPattern": 'D' + this.work_load_data[i].startTime });
                        }
                        else if (Number(this.work_load_data[i].startTime) > 1200 && Number(this.work_load_data[i].startTime) < 2300) {
                            this.allShiftName.push({ "id": i + 1, "shift_name": this.work_load_data[i].shiftName, "startTime": this.work_load_data[i].startTime, "shiftPattern": 'E' + this.work_load_data[i].startTime });
                        }
                    }
                }
                // this.work_load_data.sort((a,b) => a.startTime.localeCompare(b.startTime));
                localStorage.setItem('updatedallShiftRequiredData', JSON.stringify(this.work_load_data));
            }, (error) => {
                this.errorMsg = error;
                console.log(this.errorMsg);
            }, () => {
                this.close.emit();
                setTimeout(() => {
                    location.reload();
                    this.navCtrl.navigateForward(['workload-data-generate']).then(() => {
                        location.reload();
                    });
                }, 0);
            });
        });
    }
};
TimePickerPage.ctorParameters = () => [
    { type: src_app_services_work_load_service__WEBPACK_IMPORTED_MODULE_9__["WorkLoadService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: src_app_services_work_load_service__WEBPACK_IMPORTED_MODULE_9__["WorkLoadService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
TimePickerPage.propDecorators = {
    close: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};
TimePickerPage = TimePickerPage_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-time-picker',
        template: _raw_loader_time_picker_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"], useExisting: TimePickerPage_1, multi: true }],
        styles: [_time_picker_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], TimePickerPage);



/***/ }),

/***/ "M66H":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/work_load_data/add-new-shift-definition/time-picker/time-picker.page.html ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<ion-content style=\"width: 100%;\">\n\n  <ion-row  class=\"data font-size-14px\" style=\"margin-top: 2%;\">\n      <ion-col size=\"3\"></ion-col>\n      <ion-col size=\"8\"style=\"text-align: right;\">\n        <ion-label >Shift Category Start Times </ion-label>\n      </ion-col>\n      <ion-col size=\"1\" >\n        <ion-img  (click)=\"shiftCategoryStartTime()\" style=\"height: 100%;width: 100%;\"  class=\" ion-no-margin-top ion-no-margin-bottom\"  alt=\"clock\" src=\"assets/img/clock.png\" ></ion-img>\n      </ion-col>\n  </ion-row>\n\n  <ion-grid>\n<ion-row class=\"ion-no-padding ion-no-margin\" >\n  <ion-col size=\"3\" class=\"ion-no-padding ion-no-margin\" >\n\n  </ion-col>\n  <ion-col class=\"ion-no-padding ion-no-margin\" >\n    <section class=\"time-picker\" ontouchstart>\n      <header>\n        <div class=\"time-hhmm\">\n          <label>\n            <input type=\"radio\" name=\"hhmm\" value=\"hh\" [(ngModel)]=\"hhmm\" />\n            <span [innerText]=\"hour\"></span>\n          </label>\n          <label>:</label>\n          <label>\n            <input type=\"radio\" name=\"hhmm\" value=\"mm\" [(ngModel)]=\"hhmm\" />\n            <span [innerText]=\"minute\"></span>\n          </label>\n        </div>\n        <!-- <div><label><span></span></label></div> -->\n        <div style=\"padding-left: 2%;\">\n          <!-- <label></label> -->\n          <label>\n          <span > {{ampm | uppercase}}</span>\n        </label>\n        </div>\n      </header></section>\n  </ion-col>\n  <ion-col size=\"3\" class=\"ion-no-padding ion-no-margin\" >\n\n  </ion-col>\n</ion-row>\n<ion-row class=\"ion-no-padding ion-no-margin\">\n  <ion-col size=\"3\" class=\"ion-no-padding ion-no-margin\">\n    <div class=\"time-ampm\" style=\"padding: 0% 5% 0% 5%;width: 100%;\" >\n    <label style=\"float:left;\" >\n      <input type=\"radio\" (click)=\"changeAm()\"  id=\"ampm\"  name=\"ampm\" value=\"am\" [(ngModel)]=\"ampm\" />\n      <span   class=\"ion-border-round  app-primary-background-color\">AM</span>\n    </label>\n    </div>\n  </ion-col>\n  <ion-col>\n\n  </ion-col>\n  <ion-col size=\"3\" class=\"ion-no-padding ion-no-margin\">\n    <div class=\"time-ampm\" style=\"padding: 0% 5% 0% 5%;\">\n\n      <label style=\"float: right;text-align: right;\">\n        <input type=\"radio\" id=\"ampm\" (click)=\"changePm()\"   style=\"display: none;\" value=\"pm\" [(ngModel)]=\"ampm\" />\n        <span class=\"ion-border-round app-primary-background-color\">PM</span>\n      </label>\n    </div>\n  </ion-col>\n</ion-row>\n\n    <section class=\"time-picker\"  ontouchstart>\n    <article>\n      <div class=\"time-dial\">\n        <label *ngFor=\"let item of dialhr\" [ngStyle]=\"item\">\n          <!-- <input type=\"radio\" name=\"time\" [value]=\"item[hhmm]\" [ngModel]=\"hhmm === 'hh' ? hour : minute\" (ngModelChange)=\"timeChange($event)\" /> -->\n          <input type=\"radio\" name=\"time\" [value]=\"item[hhmm]\" [ngModel]=\"hhmm === 'hh' && hour \" (ngModelChange)=\"timeChange($event)\" />\n          <!-- <input type=\"radio\" name=\"time\" [value]=\"item[hhmm]\" [ngModel]=\"hhmm === 'mm' && minute\" (ngModelChange)=\"timeChange($event)\" /> -->\n          <div *ngIf=\"hhmm=='hh'\">\n\n            <div [innerText]=\"item[hhmm]\" ></div>\n\n        </div>\n        </label>\n        <label *ngFor=\"let item of dial\" [ngStyle]=\"item\">\n          <!-- <input type=\"radio\" name=\"time\" [value]=\"item[hhmm]\" [ngModel]=\"hhmm === 'hh' ? hour : minute\" (ngModelChange)=\"timeChange($event)\" /> -->\n          <input type=\"radio\" name=\"time\" [value]=\"item[hhmm]\" [ngModel]=\"hhmm === 'mm' && minute\" (ngModelChange)=\"timeChange($event)\" />\n          <!-- <input type=\"radio\" name=\"time\" [value]=\"item[hhmm]\" [ngModel]=\"hhmm === 'mm' && minute\" (ngModelChange)=\"timeChange($event)\" /> -->\n          <div *ngIf=\"hhmm=='mm'\">\n          <div [innerText]=\"'00'\"  *ngIf=\"(ConvertStringToNumber(item[hhmm]))==60  \"></div>\n          <div [innerText]=\"'.'\"  *ngIf=\"(((ConvertStringToNumber(item[hhmm]))%5)!==0 && (ConvertStringToNumber(item[hhmm]))!==60)   else elseblock\"></div>\n          <ng-template #elseblock>\n            <div [innerText]=\"item[hhmm]\" *ngIf=\"((ConvertStringToNumber(item[hhmm]))%5)==0  \" ></div>\n            <!-- <div [innerText]=\"item[hhmm]\" *ngIf=\"((ConvertStringToNumber(item[hhmm]))%5)==0  \" ></div> -->\n          </ng-template>\n        </div>\n        </label>\n        <div class=\"hand\" *ngIf=\"hhmm==='hh'\" [style.transform]=\"rotateHand()\"></div>\n        <div class=\"hand\" *ngIf=\"hhmm==='mm'\" [style.transform]=\"rotateHandMin()\"></div>\n      </div>\n    </article>\n    <!-- <div>\n      <p style=\"float: left;\">\n        <input  type=\"radio\" id=\"radioAm\"   value=\"AM\" checked>\n        <label for=\"radioAm\">AM</label>\n      </p><p></p><p style=\"float: right;\" >\n        <input  type=\"radio\" id=\"radioPm\"  value=\"PM\" >\n        <label for=\"radioPm\">PM</label>\n      </p>\n    </div> -->\n    <!-- <div > -->\n\n    <!-- </div> -->\n  </section>\n\n  <!-- <form [formGroup]=\"addNewShiftDefinitionForm\"> -->\n  <!-- <ion-row class=\"ion-no-padding ion-no-margin ion-text-center\" style=\"padding: auto;\">\n  <ion-item  lines=\"none\" id=\"shift-alias\" class=\"ion-no-padding\" style=\"margin-left: auto;margin-right: auto;width: 80%;float: left;\" >\n    <ion-label>Shift Length</ion-label>\n    <ion-select  name=\"shiftAlias\"  [(ngModel)]=\"addnewShiftDefinition.sh_category\"  interface=\"popover\">\n      <ion-select-option value=\"A\">8 hrs</ion-select-option> -->\n      <!-- <ion-select-option value=\"B\">9 hrs</ion-select-option> -->\n      <!-- <ion-select-option value=\"C\">10 hrs</ion-select-option> -->\n    <!-- </ion-select>\n    <ion-label>{{addnewShiftDefinition.sh_category}} <i style=\"color: rgb(175, 174, 174);\">(Alias)</i></ion-label>\n  </ion-item>\n  <ion-item  lines=\"none\" id=\"shift-alias\" class=\"ion-no-padding\" style=\"width: 10%;float: right;\" >\n  <ion-label><ion-icon (click)=\"shiftCategoryInfo()\"  name=\"information-circle-outline\"></ion-icon></ion-label>\n  </ion-item>\n</ion-row> -->\n\n<ion-row class=\"ion-no-padding ion-no-margin ion-text-center\" style=\"padding: auto;\">\n  <ion-item  lines=\"none\" id=\"shift-alias\" class=\"ion-no-padding\" style=\"margin-left: auto;margin-right: auto;width: 30%;float: left;\" >\n    <ion-label>Alias</ion-label>\n    <ion-select  name=\"shiftAlias\"  [(ngModel)]=\"addnewShiftDefinition.sh_category\"  interface=\"popover\">\n      <ion-select-option *ngFor=\"let s of allShiftName\" value=\"{{s}}\">{{s}}</ion-select-option>\n      <!-- <ion-select-option value=\"B\">9 hrs</ion-select-option> -->\n      <!-- <ion-select-option value=\"C\">10 hrs</ion-select-option> -->\n    </ion-select>\n    <!-- <ion-label>{{addnewShiftDefinition.sh_category}} <i style=\"color: rgb(175, 174, 174);\">(Alias)</i></ion-label> -->\n  </ion-item>\n  <ion-item  lines=\"none\" id=\"shift-alias\" class=\"ion-no-padding\" style=\"width: 10%;float: right;\" >\n  <ion-label><ion-icon (click)=\"shiftCategoryInfo()\"  name=\"information-circle-outline\"></ion-icon></ion-label>\n  </ion-item>\n</ion-row>\n\n<ion-row class=\"ion-border-2px-primary-color\" style=\"margin:0% 7% 0% 7% ;border-radius: 15px;\">\n  <ion-col size=\"6\">\n    <ion-row class=\"data ion-text-center ion-justify-content-center\" >\n      <ion-label >Start</ion-label>\n    </ion-row>\n\n    <ion-row class=\"content-data-black-color font-size-14px font-normal ion-text-center ion-justify-content-center\" >\n      <label>{{hour}}:{{minute}} {{ampm | uppercase}}</label>\n    </ion-row>\n  </ion-col>\n\n  <ion-col size=\"6\">\n    <ion-row class=\"data ion-text-center font-size-14px  ion-justify-content-center\" >\n      <ion-label >End</ion-label>\n      </ion-row>\n    <ion-row class=\" content-data-black-color font-normal ion-text-center font-size-14px  ion-justify-content-center\" >\n      <label>{{hour8}}:{{minute}} {{addampm8 | uppercase}}</label>\n      <!-- <label *ngIf=\"addnewShiftDefinition.sh_category=='B'\">{{hour9}}:{{minute}} {{addampm9 | uppercase}}</label>\n      <label *ngIf=\"addnewShiftDefinition.sh_category=='C'\">{{hour10}}:{{minute}} {{addampm10 | uppercase}}</label> -->\n  </ion-row>\n  </ion-col>\n  <ion-col size=\"6\">\n    <ion-row class=\"data font-size-14px  ion-text-center ion-justify-content-center\" >\n      <ion-label >Category</ion-label>\n    </ion-row>\n    <ion-row class=\"ion-text-center \">\n      <!-- <ion-img *ngIf=\"(ConvertStringToNumber(hour)>12  && ampm=='pm')||(ConvertStringToNumber(hour)<6 && ampm=='am')||(ConvertStringToNumber(hour)==12 && ampm=='am' ) \" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Mid\" style=\"width: 13px;height: 13px;position:relative;margin:auto\" src=\"assets/img/night.png\"></ion-img>\n      <ion-img *ngIf=\"(ConvertStringToNumber(hour)>5 && ConvertStringToNumber(hour)<12  && ampm=='am')||(ConvertStringToNumber(hour)==12 && ampm=='pm') \" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Day\" style=\"width: 13px;height: 13px;position:relative;margin:auto\" src=\"assets/img/morning.png\"></ion-img>\n      <ion-img *ngIf=\"ConvertStringToNumber(hour)<11 && ampm=='pm' \" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Eve\" style=\"width: 13px;height: 13px;position:relative;margin:auto\" src=\"assets/img/evening.png\"></ion-img> -->\n\n        <ion-img *ngIf=\"s_category=='M'\" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Mid\" style=\"width: 13px;height: 13px;position:relative;margin:auto\" src=\"assets/img/night.png\"></ion-img>\n          <ion-img *ngIf=\"s_category=='D'\" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Day\" style=\"width: 13px;height: 13px;position:relative;margin:auto\" src=\"assets/img/morning.png\"></ion-img>\n          <ion-img *ngIf=\"s_category=='E'\" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Eve\" style=\"width: 13px;height: 13px;position:relative;margin:auto\" src=\"assets/img/evening.png\"></ion-img>\n          <ion-img *ngIf=\"s_category=='DE'\" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Day-Eve\" style=\"width: 16px;height: 18px;position:relative;margin:auto\" src=\"assets/img/morning-evening.png\"></ion-img>\n          <ion-img *ngIf=\"s_category=='EM'\"class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Eve-Mid\" style=\"width: 16px;height: 18px;position:relative;margin:auto\" src=\"assets/img/evening-night.png\"></ion-img>\n          <ion-img *ngIf=\"s_category=='MD'\" class=\"ion-no-padding-top ion-no-padding-bottom ion-no-margin-bottom\"  alt=\"Mid-Day\" style=\"width: 16px;height: 18px;position:relative;margin:auto\" src=\"assets/img/night-morning.png\"></ion-img>\n    </ion-row>\n  </ion-col>\n  <ion-col size=\"6\">\n    <ion-row class=\"data ion-text-center font-size-14px  ion-justify-content-center\" >\n      <ion-label>Alias</ion-label>\n    </ion-row>\n    <ion-row class=\" content-data-black-color ion-text-center font-size-14px  ion-justify-content-center\" >\n      <label >\n        <!-- <b class=\"font-normal\" *ngIf=\"ampm=='am'\">{{hour}}{{addnewShiftDefinition.sh_category}}</b> -->\n        <b class=\"font-normal\" >{{addnewShiftDefinition.sh_category}}</b>\n      </label>\n      <!-- <label *ngIf=\"addnewShiftDefinition.sh_category=='B'\"> -->\n        <!-- <b class=\"font-normal\" *ngIf=\"ampm=='am'\">{{hour}}{{addnewShiftDefinition.sh_category}}</b> -->\n        <!-- <b class=\"font-normal\" >{{addnewShiftDefinition.sh_category}}</b> -->\n      <!-- </label> -->\n      <!-- <label *ngIf=\"addnewShiftDefinition.sh_category=='C'\"> -->\n        <!-- <b class=\"font-normal\" *ngIf=\"ampm=='am'\">{{hour}}{{addnewShiftDefinition.sh_category}}</b> -->\n        <!-- <b class=\"font-normal\" >{{addnewShiftDefinition.sh_category}}</b> -->\n      <!-- </label> -->\n  </ion-row>\n  </ion-col>\n</ion-row>\n\n<!-- </form> -->\n</ion-grid>\n<!-- <ion-grid> -->\n  <!-- <ion-col> -->\n\n\n  <!-- </ion-col> -->\n<!-- </ion-grid> -->\n\n\n<ion-row  class=\"ion-justify-content-center ion-no-margin ion-no-padding\" >\n  <ion-col class=\"ion-text-center\" size=\"6\">\n    <ion-button class=\"app-button\" style=\"width: 60%;float:right;\" shape=\"round\"  (click)=\"cancel()\">Cancel</ion-button>\n  </ion-col>\n  <ion-col class=\"ion-text-center\"  size=\"6\">\n    <ion-button class=\"app-button\" style=\"width: 60%;float: left;\" shape=\"round\"  (click)=\"set()\">Set</ion-button>\n  </ion-col>\n\n</ion-row>\n\n</ion-content>\n");

/***/ }),

/***/ "fo3I":
/*!*************************************************************************************************************!*\
  !*** ./src/app/dashboard/work_load_data/add-new-shift-definition/time-picker/time-picker-routing.module.ts ***!
  \*************************************************************************************************************/
/*! exports provided: TimePickerPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimePickerPageRoutingModule", function() { return TimePickerPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _time_picker_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time-picker.page */ "GgdF");




const routes = [
    {
        path: '',
        component: _time_picker_page__WEBPACK_IMPORTED_MODULE_3__["TimePickerPage"]
    }
];
let TimePickerPageRoutingModule = class TimePickerPageRoutingModule {
};
TimePickerPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], TimePickerPageRoutingModule);



/***/ }),

/***/ "jc3j":
/*!*****************************************************************************************************!*\
  !*** ./src/app/dashboard/work_load_data/add-new-shift-definition/time-picker/time-picker.page.scss ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#time-input-box {\n  padding: 0%;\n  text-align: right;\n  margin: 0%;\n  height: 32px;\n}\n\n.time-picker {\n  flex-direction: column;\n  height: 100% auto;\n  width: 100%;\n  background: white;\n  --webkit-user-select: none;\n  --webkit-touch-callout: none;\n  --webkit-tap-highlight-color: transparent;\n}\n\n@media (pointer: coarse) {\n  .time-picker {\n    zoom: 125%;\n  }\n}\n\n.time-picker > header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2% 0% 0% 0%;\n  height: 80%;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 15px;\n  margin-bottom: 5%;\n  border: 2px solid #0194e3;\n  color: #0194e3;\n}\n\n.time-picker > header > .time-hhmm {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font: 200 20px;\n}\n\n.time-picker > header > .time-hhmm > label > input[type=radio] {\n  display: none;\n}\n\n.time-picker > header > .time-hhmm > label > input[type=radio] + span {\n  opacity: 0.6;\n}\n\n.time-picker > header > .time-hhmm > label > input[type=radio]:checked + span {\n  opacity: 1;\n}\n\n.time-picker > header > .time-ampm {\n  display: flex;\n  flex-direction: column;\n  font: 600 14px/16px;\n}\n\n.time-picker > header > .time-ampm > label {\n  padding: 0 10px;\n}\n\n.time-picker > header > .time-ampm > label > input[type=radio] {\n  display: none;\n}\n\n.time-picker > header > .time-ampm > label > input[type=radio] + span {\n  opacity: 0.6;\n}\n\n.time-picker > header > .time-ampm > label > input[type=radio]:checked + span {\n  opacity: 1;\n}\n\n.time-picker > article {\n  flex: 1;\n  display: flex;\n}\n\n.time-picker > article > .time-dial {\n  padding-top: 0%;\n  margin-top: 0%;\n  position: relative;\n  width: 190px;\n  height: 195px;\n  margin: auto;\n  border-radius: 50%;\n  background: rgba(23, 23, 77, 0.04);\n  font-size: 10px;\n}\n\n.time-picker > article > .time-dial::before {\n  margin: auto;\n  content: \"\";\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  background: #0194e3;\n}\n\n.time-picker > article > .time-dial > label {\n  position: absolute;\n  margin-top: 5%;\n  margin-bottom: 5%;\n}\n\n.time-picker > article > .time-dial > label > input[type=radio] {\n  display: none;\n}\n\n.time-picker > article > .time-dial > label > input[type=radio]:checked + div {\n  background: #0194e3;\n  color: white;\n}\n\n.time-picker > article > .time-dial > label > div {\n  margin-top: -20%;\n  margin-left: auto;\n  margin-right: auto;\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  text-align: center;\n  cursor: pointer;\n}\n\n.time-picker > article > .time-dial > label > div:hover, .time-picker > article > .time-dial > label > div:active {\n  background: rgba(23, 23, 77, 0.1);\n}\n\n.time-picker > article > .time-dial > .hand {\n  position: relative;\n  height: 75px;\n  width: 2px;\n  top: 12%;\n  left: 49%;\n  transform-origin: bottom;\n  background: #0194e3;\n}\n\n.time-picker > footer {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  height: 50px;\n  border-top: 1px solid rgba(23, 23, 77, 0.1);\n}\n\n.time-picker > footer button {\n  height: 36px;\n  margin-right: 16px;\n  padding: 0 10px;\n  border-radius: 4px;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: rgba(23, 23, 77, 0.6);\n  font: 600 16px/21px;\n  text-transform: uppercase;\n  cursor: pointer;\n}\n\n.time-picker > footer button:last-child {\n  color: #0194e3;\n}\n\n.time-picker > footer button:hover, .time-picker > footer button:active {\n  background: rgba(23, 23, 77, 0.1);\n}\n\n.time-picker * {\n  color: inherit;\n  font-family: inherit;\n  font-weight: inherit;\n}\n\n.time-ampm {\n  font-size: 14px;\n}\n\n.time-ampm > label {\n  width: 80%;\n  color: white;\n  border: none;\n  height: 110%;\n  bottom: 0%;\n  padding: 5%;\n}\n\n.time-ampm > label > input[type=radio] {\n  display: none;\n}\n\n.time-ampm > label > input[type=radio] + span {\n  padding: 10%;\n  opacity: 0.6;\n}\n\n.time-ampm > label > input[type=radio]:checked + span {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHRpbWUtcGlja2VyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLFdBQUE7RUFBVyxpQkFBQTtFQUFrQixVQUFBO0VBQVcsWUFBQTtBQUMxQzs7QUFDQTtFQUVFLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBRUEsaUJBQUE7RUFHQSwwQkFBQTtFQUNBLDRCQUFBO0VBQ0EseUNBQUE7QUFGRjs7QUFJRTtFQWJGO0lBY0ksVUFBQTtFQURGO0FBQ0Y7O0FBR0U7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUFrQixrQkFBQTtFQUNsQixtQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxjQWhDSztBQWdDVDs7QUFFSTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUFOOztBQUtRO0VBQ0UsYUFBQTtBQUhWOztBQUtVO0VBQ0UsWUFBQTtBQUhaOztBQU1VO0VBQ0UsVUFBQTtBQUpaOztBQVVJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFSTjs7QUFVTTtFQUNFLGVBQUE7QUFSUjs7QUFXUTtFQUNFLGFBQUE7QUFUVjs7QUFXVTtFQUNFLFlBQUE7QUFUWjs7QUFZVTtFQUNFLFVBQUE7QUFWWjs7QUFpQkU7RUFDRSxPQUFBO0VBQ0EsYUFBQTtBQWZKOztBQWlCSTtFQUNFLGVBQUE7RUFFQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUVBLGtDQUFBO0VBQ0EsZUFBQTtBQWpCTjs7QUFtQk07RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkE1R0M7QUEyRlQ7O0FBb0JNO0VBQ0Usa0JBQUE7RUFHQSxjQUFBO0VBQ0EsaUJBQUE7QUFwQlI7O0FBcUJRO0VBQ0UsYUFBQTtBQW5CVjs7QUFxQlU7RUFDRSxtQkF6SEg7RUEwSEcsWUFBQTtBQW5CWjs7QUF1QlE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBckJWOztBQXVCVTtFQUVFLGlDQUFBO0FBdEJaOztBQTJCTTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBdEpDO0FBNkhUOztBQThCRTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDJDQUFBO0FBNUJKOztBQThCSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLHdCQUFBO0tBQUEscUJBQUE7VUFBQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSw0QkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FBNUJOOztBQThCTTtFQUNFLGNBakxDO0FBcUpUOztBQStCTTtFQUVFLGlDQUFBO0FBOUJSOztBQW9DRTtFQUNFLGNBQUE7RUFDQSxvQkFBQTtFQUNBLG9CQUFBO0FBbENKOztBQW9EQTtFQUdFLGVBQUE7QUFuREY7O0FBc0RFO0VBQ0UsVUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBcERKOztBQXVESTtFQUNFLGFBQUE7QUFyRE47O0FBdURNO0VBQ0UsWUFBQTtFQUNBLFlBQUE7QUFyRFI7O0FBd0RNO0VBQ0UsVUFBQTtBQXREUiIsImZpbGUiOiJ0aW1lLXBpY2tlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAkZm9udDogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4kY29sb3I6IHJnYigyMywgMjMsIDc3KTtcbiRhY2NlbnQ6ICMwMTk0ZTM7XG4jdGltZS1pbnB1dC1ib3h7XG4gIHBhZGRpbmc6MCU7dGV4dC1hbGlnbjogcmlnaHQ7bWFyZ2luOiAwJTtoZWlnaHQ6IDMycHg7XG59XG4udGltZS1waWNrZXIge1xuICAvLyBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDEwMCUgYXV0bztcbiAgd2lkdGg6IDEwMCU7XG4gIC8vIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIC8vIGJveC1zaGFkb3c6IDAgMCAyNHB4IDAgcmdiYSgkY29sb3IsIDAuMSksIDAgMjRweCAyNHB4IDAgcmdiYSgkY29sb3IsIDAuMik7XG4gIC8vIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC0td2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAtLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcblxuICBAbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xuICAgIHpvb206IDEyNSU7XG4gIH1cblxuICA+IGhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDIlIDAlIDAlIDAlO1xuICAgIGhlaWdodDogODAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO21hcmdpbi1yaWdodDphdXRvO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNSU7XG4gICAgYm9yZGVyOjJweCBzb2xpZCAkYWNjZW50O1xuICAgIGNvbG9yOiRhY2NlbnQ7XG5cbiAgICA+IC50aW1lLWhobW0ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGZvbnQ6IDIwMCAyMHB4IDtcblxuICAgICAgPiBsYWJlbCB7XG4gICAgICAgIC8vIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICA+IGlucHV0W3R5cGU9cmFkaW9dIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xuXG4gICAgICAgICAgKyBzcGFuIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmOmNoZWNrZWQgKyBzcGFuIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgPiAudGltZS1hbXBtIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZm9udDogNjAwIDE0cHgvMTZweCA7XG5cbiAgICAgID4gbGFiZWwge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgIC8vIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICA+IGlucHV0W3R5cGU9cmFkaW9dIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xuXG4gICAgICAgICAgKyBzcGFuIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmOmNoZWNrZWQgKyBzcGFuIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgPiBhcnRpY2xlIHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICA+IC50aW1lLWRpYWwge1xuICAgICAgcGFkZGluZy10b3A6IDAlO1xuICAgICAgLy8gbWFyZ2luLXRvcDogMTAlO1xuICAgICAgbWFyZ2luLXRvcDogMCU7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB3aWR0aDogMTkwcHg7XG4gICAgICBoZWlnaHQ6IDE5NXB4O1xuICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLy8gbWFyZ2luLWJvdHRvbTogNSU7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKCRjb2xvciwgMC4wNCk7XG4gICAgICBmb250LXNpemU6IDEwcHggO1xuXG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMnB4O1xuICAgICAgICBoZWlnaHQ6IDEycHg7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJhY2tncm91bmQ6ICRhY2NlbnQ7XG4gICAgICB9XG5cbiAgICAgID4gbGFiZWwge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIC8vIGJvcmRlcjoxcHggc29saWQ7XG5cbiAgICAgICAgbWFyZ2luLXRvcDo1JTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNSU7XG4gICAgICAgID4gaW5wdXRbdHlwZT1yYWRpb10ge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgLy8gYm9yZGVyOiAxcHggc29saWQ7XG4gICAgICAgICAgJjpjaGVja2VkICsgZGl2IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRhY2NlbnQ7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgIG1hcmdpbi10b3A6IC0yMCU7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICAgICY6aG92ZXIsXG4gICAgICAgICAgJjphY3RpdmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgkY29sb3IsIDAuMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgID4gLmhhbmQge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGhlaWdodDogNzVweDtcbiAgICAgICAgd2lkdGg6IDJweDtcbiAgICAgICAgdG9wOiAxMiU7XG4gICAgICAgIGxlZnQ6IDQ5JTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tO1xuICAgICAgICBiYWNrZ3JvdW5kOiAkYWNjZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gID4gZm9vdGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoJGNvbG9yLCAwLjEpO1xuXG4gICAgYnV0dG9uIHtcbiAgICAgIGhlaWdodDogMzZweDtcbiAgICAgIG1hcmdpbi1yaWdodDogMTZweDtcbiAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBjb2xvcjogcmdiYSgkY29sb3IsIDAuNik7XG4gICAgICBmb250OiA2MDAgMTZweC8yMXB4IDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIGNvbG9yOiAkYWNjZW50O1xuICAgICAgfVxuXG4gICAgICAmOmhvdmVyLFxuICAgICAgJjphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKCRjb2xvciwgMC4xKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTdXBwcmVzcyBpbnZhbGlkIGdsb2JhbCBDU1NcbiAgKiB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XG4gIH1cbn1cbi8vIGlvbi1jb2x7XG4vLyAgIGhlaWdodDogMSU7XG4vLyB9XG4vLyBpbnB1dFt0eXBlPXJhZGlvXSB7XG4vLyAgIGRpc3BsYXk6IG5vbmU7XG5cbi8vICAgKyBzcGFuIHtcbi8vICAgICBvcGFjaXR5OiAwLjY7XG4vLyAgIH1cblxuLy8gICAmOmNoZWNrZWQgKyBzcGFuIHtcbi8vICAgICBvcGFjaXR5OiAxO1xuLy8gICB9XG4vLyB9XG5cbi50aW1lLWFtcG0ge1xuICAvLyBkaXNwbGF5OiBmbGV4O1xuICAvLyBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmb250LXNpemU6ICAxNHB4IDtcblxuXG4gID4gbGFiZWwge1xuICAgIHdpZHRoOjgwJSA7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBoZWlnaHQ6IDExMCU7XG4gICAgYm90dG9tOiAwJTtcbiAgICBwYWRkaW5nOiA1JTtcbiAgICAvLyBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICA+IGlucHV0W3R5cGU9cmFkaW9dIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG5cbiAgICAgICsgc3BhbiB7XG4gICAgICAgIHBhZGRpbmc6IDEwJTtcbiAgICAgICAgb3BhY2l0eTogMC42O1xuICAgICAgfVxuXG4gICAgICAmOmNoZWNrZWQgKyBzcGFuIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuIl19 */");

/***/ }),

/***/ "rjIa":
/*!*****************************************************************************************************!*\
  !*** ./src/app/dashboard/work_load_data/add-new-shift-definition/time-picker/time-picker.module.ts ***!
  \*****************************************************************************************************/
/*! exports provided: TimePickerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimePickerPageModule", function() { return TimePickerPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _time_picker_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./time-picker-routing.module */ "fo3I");
/* harmony import */ var _time_picker_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./time-picker.page */ "GgdF");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");








let TimePickerPageModule = class TimePickerPageModule {
};
TimePickerPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
            _time_picker_routing_module__WEBPACK_IMPORTED_MODULE_5__["TimePickerPageRoutingModule"]
        ],
        declarations: [_time_picker_page__WEBPACK_IMPORTED_MODULE_6__["TimePickerPage"]],
        exports: [_time_picker_page__WEBPACK_IMPORTED_MODULE_6__["TimePickerPage"]],
    })
], TimePickerPageModule);



/***/ })

}]);
//# sourceMappingURL=default~src-app-dashboard-work_load_data-add-new-shift-definition-add-new-shift-definition-module~sr~d49003bd.js.map