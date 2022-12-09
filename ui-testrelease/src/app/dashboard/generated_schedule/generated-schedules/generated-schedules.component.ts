
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSlides, LoadingController, ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import straightlines_io_apis from 'src/app/json/apis.json';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { ViewSummaryDayCategoryWisePage } from 'src/app/dashboard/generated_schedule/summary/view-summary-day-category-wise/view-summary-day-category-wise.page';
import { ViewTotalEveShiftLinesDataPage } from 'src/app/dashboard/generated_schedule/summary/view-total-eve-shift-lines-data/view-total-eve-shift-lines-data.page';
import { ViewTotalDayShiftLinesDataPage } from 'src/app/dashboard/generated_schedule/summary/view-total-day-shift-lines-data/view-total-day-shift-lines-data.page';
import { ViewTotalMidShiftLinesDataPage } from 'src/app/dashboard/generated_schedule/summary/view-total-mid-shift-lines-data/view-total-mid-shift-lines-data.page';
import { AddNewShiftLinePage } from 'src/app/dashboard/generated_schedule/add-edit-shift-lines/add-new-shift-line/add-new-shift-line.page';
import { SaveScheduleComponent } from './save-schedule/save-schedule.component';
import { EditScheduleDataPage } from '../add-edit-shift-lines/edit-schedule-data/edit-schedule-data.page';
import { SaveExportActionSheetComponent } from './save-export-action-sheet/save-export-action-sheet.component';

@Component({
  selector: 'app-generated-schedules',
  templateUrl: './generated-schedules.component.html',
  styleUrls: ['./generated-schedules.component.scss'],
})
export class GeneratedSchedulesComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  // generatedScheduleData=GeneratedScheduleData
  // scheduleShift=scheduleShiftLines
  title = 'angular-app';
  fileName= 'Schedule Data.xlsx';
  hideSplitShiftMidDay=false
  hideSplitShiftDayEve=false
  hideSplitShiftEveMid=false
  result1:any=[];
  result2:any=[];
  gData:any=[]
  totalShiftLine:any=[]
  ishidden = true;
  countSunSat=0;countSunMon=0;countMonTue=0;countTueWed=0;countWedThu=0;countThuFri=0;countFriSat=0;
  countFSS=0;countSMS=0;countSMT=0;countMTW=0;countTWT=0;countWTF=0;countTFS=0;countNC=0;
  SunSat=0;SunMon=0;MonTue=0;TueWed=0;WedThu=0;ThuFri=0;FriSat=0;
  coun: any;
  showRDOinfo=false
  excelHeaders:string[] = ["Id","Mon","Tue","Wed","Thu","Fri","Sat"];
  templateToExcel:string[][] = [this.excelHeaders,[]];
  totalCount: any;
  totalDefaultScheduleLine=0
  scheduleShift: any []=[]
  afterdeleteShiftLines:any []=[]
  deleteShiftLines:any []=[]
  defaultscheduleShift: any []=[]
  defaultScheduleShift: any []=[]
  gDatasun: any;
  gDatamon: any;
  gDatatue: any;
  gDatawed: any;
  gDatathu: any;
  gDatafri: any;
  gDatasat: any;
  gDataPattern: any;
  defReqVsGeneData=[]
  generatedComparisonData: any []=[]
  generatedShiftLines:any []=[]
  generatedScheduleData:any []=[]
  requiredEmpData:any
  generatedEmpData
  sun:any;SunDayRequired = [];SunDayGenerated = [];totalSundiff: any;totalSunGenerated: any;totalSunRequired: any;diffSunMid: any;diffSunDay: any;diffSunEve: any;diffSunMidDay: any;diffSunDayEve: any;diffSunEveMid: any;validSunMid: boolean;validSunDay: boolean;validSunEve: boolean;
  mon: any;MonDayRequired= [];MonDayGenerated= [];diffMonMid: any;diffMonDay: any;diffMonEve: any;totalMonRequired: any;totalMonGenerated: any;totalMondiff: any;diffMonMidDay: any;diffMonDayEve: any;diffMonEveMid: any;
  tue:any;TueDayRequired= [];TueDayGenerated= [];diffTueMid: any;diffTueDay: any;diffTueEve: any;totalTueRequired: any;totalTueGenerated: any;totalTuediff: any;diffTueMidDay: any;diffTueDayEve: any;diffTueEveMid: any;
  wed:any;WedDayRequired= [];WedDayGenerated= [];diffWedMid: any;diffWedDay: any;diffWedEve: any;totalWedRequired: any;totalWedGenerated: any;totalWeddiff: any;diffWedMidDay: any;diffWedDayEve: any;diffWedEveMid: any;
  thu:any;ThuDayRequired= [];ThuDayGenerated= [];diffThuMid: any;diffThuDay: any;diffThuEve: any;totalThuRequired: any;totalThuGenerated: any;totalThudiff: any;diffThuMidDay: any;diffThuDayEve: any;diffThuEveMid: any;
  fri:any;FriDayRequired= [];FriDayGenerated= [];diffFriMid: any;diffFriDay: any;diffFriEve: any;totalFriRequired: any;totalFriGenerated: any;totalFridiff: any;diffFriMidDay: any;diffFriDayEve: any;diffFriEveMid: any;
  sat:any;SatDayRequired= [];SatDayGenerated= [];diffSatMid: any;diffSatDay: any;diffSatEve: any;totalSatRequired: any;totalSatGenerated: any;totalSatdiff: any;diffSatMidDay: any;diffSatDayEve: any;diffSatEveMid: any;

  defaultSun: any;defaultSunDayRequired= [];defaultSunDayGenerated= [];defaultDiffSunMid: any;defaultDiffSunDay: any;defaultDiffSunEve: any;defaultTotalSunRequired: any;defaultTotalSunGenerated: any;defaultTotalSundiff: any;defaultDiffSunMidDay: any;defaultDiffSunDayEve: any;defaultDiffSunEveMid: any;
  defaultMon: any;defaultMonDayRequired= [];defaultMonDayGenerated= [];defaultDiffMonMid: any;defaultDiffMonDay: any;defaultDiffMonEve: any;defaultTotalMonRequired: any;defaultTotalMonGenerated: any;defaultTotalMondiff: any;defaultDiffMonMidDay: any;defaultDiffMonDayEve: any;defaultDiffMonEveMid: any;
  defaultTue: any;defaultTueDayRequired= [];defaultTueDayGenerated= [];defaultDiffTueMid: any;defaultDiffTueDay: any;defaultDiffTueEve: any;defaultTotalTueRequired: any;defaultTotalTueGenerated: any;defaultTotalTuediff: any;defaultDiffTueMidDay: any;defaultDiffTueDayEve: any;defaultDiffTueEveMid: any;
  defaultWed: any;defaultWedDayRequired= [];defaultWedDayGenerated= [];defaultDiffWedMid: any;defaultDiffWedDay: any;defaultDiffWedEve: any;defaultTotalWedRequired: any;defaultTotalWedGenerated: any;defaultTotalWeddiff: any;defaultDiffWedMidDay: any;defaultDiffWedDayEve: any;defaultDiffWedEveMid: any;
  defaultThu: any;defaultThuDayRequired= [];defaultThuDayGenerated= [];defaultDiffThuMid: any;defaultDiffThuDay: any;defaultDiffThuEve: any;defaultTotalThuRequired: any;defaultTotalThuGenerated: any;defaultTotalThudiff: any;defaultDiffThuMidDay: any;defaultDiffThuDayEve: any;defaultDiffThuEveMid: any;
  defaultFri: any;defaultFriDayRequired= [];defaultFriDayGenerated= [];defaultDiffFriMid: any;defaultDiffFriDay: any;defaultDiffFriEve: any;defaultTotalFriRequired: any;defaultTotalFriGenerated: any;defaultTotalFridiff: any;defaultDiffFriMidDay: any;defaultDiffFriDayEve: any;defaultDiffFriEveMid: any;
  defaultSat: any;defaultSatDayRequired= [];defaultSatDayGenerated= [];defaultDiffSatMid: any;defaultDiffSatDay: any;defaultDiffSatEve: any;defaultTotalSatRequired: any;defaultTotalSatGenerated: any;defaultTotalSatdiff: any;defaultDiffSatMidDay: any;defaultDiffSatDayEve: any;defaultDiffSatEveMid: any;

  exportData=[] as any
  exportScheduleData=[] as any
  sunDay=[] as any
  defscheduleShift: any;
  sundAy= [] as any;mondAy= [] as any;tuedAy= [] as any;weddAy= [] as any;thudAy= [] as any;fridAy= [] as any;satdAy= [] as any;
  def_sundAy= [] as any;def_mondAy= [] as any;def_tuedAy= [] as any;def_weddAy= [] as any;def_thudAy= [] as any;def_fridAy= [] as any;def_satdAy= [] as any;
  req: number=0;
  all_Schedule=[]

  sun_mid: number=0;sun_day: number=0;sun_eve: number=0;sun_mid_day: number=0;sun_day_eve: number=0;sun_eve_mid: number=0;
  mon_mid: number=0;mon_day: number=0;mon_eve: number=0;mon_mid_day: number=0;mon_day_eve: number=0;mon_eve_mid: number=0;
  tue_mid: number=0;tue_day: number=0;tue_eve: number=0;tue_mid_day: number=0;tue_day_eve: number=0;tue_eve_mid: number=0;
  wed_mid: number=0;wed_day: number=0;wed_eve: number=0;wed_mid_day: number=0;wed_day_eve: number=0;wed_eve_mid: number=0;
  thu_mid: number=0;thu_day: number=0;thu_eve: number=0;thu_mid_day: number=0;thu_day_eve: number=0;thu_eve_mid: number=0;
  fri_mid: number=0;fri_day: number=0;fri_eve: number=0;fri_mid_day: number=0;fri_day_eve: number=0;fri_eve_mid: number=0;
  sat_mid: number=0;sat_day: number=0;sat_eve: number=0;sat_mid_day: number=0;sat_day_eve: number=0;sat_eve_mid: number=0;

  def_sun_mid: number=0;def_sun_day: number=0;def_sun_eve: number=0;def_sun_mid_day: number=0;def_sun_day_eve: number=0;def_sun_eve_mid: number=0;
  def_mon_mid: number=0;def_mon_day: number=0;def_mon_eve: number=0;def_mon_mid_day: number=0;def_mon_day_eve: number=0;def_mon_eve_mid: number=0;
  def_tue_mid: number=0;def_tue_day: number=0;def_tue_eve: number=0;def_tue_mid_day: number=0;def_tue_day_eve: number=0;def_tue_eve_mid: number=0;
  def_wed_mid: number=0;def_wed_day: number=0;def_wed_eve: number=0;def_wed_mid_day: number=0;def_wed_day_eve: number=0;def_wed_eve_mid: number=0;
  def_thu_mid: number=0;def_thu_day: number=0;def_thu_eve: number=0;def_thu_mid_day: number=0;def_thu_day_eve: number=0;def_thu_eve_mid: number=0;
  def_fri_mid: number=0;def_fri_day: number=0;def_fri_eve: number=0;def_fri_mid_day: number=0;def_fri_day_eve: number=0;def_fri_eve_mid: number=0;
  def_sat_mid: number=0;def_sat_day: number=0;def_sat_eve: number=0;def_sat_mid_day: number=0;def_sat_day_eve: number=0;def_sat_eve_mid: number=0;


schedule_id


  workLoadData: any;
  shift: any;
  defRequiredData: any;
  defGeneratedData: any;
  ReqVsGeneTotalData;ReqVsGeneMidData: any;ReqVsGeneDayData: any;ReqVsGeneEveData: any;ReqVsGeneMidDayData: any;ReqVsGeneDayEveData: any;ReqVsGeneEveMidData: any;dayTitleforExcel:any;
  req_shift_1_data;req_shift_2_data;req_shift_3_data;req_shift_4_data;req_shift_5_data;
  gen_shift_1_data;gen_shift_2_data;gen_shift_3_data;gen_shift_4_data;gen_shift_5_data;
  defReqVsGeneTotalData;defReqVsGeneMidData: any;defReqVsGeneDayData: any;defReqVsGeneEveData: any;defReqVsGeneMidDayData: any;defReqVsGeneDayEveData: any;defReqVsGeneEveMidData: any;
  def_gen_shift_1_data;def_gen_shift_2_data;def_gen_shift_3_data;def_gen_shift_4_data;def_gen_shift_5_data
  required_title: any;
  generated_title:any;
  required_vs_generated_title: any;
  customizeScheduleShiftLines=[] as any
  totalCustomizeShiftLine: any;
  customizeShiftData: any;
  testing: any;

  reqData=[] as any
  genData=[] as any
  defGenData=[] as any
  t: string;
  defaultValue=0
  da=[] as any
  updateDefscheduleShiftId: {};
  updatedDefScheduleShiftLines=[] as any
  def=[];defSun=[];defMon=[];defTue=[];defWed=[];defThu=[];defFri=[];defSat=[]
  customized=[];customizedSun=[];customizedMon=[];customizedTue=[];customizedWed=[];customizedThu=[];customizedFri=[];customizedSat=[]
  reqDataShiftTime=[];reqDataSun=[];reqDataMon=[];reqDataTue=[];reqDataWed=[];reqDataThu=[];reqDataFri=[];reqDataSat=[]
  reqvsgenDefDataShiftTime=[];reqvsgenDefDataSun=[];reqvsgenDefDataMon=[];reqvsgenDefDataTue=[];reqvsgenDefDataWed=[];reqvsgenDefDataThu=[];reqvsgenDefDataFri=[];reqvsgenDefDataSat=[]
  reqvsgenDataShiftTime=[];reqvsgenDataSun=[];reqvsgenDataMon=[];reqvsgenDataTue=[];reqvsgenDataWed=[];reqvsgenDataThu=[];reqvsgenDataFri=[];reqvsgenDataSat=[]
  focusShiftLine
  allShiftData: any;
  allShiftName: any[];
  ReqVsGeneData=[]
  midData=[] as any
 dayData= [] as any
 demo=[] as any
 diffDay_23_sun: number;
 diffDay_23_tue: number;
 diffDay_23_mon: number;
 diffDay_23_wed: number;
 diffDay_23_thu: number;
 diffDay_23_fri: number;
 diffDay_23_sat: number;
 summary_days:any []=[{"id":0,"day":"Sun"},{"id":1,"day":"Mon"},{"id":2,"day":"Tue"},{"id":3,"day":"Wed"},{"id":4,"day":"Thu"},{"id":5,"day":"Fri"},{"id":6,"day":"Sat"}]
 default_value=0
 hide_BL_rules_Labels=false
 addShiftData: any
 gShift: any;
 schedule_title
 schedule_length
 one_generated_schedule
 three_generated_schedule
 nextslide=true
 slideOption={
  shortSwipes:false,
  longSwipes:true,
  longSwipesRatio:0.1,
  initialSlide: 0,
  spaceBetween: 70,

 }
 defrdosArr=[]
 currentShiftlineScheduleShiftDuration=8
 allScheduleShift
 rowCount=0
 checkBidShceduleInProgress=false
 _nextId
 chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 _chars
 focusSHiftLineScheduleId
 alldefscheduleShift
 allShiftCategory=[1,2,3,4,5,6]
 checkUserAccess=false
 rdosArr=[]
