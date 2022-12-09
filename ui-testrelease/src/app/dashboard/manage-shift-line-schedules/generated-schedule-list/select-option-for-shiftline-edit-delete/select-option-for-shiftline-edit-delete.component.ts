import { Component, OnInit } from '@angular/core';
import straightlines_io_apis from 'src/app/json/apis.json';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import Swal from 'sweetalert2';
import * as fs from 'file-saver';
import workloadData from 'src/app/json/work-load-data.json';
import { WorkLoadService } from 'src/app/services/work-load.service';
import { BidScheduleService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-schedule.service';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { Workbook } from 'exceljs';
@Component({
  selector: 'app-select-option-for-shiftline-edit-delete',
  templateUrl: './select-option-for-shiftline-edit-delete.component.html',
  styleUrls: ['./select-option-for-shiftline-edit-delete.component.scss'],
})
export class SelectOptionForShiftlineEditDeleteComponent implements OnInit {
  all_schedule=[]
  currentShiftlineScheduleShiftDuration=8
  allShiftName=[]
  defReqVsGeneData
  mid_day_summary: any[];
  eve_mid_summary: any[];
  day_eve_summary: any[];
 ReqVsGeneData
  updateDefscheduleShiftId
  schedule_id
  schedule_length
  selected_shift_duration
  title = 'angular-app';
  fileName= 'Schedule Data.xlsx';
  hideSplitShiftMidDay=false
  shiftline_schedule_name
  hideSplitShiftDayEve=false
  hideSplitShiftEveMid=false
  allShiftData=[]
  ReqVsGeneTotalData;ReqVsGeneMidData: any;ReqVsGeneDayData: any;ReqVsGeneEveData: any;ReqVsGeneMidDayData: any;ReqVsGeneDayEveData: any;ReqVsGeneEveMidData: any;dayTitleforExcel:any;
  req_shift_1_data;req_shift_2_data;req_shift_3_data;req_shift_4_data;req_shift_5_data;
  gen_shift_1_data;gen_shift_2_data;gen_shift_3_data;gen_shift_4_data;gen_shift_5_data;
  defReqVsGeneTotalData;defReqVsGeneMidData: any;defReqVsGeneDayData: any;defReqVsGeneEveData: any;defReqVsGeneMidDayData: any;defReqVsGeneDayEveData: any;defReqVsGeneEveMidData: any;
  def_gen_shift_1_data;def_gen_shift_2_data;def_gen_shift_3_data;def_gen_shift_4_data;def_gen_shift_5_data
  def=[];defSun=[];defMon=[];defTue=[];defWed=[];defThu=[];defFri=[];defSat=[]
  customized=[];customizedSun=[];customizedMon=[];customizedTue=[];customizedWed=[];customizedThu=[];customizedFri=[];customizedSat=[]
  reqDataShiftTime=[];reqDataSun=[];reqDataMon=[];reqDataTue=[];reqDataWed=[];reqDataThu=[];reqDataFri=[];reqDataSat=[]
  reqvsgenDefDataShiftTime=[];reqvsgenDefDataSun=[];reqvsgenDefDataMon=[];reqvsgenDefDataTue=[];reqvsgenDefDataWed=[];reqvsgenDefDataThu=[];reqvsgenDefDataFri=[];reqvsgenDefDataSat=[]
  reqvsgenDataShiftTime=[];reqvsgenDataSun=[];reqvsgenDataMon=[];reqvsgenDataTue=[];reqvsgenDataWed=[];reqvsgenDataThu=[];reqvsgenDataFri=[];reqvsgenDataSat=[]
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


customizeShiftData=[]
customizeScheduleShiftLines=[]
allShiftDataWithIncludeExclude
  allShift=[]
    user_data: any;
    all_Schedule=[];
    default_work_load_data=workloadData
    work_load_data=[]
    errorMsg: any;
    userDefinedShift=[]
    reqShift: any[];
    all_shift: any[];
    convertTimetoString=[];
    arrangeShiftdefintionL: any[];
    arrangeShiftdefintionG: any[];
    all_bid_schedule
    bid_schedule=[]
    usedScheduleInBidSchedule=[]
    rdosArr=[]
    defrdosArr=[]
    shiftline_Schedule_data
    defGeneratedData= {"SUN_DAY":0,"SUN_MID":0,"SUN_EVE":0,"SUN_MID_DAY":0,"SUN_DAY_EVE":0,"SUN_EVE_MID":0,
  "MON_DAY":0,"MON_MID":0,"MON_EVE":0,"MON_MID_DAY":0,"MON_DAY_EVE":0,"MON_EVE_MID":0,
  "TUE_DAY":0,"TUE_MID":0,"TUE_EVE":0,"TUE_MID_DAY":0,"TUE_DAY_EVE":0,"TUE_EVE_MID":0,
  "WED_DAY":0,"WED_MID":0,"WED_EVE":0,"WED_MID_DAY":0,"WED_DAY_EVE":0,"WED_EVE_MID":0,
  "THU_DAY":0,"THU_MID":0,"THU_EVE":0,"THU_MID_DAY":0,"THU_DAY_EVE":0,"THU_EVE_MID":0,
  "FRI_DAY":0,"FRI_MID":0,"FRI_EVE":0,"FRI_MID_DAY":0,"FRI_DAY_EVE":0,"FRI_EVE_MID":0,
  "SAT_DAY":0,"SAT_MID":0,"SAT_EVE":0,"SAT_MID_DAY":0,"SAT_DAY_EVE":0,"SAT_EVE_MID":0
}
generatedEmpData={"SUN_DAY":0,"SUN_MID":0,"SUN_EVE":0,"SUN_MID_DAY":0,"SUN_DAY_EVE":0,"SUN_EVE_MID":0,
                  "MON_DAY":0,"MON_MID":0,"MON_EVE":0,"MON_MID_DAY":0,"MON_DAY_EVE":0,"MON_EVE_MID":0,
                  "TUE_DAY":0,"TUE_MID":0,"TUE_EVE":0,"TUE_MID_DAY":0,"TUE_DAY_EVE":0,"TUE_EVE_MID":0,
                  "WED_DAY":0,"WED_MID":0,"WED_EVE":0,"WED_MID_DAY":0,"WED_DAY_EVE":0,"WED_EVE_MID":0,
                  "THU_DAY":0,"THU_MID":0,"THU_EVE":0,"THU_MID_DAY":0,"THU_DAY_EVE":0,"THU_EVE_MID":0,
                  "FRI_DAY":0,"FRI_MID":0,"FRI_EVE":0,"FRI_MID_DAY":0,"FRI_DAY_EVE":0,"FRI_EVE_MID":0,
                  "SAT_DAY":0,"SAT_MID":0,"SAT_EVE":0,"SAT_MID_DAY":0,"SAT_DAY_EVE":0,"SAT_EVE_MID":0
                }
  defaultSun: any;defaultSunDayRequired= [];defaultSunDayGenerated= [];defaultDiffSunMid: any;defaultDiffSunDay: any;defaultDiffSunEve: any;defaultTotalSunRequired: any;defaultTotalSunGenerated: any;defaultTotalSundiff: any;defaultDiffSunMidDay: any;defaultDiffSunDayEve: any;defaultDiffSunEveMid: any;
  defaultMon: any;defaultMonDayRequired= [];defaultMonDayGenerated= [];defaultDiffMonMid: any;defaultDiffMonDay: any;defaultDiffMonEve: any;defaultTotalMonRequired: any;defaultTotalMonGenerated: any;defaultTotalMondiff: any;defaultDiffMonMidDay: any;defaultDiffMonDayEve: any;defaultDiffMonEveMid: any;
  defaultTue: any;defaultTueDayRequired= [];defaultTueDayGenerated= [];defaultDiffTueMid: any;defaultDiffTueDay: any;defaultDiffTueEve: any;defaultTotalTueRequired: any;defaultTotalTueGenerated: any;defaultTotalTuediff: any;defaultDiffTueMidDay: any;defaultDiffTueDayEve: any;defaultDiffTueEveMid: any;
  defaultWed: any;defaultWedDayRequired= [];defaultWedDayGenerated= [];defaultDiffWedMid: any;defaultDiffWedDay: any;defaultDiffWedEve: any;defaultTotalWedRequired: any;defaultTotalWedGenerated: any;defaultTotalWeddiff: any;defaultDiffWedMidDay: any;defaultDiffWedDayEve: any;defaultDiffWedEveMid: any;
  defaultThu: any;defaultThuDayRequired= [];defaultThuDayGenerated= [];defaultDiffThuMid: any;defaultDiffThuDay: any;defaultDiffThuEve: any;defaultTotalThuRequired: any;defaultTotalThuGenerated: any;defaultTotalThudiff: any;defaultDiffThuMidDay: any;defaultDiffThuDayEve: any;defaultDiffThuEveMid: any;
  defaultFri: any;defaultFriDayRequired= [];defaultFriDayGenerated= [];defaultDiffFriMid: any;defaultDiffFriDay: any;defaultDiffFriEve: any;defaultTotalFriRequired: any;defaultTotalFriGenerated: any;defaultTotalFridiff: any;defaultDiffFriMidDay: any;defaultDiffFriDayEve: any;defaultDiffFriEveMid: any;
  defaultSat: any;defaultSatDayRequired= [];defaultSatDayGenerated= [];defaultDiffSatMid: any;defaultDiffSatDay: any;defaultDiffSatEve: any;defaultTotalSatRequired: any;defaultTotalSatGenerated: any;defaultTotalSatdiff: any;defaultDiffSatMidDay: any;defaultDiffSatDayEve: any;defaultDiffSatEveMid: any;
  sun:any;SunDayRequired = [];SunDayGenerated = [];totalSundiff: any;totalSunGenerated: any;totalSunRequired: any;diffSunMid: any;diffSunDay: any;diffSunEve: any;diffSunMidDay: any;diffSunDayEve: any;diffSunEveMid: any;validSunMid: boolean;validSunDay: boolean;validSunEve: boolean;
  mon: any;MonDayRequired= [];MonDayGenerated= [];diffMonMid: any;diffMonDay: any;diffMonEve: any;totalMonRequired: any;totalMonGenerated: any;totalMondiff: any;diffMonMidDay: any;diffMonDayEve: any;diffMonEveMid: any;
  tue:any;TueDayRequired= [];TueDayGenerated= [];diffTueMid: any;diffTueDay: any;diffTueEve: any;totalTueRequired: any;totalTueGenerated: any;totalTuediff: any;diffTueMidDay: any;diffTueDayEve: any;diffTueEveMid: any;
  wed:any;WedDayRequired= [];WedDayGenerated= [];diffWedMid: any;diffWedDay: any;diffWedEve: any;totalWedRequired: any;totalWedGenerated: any;totalWeddiff: any;diffWedMidDay: any;diffWedDayEve: any;diffWedEveMid: any;
  thu:any;ThuDayRequired= [];ThuDayGenerated= [];diffThuMid: any;diffThuDay: any;diffThuEve: any;totalThuRequired: any;totalThuGenerated: any;totalThudiff: any;diffThuMidDay: any;diffThuDayEve: any;diffThuEveMid: any;
  fri:any;FriDayRequired= [];FriDayGenerated= [];diffFriMid: any;diffFriDay: any;diffFriEve: any;totalFriRequired: any;totalFriGenerated: any;totalFridiff: any;diffFriMidDay: any;diffFriDayEve: any;diffFriEveMid: any;
  sat:any;SatDayRequired= [];SatDayGenerated= [];diffSatMid: any;diffSatDay: any;diffSatEve: any;totalSatRequired: any;totalSatGenerated: any;totalSatdiff: any;diffSatMidDay: any;diffSatDayEve: any;diffSatEveMid: any;

  countSunSat=0;countSunMon=0;countMonTue=0;countTueWed=0;countWedThu=0;countThuFri=0;countFriSat=0;
  countFSS=0;countSMS=0;countSMT=0;countMTW=0;countTWT=0;countWTF=0;countTFS=0;countNC=0;
  SunSat=0;SunMon=0;MonTue=0;TueWed=0;WedThu=0;ThuFri=0;FriSat=0;
  mid_Summary=[];day_Summary=[];eve_Summary=[]
  def_mid_Summary=[];def_day_Summary=[];def_eve_Summary=[]
  final_mid_Summary=[];final_day_Summary=[];final_eve_Summary=[]
  final_def_mid_Summary=[];final_def_day_Summary=[];final_def_eve_Summary=[]
  exportData=[] as any
  exportScheduleData=[] as any
  sunDay=[] as any
  defscheduleShift: any;
  sundAy= [] as any;mondAy= [] as any;tuedAy= [] as any;weddAy= [] as any;thudAy= [] as any;fridAy= [] as any;satdAy= [] as any;
  def_sundAy= [] as any;def_mondAy= [] as any;def_tuedAy= [] as any;def_weddAy= [] as any;def_thudAy= [] as any;def_fridAy= [] as any;def_satdAy= [] as any;
    allScheduleName: any[];
    scheduleShift=[]
    updatedDefScheduleShiftLines=[]
    totalCount
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    private scheduleService:GeneratedScheduleService,
    private headerTitleService: HeaderTitleService,
    public loadingController: LoadingController,
    private bidSer:BidScheduleService,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public shiftDefSer:WorkLoadService) {
      this.shiftline_Schedule_data=navParams.get('shiftlineSchedule_data')
     }

  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    this.shiftline_schedule_name=this.shiftline_Schedule_data.schedulename
    if(this.shiftline_schedule_name!=undefined && this.shiftline_schedule_name!='' && this.shiftline_schedule_name!=null ){
      this.fileName=this.shiftline_schedule_name +' Shiftline-Schedule Data.xlsx'
    }
    this.getUserDefinedShift()
    this.getAllBidSchedule()
    this.getSchedule()
  }
  async removeSchedule(index){
    var count=0
    index=this.shiftline_Schedule_data
for(var i=0;i<this.allScheduleName.length;i++){
  if(this.allScheduleName[i]==index.sh_schedule_id){
    count++

  }
}
if(count<1){
    const confirm = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Are you sure you want to delete the record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            // this.scheduleService.deleteScheduleBasedOnName(index.schedule_name).subscribe(
              this.scheduleService.newDeleteShiftLineSchedule(index.sh_schedule_id).subscribe(
              async (res)=>{


                    this.ngOnInit()
                const confirm = await this.alertCtrl.create({
                    header: 'Success',
                    message: 'Successfully deleted',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {

                        }
                      }]})
                      await confirm.present();
              },async (err)=>{
                      // if(err.error.text=='deleted'){
                        this.ngOnInit()
                        const confirm = await this.alertCtrl.create({
                            header: '"Success',
                            message: '"Successfully deleted"',
                            buttons: [
                              {
                                text: 'OK',
                                role: 'cancel',
                                handler: () => {

                                }
                              }]})
                              await confirm.present();
                        console.log(err)
              },()=>{
                this.modalCtrl.dismiss('delete')
              }
            )

          }
        }]
        })
        await confirm.present();
      }else{

        const confirm = await this.alertCtrl.create({
          header: 'Alert',
          message: "Can't delete the Shiftline Schedule because it is included in a Bid Schedule.",
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {

              }
            }
          ]
        })
        await confirm.present();
      }
  }
  close(){
    this.modalCtrl.dismiss()
  }
  checkID(id,sl,scheduleShift){
    var tempArr=[]
    for(var i=0; i<=scheduleShift.length;i++)
    {
      if(scheduleShift[i] !=undefined){
      if(scheduleShift[i]?.shiftname  == sl || scheduleShift[i]?.shiftname  == (sl+'-A')){
       tempArr.push(Number(scheduleShift[i]?.seq_id))
      }
      }
    }
    tempArr=tempArr.sort((a,b)=>{return a -b})
    var newid=tempArr.indexOf(id)
    return newid
  }
  show(checkCondition){
        var selectScheduleData=this.shiftline_Schedule_data
        var ob,tempArr=[],tempAllShiftAlias=[]
        this.currentShiftlineScheduleShiftDuration=selectScheduleData.shiftdurationp
        for(var i=0;i<selectScheduleData.schild.length;i++){
          ob={
      "schedule_id":selectScheduleData.sh_schedule_id,
      "shiftdurationp":selectScheduleData.shiftdurationp,
      "shiftdurationc":selectScheduleData.schild[i].shiftdurationc,
            "areaid": selectScheduleData.areaid,
            "seq":this.checkID(selectScheduleData.schild[i].seq_id, selectScheduleData.schild[i].shiftname,selectScheduleData.schild),
            "Fri":selectScheduleData.schild[i].fri,
              "id":selectScheduleData.schild[i].sh_line_id,
              "Mon": selectScheduleData.schild[i].mon,
              "Sat": selectScheduleData.schild[i].sat,
              "schedulename": selectScheduleData.schedulename,
              "seq_id":selectScheduleData.schild[i].seq_id,
              "SL": selectScheduleData.schild[i].shiftname,
              "Sun": selectScheduleData.schild[i].sun,
              "Thu": selectScheduleData.schild[i].thu,
              "Tue": selectScheduleData.schild[i].tue,
              "Sunshift2": selectScheduleData.schild[i].sunshift2,
              "Wedshift2": selectScheduleData.schild[i].wedshift2,
              "Monshift2": selectScheduleData.schild[i].monshift2,
              "Frishift2":selectScheduleData.schild[i].frishift2,
              "Satshift2": selectScheduleData.schild[i].satshift2,
              "Thushift2": selectScheduleData.schild[i].thushift2,
              "Tueshift2": selectScheduleData.schild[i].tueshift2,
              "userid": selectScheduleData.userid,
              "Wed": selectScheduleData.schild[i].wed,
              "Pattern":selectScheduleData.schild[i].pattern
          }
          tempAllShiftAlias.push(ob.Sun,ob.Mon,ob.Tue,ob.Wed,ob.Thu,ob.Fri,ob.Sat)

          tempArr.push(ob)
        }

        var unique = tempAllShiftAlias.filter((v, i, a) => a.indexOf(v) === i);

    this.reqShift=[]

    for(var i=0;i<this.all_shift.length;i++){
      for(var j=0;j<unique.length;j++){
        if(String(this.all_shift[i].shiftName)===String(unique[j])){
          this.reqShift.push(this.all_shift[i])
        }
      }
    }
    this.arrangeShiftdefintionG=[]
    this.arrangeShiftdefintionL=[]
    for(var i=0;i<this.reqShift.length;i++){
        if(Number(this.reqShift[i].startTime)>2200){
    this.arrangeShiftdefintionG.push(this.reqShift[i])
        }else if(Number(this.reqShift[i].startTime)<=2200){
          this.arrangeShiftdefintionL.push(this.reqShift[i])
        }
      }
      this.arrangeShiftdefintionG.sort((a,b) => a.startTime.localeCompare(b.startTime));
      this.arrangeShiftdefintionL.sort((a,b) => a.startTime.localeCompare(b.startTime));
    var finalArr=[]
      for(var i=0;i<this.arrangeShiftdefintionG.length;i++){
        finalArr.push(this.arrangeShiftdefintionG[i])
      }
      for(var i=0;i<this.arrangeShiftdefintionL.length;i++){
        finalArr.push(this.arrangeShiftdefintionL[i])
      }

          localStorage.setItem('editCustomizedScheduleShiftLine',JSON.stringify(tempArr))
          localStorage.setItem('editDefaultScheduleShiftLine',JSON.stringify(tempArr))
          localStorage.setItem('allShiftRequiredDataForEditSchedule',JSON.stringify(finalArr))
          localStorage.setItem('focusShiftLine',JSON.stringify(''))
          if(checkCondition==true){
          this.modalCtrl.dismiss()
          if(this.user_data.role=='bidmanager'){
            this.navCtrl.navigateForward([straightlines_io_apis.apis.edit_schedule_api+'/'+this.shiftline_Schedule_data.sh_schedule_id+'/'+this.shiftline_Schedule_data.schedulename])
          }else{
            this.navCtrl.navigateForward([straightlines_io_apis.apis.guest_edit_schedule_api+'/'+this.shiftline_Schedule_data.sh_schedule_id+'/'+this.shiftline_Schedule_data.schedulename])
          }
        }

  }
  getShiftDefintion(scheduleName){

    this.scheduleService.getSaveShiftDefintionDataBasedOnScheduleName(scheduleName).subscribe((res)=>{

    },(err)=>{console.log(err)},()=>{})
  }

  getUserDefinedShift(){
    this.userDefinedShift=[]
    this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(
      (res)=>{
        this.allShift=res;


        for(var i=0;i<this.allShift.length;i++){
          if(Number(this.allShift[i].userid)==Number(this.user_data.id)){
            this.userDefinedShift.push(this.allShift[i])
          }
        }
        // return this.userDefinedShift
        var user_shift=this.userDefinedShift

          for(var i=0;i<this.default_work_load_data.length;i++){
            this.work_load_data.push(this.default_work_load_data[i])
          }

          var allShift=[]
          for(var i=0;i<this.work_load_data.length;i++){
            allShift.push({
              "id": this.work_load_data[i].id,
              "shiftCategory": this.work_load_data[i].shiftCategory,
              "shiftName": this.work_load_data[i].shiftName,
              "shift_duration":this.work_load_data[i].shift_duration,
              "startTime": this.work_load_data[i].startTime})
          }

          if(user_shift.length>0){
            for(var i=0;i<this.userDefinedShift.length;i++){
              this.convertTimetoString=Array.from(this.userDefinedShift[i].sh_starttime)
              var sh_startTime=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
              allShift.push({
                "id": this.userDefinedShift[i].sh_id,
                "shiftCategory": this.userDefinedShift[i].sh_category_id,
                "shiftName": this.userDefinedShift[i].sh_name,
                "shift_duration":this.userDefinedShift[i].sh_duration,
                "startTime": sh_startTime})
            }
          }

          this.all_shift=[]
          this.all_shift=allShift
      },
    (error: any)=>{this.errorMsg=error
    console.log(this.errorMsg)
    for(var i=0;i<this.default_work_load_data.length;i++){
      this.work_load_data.push(this.default_work_load_data[i])
    }
    var allShift=[]
    for(var i=0;i<this.work_load_data.length;i++){
      allShift.push({
        "id": this.work_load_data[i].id,
        "shiftCategory": this.work_load_data[i].shiftCategory,
        "shift_duration":this.userDefinedShift[i].shift_duration,
        "shiftName": this.work_load_data[i].shiftName,
        "startTime": this.work_load_data[i].startTime})
    }
    this.all_shift=allShift

},
    ()=>{
      this.show(false)
    }
    );

  }


  getAllBidSchedule(){

     this.bidSer.getAllBidSchedule(this.user_data.id).subscribe((res)=>{

      var temp
      temp=this.multiDimensionalUnique(res);
      this.bid_schedule=temp
      this.all_bid_schedule=this.bid_schedule
      var temp
     },(err)=>{
       console.log(err)
     },()=>{})
  }
  multiDimensionalUnique(arr) {


    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    var tempArr=[]
    this.allScheduleName=[]
    for(var i=0;i<uniques.length;i++){
      if(uniques[i].shiftdefmap.length>0){
    var dates=[],tempFinalArr=[]
    for(var j=0;j<uniques[i].shiftdefmap.length;j++){
    this.allScheduleName.push(uniques[i].shiftdefmap[j].shiftdefref)
    }
      }
    }
  }
  getSchedule(){
      var tempObj={}
      var tempArr=[]
      var all_shift_data=[]
      for(var i=0;i<this.allShiftData.length;i++){

    all_shift_data.push({
    "id": this.allShiftData[i].id,
    "shiftCategory": this.allShiftData[i].shiftCategory,
    "shiftName": this.allShiftData[i].shiftName,
    "startTime": this.allShiftData[i].startTime})
  }
  this.scheduleService.newgetAllSchedule(this.user_data.id).subscribe((res)=>{

  this.all_schedule=res
  if(this.all_schedule.length>0){
  this.all_schedule=  this.all_schedule.sort((a, b)=>{return b.sh_schedule_id - a.sh_schedule_id});
  }

  return this.all_schedule

  },(error)=>{
  console.log(error)
  },()=>{
  })
  }
  convertRDOtoShiftDefintion(rdo,shiftlength){
    if(String(rdo)=='X' || String(rdo)=='x'){
      return rdo
    }
    else{
      for(var i=0;i<this.allShiftDataWithIncludeExclude.length;i++){
        if(Number(shiftlength)==9){
          if(String(this.allShiftDataWithIncludeExclude[i].shiftName)==String(rdo.split('-')[0]) && Number(rdo.split('-')[1])==Number(this.allShiftDataWithIncludeExclude[i].shift_duration)){
            return String(this.allShiftDataWithIncludeExclude[i].startTime)
          }
        }else{
          if(String(this.allShiftDataWithIncludeExclude[i].shiftName)==String(rdo) && Number(shiftlength)==Number(this.allShiftDataWithIncludeExclude[i].shift_duration)){
            return String(this.allShiftDataWithIncludeExclude[i].startTime)
          }
        }
      }

    }
  }
  _nextId
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  _chars
  rowCount=0
  next() {
    const r = [];
    for (const char of this._nextId) {
      r.unshift(this._chars[char]);
    }
    this._increment();
    return r.join('');
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
  async Export(){
    this.loading = await this.loadingController.create({
      cssClass: 'custom-loading',
      spinner:'bubbles',
      message: 'Please Wait...',
      duration: 10000,

    });
    await this.loading.present();
    this.exportData=[]
    this.customizeShiftData=[]
         this.customizeScheduleShiftLines=[]
    this.allShiftDataWithIncludeExclude=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
    this.allShiftData=this.allShiftDataWithIncludeExclude
    this.scheduleShift=JSON.parse(localStorage.getItem('editCustomizedScheduleShiftLine'))

    this.defscheduleShift=JSON.parse(localStorage.getItem('editDefaultScheduleShiftLine'))

    this.schedule_length=this.scheduleShift.length
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
    this.allShiftName=[]
    this.allShiftName.push({"shiftName":'X',"shiftCategory":'X'})
    for(var i=0;i<this.allShiftData.length;i++){
      if(this.selected_shift_duration==this.allShiftData[i].shift_duration){
      this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shiftTime":this.allShiftData[i].startTime})
      }
    }
    var r = [],r1=[],r2=[],r3=[]
    this.allShiftData.forEach((e) =>  { if (e['shiftCategory'] === 1){r1.unshift(e);}else{r.push(e);}})
    r1=r1.sort((a,b) => Number(b.startTime) - Number(a.startTime));
    r=r.sort((a,b) => Number(a.startTime) - Number(b.startTime));
    this.allShiftData=r1.concat(r);

    this.allShiftData=this.allShiftData.sort((a,b) => Number(a.shift_duration) - Number(b.shift_duration));

    // this.shift=['M',6,7,1,3]

    if(this.schedule_id==undefined){
      this.schedule_id=0
    }



    this.totalCount=0;this.countNC=0
    this.countSunSat=0;this.countSunMon=0;this.countMonTue=0;this.countTueWed=0;this.countWedThu=0;this.countThuFri=0;this.countFriSat=0;
    this.countFSS=0;this.countSMS=0;this.countSMT=0;this.countMTW=0;this.countTWT=0;this.countWTF=0;this.countTFS=0;
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
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_sundAy.push({"shiftName":this.defscheduleShift[i].Sun.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_sundAy.push({"shiftName":this.defscheduleShift[i].Sun,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sun,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Sunshift2 !='X' && this.defscheduleShift[i].Sunshift2 !='x' && this.defscheduleShift[i].Sunshift2 !=null && this.defscheduleShift[i].Sunshift2 !='' && this.defscheduleShift[i].Sunshift2 !=undefined){
        this.def_sundAy.push({"shiftName":this.defscheduleShift[i].Sunshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sunshift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Sunshift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sunshift2,this.defscheduleShift[i].shiftdurationc)})
      }
      if(this.defscheduleShift[i].Mon!='X' && this.defscheduleShift[i].Mon!='x'){
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_mondAy.push({"shiftName":this.defscheduleShift[i].Mon.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_mondAy.push({"shiftName":this.defscheduleShift[i].Mon,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Mon,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Monshift2 !='X' && this.defscheduleShift[i].Monshift2 !='x' && this.defscheduleShift[i].Monshift2 !=null && this.defscheduleShift[i].Monshift2 !='' && this.defscheduleShift[i].Monshift2 !=undefined){
        this.def_mondAy.push({"shiftName":this.defscheduleShift[i].Monshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Monshift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Monshift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Monshift2,this.defscheduleShift[i].shiftdurationc)})
      }
      if(this.defscheduleShift[i].Tue!='X' && this.defscheduleShift[i].Tue!='x'){
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_tuedAy.push({"shiftName":this.defscheduleShift[i].Tue.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_tuedAy.push({"shiftName":this.defscheduleShift[i].Tue,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Tue,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Tueshift2 !='X' && this.defscheduleShift[i].Tueshift2 !='x' && this.defscheduleShift[i].Tueshift2 !=null && this.defscheduleShift[i].Tueshift2 !='' && this.defscheduleShift[i].Tueshift2 !=undefined){
        this.def_tuedAy.push({"shiftName":this.defscheduleShift[i].Tueshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Tueshift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Tueshift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Tueshift2,this.defscheduleShift[i].shiftdurationc)})
      }
      if(this.defscheduleShift[i].Wed!='X' && this.defscheduleShift[i].Wed!='x'){
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_weddAy.push({"shiftName":this.defscheduleShift[i].Wed.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_weddAy.push({"shiftName":this.defscheduleShift[i].Wed,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Wed,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Wedshift2 !='X' && this.defscheduleShift[i].Wedshift2 !='x' && this.defscheduleShift[i].Wedshift2 !=null && this.defscheduleShift[i].Wedshift2 !='' && this.defscheduleShift[i].Wedshift2 !=undefined){
        this.def_weddAy.push({"shiftName":this.defscheduleShift[i].Wedshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Wedshift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Wedshift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Wedshift2,this.defscheduleShift[i].shiftdurationc)})
      }
      if(this.defscheduleShift[i].Thu!='X' && this.defscheduleShift[i].Thu!='x'){
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_thudAy.push({"shiftName":this.defscheduleShift[i].Thu.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_thudAy.push({"shiftName":this.defscheduleShift[i].Thu,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Thu,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Thushift2 !='X' && this.defscheduleShift[i].Thushift2 !='x' && this.defscheduleShift[i].Thushift2 !=null && this.defscheduleShift[i].Thushift2 !='' && this.defscheduleShift[i].Thushift2 !=undefined){
        this.def_thudAy.push({"shiftName":this.defscheduleShift[i].Thushift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Thushift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Thushift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Thushift2,this.defscheduleShift[i].shiftdurationc)})
      }
      if(this.defscheduleShift[i].Fri!='X' && this.defscheduleShift[i].Fri!='x'){
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_fridAy.push({"shiftName":this.defscheduleShift[i].Fri.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_fridAy.push({"shiftName":this.defscheduleShift[i].Fri,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Fri,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Frishift2 !='X' && this.defscheduleShift[i].Frishift2 !='x' && this.defscheduleShift[i].Frishift2 !=null && this.defscheduleShift[i].Frishift2 !='' && this.defscheduleShift[i].Frishift2 !=undefined){
        this.def_fridAy.push({"shiftName":this.defscheduleShift[i].Frishift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Frishift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Frishift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Frishift2,this.defscheduleShift[i].shiftdurationc)})
      }
      if(this.defscheduleShift[i].Sat!='X' && this.defscheduleShift[i].Sat!='x'){
        if(Number(this.defscheduleShift[i].shiftdurationc)==9){
          this.def_satdAy.push({"shiftName":this.defscheduleShift[i].Sat.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc)})
        }else{
          this.def_satdAy.push({"shiftName":this.defscheduleShift[i].Sat,"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Sat,this.defscheduleShift[i].shiftdurationc)})
        }
      }
      if(this.defscheduleShift[i].Satshift2 !='X' && this.defscheduleShift[i].Satshift2 !='x' && this.defscheduleShift[i].Satshift2 !=null && this.defscheduleShift[i].Satshift2 !='' && this.defscheduleShift[i].Satshift2 !=undefined){
        this.def_satdAy.push({"shiftName":this.defscheduleShift[i].Satshift2.split('-')[0],"shiftDefintion":this.convertRDOtoShiftDefintion(this.defscheduleShift[i].Satshift2,this.defscheduleShift[i].shiftdurationc),"shift_duration":this.getShiftDuration(this.defscheduleShift[i].Satshift2,this.defscheduleShift[i].shiftdurationc),"shiftCategory":this.getShiftCategory(this.defscheduleShift[i].Satshift2,this.defscheduleShift[i].shiftdurationc)})
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
    this.SunDayGenerated.push(this.generatedEmpData.SUN_MID)
    this.SunDayGenerated.push(this.generatedEmpData.SUN_DAY)
    this.SunDayGenerated.push(this.generatedEmpData.SUN_EVE)
    this.SunDayGenerated.push(this.generatedEmpData.SUN_MID_DAY)
    this.SunDayGenerated.push(this.generatedEmpData.SUN_DAY_EVE)
    this.SunDayGenerated.push(this.generatedEmpData.SUN_EVE_MID)
    this.totalSunGenerated= this.SunDayGenerated[0] + + + this.SunDayGenerated[1] + + + this.SunDayGenerated[2]+ + +this.SunDayGenerated[3] + + + this.SunDayGenerated[4] + + + this.SunDayGenerated[5]
    this.MonDayGenerated=[]; this.MonDayRequired=[];
    this.MonDayGenerated.push(this.generatedEmpData.MON_MID)
    this.MonDayGenerated.push(this.generatedEmpData.MON_DAY)
    this.MonDayGenerated.push(this.generatedEmpData.MON_EVE)
    this.MonDayGenerated.push(this.generatedEmpData.MON_MID_DAY)
    this.MonDayGenerated.push(this.generatedEmpData.MON_DAY_EVE)
    this.MonDayGenerated.push(this.generatedEmpData.MON_EVE_MID)
    this.totalMonGenerated= this.MonDayGenerated[0] + + + this.MonDayGenerated[1] + + + this.MonDayGenerated[2]+ + +this.MonDayGenerated[3] + + + this.MonDayGenerated[4] + + + this.MonDayGenerated[5]

    this.TueDayGenerated=[]; this.TueDayRequired=[];
    this.TueDayGenerated.push(this.generatedEmpData.TUE_MID)
    this.TueDayGenerated.push(this.generatedEmpData.TUE_DAY)
    this.TueDayGenerated.push(this.generatedEmpData.TUE_EVE)
    this.TueDayGenerated.push(this.generatedEmpData.TUE_MID_DAY)
    this.TueDayGenerated.push(this.generatedEmpData.TUE_DAY_EVE)
    this.TueDayGenerated.push(this.generatedEmpData.TUE_EVE_MID)
    this.totalTueGenerated= this.TueDayGenerated[0] + + + this.TueDayGenerated[1] + + + this.TueDayGenerated[2]+ + +this.TueDayGenerated[3] + + + this.TueDayGenerated[4] + + + this.TueDayGenerated[5]

    this.WedDayGenerated=[]; this.WedDayRequired=[];
    this.WedDayGenerated.push(this.generatedEmpData.WED_MID)
    this.WedDayGenerated.push(this.generatedEmpData.WED_DAY)
    this.WedDayGenerated.push(this.generatedEmpData.WED_EVE)
    this.WedDayGenerated.push(this.generatedEmpData.WED_MID_DAY)
    this.WedDayGenerated.push(this.generatedEmpData.WED_DAY_EVE)
    this.WedDayGenerated.push(this.generatedEmpData.WED_EVE_MID)
    this.totalWedGenerated= this.WedDayGenerated[0] + + + this.WedDayGenerated[1] + + + this.WedDayGenerated[2]+ + +this.WedDayGenerated[3] + + + this.WedDayGenerated[4] + + + this.WedDayGenerated[5]

    this.ThuDayGenerated=[]; this.ThuDayRequired=[];
    this.ThuDayGenerated.push(this.generatedEmpData.THU_MID)
    this.ThuDayGenerated.push(this.generatedEmpData.THU_DAY)
    this.ThuDayGenerated.push(this.generatedEmpData.THU_EVE)
    this.ThuDayGenerated.push(this.generatedEmpData.THU_MID_DAY)
    this.ThuDayGenerated.push(this.generatedEmpData.THU_DAY_EVE)
    this.ThuDayGenerated.push(this.generatedEmpData.THU_EVE_MID)
    this.totalThuGenerated= this.ThuDayGenerated[0] + + + this.ThuDayGenerated[1] + + + this.ThuDayGenerated[2]+ + +this.ThuDayGenerated[3] + + + this.ThuDayGenerated[4] + + + this.ThuDayGenerated[5]

    this.FriDayGenerated=[]; this.FriDayRequired=[];
    this.FriDayGenerated.push(this.generatedEmpData.FRI_MID)
    this.FriDayGenerated.push(this.generatedEmpData.FRI_DAY)
    this.FriDayGenerated.push(this.generatedEmpData.FRI_EVE)
    this.FriDayGenerated.push(this.generatedEmpData.FRI_MID_DAY)
    this.FriDayGenerated.push(this.generatedEmpData.FRI_DAY_EVE)
    this.FriDayGenerated.push(this.generatedEmpData.FRI_EVE_MID)
    this.totalFriGenerated= this.FriDayGenerated[0] + + + this.FriDayGenerated[1] + + + this.FriDayGenerated[2]+ + +this.FriDayGenerated[3] + + + this.FriDayGenerated[4] + + + this.FriDayGenerated[5]

    this.SatDayGenerated=[]; this.SatDayRequired=[];
    this.SatDayGenerated.push(this.generatedEmpData.SAT_MID)
    this.SatDayGenerated.push(this.generatedEmpData.SAT_DAY)
    this.SatDayGenerated.push(this.generatedEmpData.SAT_EVE)
    this.SatDayGenerated.push(this.generatedEmpData.SAT_MID_DAY)
    this.SatDayGenerated.push(this.generatedEmpData.SAT_DAY_EVE)
    this.SatDayGenerated.push(this.generatedEmpData.SAT_EVE_MID)
    this.totalSatGenerated= this.SatDayGenerated[0] + + + this.SatDayGenerated[1] + + + this.SatDayGenerated[2]+ + +this.SatDayGenerated[3] + + + this.SatDayGenerated[4] + + + this.SatDayGenerated[5]

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
    this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_MID)
    this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_DAY)
    this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_EVE)
    this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_MID_DAY)
    this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_DAY_EVE)
    this.defaultSunDayGenerated.push(this.defGeneratedData.SUN_EVE_MID)
    this.defaultTotalSunGenerated= this.defaultSunDayGenerated[0] + + + this.defaultSunDayGenerated[1] + + + this.defaultSunDayGenerated[2]+ + +this.defaultSunDayGenerated[3] + + + this.defaultSunDayGenerated[4] + + + this.defaultSunDayGenerated[5]

    this.defaultMonDayRequired=[];this.defaultMonDayGenerated=[];
    this.defaultMonDayGenerated.push(this.defGeneratedData.MON_MID)
    this.defaultMonDayGenerated.push(this.defGeneratedData.MON_DAY)
    this.defaultMonDayGenerated.push(this.defGeneratedData.MON_EVE)
    this.defaultMonDayGenerated.push(this.defGeneratedData.MON_MID_DAY)
    this.defaultMonDayGenerated.push(this.defGeneratedData.MON_DAY_EVE)
    this.defaultMonDayGenerated.push(this.defGeneratedData.MON_EVE_MID)
    this.defaultTotalMonGenerated= this.defaultMonDayGenerated[0] + + + this.defaultMonDayGenerated[1] + + + this.defaultMonDayGenerated[2]+ + +this.defaultMonDayGenerated[3] + + + this.defaultMonDayGenerated[4] + + + this.defaultMonDayGenerated[5]

    this.defaultTueDayRequired=[];this.defaultTueDayGenerated=[];
    this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_MID)
    this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_DAY)
    this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_EVE)
    this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_MID_DAY)
    this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_DAY_EVE)
    this.defaultTueDayGenerated.push(this.defGeneratedData.TUE_EVE_MID)
    this.defaultTotalTueGenerated= this.defaultTueDayGenerated[0] + + + this.defaultTueDayGenerated[1] + + + this.defaultTueDayGenerated[2]+ + +this.defaultTueDayGenerated[3] + + + this.defaultTueDayGenerated[4] + + + this.defaultTueDayGenerated[5]

    this.defaultWedDayRequired=[];this.defaultWedDayGenerated=[];
    this.defaultWedDayGenerated.push(this.defGeneratedData.WED_MID)
    this.defaultWedDayGenerated.push(this.defGeneratedData.WED_DAY)
    this.defaultWedDayGenerated.push(this.defGeneratedData.WED_EVE)
    this.defaultWedDayGenerated.push(this.defGeneratedData.WED_MID_DAY)
    this.defaultWedDayGenerated.push(this.defGeneratedData.WED_DAY_EVE)
    this.defaultWedDayGenerated.push(this.defGeneratedData.WED_EVE_MID)
    this.defaultTotalWedGenerated= this.defaultWedDayGenerated[0] + + + this.defaultWedDayGenerated[1] + + + this.defaultWedDayGenerated[2]+ + +this.defaultWedDayGenerated[3] + + + this.defaultWedDayGenerated[4] + + + this.defaultWedDayGenerated[5]

    this.defaultThuDayRequired=[];this.defaultThuDayGenerated=[];
    this.defaultThuDayGenerated.push(this.defGeneratedData.THU_MID)
    this.defaultThuDayGenerated.push(this.defGeneratedData.THU_DAY)
    this.defaultThuDayGenerated.push(this.defGeneratedData.THU_EVE)
    this.defaultThuDayGenerated.push(this.defGeneratedData.THU_MID_DAY)
    this.defaultThuDayGenerated.push(this.defGeneratedData.THU_DAY_EVE)
    this.defaultThuDayGenerated.push(this.defGeneratedData.THU_EVE_MID)
    this.defaultTotalThuGenerated= this.defaultThuDayGenerated[0] + + + this.defaultThuDayGenerated[1] + + + this.defaultThuDayGenerated[2]+ + +this.defaultThuDayGenerated[3] + + + this.defaultThuDayGenerated[4] + + + this.defaultThuDayGenerated[5]

    this.defaultFriDayRequired=[];this.defaultFriDayGenerated=[];
    this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_MID)
    this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_DAY)
    this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_EVE)
    this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_MID_DAY)
    this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_DAY_EVE)
    this.defaultFriDayGenerated.push(this.defGeneratedData.FRI_EVE_MID)
    this.defaultTotalFriGenerated= this.defaultFriDayGenerated[0] + + + this.defaultFriDayGenerated[1] + + + this.defaultFriDayGenerated[2]+ + +this.defaultFriDayGenerated[3] + + + this.defaultFriDayGenerated[4] + + + this.defaultFriDayGenerated[5]

    this.defaultSatDayRequired=[];this.defaultSatDayGenerated=[];
    this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_MID)
    this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_DAY)
    this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_EVE)
    this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_MID_DAY)
    this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_DAY_EVE)
    this.defaultSatDayGenerated.push(this.defGeneratedData.SAT_EVE_MID)
    this.defaultTotalSatGenerated= this.defaultSatDayGenerated[0] + + + this.defaultSatDayGenerated[1] + + + this.defaultSatDayGenerated[2]+ + +this.defaultSatDayGenerated[3] + + + this.defaultSatDayGenerated[4] + + + this.defaultSatDayGenerated[5]
    //sun

    this.diffSunMid=this.SunDayGenerated[0]+ - +this.defaultSunDayGenerated[0]
    this.diffSunDay=this.SunDayGenerated[1]+ - +this.defaultSunDayGenerated[1]
    this.diffSunEve=this.SunDayGenerated[2]+ - +this.defaultSunDayGenerated[2]
    this.diffSunMidDay=this.SunDayGenerated[3]+ - +this.defaultSunDayGenerated[3]
    this.diffSunDayEve=this.SunDayGenerated[4]+ - +this.defaultSunDayGenerated[4]
    this.diffSunEveMid=this.SunDayGenerated[5]+ - +this.defaultSunDayGenerated[5]
    this.totalSundiff=this.totalSunGenerated+ - + this.defaultTotalSunGenerated
    //mon
    this.diffMonMid=this.MonDayGenerated[0]+ - +this.defaultMonDayGenerated[0]
    this.diffMonDay=this.MonDayGenerated[1]+ - +this.defaultMonDayGenerated[1]
    this.diffMonEve=this.MonDayGenerated[2]+ - +this.defaultMonDayGenerated[2]
    this.diffMonMidDay=this.MonDayGenerated[3]+ - +this.defaultMonDayGenerated[3]
    this.diffMonDayEve=this.MonDayGenerated[4]+ - +this.defaultMonDayGenerated[4]
    this.diffMonEveMid=this.MonDayGenerated[5]+ - +this.defaultMonDayGenerated[5]
    this.totalMondiff=this.totalMonGenerated+ - + this.defaultTotalMonGenerated
    //tue
    this.diffTueMid=this.TueDayGenerated[0]+ - +this.defaultTueDayGenerated[0]
    this.diffTueDay=this.TueDayGenerated[1]+ - +this.defaultTueDayGenerated[1]
    this.diffTueEve=this.TueDayGenerated[2]+ - +this.defaultTueDayGenerated[2]
    this.diffTueMidDay=this.TueDayGenerated[3]+ - +this.defaultTueDayGenerated[3]
    this.diffTueDayEve=this.TueDayGenerated[4]+ - +this.defaultTueDayGenerated[4]
    this.diffTueEveMid=this.TueDayGenerated[5]+ - +this.defaultTueDayGenerated[5]
    this.totalTuediff=this.totalTueGenerated+ - + this.defaultTotalTueGenerated
    //wed
    this.diffWedMid=this.WedDayGenerated[0]+ - +this.defaultWedDayGenerated[0]
    this.diffWedDay=this.WedDayGenerated[1]+ - +this.defaultWedDayGenerated[1]
    this.diffWedEve=this.WedDayGenerated[2]+ - +this.defaultWedDayGenerated[2]
    this.diffWedMidDay=this.WedDayGenerated[3]+ - +this.defaultWedDayGenerated[3]
    this.diffWedDayEve=this.WedDayGenerated[4]+ - +this.defaultWedDayGenerated[4]
    this.diffWedEveMid=this.WedDayGenerated[5]+ - +this.defaultWedDayGenerated[5]
    this.totalWeddiff=this.totalWedGenerated+ - + this.defaultTotalWedGenerated
    //thu
    this.diffThuMid=this.ThuDayGenerated[0]+ - +this.defaultThuDayGenerated[0]
    this.diffThuDay=this.ThuDayGenerated[1]+ - +this.defaultThuDayGenerated[1]
    this.diffThuEve=this.ThuDayGenerated[2]+ - +this.defaultThuDayGenerated[2]
    this.diffThuMidDay=this.ThuDayGenerated[3]+ - +this.defaultThuDayGenerated[3]
    this.diffThuDayEve=this.ThuDayGenerated[4]+ - +this.defaultThuDayGenerated[4]
    this.diffThuEveMid=this.ThuDayGenerated[5]+ - +this.defaultThuDayGenerated[5]
    this.totalThudiff=this.totalThuGenerated+ - + this.defaultTotalThuGenerated
    //fri
    this.diffFriMid=this.FriDayGenerated[0]+ - +this.defaultFriDayGenerated[0]
    this.diffFriDay=this.FriDayGenerated[1]+ - +this.defaultFriDayGenerated[1]
    this.diffFriEve=this.FriDayGenerated[2]+ - +this.defaultFriDayGenerated[2]
    this.diffFriMidDay=this.FriDayGenerated[3]+ - +this.defaultFriDayGenerated[3]
    this.diffFriDayEve=this.FriDayGenerated[4]+ - +this.defaultFriDayGenerated[4]
    this.diffFriEveMid=this.FriDayGenerated[5]+ - +this.defaultFriDayGenerated[5]
    this.totalFridiff=this.totalFriGenerated+ - + this.defaultTotalFriGenerated
    //sat
    this.diffSatMid=this.SatDayGenerated[0]+ - +this.defaultSatDayGenerated[0]
    this.diffSatDay=this.SatDayGenerated[1]+ - +this.defaultSatDayGenerated[1]
    this.diffSatEve=this.SatDayGenerated[2]+ - +this.defaultSatDayGenerated[2]
    this.diffSatMidDay=this.SatDayGenerated[3]+ - +this.defaultSatDayGenerated[3]
    this.diffSatDayEve=this.SatDayGenerated[4]+ - +this.defaultSatDayGenerated[4]
    this.diffSatEveMid=this.SatDayGenerated[5]+ - +this.defaultSatDayGenerated[5]
    this.totalSatdiff=this.totalSatGenerated+ - + this.defaultTotalSatGenerated

    // this.reqData=[]
    // for(var i=0;i<this.allShiftData.length;i++){
    //   this.req_shift_1_data={"shiftTime":this.allShiftData[i].startTime,"sun":this.allShiftData[i].Sun,"mon":this.allShiftData[i].Mon,"tue":this.allShiftData[i].Tue,"wed":this.allShiftData[i].Wed,"thu":this.allShiftData[i].Thu,"fri":this.allShiftData[i].Fri,"sat":this.allShiftData[i].Sat}
    //   this.reqData.push(this.req_shift_1_data)
    // }

    this.reqvsgenDataShiftTime=[];this.reqvsgenDataSun=[];this.reqvsgenDataMon=[];this.reqvsgenDataTue=[];this.reqvsgenDataWed=[];this.reqvsgenDataThu=[];this.reqvsgenDataFri=[];this.reqvsgenDataSat=[];

    this.reqvsgenDataShiftTime.push({"shift_start":"Shifts","shift_length":"Duration","shift_name":"Shift Name"})
    this.reqvsgenDataSun.push({"shiftTime":"","Sun":"Sun"})
    this.reqvsgenDataMon.push({"shiftTime":"","Mon":"Mon"})
    this.reqvsgenDataTue.push({"shiftTime":"","Tue":"Tue"})
    this.reqvsgenDataWed.push({"shiftTime":"","Wed":"Wed"})
    this.reqvsgenDataThu.push({"shiftTime":"","Thu":"Thu"})
    this.reqvsgenDataFri.push({"shiftTime":"","Fri":"Fri"})
    this.reqvsgenDataSat.push({"shiftTime":"","Sat":"Sat"})

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
              if(this.allShiftData[i].startTime===countsCustomizedSunDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedSunDay[j].shift_duration)){
                this.reqvsgenDataSun.push( {"shiftTime":String(this.allShiftData[i].startTime),"Sun":Number(countsCustomizedSunDay[j].totalEmp),"shiftCategory":Number(countsCustomizedSunDay[j].shiftCategory),"shift_duration":Number(countsCustomizedSunDay[j].shift_duration)})
              }
            }
            for(var j=0;j<countsCustomizedMonDay.length;j++){
              if(this.allShiftData[i].startTime===countsCustomizedMonDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedMonDay[j].shift_duration)){
                this.reqvsgenDataMon.push( {"shiftTime":String(this.allShiftData[i].startTime),"Mon":Number(countsCustomizedMonDay[j].totalEmp),"shiftCategory":Number(countsCustomizedMonDay[j].shiftCategory),"shift_duration":Number(countsCustomizedMonDay[j].shift_duration)})
              }
            }
            for(var j=0;j<countsCustomizedTueDay.length;j++){
              if(this.allShiftData[i].startTime===countsCustomizedTueDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedTueDay[j].shift_duration)){
                this.reqvsgenDataTue.push( {"shiftTime":String(this.allShiftData[i].startTime),"Tue":Number(countsCustomizedTueDay[j].totalEmp),"shiftCategory":Number(countsCustomizedTueDay[j].shiftCategory),"shift_duration":Number(countsCustomizedTueDay[j].shift_duration)})
              }
            }
            for(var j=0;j<countsCustomizedWedDay.length;j++){
              if(this.allShiftData[i].startTime===countsCustomizedWedDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedWedDay[j].shift_duration)){
                this.reqvsgenDataWed.push( {"shiftTime":String(this.allShiftData[i].startTime),"Wed":Number(countsCustomizedWedDay[j].totalEmp),"shiftCategory":Number(countsCustomizedWedDay[j].shiftCategory),"shift_duration":Number(countsCustomizedWedDay[j].shift_duration)})
              }
            }
            for(var j=0;j<countsCustomizedThuDay.length;j++){
              if(this.allShiftData[i].startTime===countsCustomizedThuDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedThuDay[j].shift_duration)){
                this.reqvsgenDataThu.push({"shiftTime":String(this.allShiftData[i].startTime),"Thu":Number(countsCustomizedThuDay[j].totalEmp),"shiftCategory":Number(countsCustomizedThuDay[j].shiftCategory),"shift_duration":Number(countsCustomizedThuDay[j].shift_duration)})
              }
            }
            for(var j=0;j<countsCustomizedFriDay.length;j++){
              if(this.allShiftData[i].startTime===countsCustomizedFriDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedFriDay[j].shift_duration)){
                this.reqvsgenDataFri.push( {"shiftTime":String(this.allShiftData[i].startTime),"Fri":Number(countsCustomizedFriDay[j].totalEmp),"shiftCategory":Number(countsCustomizedFriDay[j].shiftCategory),"shift_duration":Number(countsCustomizedFriDay[j].shift_duration)})
              }
            }
            for(var j=0;j<countsCustomizedSatDay.length;j++){
              if(this.allShiftData[i].startTime===countsCustomizedSatDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedSatDay[j].shift_duration)){
                this.reqvsgenDataSat.push({"shiftTime":String(this.allShiftData[i].startTime),"Sat":Number(countsCustomizedSatDay[j].totalEmp),"shiftCategory":Number(countsCustomizedSatDay[j].shiftCategory),"shift_duration":Number(countsCustomizedSatDay[j].shift_duration)})
              }
            }

          }
    this.reqvsgenDefDataShiftTime=[];this.reqvsgenDefDataSun=[];this.reqvsgenDefDataMon=[];this.reqvsgenDefDataTue=[];this.reqvsgenDefDataWed=[];this.reqvsgenDefDataThu=[];this.reqvsgenDefDataFri=[];this.reqvsgenDefDataSat=[];
    this.reqvsgenDefDataShiftTime.push({"shift_start":"Shifts","shift_length":"Duration","shift_name":"Shift Name"})
    this.reqvsgenDefDataSun.push({"shiftTime":"","Sun":"Sun"})
    this.reqvsgenDefDataMon.push({"shiftTime":"","Mon":"Mon"})
    this.reqvsgenDefDataTue.push({"shiftTime":"","Tue":"Tue"})
    this.reqvsgenDefDataWed.push({"shiftTime":"","Wed":"Wed"})
    this.reqvsgenDefDataThu.push({"shiftTime":"","Thu":"Thu"})
    this.reqvsgenDefDataFri.push({"shiftTime":"","Fri":"Fri"})
    this.reqvsgenDefDataSat.push({"shiftTime":"","Sat":"Sat"})
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
        if(this.allShiftData[i].startTime===countsCustomizedDefSunDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefSunDay[j].shift_duration)){
          this.reqvsgenDefDataSun.push( {"shiftTime":String(this.allShiftData[i].startTime),"Sun":Number(countsCustomizedDefSunDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefSunDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefSunDay[j].shift_duration)})
        }
      }
      for(var j=0;j<countsCustomizedDefMonDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefMonDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefMonDay[j].shift_duration)){
          this.reqvsgenDefDataMon.push({"shiftTime":String(this.allShiftData[i].startTime),"Mon":Number(countsCustomizedDefMonDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefMonDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefMonDay[j].shift_duration)})
        }
      }
      for(var j=0;j<countsCustomizedDefTueDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefTueDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefTueDay[j].shift_duration)){
          this.reqvsgenDefDataTue.push({"shiftTime":String(this.allShiftData[i].startTime),"Tue":Number(countsCustomizedDefTueDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefTueDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefTueDay[j].shift_duration)})
        }
      }
      for(var j=0;j<countsCustomizedDefWedDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefWedDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefWedDay[j].shift_duration)){
          this.reqvsgenDefDataWed.push({"shiftTime":String(this.allShiftData[i].startTime),"Wed":Number(countsCustomizedDefWedDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefWedDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefWedDay[j].shift_duration)})
        }
      }
      for(var j=0;j<countsCustomizedDefThuDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefThuDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefThuDay[j].shift_duration)){
          this.reqvsgenDefDataThu.push( {"shiftTime":String(this.allShiftData[i].startTime),"Thu":Number(countsCustomizedDefThuDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefThuDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefThuDay[j].shift_duration)})
        }
      }
      for(var j=0;j<countsCustomizedDefFriDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefFriDay[j].shiftDefintion&& Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefFriDay[j].shift_duration)){
          this.reqvsgenDefDataFri.push({"shiftTime":String(this.allShiftData[i].startTime),"Fri":Number(countsCustomizedDefFriDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefFriDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefFriDay[j].shift_duration)})
        }
      }
      for(var j=0;j<countsCustomizedDefSatDay.length;j++){
        if(this.allShiftData[i].startTime===countsCustomizedDefSatDay[j].shiftDefintion && Number(this.allShiftData[i].shift_duration)===Number(countsCustomizedDefSatDay[j].shift_duration)){
          this.reqvsgenDefDataSat.push({"shiftTime":String(this.allShiftData[i].startTime),"Sat":Number(countsCustomizedDefSatDay[j].totalEmp),"shiftCategory":Number(countsCustomizedDefSatDay[j].shiftCategory),"shift_duration":Number(countsCustomizedDefSatDay[j].shift_duration)})
        }
      }

    }
    this.mid_Summary=[];this.day_Summary=[];this.eve_Summary=[];this.mid_day_summary=[];this.day_eve_summary=[];this.eve_mid_summary=[]
    this.def_mid_Summary=[];this.def_day_Summary=[];this.def_eve_Summary=[]
    var tempNewObj
    this.final_eve_Summary=[];this.final_day_Summary=[];this.final_mid_Summary=[]
    for(var i=0;i<this.reqvsgenDataSun.length;i++){
      for(var j=0;j<this.reqvsgenDefDataSun.length;j++){
        if(this.reqvsgenDataSun[i].shiftTime!='' && this.reqvsgenDefDataSun[j].shiftTime!=''){
          if(this.reqvsgenDataSun[i].shiftTime===this.reqvsgenDefDataSun[j].shiftTime && this.reqvsgenDataSun[i].shiftCategory ===this.reqvsgenDefDataSun[j].shiftCategory && this.reqvsgenDataSun[i].shift_duration===this.reqvsgenDefDataSun[j].shift_duration){
            tempNewObj={
              "shiftTime":this.reqvsgenDataSun[i].shiftTime,"shiftCategory":Number(this.reqvsgenDataSun[i].shiftCategory),"shift_duration":Number(this.reqvsgenDataSun[i].shift_duration),
              "defSun":this.reqvsgenDefDataSun[j].Sun,"Sun":this.reqvsgenDataSun[i].Sun,"diffSun":Number(this.reqvsgenDataSun[i].Sun)+ - +Number(this.reqvsgenDefDataSun[j].Sun),
              "defMon":this.reqvsgenDefDataMon[j].Mon,"Mon":this.reqvsgenDataMon[i].Mon,"diffMon":Number(this.reqvsgenDataMon[i].Mon)+ - +Number(this.reqvsgenDefDataMon[j].Mon),
              "defTue":this.reqvsgenDefDataTue[j].Tue,"Tue":this.reqvsgenDataTue[i].Tue,"diffTue":Number(this.reqvsgenDataTue[i].Tue)+ - +Number(this.reqvsgenDefDataTue[j].Tue),
              "defWed":this.reqvsgenDefDataWed[j].Wed,"Wed":this.reqvsgenDataWed[i].Wed,"diffWed":Number(this.reqvsgenDataWed[i].Wed)+ - +Number(this.reqvsgenDefDataWed[j].Wed),
              "defThu":this.reqvsgenDefDataThu[j].Thu,"Thu":this.reqvsgenDataThu[i].Thu,"diffThu":Number(this.reqvsgenDataThu[i].Thu)+ - +Number(this.reqvsgenDefDataThu[j].Thu),
              "defFri":this.reqvsgenDefDataFri[j].Fri,"Fri":this.reqvsgenDataFri[i].Fri,"diffFri":Number(this.reqvsgenDataFri[i].Fri)+ - +Number(this.reqvsgenDefDataFri[j].Fri),
              "defSat":this.reqvsgenDefDataSat[j].Sat,"Sat":this.reqvsgenDataSat[i].Sat,"diffSat":Number(this.reqvsgenDataSat[i].Sat)+ - +Number(this.reqvsgenDefDataSat[j].Sat)
            }
            if(this.reqvsgenDataSun[i].shiftCategory==3 && this.reqvsgenDefDataSun[j].shiftCategory==3){
              this.final_day_Summary.push(tempNewObj)
            }else if(this.reqvsgenDataSun[i].shiftCategory==2 && this.reqvsgenDefDataSun[j].shiftCategory==2){
              this.final_eve_Summary.push(tempNewObj)
            }else if(this.reqvsgenDataSun[i].shiftCategory==1 && this.reqvsgenDefDataSun[j].shiftCategory==1){
              this.final_mid_Summary.push(tempNewObj)
            }else if(this.reqvsgenDataSun[i].shiftCategory==6 && this.reqvsgenDefDataSun[j].shiftCategory==6){
              this.eve_mid_summary.push(tempNewObj)
            }else if(this.reqvsgenDataSun[i].shiftCategory==5 && this.reqvsgenDefDataSun[j].shiftCategory==5){
              this.day_eve_summary.push(tempNewObj)
            }else if(this.reqvsgenDataSun[i].shiftCategory==4 && this.reqvsgenDefDataSun[j].shiftCategory==4){
              this.mid_day_summary.push(tempNewObj)
            }
          }
        }
      }
    }
          this.ReqVsGeneData=[]
          this.defReqVsGeneData=[]
          this.ReqVsGeneData.push(["","Sun","Mon","Tue","Wed","Thu","Fri","Sat"])
          this.ReqVsGeneData.push(["MID",this.generatedEmpData.SUN_MID,this.generatedEmpData.MON_MID,this.generatedEmpData.TUE_MID,this.generatedEmpData.WED_MID,this.generatedEmpData.THU_MID,this.generatedEmpData.FRI_MID,this.generatedEmpData.SAT_MID])
          this.ReqVsGeneData.push(["DAY",this.generatedEmpData.SUN_DAY,this.generatedEmpData.MON_DAY,this.generatedEmpData.TUE_DAY,this.generatedEmpData.WED_DAY,this.generatedEmpData.THU_DAY,this.generatedEmpData.FRI_DAY,this.generatedEmpData.SAT_DAY])
          this.ReqVsGeneData.push(["EVE",this.generatedEmpData.SUN_EVE,this.generatedEmpData.MON_EVE,this.generatedEmpData.TUE_EVE,this.generatedEmpData.WED_EVE,this.generatedEmpData.THU_EVE,this.generatedEmpData.FRI_EVE,this.generatedEmpData.SAT_EVE])
          this.ReqVsGeneData.push(["MID-DAY",this.generatedEmpData.SUN_MID_DAY,this.generatedEmpData.MON_MID_DAY,this.generatedEmpData.TUE_MID_DAY,this.generatedEmpData.WED_MID_DAY,this.generatedEmpData.THU_MID_DAY,this.generatedEmpData.FRI_MID_DAY,this.generatedEmpData.SAT_MID_DAY])
          this.ReqVsGeneData.push(["DAY-EVE",this.generatedEmpData.SUN_DAY_EVE,this.generatedEmpData.MON_DAY_EVE,this.generatedEmpData.TUE_DAY_EVE,this.generatedEmpData.WED_DAY_EVE,this.generatedEmpData.THU_DAY_EVE,this.generatedEmpData.FRI_DAY_EVE,this.generatedEmpData.SAT_DAY_EVE])
          this.ReqVsGeneData.push(["EVE-MID",this.generatedEmpData.SUN_EVE_MID,this.generatedEmpData.MON_EVE_MID,this.generatedEmpData.TUE_EVE_MID,this.generatedEmpData.WED_EVE_MID,this.generatedEmpData.THU_EVE_MID,this.generatedEmpData.FRI_EVE_MID,this.generatedEmpData.SAT_EVE_MID])
          this.ReqVsGeneData.push(["", this.totalSunGenerated, this.totalMonGenerated, this.totalTueGenerated, this.totalWedGenerated,this.totalThuGenerated, this.totalFriGenerated, this.totalSatGenerated])
          this.defReqVsGeneData.push(["","Sun","Mon","Tue","Wed","Thu","Fri","Sat"])
    this.defReqVsGeneData.push(["MID",this.defGeneratedData.SUN_MID,this.defGeneratedData.MON_MID,this.defGeneratedData.TUE_MID,this.defGeneratedData.WED_MID,this.defGeneratedData.THU_MID,this.defGeneratedData.FRI_MID,this.defGeneratedData.SAT_MID])
    this.defReqVsGeneData.push(["DAY",this.defGeneratedData.SUN_DAY,this.defGeneratedData.MON_DAY,this.defGeneratedData.TUE_DAY,this.defGeneratedData.WED_DAY,this.defGeneratedData.THU_DAY,this.defGeneratedData.FRI_DAY,this.defGeneratedData.SAT_DAY])
    this.defReqVsGeneData.push(["EVE",this.defGeneratedData.SUN_EVE,this.defGeneratedData.MON_EVE,this.defGeneratedData.TUE_EVE,this.defGeneratedData.WED_EVE,this.defGeneratedData.THU_EVE,this.defGeneratedData.FRI_EVE,this.defGeneratedData.SAT_EVE])
    this.defReqVsGeneData.push(["MID-DAY",this.defGeneratedData.SUN_MID_DAY,this.defGeneratedData.MON_MID_DAY,this.defGeneratedData.TUE_MID_DAY,this.defGeneratedData.WED_MID_DAY,this.defGeneratedData.THU_MID_DAY,this.defGeneratedData.FRI_MID_DAY,this.defGeneratedData.SAT_MID_DAY])
    this.defReqVsGeneData.push(["DAY-EVE",this.defGeneratedData.SUN_DAY_EVE,this.defGeneratedData.MON_DAY_EVE,this.defGeneratedData.TUE_DAY_EVE,this.defGeneratedData.WED_DAY_EVE,this.defGeneratedData.THU_DAY_EVE,this.defGeneratedData.FRI_DAY_EVE,this.defGeneratedData.SAT_DAY_EVE])
    this.defReqVsGeneData.push(["EVE-MID",this.defGeneratedData.SUN_EVE_MID,this.defGeneratedData.MON_EVE_MID,this.defGeneratedData.TUE_EVE_MID,this.defGeneratedData.WED_EVE_MID,this.defGeneratedData.THU_EVE_MID,this.defGeneratedData.FRI_EVE_MID,this.defGeneratedData.SAT_EVE_MID])
    this.defReqVsGeneData.push(["",this.defaultTotalSunGenerated,this.defaultTotalMonGenerated,this.defaultTotalTueGenerated,this.defaultTotalWedGenerated,this.defaultTotalThuGenerated, this.defaultTotalFriGenerated, this.defaultTotalSatGenerated])



    this.export()
      }


      loading
      async export() {

            const workbook = new Workbook();
        //Customized Schedule

        const header = ['Id','Shiftline Name','Duration', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat','Pattern'];
        var temp
        var tempMonth
        var allData=[]
        const worksheet = workbook.addWorksheet('Customized Schedule');
        this.rowCount=1
                this._chars = this.chars;
                this._nextId = [0];
                temp=this.next()
                const compST=worksheet.getCell(temp+this.rowCount);
                compST.value="Shiftline Schedule "
                compST.alignment={ vertical: 'middle',horizontal: 'center'   }
                compST.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                compST.border = {right: {style:'thin'},top: {style:'thin'},bottom: {style:'thin'},left: {style:'thin'},}
                compST.font = {bold: true,  size: 22};

                var end
                for(var i=1;i<header.length;i++){
                  end=this.next()
                }
                this.rowCount=this.rowCount+ + +2
                worksheet.mergeCells(temp+1+':'+end+this.rowCount);
                this.rowCount++


                var currentrowCount= this.rowCount
                this._chars = this.chars;
                this._nextId = [0];
                temp=this.next()
                const compSTName=worksheet.getCell(temp+this.rowCount);
                compSTName.value=this.shiftline_schedule_name
                compSTName.alignment={ vertical: 'middle',horizontal: 'center'   }
                compSTName.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                compSTName.border = {right: {style:'thin'},bottom: {style:'thin'},left: {style:'thin'},}
                compSTName.font = {  size: 20};

                var end
                for(var i=1;i<header.length;i++){
                  end=this.next()
                }
                this.rowCount=this.rowCount+ + +2
                worksheet.mergeCells(temp+currentrowCount+':'+end+this.rowCount);
                this.rowCount++

                this._chars = this.chars;
                this._nextId = [0];
                  for(var i=0;i<header.length;i++){
                    temp=this.next()
                    const compT=worksheet.getCell(temp+this.rowCount);
                    compT.value=header[i]
                    compT.alignment={ vertical: 'middle',horizontal: 'center'   }
                    compT.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                    compT.font = {bold: true};

                    compT.border = {top: {style:'thin'},};
                    if(i==(header.length+ - +1)){
                      compT.border = {right: {style:'thin'},};
                    }
                  }
                this._chars = this.chars;
                this._nextId = [0];
                var tempValue

                for(var i=0;i<this.scheduleShift.length;i++){
                  if(i>0){

                    if(this.scheduleShift[i-1].shiftname!==this.scheduleShift[i].shiftname){
                      this.rowCount++
                    }
                  }
                  this.rowCount++
                  this._chars = this.chars;
                  this._nextId = [0];


              if(Number(this.scheduleShift[i].shiftdurationc)==9){

                allData=[Number(this.scheduleShift[i].seq_id)+ + +1,this.scheduleShift[i].SL+(Number(this.scheduleShift[i].seq)+ + +1),Number(this.scheduleShift[i].shiftdurationc),this.scheduleShift[i].Sun,this.scheduleShift[i].Mon,this.scheduleShift[i].Tue,this.scheduleShift[i].Wed,this.scheduleShift[i].Thu,this.scheduleShift[i].Fri,this.scheduleShift[i].Sat,this.scheduleShift[i].Sunshift2,this.scheduleShift[i].Monshift2,this.scheduleShift[i].Tueshift2,this.scheduleShift[i].Wedshift2,this.scheduleShift[i].Thushift2,this.scheduleShift[i].Frishift2,this.scheduleShift[i].Satshift2,this.scheduleShift[i].Pattern]
              }else{
                allData=[Number(this.scheduleShift[i].seq_id)+ + +1,this.scheduleShift[i].SL+(Number(this.scheduleShift[i].seq)+ + +1),Number(this.scheduleShift[i].shiftdurationc),this.scheduleShift[i].Sun,this.scheduleShift[i].Mon,this.scheduleShift[i].Tue,this.scheduleShift[i].Wed,this.scheduleShift[i].Thu,this.scheduleShift[i].Fri,this.scheduleShift[i].Sat,this.scheduleShift[i].Pattern]
              }
                for(var j=0;j<allData.length;j++){

                  if(Number(this.scheduleShift[i].shiftdurationc)==9){
                    if(j==10){
                      this._chars = this.chars;
                      this._nextId = [3];
                      this.rowCount++
                    }
                  }
                  temp=this.next()
                  const compData=worksheet.getCell(temp+this.rowCount);
                  if(Number(this.scheduleShift[i].shiftdurationc)==9){
                    if(j==0 || j==1 || j==2){
                      worksheet.mergeCells(temp+this.rowCount+':'+temp+(this.rowCount+ + +1));
                      }
                      if((j+ + +1)==allData.length){
                        worksheet.mergeCells(temp+this.rowCount+':'+temp+(this.rowCount+ - +1));
                      }
                  }
                      if(j!=0 && j!=1 && j!=2){
                        if( allData.length!=(j+ + +1)){
                          tempValue=String(this.convertRDOtoShiftDefintion(allData[j],this.scheduleShift[i].shiftdurationc))
                        }else{
                          tempValue=String(allData[j])
                        }

                      }else{
                        tempValue=String(allData[j])
                      }

                      if(tempValue=='X' || tempValue=='x'){
                        // compData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'adadad'}};
                      }
                      if(this.scheduleShift[i].BMLRule==true){
                        compData.font={color: {argb: "37F40B"}};
                      }
                      if(this.scheduleShift[i].BMLRule==false){
                        compData.font={color: {argb: "FF0000"}};
                      }
                      if(j==1){
                        const idCol = worksheet.getColumn(temp);
                        idCol.width = 15;
                        if(this.scheduleShift[i].SL=='SS' ||this.scheduleShift[i].SL=='SS-A' || this.scheduleShift[i]?.SL  == 'FSS' || this.scheduleShift[i]?.SL  == 'FSS-A'){
                          compData.font={color: {argb: "1EC29D"},bold: true};
                        }else if(this.scheduleShift[i].SL=='SM' ||this.scheduleShift[i].SL=='SM-A' || this.scheduleShift[i]?.SL  == 'SMS' || this.scheduleShift[i]?.SL  == 'SMS-A'){
                          compData.font={color: {argb: "FBB053"},bold: true};
                        }else if(this.scheduleShift[i].SL=='MT' ||this.scheduleShift[i].SL=='MT-A' || this.scheduleShift[i]?.SL  == 'SMT' || this.scheduleShift[i]?.SL  == 'SMT-A'){
                          compData.font={color: {argb: "F5696C"},bold: true};
                        }else if(this.scheduleShift[i].SL=='TW' ||this.scheduleShift[i].SL=='TW-A' || this.scheduleShift[i]?.SL  == 'MTW' || this.scheduleShift[i]?.SL  == 'MTW-A'){
                          compData.font={color: {argb: "9A5FA5"},bold: true};
                        }else if(this.scheduleShift[i]?.SL  == 'WT' || this.scheduleShift[i]?.SL  == 'WT-A' || this.scheduleShift[i]?.SL  == 'WTh' || this.scheduleShift[i]?.SL  == 'WTh-A' ||this.scheduleShift[i]?.SL  == 'TWT' || this.scheduleShift[i]?.SL  == 'TWT-A'||this.scheduleShift[i]?.SL  == 'TWTh' || this.scheduleShift[i]?.SL  == 'TWTh-A'){
                          compData.font={color: {argb: "6160CE"},bold: true};
                        }else if(this.scheduleShift[i]?.SL  == 'TF' || this.scheduleShift[i]?.SL  == 'TF-A' || this.scheduleShift[i]?.SL  == 'ThF' || this.scheduleShift[i]?.SL  == 'ThF-A' ||this.scheduleShift[i]?.SL  == 'WTF' || this.scheduleShift[i]?.SL  == 'WTF-A'||this.scheduleShift[i]?.SL  == 'WThF' || this.scheduleShift[i]?.SL  == 'WThF-A'){
                          compData.font={color: {argb: "0084FE"},bold: true};
                        }else if(this.scheduleShift[i].SL=='FS' ||this.scheduleShift[i].SL=='FS-A' || this.scheduleShift[i]?.SL  == 'TFS' || this.scheduleShift[i]?.SL  == 'TFS-A'||this.scheduleShift[i]?.SL  == 'ThFS' || this.scheduleShift[i]?.SL  == 'ThFS-A'){
                          compData.font={color: {argb: "5AC8FA"},bold: true};
                        }else{
                          compData.font={color: {argb: "000000"},bold: true};
                        }
                      }

                      if(Number(this.scheduleShift[i].shiftdurationc)==9){
                        if(j==0 || j==1 || j==2){
                          compData.value=tempValue
                        }
                        else if((j+ + +1)==allData.length){
                          compData.value=tempValue
                        }else{
                          if(tempValue=='X'){
                            compData.value=tempValue
                          }else{
                            if(allData[j]!=null && allData[j]!=undefined && allData[j]!='' && allData[j]!='X'){
                              compData.value= {
                                'richText': [
                                  {'text': tempValue},
                                  {'font': {'vertAlign': 'superscript'},'text': allData[j].split('-')[1]+'hr'},
                                ]
                              };
                            }else{
                              compData.value=tempValue
                            }

                          }
                        }
                      }
                      else{
                        compData.value=tempValue
                      }
                      compData.alignment={ vertical: 'middle', horizontal: 'center' };
                      if(i==0 && j==0){
                        compData.border = {left: {style:'thin'},top: {style:'thin'}};
                      }
                       if(i==0 && j!=0 && j<10){
                        compData.border = {top: {style:'thin'}};
                      }

                       if( j==(allData.length+ - +1)){
                        compData.border = {right: {style:'thin'}};
                      }
                      if(i==0 &&  j==(allData.length+ - +1)){
                        compData.border = {top: {style:'thin'},right: {style:'thin'}};
                      }
                      if(Number(this.scheduleShift[i].shiftdurationc)==9){

                        if( i==(this.scheduleShift.length+ - +1) && (j==0 || j==1 || j==2 || j>9)){
                          compData.border = {bottom: {style:'thin'}};
                        }
                      }else{
                        if( i==(this.scheduleShift.length+ - +1)){

                          compData.border = {bottom: {style:'thin'}};
                        }
                      }
                      if(allData.length==(j+ + +1)){

                        compData.border = {right: {style:'thin'}};
                        const idCol = worksheet.getColumn(temp);
                        idCol.width = 18;
                      }
                      if(allData.length==(j+ + +1) && i==0){
                        compData.border = {right: {style:'thin'},top: {style:'thin'},};
                        const idCol = worksheet.getColumn(temp);
                        idCol.width = 18;
                      }
                      if( i==(this.scheduleShift.length+ - +1) &&  j==(allData.length+ - +1)){
                        const idCol = worksheet.getColumn(temp);
                        idCol.width = 18;
                        compData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                      }
                    }
                }
                this.rowCount=1
                var temp3,temp4
                temp=this.next()
                var tempColumnName
                temp=this.next()
                temp3=temp
                const customized_total_shit_line_label = worksheet.getCell(temp+this.rowCount);
                customized_total_shit_line_label.value = "Total Shift Lines";
                customized_total_shit_line_label.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                customized_total_shit_line_label.alignment={ vertical: 'middle', horizontal: 'center' };
                customized_total_shit_line_label.font = {bold: true};
                var temp2=this.next()
                temp4=temp2
                customized_total_shit_line_label.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
                worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
                this.rowCount++
                const  customized_total_shit_line = worksheet.getCell(temp+this.rowCount);
                customized_total_shit_line.alignment={ vertical: 'middle', horizontal: 'center' };
                customized_total_shit_line.value = this.scheduleShift.length;
                customized_total_shit_line.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
                  worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);

      this.rowCount++;this.rowCount++
      var allRDOdata=[]
        for(var s=0;s<this.rdosArr.length;s++){

          allRDOdata=[this.rdosArr[s].rdo,this.rdosArr[s].count]
          if(s==0){
            const rvsgDatad1=worksheet.getCell(temp+this.rowCount);
            rvsgDatad1.value='RDOs'
            const rvsgDatad2=worksheet.getCell(temp2+this.rowCount);
              rvsgDatad2.value='Total'
              rvsgDatad1.font = {bold: true};
              rvsgDatad2.font = {bold: true};
              rvsgDatad1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
              rvsgDatad2.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
              rvsgDatad1.alignment={ vertical: 'middle', horizontal: 'center' };
              rvsgDatad2.alignment={ vertical: 'middle', horizontal: 'center' };
              rvsgDatad1.border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
              rvsgDatad2.border = {top: {style:'thin'},right: {style:'thin'},bottom: {style:'thin'}};
          }
          this.rowCount++
            const rvsgData1=worksheet.getCell(temp+this.rowCount);
            rvsgData1.value=this.rdosArr[s].rdo
            const rvsgData2=worksheet.getCell(temp2+this.rowCount);
              rvsgData2.value=this.rdosArr[s].count
              rvsgData1.alignment={ vertical: 'middle', horizontal: 'center' };
              rvsgData2.alignment={ vertical: 'middle', horizontal: 'center' };
                rvsgData1.border = {left: {style:'thin'}};
                rvsgData2.border =  {right: {style:'thin'}};
                if(this.rdosArr[s].rdo=='SS' ||this.rdosArr[s].rdo=='SS-A' || this.rdosArr[s].rdo  == 'FSS' || this.rdosArr[s].rdo  == 'FSS-A'){
                  // rvsgData1.font={color: {argb: "1EC29D"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'1EC29D'}};
                }else if(this.rdosArr[s].rdo=='SM' ||this.rdosArr[s].rdo=='SM-A' || this.rdosArr[s].rdo  == 'SMS' || this.rdosArr[s].rdo  == 'SMS-A'){
                  // rvsgData1.font={color: {argb: "FBB053"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FBB053'}};
                }else if(this.rdosArr[s].rdo=='MT' ||this.rdosArr[s].rdo=='MT-A' || this.rdosArr[s].rdo  == 'SMT' || this.rdosArr[s].rdo  == 'SMT-A'){
                  // rvsgData1.font={color: {argb: "F5696C"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'F5696C'}};
                }else if(this.rdosArr[s].rdo=='TW' ||this.rdosArr[s].rdo=='TW-A' || this.rdosArr[s].rdo  == 'MTW' || this.rdosArr[s].rdo  == 'MTW-A'){
                  // rvsgData1.font={color: {argb: "9A5FA5"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'9A5FA5'}};
                }else if(this.rdosArr[s].rdo  == 'WT' || this.rdosArr[s].rdo  == 'WT-A' || this.rdosArr[s].rdo  == 'WTh' || this.rdosArr[s].rdo  == 'WTh-A' ||this.rdosArr[s].rdo  == 'TWT' || this.rdosArr[s].rdo  == 'TWT-A'||this.rdosArr[s].rdo  == 'TWTh' || this.rdosArr[s].rdo  == 'TWTh-A'){
                  // rvsgData1.font={color: {argb: "6160CE"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'6160CE'}};
                }else if(this.rdosArr[s].rdo  == 'TF' || this.rdosArr[s].rdo  == 'TF-A' || this.rdosArr[s].rdo  == 'ThF' || this.rdosArr[s].rdo  == 'ThF-A' ||this.rdosArr[s].rdo  == 'WTF' || this.rdosArr[s].rdo  == 'WTF-A'||this.rdosArr[s].rdo  == 'WThF' || this.rdosArr[s].rdo  == 'WThF-A'){
                  // rvsgData1.font={color: {argb: "0084FE"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'0084FE'}};
                }else if(this.rdosArr[s].rdo=='FS' ||this.rdosArr[s].rdo=='FS-A' || this.rdosArr[s].rdo  == 'TFS' || this.rdosArr[s].rdo  == 'TFS-A'||this.rdosArr[s].rdo  == 'ThFS' || this.rdosArr[s].rdo  == 'ThFS-A'){
                  // rvsgData1.font={color: {argb: "5AC8FA"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'5AC8FA'}};
                }else{
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'000000'}};
                }
              if(s==0){
                rvsgData1.border = {top: {style:'thin'},left: {style:'thin'}};
                rvsgData2.border = {top: {style:'thin'},right: {style:'thin'}};
              }
              if(s+ + +1==this.rdosArr.length){
                rvsgData1.border = {bottom: {style:'thin'},left: {style:'thin'}};
                rvsgData2.border = {bottom: {style:'thin'},right: {style:'thin'}};
              }


        }
        var tempBLRule=temp2
        this.rowCount=1
        tempBLRule=this.next()
        tempColumnName=tempBLRule
        tempBLRule=this.next()
        temp=tempBLRule
        const customized_BLRule_label_color_red = worksheet.getCell(tempBLRule+this.rowCount);
        customized_BLRule_label_color_red.value = '';
        customized_BLRule_label_color_red.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FF0000'}};
        customized_BLRule_label_color_red.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_BLRule_label_color_red.font = {bold: true};
        customized_BLRule_label_color_red.border = {top: {style:'thin'},left: {style:'thin'}};
          this.rowCount++
        const customized_BLRule_label_color_green = worksheet.getCell(tempBLRule+this.rowCount);
        customized_BLRule_label_color_green.value = '';
        customized_BLRule_label_color_green.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'37F40B'}};
        customized_BLRule_label_color_green.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_BLRule_label_color_green.font = {bold: true};
        customized_BLRule_label_color_green.border = {bottom: {style:'thin'},left: {style:'thin'}};
        tempBLRule=this.next()
        this.rowCount=1
        const customized_BLRule_label_false = worksheet.getCell(tempBLRule+this.rowCount);
        customized_BLRule_label_false.value = 'Business rules not met';
        customized_BLRule_label_false.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_BLRule_label_false.font = {bold: true};
        customized_BLRule_label_false.border = {top: {style:'thin'},right: {style:'thin'}};
        var mtempBLRule=this.next();mtempBLRule=this.next();mtempBLRule=this.next()
        worksheet.mergeCells(tempBLRule+this.rowCount+':'+mtempBLRule+this.rowCount);
        this.rowCount++
        const customized_BLRule_label_true = worksheet.getCell(tempBLRule+this.rowCount);
        customized_BLRule_label_true.value = 'Business rules met';
        customized_BLRule_label_true.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_BLRule_label_true.font = {bold: true};
        customized_BLRule_label_true.border = {bottom: {style:'thin'},right: {style:'thin'}};
        worksheet.mergeCells(tempBLRule+this.rowCount+':'+mtempBLRule+this.rowCount);

                  this.rowCount++
                  this.rowCount++
                  const  customized_required_vs_generated_title=worksheet.getCell(temp+this.rowCount)
                customized_required_vs_generated_title.alignment={ vertical: 'middle', horizontal: 'center' };
                customized_required_vs_generated_title.value="Required vs System Generated Workforce (Shift Category)"
                customized_required_vs_generated_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                customized_required_vs_generated_title.font = {bold: true};
                // for(var i=0;i<6;i++){
                //   temp2=this.next()
                // }
                for(var i=0;i<3;i++){
                  mtempBLRule=this.next()
                }
                worksheet.mergeCells(temp+this.rowCount+':'+mtempBLRule+this.rowCount);


                    for(var s=0;s<this.ReqVsGeneData.length;s++){
                      this.rowCount++
                      this._chars = this.chars.split(tempColumnName)[1]
                      this._nextId=[0]
                      for(var t=0;t<this.ReqVsGeneData[s].length;t++){
                        temp2=this.next()
                          const rvsgData=worksheet.getCell(temp2+this.rowCount);
                          rvsgData.value=this.ReqVsGeneData[s][t]
                          if(s==0){
                            rvsgData.font = {bold: true};
                            rvsgData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                          }
                          rvsgData.alignment={ vertical: 'middle', horizontal: 'center' };
                          if(t==0){
                            rvsgData.border = {left: {style:'thin'}};
                          }
                          if(s==0 && t==0){
                            rvsgData.border = {left: {style:'thin'},top: {style:'thin'}};
                          }
                          if(s==0 && t!=0){
                            rvsgData.border = {top: {style:'thin'}};
                          }
                          if(t==(this.ReqVsGeneData[s].length+ - +1)){
                            rvsgData.border = {right: {style:'thin'}};
                          }
                          if(s==0 &&  t==(this.ReqVsGeneData[s].length+ - +1)){
                            rvsgData.border = {top: {style:'thin'},right: {style:'thin'}};
                          }
                          if( s==(this.ReqVsGeneData.length+ - +1)){
                            rvsgData.border = {bottom: {style:'thin'}};
                          }

                          if(s==(this.ReqVsGeneData.length+ - +1) && t==0){
                            rvsgData.border = {left: {style:'thin'},bottom: {style:'thin'}};
                          }
                          if( t==(this.ReqVsGeneData[s].length+ - +1) &&  s==(this.ReqVsGeneData.length+ - +1)){
                            rvsgData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                          }
                      }
                    }

                    this.rowCount++
                    this.rowCount++
                    this._chars = this.chars.split(tempColumnName)[1]
                    this._nextId=[0]
                const  customized_required_title=worksheet.getCell(temp+this.rowCount)
                customized_required_title.alignment={ vertical: 'middle', horizontal: 'center' };
                customized_required_title.value="Required Workforce vs System Generated Workforce (Shift Time)"
                customized_required_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                customized_required_title.font = {bold: true};
                for(var i=0;i<10;i++){
                  temp2=this.next()
                }
                worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
                for(var i=0;i<this.reqvsgenDataShiftTime.length;i++){
                  this.rowCount++
                  this._chars = this.chars.split(tempColumnName)[1]
                  this._nextId=[0]
                  var ccheckDisable=false
                  if(this.reqvsgenDataSun[i].Sun==0 && this.reqvsgenDataMon[i].Mon==0 && this.reqvsgenDataTue[i].Tue==0 && this.reqvsgenDataWed[i].Wed==0 && this.reqvsgenDataThu[i].Thu==0 && this.reqvsgenDataFri[i].Fri==0 && this.reqvsgenDataSat[i].Sat==0){
                    ccheckDisable=true
                  }else{
                    ccheckDisable=false
                  }
                    allData=[this.reqvsgenDataShiftTime[i].shift_start,this.reqvsgenDataShiftTime[i].shift_length,this.reqvsgenDataShiftTime[i].shift_name,this.reqvsgenDataSun[i].Sun,this.reqvsgenDataMon[i].Mon,this.reqvsgenDataTue[i].Tue,this.reqvsgenDataWed[i].Wed,this.reqvsgenDataThu[i].Thu,this.reqvsgenDataFri[i].Fri,this.reqvsgenDataSat[i].Sat]
                    for(var j=0;j<allData.length;j++){
                      temp2=this.next()
                      const compData=worksheet.getCell(temp2+this.rowCount);
                      if(j==2){
                        const idCol = worksheet.getColumn(temp2);
                        idCol.width = 15;
                      }
                      tempValue=String(allData[j])
                      compData.value=tempValue
                      compData.alignment={ vertical: 'middle', horizontal: 'center' };
                      if(i==0){
                        compData.font = {bold: true};
                        compData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                      }
                      if(j==0){
                        compData.border = {left: {style:'thin'}};
                      }
                      if(i==0 && j==0){
                        compData.border = {left: {style:'thin'},top: {style:'thin'}};
                      }
                       if(i==0 && j!=0){
                        compData.border = {top: {style:'thin'}};
                      }

                       if( j==(allData.length+ - +1)){
                        compData.border = {right: {style:'thin'}};
                      }

                      if(i==0 &&  j==(allData.length+ - +1)){
                        compData.border = {top: {style:'thin'},right: {style:'thin'}};
                      }
                      if( i==(this.reqvsgenDataShiftTime.length+ - +1)){
                        compData.border = {bottom: {style:'thin'}};
                      }
                      if( i==(this.reqvsgenDataShiftTime.length+ - +1) &&  j==(allData.length+ - +1)){
                        compData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                      }

                      if(i==(this.reqvsgenDataShiftTime.length+ - +1) && j==0){
                        compData.border = {left: {style:'thin'},bottom: {style:'thin'}};
                      }
                      if(ccheckDisable==true ){
                        compData.font={color: {argb: "696969"}};
                      }
                    }
                }

      // Default

                    const def_worksheet = workbook.addWorksheet('System Generated Schedule');
        // const customized_header = ['Id', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat','Pattern'];

        // const customized_headerRow = worksheet.addRow(header);

        this.rowCount=1
                this._chars = this.chars;
                this._nextId = [0];
                temp=this.next()
                const compDST=def_worksheet.getCell(temp+this.rowCount);
                compDST.value="Shiftline Schedule "
                compDST.alignment={ vertical: 'middle',horizontal: 'center'   }
                compDST.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                compDST.border = {right: {style:'thin'},top: {style:'thin'},left: {style:'thin'},}
                compDST.font = {bold: true,  size: 22};

                var end
                for(var i=1;i<header.length;i++){
                  end=this.next()
                }
                this.rowCount=this.rowCount+ + +2
                def_worksheet.mergeCells(temp+1+':'+end+this.rowCount);
                this.rowCount++
                var currentrowDCount= this.rowCount

                this._chars = this.chars;
                this._nextId = [0];
                temp=this.next()
                const compDSTName=def_worksheet.getCell(temp+this.rowCount);
                compDSTName.value=this.shiftline_schedule_name
                compDSTName.alignment={ vertical: 'middle',horizontal: 'center'   }
                compDSTName.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                compDSTName.border = {right: {style:'thin'},bottom: {style:'thin'},left: {style:'thin'},}
                compDSTName.font = {  size: 20};

                var end
                for(var i=1;i<header.length;i++){
                  end=this.next()
                }

                this.rowCount=this.rowCount+ + +2
                def_worksheet.mergeCells(temp+currentrowDCount+':'+end+this.rowCount);




                this.rowCount++
                this._chars = this.chars;
                this._nextId = [0];
                  for(var i=0;i<header.length;i++){
                    temp=this.next()
                    const compT=def_worksheet.getCell(temp+this.rowCount);
                    compT.value=header[i]
                    compT.alignment={ vertical: 'middle',horizontal: 'center'   }
                    compT.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                    compT.font = {bold: true};

                    compT.border = {top: {style:'thin'},};
                    if(i==(header.length+ - +1)){
                      compT.border = {right: {style:'thin'},};
                    }
                  }

                this._chars = this.chars;
                this._nextId = [0];
                var tempValue
                for(var i=0;i<this.defscheduleShift.length;i++){
                  if(i>0){

                    if(this.defscheduleShift[i-1].shiftname!==this.defscheduleShift[i].shiftname){
                      this.rowCount++
                    }
                  }
                  this.rowCount++
                  this._chars = this.chars;
                  this._nextId = [0];
                  if(Number(this.defscheduleShift[i].shiftdurationc)==9){

                    allData=[Number(this.defscheduleShift[i].seq_id)+ + +1,this.defscheduleShift[i].SL+(Number(this.defscheduleShift[i].seq)+ + +1),Number(this.defscheduleShift[i].shiftdurationc),this.defscheduleShift[i].Sun,this.defscheduleShift[i].Mon,this.defscheduleShift[i].Tue,this.defscheduleShift[i].Wed,this.defscheduleShift[i].Thu,this.defscheduleShift[i].Fri,this.defscheduleShift[i].Sat,this.defscheduleShift[i].Sunshift2,this.defscheduleShift[i].Monshift2,this.defscheduleShift[i].Tueshift2,this.defscheduleShift[i].Wedshift2,this.defscheduleShift[i].Thushift2,this.defscheduleShift[i].Frishift2,this.defscheduleShift[i].Satshift2,this.defscheduleShift[i].Pattern]
                  }else{
                    allData=[Number(this.defscheduleShift[i].seq_id)+ + +1,this.defscheduleShift[i].SL+(Number(this.defscheduleShift[i].seq)+ + +1),Number(this.defscheduleShift[i].shiftdurationc),this.defscheduleShift[i].Sun,this.defscheduleShift[i].Mon,this.defscheduleShift[i].Tue,this.defscheduleShift[i].Wed,this.defscheduleShift[i].Thu,this.defscheduleShift[i].Fri,this.defscheduleShift[i].Sat,this.defscheduleShift[i].Pattern]
                  }
                    for(var j=0;j<allData.length;j++){

                      if(Number(this.defscheduleShift[i].shiftdurationc)==9){
                        if(j==10){
                          this._chars = this.chars;
                          this._nextId = [3];
                          this.rowCount++
                        }
                      }
                      temp=this.next()
                      const defcompData=def_worksheet.getCell(temp+this.rowCount);
                      if(Number(this.defscheduleShift[i].shiftdurationc)==9){
                        if(j==0 || j==1 || j==2){
                          def_worksheet.mergeCells(temp+this.rowCount+':'+temp+(this.rowCount+ + +1));
                          }
                          if((j+ + +1)==allData.length){
                            def_worksheet.mergeCells(temp+this.rowCount+':'+temp+(this.rowCount+ - +1));
                          }
                      }

                      if(j!=0 && j!=1 && j!=2){
                        if( allData.length!=(j+ + +1)){
                          tempValue=String(this.convertRDOtoShiftDefintion(allData[j],this.defscheduleShift[i].shiftdurationc))
                        }else{
                          tempValue=String(allData[j])
                        }

                      }else{
                        tempValue=String(allData[j])
                      }
                      if(tempValue=='X' || tempValue=='x'){
                      }
                      if(this.defscheduleShift[i].BMLRule==true){
                        defcompData.font={color: {argb: "37F40B"}};
                      }
                      if(this.defscheduleShift[i].BMLRule==false){
                        defcompData.font={color: {argb: "FF0000"}};
                      }
                      if(j==1){
                        const idCol = def_worksheet.getColumn(temp);
                        idCol.width = 15;
                        if(this.defscheduleShift[i].SL=='SS' ||this.defscheduleShift[i].SL=='SS-A' || this.defscheduleShift[i]?.SL  == 'FSS' || this.defscheduleShift[i]?.SL  == 'FSS-A'){
                          defcompData.font={color: {argb: "1EC29D"},bold: true};
                        }else if(this.defscheduleShift[i].SL=='SM' ||this.defscheduleShift[i].SL=='SM-A' || this.defscheduleShift[i]?.SL  == 'SMS' || this.defscheduleShift[i]?.SL  == 'SMS-A'){
                          defcompData.font={color: {argb: "FBB053"},bold: true};
                        }else if(this.defscheduleShift[i].SL=='MT' ||this.defscheduleShift[i].SL=='MT-A' || this.defscheduleShift[i]?.SL  == 'SMT' || this.defscheduleShift[i]?.SL  == 'SMT-A'){
                          defcompData.font={color: {argb: "F5696C"},bold: true};
                        }else if(this.defscheduleShift[i].SL=='TW' ||this.defscheduleShift[i].SL=='TW-A' || this.defscheduleShift[i]?.SL  == 'MTW' || this.defscheduleShift[i]?.SL  == 'MTW-A'){
                          defcompData.font={color: {argb: "9A5FA5"},bold: true};
                        }else if(this.defscheduleShift[i]?.SL  == 'WT' || this.defscheduleShift[i]?.SL  == 'WT-A' || this.defscheduleShift[i]?.SL  == 'WTh' || this.defscheduleShift[i]?.SL  == 'WTh-A' ||this.defscheduleShift[i]?.SL  == 'TWT' || this.defscheduleShift[i]?.SL  == 'TWT-A'||this.defscheduleShift[i]?.SL  == 'TWTh' || this.defscheduleShift[i]?.SL  == 'TWTh-A'){
                          defcompData.font={color: {argb: "6160CE"},bold: true};
                        }else if(this.defscheduleShift[i]?.SL  == 'TF' || this.defscheduleShift[i]?.SL  == 'TF-A' || this.defscheduleShift[i]?.SL  == 'ThF' || this.defscheduleShift[i]?.SL  == 'ThF-A' ||this.defscheduleShift[i]?.SL  == 'WTF' || this.defscheduleShift[i]?.SL  == 'WTF-A'||this.defscheduleShift[i]?.SL  == 'WThF' || this.defscheduleShift[i]?.SL  == 'WThF-A'){
                          defcompData.font={color: {argb: "0084FE"},bold: true};
                        }else if(this.defscheduleShift[i].SL=='FS' ||this.defscheduleShift[i].SL=='FS-A' || this.defscheduleShift[i]?.SL  == 'TFS' || this.defscheduleShift[i]?.SL  == 'TFS-A'||this.defscheduleShift[i]?.SL  == 'ThFS' || this.defscheduleShift[i]?.SL  == 'ThFS-A'){
                          defcompData.font={color: {argb: "5AC8FA"},bold: true};
                        }else{
                          defcompData.font={color: {argb: "000000"},bold: true};
                        }
                      }
                      if(Number(this.defscheduleShift[i].shiftdurationc)==9){
                        if(j==0 || j==1 || j==2){
                          defcompData.value=tempValue
                        }
                        else if((j+ + +1)==allData.length){
                          defcompData.value=tempValue
                        }else{
                          if(tempValue=='X'){
                            defcompData.value=tempValue
                          }else{
                            if(allData[j]!=null && allData[j]!=undefined && allData[j]!='' && allData[j]!='X'){
                              defcompData.value= {
                                'richText': [
                                  {'text': tempValue},
                                  {'font': {'vertAlign': 'superscript'},'text': allData[j].split('-')[1]+'hr'},
                                ]
                              };
                            }else{
                              defcompData.value=tempValue
                            }

                          }
                        }
                      }
                      else{
                        defcompData.value=tempValue
                      }

                      defcompData.alignment={ vertical: 'middle', horizontal: 'center' };
                      if(i==0 && j==0){
                        defcompData.border = {left: {style:'thin'},top: {style:'thin'}};
                      }
                       if(i==0 && j!=0 && j<10){
                        defcompData.border = {top: {style:'thin'}};
                      }

                       if( j==(allData.length+ - +1)){
                        defcompData.border = {right: {style:'thin'}};
                      }
                      if(i==0 &&  j==(allData.length+ - +1)){
                        defcompData.border = {top: {style:'thin'},right: {style:'thin'}};
                      }
                      if(Number(this.defscheduleShift[i].shiftdurationc)==9){
                        if( i==(this.defscheduleShift.length+ - +1) && (j==0 || j==1 || j==2 || j>9)){
                          defcompData.border = {bottom: {style:'thin'}};
                        }
                      }else{
                        if( i==(this.defscheduleShift.length+ - +1)){
                          defcompData.border = {bottom: {style:'thin'}};
                        }
                      }
                      if(allData.length==(j+ + +1)){
                        defcompData.border = {right: {style:'thin'}};
                        const idCol = def_worksheet.getColumn(temp);
                        idCol.width = 18;
                      }
                      if(allData.length==(j+ + +1) && i==0){
                        defcompData.border = {right: {style:'thin'},top: {style:'thin'},};
                        const idCol = def_worksheet.getColumn(temp);
                        idCol.width = 18;
                      }
                      if( i==(this.defscheduleShift.length+ - +1) &&  j==(allData.length+ - +1)){
                        const idCol = def_worksheet.getColumn(temp);
                        idCol.width = 18;
                        defcompData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                      }

                    }
                }
                this.rowCount=1
                var temp3,temp4
                temp=this.next()
                var tempColumnName
                temp=this.next()
                temp3=temp

                const def_customized_total_shit_line_label = def_worksheet.getCell(temp+this.rowCount);
                def_customized_total_shit_line_label.value = "Total Shift Lines";
                def_customized_total_shit_line_label.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                def_customized_total_shit_line_label.alignment={ vertical: 'middle', horizontal: 'center' };
                def_customized_total_shit_line_label.font = {bold: true};
                var temp2=this.next()
                def_customized_total_shit_line_label.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
                def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
              this.rowCount++
                  const  def_customized_total_shit_line = def_worksheet.getCell(temp+this.rowCount);
                  def_customized_total_shit_line.alignment={ vertical: 'middle', horizontal: 'center' };
                  def_customized_total_shit_line.value = this.defscheduleShift.length;
                  def_customized_total_shit_line.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
                  def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
                  this.rowCount++;this.rowCount++
                  var allRDOdata=[]
                  for(var s=0;s<this.defrdosArr.length;s++){

                    if(s==0){
                      const rvsgDatad1=def_worksheet.getCell(temp+this.rowCount);
                      rvsgDatad1.value='RDOs'
                      const rvsgDatad2=def_worksheet.getCell(temp2+this.rowCount);
                        rvsgDatad2.value='Total'
                        rvsgDatad1.font = {bold: true};
                        rvsgDatad2.font = {bold: true};
                        rvsgDatad1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                        rvsgDatad2.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                        rvsgDatad1.alignment={ vertical: 'middle', horizontal: 'center' };
                        rvsgDatad2.alignment={ vertical: 'middle', horizontal: 'center' };
                        rvsgDatad1.border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
                        rvsgDatad2.border = {top: {style:'thin'},right: {style:'thin'},bottom: {style:'thin'}};
                    }
                    this.rowCount++
                      const rvsgData1=def_worksheet.getCell(temp+this.rowCount);
                      rvsgData1.value=this.defrdosArr[s].rdo
                      const rvsgData2=def_worksheet.getCell(temp2+this.rowCount);
                        rvsgData2.value=this.defrdosArr[s].count
                        rvsgData1.alignment={ vertical: 'middle', horizontal: 'center' };
                        rvsgData2.alignment={ vertical: 'middle', horizontal: 'center' };
                          rvsgData1.border = {left: {style:'thin'}};
                          rvsgData2.border =  {right: {style:'thin'}};
                          if(this.defrdosArr[s].rdo=='SS' ||this.defrdosArr[s].rdo=='SS-A' || this.defrdosArr[s].rdo  == 'FSS' || this.defrdosArr[s].rdo  == 'FSS-A'){
                            // rvsgData1.font={color: {argb: "1EC29D"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'1EC29D'}};
                          }else if(this.defrdosArr[s].rdo=='SM' ||this.defrdosArr[s].rdo=='SM-A' || this.defrdosArr[s].rdo  == 'SMS' || this.defrdosArr[s].rdo  == 'SMS-A'){
                            // rvsgData1.font={color: {argb: "FBB053"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FBB053'}};
                          }else if(this.defrdosArr[s].rdo=='MT' ||this.defrdosArr[s].rdo=='MT-A' || this.defrdosArr[s].rdo  == 'SMT' || this.defrdosArr[s].rdo  == 'SMT-A'){
                            // rvsgData1.font={color: {argb: "F5696C"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'F5696C'}};
                          }else if(this.defrdosArr[s].rdo=='TW' ||this.defrdosArr[s].rdo=='TW-A' || this.defrdosArr[s].rdo  == 'MTW' || this.defrdosArr[s].rdo  == 'MTW-A'){
                            // rvsgData1.font={color: {argb: "9A5FA5"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'9A5FA5'}};
                          }else if(this.defrdosArr[s].rdo  == 'WT' || this.defrdosArr[s].rdo  == 'WT-A' || this.defrdosArr[s].rdo  == 'WTh' || this.defrdosArr[s].rdo  == 'WTh-A' ||this.defrdosArr[s].rdo  == 'TWT' || this.defrdosArr[s].rdo  == 'TWT-A'||this.defrdosArr[s].rdo  == 'TWTh' || this.defrdosArr[s].rdo  == 'TWTh-A'){
                            // rvsgData1.font={color: {argb: "6160CE"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'6160CE'}};
                          }else if(this.defrdosArr[s].rdo  == 'TF' || this.defrdosArr[s].rdo  == 'TF-A' || this.defrdosArr[s].rdo  == 'ThF' || this.defrdosArr[s].rdo  == 'ThF-A' ||this.defrdosArr[s].rdo  == 'WTF' || this.defrdosArr[s].rdo  == 'WTF-A'||this.defrdosArr[s].rdo  == 'WThF' || this.defrdosArr[s].rdo  == 'WThF-A'){
                            // rvsgData1.font={color: {argb: "0084FE"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'0084FE'}};
                          }else if(this.defrdosArr[s].rdo=='FS' ||this.defrdosArr[s].rdo=='FS-A' || this.defrdosArr[s].rdo  == 'TFS' || this.defrdosArr[s].rdo  == 'TFS-A'||this.defrdosArr[s].rdo  == 'ThFS' || this.defrdosArr[s].rdo  == 'ThFS-A'){
                            // rvsgData1.font={color: {argb: "5AC8FA"},bold: true};
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'5AC8FA'}};
                          }else{
                            rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                            rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'000000'}};
                          }
                        if(s==0){
                          rvsgData1.border = {top: {style:'thin'},left: {style:'thin'}};
                          rvsgData2.border = {top: {style:'thin'},right: {style:'thin'}};
                        }
                        if(s+ + +1==this.defrdosArr.length){
                          rvsgData1.border = {bottom: {style:'thin'},left: {style:'thin'}};
                          rvsgData2.border = {bottom: {style:'thin'},right: {style:'thin'}};
                        }


                  }
                  var tempBLRule=temp2
                  this.rowCount=3
                  tempBLRule=this.next()
                  tempColumnName=tempBLRule
                  tempBLRule=this.next()
                  temp=tempBLRule
                  this.rowCount++
                  const  def_customized_required_vs_generated_title=def_worksheet.getCell(temp+this.rowCount)
                  def_customized_required_vs_generated_title.alignment={ vertical: 'middle', horizontal: 'center' };
                  def_customized_required_vs_generated_title.value="Required vs System Generated Workforce (Shift Category)"
                  def_customized_required_vs_generated_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                  def_customized_required_vs_generated_title.font = {bold: true};
                for(var i=0;i<7;i++){
                  temp2=this.next()
                }
                def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);

                    for(var s=0;s<this.defReqVsGeneData.length;s++){
                      this.rowCount++
                      this._chars = this.chars.split(tempColumnName)[1]
                      this._nextId=[0]
                      for(var t=0;t<this.defReqVsGeneData[s].length;t++){
                        temp2=this.next()
                          const def_rvsgData=def_worksheet.getCell(temp2+this.rowCount);
                          def_rvsgData.value=this.defReqVsGeneData[s][t]
                          if(s==0){
                            def_rvsgData.font = {bold: true};
                            def_rvsgData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                          }
                          def_rvsgData.alignment={ vertical: 'middle', horizontal: 'center' };
                          if(t==0){
                            def_rvsgData.border = {left: {style:'thin'}};
                          }
                          if(s==0 && t==0){
                            def_rvsgData.border = {left: {style:'thin'},top: {style:'thin'}};
                          }
                          if(s==0 && t!=0){
                            def_rvsgData.border = {top: {style:'thin'}};
                          }
                          if(t==(this.defReqVsGeneData[s].length+ - +1)){
                            def_rvsgData.border = {right: {style:'thin'}};
                          }
                          if(s==0 &&  t==(this.defReqVsGeneData[s].length+ - +1)){
                            def_rvsgData.border = {top: {style:'thin'},right: {style:'thin'}};
                          }
                          if( s==(this.defReqVsGeneData.length+ - +1)){
                            def_rvsgData.border = {bottom: {style:'thin'}};
                          }

                          if(s==(this.defReqVsGeneData.length+ - +1) && t==0){
                            def_rvsgData.border = {left: {style:'thin'},bottom: {style:'thin'}};
                          }
                          if( t==(this.defReqVsGeneData[s].length+ - +1) &&  s==(this.defReqVsGeneData.length+ - +1)){
                            def_rvsgData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                          }
                      }
                    }

                    this.rowCount++
                    this.rowCount++
                    this._chars = this.chars.split(tempColumnName)[1]
                    this._nextId=[0]
                const  def_customized_required_title=def_worksheet.getCell(temp+this.rowCount)
                def_customized_required_title.alignment={ vertical: 'middle', horizontal: 'center' };
                def_customized_required_title.value="Required Workforce vs System Generated Workforce (Shift Time)"
                def_customized_required_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                def_customized_required_title.font = {bold: true};
                for(var i=0;i<10;i++){
                  temp2=this.next()
                }
                def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
                for(var i=0;i<this.reqvsgenDefDataShiftTime.length;i++){
                  this.rowCount++
                  this._chars = this.chars.split(tempColumnName)[1]
                  this._nextId=[0]
                  var checkDisable=false
                  if(this.reqvsgenDefDataSun[i].Sun==0 && this.reqvsgenDefDataMon[i].Mon==0 && this.reqvsgenDefDataTue[i].Tue==0 && this.reqvsgenDefDataWed[i].Wed==0 && this.reqvsgenDefDataThu[i].Thu==0 && this.reqvsgenDefDataFri[i].Fri==0 && this.reqvsgenDefDataSat[i].Sat==0){
                    checkDisable=true
                  }else{
                    checkDisable=false
                  }
                    allData=[this.reqvsgenDefDataShiftTime[i].shift_start,this.reqvsgenDefDataShiftTime[i].shift_length,this.reqvsgenDefDataShiftTime[i].shift_name,this.reqvsgenDefDataSun[i].Sun,this.reqvsgenDefDataMon[i].Mon,this.reqvsgenDefDataTue[i].Tue,this.reqvsgenDefDataWed[i].Wed,this.reqvsgenDefDataThu[i].Thu,this.reqvsgenDefDataFri[i].Fri,this.reqvsgenDefDataSat[i].Sat]
                    for(var j=0;j<allData.length;j++){
                      temp2=this.next()
                      const compData=def_worksheet.getCell(temp2+this.rowCount);
                      if(j==2){
                        const idCol = def_worksheet.getColumn(temp2);
                        idCol.width = 15;
                      }
                      tempValue=String(allData[j])
                      compData.value=tempValue
                      compData.alignment={ vertical: 'middle', horizontal: 'center' };
                      if(i==0){
                        compData.font = {bold: true};
                        compData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                      }
                      if(j==0){
                        compData.border = {left: {style:'thin'}};
                      }
                      if(i==0 && j==0){
                        compData.border = {left: {style:'thin'},top: {style:'thin'}};
                      }
                       if(i==0 && j!=0){
                        compData.border = {top: {style:'thin'}};
                      }

                       if( j==(allData.length+ - +1)){
                        compData.border = {right: {style:'thin'}};
                      }

                      if(i==0 &&  j==(allData.length+ - +1)){
                        compData.border = {top: {style:'thin'},right: {style:'thin'}};
                      }
                      if( i==(this.reqvsgenDefDataShiftTime.length+ - +1)){
                        compData.border = {bottom: {style:'thin'}};
                      }
                      if( i==(this.reqvsgenDefDataShiftTime.length+ - +1) &&  j==(allData.length+ - +1)){
                        compData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                      }

                      if(i==(this.reqvsgenDefDataShiftTime.length+ - +1) && j==0){
                        compData.border = {left: {style:'thin'},bottom: {style:'thin'}};
                      }
                      if(checkDisable==true ){
                        compData.font={color: {argb: "696969"}};
                      }
                    }
                }

       // Generate Excel File with given name
            workbook.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob,  this.fileName);
        });
        await this.loading.dismiss();

          }

}