//  generated_schedule_3=true
  // HighlightRow : Number;
  // ClickedRow:any;
  constructor(public modalCtrl: ModalController,
              private route:Router,
              public alertCtrl: AlertController,
              public loadingController: LoadingController,
              public popoverController: PopoverController,
              private headerTitleService: HeaderTitleService,
              private router: ActivatedRoute,public navParams: NavParams,
              public navCtrl: NavController,
              private cdref: ChangeDetectorRef,
              public actionsheetCtrl: ActionSheetController,
              ) {

          this.schedule_id=0

  }
  // ngAfterViewInit() {
  //   this.slides.lockSwipes(this.nextslide);

  // }
  user_data
   ngOnInit() {
     if(sessionStorage.getItem('token')!=undefined){
       this.checkUserAccess=true
     }else{
      this.checkUserAccess=false
     }
    this._chars = this.chars;
    this._nextId = [0];
    this.headerTitleService.setTitle('Generated Shiftline Schedule');
    this.headerTitleService.setDefaultHeader(true)
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    if(this.user_data.role=='bidmanager'){

if(straightlines_io_apis.apis.generated_schedule===String(this.route.url).substr(1)){
  this.headerTitleService.setForwardUrl(null);
  this.headerTitleService.checkBiddingTime('');this.headerTitleService.checkBiddingEndDate('');
  this.headerTitleService.setBackUrl(straightlines_io_apis.apis.enter_Work_load);
}else{
  this.headerTitleService.setBackUrl(straightlines_io_apis.apis.enter_Work_load_api);
  this.headerTitleService.setForwardUrl(null);
  this.headerTitleService.checkBiddingTime('');this.headerTitleService.checkBiddingEndDate('');
}
}else{
  this.headerTitleService.setBackUrl(straightlines_io_apis.apis.guest_enter_Work_load);
  this.headerTitleService.setForwardUrl(null);
  this.headerTitleService.checkBiddingTime('');this.headerTitleService.checkBiddingEndDate('');

}

this.exportData=[]
this.customizeShiftData=[]
     this.customizeScheduleShiftLines=[]
this.defGeneratedData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.defRequiredData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.generatedEmpData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.requiredEmpData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.scheduleShift=JSON.parse(localStorage.getItem('customizedScheduleShiftLine'))
this.alldefscheduleShift=JSON.parse(localStorage.getItem('defaultScheduleShiftLine'))
this.focusShiftLine=JSON.parse(localStorage.getItem('focusShiftLine'))
this.allShiftData=  JSON.parse(localStorage.getItem('allShiftRequiredData'))
this.currentShiftlineScheduleShiftDuration=this.scheduleShift[0][0].shiftdurationp
if(this.scheduleShift.length<2){
   this.one_generated_schedule=true,this.three_generated_schedule=false
   if(this.currentShiftlineScheduleShiftDuration==undefined){
    this.schedule_title=' Schedule Generated !'
   }else{
    this.schedule_title='('+this.currentShiftlineScheduleShiftDuration+'-Hours) Schedule Generated !'
   }

  //  this.slides.lockSwipes(true)
}
if(this.scheduleShift.length>2){
  if(this.currentShiftlineScheduleShiftDuration==undefined){
    this.schedule_title='3 - Possible Schedules Generated !'
   }else{
    this.schedule_title='3 - Possible ('+this.currentShiftlineScheduleShiftDuration+'-Hours) Schedules Generated !'
   }

   this.one_generated_schedule=false,this.three_generated_schedule=true
   if(this.focusShiftLine!=null || this.focusShiftLine!=undefined){
   this.slideOption.initialSlide=this.focusShiftLine.schedule_id

   this.cdref.detectChanges()
  }else{
    this.slideOption.initialSlide=0
     this.cdref.detectChanges()
  }
  this.cdref.detectChanges()
   if(this.focusShiftLine!=null || this.focusShiftLine!=undefined){
        this.focusSHiftLineScheduleId=this.focusShiftLine.schedule_id
        }
        else{
          this.schedule_id=0
        }
        this.cdref.detectChanges()
    }this.generatedShiftlineScheduleData()
   }
   generatedShiftlineScheduleData(){
    this.exportData=[]
    this.customizeShiftData=[]
         this.customizeScheduleShiftLines=[]
         this.defGeneratedData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.defRequiredData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.generatedEmpData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.requiredEmpData=JSON.parse(localStorage.getItem('requiredEmpData'))
this.scheduleShift=JSON.parse(localStorage.getItem('customizedScheduleShiftLine'))
this.alldefscheduleShift=JSON.parse(localStorage.getItem('defaultScheduleShiftLine'))
this.focusShiftLine=JSON.parse(localStorage.getItem('focusShiftLine'))
this.allShiftData=  JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
this.allScheduleShift=this.scheduleShift
// console.log(this.scheduleShift)
this.schedule_length=this.scheduleShift.length
if(this.focusShiftLine!=null && this.focusShiftLine!='' && this.focusShiftLine!=undefined){
  this.focusSHiftLineScheduleId=this.focusShiftLine.schedule_id
  this.focusShiftLine=this.focusShiftLine.shift_line.id
 }else{
  this.focusShiftLine=''
  this.focusSHiftLineScheduleId=''
 }


for(var i=0;i<this.allShiftData.length;i++){
  if( Number(this.allShiftData[i].shiftCategory)==4){
     this.hideSplitShiftMidDay=true
  }
  else if( Number(this.allShiftData[i].shiftCategory)==5){
    this.hideSplitShiftDayEve=true
  }
  else if( Number(this.allShiftData[i].shiftCategory)==6){
     this.hideSplitShiftEveMid=true
  }
}


this.cdref.detectChanges()
this.allShiftName=[]
this.allShiftName.push({"shiftName":'X',"shiftCategory":'X'})
for(var i=0;i<this.allShiftData.length;i++){
  this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shiftTime":this.allShiftData[i].startTime})
}


var r = [],r1=[],r2=[],r3=[]
this.allShiftData.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.startTime) - Number(a.startTime));
r=r.sort((a,b) => Number(a.startTime) - Number(b.startTime));
this.allShiftData=r1.concat(r);

this.allShiftData=this.allShiftData.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
this.shift=['M',6,7,1,3]

if(this.schedule_id==undefined){
  this.schedule_id=0
}
this.defscheduleShift=this.alldefscheduleShift[this.schedule_id]
this.scheduleShift=this.allScheduleShift[this.schedule_id]
this.totalCount=0;this.countNC=0
this.countSunSat=0;this.countSunMon=0;this.countMonTue=0;this.countTueWed=0;this.countWedThu=0;this.countThuFri=0;this.countFriSat=0;
this.countFSS=0;this.countSMS=0;this.countSMT=0;this.countMTW=0;this.countTWT=0;this.countWTF=0;this.countTFS=0;

for(var i=0; i<=this.defscheduleShift.length;i++)
{
  if(this.defscheduleShift[i] !=undefined){
  if(this.defscheduleShift[i]?.SL  == 'SS' || this.defscheduleShift[i]?.SL  == 'SS-A'){
    this.countSunSat++
  }
  else if(this.defscheduleShift[i]?.SL  == 'SM' || this.defscheduleShift[i]?.SL  == 'SM-A'){
    this.countSunMon++
  }
  else if(this.defscheduleShift[i]?.SL  == 'MT' || this.defscheduleShift[i]?.SL  == 'MT-A'){
    this.countMonTue++
  }
  else if(this.defscheduleShift[i]?.SL  == 'TW' || this.defscheduleShift[i]?.SL  == 'TW-A'){
    this.countTueWed++
  }
  else if(this.defscheduleShift[i]?.SL  == 'WT' || this.defscheduleShift[i]?.SL  == 'WT-A' || this.defscheduleShift[i]?.SL  == 'WTh' || this.defscheduleShift[i]?.SL  == 'WTh-A'){
    this.countWedThu++
  }
  else if(this.defscheduleShift[i]?.SL  == 'TF' || this.defscheduleShift[i]?.SL  == 'TF-A' || this.defscheduleShift[i]?.SL  == 'ThF' || this.defscheduleShift[i]?.SL  == 'ThF-A'){
    this.countThuFri++
  }
  else if(this.defscheduleShift[i]?.SL  == 'FS' || this.defscheduleShift[i]?.SL  == 'FS-A'){
    this.countFriSat++
  }
 else if(this.defscheduleShift[i]?.SL  == 'TFS' || this.defscheduleShift[i]?.SL  == 'TFS-A'||this.defscheduleShift[i]?.SL  == 'ThFS' || this.defscheduleShift[i]?.SL  == 'ThFS-A'){
    this.countTFS++
  }
  else if(this.defscheduleShift[i]?.SL  == 'FSS' || this.defscheduleShift[i]?.SL  == 'FSS-A'){
    this.countFSS++
  }
  else if(this.defscheduleShift[i]?.SL  == 'SMS' || this.defscheduleShift[i]?.SL  == 'SMS-A'){
    this.countSMS++
  }
  else if(this.defscheduleShift[i]?.SL  == 'SMT' || this.defscheduleShift[i]?.SL  == 'SMT-A'){
    this.countSMT++
  }
  else if(this.defscheduleShift[i]?.SL  == 'MTW' || this.defscheduleShift[i]?.SL  == 'MTW-A'){
    this.countMTW++
  }
  else if(this.defscheduleShift[i]?.SL  == 'TWT' || this.defscheduleShift[i]?.SL  == 'TWT-A'||this.defscheduleShift[i]?.SL  == 'TWTh' || this.defscheduleShift[i]?.SL  == 'TWTh-A'){
    this.countTWT++
  }
  else if(this.defscheduleShift[i]?.SL  == 'WTF' || this.defscheduleShift[i]?.SL  == 'WTF-A'||this.defscheduleShift[i]?.SL  == 'WThF' || this.defscheduleShift[i]?.SL  == 'WThF-A'){
    this.countWTF++
  }else{
    this.countNC++
  }
  }
}
this.defrdosArr=[]
if(this.currentShiftlineScheduleShiftDuration==8){
  this.defrdosArr=[{'rdo':'SS','count':this.countSunSat,'rdoInfo':'Sat-Sun'},{'rdo':'SM','count':this.countSunMon,'rdoInfo':'Sun-Mon'},{'rdo':'MT','count':this.countMonTue,'rdoInfo':'Mon-Tue'},
  {'rdo':'TW','count':this.countTueWed,'rdoInfo':'Tue-Wed'},{'rdo':'WTh','count':this.countWedThu,'rdoInfo':'Wed-Thu'},{'rdo':'ThF','count':this.countThuFri,'rdoInfo':'Thu-Fri'},{'rdo':'FS','count':this.countFriSat,'rdoInfo':'Fri-Sat'}]
  if(this.countFSS>0){this.defrdosArr.push({'rdo':'FSS','count':this.countFSS,'rdoInfo':'Fri-Sat-Sun'})}
  if(this.countSMS>0){this.defrdosArr.push({'rdo':'SMS','count':this.countSMS,'rdoInfo':'Sun-Mon-Sat'})}
  if(this.countSMT>0){this.defrdosArr.push({'rdo':'SMT','count':this.countSMT,'rdoInfo':'Sun-Mon-Tue'})}
  if(this.countMTW>0){this.defrdosArr.push({'rdo':'MTW','count':this.countMTW,'rdoInfo':'Mon-Tue-Wed'})}
  if(this.countTWT>0){this.defrdosArr.push({'rdo':'TWTh','count':this.countTWT,'rdoInfo':'Tue-Wed-Thu'})}
  if(this.countWTF>0){this.defrdosArr.push({'rdo':'WThF','count':this.countWTF,'rdoInfo':'Wed-Thu-Fri'})}
  if(this.countTFS>0){this.defrdosArr.push({'rdo':'ThFS','count':this.countTFS,'rdoInfo':'Thu-Fri-Sat'})}
  if(this.countNC>0){this.defrdosArr.push({'rdo':'NC','count':this.countNC,'rdoInfo':'NC'})}
}else{
  this.defrdosArr=[{'rdo':'FSS','count':this.countFSS,'rdoInfo':'Fri-Sat-Sun'},{'rdo':'SMS','count':this.countSMS,'rdoInfo':'Sun-Mon-Sat'},{'rdo':'SMT','count':this.countSMT,'rdoInfo':'Sun-Mon-Tue'},{'rdo':'MTW','count':this.countMTW,'rdoInfo':'Mon-Tue-Wed'},
    {'rdo':'TWTh','count':this.countTWT,'rdoInfo':'Tue-Wed-Thu'},{'rdo':'WThF','count':this.countWTF,'rdoInfo':'Wed-Thu-Fri'},{'rdo':'ThFS','count':this.countTFS,'rdoInfo':'Thu-Fri-Sat'}]
    if(this.countSunSat>0){this.defrdosArr.push({'rdo':'SS','count':this.countSunSat,'rdoInfo':'Sat-Sun'})}
    if(this.countSunMon>0){this.defrdosArr.push({'rdo':'SM','count':this.countSunMon,'rdoInfo':'Sun-Mon'})}
    if(this.countMonTue>0){this.defrdosArr.push({'rdo':'MT','count':this.countMonTue,'rdoInfo':'Mon-Tue'})}
    if(this.countTueWed>0){this.defrdosArr.push({'rdo':'TW','count':this.countTueWed,'rdoInfo':'Tue-Wed'})}
    if(this.countWedThu>0){this.defrdosArr.push({'rdo':'WTh','count':this.countWedThu,'rdoInfo':'Wed-Thu'})}
    if(this.countThuFri>0){this.defrdosArr.push({'rdo':'ThF','count':this.countThuFri,'rdoInfo':'Thu-Fri'})}
    if(this.countFriSat>0){this.defrdosArr.push({'rdo':'FS','count':this.countFriSat,'rdoInfo':'Fri-Sat'})}
    if(this.countNC>0){this.defrdosArr.push({'rdo':'NC','count':this.countNC,'rdoInfo':'NC'})}
}
this.totalCount=0;this.countNC=0
this.countSunSat=0;this.countSunMon=0;this.countMonTue=0;this.countTueWed=0;this.countWedThu=0;this.countThuFri=0;this.countFriSat=0;
this.countFSS=0;this.countSMS=0;this.countSMT=0;this.countMTW=0;this.countTWT=0;this.countWTF=0;this.countTFS=0;
var tempRdo=[]
for(var i=0; i<=this.scheduleShift.length;i++)
{
  if(this.scheduleShift[i] !=undefined){
  if(this.scheduleShift[i]?.SL  == 'SS' || this.scheduleShift[i]?.SL  == 'SS-A'){
    this.countSunSat++
  }
  else if(this.scheduleShift[i]?.SL  == 'SM' || this.scheduleShift[i]?.SL  == 'SM-A'){
    this.countSunMon++
  }
  else if(this.scheduleShift[i]?.SL  == 'MT' || this.scheduleShift[i]?.SL  == 'MT-A'){
    this.countMonTue++
  }
  else if(this.scheduleShift[i]?.SL  == 'TW' || this.scheduleShift[i]?.SL  == 'TW-A'){
    this.countTueWed++
  }
  else if(this.scheduleShift[i]?.SL  == 'WT' || this.scheduleShift[i]?.SL  == 'WT-A' || this.scheduleShift[i]?.SL  == 'WTh' || this.scheduleShift[i]?.SL  == 'WTh-A'){
    this.countWedThu++
  }
  else if(this.scheduleShift[i]?.SL  == 'TF' || this.scheduleShift[i]?.SL  == 'TF-A' || this.scheduleShift[i]?.SL  == 'ThF' || this.scheduleShift[i]?.SL  == 'ThF-A'){
    this.countThuFri++
  }
  else if(this.scheduleShift[i]?.SL  == 'FS' || this.scheduleShift[i]?.SL  == 'FS-A'){
    this.countFriSat++
  }
 else if(this.scheduleShift[i]?.SL  == 'TFS' || this.scheduleShift[i]?.SL  == 'TFS-A'||this.scheduleShift[i]?.SL  == 'ThFS' || this.scheduleShift[i]?.SL  == 'ThFS-A'){
    this.countTFS++
  }
  else if(this.scheduleShift[i]?.SL  == 'FSS' || this.scheduleShift[i]?.SL  == 'FSS-A'){
    this.countFSS++
  }
  else if(this.scheduleShift[i]?.SL  == 'SMS' || this.scheduleShift[i]?.SL  == 'SMS-A'){
    this.countSMS++
  }
  else if(this.scheduleShift[i]?.SL  == 'SMT' || this.scheduleShift[i]?.SL  == 'SMT-A'){
    this.countSMT++
  }
  else if(this.scheduleShift[i]?.SL  == 'MTW' || this.scheduleShift[i]?.SL  == 'MTW-A'){
    this.countMTW++
  }
  else if(this.scheduleShift[i]?.SL  == 'TWT' || this.scheduleShift[i]?.SL  == 'TWT-A'||this.scheduleShift[i]?.SL  == 'TWTh' || this.scheduleShift[i]?.SL  == 'TWTh-A'){
    this.countTWT++
  }
  else if(this.scheduleShift[i]?.SL  == 'WTF' || this.scheduleShift[i]?.SL  == 'WTF-A'||this.scheduleShift[i]?.SL  == 'WThF' || this.scheduleShift[i]?.SL  == 'WThF-A'){
    this.countWTF++
  }else{
    this.countNC++
  }
  this.totalCount++
  }
}
this.rdosArr=[]
if(this.currentShiftlineScheduleShiftDuration==8){
  this.rdosArr=[{'rdo':'SS','count':this.countSunSat,'rdoInfo':'Sat-Sun'},{'rdo':'SM','count':this.countSunMon,'rdoInfo':'Sun-Mon'},{'rdo':'MT','count':this.countMonTue,'rdoInfo':'Mon-Tue'},
  {'rdo':'TW','count':this.countTueWed,'rdoInfo':'Tue-Wed'},{'rdo':'WTh','count':this.countWedThu,'rdoInfo':'Wed-Thu'},{'rdo':'ThF','count':this.countThuFri,'rdoInfo':'Thu-Fri'},{'rdo':'FS','count':this.countFriSat,'rdoInfo':'Fri-Sat'}]
  if(this.countFSS>0){this.rdosArr.push({'rdo':'FSS','count':this.countFSS,'rdoInfo':'Fri-Sat-Sun'})}
  if(this.countSMS>0){this.rdosArr.push({'rdo':'SMS','count':this.countSMS,'rdoInfo':'Sun-Mon-Sat'})}
  if(this.countSMT>0){this.rdosArr.push({'rdo':'SMT','count':this.countSMT,'rdoInfo':'Sun-Mon-Tue'})}
  if(this.countMTW>0){this.rdosArr.push({'rdo':'MTW','count':this.countMTW,'rdoInfo':'Mon-Tue-Wed'})}
  if(this.countTWT>0){this.rdosArr.push({'rdo':'TWTh','count':this.countTWT,'rdoInfo':'Tue-Wed-Thu'})}
  if(this.countWTF>0){this.rdosArr.push({'rdo':'WThF','count':this.countWTF,'rdoInfo':'Wed-Thu-Fri'})}
  if(this.countTFS>0){this.rdosArr.push({'rdo':'ThFS','count':this.countTFS,'rdoInfo':'Thu-Fri-Sat'})}
  if(this.countNC>0){this.rdosArr.push({'rdo':'NC','count':this.countNC,'rdoInfo':'NC'})}
}else{
  this.rdosArr=[{'rdo':'FSS','count':this.countFSS,'rdoInfo':'Fri-Sat-Sun'},{'rdo':'SMS','count':this.countSMS,'rdoInfo':'Sun-Mon-Sat'},{'rdo':'SMT','count':this.countSMT,'rdoInfo':'Sun-Mon-Tue'},{'rdo':'MTW','count':this.countMTW,'rdoInfo':'Mon-Tue-Wed'},
    {'rdo':'TWTh','count':this.countTWT,'rdoInfo':'Tue-Wed-Thu'},{'rdo':'WThF','count':this.countWTF,'rdoInfo':'Wed-Thu-Fri'},{'rdo':'ThFS','count':this.countTFS,'rdoInfo':'Thu-Fri-Sat'}]
    if(this.countSunSat>0){this.rdosArr.push({'rdo':'SS','count':this.countSunSat,'rdoInfo':'Sat-Sun'})}
    if(this.countSunMon>0){this.rdosArr.push({'rdo':'SM','count':this.countSunMon,'rdoInfo':'Sun-Mon'})}
    if(this.countMonTue>0){this.rdosArr.push({'rdo':'MT','count':this.countMonTue,'rdoInfo':'Mon-Tue'})}
    if(this.countTueWed>0){this.rdosArr.push({'rdo':'TW','count':this.countTueWed,'rdoInfo':'Tue-Wed'})}
    if(this.countWedThu>0){this.rdosArr.push({'rdo':'WTh','count':this.countWedThu,'rdoInfo':'Wed-Thu'})}
    if(this.countThuFri>0){this.rdosArr.push({'rdo':'ThF','count':this.countThuFri,'rdoInfo':'Thu-Fri'})}
    if(this.countFriSat>0){this.rdosArr.push({'rdo':'FS','count':this.countFriSat,'rdoInfo':'Fri-Sat'})}
    if(this.countNC>0){this.rdosArr.push({'rdo':'NC','count':this.countNC,'rdoInfo':'NC'})}
}
this.updatedDefScheduleShiftLines=[]
for(var i=0;i<this.defscheduleShift.length;i++){
  this.updateDefscheduleShiftId=[this.defscheduleShift[i].SL+(this.defscheduleShift[i].id+ + +1),this.defscheduleShift[i].Sun,this.defscheduleShift[i].Mon,this.defscheduleShift[i].Tue,this.defscheduleShift[i].Wed,this.defscheduleShift[i].Thu,this.defscheduleShift[i].Fri,this.defscheduleShift[i].Sat,this.defscheduleShift[i].Pattern,this.defscheduleShift[i].shiftdurationc]
  this.updatedDefScheduleShiftLines.push(this.updateDefscheduleShiftId)
}
this.customizeScheduleShiftLines=[]
for(var i=0;i<this.scheduleShift.length;i++){
  if(this.scheduleShift[i]!=undefined){
    if(this.scheduleShift[i].SL!=undefined && this.scheduleShift[i].SL!=null){
      this.customizeShiftData=[this.scheduleShift[i].SL+(this.scheduleShift[i].id+ + + 1 ),this.scheduleShift[i].Sun,this.scheduleShift[i].Mon,this.scheduleShift[i].Tue,this.scheduleShift[i].Wed,this.scheduleShift[i].Thu,this.scheduleShift[i].Fri,this.scheduleShift[i].Sat,this.scheduleShift[i].Pattern,this.scheduleShift[i].shiftdurationc]
    this.customizeScheduleShiftLines.push(this.customizeShiftData)
    }
  }
}

this.sundAy=[]
this.mondAy=[]
this.tuedAy=[]
this.weddAy=[]
this.thudAy=[]
this.fridAy=[]
this.satdAy=[]
var shiftDu=8
for(var i=0;i<this.scheduleShift.length;i++){

  if(this.scheduleShift[i].Sun!='X' && this.scheduleShift[i].Sun!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.sundAy.push({"shiftName":this.scheduleShift[i].Sun.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Sun,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Sun,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Sun,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.sundAy.push({"shiftName":this.scheduleShift[i].Sun,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Sun,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Sun,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Sun,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Sunshift2 !='X' && this.scheduleShift[i].Sunshift2 !='x' && this.scheduleShift[i].Sunshift2 !=null && this.scheduleShift[i].Sunshift2 !='' && this.scheduleShift[i].Sunshift2 !=undefined){
    this.sundAy.push({"shiftName":this.scheduleShift[i].Sunshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Sunshift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Sunshift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Sunshift2,this.scheduleShift[i].shiftdurationc)})
  }
  if(this.scheduleShift[i].Mon!='X' && this.scheduleShift[i].Mon!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.mondAy.push({"shiftName":this.scheduleShift[i].Mon.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Mon,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Mon,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Mon,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.mondAy.push({"shiftName":this.scheduleShift[i].Mon,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Mon,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Mon,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Mon,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Monshift2 !='X' && this.scheduleShift[i].Monshift2 !='x' && this.scheduleShift[i].Monshift2 !=null && this.scheduleShift[i].Monshift2 !='' && this.scheduleShift[i].Monshift2 !=undefined){
    this.mondAy.push({"shiftName":this.scheduleShift[i].Monshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Monshift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Monshift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Monshift2,this.scheduleShift[i].shiftdurationc)})
  }
  if(this.scheduleShift[i].Tue!='X' && this.scheduleShift[i].Tue!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.tuedAy.push({"shiftName":this.scheduleShift[i].Tue.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Tue,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Tue,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Tue,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.tuedAy.push({"shiftName":this.scheduleShift[i].Tue,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Tue,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Tue,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Tue,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Tueshift2 !='X' && this.scheduleShift[i].Tueshift2 !='x' && this.scheduleShift[i].Tueshift2 !=null && this.scheduleShift[i].Tueshift2 !='' && this.scheduleShift[i].Tueshift2 !=undefined){
    this.tuedAy.push({"shiftName":this.scheduleShift[i].Tueshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Tueshift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Tueshift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Tueshift2,this.scheduleShift[i].shiftdurationc)})
  }
  if(this.scheduleShift[i].Wed!='X' && this.scheduleShift[i].Wed!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.weddAy.push({"shiftName":this.scheduleShift[i].Wed.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Wed,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Wed,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Wed,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.weddAy.push({"shiftName":this.scheduleShift[i].Wed,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Wed,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Wed,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Wed,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Wedshift2 !='X' && this.scheduleShift[i].Wedshift2 !='x' && this.scheduleShift[i].Wedshift2 !=null && this.scheduleShift[i].Wedshift2 !='' && this.scheduleShift[i].Wedshift2 !=undefined){
    this.weddAy.push({"shiftName":this.scheduleShift[i].Wedshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Wedshift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Wedshift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Wedshift2,this.scheduleShift[i].shiftdurationc)})
  }
  if(this.scheduleShift[i].Thu!='X' && this.scheduleShift[i].Thu!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.thudAy.push({"shiftName":this.scheduleShift[i].Thu.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Thu,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Thu,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Thu,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.thudAy.push({"shiftName":this.scheduleShift[i].Thu,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Thu,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Thu,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Thu,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Thushift2 !='X' && this.scheduleShift[i].Thushift2 !='x' && this.scheduleShift[i].Thushift2 !=null && this.scheduleShift[i].Thushift2 !='' && this.scheduleShift[i].Thushift2 !=undefined){
    this.thudAy.push({"shiftName":this.scheduleShift[i].Thushift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Thushift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Thushift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Thushift2,this.scheduleShift[i].shiftdurationc)})
  }
  if(this.scheduleShift[i].Fri!='X' && this.scheduleShift[i].Fri!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.fridAy.push({"shiftName":this.scheduleShift[i].Fri.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Fri,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Fri,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Fri,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.fridAy.push({"shiftName":this.scheduleShift[i].Fri,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Fri,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Fri,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Fri,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Frishift2 !='X' && this.scheduleShift[i].Frishift2 !='x' && this.scheduleShift[i].Frishift2 !=null && this.scheduleShift[i].Frishift2 !='' && this.scheduleShift[i].Frishift2 !=undefined){
    this.fridAy.push({"shiftName":this.scheduleShift[i].Frishift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Frishift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Frishift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Frishift2,this.scheduleShift[i].shiftdurationc)})
  }
  if(this.scheduleShift[i].Sat!='X' && this.scheduleShift[i].Sat!='x'){
    if(Number(this.scheduleShift[i].shiftdurationc)==9){
      this.satdAy.push({"shiftName":this.scheduleShift[i].Sat.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Sat,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Sat,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Sat,this.scheduleShift[i].shiftdurationc)})
    }else{
      this.satdAy.push({"shiftName":this.scheduleShift[i].Sat,"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Sat,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Sat,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Sat,this.scheduleShift[i].shiftdurationc)})
    }
  }
  if(this.scheduleShift[i].Satshift2 !='X' && this.scheduleShift[i].Satshift2 !='x' && this.scheduleShift[i].Satshift2 !=null && this.scheduleShift[i].Satshift2 !='' && this.scheduleShift[i].Satshift2 !=undefined){
    this.satdAy.push({"shiftName":this.scheduleShift[i].Satshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.scheduleShift[i].Satshift2,this.scheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.scheduleShift[i].Satshift2,this.scheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.scheduleShift[i].Satshift2,this.scheduleShift[i].shiftdurationc)})
  }
}

var countsCustomizedSunDay =[]
countsCustomizedSunDay=[...this.sundAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]
var countsCustomizedMonDay=[]
countsCustomizedMonDay =[...this.mondAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var countsCustomizedTueDay=[]
countsCustomizedTueDay =[...this.tuedAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var countsCustomizedWedDay = [];
countsCustomizedWedDay=[...this.weddAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var countsCustomizedThuDay = [];
countsCustomizedThuDay=[...this.thudAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]
var countsCustomizedFriDay = [];
countsCustomizedFriDay=[...this.fridAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]
var countsCustomizedSatDay = [];
countsCustomizedSatDay=[...this.satdAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var isFoundSun,isFoundMon,isFoundTue,isFoundWed,isFoundThu,isFoundFri,isFoundSat
for(var j=0;j<this.allShiftData.length;j++){
  for(var i=0;i<countsCustomizedSunDay.length;i++){
    isFoundSun = countsCustomizedSunDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedMonDay.length;i++){
    isFoundMon = countsCustomizedMonDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedTueDay.length;i++){
    isFoundTue = countsCustomizedTueDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedWedDay.length;i++){
    isFoundWed = countsCustomizedWedDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedThuDay.length;i++){
    isFoundThu = countsCustomizedThuDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedFriDay.length;i++){
    isFoundFri = countsCustomizedFriDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedSatDay.length;i++){
    isFoundSat = countsCustomizedSatDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  if(this.allShiftData[j].shift_duration!=this.currentShiftlineScheduleShiftDuration && isFoundSun==false && isFoundMon==false && isFoundTue==false && isFoundWed==false&&isFoundThu==false&&isFoundFri==false&&isFoundSat==false){

  }else{
  if(isFoundMon==false){countsCustomizedMonDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  if(isFoundTue==false){countsCustomizedTueDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  if(isFoundWed==false){countsCustomizedWedDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  if(isFoundThu==false){countsCustomizedThuDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  if(isFoundSun==false){countsCustomizedSunDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  if(isFoundFri==false){countsCustomizedFriDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  if(isFoundSat==false){countsCustomizedSatDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  }
}

let sunTotalEmp=[];let monTotalEmp=[];let tueTotalEmp=[];let wedTotalEmp=[];let thuTotalEmp=[];let friTotalEmp=[];let satTotalEmp=[]
this.sun_mid=0;this.sun_day=0;this.sun_eve=0;this.sun_mid_day=0;this.sun_day_eve=0;this.sun_eve_mid=0;
this.mon_mid=0;this.mon_day=0;this.mon_eve=0;this.mon_mid_day=0;this.mon_day_eve=0;this.mon_eve_mid=0;
this.tue_mid=0;this.tue_day=0;this.tue_eve=0;this.tue_mid_day=0;this.tue_day_eve=0;this.tue_eve_mid=0;
this.wed_mid=0;this.wed_day=0;this.wed_eve=0;this.wed_mid_day=0;this.wed_day_eve=0;this.wed_eve_mid=0;
this.thu_mid=0;this.thu_day=0;this.thu_eve=0;this.thu_mid_day=0;this.thu_day_eve=0;this.thu_eve_mid=0;
this.fri_mid=0;this.fri_day=0;this.fri_eve=0;this.fri_mid_day=0;this.fri_day_eve=0;this.fri_eve_mid=0;
this.sat_mid=0;this.sat_day=0;this.sat_eve=0;this.sat_mid_day=0;this.sat_day_eve=0;this.sat_eve_mid=0;
for(var i=0;i<countsCustomizedSunDay.length;i++){
  if(countsCustomizedSunDay[i].shiftCategory=='1'){
    this.sun_mid=this.sun_mid+ + +countsCustomizedSunDay[i].totalEmp
  }
  else if(countsCustomizedSunDay[i].shiftCategory=='3'){
    this.sun_day=this.sun_day+ + +countsCustomizedSunDay[i].totalEmp
  }
  else if(countsCustomizedSunDay[i].shiftCategory=='2'){
    this.sun_eve=this.sun_eve+ + +countsCustomizedSunDay[i].totalEmp
  }
  else if(countsCustomizedSunDay[i].shiftCategory=='4'){
    this.sun_mid_day=this.sun_mid_day+ + +countsCustomizedSunDay[i].totalEmp
  }
  else if(countsCustomizedSunDay[i].shiftCategory=='5'){
    this.sun_day_eve=this.sun_day_eve+ + +countsCustomizedSunDay[i].totalEmp
  }
  else if(countsCustomizedSunDay[i].shiftCategory=='6'){
    this.sun_eve_mid=this.sun_eve_mid+ + +countsCustomizedSunDay[i].totalEmp
  }
}

// Mon
for(var i=0;i<countsCustomizedMonDay.length;i++){
  if(countsCustomizedMonDay[i].shiftCategory=='1'){
    this.mon_mid=this.mon_mid+ + +countsCustomizedMonDay[i].totalEmp
  }
  else if(countsCustomizedMonDay[i].shiftCategory=='3'){
    this.mon_day=this.mon_day+ + +countsCustomizedMonDay[i].totalEmp
  }
  else if(countsCustomizedMonDay[i].shiftCategory=='2'){
    this.mon_eve=this.mon_eve+ + +countsCustomizedMonDay[i].totalEmp
  }
  else if(countsCustomizedMonDay[i].shiftCategory=='4'){
    this.mon_mid_day=this.mon_mid_day+ + +countsCustomizedMonDay[i].totalEmp
  }
  else if(countsCustomizedMonDay[i].shiftCategory=='5'){
    this.mon_day_eve=this.mon_day_eve+ + +countsCustomizedMonDay[i].totalEmp
  }
  else if(countsCustomizedMonDay[i].shiftCategory=='6'){
    this.mon_eve_mid=this.mon_eve_mid+ + +countsCustomizedMonDay[i].totalEmp
  }
}
// Tue
for(var i=0;i<countsCustomizedTueDay.length;i++){
  if(countsCustomizedTueDay[i].shiftCategory=='1'){
    this.tue_mid=this.tue_mid+ + +countsCustomizedTueDay[i].totalEmp
  }
  else if(countsCustomizedTueDay[i].shiftCategory=='3'){
    this.tue_day=this.tue_day+ + +countsCustomizedTueDay[i].totalEmp
  }
  else if(countsCustomizedTueDay[i].shiftCategory=='2'){
    this.tue_eve=this.tue_eve+ + +countsCustomizedTueDay[i].totalEmp
  }
  else if(countsCustomizedTueDay[i].shiftCategory=='4'){
    this.tue_mid_day=this.tue_mid_day+ + +countsCustomizedTueDay[i].totalEmp
  }
  else if(countsCustomizedTueDay[i].shiftCategory=='5'){
    this.tue_day_eve=this.tue_day_eve+ + +countsCustomizedTueDay[i].totalEmp
  }
  else if(countsCustomizedTueDay[i].shiftCategory=='6'){
    this.tue_eve_mid=this.tue_eve_mid+ + +countsCustomizedTueDay[i].totalEmp
  }
}


// Wed
for(var i=0;i<countsCustomizedWedDay.length;i++){
  if(countsCustomizedWedDay[i].shiftCategory=='1'){
    this.wed_mid=this.wed_mid+ + +countsCustomizedWedDay[i].totalEmp
  }
  else if(countsCustomizedWedDay[i].shiftCategory=='3'){
    this.wed_day=this.wed_day+ + +countsCustomizedWedDay[i].totalEmp
  }
  else if(countsCustomizedWedDay[i].shiftCategory=='2'){
    this.wed_eve=this.wed_eve+ + +countsCustomizedWedDay[i].totalEmp
  }
  else if(countsCustomizedWedDay[i].shiftCategory=='4'){
    this.wed_mid_day=this.wed_mid_day+ + +countsCustomizedWedDay[i].totalEmp
  }
  else if(countsCustomizedWedDay[i].shiftCategory=='5'){
    this.wed_day_eve=this.wed_day_eve+ + +countsCustomizedWedDay[i].totalEmp
  }
  else if(countsCustomizedWedDay[i].shiftCategory=='6'){
    this.wed_eve_mid=this.wed_eve_mid+ + +countsCustomizedWedDay[i].totalEmp
  }
}

// Thu
for(var i=0;i<countsCustomizedThuDay.length;i++){
  if(countsCustomizedThuDay[i].shiftCategory=='1'){
    this.thu_mid=this.thu_mid+ + +countsCustomizedThuDay[i].totalEmp
  }
  else if(countsCustomizedThuDay[i].shiftCategory=='3'){
    this.thu_day=this.thu_day+ + +countsCustomizedThuDay[i].totalEmp
  }
  else if(countsCustomizedThuDay[i].shiftCategory=='2'){
    this.thu_eve=this.thu_eve+ + +countsCustomizedThuDay[i].totalEmp
  }
  else if(countsCustomizedThuDay[i].shiftCategory=='4'){
    this.thu_mid_day=this.thu_mid_day+ + +countsCustomizedThuDay[i].totalEmp
  }
  else if(countsCustomizedThuDay[i].shiftCategory=='5'){
    this.thu_day_eve=this.thu_day_eve+ + +countsCustomizedThuDay[i].totalEmp
  }
  else if(countsCustomizedThuDay[i].shiftCategory=='6'){
    this.thu_eve_mid=this.thu_eve_mid+ + +countsCustomizedThuDay[i].totalEmp
  }
}

// Fri
for(var i=0;i<countsCustomizedFriDay.length;i++){
  if(countsCustomizedFriDay[i].shiftCategory=='1'){
    this.fri_mid=this.fri_mid+ + +countsCustomizedFriDay[i].totalEmp
  }
  else if(countsCustomizedFriDay[i].shiftCategory=='3'){
    this.fri_day=this.fri_day+ + +countsCustomizedFriDay[i].totalEmp
  }
  else if(countsCustomizedFriDay[i].shiftCategory=='2'){
    this.fri_eve=this.fri_eve+ + +countsCustomizedFriDay[i].totalEmp
  }
  else if(countsCustomizedFriDay[i].shiftCategory=='4'){
    this.fri_mid_day=this.fri_mid_day+ + +countsCustomizedFriDay[i].totalEmp
  }
  else if(countsCustomizedFriDay[i].shiftCategory=='5'){
    this.fri_day_eve=this.fri_day_eve+ + +countsCustomizedFriDay[i].totalEmp
  }
  else if(countsCustomizedFriDay[i].shiftCategory=='6'){
    this.fri_eve_mid=this.fri_eve_mid+ + +countsCustomizedFriDay[i].totalEmp
  }
}

//Sat
for(var i=0;i<countsCustomizedSatDay.length;i++){
  if(countsCustomizedSatDay[i].shiftCategory=='1'){
    this.sat_mid=this.sat_mid+ + +countsCustomizedSatDay[i].totalEmp
  }
  else if(countsCustomizedSatDay[i].shiftCategory=='3'){
    this.sat_day=this.sat_day+ + +countsCustomizedSatDay[i].totalEmp
  }
  else if(countsCustomizedSatDay[i].shiftCategory=='2'){
    this.sat_eve=this.sat_eve+ + +countsCustomizedSatDay[i].totalEmp
  }
  else if(countsCustomizedSatDay[i].shiftCategory=='4'){
    this.sat_mid_day=this.sat_mid_day+ + +countsCustomizedSatDay[i].totalEmp
  }
  else if(countsCustomizedSatDay[i].shiftCategory=='5'){
    this.sat_day_eve=this.sat_day_eve+ + +countsCustomizedSatDay[i].totalEmp
  }
  else if(countsCustomizedSatDay[i].shiftCategory=='6'){
    this.sat_eve_mid=this.sat_eve_mid+ + +countsCustomizedSatDay[i].totalEmp
  }
}

this.def_sundAy=[]
this.def_mondAy=[]
this.def_tuedAy=[]
this.def_weddAy=[]
this.def_thudAy=[]
this.def_fridAy=[]
this.def_satdAy=[]
for(var i=0;i<this.defscheduleShift.length;i++){
  if(this.defscheduleShift[i].Sun!='X' && this.defscheduleShift[i].Sun!='x'){
    this.def_sundAy.push({"shiftName":this.defscheduleShift[i].Sun,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc)})
  }
  if(this.defscheduleShift[i].Mon!='X' && this.defscheduleShift[i].Mon!='x'){
    this.def_mondAy.push({"shiftName":this.defscheduleShift[i].Mon,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc)})
  }
  if(this.defscheduleShift[i].Tue!='X' && this.defscheduleShift[i].Tue!='x'){
    this.def_tuedAy.push({"shiftName":this.defscheduleShift[i].Tue,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc)})
  }
  if(this.defscheduleShift[i].Wed!='X' && this.defscheduleShift[i].Wed!='x'){
    this.def_weddAy.push({"shiftName":this.defscheduleShift[i].Wed,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc)})
  }
  if(this.defscheduleShift[i].Thu!='X' && this.defscheduleShift[i].Thu!='x'){
    this.def_thudAy.push({"shiftName":this.defscheduleShift[i].Thu,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc)})
  }
  if(this.defscheduleShift[i].Fri!='X' && this.defscheduleShift[i].Fri!='x'){
    this.def_fridAy.push({"shiftName":this.defscheduleShift[i].Fri,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc)})
  }
  if(this.defscheduleShift[i].Sat!='X' && this.defscheduleShift[i].Sat!='x'){
    this.def_satdAy.push({"shiftName":this.defscheduleShift[i].Sat,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.defscheduleShift[i].shiftdurationc,"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc)})
  }
}
var countsCustomizedDefSunDay =[]
countsCustomizedDefSunDay=[...this.def_sundAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]
var countsCustomizedDefMonDay=[]
countsCustomizedDefMonDay =[...this.def_mondAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var countsCustomizedDefTueDay=[]
countsCustomizedDefTueDay =[...this.def_tuedAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var countsCustomizedDefWedDay = [];
countsCustomizedDefWedDay=[...this.def_weddAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]

var countsCustomizedDefThuDay = [];
countsCustomizedDefThuDay=[...this.def_thudAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]
var countsCustomizedDefFriDay = [];
countsCustomizedDefFriDay=[...this.def_fridAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]
var countsCustomizedDefSatDay = [];
countsCustomizedDefSatDay=[...this.def_satdAy.reduce((r, e) => {
  let k = `${e.shiftDefintion}|${e.shift_duration}`;
  if(!r.has(k)) r.set(k, {...e, totalEmp: 1})
  else r.get(k).totalEmp++
  return r;
}, new Map).values()]


var isFoundSun,isFoundMon,isFoundTue,isFoundWed,isFoundThu,isFoundFri,isFoundSat
for(var j=0;j<this.allShiftData.length;j++){
  for(var i=0;i<countsCustomizedDefSunDay.length;i++){
    isFoundSun = countsCustomizedDefSunDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedDefMonDay.length;i++){
    isFoundMon = countsCustomizedDefMonDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedDefTueDay.length;i++){
    isFoundTue = countsCustomizedDefTueDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedDefWedDay.length;i++){
    isFoundWed = countsCustomizedDefWedDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedDefThuDay.length;i++){
    isFoundThu = countsCustomizedDefThuDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedDefFriDay.length;i++){
    isFoundFri = countsCustomizedDefFriDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  for(var i=0;i<countsCustomizedDefSatDay.length;i++){
    isFoundSat = countsCustomizedDefSatDay.some(element => {if (element.shiftDefintion === this.allShiftData[j].startTime && this.allShiftData[j].shift_duration==element.shift_duration) {return true;}});
  }
  if(this.allShiftData[j].shift_duration!=this.currentShiftlineScheduleShiftDuration && isFoundSun==false && isFoundMon==false && isFoundTue==false && isFoundWed==false&&isFoundThu==false&&isFoundFri==false&&isFoundSat==false){
  }else{
    if(isFoundSun==false){countsCustomizedDefSunDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
    if(isFoundMon==false){countsCustomizedDefMonDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
    if(isFoundTue==false){countsCustomizedDefTueDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
    if(isFoundWed==false){countsCustomizedDefWedDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
    if(isFoundThu==false){countsCustomizedDefThuDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
    if(isFoundFri==false){countsCustomizedDefFriDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
    if(isFoundSat==false){countsCustomizedDefSatDay.push({"shiftName":this.allShiftData[j].shiftName,"shiftDefintion":this.allShiftData[j].startTime,"shift_duration":this.allShiftData[j].shift_duration,"shiftCategory":this.allShiftData[j].shiftCategory,"totalEmp":0})}
  }
}

this.def_sun_mid=0;this.def_sun_day=0;this.def_sun_eve=0;this.def_sun_mid_day=0;this.def_sun_day_eve=0;this.def_sun_eve_mid=0;
this.def_mon_mid=0;this.def_mon_day=0;this.def_mon_eve=0;this.def_mon_mid_day=0;this.def_mon_day_eve=0;this.def_mon_eve_mid=0;
this.def_tue_mid=0;this.def_tue_day=0;this.def_tue_eve=0;this.def_tue_mid_day=0;this.def_tue_day_eve=0;this.def_tue_eve_mid=0;
this.def_wed_mid=0;this.def_wed_day=0;this.def_wed_eve=0;this.def_wed_mid_day=0;this.def_wed_day_eve=0;this.def_wed_eve_mid=0;
this.def_thu_mid=0;this.def_thu_day=0;this.def_thu_eve=0;this.def_thu_mid_day=0;this.def_thu_day_eve=0;this.def_thu_eve_mid=0;
this.def_fri_mid=0;this.def_fri_day=0;this.def_fri_eve=0;this.def_fri_mid_day=0;this.def_fri_day_eve=0;this.def_fri_eve_mid=0;
this.def_sat_mid=0;this.def_sat_day=0;this.def_sat_eve=0;this.def_sat_mid_day=0;this.def_sat_day_eve=0;this.def_sat_eve_mid=0;
for(var i=0;i<countsCustomizedDefSunDay.length;i++){
  if(countsCustomizedDefSunDay[i].shiftCategory=='1'){
    this.def_sun_mid=this.def_sun_mid+ + +countsCustomizedDefSunDay[i].totalEmp
  }
  else if(countsCustomizedDefSunDay[i].shiftCategory=='3'){
    this.def_sun_day=this.def_sun_day+ + +countsCustomizedDefSunDay[i].totalEmp
  }
  else if(countsCustomizedDefSunDay[i].shiftCategory=='2'){
    this.def_sun_eve=this.def_sun_eve+ + +countsCustomizedDefSunDay[i].totalEmp
  }
  else if(countsCustomizedDefSunDay[i].shiftCategory=='4'){
    this.def_sun_mid_day=this.def_sun_mid_day+ + +countsCustomizedDefSunDay[i].totalEmp
  }
  else if(countsCustomizedDefSunDay[i].shiftCategory=='5'){
    this.def_sun_day_eve=this.def_sun_day_eve+ + +countsCustomizedDefSunDay[i].totalEmp
  }
  else if(countsCustomizedDefSunDay[i].shiftCategory=='6'){
    this.def_sun_eve_mid=this.def_sun_eve_mid+ + +countsCustomizedDefSunDay[i].totalEmp
  }
}

// Mon
for(var i=0;i<countsCustomizedDefMonDay.length;i++){
  if(countsCustomizedDefMonDay[i].shiftCategory=='1'){
    this.def_mon_mid=this.def_mon_mid+ + +countsCustomizedDefMonDay[i].totalEmp
  }
  else if(countsCustomizedDefMonDay[i].shiftCategory=='3'){
    this.def_mon_day=this.def_mon_day+ + +countsCustomizedDefMonDay[i].totalEmp
  }
  else if(countsCustomizedDefMonDay[i].shiftCategory=='2'){
    this.def_mon_eve=this.def_mon_eve+ + +countsCustomizedDefMonDay[i].totalEmp
  }
  else if(countsCustomizedDefMonDay[i].shiftCategory=='4'){
    this.def_mon_mid_day=this.def_mon_mid_day+ + +countsCustomizedDefMonDay[i].totalEmp
  }
  else if(countsCustomizedDefMonDay[i].shiftCategory=='5'){
    this.def_mon_day_eve=this.def_mon_day_eve+ + +countsCustomizedDefMonDay[i].totalEmp
  }
  else if(countsCustomizedDefMonDay[i].shiftCategory=='6'){
    this.def_mon_eve_mid=this.def_mon_eve_mid+ + +countsCustomizedDefMonDay[i].totalEmp
  }
}
// Tue
for(var i=0;i<countsCustomizedDefTueDay.length;i++){
  if(countsCustomizedDefTueDay[i].shiftCategory=='1'){
    this.def_tue_mid=this.def_tue_mid+ + +countsCustomizedDefTueDay[i].totalEmp
  }
  else if(countsCustomizedDefTueDay[i].shiftCategory=='3'){
    this.def_tue_day=this.def_tue_day+ + +countsCustomizedDefTueDay[i].totalEmp
  }
  else if(countsCustomizedDefTueDay[i].shiftCategory=='2'){
    this.def_tue_eve=this.def_tue_eve+ + +countsCustomizedDefTueDay[i].totalEmp
  }
  else if(countsCustomizedDefTueDay[i].shiftCategory=='4'){
    this.def_tue_mid_day=this.def_tue_mid_day+ + +countsCustomizedDefTueDay[i].totalEmp
  }
  else if(countsCustomizedDefTueDay[i].shiftCategory=='5'){
    this.def_tue_day_eve=this.def_tue_day_eve+ + +countsCustomizedDefTueDay[i].totalEmp
  }
  else if(countsCustomizedDefTueDay[i].shiftCategory=='6'){
    this.def_tue_eve_mid=this.def_tue_eve_mid+ + +countsCustomizedDefTueDay[i].totalEmp
  }
}


// Wed
for(var i=0;i<countsCustomizedDefWedDay.length;i++){
  if(countsCustomizedDefWedDay[i].shiftCategory=='1'){
    this.def_wed_mid=this.def_wed_mid+ + +countsCustomizedDefWedDay[i].totalEmp
  }
  else if(countsCustomizedDefWedDay[i].shiftCategory=='3'){
    this.def_wed_day=this.def_wed_day+ + +countsCustomizedDefWedDay[i].totalEmp
  }
  else if(countsCustomizedDefWedDay[i].shiftCategory=='2'){
    this.def_wed_eve=this.def_wed_eve+ + +countsCustomizedDefWedDay[i].totalEmp
  }
  else if(countsCustomizedDefWedDay[i].shiftCategory=='4'){
    this.def_wed_mid_day=this.def_wed_mid_day+ + +countsCustomizedDefWedDay[i].totalEmp
  }
  else if(countsCustomizedDefWedDay[i].shiftCategory=='5'){
    this.def_wed_day_eve=this.def_wed_day_eve+ + +countsCustomizedDefWedDay[i].totalEmp
  }
  else if(countsCustomizedDefWedDay[i].shiftCategory=='6'){
    this.def_wed_eve_mid=this.def_wed_eve_mid+ + +countsCustomizedDefWedDay[i].totalEmp
  }
}

// Thu
for(var i=0;i<countsCustomizedDefThuDay.length;i++){
  if(countsCustomizedDefThuDay[i].shiftCategory=='1'){
    this.def_thu_mid=this.def_thu_mid+ + +countsCustomizedDefThuDay[i].totalEmp
  }
  else if(countsCustomizedDefThuDay[i].shiftCategory=='3'){
    this.def_thu_day=this.def_thu_day+ + +countsCustomizedDefThuDay[i].totalEmp
  }
  else if(countsCustomizedDefThuDay[i].shiftCategory=='2'){
    this.def_thu_eve=this.def_thu_eve+ + +countsCustomizedDefThuDay[i].totalEmp
  }
  else if(countsCustomizedDefThuDay[i].shiftCategory=='4'){
    this.def_thu_mid_day=this.def_thu_mid_day+ + +countsCustomizedDefThuDay[i].totalEmp
  }
  else if(countsCustomizedDefThuDay[i].shiftCategory=='5'){
    this.def_thu_day_eve=this.def_thu_day_eve+ + +countsCustomizedDefThuDay[i].totalEmp
  }
  else if(countsCustomizedDefThuDay[i].shiftCategory=='6'){
    this.def_thu_eve_mid=this.def_thu_eve_mid+ + +countsCustomizedDefThuDay[i].totalEmp
  }
}

// Fri
for(var i=0;i<countsCustomizedDefFriDay.length;i++){
  if(countsCustomizedDefFriDay[i].shiftCategory=='1'){
    this.def_fri_mid=this.def_fri_mid+ + +countsCustomizedDefFriDay[i].totalEmp
  }
  else if(countsCustomizedDefFriDay[i].shiftCategory=='3'){
    this.def_fri_day=this.def_fri_day+ + +countsCustomizedDefFriDay[i].totalEmp
  }
  else if(countsCustomizedDefFriDay[i].shiftCategory=='2'){
    this.def_fri_eve=this.def_fri_eve+ + +countsCustomizedDefFriDay[i].totalEmp
  }
  else if(countsCustomizedDefFriDay[i].shiftCategory=='4'){
    this.def_fri_mid_day=this.def_fri_mid_day+ + +countsCustomizedDefFriDay[i].totalEmp
  }
  else if(countsCustomizedDefFriDay[i].shiftCategory=='5'){
    this.def_fri_day_eve=this.def_fri_day_eve+ + +countsCustomizedDefFriDay[i].totalEmp
  }
  else if(countsCustomizedDefFriDay[i].shiftCategory=='6'){
    this.def_fri_eve_mid=this.def_fri_eve_mid+ + +countsCustomizedDefFriDay[i].totalEmp
  }
}

//Sat
for(var i=0;i<countsCustomizedDefSatDay.length;i++){
  if(countsCustomizedDefSatDay[i].shiftCategory=='1'){
    this.def_sat_mid=this.def_sat_mid+ + +countsCustomizedDefSatDay[i].totalEmp
  }
  else if(countsCustomizedDefSatDay[i].shiftCategory=='3'){
    this.def_sat_day=this.def_sat_day+ + +countsCustomizedDefSatDay[i].totalEmp
  }
  else if(countsCustomizedDefSatDay[i].shiftCategory=='2'){
    this.def_sat_eve=this.def_sat_eve+ + +countsCustomizedDefSatDay[i].totalEmp
  }
  else if(countsCustomizedDefSatDay[i].shiftCategory=='4'){
    this.def_sat_mid_day=this.def_sat_mid_day+ + +countsCustomizedDefSatDay[i].totalEmp
  }
  else if(countsCustomizedDefSatDay[i].shiftCategory=='5'){
    this.def_sat_day_eve=this.def_sat_day_eve+ + +countsCustomizedDefSatDay[i].totalEmp
  }
  else if(countsCustomizedDefSatDay[i].shiftCategory=='6'){
    this.def_sat_eve_mid=this.def_sat_eve_mid+ + +countsCustomizedDefSatDay[i].totalEmp
  }
}





this.generatedEmpData.SUN_MID=this.sun_mid
this.generatedEmpData.SUN_DAY=this.sun_day
this.generatedEmpData.SUN_EVE=this.sun_eve
this.generatedEmpData.SUN_MID_DAY=this.sun_mid_day
this.generatedEmpData.SUN_DAY_EVE=this.sun_day_eve
this.generatedEmpData.SUN_EVE_MID=this.sun_eve_mid
this.generatedEmpData.MON_MID=this.mon_mid
this.generatedEmpData.MON_DAY=this.mon_day
this.generatedEmpData.MON_EVE=this.mon_eve
this.generatedEmpData.MON_MID_DAY=this.mon_mid_day
this.generatedEmpData.MON_DAY_EVE=this.mon_day_eve
this.generatedEmpData.MON_EVE_MID=this.mon_eve_mid
this.generatedEmpData.TUE_MID=this.tue_mid
this.generatedEmpData.TUE_DAY=this.tue_day

this.generatedEmpData.TUE_EVE=this.tue_eve
this.generatedEmpData.TUE_MID_DAY=this.tue_mid_day
this.generatedEmpData.TUE_DAY_EVE=this.tue_day_eve
this.generatedEmpData.TUE_EVE_MID=this.tue_eve_mid
this.generatedEmpData.WED_MID=this.wed_mid
this.generatedEmpData.WED_DAY=this.wed_day
this.generatedEmpData.WED_EVE=this.wed_eve
this.generatedEmpData.WED_MID_DAY=this.wed_mid_day
this.generatedEmpData.WED_DAY_EVE=this.wed_day_eve
this.generatedEmpData.WED_EVE_MID=this.wed_eve_mid
this.generatedEmpData.THU_MID=this.thu_mid
this.generatedEmpData.THU_DAY=this.thu_day
this.generatedEmpData.THU_EVE=this.thu_eve
this.generatedEmpData.THU_MID_DAY=this.thu_mid_day
this.generatedEmpData.THU_DAY_EVE=this.thu_day_eve
this.generatedEmpData.THU_EVE_MID=this.thu_eve_mid
this.generatedEmpData.FRI_MID=this.fri_mid
this.generatedEmpData.FRI_DAY=this.fri_day
this.generatedEmpData.FRI_EVE=this.fri_eve
this.generatedEmpData.FRI_MID_DAY=this.fri_mid_day
this.generatedEmpData.FRI_DAY_EVE=this.fri_day_eve
this.generatedEmpData.FRI_EVE_MID=this.fri_eve_mid
this.generatedEmpData.SAT_MID=this.sat_mid
this.generatedEmpData.SAT_DAY=this.sat_day
this.generatedEmpData.SAT_EVE=this.sat_eve
this.generatedEmpData.SAT_MID_DAY=this.sat_mid_day
this.generatedEmpData.SAT_DAY_EVE=this.sat_day_eve
this.generatedEmpData.SAT_EVE_MID=this.sat_eve_mid


this.SunDayGenerated=[]; this.SunDayRequired=[];
this.SunDayRequired.push(this.requiredEmpData.SUN_MID)
this.SunDayRequired.push(this.requiredEmpData.SUN_DAY)
this.SunDayRequired.push(this.requiredEmpData.SUN_EVE)
this.SunDayRequired.push(this.requiredEmpData.SUN_MID_DAY)
this.SunDayRequired.push(this.requiredEmpData.SUN_DAY_EVE)
this.SunDayRequired.push(this.requiredEmpData.SUN_EVE_MID)
this.SunDayGenerated.push(this.generatedEmpData.SUN_MID)
this.SunDayGenerated.push(this.generatedEmpData.SUN_DAY)
this.SunDayGenerated.push(this.generatedEmpData.SUN_EVE)
this.SunDayGenerated.push(this.generatedEmpData.SUN_MID_DAY)
this.SunDayGenerated.push(this.generatedEmpData.SUN_DAY_EVE)
this.SunDayGenerated.push(this.generatedEmpData.SUN_EVE_MID)
this.diffSunMid=this.SunDayGenerated[0] + - + this.SunDayRequired[0]
this.diffSunDay=this.SunDayGenerated[1] + - + this.SunDayRequired[1]
this.diffSunEve=this.SunDayGenerated[2] + - + this.SunDayRequired[2]
this.diffSunMidDay=this.SunDayGenerated[3] + - + this.SunDayRequired[3]
this.diffSunDayEve=this.SunDayGenerated[4] + - + this.SunDayRequired[4]
this.diffSunEveMid=this.SunDayGenerated[5] + - + this.SunDayRequired[5]
this.totalSunRequired= this.SunDayRequired[0] + + + this.SunDayRequired[1] + + + this.SunDayRequired[2]+ + +this.SunDayRequired[3] + + + this.SunDayRequired[4] + + + this.SunDayRequired[5]
this.totalSunGenerated= this.SunDayGenerated[0] + + + this.SunDayGenerated[1] + + + this.SunDayGenerated[2]+ + +this.SunDayGenerated[3] + + + this.SunDayGenerated[4] + + + this.SunDayGenerated[5]
this.totalSundiff=this.totalSunGenerated+ - + this.totalSunRequired

this.MonDayGenerated=[]; this.MonDayRequired=[];
this.MonDayRequired.push(this.requiredEmpData.MON_MID)
this.MonDayRequired.push(this.requiredEmpData.MON_DAY)
this.MonDayRequired.push(this.requiredEmpData.MON_EVE)
this.MonDayGenerated.push(this.generatedEmpData.MON_MID)
this.MonDayGenerated.push(this.generatedEmpData.MON_DAY)
this.MonDayGenerated.push(this.generatedEmpData.MON_EVE)
this.MonDayRequired.push(this.requiredEmpData.MON_MID_DAY)
this.MonDayRequired.push(this.requiredEmpData.MON_DAY_EVE)
this.MonDayRequired.push(this.requiredEmpData.MON_EVE_MID)
this.MonDayGenerated.push(this.generatedEmpData.MON_MID_DAY)
this.MonDayGenerated.push(this.generatedEmpData.MON_DAY_EVE)
this.MonDayGenerated.push(this.generatedEmpData.MON_EVE_MID)
this.diffMonMid=this.MonDayGenerated[0] + - + this.MonDayRequired[0]
this.diffMonDay=this.MonDayGenerated[1] + - + this.MonDayRequired[1]
this.diffMonEve=this.MonDayGenerated[2] + - + this.MonDayRequired[2]
this.diffMonMidDay=this.MonDayGenerated[3] + - + this.MonDayRequired[3]
this.diffMonDayEve=this.MonDayGenerated[4] + - + this.MonDayRequired[4]
this.diffMonEveMid=this.MonDayGenerated[5] + - + this.MonDayRequired[5]
this.totalMonRequired= this.MonDayRequired[0] + + + this.MonDayRequired[1] + + + this.MonDayRequired[2]+ + +this.MonDayRequired[3] + + + this.MonDayRequired[4] + + + this.MonDayRequired[5]
this.totalMonGenerated= this.MonDayGenerated[0] + + + this.MonDayGenerated[1] + + + this.MonDayGenerated[2]+ + +this.MonDayGenerated[3] + + + this.MonDayGenerated[4] + + + this.MonDayGenerated[5]
this.totalMondiff=this.totalMonGenerated+ - + this.totalMonRequired
this.TueDayGenerated=[]; this.TueDayRequired=[];
this.TueDayRequired.push(this.requiredEmpData.TUE_MID)
this.TueDayRequired.push(this.requiredEmpData.TUE_DAY)
this.TueDayRequired.push(this.requiredEmpData.TUE_EVE)
this.TueDayGenerated.push(this.generatedEmpData.TUE_MID)
this.TueDayGenerated.push(this.generatedEmpData.TUE_DAY)
this.TueDayGenerated.push(this.generatedEmpData.TUE_EVE)
this.TueDayRequired.push(this.requiredEmpData.TUE_MID_DAY)
this.TueDayRequired.push(this.requiredEmpData.TUE_DAY_EVE)
this.TueDayRequired.push(this.requiredEmpData.TUE_EVE_MID)
this.TueDayGenerated.push(this.generatedEmpData.TUE_MID_DAY)
this.TueDayGenerated.push(this.generatedEmpData.TUE_DAY_EVE)
this.TueDayGenerated.push(this.generatedEmpData.TUE_EVE_MID)
this.diffTueMid=this.TueDayGenerated[0] + - + this.TueDayRequired[0]
this.diffTueDay=this.TueDayGenerated[1] + - + this.TueDayRequired[1]
this.diffTueEve=this.TueDayGenerated[2] + - + this.TueDayRequired[2]
this.diffTueMidDay=this.TueDayGenerated[3] + - + this.TueDayRequired[3]
this.diffTueDayEve=this.TueDayGenerated[4] + - + this.TueDayRequired[4]
this.diffTueEveMid=this.TueDayGenerated[5] + - + this.TueDayRequired[5]
this.totalTueRequired= this.TueDayRequired[0] + + + this.TueDayRequired[1] + + + this.TueDayRequired[2]+ + +this.TueDayRequired[3] + + + this.TueDayRequired[4] + + + this.TueDayRequired[5]
this.totalTueGenerated= this.TueDayGenerated[0] + + + this.TueDayGenerated[1] + + + this.TueDayGenerated[2]+ + +this.TueDayGenerated[3] + + + this.TueDayGenerated[4] + + + this.TueDayGenerated[5]
this.totalTuediff=this.totalTueGenerated+ - + this.totalTueRequired

this.WedDayGenerated=[]; this.WedDayRequired=[];
this.WedDayRequired.push(this.requiredEmpData.WED_MID)
this.WedDayRequired.push(this.requiredEmpData.WED_DAY)
this.WedDayRequired.push(this.requiredEmpData.WED_EVE)
this.WedDayGenerated.push(this.generatedEmpData.WED_MID)
this.WedDayGenerated.push(this.generatedEmpData.WED_DAY)
this.WedDayGenerated.push(this.generatedEmpData.WED_EVE)
this.WedDayRequired.push(this.requiredEmpData.WED_MID_DAY)
this.WedDayRequired.push(this.requiredEmpData.WED_DAY_EVE)
this.WedDayRequired.push(this.requiredEmpData.WED_EVE_MID)
this.WedDayGenerated.push(this.generatedEmpData.WED_MID_DAY)
this.WedDayGenerated.push(this.generatedEmpData.WED_DAY_EVE)
this.WedDayGenerated.push(this.generatedEmpData.WED_EVE_MID)
this.diffWedMid=this.WedDayGenerated[0] + - + this.WedDayRequired[0]
this.diffWedDay=this.WedDayGenerated[1] + - + this.WedDayRequired[1]
this.diffWedEve=this.WedDayGenerated[2] + - + this.WedDayRequired[2]
this.diffWedMidDay=this.WedDayGenerated[3] + - + this.WedDayRequired[3]
this.diffWedDayEve=this.WedDayGenerated[4] + - + this.WedDayRequired[4]
this.diffWedEveMid=this.WedDayGenerated[5] + - + this.WedDayRequired[5]
this.totalWedRequired= this.WedDayRequired[0] + + + this.WedDayRequired[1] + + + this.WedDayRequired[2]+ + +this.WedDayRequired[3] + + + this.WedDayRequired[4] + + + this.WedDayRequired[5]
this.totalWedGenerated= this.WedDayGenerated[0] + + + this.WedDayGenerated[1] + + + this.WedDayGenerated[2]+ + +this.WedDayGenerated[3] + + + this.WedDayGenerated[4] + + + this.WedDayGenerated[5]
this.totalWeddiff=this.totalWedGenerated+ - + this.totalWedRequired

this.ThuDayGenerated=[]; this.ThuDayRequired=[];
this.ThuDayRequired.push(this.requiredEmpData.THU_MID)
this.ThuDayRequired.push(this.requiredEmpData.THU_DAY)
this.ThuDayRequired.push(this.requiredEmpData.THU_EVE)
this.ThuDayGenerated.push(this.generatedEmpData.THU_MID)
this.ThuDayGenerated.push(this.generatedEmpData.THU_DAY)
this.ThuDayGenerated.push(this.generatedEmpData.THU_EVE)
this.ThuDayRequired.push(this.requiredEmpData.THU_MID_DAY)
this.ThuDayRequired.push(this.requiredEmpData.THU_DAY_EVE)
this.ThuDayRequired.push(this.requiredEmpData.THU_EVE_MID)
this.ThuDayGenerated.push(this.generatedEmpData.THU_MID_DAY)
this.ThuDayGenerated.push(this.generatedEmpData.THU_DAY_EVE)
this.ThuDayGenerated.push(this.generatedEmpData.THU_EVE_MID)
this.diffThuMid=this.ThuDayGenerated[0] + - + this.ThuDayRequired[0]
this.diffThuDay=this.ThuDayGenerated[1] + - + this.ThuDayRequired[1]
this.diffThuEve=this.ThuDayGenerated[2] + - + this.ThuDayRequired[2]
this.diffThuMidDay=this.ThuDayGenerated[3] + - + this.ThuDayRequired[3]
this.diffThuDayEve=this.ThuDayGenerated[4] + - + this.ThuDayRequired[4]
this.diffThuEveMid=this.ThuDayGenerated[5] + - + this.ThuDayRequired[5]
this.totalThuRequired= this.ThuDayRequired[0] + + + this.ThuDayRequired[1] + + + this.ThuDayRequired[2]+ + +this.ThuDayRequired[3] + + + this.ThuDayRequired[4] + + + this.ThuDayRequired[5]
this.totalThuGenerated= this.ThuDayGenerated[0] + + + this.ThuDayGenerated[1] + + + this.ThuDayGenerated[2]+ + +this.ThuDayGenerated[3] + + + this.ThuDayGenerated[4] + + + this.ThuDayGenerated[5]
this.totalThudiff=this.totalThuGenerated+ - + this.totalThuRequired
this.FriDayGenerated=[]; this.FriDayRequired=[];
this.FriDayRequired.push(this.requiredEmpData.FRI_MID)
this.FriDayRequired.push(this.requiredEmpData.FRI_DAY)
this.FriDayRequired.push(this.requiredEmpData.FRI_EVE)
this.FriDayGenerated.push(this.generatedEmpData.FRI_MID)
this.FriDayGenerated.push(this.generatedEmpData.FRI_DAY)
this.FriDayGenerated.push(this.generatedEmpData.FRI_EVE)
this.FriDayRequired.push(this.requiredEmpData.FRI_MID_DAY)
this.FriDayRequired.push(this.requiredEmpData.FRI_DAY_EVE)
this.FriDayRequired.push(this.requiredEmpData.FRI_EVE_MID)
this.FriDayGenerated.push(this.generatedEmpData.FRI_MID_DAY)
this.FriDayGenerated.push(this.generatedEmpData.FRI_DAY_EVE)
this.FriDayGenerated.push(this.generatedEmpData.FRI_EVE_MID)
this.diffFriMid=this.FriDayGenerated[0] + - + this.FriDayRequired[0]
this.diffFriDay=this.FriDayGenerated[1] + - + this.FriDayRequired[1]
this.diffFriEve=this.FriDayGenerated[2] + - + this.FriDayRequired[2]
this.diffFriMidDay=this.FriDayGenerated[3] + - + this.FriDayRequired[3]
this.diffFriDayEve=this.FriDayGenerated[4] + - + this.FriDayRequired[4]
this.diffFriEveMid=this.FriDayGenerated[5] + - + this.FriDayRequired[5]
this.totalFriRequired= this.FriDayRequired[0] + + + this.FriDayRequired[1] + + + this.FriDayRequired[2]+ + +this.FriDayRequired[3] + + + this.FriDayRequired[4] + + + this.FriDayRequired[5]
this.totalFriGenerated= this.FriDayGenerated[0] + + + this.FriDayGenerated[1] + + + this.FriDayGenerated[2]+ + +this.FriDayGenerated[3] + + + this.FriDayGenerated[4] + + + this.FriDayGenerated[5]
this.totalFridiff=this.totalFriGenerated+ - + this.totalFriRequired

this.SatDayGenerated=[]; this.SatDayRequired=[];
this.SatDayRequired.push(this.requiredEmpData.SAT_MID)
this.SatDayRequired.push(this.requiredEmpData.SAT_DAY)
this.SatDayRequired.push(this.requiredEmpData.SAT_EVE)
this.SatDayGenerated.push(this.generatedEmpData.SAT_MID)
this.SatDayGenerated.push(this.generatedEmpData.SAT_DAY)
this.SatDayGenerated.push(this.generatedEmpData.SAT_EVE)
this.SatDayRequired.push(this.requiredEmpData.SAT_MID_DAY)
this.SatDayRequired.push(this.requiredEmpData.SAT_DAY_EVE)
this.SatDayRequired.push(this.requiredEmpData.SAT_EVE_MID)
this.SatDayGenerated.push(this.generatedEmpData.SAT_MID_DAY)
this.SatDayGenerated.push(this.generatedEmpData.SAT_DAY_EVE)
this.SatDayGenerated.push(this.generatedEmpData.SAT_EVE_MID)
this.diffSatMid=this.SatDayGenerated[0] + - + this.SatDayRequired[0]
this.diffSatDay=this.SatDayGenerated[1] + - + this.SatDayRequired[1]
this.diffSatEve=this.SatDayGenerated[2] + - + this.SatDayRequired[2]
this.diffSatMidDay=this.SatDayGenerated[3] + - + this.SatDayRequired[3]
this.diffSatDayEve=this.SatDayGenerated[4] + - + this.SatDayRequired[4]
this.diffSatEveMid=this.SatDayGenerated[5] + - + this.SatDayRequired[5]
this.totalSatRequired= this.SatDayRequired[0] + + + this.SatDayRequired[1] + + + this.SatDayRequired[2]+ + +this.SatDayRequired[3] + + + this.SatDayRequired[4] + + + this.SatDayRequired[5]
this.totalSatGenerated= this.SatDayGenerated[0] + + + this.SatDayGenerated[1] + + + this.SatDayGenerated[2]+ + +this.SatDayGenerated[3] + + + this.SatDayGenerated[4] + + + this.SatDayGenerated[5]
this.totalSatdiff=this.totalSatGenerated+ - + this.totalSatRequired


//Default Summary  Data
this.defGeneratedData.SUN_MID=this.def_sun_mid
this.defGeneratedData.SUN_DAY=this.def_sun_day
this.defGeneratedData.SUN_EVE=this.def_sun_eve
this.defGeneratedData.SUN_MID_DAY=this.def_sun_mid_day
this.defGeneratedData.SUN_DAY_EVE=this.def_sun_day_eve
this.defGeneratedData.SUN_EVE_MID=this.def_sun_eve_mid
this.defGeneratedData.MON_MID=this.def_mon_mid
this.defGeneratedData.MON_DAY=this.def_mon_day
this.defGeneratedData.MON_EVE=this.def_mon_eve
this.defGeneratedData.MON_MID_DAY=this.def_mon_mid_day
this.defGeneratedData.MON_DAY_EVE=this.def_mon_day_eve
this.defGeneratedData.MON_EVE_MID=this.def_mon_eve_mid
this.defGeneratedData.TUE_MID=this.def_tue_mid
this.defGeneratedData.TUE_DAY=this.def_tue_day

this.defGeneratedData.TUE_EVE=this.def_tue_eve
this.defGeneratedData.TUE_MID_DAY=this.def_tue_mid_day
this.defGeneratedData.TUE_DAY_EVE=this.def_tue_day_eve
this.defGeneratedData.TUE_EVE_MID=this.def_tue_eve_mid
this.defGeneratedData.WED_MID=this.def_wed_mid
this.defGeneratedData.WED_DAY=this.def_wed_day
this.defGeneratedData.WED_EVE=this.def_wed_eve
this.defGeneratedData.WED_MID_DAY=this.def_wed_mid_day
this.defGeneratedData.WED_DAY_EVE=this.def_wed_day_eve
this.defGeneratedData.WED_EVE_MID=this.def_wed_eve_mid
this.defGeneratedData.THU_MID=this.def_thu_mid
this.defGeneratedData.THU_DAY=this.def_thu_day
this.defGeneratedData.THU_EVE=this.def_thu_eve
this.defGeneratedData.THU_MID_DAY=this.def_thu_mid_day
this.defGeneratedData.THU_DAY_EVE=this.def_thu_day_eve
this.defGeneratedData.THU_EVE_MID=this.def_thu_eve_mid
this.defGeneratedData.FRI_MID=this.def_fri_mid
this.defGeneratedData.FRI_DAY=this.def_fri_day
this.defGeneratedData.FRI_EVE=this.def_fri_eve
this.defGeneratedData.FRI_MID_DAY=this.def_fri_mid_day
this.defGeneratedData.FRI_DAY_EVE=this.def_fri_day_eve
this.defGeneratedData.FRI_EVE_MID=this.def_fri_eve_mid
this.defGeneratedData.SAT_MID=this.def_sat_mid
this.defGeneratedData.SAT_DAY=this.def_sat_day
this.defGeneratedData.SAT_EVE=this.def_sat_eve
this.defGeneratedData.SAT_MID_DAY=this.def_sat_mid_day
this.defGeneratedData.SAT_DAY_EVE=this.def_sat_day_eve
this.defGeneratedData.SAT_EVE_MID=this.def_sat_eve_mid
this.defaultSunDayRequired=[];this.defaultSunDayGenerated=[];
this.defaultSunDayRequired.push(this.defRequiredData.SUN_MID)
this.defaultSunDayRequired.push(this.defRequiredData.SUN_DAY)
this.defaultSunDayRequired.push(this.defRequiredData.SUN_EVE)
this.defaultSunDayRequired.push(this.defRequiredData.SUN_MID_DAY)
this.defaultSunDayRequired.push(this.defRequiredData.SUN_DAY_EVE)
this.defaultSunDayRequired.push(this.defRequiredData.SUN_EVE_MID)
this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_MID)
this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_DAY)
this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_EVE)
this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_MID_DAY)
this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_DAY_EVE)
this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_EVE_MID)
this.defaultDiffSunMid=this.defaultSunDayGenerated[0] + - + this.defaultSunDayRequired[0]
this.defaultDiffSunDay=this.defaultSunDayGenerated[1] + - + this.defaultSunDayRequired[1]
this.defaultDiffSunEve=this.defaultSunDayGenerated[2] + - + this.defaultSunDayRequired[2]
this.defaultDiffSunMidDay=this.defaultSunDayGenerated[3] + - + this.defaultSunDayRequired[3]
this.defaultDiffSunDayEve=this.defaultSunDayGenerated[4] + - + this.defaultSunDayRequired[4]
this.defaultDiffSunEveMid=this.defaultSunDayGenerated[5] + - + this.defaultSunDayRequired[5]
this.defaultTotalSunRequired= this.defaultSunDayRequired[0] + + + this.defaultSunDayRequired[1] + + + this.defaultSunDayRequired[2]+ + + this.defaultSunDayRequired[3] + + + this.defaultSunDayRequired[4] + + + this.defaultSunDayRequired[5]
this.defaultTotalSunGenerated= this.defaultSunDayGenerated[0] + + + this.defaultSunDayGenerated[1] + + + this.defaultSunDayGenerated[2]+ + +this.defaultSunDayGenerated[3] + + + this.defaultSunDayGenerated[4] + + + this.defaultSunDayGenerated[5]
this.defaultTotalSundiff=this.defaultTotalSunGenerated+ - + this.defaultTotalSunRequired

this.defaultMonDayRequired=[];this.defaultMonDayGenerated=[];
this.defaultMonDayRequired.push(this.defRequiredData.MON_MID)
this.defaultMonDayRequired.push(this.defRequiredData.MON_DAY)
this.defaultMonDayRequired.push(this.defRequiredData.MON_EVE)
this.defaultMonDayRequired.push(this.defRequiredData.MON_MID_DAY)
this.defaultMonDayRequired.push(this.defRequiredData.MON_DAY_EVE)
this.defaultMonDayRequired.push(this.defRequiredData.MON_EVE_MID)
this.defaultMonDayGenerated.push(this.defGeneratedData.MON_MID)
this.defaultMonDayGenerated.push(this.defGeneratedData.MON_DAY)
this.defaultMonDayGenerated.push(this.defGeneratedData.MON_EVE)
this.defaultMonDayGenerated.push(this.defGeneratedData.MON_MID_DAY)
this.defaultMonDayGenerated.push(this.defGeneratedData.MON_DAY_EVE)
this.defaultMonDayGenerated.push(this.defGeneratedData.MON_EVE_MID)
this.defaultDiffMonMid=this.defaultMonDayGenerated[0] + - + this.defaultMonDayRequired[0]
this.defaultDiffMonDay=this.defaultMonDayGenerated[1] + - + this.defaultMonDayRequired[1]
this.defaultDiffMonEve=this.defaultMonDayGenerated[2] + - + this.defaultMonDayRequired[2]
this.defaultDiffMonMidDay=this.defaultMonDayGenerated[3] + - + this.defaultMonDayRequired[3]
this.defaultDiffMonDayEve=this.defaultMonDayGenerated[4] + - + this.defaultMonDayRequired[4]
this.defaultDiffMonEveMid=this.defaultMonDayGenerated[5] + - + this.defaultMonDayRequired[5]
this.defaultTotalMonRequired= this.defaultMonDayRequired[0] + + + this.defaultMonDayRequired[1] + + + this.defaultMonDayRequired[2]+ + + this.defaultMonDayRequired[3] + + + this.defaultMonDayRequired[4] + + + this.defaultMonDayRequired[5]
this.defaultTotalMonGenerated= this.defaultMonDayGenerated[0] + + + this.defaultMonDayGenerated[1] + + + this.defaultMonDayGenerated[2]+ + +this.defaultMonDayGenerated[3] + + + this.defaultMonDayGenerated[4] + + + this.defaultMonDayGenerated[5]
this.defaultTotalMondiff=this.defaultTotalMonGenerated+ - + this.defaultTotalMonRequired

this.defaultTueDayRequired=[];this.defaultTueDayGenerated=[];
this.defaultTueDayRequired.push(this.defRequiredData.TUE_MID)
this.defaultTueDayRequired.push(this.defRequiredData.TUE_DAY)
this.defaultTueDayRequired.push(this.defRequiredData.TUE_EVE)
this.defaultTueDayRequired.push(this.defRequiredData.TUE_MID_DAY)
this.defaultTueDayRequired.push(this.defRequiredData.TUE_DAY_EVE)
this.defaultTueDayRequired.push(this.defRequiredData.TUE_EVE_MID)
this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_MID)
this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_DAY)
this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_EVE)
this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_MID_DAY)
this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_DAY_EVE)
this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_EVE_MID)
this.defaultDiffTueMid=this.defaultTueDayGenerated[0] + - + this.defaultTueDayRequired[0]
this.defaultDiffTueDay=this.defaultTueDayGenerated[1] + - + this.defaultTueDayRequired[1]
this.defaultDiffTueEve=this.defaultTueDayGenerated[2] + - + this.defaultTueDayRequired[2]
this.defaultDiffTueMidDay=this.defaultTueDayGenerated[3] + - + this.defaultTueDayRequired[3]
this.defaultDiffTueDayEve=this.defaultTueDayGenerated[4] + - + this.defaultTueDayRequired[4]
this.defaultDiffTueEveMid=this.defaultTueDayGenerated[5] + - + this.defaultTueDayRequired[5]
this.defaultTotalTueRequired= this.defaultTueDayRequired[0] + + + this.defaultTueDayRequired[1] + + + this.defaultTueDayRequired[2]+ + + this.defaultTueDayRequired[3] + + + this.defaultTueDayRequired[4] + + + this.defaultTueDayRequired[5]
this.defaultTotalTueGenerated= this.defaultTueDayGenerated[0] + + + this.defaultTueDayGenerated[1] + + + this.defaultTueDayGenerated[2]+ + +this.defaultTueDayGenerated[3] + + + this.defaultTueDayGenerated[4] + + + this.defaultTueDayGenerated[5]
this.defaultTotalTuediff=this.defaultTotalTueGenerated+ - + this.defaultTotalTueRequired

this.defaultWedDayRequired=[];this.defaultWedDayGenerated=[];
this.defaultWedDayRequired.push(this.defRequiredData.WED_MID)
this.defaultWedDayRequired.push(this.defRequiredData.WED_DAY)
this.defaultWedDayRequired.push(this.defRequiredData.WED_EVE)
this.defaultWedDayRequired.push(this.defRequiredData.WED_MID_DAY)
this.defaultWedDayRequired.push(this.defRequiredData.WED_DAY_EVE)
this.defaultWedDayRequired.push(this.defRequiredData.WED_EVE_MID)
this.defaultWedDayGenerated.push(this.defGeneratedData.WED_MID)
this.defaultWedDayGenerated.push(this.defGeneratedData.WED_DAY)
this.defaultWedDayGenerated.push(this.defGeneratedData.WED_EVE)
this.defaultWedDayGenerated.push(this.defGeneratedData.WED_MID_DAY)
this.defaultWedDayGenerated.push(this.defGeneratedData.WED_DAY_EVE)
this.defaultWedDayGenerated.push(this.defGeneratedData.WED_EVE_MID)
this.defaultDiffWedMid=this.defaultWedDayGenerated[0] + - + this.defaultWedDayRequired[0]
this.defaultDiffWedDay=this.defaultWedDayGenerated[1] + - + this.defaultWedDayRequired[1]
this.defaultDiffWedEve=this.defaultWedDayGenerated[2] + - + this.defaultWedDayRequired[2]
this.defaultDiffWedMidDay=this.defaultWedDayGenerated[3] + - + this.defaultWedDayRequired[3]
this.defaultDiffWedDayEve=this.defaultWedDayGenerated[4] + - + this.defaultWedDayRequired[4]
this.defaultDiffWedEveMid=this.defaultWedDayGenerated[5] + - + this.defaultWedDayRequired[5]
this.defaultTotalWedRequired= this.defaultWedDayRequired[0] + + + this.defaultWedDayRequired[1] + + + this.defaultWedDayRequired[2]+ + + this.defaultWedDayRequired[3] + + + this.defaultWedDayRequired[4] + + + this.defaultWedDayRequired[5]
this.defaultTotalWedGenerated= this.defaultWedDayGenerated[0] + + + this.defaultWedDayGenerated[1] + + + this.defaultWedDayGenerated[2]+ + +this.defaultWedDayGenerated[3] + + + this.defaultWedDayGenerated[4] + + + this.defaultWedDayGenerated[5]
this.defaultTotalWeddiff=this.defaultTotalWedGenerated+ - + this.defaultTotalWedRequired

this.defaultThuDayRequired=[];this.defaultThuDayGenerated=[];
this.defaultThuDayRequired.push(this.defRequiredData.THU_MID)
this.defaultThuDayRequired.push(this.defRequiredData.THU_DAY)
this.defaultThuDayRequired.push(this.defRequiredData.THU_EVE)
this.defaultThuDayRequired.push(this.defRequiredData.THU_MID_DAY)
this.defaultThuDayRequired.push(this.defRequiredData.THU_DAY_EVE)
this.defaultThuDayRequired.push(this.defRequiredData.THU_EVE_MID)
this.defaultThuDayGenerated.push(this.defGeneratedData.THU_MID)
this.defaultThuDayGenerated.push(this.defGeneratedData.THU_DAY)
this.defaultThuDayGenerated.push(this.defGeneratedData.THU_EVE)
this.defaultThuDayGenerated.push(this.defGeneratedData.THU_MID_DAY)
this.defaultThuDayGenerated.push(this.defGeneratedData.THU_DAY_EVE)
this.defaultThuDayGenerated.push(this.defGeneratedData.THU_EVE_MID)
this.defaultDiffThuMid=this.defaultThuDayGenerated[0] + - + this.defaultThuDayRequired[0]
this.defaultDiffThuDay=this.defaultThuDayGenerated[1] + - + this.defaultThuDayRequired[1]
this.defaultDiffThuEve=this.defaultThuDayGenerated[2] + - + this.defaultThuDayRequired[2]
this.defaultDiffThuMidDay=this.defaultThuDayGenerated[3] + - + this.defaultThuDayRequired[3]
this.defaultDiffThuDayEve=this.defaultThuDayGenerated[4] + - + this.defaultThuDayRequired[4]
this.defaultDiffThuEveMid=this.defaultThuDayGenerated[5] + - + this.defaultThuDayRequired[5]
this.defaultTotalThuRequired= this.defaultThuDayRequired[0] + + + this.defaultThuDayRequired[1] + + + this.defaultThuDayRequired[2]+ + + this.defaultThuDayRequired[3] + + + this.defaultThuDayRequired[4] + + + this.defaultThuDayRequired[5]
this.defaultTotalThuGenerated= this.defaultThuDayGenerated[0] + + + this.defaultThuDayGenerated[1] + + + this.defaultThuDayGenerated[2]+ + +this.defaultThuDayGenerated[3] + + + this.defaultThuDayGenerated[4] + + + this.defaultThuDayGenerated[5]
this.defaultTotalThudiff=this.defaultTotalThuGenerated+ - + this.defaultTotalThuRequired

this.defaultFriDayRequired=[];this.defaultFriDayGenerated=[];
this.defaultFriDayRequired.push(this.defRequiredData.FRI_MID)
this.defaultFriDayRequired.push(this.defRequiredData.FRI_DAY)
this.defaultFriDayRequired.push(this.defRequiredData.FRI_EVE)
this.defaultFriDayRequired.push(this.defRequiredData.FRI_MID_DAY)
this.defaultFriDayRequired.push(this.defRequiredData.FRI_DAY_EVE)
this.defaultFriDayRequired.push(this.defRequiredData.FRI_EVE_MID)
this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_MID)
this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_DAY)
this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_EVE)
this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_MID_DAY)
this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_DAY_EVE)
this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_EVE_MID)
this.defaultDiffFriMid=this.defaultFriDayGenerated[0] + - + this.defaultFriDayRequired[0]
this.defaultDiffFriDay=this.defaultFriDayGenerated[1] + - + this.defaultFriDayRequired[1]
this.defaultDiffFriEve=this.defaultFriDayGenerated[2] + - + this.defaultFriDayRequired[2]
this.defaultDiffFriMidDay=this.defaultFriDayGenerated[3] + - + this.defaultFriDayRequired[3]
this.defaultDiffFriDayEve=this.defaultFriDayGenerated[4] + - + this.defaultFriDayRequired[4]
this.defaultDiffFriEveMid=this.defaultFriDayGenerated[5] + - + this.defaultFriDayRequired[5]
this.defaultTotalFriRequired= this.defaultFriDayRequired[0] + + + this.defaultFriDayRequired[1] + + + this.defaultFriDayRequired[2]+ + + this.defaultFriDayRequired[3] + + + this.defaultFriDayRequired[4] + + + this.defaultFriDayRequired[5]
this.defaultTotalFriGenerated= this.defaultFriDayGenerated[0] + + + this.defaultFriDayGenerated[1] + + + this.defaultFriDayGenerated[2]+ + +this.defaultFriDayGenerated[3] + + + this.defaultFriDayGenerated[4] + + + this.defaultFriDayGenerated[5]
this.defaultTotalFridiff=this.defaultTotalFriGenerated+ - + this.defaultTotalFriRequired

this.defaultSatDayRequired=[];this.defaultSatDayGenerated=[];
this.defaultSatDayRequired.push(this.defRequiredData.SAT_MID)
this.defaultSatDayRequired.push(this.defRequiredData.SAT_DAY)
this.defaultSatDayRequired.push(this.defRequiredData.SAT_EVE)
this.defaultSatDayRequired.push(this.defRequiredData.SAT_MID_DAY)
this.defaultSatDayRequired.push(this.defRequiredData.SAT_DAY_EVE)
this.defaultSatDayRequired.push(this.defRequiredData.SAT_EVE_MID)
this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_MID)
this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_DAY)
this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_EVE)
this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_MID_DAY)
this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_DAY_EVE)
this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_EVE_MID)
this.defaultDiffSatMid=this.defaultSatDayGenerated[0] + - + this.defaultSatDayRequired[0]
this.defaultDiffSatDay=this.defaultSatDayGenerated[1] + - + this.defaultSatDayRequired[1]
this.defaultDiffSatEve=this.defaultSatDayGenerated[2] + - + this.defaultSatDayRequired[2]
this.defaultDiffSatMidDay=this.defaultSatDayGenerated[3] + - + this.defaultSatDayRequired[3]
this.defaultDiffSatDayEve=this.defaultSatDayGenerated[4] + - + this.defaultSatDayRequired[4]
this.defaultDiffSatEveMid=this.defaultSatDayGenerated[5] + - + this.defaultSatDayRequired[5]
this.defaultTotalSatRequired= this.defaultSatDayRequired[0] + + + this.defaultSatDayRequired[1] + + + this.defaultSatDayRequired[2]+ + + this.defaultSatDayRequired[3] + + + this.defaultSatDayRequired[4] + + + this.defaultSatDayRequired[5]
this.defaultTotalSatGenerated= this.defaultSatDayGenerated[0] + + + this.defaultSatDayGenerated[1] + + + this.defaultSatDayGenerated[2]+ + +this.defaultSatDayGenerated[3] + + + this.defaultSatDayGenerated[4] + + + this.defaultSatDayGenerated[5]
this.defaultTotalSatdiff=this.defaultTotalSatGenerated+ - + this.defaultTotalSatRequired

this.reqData=[]
for(var i=0;i<this.allShiftData.length;i++){
  this.req_shift_1_data={"shiftTime":this.allShiftData[i].startTime,"sun":this.allShiftData[i].Sun,"mon":this.allShiftData[i].Mon,"tue":this.allShiftData[i].Tue,"wed":this.allShiftData[i].Wed,"thu":this.allShiftData[i].Thu,"fri":this.allShiftData[i].Fri,"sat":this.allShiftData[i].Sat}
  this.reqData.push(this.req_shift_1_data)
}

this.reqvsgenDataShiftTime=[];this.reqvsgenDataSun=[];this.reqvsgenDataMon=[];this.reqvsgenDataTue=[];this.reqvsgenDataWed=[];this.reqvsgenDataThu=[];this.reqvsgenDataFri=[];this.reqvsgenDataSat=[];
this.reqvsgenDataShiftTime.push({"shift_start":"Shifts","shift_length":"Duration","shift_name":"Shift Name"})
// this.reqvsgenDataShiftTime.push("Shifts")
this.reqvsgenDataSun.push("Sun")
this.reqvsgenDataMon.push("Mon")
this.reqvsgenDataTue.push("Tue")
this.reqvsgenDataWed.push("Wed")
this.reqvsgenDataThu.push("Thu")
this.reqvsgenDataFri.push("Fri")
this.reqvsgenDataSat.push("Sat")
      var r = [],r1=[]
      countsCustomizedSunDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedSunDay=r1.concat(r);
      countsCustomizedSunDay=countsCustomizedSunDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));

      r = [],r1=[],r2=[],r3=[]
      countsCustomizedMonDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedMonDay=r1.concat(r);
      countsCustomizedMonDay=countsCustomizedMonDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      r = [],r1=[]
      countsCustomizedTueDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedTueDay=r1.concat(r);
      countsCustomizedTueDay=countsCustomizedTueDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      r = [],r1=[]
      countsCustomizedWedDay.forEach((e)=>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedWedDay=r1.concat(r);
      countsCustomizedWedDay=countsCustomizedWedDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      r = [],r1=[]
      countsCustomizedThuDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedThuDay=r1.concat(r);
      countsCustomizedThuDay=countsCustomizedThuDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      r = [],r1=[]
      countsCustomizedFriDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedFriDay=r1.concat(r);
      countsCustomizedFriDay=countsCustomizedFriDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      r = [],r1=[]
      countsCustomizedSatDay.forEach((e) => {if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
      r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
      r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
      countsCustomizedSatDay=r1.concat(r);
      countsCustomizedSatDay=countsCustomizedSatDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      for(var i=0;i<this.allShiftData.length;i++){

        for(var j=0;j<countsCustomizedSunDay.length;j++){
          if(Number(this.allShiftData[i].startTime)===Number(countsCustomizedSunDay[j].shiftDefintion) && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedSunDay[j].shift_duration)){
          this.reqvsgenDataShiftTime.push({"shift_start":String(this.allShiftData[i].startTime),"shift_length":String(this.allShiftData[i].shift_duration),"shift_name":String(this.allShiftData[i].shiftName)})
          }
        }
      for(var j=0;j<countsCustomizedSunDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedSunDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedSunDay[j].shift_duration)){
          if(Number(countsCustomizedSunDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataSun.push(0+ '/' + Number(countsCustomizedSunDay[j].totalEmp))
          }else{
            this.reqvsgenDataSun.push(Number(this.allShiftData[i].Sun)+ '/' + Number(countsCustomizedSunDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedMonDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedMonDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedMonDay[j].shift_duration)){
          if(Number(countsCustomizedMonDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataMon.push(0+ '/' + Number(countsCustomizedMonDay[j].totalEmp))
          }else{
            this.reqvsgenDataMon.push(Number(this.allShiftData[i].Mon)+ '/' + Number(countsCustomizedMonDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedTueDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedTueDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedTueDay[j].shift_duration)){
          if(Number(countsCustomizedTueDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataTue.push(0+ '/' + Number(countsCustomizedTueDay[j].totalEmp))
          }else{
            this.reqvsgenDataTue.push(Number(this.allShiftData[i].Tue)+ '/' + Number(countsCustomizedTueDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedWedDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedWedDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedWedDay[j].shift_duration)){
          if(Number(countsCustomizedWedDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataWed.push(0+ '/' + Number(countsCustomizedWedDay[j].totalEmp))
          }else{
            this.reqvsgenDataWed.push(Number(this.allShiftData[i].Wed)+ '/' + Number(countsCustomizedWedDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedThuDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedThuDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedThuDay[j].shift_duration)){
          if(Number(countsCustomizedThuDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataThu.push(0+ '/' + Number(countsCustomizedThuDay[j].totalEmp))
          }else{
            this.reqvsgenDataThu.push(Number(this.allShiftData[i].Thu)+ '/' + Number(countsCustomizedThuDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedFriDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedFriDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedFriDay[j].shift_duration)){
          if(Number(countsCustomizedFriDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataFri.push(0+ '/' + Number(countsCustomizedFriDay[j].totalEmp))
          }else{
            this.reqvsgenDataFri.push(Number(this.allShiftData[i].Fri)+ '/' + Number(countsCustomizedFriDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedSatDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedSatDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedSatDay[j].shift_duration)){
          if(Number(countsCustomizedFriDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDataSat.push(0+ '/' + Number(countsCustomizedSatDay[j].totalEmp))
          }else{
            this.reqvsgenDataSat.push(Number(this.allShiftData[i].Sat)+ '/' + Number(countsCustomizedSatDay[j].totalEmp))
          }
        }
      }
    }


    this.reqvsgenDefDataShiftTime=[];this.reqvsgenDefDataSun=[];this.reqvsgenDefDataMon=[];this.reqvsgenDefDataTue=[];this.reqvsgenDefDataWed=[];this.reqvsgenDefDataThu=[];this.reqvsgenDefDataFri=[];this.reqvsgenDefDataSat=[];
this.reqvsgenDefDataShiftTime.push({"shift_start":"Shifts","shift_length":"Duration","shift_name":"Shift Name"})
this.reqvsgenDefDataSun.push("Sun")
this.reqvsgenDefDataMon.push("Mon")
this.reqvsgenDefDataTue.push("Tue")
this.reqvsgenDefDataWed.push("Wed")
this.reqvsgenDefDataThu.push("Thu")
this.reqvsgenDefDataFri.push("Fri")
this.reqvsgenDefDataSat.push("Sat")
r = [],r1=[],r2=[],r3=[]
countsCustomizedDefSunDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefSunDay=r1.concat(r);
countsCustomizedDefSunDay=countsCustomizedDefSunDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
r = [],r1=[],r2=[],r3=[]
countsCustomizedDefMonDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefMonDay=r1.concat(r);
countsCustomizedDefMonDay=countsCustomizedDefMonDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
r = [],r1=[]
countsCustomizedDefTueDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefTueDay=r1.concat(r);
countsCustomizedDefTueDay=countsCustomizedDefTueDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
r = [],r1=[]
countsCustomizedDefWedDay.forEach((e)=>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefWedDay=r1.concat(r);
countsCustomizedDefWedDay=countsCustomizedDefWedDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
r = [],r1=[]
countsCustomizedDefThuDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefThuDay=r1.concat(r);
countsCustomizedDefThuDay=countsCustomizedDefThuDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
r = [],r1=[]
countsCustomizedDefFriDay.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefFriDay=r1.concat(r);
countsCustomizedDefFriDay=countsCustomizedDefFriDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
r = [],r1=[]
countsCustomizedDefSatDay.forEach((e) => {if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
r1=r1.sort((a,b) => Number(b.shiftDefintion) - Number(a.shiftDefintion));
r=r.sort((a,b) => Number(a.shiftDefintion) - Number(b.shiftDefintion));
countsCustomizedDefSatDay=r1.concat(r);
countsCustomizedDefSatDay=countsCustomizedDefSatDay.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));
      for(var i=0;i<this.allShiftData.length;i++){

        for(var j=0;j<countsCustomizedDefSunDay.length;j++){
          if(Number(this.allShiftData[i].startTime)===Number(countsCustomizedDefSunDay[j].shiftDefintion) && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefSunDay[j].shift_duration)){
          this.reqvsgenDefDataShiftTime.push({"shift_start":String(this.allShiftData[i].startTime),"shift_length":String(this.allShiftData[i].shift_duration),"shift_name":String(this.allShiftData[i].shiftName)})
          }
        }
      for(var j=0;j<countsCustomizedDefSunDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefSunDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefSunDay[j].shift_duration)){
          if(Number(countsCustomizedDefSunDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataSun.push(0+ '/' + Number(countsCustomizedDefSunDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataSun.push(Number(this.allShiftData[i].Sun)+ '/' + Number(countsCustomizedDefSunDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedDefMonDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefMonDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefMonDay[j].shift_duration)){
          if(Number(countsCustomizedDefMonDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataMon.push(0+ '/' + Number(countsCustomizedDefMonDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataMon.push(Number(this.allShiftData[i].Mon)+ '/' + Number(countsCustomizedDefMonDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedDefTueDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefTueDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefTueDay[j].shift_duration)){
          if(Number(countsCustomizedDefTueDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataTue.push(0+ '/' + Number(countsCustomizedDefTueDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataTue.push(Number(this.allShiftData[i].Tue)+ '/' + Number(countsCustomizedDefTueDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedDefWedDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefWedDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefWedDay[j].shift_duration)){
          if(Number(countsCustomizedDefWedDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataWed.push(0+ '/' + Number(countsCustomizedDefWedDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataWed.push(Number(this.allShiftData[i].Wed)+ '/' + Number(countsCustomizedDefWedDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedDefThuDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefThuDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefThuDay[j].shift_duration)){
          if(Number(countsCustomizedDefThuDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataThu.push(0+ '/' + Number(countsCustomizedDefThuDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataThu.push(Number(this.allShiftData[i].Thu)+ '/' + Number(countsCustomizedDefThuDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedDefFriDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefFriDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefFriDay[j].shift_duration)){
          if(Number(countsCustomizedDefFriDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataFri.push(0+ '/' + Number(countsCustomizedDefFriDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataFri.push(Number(this.allShiftData[i].Fri)+ '/' + Number(countsCustomizedDefFriDay[j].totalEmp))
          }
        }
      }
      for(var j=0;j<countsCustomizedDefSatDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefSatDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefSatDay[j].shift_duration)){
          if(Number(countsCustomizedDefFriDay[j].shift_duration)!=Number(this.currentShiftlineScheduleShiftDuration)){
            this.reqvsgenDefDataSat.push(0+ '/' + Number(countsCustomizedDefSatDay[j].totalEmp))
          }else{
            this.reqvsgenDefDataSat.push(Number(this.allShiftData[i].Sat)+ '/' + Number(countsCustomizedDefSatDay[j].totalEmp))
          }
        }
      }
    }

    this.ReqVsGeneData=[]
      this.ReqVsGeneData.push(["","Sun","Mon","Tue","Wed","Thu","Fri","Sat"])
      this.ReqVsGeneData.push(["MID",this.requiredEmpData.SUN_MID+'/'+this.generatedEmpData.SUN_MID,this.requiredEmpData.MON_MID+'/'+this.generatedEmpData.MON_MID,this.requiredEmpData.TUE_MID+'/'+this.generatedEmpData.TUE_MID,this.requiredEmpData.WED_MID+'/'+this.generatedEmpData.WED_MID,this.requiredEmpData.THU_MID+'/'+this.generatedEmpData.THU_MID,this.requiredEmpData.FRI_MID+'/'+this.generatedEmpData.FRI_MID,this.requiredEmpData.SAT_MID+'/'+this.generatedEmpData.SAT_MID])
      this.ReqVsGeneData.push(["DAY",this.requiredEmpData.SUN_DAY+'/'+this.generatedEmpData.SUN_DAY,this.requiredEmpData.MON_DAY+'/'+this.generatedEmpData.MON_DAY,this.requiredEmpData.TUE_DAY+'/'+this.generatedEmpData.TUE_DAY,this.requiredEmpData.WED_DAY+'/'+this.generatedEmpData.WED_DAY,this.requiredEmpData.THU_DAY+'/'+this.generatedEmpData.THU_DAY,this.requiredEmpData.FRI_DAY+'/'+this.generatedEmpData.FRI_DAY,this.requiredEmpData.SAT_DAY+'/'+this.generatedEmpData.SAT_DAY])
      this.ReqVsGeneData.push(["EVE",this.requiredEmpData.SUN_EVE+'/'+this.generatedEmpData.SUN_EVE,this.requiredEmpData.MON_EVE+'/'+this.generatedEmpData.MON_EVE,this.requiredEmpData.TUE_EVE+'/'+this.generatedEmpData.TUE_EVE,this.requiredEmpData.WED_EVE+'/'+this.generatedEmpData.WED_EVE,this.requiredEmpData.THU_EVE+'/'+this.generatedEmpData.THU_EVE,this.requiredEmpData.FRI_EVE+'/'+this.generatedEmpData.FRI_EVE,this.requiredEmpData.SAT_EVE+'/'+this.generatedEmpData.SAT_EVE])
      this.ReqVsGeneData.push(["MID-DAY",this.requiredEmpData.SUN_MID_DAY+'/'+this.generatedEmpData.SUN_MID_DAY,this.requiredEmpData.MON_MID_DAY+'/'+this.generatedEmpData.MON_MID_DAY,this.requiredEmpData.TUE_MID_DAY+'/'+this.generatedEmpData.TUE_MID_DAY,this.requiredEmpData.WED_MID_DAY+'/'+this.generatedEmpData.WED_MID_DAY,this.requiredEmpData.THU_MID_DAY+'/'+this.generatedEmpData.THU_MID_DAY,this.requiredEmpData.FRI_MID_DAY+'/'+this.generatedEmpData.FRI_MID_DAY,this.requiredEmpData.SAT_MID_DAY+'/'+this.generatedEmpData.SAT_MID_DAY])
      this.ReqVsGeneData.push(["DAY-EVE",this.requiredEmpData.SUN_DAY_EVE+'/'+this.generatedEmpData.SUN_DAY_EVE,this.requiredEmpData.MON_DAY_EVE+'/'+this.generatedEmpData.MON_DAY_EVE,this.requiredEmpData.TUE_DAY_EVE+'/'+this.generatedEmpData.TUE_DAY_EVE,this.requiredEmpData.WED_DAY_EVE+'/'+this.generatedEmpData.WED_DAY_EVE,this.requiredEmpData.THU_DAY_EVE+'/'+this.generatedEmpData.THU_DAY_EVE,this.requiredEmpData.FRI_DAY_EVE+'/'+this.generatedEmpData.FRI_DAY_EVE,this.requiredEmpData.SAT_DAY_EVE+'/'+this.generatedEmpData.SAT_DAY_EVE])
      this.ReqVsGeneData.push(["EVE-MID",this.requiredEmpData.SUN_EVE_MID+'/'+this.generatedEmpData.SUN_EVE_MID,this.requiredEmpData.MON_EVE_MID+'/'+this.generatedEmpData.MON_EVE_MID,this.requiredEmpData.TUE_EVE_MID+'/'+this.generatedEmpData.TUE_EVE_MID,this.requiredEmpData.WED_EVE_MID+'/'+this.generatedEmpData.WED_EVE_MID,this.requiredEmpData.THU_EVE_MID+'/'+this.generatedEmpData.THU_EVE_MID,this.requiredEmpData.FRI_EVE_MID+'/'+this.generatedEmpData.FRI_EVE_MID,this.requiredEmpData.SAT_EVE_MID+'/'+this.generatedEmpData.SAT_EVE_MID])
      this.ReqVsGeneData.push(["",this.totalSunRequired+'/'+ this.totalSunGenerated,this.totalMonRequired+'/'+ this.totalMonGenerated,this.totalTueRequired+'/'+ this.totalTueGenerated,this.totalWedRequired+'/'+ this.totalWedGenerated,this.totalThuRequired+'/'+ this.totalThuGenerated,this.totalFriRequired+'/'+ this.totalFriGenerated,this.totalSatRequired+'/'+ this.totalSatGenerated])
      this.defReqVsGeneData=[]
      this.defReqVsGeneData.push(["","Sun","Mon","Tue","Wed","Thu","Fri","Sat"])
      this.defReqVsGeneData.push(["MID",this.defRequiredData.SUN_MID+'/'+this.defGeneratedData.SUN_MID,this.defRequiredData.MON_MID+'/'+this.defGeneratedData.MON_MID,this.defRequiredData.TUE_MID+'/'+this.defGeneratedData.TUE_MID,this.defRequiredData.WED_MID+'/'+this.defGeneratedData.WED_MID,this.defRequiredData.THU_MID+'/'+this.defGeneratedData.THU_MID,this.defRequiredData.FRI_MID+'/'+this.defGeneratedData.FRI_MID,this.defRequiredData.SAT_MID+'/'+this.defGeneratedData.SAT_MID])
      this.defReqVsGeneData.push(["DAY",this.defRequiredData.SUN_DAY+'/'+this.defGeneratedData.SUN_DAY,this.defRequiredData.MON_DAY+'/'+this.defGeneratedData.MON_DAY,this.defRequiredData.TUE_DAY+'/'+this.defGeneratedData.TUE_DAY,this.defRequiredData.WED_DAY+'/'+this.defGeneratedData.WED_DAY,this.defRequiredData.THU_DAY+'/'+this.defGeneratedData.THU_DAY,this.defRequiredData.FRI_DAY+'/'+this.defGeneratedData.FRI_DAY,this.defRequiredData.SAT_DAY+'/'+this.defGeneratedData.SAT_DAY])
      this.defReqVsGeneData.push(["EVE",this.defRequiredData.SUN_EVE+'/'+this.defGeneratedData.SUN_EVE,this.defRequiredData.MON_EVE+'/'+this.defGeneratedData.MON_EVE,this.defRequiredData.TUE_EVE+'/'+this.defGeneratedData.TUE_EVE,this.defRequiredData.WED_EVE+'/'+this.defGeneratedData.WED_EVE,this.defRequiredData.THU_EVE+'/'+this.defGeneratedData.THU_EVE,this.defRequiredData.FRI_EVE+'/'+this.defGeneratedData.FRI_EVE,this.defRequiredData.SAT_EVE+'/'+this.defGeneratedData.SAT_EVE])
      this.defReqVsGeneData.push(["MID-DAY",this.defRequiredData.SUN_MID_DAY+'/'+this.defGeneratedData.SUN_MID_DAY,this.defRequiredData.MON_MID_DAY+'/'+this.defGeneratedData.MON_MID_DAY,this.defRequiredData.TUE_MID_DAY+'/'+this.defGeneratedData.TUE_MID_DAY,this.defRequiredData.WED_MID_DAY+'/'+this.defGeneratedData.WED_MID_DAY,this.defRequiredData.THU_MID_DAY+'/'+this.defGeneratedData.THU_MID_DAY,this.defRequiredData.FRI_MID_DAY+'/'+this.defGeneratedData.FRI_MID_DAY,this.defRequiredData.SAT_MID_DAY+'/'+this.defGeneratedData.SAT_MID_DAY])
      this.defReqVsGeneData.push(["DAY-EVE",this.defRequiredData.SUN_DAY_EVE+'/'+this.defGeneratedData.SUN_DAY_EVE,this.defRequiredData.MON_DAY_EVE+'/'+this.defGeneratedData.MON_DAY_EVE,this.defRequiredData.TUE_DAY_EVE+'/'+this.defGeneratedData.TUE_DAY_EVE,this.defRequiredData.WED_DAY_EVE+'/'+this.defGeneratedData.WED_DAY_EVE,this.defRequiredData.THU_DAY_EVE+'/'+this.defGeneratedData.THU_DAY_EVE,this.defRequiredData.FRI_DAY_EVE+'/'+this.defGeneratedData.FRI_DAY_EVE,this.defRequiredData.SAT_DAY_EVE+'/'+this.defGeneratedData.SAT_DAY_EVE])
      this.defReqVsGeneData.push(["EVE-MID",this.defRequiredData.SUN_EVE_MID+'/'+this.defGeneratedData.SUN_EVE_MID,this.defRequiredData.MON_EVE_MID+'/'+this.defGeneratedData.MON_EVE_MID,this.defRequiredData.TUE_EVE_MID+'/'+this.defGeneratedData.TUE_EVE_MID,this.defRequiredData.WED_EVE_MID+'/'+this.defGeneratedData.WED_EVE_MID,this.defRequiredData.THU_EVE_MID+'/'+this.defGeneratedData.THU_EVE_MID,this.defRequiredData.FRI_EVE_MID+'/'+this.defGeneratedData.FRI_EVE_MID,this.defRequiredData.SAT_EVE_MID+'/'+this.defGeneratedData.SAT_EVE_MID])
      this.defReqVsGeneData.push(["",this.defaultTotalSunRequired+'/'+ this.defaultTotalSunGenerated,this.defaultTotalMonRequired+'/'+ this.defaultTotalMonGenerated,this.defaultTotalTueRequired+'/'+ this.defaultTotalTueGenerated,this.defaultTotalWedRequired+'/'+ this.defaultTotalWedGenerated,this.defaultTotalThuRequired+'/'+ this.defaultTotalThuGenerated,this.defaultTotalFriRequired+'/'+ this.defaultTotalFriGenerated,this.defaultTotalSatRequired+'/'+ this.defaultTotalSatGenerated])

          this.totalDefaultScheduleLine=i

        this.totalShiftLine=String(this.defscheduleShift.length)
        this.totalCustomizeShiftLine=this.scheduleShift.length
        this.required_title={"Required Workforce":"Required Workforce"}
        this.generated_title={'System Generated Workforce':'System Generated Workforc'}
        this.required_vs_generated_title={"Required vs System Generated Workforce":"Required vs System Generated Workforce"}

        this.defaultScheduleShift.push(this.totalShiftLine)

        return this.totalCount,this.countSunSat,this.countSunMon,this.countMonTue,this.countTueWed,this.countWedThu,this.countThuFri,this.countFriSat,this.SunSat,this.SunMon,this.MonTue,this.TueWed,this.WedThu,this.ThuFri,this.FriSat


  }
  goBack(){
    this.navCtrl.navigateBack([straightlines_io_apis.apis.enter_Work_load_api])
  }
  convertRDOtoShiftDefintion(rdo,shiftlength){
    if(String(rdo)=='X' || String(rdo)=='x'){
      return rdo
    }
    else{
      for(var i=0;i<this.allShiftData.length;i++){
        if(Number(shiftlength)==9){
          if(String(this.allShiftData[i].shiftName)==String(rdo.split('-')[0]) && Number(rdo.split('-')[1])==Number(this.allShiftData[i].shift_duration)){
            return String(this.allShiftData[i].startTime)
          }
        }else{
          if(String(this.allShiftData[i].shiftName)==String(rdo) && Number(shiftlength)==Number(this.allShiftData[i].shift_duration)){
            return String(this.allShiftData[i].startTime)
          }
        }
      }

    }
  }
  getShiftCategory(rdo,shiftlength){
    if(String(rdo)=='X' || String(rdo)=='x'){
      return rdo
    }
    else{
      for(var i=0;i<this.allShiftData.length;i++){
        if(Number(shiftlength)==9){
          if(String(this.allShiftData[i].shiftName)==String(rdo.split('-')[0]) && Number(rdo.split('-')[1])==Number(this.allShiftData[i].shift_duration)){
            return this.allShiftData[i].shiftCategory
          }
        }else{
          if(String(this.allShiftData[i].shiftName)==String(rdo) && Number(shiftlength)==Number(this.allShiftData[i].shift_duration)){
            return this.allShiftData[i].shiftCategory
          }
        }
      }
    }
  }
  getShiftDuration(rdo,shiftlength){
    if(String(rdo)=='X' || String(rdo)=='x'){
      return rdo
    }
    else{

        if(Number(shiftlength)==9){
            return Number(rdo.split('-')[1])
        }else{
          return Number(shiftlength)
        }
    }
  }

  async openMenu(){

      if(this.checkUserAccess==true){
      const modal = await this.modalCtrl.create({
        component: SaveExportActionSheetComponent,
        cssClass: 'SaveExportActionSheet',
        componentProps: {
            scheduleShift:this.scheduleShift,
            defscheduleShift:this.defscheduleShift,
            defReqVsGeneData:this.defReqVsGeneData,
            ReqVsGeneData:this.ReqVsGeneData,
            reqvsgenDefDataShiftTime:this.reqvsgenDefDataShiftTime,
            reqvsgenDefDataSun:this.reqvsgenDefDataSun,
            reqvsgenDefDataMon:this.reqvsgenDefDataMon,
            reqvsgenDefDataTue:this.reqvsgenDefDataTue,
            reqvsgenDefDataWed:this.reqvsgenDefDataWed,
            reqvsgenDefDataThu:this.reqvsgenDefDataThu,
            reqvsgenDefDataFri:this.reqvsgenDefDataFri,
            reqvsgenDefDataSat:this.reqvsgenDefDataSat,
            reqvsgenDataShiftTime:this.reqvsgenDataShiftTime,
            reqvsgenDataSun:this.reqvsgenDataSun,
            reqvsgenDataMon:this.reqvsgenDataMon,
            reqvsgenDataTue:this.reqvsgenDataTue,
            reqvsgenDataWed:this.reqvsgenDataWed,
            reqvsgenDataThu:this.reqvsgenDataThu,
            reqvsgenDataFri:this.reqvsgenDataFri,
            reqvsgenDataSat:this.reqvsgenDataSat,
            rdosArr:this.rdosArr,
            defrdosArr:this.defrdosArr
        },
        swipeToClose:true
      })
      // this.scheduleShift=EditScheduleDataPage.data5

      return await modal.present();
    }else{
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: "Sorry, you don't have access to save the shiftline schedule! Please upgrade your plan.",
        buttons: ['OK']
      });

      await alert.present();
    }
    }
    // checkID(id,sl){
    //
    //   var tempArr=[]
    //   for(var i=0; i<=this.scheduleShift.length;i++)
    //   {
    //     if(this.scheduleShift[i] !=undefined){
    //     if(this.scheduleShift[i]?.SL  == sl || this.scheduleShift[i]?.SL  == (sl+'-A')){
    //      tempArr.push(Number(this.scheduleShift[i]?.id))
    //     }
    //     }
    //   }
    //   tempArr=tempArr.sort((a,b)=>{return a -b})
    //   var newid=tempArr.indexOf(id)+  + +1

    //   return newid
    // }
  async saveInDataBase(){
      var saveDuplicateSchedule=[]
    const modal = await this.modalCtrl.create({
      component: SaveScheduleComponent,
      cssClass: 'saveSchedule',
      componentProps: { saveSchedule:this.scheduleShift,schedule:[]},
      swipeToClose:true
    });
    return await modal.present();
  }
  next() {
    const r = [];
    for (const char of this._nextId) {
      r.unshift(this._chars[char]);
    }
    this._increment();
    return r.join('');
  }

  _increment() {
    for (let i = 0; i < this._nextId.length; i++) {
      const val = ++this._nextId[i];
      if (val >= this._chars.length) {
        this._nextId[i] = 0;
      } else {
        return;
      }
    }
    this._nextId.push(0);
  }

  *[Symbol.iterator]() {
    while (true) {
      yield this.next();
    }
  }

    async addNewShiftLine(){
      const modal = await this.modalCtrl.create({
        component: AddNewShiftLinePage,
        cssClass: 'addNewShiftLine',
        swipeToClose:true,
       componentProps: { schedule_id:this.schedule_id }

      });
      modal.onDidDismiss().then(()=>{
        this.generatedShiftlineScheduleData()
      })
      // // this.scheduleShift=EditScheduleDataPage.data5
      //
      return await modal.present();

    }
    async midShiftsDetails(){
      const modal = await this.modalCtrl.create({
        component: ViewTotalMidShiftLinesDataPage,
        cssClass: 'viewShiftData',
        swipeToClose:true,
        componentProps: { schedule_id:this.schedule_id }

      });
      // this.scheduleShift=EditScheduleDataPage.data5

      return await modal.present();

    }

    async dayShiftsDetails(){
      const modal = await this.modalCtrl.create({
        component: ViewTotalDayShiftLinesDataPage,
        cssClass: 'viewShiftData',
        swipeToClose:true,
        componentProps: { schedule_id:this.schedule_id }
        // componentProps: { scheduleData: scheduleShift }

      });
      // this.scheduleShift=EditScheduleDataPage.data5

      return await modal.present();

    }

    async eveShiftsDetails(){
      const modal = await this.modalCtrl.create({
        component: ViewTotalEveShiftLinesDataPage,
        cssClass: 'viewShiftData',
        swipeToClose:true,
        componentProps: { schedule_id:this.schedule_id }
        // componentProps: { scheduleData: scheduleShift }

      });
      // this.scheduleShift=EditScheduleDataPage.data5

      return await modal.present();

    }
    async daySummary(day_summary){

      const modal = await this.modalCtrl.create({
        component: ViewSummaryDayCategoryWisePage,
        componentProps: { days: day_summary,schedule_id:this.schedule_id },
        cssClass: 'daySummaryData',
        swipeToClose:true
      });
      return await modal.present();

    }
    logOut(){
      sessionStorage.removeItem('token')
    this.navCtrl.navigateBack('login')
    }
    getIndicatorClass(id1){
      if(this.schedule_id===id1 ) {
        return 'active';
      }else {
        return 'small';
      }
      return 'hidden';
    }
    showLegends(){

      if(this.hide_BL_rules_Labels==false){
        return this.hide_BL_rules_Labels=true
      }else{
        return this.hide_BL_rules_Labels=false
      }
    }

    handleSlide(event){

      event.target.getSlidingRatio().then(res=> {
        if(res>1.2){
          this.nextslide=false
          this.slides.lockSwipes(false);
          // this.slides.slid(1)

        }
        if(res > 0 && res<1.2){
          this.nextslide=true
          this.slides.lockSwipes(true);
        }
      });
    }
    scheduleOne=true
    scheduleTwo=false
    scheduleThree=false
    schedule(id){
      if(id==0){
        this.slides.slideTo(id)
              this.schedule_id=0
      }else if(id==1){
        this.slides.slideTo(id)
        this.schedule_id=1
      }else if(id==2){
        this.slides.slideTo(id)
        this.schedule_id=2
      }
    }
    change(){
      // IonSlides.

      // if(   this.schedule_title=='Schedule Generated !'){
      //   this.slides.lockSwipes(true)
      // }else{
      this.slides.getActiveIndex().then(index => {

        this.schedule_id=index
        this.cdref.detectChanges()
        this.generatedShiftlineScheduleData()
    })}
    // }
    checkDisablepopup=false
myFunction() {
  this.checkDisablepopup=false
  if(this.checkDisablepopup==false){
    var popupshowsummaryInfo = document.getElementById("myPopupsummaryInfo");
    if(popupshowsummaryInfo.classList.contains("showsummaryInfo")==true){
      popupshowsummaryInfo.classList.toggle("showsummaryInfo");
    }
    if(this.oldrdoIndex!=undefined){
      var popup = document.getElementById("popupRdo"+this.oldrdoIndex);
      if(popup.classList.contains("showrdo")==true){
        popup.classList.toggle("showrdo");
      }
      this.oldrdoIndex=undefined
    }

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

}
disablepopup(){
  if(this.checkDisablepopup==true){
    var popupshowsummaryInfo = document.getElementById("myPopupsummaryInfo");
    if(popupshowsummaryInfo.classList.contains("showsummaryInfo")==true){
      popupshowsummaryInfo.classList.toggle("showsummaryInfo");
    }
    var popup = document.getElementById("myPopup");
    if(popup.classList.contains("show")==true){
      popup.classList.toggle("show");
    }
    if(this.oldrdoIndex!=undefined){
      var popup = document.getElementById("popupRdo"+this.oldrdoIndex);
      if(popup.classList.contains("showrdo")==true){
        popup.classList.toggle("showrdo");
      }
      this.oldrdoIndex=undefined
    }
  }
  this.checkDisablepopup=true
}
summaryInfo(){
  this.checkDisablepopup=false
  if(this.checkDisablepopup==false){
    var popup = document.getElementById("myPopup");
    if(popup.classList.contains("show")==true){
      popup.classList.toggle("show");
    }
    if(this.oldrdoIndex!=undefined){
      var popup = document.getElementById("popupRdo"+this.oldrdoIndex);
      if(popup.classList.contains("showrdo")==true){
        popup.classList.toggle("showrdo");
      }
      this.oldrdoIndex=undefined
    }
    var popupshowsummaryInfo = document.getElementById("myPopupsummaryInfo");
    popupshowsummaryInfo.classList.toggle("showsummaryInfo");
  }

}
oldrdoIndex=undefined
rdoInfo(index){
  this.checkDisablepopup=false
  if(this.checkDisablepopup==false){
    var popupshowsummaryInfo = document.getElementById("myPopupsummaryInfo");
    if(popupshowsummaryInfo.classList.contains("showsummaryInfo")==true){
      popupshowsummaryInfo.classList.toggle("showsummaryInfo");
    }
    var popup = document.getElementById("myPopup");
    if(popup.classList.contains("show")==true){
      popup.classList.toggle("show");
    }
    if(this.oldrdoIndex!=undefined){
      var popup = document.getElementById("popupRdo"+this.oldrdoIndex);
      if(popup.classList.contains("showrdo")==true){
        popup.classList.toggle("showrdo");
      }
    }
    var popup = document.getElementById("popupRdo"+index);
    popup.classList.toggle("showrdo");
    this.oldrdoIndex=index
  }

}
async edit(scheduleShift) {

      const modal = await this.modalCtrl.create({
        component: EditScheduleDataPage,
        cssClass: 'editSchedule',
        componentProps: { scheduleData: scheduleShift ,schedule_id:this.schedule_id},
        swipeToClose:true
      })
      modal.onDidDismiss().then(()=>{
        this.generatedShiftlineScheduleData()
      })

      return await modal.present();

    }

    numberMargin(i,j){
      var temp
      temp=i+j

      if(Array.from(temp).length<4){
        if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
          return 'margin31'
        }else{
          return 'margin3'
        }
      }
      else if(Array.from(temp).length<5){
        if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
          return 'margin41'
        }else{
          return 'margin4'
        }

      }
      else if(Array.from(temp).length<6){
        return 'margin5'
      }
      else if(Array.from(temp).length<7){
        // return 'margin6'
        if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
          return 'margin61'
        }else{
          return 'margin6'
        }
      }
      else{
        return 'margin7'
      }

    }

    expandlistSlide(i,id,j,l,index){
      var temp
      temp=i+j

      if((Number(this.focusShiftLine)+ + +1)==id && index==this.focusSHiftLineScheduleId){
        if(Array.from(temp).length<4){
          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand31 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand3 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else if(Array.from(temp).length<5){
          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand41 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand4 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else if(Array.from(temp).length<6){
          return 'expand5 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
        }
        else if(Array.from(temp).length<7){
          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand61 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand6 title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else if(Array.from(temp).length<8){
          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand7 ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand7 ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else{
          return 'default-expand title-background-color ion-text-center ion-no-padding ion-no-margin font-size'
        }
      }else{
        if(Array.from(temp).length<4){

          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand31  ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand3 ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else if(Array.from(temp).length<5){

          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand41 ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand4 ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else if(Array.from(temp).length<6){
          return 'expand5 ion-text-center ion-no-padding ion-no-margin font-size'
        }
        else if(Array.from(temp).length<7){
          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand61 ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand6 ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else if(Array.from(temp).length<8){
          if(Array.from(temp)[0]=='W' || Array.from(temp)[1]=='W' || Array.from(temp)[2]=='W'){
            return 'expand7 ion-text-center ion-no-padding ion-no-margin font-size'
          }else{
            return 'expand7 ion-text-center ion-no-padding ion-no-margin font-size'
          }
        }
        else{
          return 'default-expand ion-text-center ion-no-padding ion-no-margin font-size'
        }
      }
  }
  rdoColors(rdo){
    if(rdo=='SS' || rdo=='FSS'){
      return 'colors-sat-sun'
    }else if(rdo=='SM' || rdo=='SMS'){
      return 'colors-sun-mon'
    }else if(rdo=='MT' || rdo=='SMT'){
      return 'colors-mon-tue'
    }else if(rdo=='TW' || rdo=='MTW'){
      return 'colors-tue-wed'
    }else if(rdo=='WTh' || rdo=='TWTh'){
      return 'colors-wed-thu'
    }else if(rdo=='ThF' || rdo=='WThF'){
      return 'colors-thu-fri'
    }else if(rdo=='FS' || rdo=='ThFS'){
      return 'colors-fri-sat'
    }else{
      return 'colors-nc-rdos'
    }
  }
}
