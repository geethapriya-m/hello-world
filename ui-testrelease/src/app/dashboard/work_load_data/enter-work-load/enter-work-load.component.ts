
import { Component, ElementRef, HostListener, Injectable, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
// import { EditWorkLoadDataPage } from '..work_lo/edit-work-load-data/edit-work-load-data.page';
import { RequiredWorkforce } from 'src/app/model/requiredWorkforce';
import { WorkDay } from 'src/app/model/workDay';
import { RequiredWorkforceService } from 'src/app/services/required-workforce.service';
import { WorkLoadService } from 'src/app/services/work-load.service';
// import workloadData from '../json/work-load-data.json';
import workloadData from 'src/app/json/work-load-data.json';
import straightlines_io_apis from 'src/app/json/apis.json';
import requiredWorkForce from 'src/app/json/required-workforce.json'
import scheduleShiftLines from 'src/app/json/schedule-shift-line.json'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { WorkloadDataGeneratePageModule } from './workload-data-generate.module';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { WorkPattern } from 'src/app/model/workPattern';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { IncludeExcludeShiftService } from 'src/app/services/include-exclude-shift.service';
import { HeaderTitleService } from '../../nav-bar-footer/header-title.service';
import { CreateNewShiftDefintionPage } from '../create-new-shift-defintion/create-new-shift-defintion.page';
import { EditWorkLoadDataPage } from '../edit-work-load-data/edit-work-load-data.page';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import { MidSummaryComponent } from '../../manage-shift-line-schedules/edit-schedule/summary/mid-summary/mid-summary.component';
// import { CreateNewShiftDefintionPageModule } from '../create-new-shift-defintion/create-new-shift-defintion.module';
// import { CreateNewShiftDefintionPage } from '../create-new-shift-defintion/create-new-shift-defintion.page';

@Component({
  selector: 'app-enter-work-load',
  templateUrl: './enter-work-load.component.html',
  styleUrls: ['./enter-work-load.component.scss'],
})
export class EnterWorkLoadComponent implements OnInit {

 // @ViewChild('sunday',{static:false}) sunndayy: ElementRef;
 hideSplitShiftMidDay=false
 hideSplitShiftDayEve=false
 hideSplitShiftEveMid=false
 shiftValidation=true
 changeText=true
 reqWorkForce=requiredWorkForce
 worData=workloadData
 work_load_data=workloadData
 scShiftLine=scheduleShiftLines
 selected_shift_duration=8
 newShiftDefinition
 editWorkLoadForm: FormGroup;
 errorMsg: any;
 wData: any;
 gDatasun: any;
 gDatamon: any;
 gDatatue: any;
 gDatawed: any;
 gDatathu: any;
 gDatafri: any;
 gDatasat: any;
 gDataPattern: any;
 scheduleShift: any []=[]
 gData:any=[]
 requiredWorkforceDataForm:FormGroup;
 totalSunDay=0;totalMonDay=0;totalTueDay=0;totalWedDay=0;totalThuDay=0;totalFriDay=0;totalSatDay=0;
 totalSunEve=0;totalMonEve=0; totalTueEve=0;totalWedEve=0; totalThuEve=0;totalFriEve=0;totalSatEve=0;
 totalSunMid=0;totalMonMid=0; totalTueMid=0;totalWedMid=0; totalThuMid=0;totalFriMid=0;totalSatMid=0;
 totalSunDayEve=0;totalMonDayEve=0;totalTueDayEve=0;totalWedDayEve=0;totalThuDayEve=0;totalFriDayEve=0;totalSatDayEve=0;
 totalSunEveMid=0;totalMonEveMid=0; totalTueEveMid=0;totalWedEveMid=0; totalThuEveMid=0;totalFriEveMid=0;totalSatEveMid=0;
 totalSunMidDay=0;totalMonMidDay=0; totalTueMidDay=0;totalWedMidDay=0; totalThuMidDay=0;totalFriMidDay=0;totalSatMidDay=0;
 totalSun=0;totalMon=0; totalTue=0;totalWed=0; totalThu=0;totalFri=0;totalSat=0;
 workLoadId: number;
 allMsgChangeLogs: any;
 allEmployeeChangeLogs: any;
 requiredWorkforceData=[] as any;
 updaterequiredWorkforceData=[] as any;
 hide=false
 requiredWorkforceDataId=1;
 requiredWorkLoadData=[] as any
 scheduleDataArray: any []= []
 workLoadData =[] as any;
 comparisonDataArray=[] as any
 scheduleData=[] as any;
 comparisonData=[] as any
 // midSun23: FormGroup;
 tempScheduleDataStored: any;
 suntotal: any=0;
 sattotal: any=0;satDaytotal: any;
 totalRequireworkforceForm:FormGroup
 test1: { sh_name: any; };
 workPatternDayForm:FormGroup
 fritotal: any=0;
 a: number;
 result: number;
 // start_time: any;
 totalCOmputedWorkForce: any;
 totalComputedWorkForce: any;
 static workLoadGenerated: any ;
 static requiredvsGenerate: any;
 thutotal: any=0;
 static systemGeneratedComparisonData: any;
 static data2: any[];
 requiredEmpData: any;
 generatedEmpData: any;
 static requiredData: any;
 testing: { scheduleData: any[]; };
 defaultscheduleShift: any[];
wLdata=[]
wLdata1=[]
day1_pattern;day2_pattern;day3_pattern;day4_pattern;day5_pattern;
 wedtotal: any=0;
 workPatternPreference: {};
 dat: { Fri: string; Mon: string; Sat: string; Sun: string; Thu: string; Tue: string; Wed: string; id: number; shiftName: string; shift_created_by: string; startTime: string; };
 re: any;
 selectedShift: any;
 tempSun: any;tempMon: any;tempTue: any;tempWed: any;tempThu: any;tempFri: any;tempSat: any;
 afterdeleteShiftdefs: any[];
 deleteShiftdefs: any[];
 timeLeft: number;
 updatedWorkPattern: any[];
 PWP: any[];
 PSO: any[];
 gTempSun: any;
 g_Datasun: any[];
 outliers: any;
 outliers_sun: {};
 shift_outliers: any;
 sun_outliers: any;
 final_outliers: any[];
 res: any;
 convertResponseToJsonStrigify: any;
 validSun: boolean=true;
 summary_days:any []=[{"id":0,"day":"Sun"},{"id":1,"day":"Mon"},{"id":2,"day":"Tue"},{"id":3,"day":"Wed"},{"id":4,"day":"Thu"},{"id":5,"day":"Fri"},{"id":6,"day":"Sat"}]
temp ={}
 tuetotal: any=0;
 allGeneratedSchedule=[] as any
 allDefaultGeneratedSchedule=[] as any
 temp1='EVE1500';temp2='EVE1300';temp3='DAY0700';temp4='DAY0600';temp5='MID2300';
 montotal: any=0;gDataShiftLineName: any;
;
checkUserAccess=false
 totalRequiredWorkForce=33
 workLoad23:any[]
 workLoad6:any[]
 workLoad7:any[]
 workLoad15:any[]
 workLoad13:any[]
 work_Load:any[]
 workload=[] as any
 workLoadForm: FormGroup;
 allShift
 allShiftData
 shiftLen
   allll=[]as any
   sh_startTime
   shift_name
   convertTimetoString
   allShiftName=[] as any
   workPattern=new WorkPattern()
   arrangeShiftdefintionG=[];
   arrangeShiftdefintionL=[];
   outliervalues=false
   nonoutlier={}
   user_data
   PSO_PWP
   oldUpdatedWorkPattern=[]
   countSunOutlier=0;countMonOutlier=0;countTueOutlier=0;countWedOutlier=0;countThuOutlier=0;countFriOutlier=0;countSatOutlier=0;
max_shift_validation
all_schedule=[]
allShiftDataAll=[]
  all_Schedule=[];

 constructor(public modalCtrl: ModalController,
             private route:Router,
             public navCtrl: NavController,
             public shiftDefSer:WorkLoadService,
             public alertController: AlertController,
             private headerTitleService: HeaderTitleService,
             private scheduleService:GeneratedScheduleService,
             private renderer: Renderer2,
             public loadingController: LoadingController,
             private requiredWorkforce: RequiredWorkforceService,
             public dataService:ScheduleDataService,
             public alertCtrl: AlertController,
             private activaRouter: ActivatedRoute,
             public formBuilder: FormBuilder,
             private includeExcludeSer:IncludeExcludeShiftService,
             public dialogs: MatDialog) {

 }
 ionViewWillEnter(){
   if(JSON.parse(localStorage.getItem('customizedScheduleShiftLine'))==null){
     this.hide=false
   }else{
     this.hide=true
   }

   this.ngOnInit()
   // this.work_load_data=  JSON.parse(localStorage.getItem('allShiftRequiredData'))
 }

 ngOnInit() {
  if(sessionStorage.getItem('token')!=undefined){
    this.checkUserAccess=true
  }else{
   this.checkUserAccess=false
  }
//Work Load Form

this.user_data=JSON.parse(sessionStorage.getItem('userData'))
if(this.user_data.role=='bidmanager'){
  if(straightlines_io_apis.apis.enter_Work_load===String(this.route.url).substr(1)){

    this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.generated_schedule);

    this.headerTitleService.setBackUrl(straightlines_io_apis.apis.create_new_bid_schedule);
  }else{
    this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.generated_schedule_api);
    this.getAllScheduleName()
    if(this.all_schedule.length>0){
      this.headerTitleService.setBackUrl(straightlines_io_apis.apis.manage_shift_line_schedule);
    }else{
      this.headerTitleService.setBackUrl(straightlines_io_apis.apis.dashboard);
    }
  }
}else{
  this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.guest_generated_schedule_api);
  this.getAllScheduleName()
  if(this.all_schedule.length>0){
    this.headerTitleService.setBackUrl(straightlines_io_apis.apis.guest_manage_shift_line_schedule);
  }else{
    this.headerTitleService.setBackUrl(straightlines_io_apis.apis.guest_dashboard);
  }
}
this.headerTitleService.setTitle('New Shiftline Schedule');
this.headerTitleService.setDefaultHeader(true)
this.headerTitleService.checkBiddingTime('');this.headerTitleService.checkBiddingEndDate('');

        // this.forwardOldGeneratedShiftLines()
        this.user_data=JSON.parse(sessionStorage.getItem('userData'))
        this.PSO_PWP=JSON.parse(localStorage.getItem('PWP-PSO'))
        this.user_data=JSON.parse(sessionStorage.getItem('userData'))
        var work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
        this.work_load_data=[]
        this.arrangeShiftdefintionG=[]
        this.arrangeShiftdefintionL=[]
        for(var i=0;i<work_load_data.length;i++){
          if(this.selected_shift_duration==Number(work_load_data[i].shift_duration)){
            // if(this.selected_shift_duration==Number(work_load_data[i].shift_duration) ){
              if(Number(work_load_data[i].startTime)>2200){
                this.arrangeShiftdefintionG.push(work_load_data[i])
            }else if(Number(work_load_data[i].startTime)<=2200){
              this.arrangeShiftdefintionL.push(work_load_data[i])
            }
          }
        }

        this.arrangeShiftdefintionG.sort((a,b) => a.startTime.localeCompare(b.startTime));
        this.arrangeShiftdefintionL.sort((a,b) => a.startTime.localeCompare(b.startTime));
        this.work_load_data=[]
        for(var i=0;i<this.arrangeShiftdefintionG.length;i++){
          this.work_load_data.push(this.arrangeShiftdefintionG[i])
        }
        for(var i=0;i<this.arrangeShiftdefintionL.length;i++){
          this.work_load_data.push(this.arrangeShiftdefintionL[i])
        }
  for(var i=0;i<this.work_load_data.length;i++){
  if( Number(this.work_load_data[i].shiftCategory)==4){
      this.hideSplitShiftMidDay=true
  }
  else if( Number(this.work_load_data[i].shiftCategory)==5){
    this.hideSplitShiftDayEve=true
  }
  else if( Number(this.work_load_data[i].shiftCategory)==6){
      this.hideSplitShiftEveMid=true
  }
  }
  this.allShiftName=[]
  for(var i=0;i<this.work_load_data.length;i++){
  if(this.work_load_data[i].shiftName!=null){
    if(this.work_load_data[i].sh_include_exclude=='I'){
    if( Number(this.work_load_data[i].shiftCategory)==1){
      this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'MID'+ this.work_load_data[i].startTime,"shift_category":'MID',"p_workPattern":'M'})
    }
    else if( Number(this.work_load_data[i].shiftCategory)==3){
      this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'DAY'+ this.work_load_data[i].startTime ,"shift_category":'DAY',"p_workPattern":'D'})
    }
    else if( Number(this.work_load_data[i].shiftCategory)==2){
      this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'EVE'+ this.work_load_data[i].startTime, "shift_category":'EVE',"p_workPattern":'E'})
    }
    else if( Number(this.work_load_data[i].shiftCategory)==4){
      this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'SMD'+this.work_load_data[i].startTime, "shift_category":'M/D',"p_workPattern":'S'})
    }
    else if( Number(this.work_load_data[i].shiftCategory)==5){
      this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'SDE'+ this.work_load_data[i].startTime, "shift_category":'D/E',"p_workPattern":'S'})
    }
    else if( Number(this.work_load_data[i].shiftCategory)==6){
      this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern":'SEM'+ this.work_load_data[i].startTime,"shift_category":'E/M',"p_workPattern":'S'})
    }
  }
  }
  }
  if(this.selected_shift_duration==8){
    if(this.PSO_PWP.PWP.length==0){
      this.temp1='EVE1500';this.temp2='EVE1300';this.temp3='DAY0700';this.temp4='DAY0600';this.temp5='MID2300';
    }
    else if(this.PSO_PWP.PWP.length==5){
      if(this.PSO_PWP.PWP?.[0]!='' && this.PSO_PWP.PWP?.[1]!='' && this.PSO_PWP.PWP?.[2]!=''&& this.PSO_PWP.PWP?.[3]!=''&& this.PSO_PWP.PWP?.[4]!=''){
      this.temp1=this.PSO_PWP.PWP?.[0]+this.PSO_PWP.PSO?.[0];
      this.temp2=this.PSO_PWP.PWP?.[1]+this.PSO_PWP.PSO?.[1];
      this.temp3=this.PSO_PWP.PWP?.[2]+this.PSO_PWP.PSO?.[2];
      this.temp4=this.PSO_PWP.PWP?.[3]+this.PSO_PWP.PSO?.[3];
      this.temp5=this.PSO_PWP.PWP?.[4]+this.PSO_PWP.PSO?.[4];
      }else{
        var checkoldUpdatedWorkPattern=false,oldUpdatedWorkPattern=[]
        for(j=0;j<this.oldUpdatedWorkPattern.length;j++){
          checkoldUpdatedWorkPattern=false
          if(this.oldUpdatedWorkPattern[j]!=''){
            for(var i=0;i<this.allShiftName.length;i++){
                if(this.allShiftName[i].shiftPattern==this.oldUpdatedWorkPattern[j] ){
                  checkoldUpdatedWorkPattern=true
                }
            }
            if(checkoldUpdatedWorkPattern==true){
              if(j==0){ this.temp1=this.oldUpdatedWorkPattern[j] }
              else if(j==1){this.temp2=this.oldUpdatedWorkPattern[j]}
              else if(j==2){this.temp3=this.oldUpdatedWorkPattern[j]}
              else if(j==3){this.temp4=this.oldUpdatedWorkPattern[j]}
              else if(j==4){this.temp5=this.oldUpdatedWorkPattern[j]}
            }else{
              if(j==0){ this.temp1='' }
              else if(j==1){this.temp2=''}
              else if(j==2){this.temp3=''}
              else if(j==3){this.temp4=''}
              else if(j==4){this.temp5=''}
            }
          }
        }
      }
    }else{
      this.temp1='EVE1500';this.temp2='EVE1300';this.temp3='DAY0700';this.temp4='DAY0600';this.temp5='MID2300';
    }
  }else{

    if(this.PSO_PWP.PWP.length==0){

      this.temp1='MID2200';this.temp2='MID2200';this.temp3='EVE1300';this.temp4='EVE1300';this.temp5='';
    }else if(this.PSO_PWP.PWP.length==4){
      if(this.PSO_PWP.PWP?.[0]!='' && this.PSO_PWP.PWP?.[1]!='' && this.PSO_PWP.PWP?.[2]!=''&& this.PSO_PWP.PWP?.[3]!=''){
      this.temp1=this.PSO_PWP.PWP?.[0]+this.PSO_PWP.PSO?.[0];
      this.temp2=this.PSO_PWP.PWP?.[1]+this.PSO_PWP.PSO?.[1];
      this.temp3=this.PSO_PWP.PWP?.[2]+this.PSO_PWP.PSO?.[2];
      this.temp4=this.PSO_PWP.PWP?.[3]+this.PSO_PWP.PSO?.[3];

    }else{
      var checkoldUpdatedWorkPattern=false,oldUpdatedWorkPattern=[]
      for(j=0;j<this.oldUpdatedWorkPattern.length;j++){
        checkoldUpdatedWorkPattern=false
        if(this.oldUpdatedWorkPattern[j]!=''){
          for(var i=0;i<this.allShiftName.length;i++){
              if(this.allShiftName[i].shiftPattern==this.oldUpdatedWorkPattern[j]){
                checkoldUpdatedWorkPattern=true
              }
          }
          if(checkoldUpdatedWorkPattern==true){
            if(j==0){ this.temp1=this.oldUpdatedWorkPattern[j] }
            else if(j==1){this.temp2=this.oldUpdatedWorkPattern[j]}
            else if(j==2){this.temp3=this.oldUpdatedWorkPattern[j]}
            else if(j==3){this.temp4=this.oldUpdatedWorkPattern[j]}
          }else{
            if(j==0){ this.temp1='' }
            else if(j==1){this.temp2=''}
            else if(j==2){this.temp3=''}
            else if(j==3){this.temp4=''}
          }
        }
      }
    }

    }else{
      this.temp1='MID2200';this.temp2='MID2200';this.temp3='EVE1300';this.temp4='EVE1300';this.temp5='';
    }
  }






  if(JSON.parse(localStorage.getItem('outliers'))!=null){
  this.outliers=JSON.parse(localStorage.getItem('outliers'))
  }
  if(JSON.parse(localStorage.getItem('newSHiftDefinition'))!=null)
  {
  this.newShiftDefinition=JSON.parse(localStorage.getItem('newSHiftDefinition'))
  }
      this.workLoadForm = this.formBuilder.group({
          allWorkLoadData: this.formBuilder.array([]) ,
      });


  const dataset=[]
      for(var i=0;i<this.work_load_data.length;i++){
        this.allWorkLoadData.push(this.newWorkLoadData());
        const temp= {"id": this.work_load_data[i].id,
        "startTime": this.work_load_data[i].startTime,

        "Sun": this.work_load_data[i].Sun,
        "Mon": this.work_load_data[i].Mon,
        "Tue": this.work_load_data[i].Tue,
        "Wed": this.work_load_data[i].Wed,
        "Thu": this.work_load_data[i].Thu,
        "Fri": this.work_load_data[i].Fri,
        "Sat": this.work_load_data[i].Sat,
        "shiftName":this.work_load_data[i].shiftName,
        "shift_duration":this.work_load_data[i].shift_duration,
        "shiftCategory":this.work_load_data[i].shiftCategory,
        "sh_include_exclude":this.work_load_data[i].sh_include_exclude,
        "shift_created_by":this.work_load_data[i].shift_created_by,"sunOutlier":false,"monOutlier":false,"tueOutlier":false,"wedOutlier":false,"thuOutlier":false,"friOutlier":false,"satOutlier":false}

        dataset.push(temp)
      }
  // this.outliers=[{"shiftName":'0000',"sun":'23'},{"shiftName":'0700',"sun":'23','mon':'25'}]
  const outlierShiftData=[]
  const nonOutlierShiftData=[]
  var outliers=[]
  if(this.outliers.length>0){


  for(var i=0;i<Object.keys(this.outliers[0]).length;i++){
  outliers.push({"shiftName":Object.keys(this.outliers[0])?.[i],"values":Object.values(this.outliers[0])?.[i]})

  }
  this.outliers=outliers
  // this.outliers=this.outliers[0]
  this.countSunOutlier=0;this.countMonOutlier=0;this.countTueOutlier=0;this.countWedOutlier=0;this.countThuOutlier=0;this.countFriOutlier=0;this.countSatOutlier=0;
      for(var j=0;j<this.outliers.length;j++){
          for(var i=0;i<dataset.length;i++){
          if(Number(this.outliers[j].shiftName)===Number(dataset[i].startTime) ){
            var temp_Sun=[]
            // if(this.outliers.Sun)

            var sunOutlier,monOutlier,tueOutlier,wedOutlier,thuOutlier,friOutlier,satOutlier
            if(this.outliers[j].values.SUN){
              sunOutlier=true
              this.countSunOutlier=this.countSunOutlier+ + + 1
            }else{
              sunOutlier=false
            }
            if(this.outliers[j].values.MON){
              monOutlier=true
              this.countMonOutlier=this.countMonOutlier+ + + 1
            }else{
              monOutlier=false
            }
            if(this.outliers[j].values.TUE){
              tueOutlier=true
              this.countTueOutlier=this.countTueOutlier+ + + 1
            }else{
              tueOutlier=false
            }
            if(this.outliers[j].values.WED){
              wedOutlier=true
              this.countWedOutlier=this.countWedOutlier+ + + 1
            }else{
              wedOutlier=false
            }
            if(this.outliers[j].values.THU){
              thuOutlier=true
              this.countThuOutlier=this.countThuOutlier+ + + 1
            }else{
              thuOutlier=false
            }
            if(this.outliers[j].values.FRI){
              friOutlier=true
              this.countFriOutlier=this.countFriOutlier+ + + 1
            }else{
              friOutlier=false
            }
            if(this.outliers[j].values.SAT){
              satOutlier=true
              this.countSatOutlier=this.countSatOutlier+ + + 1
            }else{
            satOutlier=false
            }
            this.temp= {"id": dataset[i].id,
              "startTime": dataset[i].startTime,
              "Sun": dataset[i].Sun,
              "Mon": dataset[i].Mon,
              "Tue": dataset[i].Tue,
              "Wed": dataset[i].Wed,
              "Thu": dataset[i].Thu,
              "Fri": dataset[i].Fri,
              "Sat": dataset[i].Sat,
              "shiftName":dataset[i].shiftName,
              "shift_duration":dataset[i].shift_duration,
              "shiftCategory":dataset[i].shiftCategory,
              "sh_include_exclude":dataset[i].sh_include_exclude,
              "shift_created_by":dataset[i].shift_created_by,"sunOutlier":sunOutlier,"monOutlier":monOutlier,"tueOutlier":tueOutlier,"wedOutlier":wedOutlier,"thuOutlier":thuOutlier,"friOutlier":friOutlier,"satOutlier":satOutlier}
              outlierShiftData.push(this.temp)
            }else if(Number(this.outliers[j].shiftName)!==Number(dataset[i].startTime) ){
              this.nonoutlier= dataset[i]
              nonOutlierShiftData.push(this.nonoutlier)
            }

          }

      }

      let beforeFinalData
      beforeFinalData= nonOutlierShiftData.filter((v,i,a)=>a.findIndex(t=>(t.shiftTime === v.shiftTime && t.id===v.id))===i)
          const mergArray=[]
          for(var i=0;i<beforeFinalData.length;i++){
      outlierShiftData.push(beforeFinalData[i])
          }
          let finalDataSet
          finalDataSet= outlierShiftData.filter((v,i,a)=>a.findIndex(t=>(t.shiftTime === v.shiftTime && t.id===v.id))===i)
      let arrangeShiftdefintionGreater=[]
      let arrangeShiftdefintionLess=[]
      for(var i=0;i<finalDataSet.length;i++){
        if(Number(finalDataSet[i].startTime)>2200){
      arrangeShiftdefintionGreater.push(finalDataSet[i])
        }else if(Number(finalDataSet[i].startTime)<=2200){
          arrangeShiftdefintionLess.push(finalDataSet[i])
        }
      }

      arrangeShiftdefintionGreater.sort((a,b) => a.startTime.localeCompare(b.startTime));
      arrangeShiftdefintionLess.sort((a,b) => a.startTime.localeCompare(b.startTime));
      this.work_load_data=[]
      var final_work_load_data=[]
      // this.work_load_data.push(this.arrangeShiftdefintionG)
      for(var i=0;i<arrangeShiftdefintionGreater.length;i++){
        final_work_load_data.push(arrangeShiftdefintionGreater[i])
      }
      for(var i=0;i<arrangeShiftdefintionLess.length;i++){
        final_work_load_data.push(arrangeShiftdefintionLess[i])
      }
    }

  if(this.outliers.length>0){
  this.work_load_data=final_work_load_data

  this.allWorkLoadData.setValue(this.work_load_data)
  }  else{
  this.work_load_data=dataset

  this.allWorkLoadData.setValue(this.work_load_data)
  }
  var allShiftDataInclude=[]
  for(var i=0;i<this.work_load_data.length;i++){

  if(this.work_load_data[i].sh_include_exclude=="I"){

  const temp= {"id": this.work_load_data[i].id,
  "startTime": this.work_load_data[i].startTime,

  "Sun": this.work_load_data[i].Sun,
  "Mon": this.work_load_data[i].Mon,
  "Tue": this.work_load_data[i].Tue,
  "Wed": this.work_load_data[i].Wed,
  "Thu": this.work_load_data[i].Thu,
  "Fri": this.work_load_data[i].Fri,
  "Sat": this.work_load_data[i].Sat,
  "shift_duration":this.work_load_data[i].shift_duration,
  "shiftName":this.work_load_data[i].shiftName,
  "shiftCategory":this.work_load_data[i].shiftCategory,
  "shift_created_by":this.work_load_data[i].shift_created_by}

  allShiftDataInclude.push(temp)
  }
  }
        var countMid=0; var countDay=0; var countEve=0;var countSysMid=0; var countSysDay=0; var countSysEve=0
        for(var i=0;i<allShiftDataInclude.length;i++){
          if(Number(allShiftDataInclude[i].shiftCategory)==1 && allShiftDataInclude[i].shift_created_by=='system'){
            countMid= countMid+ + +1
            countSysMid=countSysMid+ + + 1
          }
          else if(Number(allShiftDataInclude[i].shiftCategory)==2 && allShiftDataInclude[i].shift_created_by=='system'){
            countEve= countEve+ + +1
            countSysEve=countSysEve+ + + 1
          }
          else if(Number(allShiftDataInclude[i].shiftCategory)==3 && allShiftDataInclude[i].shift_created_by=='system'){
            countDay= countDay+ + +1
            countSysDay=countSysDay+ + + 1
          }
          else if(Number(allShiftDataInclude[i].shiftCategory)==1 && allShiftDataInclude[i].shift_created_by!='system'){
            countMid= countMid+ + +1
          }
          else if(Number(allShiftDataInclude[i].shiftCategory)==2 && allShiftDataInclude[i].shift_created_by!='system'){
            countEve= countEve+ + +1
          }
          else if(Number(allShiftDataInclude[i].shiftCategory)==3 && allShiftDataInclude[i].shift_created_by!='system'){
            countDay= countDay+ + +1
          }
        }
  if(countMid<5 && countDay<5 &&countEve<5){
  this.max_shift_validation=true
  }else{
  this.max_shift_validation=false
  }
        if(countSysMid>0 && countSysDay>0 &&countSysEve>0){
            this.shiftValidation=true
        }else{
          this.shiftValidation=false
        }

        this.wLdata=[]
        this.wLdata1=[]
        this.workload=[]
        var work_load=[]
  var all_work_load=this.workLoadForm.value

  for(var i=0;i<all_work_load.allWorkLoadData.length;i++){
  if(all_work_load.allWorkLoadData[i].sh_include_exclude=='I'){
    work_load.push(all_work_load.allWorkLoadData[i])
  }
  }

  this.wLdata=work_load
        this.totalSunDay=0;this.totalMonDay=0;this.totalTueDay=0;this.totalWedDay=0;this.totalThuDay=0;this.totalFriDay=0;this.totalSatDay=0;
        this.totalSunEve=0;this.totalMonEve=0; this.totalTueEve=0;this.totalWedEve=0; this.totalThuEve=0;this.totalFriEve=0;this.totalSatEve=0;
        this.totalSunMid=0;this.totalMonMid=0; this.totalTueMid=0;this.totalWedMid=0; this.totalThuMid=0;this.totalFriMid=0;this.totalSatMid=0;
        this.totalSunDayEve=0;this.totalMonDayEve=0;this.totalTueDayEve=0;this.totalWedDayEve=0;this.totalThuDayEve=0;this.totalFriDayEve=0;this.totalSatDayEve=0;
        this.totalSunEveMid=0;this.totalMonEveMid=0; this.totalTueEveMid=0;this.totalWedEveMid=0; this.totalThuEveMid=0;this.totalFriEveMid=0;this.totalSatEveMid=0;
  this.totalSunMidDay=0;this.totalMonMidDay=0; this.totalTueMidDay=0;this.totalWedMidDay=0; this.totalThuMidDay=0;this.totalFriMidDay=0;this.totalSatMidDay=0;
        this.totalSun=0;this.totalMon=0; this.totalTue=0;this.totalWed=0; this.totalThu=0;this.totalFri=0;this.totalSat=0;
        for(var i=0;i<this.wLdata.length;i++)
        {


          if(this.wLdata[i].shiftCategory==1)
          {

            // if() ){


            this.totalSunMid=+Number(this.wLdata[i].Sun)+ + +this.totalSunMid,
            this.totalMonMid=+Number(this.wLdata[i].Mon)+ + +this.totalMonMid,
            this.totalTueMid=+Number(this.wLdata[i].Tue)+ + +this.totalTueMid,
            this.totalWedMid=+Number(this.wLdata[i].Wed)+ + +this.totalWedMid,
            this.totalThuMid=+Number(this.wLdata[i].Thu)+ + +this.totalThuMid,
            this.totalFriMid=+Number(this.wLdata[i].Fri)+ + +this.totalFriMid,
            this.totalSatMid=+Number(this.wLdata[i].Sat)+ + +this.totalSatMid
          // }
        }
          else if(this.wLdata[i].shiftCategory==3){

            this.totalSunDay=+Number(this.wLdata[i].Sun)+ + +this.totalSunDay
            this.totalMonDay=+Number(this.wLdata[i].Mon)+ + +this.totalMonDay,
            this.totalTueDay=+Number(this.wLdata[i].Tue)+ + +this.totalTueDay,
            this.totalWedDay=+Number(this.wLdata[i].Wed)+ + +this.totalWedDay,
            this.totalThuDay=+Number(this.wLdata[i].Thu)+ + +this.totalThuDay,
            this.totalFriDay=+Number(this.wLdata[i].Fri)+ + +this.totalFriDay,
            this.totalSatDay=+Number(this.wLdata[i].Sat)+ + +this.totalSatDay
          }
          else if(this.wLdata[i].shiftCategory==2){

            this.totalSunEve=+Number(this.wLdata[i].Sun)+ + +this.totalSunEve
          this.totalMonEve=+Number(this.wLdata[i].Mon)+ + +this.totalMonEve,
          this.totalTueEve=+Number(this.wLdata[i].Tue)+ + +this.totalTueEve,
          this.totalWedEve=+Number(this.wLdata[i].Wed)+ + +this.totalWedEve,
          this.totalThuEve=+Number(this.wLdata[i].Thu)+ + +this.totalThuEve,
          this.totalFriEve=+Number(this.wLdata[i].Fri)+ + +this.totalFriEve,
          this.totalSatEve=+Number(this.wLdata[i].Sat)+ + +this.totalSatEve
        }
        else if(this.wLdata[i].shiftCategory==4){

          this.totalSunMidDay=+Number(this.wLdata[i].Sun)+ + +this.totalSunMidDay
        this.totalMonMidDay=+Number(this.wLdata[i].Mon)+ + +this.totalMonMidDay,
        this.totalTueMidDay=+Number(this.wLdata[i].Tue)+ + +this.totalTueMidDay,
        this.totalWedMidDay=+Number(this.wLdata[i].Wed)+ + +this.totalWedMidDay,
        this.totalThuMidDay=+Number(this.wLdata[i].Thu)+ + +this.totalThuMidDay,
        this.totalFriMidDay=+Number(this.wLdata[i].Fri)+ + +this.totalFriMidDay,
        this.totalSatMidDay=+Number(this.wLdata[i].Sat)+ + +this.totalSatMidDay
      }
      else if(this.wLdata[i].shiftCategory==5){

        this.totalSunDayEve=+Number(this.wLdata[i].Sun)+ + +this.totalSunDayEve
      this.totalMonDayEve=+Number(this.wLdata[i].Mon)+ + +this.totalMonDayEve,
      this.totalTueDayEve=+Number(this.wLdata[i].Tue)+ + +this.totalTueDayEve,
      this.totalWedDayEve=+Number(this.wLdata[i].Wed)+ + +this.totalWedDayEve,
      this.totalThuDayEve=+Number(this.wLdata[i].Thu)+ + +this.totalThuDayEve,
      this.totalFriDayEve=+Number(this.wLdata[i].Fri)+ + +this.totalFriDayEve,
      this.totalSatDayEve=+Number(this.wLdata[i].Sat)+ + +this.totalSatDayEve
    }
    else if(this.wLdata[i].shiftCategory==6){

      this.totalSunEveMid=+Number(this.wLdata[i].Sun)+ + +this.totalSunEveMid
                  this.totalMonEveMid=+Number(this.wLdata[i].Mon)+ + +this.totalMonEveMid,
                  this.totalTueEveMid=+Number(this.wLdata[i].Tue)+ + +this.totalTueEveMid,
                  this.totalWedEveMid=+Number(this.wLdata[i].Wed)+ + +this.totalWedEveMid,
                  this.totalThuEveMid=+Number(this.wLdata[i].Thu)+ + +this.totalThuEveMid,
                  this.totalFriEveMid=+Number(this.wLdata[i].Fri)+ + +this.totalFriEveMid,
                  this.totalSatEveMid=+Number(this.wLdata[i].Sat)+ + +this.totalSatEveMid
  }
        // }

                      }
                      for(var i=0;i<this.wLdata.length;i++)
                      {
                        if(Number(this.wLdata[i].startTime)==2300){
                          this.workLoad23=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                        }else if(Number(this.wLdata[i].startTime)==600){
                          this.workLoad6=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                        }else if(Number(this.wLdata[i].startTime)==700){
                          this.workLoad7=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                        }else if(Number(this.wLdata[i].startTime)==1300){
                          this.workLoad13=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                        }else if(Number(this.wLdata[i].startTime)==1500){
                          this.workLoad15=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                        }
                      }
                      for(var i=0;i<this.wLdata.length;i++)
                      {
                          this.work_Load=[this.wLdata[i].startTime,this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                          this.workload.push(this.work_Load)
                      }
                      this.totalSun= this.totalSunDay+ + +this.totalSunMid+ + +this.totalSunEve+ + +this.totalSunDayEve+ + +this.totalSunEveMid+ + +this.totalSunMidDay
                      this.totalMon= this.totalMonDay+ + +this.totalMonMid+ + +this.totalMonEve+ + +this.totalMonDayEve+ + +this.totalMonEveMid+ + +this.totalMonMidDay
                      this.totalTue= this.totalTueDay+ + +this.totalTueMid+ + +this.totalTueEve+ + +this.totalTueDayEve+ + +this.totalTueEveMid+ + +this.totalTueMidDay
                      this.totalWed= this.totalWedDay+ + +this.totalWedMid+ + +this.totalWedEve+ + +this.totalWedDayEve+ + +this.totalWedEveMid+ + +this.totalWedMidDay
                      this.totalThu= this.totalThuDay+ + +this.totalThuMid+ + +this.totalThuEve+ + +this.totalThuDayEve+ + +this.totalThuEveMid+ + +this.totalThuMidDay
                      this.totalFri= this.totalFriDay+ + +this.totalFriMid+ + +this.totalFriEve+ + +this.totalFriDayEve+ + +this.totalFriEveMid+ + +this.totalFriMidDay
                      this.totalSat= this.totalSatDay+ + +this.totalSatMid+ + +this.totalSatEve+ + +this.totalSatDayEve+ + +this.totalSatEveMid+ + +this.totalSatMidDay
                      if(this.selected_shift_duration==8){
                        this.totalComputedWorkForce= (this.totalSun + + +this.totalMon + + +this.totalTue + + +this.totalWed + + +this.totalThu + + +this.totalFri + + +this.totalSat)/5
                      }else{
                        this.totalComputedWorkForce= (this.totalSun + + +this.totalMon + + +this.totalTue + + +this.totalWed + + +this.totalThu + + +this.totalFri + + +this.totalSat)/4
                      }


          // this.totalComputedWorkForce=this.totalComputedWorkForce.toFixed()
          this.totalComputedWorkForce=Math.ceil(this.totalComputedWorkForce)
          this.totalRequireworkforceForm = this.formBuilder.group({
            TotalRequiredWorkForce:[this.totalComputedWorkForce],
          })
          this.result=this.totalComputedWorkForce
      this.workPatternDayForm = this.formBuilder.group({
            day1:new FormControl(this.temp1),
            day2:new FormControl(this.temp2),
            day3:new FormControl(this.temp3),
            day4:new FormControl(this.temp4),
            day5:new FormControl(this.temp5),
        })
        this.updatedWorkPattern=[this.day1.value,this.day2.value,this.day3.value,this.day4.value,this.day5.value]

        if(this.selected_shift_duration==8){
          this.updatedWorkPattern=[this.day1.value,this.day2.value,this.day3.value,this.day4.value,this.day5.value]
          this.PWP=[this.updatedWorkPattern[0].substring(0,3),this.updatedWorkPattern[1].substring(0,3),this.updatedWorkPattern[2].substring(0,3),this.updatedWorkPattern[3].substring(0,3),this.updatedWorkPattern[4].substring(0,3)]
          this.PSO=[this.updatedWorkPattern[0].substring(3),this.updatedWorkPattern[1].substring(3),this.updatedWorkPattern[2].substring(3),this.updatedWorkPattern[3].substring(3),this.updatedWorkPattern[4].substring(3)]
         }else{
          this.updatedWorkPattern=[this.day1.value,this.day2.value,this.day3.value,this.day4.value]
          this.PWP=[this.updatedWorkPattern[0].substring(0,3),this.updatedWorkPattern[1].substring(0,3),this.updatedWorkPattern[2].substring(0,3),this.updatedWorkPattern[3].substring(0,3)]
          this.PSO=[this.updatedWorkPattern[0].substring(3),this.updatedWorkPattern[1].substring(3),this.updatedWorkPattern[2].substring(3),this.updatedWorkPattern[3].substring(3)]
         }

      return this.totalSunDay,this.totalMonDay,this.totalTueDay,this.totalWedDay,this.totalThuDay,this.totalFriDay,this.totalSatDay,+
      +this.totalSunMid,this.totalMonMid,this.totalTueMid,this.totalWedMid,this.totalThuMid,this.totalFriMid,this.totalSatMid+
      +this.totalSunEve,this.totalMonEve,this.totalTueEve,this.totalWedEve,this.totalThuEve,this.totalFriEve,this.totalSatEve+
      +this.totalSun,this.totalMon,this.totalTue,this.totalWed,this.totalThu,this.totalFri,this.totalSat
  }

  get TotalRequiredWorkForce(){
  return  this.totalRequireworkforceForm.get("TotalRequiredWorkForce")
  }
  get allWorkLoadData() : FormArray {
  return this.workLoadForm.get("allWorkLoadData") as FormArray
  }

  numberOnlyValidation(event: any) {
  const pattern = /^[0-9]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {
    // invalid character, prevent input

    event.preventDefault();

  }

  }
  testT(index){

  }
newWorkLoadData(): FormGroup {
 return this.formBuilder.group({
   id:new FormControl(),
   startTime:new FormControl(),
   Sun:new FormControl("",Validators.compose([ Validators.min(0), Validators.pattern('^[0-9]*$')])),
   Mon:new FormControl("",Validators.compose([ Validators.min(0), Validators.pattern('^[0-9]*$')])),
   Tue:new FormControl("",Validators.compose([ Validators.min(0), Validators.pattern('^[0-9]*$')])),
   Wed:new FormControl("",Validators.compose([Validators.min(0), Validators.pattern('^[0-9]*$')])),
   Thu:new FormControl("",Validators.compose([ Validators.min(0), Validators.pattern('^[0-9]*$')])),
   Fri:new FormControl("",Validators.compose([, Validators.min(0), Validators.pattern('^[0-9]*$')])),
   Sat:new FormControl("",Validators.compose([ Validators.min(0), Validators.pattern('^[0-9]*$')])),
   shift_duration:new FormControl(),
   shiftName:new FormControl(),
   shiftCategory:new FormControl(),
   shift_created_by:new FormControl(),
   sh_include_exclude:new FormControl(),
   sunOutlier:new FormControl(),
   monOutlier:new FormControl(),
   tueOutlier:new FormControl(),
   wedOutlier:new FormControl(),
   thuOutlier:new FormControl(),
   friOutlier:new FormControl(),
   satOutlier:new FormControl()


 })

}
checkShiftDefintion(con: AbstractControl){
       return ({ emailIsTaken: false })
}
checkValidEmail(con: AbstractControl) {
   if (con.value===0 || con.value==='0') {
     return ({ emailIsTaken: true })
   }
 }


get day1(){
 return this.workPatternDayForm.get('day1')
}
get day2(){
 return this.workPatternDayForm.get('day2')
}
get day3(){
 return this.workPatternDayForm.get('day3')
}
get day4(){
 return this.workPatternDayForm.get('day4')
}
get day5(){
 return this.workPatternDayForm.get('day5')
}



@HostListener("focus")
changeSun( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
this.tempSun=(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun
 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];

(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }

}
@HostListener("focus")
changeMon( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
 this.tempMon= (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon
 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Mon": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }
}
@HostListener("focus")
changeTue( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
 this.tempTue= (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue
 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Tue": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }
}
@HostListener("focus")
changeWed( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
 this.tempWed= (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed
 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Wed": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }
}
@HostListener("focus")
changeThu( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
 this.tempThu= (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu
 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Thu": "","Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];

(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }
}
@HostListener("focus")
changeFri( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
 this.tempFri= (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri
 this.selectedShift=[{"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Fri": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];

(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }
}
@HostListener("focus")
changeSat( index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude=='I'){
 this.tempSat= (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat
 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Sat": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];

(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,sunOutlier:this.selectedShift[0].sunOutlier,monOutlier:this.selectedShift[0].monOutlier,tueOutlier:this.selectedShift[0].tueOutlier,wedOutlier:this.selectedShift[0].wedOutlier,thuOutlier:this.selectedShift[0].thuOutlier,friOutlier:this.selectedShift[0].friOutlier,satOutlier:this.selectedShift[0].satOutlier,sh_include_exclude:this.selectedShift[0].sh_include_exclude,shift_duration:this.selectedShift[0].shift_duration});
 }
}


onFocusOutSun(index){

if(((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun==''))
{
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun===0){

   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": "0","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory}];

 }else{
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory}];
 (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.tempSun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration})
 }

}else{

 this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
// (this.selectedShift);

if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier==true){
 this.countSunOutlier=this.countSunOutlier+ - + 1;
}

(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":false,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration})
}
this.updateWorkLoad()
}


onFocusOutMon(index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon=='')
{ if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon===0)
 {
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Mon": "0","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];

// (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.tempMon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory});
 }else{
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Mon": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];

   (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.tempMon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }

}else{  this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier==true){
   this.countMonOutlier=this.countMonOutlier+ - + 1;
 }
 (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": false,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration})
}
 this.updateWorkLoad()


}
onFocusOutTue(index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue=='')
 {
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue===0){
     this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Tue": "0","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   } else{
     this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Tue": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   // (this.selectedShift);
   (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.tempTue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
   }

 }else{  this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier==true){
   this.countTueOutlier=this.countTueOutlier+ - + 1;
 }
 (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": false,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }
 this.updateWorkLoad()
}
onFocusOutWed(index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed=='')
 {
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed===0){
     this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Wed": "0","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   }else{
     this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Wed": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
 // (this.selectedShift);
     (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.tempWed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
   }
 }else{  this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier==true){
   this.countWedOutlier=this.countWedOutlier+ - + 1;
 }
 (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": false,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }
 this.updateWorkLoad()
 }
onFocusOutThu(index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu=='')
 {
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu===0){
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Thu": "0","Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
 }
 else{
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Thu": "","Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.tempThu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }
 }else{
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier==true){
     this.countThuOutlier=this.countThuOutlier+ - + 1;
   }
   (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": false,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }
 this.updateWorkLoad()
 }
onFocusOutFri(index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri=='')
 {
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri===0){
     this.selectedShift=[{"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Fri": "0","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   }else{
     this.selectedShift=[{"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Fri": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
     (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.tempFri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
   }
 }else{
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier==true){
     this.countFriOutlier=this.countFriOutlier+ - + 1;
   }
   (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": false,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }
 this.updateWorkLoad()
 }
onFocusOutSat(index){
 if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat==null ||(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat=='')
 {
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat===0){
     this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Sat": "0","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   } else{
     this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Sat": "","Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
     (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.tempSat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
   }
 }else{
   this.selectedShift=[{"Fri": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Fri,"Mon": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Mon,"Sat": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sat,"Sun": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Sun,"Thu": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Thu,"Tue": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Tue,"Wed": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.Wed,"id": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.id,"shiftName": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftName,"shift_created_by": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_created_by,"startTime": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.startTime,"shiftCategory": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shiftCategory,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration}];
   if((<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.satOutlier==true){
     this.countSatOutlier=this.countSatOutlier+ - + 1;
   }
   (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).setValue({Fri: this.selectedShift[0].Fri,Mon: this.selectedShift[0].Mon,Sat: this.selectedShift[0].Sat,Sun: this.selectedShift[0].Sun,Thu: this.selectedShift[0].Thu,Tue: this.selectedShift[0].Tue,Wed: this.selectedShift[0].Wed,id: this.selectedShift[0].id,shiftName: this.selectedShift[0].shiftName,shift_created_by: this.selectedShift[0].shift_created_by,startTime: this.selectedShift[0].startTime,shiftCategory:this.selectedShift[0].shiftCategory,"sunOutlier":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sunOutlier,"monOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.monOutlier,"tueOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.tueOutlier,"wedOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.wedOutlier,"thuOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.thuOutlier,"friOutlier": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.friOutlier,"satOutlier": false,"sh_include_exclude": (<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.sh_include_exclude,"shift_duration":(<FormArray>this.workLoadForm.controls['allWorkLoadData']).at(index).value.shift_duration});
 }
 this.updateWorkLoad()
 }
  updateWorkPattern(check){
      this.work_load_data=this.workLoadForm.value.allWorkLoadData
      var work_load_data=[],workload_data=[]
      work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
      workload_data=this.work_load_data
      for(var i=0;i<work_load_data.length;i++){
        if(this.selected_shift_duration!=work_load_data[i].shift_duration){
          workload_data.push(work_load_data[i])
        }
      }
      localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(workload_data))
     if(this.selected_shift_duration==8){
        if(this.day1.value!=''&&this.day2.value!=''&&this.day3.value!=''&&this.day4.value!=''&&this.day5.value!=''){
          this.oldUpdatedWorkPattern=this.updatedWorkPattern
      }
     }else{
      if(this.day1.value!=''&&this.day2.value!=''&&this.day3.value!=''&&this.day4.value!=''){
        this.oldUpdatedWorkPattern=this.updatedWorkPattern
    }
     }


      this.updatedWorkPattern=[this.day1.value,this.day2.value,this.day3.value,this.day4.value,this.day5.value]
       this.PWP=[this.updatedWorkPattern[0].substring(0,3),this.updatedWorkPattern[1].substring(0,3),this.updatedWorkPattern[2].substring(0,3),this.updatedWorkPattern[3].substring(0,3),this.updatedWorkPattern[4].substring(0,3)]
       this.PSO=[this.updatedWorkPattern[0].substring(3),this.updatedWorkPattern[1].substring(3),this.updatedWorkPattern[2].substring(3),this.updatedWorkPattern[3].substring(3),this.updatedWorkPattern[4].substring(3)]
       var updated_day1_work_pattern="",updated_day2_work_pattern="",updated_day3_work_pattern="",updated_day4_work_pattern="",updated_day5_work_pattern=""
         for(var i=0;i<this.allShiftName.length;i++){
           if(this.updatedWorkPattern[0]==this.allShiftName[i].shiftPattern){
             updated_day1_work_pattern=this.updatedWorkPattern[0]
           }
           if(this.updatedWorkPattern[1]==this.allShiftName[i].shiftPattern){
             updated_day2_work_pattern=this.updatedWorkPattern[1]
           }
           if(this.updatedWorkPattern[2]==this.allShiftName[i].shiftPattern){
             updated_day3_work_pattern=this.updatedWorkPattern[2]
           }
           if(this.updatedWorkPattern[3]==this.allShiftName[i].shiftPattern){
             updated_day4_work_pattern=this.updatedWorkPattern[3]
           }
           if(this.updatedWorkPattern[4]==this.allShiftName[i].shiftPattern){
             updated_day5_work_pattern=this.updatedWorkPattern[4]
           }

         }
         if(this.selected_shift_duration==8){
          this.updatedWorkPattern=[updated_day1_work_pattern,updated_day2_work_pattern,updated_day3_work_pattern,updated_day4_work_pattern,updated_day5_work_pattern]
          if(check==true){

          }
          this.PWP=[this.updatedWorkPattern[0].substring(0,3),this.updatedWorkPattern[1].substring(0,3),this.updatedWorkPattern[2].substring(0,3),this.updatedWorkPattern[3].substring(0,3),this.updatedWorkPattern[4].substring(0,3)]
          this.PSO=[this.updatedWorkPattern[0].substring(3),this.updatedWorkPattern[1].substring(3),this.updatedWorkPattern[2].substring(3),this.updatedWorkPattern[3].substring(3),this.updatedWorkPattern[4].substring(3)]
         }else{
          this.updatedWorkPattern=[updated_day1_work_pattern,updated_day2_work_pattern,updated_day3_work_pattern,updated_day4_work_pattern,updated_day5_work_pattern]
          this.PWP=[this.updatedWorkPattern[0].substring(0,3),this.updatedWorkPattern[1].substring(0,3),this.updatedWorkPattern[2].substring(0,3),this.updatedWorkPattern[3].substring(0,3)]
          this.PSO=[this.updatedWorkPattern[0].substring(3),this.updatedWorkPattern[1].substring(3),this.updatedWorkPattern[2].substring(3),this.updatedWorkPattern[3].substring(3)]
         }
         localStorage.setItem('PWP-PSO',JSON.stringify({"PWP":this.PWP,"PSO":this.PSO}))

 this.ngOnInit()
}
updateWorkLoad(){

 this.wLdata=[]
 this.wLdata1=[]
 this.workload=[]
var work_load=[]
var all_work_load=this.workLoadForm.value

for(var i=0;i<all_work_load.allWorkLoadData.length;i++){
 if(all_work_load.allWorkLoadData[i].sh_include_exclude=='I'){
   work_load.push(all_work_load.allWorkLoadData[i])
 }
}

 this.wLdata=work_load


 this.totalSunDay=0;this.totalMonDay=0;this.totalTueDay=0;this.totalWedDay=0;this.totalThuDay=0;this.totalFriDay=0;this.totalSatDay=0;
 this.totalSunEve=0;this.totalMonEve=0; this.totalTueEve=0;this.totalWedEve=0; this.totalThuEve=0;this.totalFriEve=0;this.totalSatEve=0;
 this.totalSunMid=0;this.totalMonMid=0; this.totalTueMid=0;this.totalWedMid=0; this.totalThuMid=0;this.totalFriMid=0;this.totalSatMid=0;
 this.totalSunDayEve=0;this.totalMonDayEve=0;this.totalTueDayEve=0;this.totalWedDayEve=0;this.totalThuDayEve=0;this.totalFriDayEve=0;this.totalSatDayEve=0;
       this.totalSunEveMid=0;this.totalMonEveMid=0; this.totalTueEveMid=0;this.totalWedEveMid=0; this.totalThuEveMid=0;this.totalFriEveMid=0;this.totalSatEveMid=0;
 this.totalSunMidDay=0;this.totalMonMidDay=0; this.totalTueMidDay=0;this.totalWedMidDay=0; this.totalThuMidDay=0;this.totalFriMidDay=0;this.totalSatMidDay=0;
 this.totalSun=0;this.totalMon=0; this.totalTue=0;this.totalWed=0; this.totalThu=0;this.totalFri=0;this.totalSat=0;


               for(var i=0;i<this.wLdata.length;i++)
               {



                     if(this.wLdata[i].shiftCategory==1)
                     {

                       // if() ){


                       this.totalSunMid=+Number(this.wLdata[i].Sun)+ + +this.totalSunMid,
                       this.totalMonMid=+Number(this.wLdata[i].Mon)+ + +this.totalMonMid,
                       this.totalTueMid=+Number(this.wLdata[i].Tue)+ + +this.totalTueMid,
                       this.totalWedMid=+Number(this.wLdata[i].Wed)+ + +this.totalWedMid,
                       this.totalThuMid=+Number(this.wLdata[i].Thu)+ + +this.totalThuMid,
                       this.totalFriMid=+Number(this.wLdata[i].Fri)+ + +this.totalFriMid,
                       this.totalSatMid=+Number(this.wLdata[i].Sat)+ + +this.totalSatMid
                     // }
                   }
                     else if(this.wLdata[i].shiftCategory==3){

                       this.totalSunDay=+Number(this.wLdata[i].Sun)+ + +this.totalSunDay
                       this.totalMonDay=+Number(this.wLdata[i].Mon)+ + +this.totalMonDay,
                       this.totalTueDay=+Number(this.wLdata[i].Tue)+ + +this.totalTueDay,
                       this.totalWedDay=+Number(this.wLdata[i].Wed)+ + +this.totalWedDay,
                       this.totalThuDay=+Number(this.wLdata[i].Thu)+ + +this.totalThuDay,
                       this.totalFriDay=+Number(this.wLdata[i].Fri)+ + +this.totalFriDay,
                       this.totalSatDay=+Number(this.wLdata[i].Sat)+ + +this.totalSatDay
                     }
                     else if(this.wLdata[i].shiftCategory==2){

                       this.totalSunEve=+Number(this.wLdata[i].Sun)+ + +this.totalSunEve
                     this.totalMonEve=+Number(this.wLdata[i].Mon)+ + +this.totalMonEve,
                     this.totalTueEve=+Number(this.wLdata[i].Tue)+ + +this.totalTueEve,
                     this.totalWedEve=+Number(this.wLdata[i].Wed)+ + +this.totalWedEve,
                     this.totalThuEve=+Number(this.wLdata[i].Thu)+ + +this.totalThuEve,
                     this.totalFriEve=+Number(this.wLdata[i].Fri)+ + +this.totalFriEve,
                     this.totalSatEve=+Number(this.wLdata[i].Sat)+ + +this.totalSatEve
                   }
                   else if(this.wLdata[i].shiftCategory==4){

                     this.totalSunMidDay=+Number(this.wLdata[i].Sun)+ + +this.totalSunMidDay
                   this.totalMonMidDay=+Number(this.wLdata[i].Mon)+ + +this.totalMonMidDay,
                   this.totalTueMidDay=+Number(this.wLdata[i].Tue)+ + +this.totalTueMidDay,
                   this.totalWedMidDay=+Number(this.wLdata[i].Wed)+ + +this.totalWedMidDay,
                   this.totalThuMidDay=+Number(this.wLdata[i].Thu)+ + +this.totalThuMidDay,
                   this.totalFriMidDay=+Number(this.wLdata[i].Fri)+ + +this.totalFriMidDay,
                   this.totalSatMidDay=+Number(this.wLdata[i].Sat)+ + +this.totalSatMidDay
                 }
                 else if(this.wLdata[i].shiftCategory==5){

                   this.totalSunDayEve=+Number(this.wLdata[i].Sun)+ + +this.totalSunDayEve
                 this.totalMonDayEve=+Number(this.wLdata[i].Mon)+ + +this.totalMonDayEve,
                 this.totalTueDayEve=+Number(this.wLdata[i].Tue)+ + +this.totalTueDayEve,
                 this.totalWedDayEve=+Number(this.wLdata[i].Wed)+ + +this.totalWedDayEve,
                 this.totalThuDayEve=+Number(this.wLdata[i].Thu)+ + +this.totalThuDayEve,
                 this.totalFriDayEve=+Number(this.wLdata[i].Fri)+ + +this.totalFriDayEve,
                 this.totalSatDayEve=+Number(this.wLdata[i].Sat)+ + +this.totalSatDayEve
                 }
                 else if(this.wLdata[i].shiftCategory==6){

                   this.totalSunEveMid=+Number(this.wLdata[i].Sun)+ + +this.totalSunEveMid
                 this.totalMonEveMid=+Number(this.wLdata[i].Mon)+ + +this.totalMonEveMid,
                 this.totalTueEveMid=+Number(this.wLdata[i].Tue)+ + +this.totalTueEveMid,
                 this.totalWedEveMid=+Number(this.wLdata[i].Wed)+ + +this.totalWedEveMid,
                 this.totalThuEveMid=+Number(this.wLdata[i].Thu)+ + +this.totalThuEveMid,
                 this.totalFriEveMid=+Number(this.wLdata[i].Fri)+ + +this.totalFriEveMid,
                 this.totalSatEveMid=+Number(this.wLdata[i].Sat)+ + +this.totalSatEveMid
                   }
               }
               this.totalSun= this.totalSunDay+ + +this.totalSunMid+ + +this.totalSunEve+ + +this.totalSunDayEve+ + +this.totalSunEveMid+ + +this.totalSunMidDay
                     this.totalMon= this.totalMonDay+ + +this.totalMonMid+ + +this.totalMonEve+ + +this.totalMonDayEve+ + +this.totalMonEveMid+ + +this.totalMonMidDay
                     this.totalTue= this.totalTueDay+ + +this.totalTueMid+ + +this.totalTueEve+ + +this.totalTueDayEve+ + +this.totalTueEveMid+ + +this.totalTueMidDay
                     this.totalWed= this.totalWedDay+ + +this.totalWedMid+ + +this.totalWedEve+ + +this.totalWedDayEve+ + +this.totalWedEveMid+ + +this.totalWedMidDay
                     this.totalThu= this.totalThuDay+ + +this.totalThuMid+ + +this.totalThuEve+ + +this.totalThuDayEve+ + +this.totalThuEveMid+ + +this.totalThuMidDay
                     this.totalFri= this.totalFriDay+ + +this.totalFriMid+ + +this.totalFriEve+ + +this.totalFriDayEve+ + +this.totalFriEveMid+ + +this.totalFriMidDay
                     this.totalSat= this.totalSatDay+ + +this.totalSatMid+ + +this.totalSatEve+ + +this.totalSatDayEve+ + +this.totalSatEveMid+ + +this.totalSatMidDay


                if(Number(this.selected_shift_duration)==8){
                  this.totalComputedWorkForce= (this.totalSun + + +this.totalMon + + +this.totalTue + + +this.totalWed + + +this.totalThu + + +this.totalFri + + +this.totalSat)/5
                }else{
                  this.totalComputedWorkForce= (this.totalSun + + +this.totalMon + + +this.totalTue + + +this.totalWed + + +this.totalThu + + +this.totalFri + + +this.totalSat)/4
                }
          this.totalComputedWorkForce=Math.ceil(this.totalComputedWorkForce)
          this.totalRequireworkforceForm = this.formBuilder.group({

            TotalRequiredWorkForce:[this.totalComputedWorkForce],
          })


   this.result=this.totalComputedWorkForce
   for(var i=0;i<this.wLdata.length;i++)
                     {
                       if(Number(this.wLdata[i].startTime)==2300){
                         this.workLoad23=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]

                       }else if(Number(this.wLdata[i].startTime)==600){
                         this.workLoad6=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]

                       }else if(Number(this.wLdata[i].startTime)==700){
                         this.workLoad7=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]

                       }else if(Number(this.wLdata[i].startTime)==1300){
                         this.workLoad13=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]

                       }else if(Number(this.wLdata[i].startTime)==1500){
                         this.workLoad15=[this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]

                       }
                     }
                     for(var i=0;i<this.wLdata.length;i++)
                     {
                         this.work_Load=[this.wLdata[i].startTime,this.wLdata[i].Sun,this.wLdata[i].Mon,this.wLdata[i].Tue,this.wLdata[i].Wed,this.wLdata[i].Thu,this.wLdata[i].Fri,this.wLdata[i].Sat]
                         this.workload.push(this.work_Load)
                     }


}
async daySummary(day_summary){

  var tempObj,final_mid_Summary=[],final_day_Summary=[],final_eve_Summary=[],mid_day_summary=[],day_eve_summary=[],eve_mid_summary=[]
  for(var i=0;i<this.wLdata.length;i++){
    tempObj={"defFri": 0,"defMon": 0,"defSat": 0,"defSun": 0,"defThu": 0,"defTue":0,"defWed": 0,
    "Fri": this.wLdata[i].Fri,"Mon": this.wLdata[i].Mon,"Sat": this.wLdata[i].Sat,"Sun": this.wLdata[i].Sun,"Thu":this.wLdata[i].Thu,"Tue": this.wLdata[i].Tue,"Wed":  this.wLdata[i].Wed
                ,"diffFri": 0,"diffMon": 0,"diffSat": 0,"diffSun": 0,"diffThu": 0,"diffTue": 0,"diffWed": 0,
                "shift_duration": Number(this.wLdata[i].shift_duration),
                "shiftTime": this.wLdata[i].startTime}
    if(this.wLdata[i].shiftCategory==1){
      final_mid_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==2){
      final_eve_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==3){
      final_day_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==4){
      mid_day_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==5){
      day_eve_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==6){
      eve_mid_summary.push(tempObj)
    }
  }
  const modal = await this.modalCtrl.create({
    component: MidSummaryComponent,
    componentProps: { summaryType:"day",summaryData:{"mid":final_mid_Summary,"day":final_day_Summary,"eve":final_eve_Summary,"mid_day":mid_day_summary,"day_eve":day_eve_summary,"eve_mid":eve_mid_summary},day:day_summary,default:true },
    cssClass: 'dayEditSummaryData',
    // cssClass: 'daySummaryData',
    swipeToClose:true
  });
  return await modal.present();

}
async midShiftsDetails(){
  var tempObj,final_mid_Summary=[],final_day_Summary=[],final_eve_Summary=[],mid_day_summary=[],day_eve_summary=[],eve_mid_summary=[]
  for(var i=0;i<this.wLdata.length;i++){
    tempObj={"defFri": 0,"defMon": 0,"defSat": 0,"defSun": 0,"defThu": 0,"defTue":0,"defWed": 0,
    "Fri": this.wLdata[i].Fri,"Mon": this.wLdata[i].Mon,"Sat": this.wLdata[i].Sat,"Sun": this.wLdata[i].Sun,"Thu":this.wLdata[i].Thu,"Tue": this.wLdata[i].Tue,"Wed":  this.wLdata[i].Wed
                ,"diffFri": 0,"diffMon": 0,"diffSat": 0,"diffSun": 0,"diffThu": 0,"diffTue": 0,"diffWed": 0,
                "shift_duration": Number(this.wLdata[i].shift_duration)
                ,"shiftTime": this.wLdata[i].startTime}
    if(this.wLdata[i].shiftCategory==1){
      final_mid_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==2){
      final_eve_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==3){
      final_day_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==4){
      mid_day_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==5){
      day_eve_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==6){
      eve_mid_summary.push(tempObj)
    }
  }
  const modal = await this.modalCtrl.create({
    component: MidSummaryComponent,
    cssClass: 'viewShiftData',
    swipeToClose:true,
    componentProps: { summaryType:"Mid Shift",summaryData:final_mid_Summary ,default:true }

  });
  return await modal.present();

}

async dayShiftsDetails(){
  var tempObj,final_mid_Summary=[],final_day_Summary=[],final_eve_Summary=[],mid_day_summary=[],day_eve_summary=[],eve_mid_summary=[]
  for(var i=0;i<this.wLdata.length;i++){
    tempObj={ "defFri": 0,"defMon": 0,"defSat": 0,"defSun": 0,"defThu": 0,"defTue":0,"defWed": 0,
    "Fri": this.wLdata[i].Fri,"Mon": this.wLdata[i].Mon,"Sat": this.wLdata[i].Sat,"Sun": this.wLdata[i].Sun,"Thu":this.wLdata[i].Thu,"Tue": this.wLdata[i].Tue,"Wed":  this.wLdata[i].Wed
                ,"diffFri": 0,"diffMon": 0,"diffSat": 0,"diffSun": 0,"diffThu": 0,"diffTue": 0,"diffWed": 0,
                "shift_duration": Number(this.wLdata[i].shift_duration)
                ,"shiftTime": this.wLdata[i].startTime}
    if(this.wLdata[i].shiftCategory==1){
      final_mid_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==2){
      final_eve_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==3){
      final_day_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==4){
      mid_day_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==5){
      day_eve_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==6){
      eve_mid_summary.push(tempObj)
    }
  }
  const modal = await this.modalCtrl.create({
    component: MidSummaryComponent,
    cssClass: 'viewShiftData',
    swipeToClose:true,
    componentProps: { summaryType:"Day Shift",summaryData:final_day_Summary ,default:true }
    });
  return await modal.present();

}

async eveShiftsDetails(){
  var tempObj,final_mid_Summary=[],final_day_Summary=[],final_eve_Summary=[],mid_day_summary=[],day_eve_summary=[],eve_mid_summary=[]
  for(var i=0;i<this.wLdata.length;i++){
    tempObj={ "defFri": 0,"defMon": 0,"defSat": 0,"defSun": 0,"defThu": 0,"defTue":0,"defWed": 0,
                "Fri": this.wLdata[i].Fri,"Mon": this.wLdata[i].Mon,"Sat": this.wLdata[i].Sat,"Sun": this.wLdata[i].Sun,"Thu":this.wLdata[i].Thu,"Tue": this.wLdata[i].Tue,"Wed":  this.wLdata[i].Wed
                ,"diffFri":  0,"diffMon": 0,"diffSat": 0,"diffSun": 0,"diffThu": 0,"diffTue": 0,"diffWed": 0,
                "shift_duration": Number(this.wLdata[i].shift_duration)
                ,"shiftTime": this.wLdata[i].startTime}
    if(this.wLdata[i].shiftCategory==1){
      final_mid_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==2){
      final_eve_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==3){
      final_day_Summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==4){
      mid_day_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==5){
      day_eve_summary.push(tempObj)
    }else if(this.wLdata[i].shiftCategory==6){
      eve_mid_summary.push(tempObj)
    }
  }
  const modal = await this.modalCtrl.create({
    component: MidSummaryComponent,
    cssClass: 'viewShiftData',
    swipeToClose:true,
    componentProps: { summaryType:"Eve Shift",summaryData:final_eve_Summary,default:true }
    });
  return await modal.present();

}

ConvertStringToNumber(input: string) {
 var numeric = Number(input);
 return numeric;
}

co(e){

 for(var i=0;i<e.allWorkLoadData.length;i++){

   for(var j=0;j<this.work_load_data.length;j++){

     if(e.allWorkLoadData[i].id==this.work_load_data[j]?.id){
       if(e.allWorkLoadData[i].Sun==''){
         e.allWorkLoadData[i].Sun=this.work_load_data[j].Sun
     }
   }


   }
   this.allWorkLoadData.setValue(e.allWorkLoadData)
   }


}
 updateRequiredWorkLoadData()
 {

   this.a=this.totalRequireworkforceForm.value
   this.result=this.TotalRequiredWorkForce.value

 }
 test(){

 }
 async open(worData) {
   const modal = await this.modalCtrl.create({
     component: EditWorkLoadDataPage,
     cssClass: 'editWorkLoad',
     componentProps: { workLoadData: worData }
   });
   return await modal.present();
 }
 workDayModel = new WorkDay();

 async forwardOldGeneratedShiftLines(){
   if(JSON.parse(localStorage.getItem('customizedScheduleShiftLine'))==null){
     this.hide=false
 return this.headerTitleService.setForwardUrl(null);
     // this.navCtrl.navigateForward('workload-data-generate')
   }else{
     // this.navCtrl.navigateForward('workload-data-report-generate')
     // this.headerTitleService.setForwardUrl(true);
     return this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.generated_schedule_api);
   }
 }
 gotoNextField(nextElement){
  nextElement.setFocus();
}
 async addNewShiftDefinition(){
   if(this.checkUserAccess==true){
    this.work_load_data=this.workLoadForm.value.allWorkLoadData
    var work_load_data=[],workload_data=[]
    work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
    workload_data=this.work_load_data
    for(var i=0;i<work_load_data.length;i++){
      if(this.selected_shift_duration!=work_load_data[i].shift_duration){
       workload_data.push(work_load_data[i])
      }
    }
    localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(workload_data))
   const modal = await this.modalCtrl.create({
     component: CreateNewShiftDefintionPage,
     componentProps: { shift_duration:this.selected_shift_duration },
     cssClass: 'AddNewShiftDefintion',
     swipeToClose:true
   })
   modal.onDidDismiss().then(()=>{
    this.ngOnInit()
   })

   return await modal.present();
  }else{
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: "Sorry, you don't have access to create a new shift! Please upgrade your plan.",
      buttons: ['OK']
    });

    await alert.present();
  }
 }
 afterDelallShiftReqData=[]
 async removeItem(del_Shift){



           this.afterdeleteShiftdefs=[]
           this.deleteShiftdefs=[]
           this.afterDelallShiftReqData=[]
           var deletedShiftDef=[]
           var work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
           var allShiftReqData=JSON.parse(localStorage.getItem('allShiftRequiredData'))
            for(var j=0;j<work_load_data.length;j++){
              if( work_load_data[j].startTime==del_Shift.startTime && this.selected_shift_duration==work_load_data[j].shift_duration){
                deletedShiftDef.push(work_load_data[j])

                }else if( work_load_data[j].startTime!=del_Shift.startTime && this.selected_shift_duration==work_load_data[j].shift_duration){
                  this.afterdeleteShiftdefs.push(work_load_data[j])
                }else{
                  this.afterdeleteShiftdefs.push(work_load_data[j])
                }
            }
            for(var j=0;j<allShiftReqData.length;j++){
              if( allShiftReqData[j].startTime==del_Shift.startTime && this.selected_shift_duration==allShiftReqData[j].shift_duration){
                // deletedShiftDef.push(allShiftReqData[j])

                }else if( allShiftReqData[j].startTime!=del_Shift.startTime && this.selected_shift_duration==allShiftReqData[j].shift_duration){
                  this.afterDelallShiftReqData.push(allShiftReqData[j])
                }else{
                  this.afterDelallShiftReqData.push(allShiftReqData[j])
                }
            }
// this.getSchedule()
var temp=[]
temp=this.checkShiftDefInSchedule(deletedShiftDef)

if(temp.length>0){
          const confirm = await this.alertCtrl.create({
            header: 'Alert',
            message: "Can't delete the Shift because it is included in a Shiftline Schedule.",
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {

                }
              },

          ]
          })
          await confirm.present();
        }else{
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
                handler: async () => {

            localStorage.setItem('allShiftRequiredData',JSON.stringify(this.afterDelallShiftReqData))
            localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(this.afterdeleteShiftdefs))
                this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(
                  (res)=>{
                    for(var i=0;i<res.length;i++){
                      if(res[i].sh_name==del_Shift.shiftName){
                        this.shiftDefSer.deleteShiftDefinition(res[i]?.sh_id).subscribe(
                          (res)=>{

                            this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(
                              async (res)=>{
                                this.allShift=res;
                                localStorage.setItem('allShift',JSON.stringify(this.allShift))
                                localStorage.removeItem('customizedScheduleShiftLine')
                                // location.reload();
                                const alert = await this.alertCtrl.create({
                                  cssClass: 'my-custom-class',
                                  header: 'Alert',
                                  message: "Successfully deleted!!!",
                                  buttons: ['OK']
                                });
                                await alert.present();
                                this.ngOnInit()
                              })
                          })
                      }
                    }


             },
           (error: any)=>{this.errorMsg=error
           console.log(this.errorMsg)}
           );
          }
        }]
      })
      await confirm.present();

        }


 }
 checkShiftDefInSchedule(deletedShiftDef){
  var tempArr=[],temp,tempRArr=[]

  for(var i=0;i<this.all_schedule.length;i++){
    tempArr=[]
    for(var j=0;j<this.all_schedule[i].schild.length;j++){
      tempArr.push(this.all_schedule[i].schild[j].sun)
      tempArr.push(this.all_schedule[i].schild[j].mon)
      tempArr.push(this.all_schedule[i].schild[j].tue)
      tempArr.push(this.all_schedule[i].schild[j].wed)
      tempArr.push(this.all_schedule[i].schild[j].thu)
      tempArr.push(this.all_schedule[i].schild[j].fri)
      tempArr.push(this.all_schedule[i].schild[j].sat)
    }
    temp=tempArr.includes(deletedShiftDef[0].shiftName)
    if(temp===true){
      tempRArr.push(this.all_schedule[i])

    }

  }
  return tempRArr
 }
 getSchedule(){
  var tempObj={}
  var tempArr=[]
  var all_shift_data=[]
  this.scheduleService.getAllSchedule().subscribe((res)=>{

    for(var i=0;i<res.length;i++){
      if(Number(this.user_data.id)===Number(res[i].userid)){

        tempArr.push(res[i])
      }
    }

    var getAllScheduleName=[]
    for(var i=0;i<tempArr.length;i++){
      for(var j=0;j<tempArr.length;j++){
        if(getAllScheduleName[i]!==tempArr[j].schedulename){
          getAllScheduleName.push(tempArr[j].schedulename)

        }
      }
    }var unique = getAllScheduleName.filter(this.onlyUnique);

var tempArray=[],finalData=[]
var ob
    for(var i=0;i<unique.length;i++){
      tempArray=[]
      for(var j=0;j<tempArr.length;j++){
        if(tempArr[j].schedulename===unique[i]){
          tempArray.push(tempArr[j])
        }
      }
      ob={"schedule_name":unique[i],"customizedScheduleShiftLine":tempArray,"defaultScheduleShiftLine":tempArray,"allShiftRequiredData":all_shift_data}
      finalData.push(ob)

    }
    this.all_Schedule=[]
    for(var i=0;i<finalData.length;i++){
    if(this.all_Schedule==null){
        this.all_Schedule.push(finalData[i])
      }
      else{
        this.all_Schedule.push(finalData[i])
      }
    }

    this.all_schedule=this.all_Schedule

    // localStorage.setItem('allSchedule',JSON.stringify(this.all_schedule))
    return this.all_schedule

  },(error)=>{
    console.log(error)
  },()=>{
  })
}


 // includeExclude
 includeExcludeShift(wD){

       this.hide=false
       this.work_load_data=this.workLoadForm.value.allWorkLoadData

       this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(
         (res)=>{
           this.allShift=res;
           // let res=[]
           var user_all_shift=[]
           for(var i=0;i<this.allShift.length;i++){
             if(Number(this.allShift[i].userid)==Number(this.user_data.id)){
               user_all_shift.push(this.allShift[i])
             }
           }
           localStorage.setItem('allShift',JSON.stringify(user_all_shift))

         },

       (error: any)=>{this.errorMsg=error
       console.log(this.errorMsg)},
       ()=>{

       }
       );

       var all_user_defined_shift=  JSON.parse(localStorage.getItem('allShift'))
       var current_shift_data
       if(wD.shift_created_by!='system'){
       for(var j=0;j<this.work_load_data.length;j++){
         if(  this.work_load_data[j].id==wD.id && this.selected_shift_duration==this.work_load_data[j].shift_duration){
             for(var i=0;i<all_user_defined_shift.length;i++){
               if(String(wD.shiftName)===String(all_user_defined_shift[i].sh_name) &&  this.selected_shift_duration==this.work_load_data[j].shift_duration){
                 current_shift_data=all_user_defined_shift[i]
                 }
             }
           }
         }

       var shift_data
       if(current_shift_data.sh_include_exclude=="I"){
       shift_data={sh_activation_date: current_shift_data.sh_activation_date,
         sh_area_id: current_shift_data.sh_area_id,
         sh_category_id: current_shift_data.sh_category_id,
         sh_created_by: current_shift_data.sh_created_by,
         sh_duration: current_shift_data.sh_duration,
         sh_endtime: current_shift_data.sh_endtime,
         sh_expiration_date: current_shift_data.sh_expiration_date,
         sh_id: current_shift_data.sh_id,
         sh_include_exclude: "E",
         sh_name: current_shift_data.sh_name,
         sh_priority: current_shift_data.sh_priority,
         sh_starttime: current_shift_data.sh_starttime,
         userid: current_shift_data.userid
         }
       }else if(current_shift_data.sh_include_exclude=="E"){
         shift_data={sh_activation_date: current_shift_data.sh_activation_date,
           sh_area_id: current_shift_data.sh_area_id,
           sh_category_id: current_shift_data.sh_category_id,
           sh_created_by: current_shift_data.sh_created_by,
           sh_duration: current_shift_data.sh_duration,
           sh_endtime: current_shift_data.sh_endtime,
           sh_expiration_date: current_shift_data.sh_expiration_date,
           sh_id: current_shift_data.sh_id,
           sh_include_exclude: "I",
           sh_name: current_shift_data.sh_name,
           sh_priority: current_shift_data.sh_priority,
           sh_starttime: current_shift_data.sh_starttime,
           userid: current_shift_data.userid

         }

       }


      //  allShiftRequiredData
   var updated_shift_data_after_click_on_include_exclude=[]
   updated_shift_data_after_click_on_include_exclude=[]
   for(var i=0;i<this.work_load_data.length;i++){
     if(  this.work_load_data[i].id==wD.id){
       var current_updated_shift_data={"id": this.work_load_data[i].id,
           "startTime": this.work_load_data[i].startTime,
           "Sun": this.work_load_data[i].Sun,
           "Mon": this.work_load_data[i].Mon,
           "Tue": this.work_load_data[i].Tue,
           "Wed": this.work_load_data[i].Wed,
           "Thu": this.work_load_data[i].Thu,
           "Fri": this.work_load_data[i].Fri,
           "Sat": this.work_load_data[i].Sat,
           "shiftName":this.work_load_data[i].shiftName,
           "shift_duration":this.work_load_data[i].shift_duration,
           "shiftCategory":this.work_load_data[i].shiftCategory,
           "sh_include_exclude":shift_data.sh_include_exclude,
           "shift_created_by":this.work_load_data[i].shift_created_by,"sunOutlier":false,"monOutlier":false,"tueOutlier":false,"wedOutlier":false,"thuOutlier":false,"friOutlier":false,"satOutlier":false
         }
       updated_shift_data_after_click_on_include_exclude.push(current_updated_shift_data)

       }else if(  this.work_load_data[i].id!=wD.id){
         updated_shift_data_after_click_on_include_exclude.push(this.work_load_data[i])
       }
     }
     var work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
     for(var i=0;i<work_load_data.length;i++){
       if(this.selected_shift_duration!=work_load_data[i].shift_duration){
         updated_shift_data_after_click_on_include_exclude.push(work_load_data[i])
       }
     }
     localStorage.setItem('allShiftRequiredData',JSON.stringify(updated_shift_data_after_click_on_include_exclude))
     localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(updated_shift_data_after_click_on_include_exclude))
   this.includeExcludeSer.includeExcludeService(shift_data.sh_id,shift_data).subscribe(
     (res)=>{
       this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(
         (res)=>{
           this.allShift=res;
           var user_all_shift=[]
           for(var i=0;i<this.allShift.length;i++){
             if(Number(this.allShift[i].userid)==Number(this.user_data.id)){
               user_all_shift.push(this.allShift[i])
             }
           }
           localStorage.setItem('allShift',JSON.stringify(user_all_shift))

         },

       (error: any)=>{this.errorMsg=error
       console.log(this.errorMsg)},
       ()=>{

         this.ngOnInit()
         this.updateWorkPattern(false)
       }
       );

     })
   }else{

     if(wD.sh_include_exclude=="I"){
       shift_data={sh_include_exclude: "E"}
     }else if(wD.sh_include_exclude=="E"){
       shift_data={sh_include_exclude: "I"}
     }
       var updated_shift_data_after_click_on_include_exclude=[]
       updated_shift_data_after_click_on_include_exclude=[]
       for(var i=0;i<this.work_load_data.length;i++){
         if(  this.work_load_data[i].id==wD.id){
           var current_updated_shift_data={"id": this.work_load_data[i].id,
               "startTime": this.work_load_data[i].startTime,
               "Sun": this.work_load_data[i].Sun,
               "Mon": this.work_load_data[i].Mon,
               "Tue": this.work_load_data[i].Tue,
               "Wed": this.work_load_data[i].Wed,
               "Thu": this.work_load_data[i].Thu,
               "Fri": this.work_load_data[i].Fri,
               "Sat": this.work_load_data[i].Sat,
               "shift_duration":this.work_load_data[i].shift_duration,
               "shiftName":this.work_load_data[i].shiftName,
               "shiftCategory":this.work_load_data[i].shiftCategory,
               "sh_include_exclude":shift_data.sh_include_exclude,
               "shift_created_by":this.work_load_data[i].shift_created_by,"sunOutlier":false,"monOutlier":false,"tueOutlier":false,"wedOutlier":false,"thuOutlier":false,"friOutlier":false,"satOutlier":false
             }
           updated_shift_data_after_click_on_include_exclude.push(current_updated_shift_data)

           }else if(  this.work_load_data[i].id!=wD.id){
           updated_shift_data_after_click_on_include_exclude.push(this.work_load_data[i])
         }
       }
       var work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
     for(var i=0;i<work_load_data.length;i++){
       if(this.selected_shift_duration!=work_load_data[i].shift_duration){
         updated_shift_data_after_click_on_include_exclude.push(work_load_data[i])
       }
     }
       localStorage.setItem('allShiftRequiredData',JSON.stringify(updated_shift_data_after_click_on_include_exclude))
       localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(updated_shift_data_after_click_on_include_exclude))

       this.ngOnInit()

       this.updateWorkPattern(false)
       }
       var allShiftDataInclude=[]
var allShiftDataIncludeWithExclude=[]

this.work_load_data=this.workLoadForm.value.allWorkLoadData
for(var i=0;i<this.work_load_data.length;i++){

 if(this.work_load_data[i].sh_include_exclude=="I"){

 const temp= {"id": this.work_load_data[i].id,
 "startTime": this.work_load_data[i].startTime,

 "Sun": this.work_load_data[i].Sun,
 "Mon": this.work_load_data[i].Mon,
 "Tue": this.work_load_data[i].Tue,
 "Wed": this.work_load_data[i].Wed,
 "Thu": this.work_load_data[i].Thu,
 "Fri": this.work_load_data[i].Fri,
 "Sat": this.work_load_data[i].Sat,
 "shiftName":this.work_load_data[i].shiftName,
 "shift_duration":this.work_load_data[i].shift_duration,
 "shiftCategory":this.work_load_data[i].shiftCategory,
 "shift_created_by":this.work_load_data[i].shift_created_by}

 allShiftDataInclude.push(temp)
 }
}
       var countMid=0; var countDay=0; var countEve=0;var countSysMid=0; var countSysDay=0; var countSysEve=0
       for(var i=0;i<allShiftDataInclude.length;i++){
         if(Number(allShiftDataInclude[i].shiftCategory)==1 && allShiftDataInclude[i].shift_created_by=='system'){
           countMid= countMid+ + +1
           countSysMid=countSysMid+ + + 1
         }
         else if(Number(allShiftDataInclude[i].shiftCategory)==2 && allShiftDataInclude[i].shift_created_by=='system'){
           countEve= countEve+ + +1
           countSysEve=countSysEve+ + + 1
         }
         else if(Number(allShiftDataInclude[i].shiftCategory)==3 && allShiftDataInclude[i].shift_created_by=='system'){
           countDay= countDay+ + +1
           countSysDay=countSysDay+ + + 1
         }
         else if(Number(allShiftDataInclude[i].shiftCategory)==1 && allShiftDataInclude[i].shift_created_by!='system'){
           countMid= countMid+ + +1
         }
         else if(Number(allShiftDataInclude[i].shiftCategory)==2 && allShiftDataInclude[i].shift_created_by!='system'){
           countEve= countEve+ + +1
         }
         else if(Number(allShiftDataInclude[i].shiftCategory)==3 && allShiftDataInclude[i].shift_created_by!='system'){
           countDay= countDay+ + +1
         }
       }

       if(countMid<5 && countDay<5 &&countEve<5){
         this.max_shift_validation=true
       }else{
         this.max_shift_validation=false
       }
               if(countSysMid>0 && countSysDay>0 &&countSysEve>0){
                   this.shiftValidation=true
               }else{
                 this.shiftValidation=false
               }


 }




 async generate(){
      this.eighthourgenerate()
 }



  async eighthourgenerate(){

   let loading = await this.loadingController.create({
     cssClass: 'custom-loading',
     spinner:'bubbles',
     message: '',
     duration: 10000,

   });
   await loading.present();

   //  this.workPatternPreference={"D1":this.workPattern.day1[0],"D2":this.workPattern.day2[0],"D3":this.workPattern.day3[0],"D4":this.workPattern.day4[0],"D5":this.workPattern.day5[0]}




let all_work_load_data=[]
all_work_load_data=this.workLoadForm.value.allWorkLoadData
let shift_length=0
let shift_time,daily_shifts_sun=[],daily_shifts_mon=[],daily_shifts_tue=[],daily_shifts_wed=[],daily_shifts_thu=[],daily_shifts_fri=[],daily_shifts_sat=[]
let sun,mon,tue,wed,thu,fri,sat


for(var i=0;i<all_work_load_data.length;i++){
if(all_work_load_data[i].sh_include_exclude=="I"){
 shift_length=shift_length+1
 sun={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Sun }
 mon={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Mon }
 tue={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Tue }
 wed={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Wed }
 thu={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Thu }
 fri={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Fri }
 sat={"key":all_work_load_data[i].startTime,"value":all_work_load_data[i].Sat }

 daily_shifts_sun.push({"Sun":sun})
 daily_shifts_mon.push({"Mon":mon})
 daily_shifts_tue.push({"Tue":tue})
 daily_shifts_wed.push({"Wed":wed})
 daily_shifts_thu.push({"Thu":thu})
 daily_shifts_fri.push({"Fri":fri})
 daily_shifts_sat.push({"Sat":sat})
}
}

let sunArr=[],monArr=[],tueArr=[],wedArr=[],thuArr=[],friArr=[],satArr=[]
//Sun
for(var i=0;i<daily_shifts_sun.length;i++){
 sunArr.push(daily_shifts_sun[i].Sun)
}
var SUN = sunArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});
//Mon
for(var i=0;i<daily_shifts_mon.length;i++){
 monArr.push(daily_shifts_mon[i].Mon)
}
var MON = monArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});
//Tue
for(var i=0;i<daily_shifts_tue.length;i++){
 tueArr.push(daily_shifts_tue[i].Tue)
}
var TUE = tueArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});
//Wed
for(var i=0;i<daily_shifts_wed.length;i++){
 wedArr.push(daily_shifts_wed[i].Wed)
}
var WED = wedArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});
//Thu
for(var i=0;i<daily_shifts_thu.length;i++){
 thuArr.push(daily_shifts_thu[i].Thu)
}
var THU = thuArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});
//Fri
for(var i=0;i<daily_shifts_fri.length;i++){
 friArr.push(daily_shifts_fri[i].Fri)
}
var FRI = friArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});
//Sat
for(var i=0;i<daily_shifts_sat.length;i++){
 satArr.push(daily_shifts_sat[i].Sat)
}
var SAT= satArr.reduce(function(map, obj) {
 map[obj.key] = Number(obj.value);
 return map;
}, {});

var allShiftDataInclude=[]
var allShiftDataIncludeWithExclude=[]
this.work_load_data=[]
this.work_load_data=this.workLoadForm.value.allWorkLoadData

for(var i=0;i<this.work_load_data.length;i++){
 this.allWorkLoadData.push(this.newWorkLoadData());
 if(this.work_load_data[i].sh_include_exclude=="I"){

 const temp= {"id": this.work_load_data[i].id,
 "startTime": this.work_load_data[i].startTime,

 "Sun": this.work_load_data[i].Sun,
 "Mon": this.work_load_data[i].Mon,
 "Tue": this.work_load_data[i].Tue,
 "Wed": this.work_load_data[i].Wed,
 "Thu": this.work_load_data[i].Thu,
 "Fri": this.work_load_data[i].Fri,
 "Sat": this.work_load_data[i].Sat,
//  "shift_duration":this.work_load_data[i].shift_duration,
 "shiftName":this.work_load_data[i].shiftName,
 "shiftCategory":this.work_load_data[i].shiftCategory,
 "shift_created_by":this.work_load_data[i].shift_created_by}

 allShiftDataInclude.push(temp)
 }
}

allShiftDataIncludeWithExclude=[]
var work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
for(var i=0;i<this.work_load_data.length;i++){
 // this.allWorkLoadData.push(this.newWorkLoadData());
 // if(this.work_load_data[i].sh_include_exclude=="I"){

if(this.work_load_data[i].id!=null){
 allShiftDataIncludeWithExclude.push(this.work_load_data[i])
}
 // }
}

for(var i=0;i<work_load_data.length;i++){
  if(Number(this.selected_shift_duration)!=Number(work_load_data[i].shift_duration) ){
    allShiftDataIncludeWithExclude.push(work_load_data[i])
  }
}

var countMid=0; var countDay=0; var countEve=0;var countSysMid=0; var countSysDay=0; var countSysEve=0
for(var i=0;i<allShiftDataInclude.length;i++){
 if(Number(allShiftDataInclude[i].shiftCategory)==1 && allShiftDataInclude[i].shift_created_by=='system'){
   countMid= countMid+ + +1
   countSysMid=countSysMid+ + + 1
 }
 else if(Number(allShiftDataInclude[i].shiftCategory)==2 && allShiftDataInclude[i].shift_created_by=='system'){
   countEve= countEve+ + +1
   countSysEve=countSysEve+ + + 1
 }
 else if(Number(allShiftDataInclude[i].shiftCategory)==3 && allShiftDataInclude[i].shift_created_by=='system'){
   countDay= countDay+ + +1
   countSysDay=countSysDay+ + + 1
 }
 else if(Number(allShiftDataInclude[i].shiftCategory)==1 && allShiftDataInclude[i].shift_created_by!='system'){
   countMid= countMid+ + +1
 }
 else if(Number(allShiftDataInclude[i].shiftCategory)==2 && allShiftDataInclude[i].shift_created_by!='system'){
   countEve= countEve+ + +1
 }
 else if(Number(allShiftDataInclude[i].shiftCategory)==3 && allShiftDataInclude[i].shift_created_by!='system'){
   countDay= countDay+ + +1
 }
}

// if(countSysMid>0 && countSysDay>0 &&countSysEve>0){
//   if(countMid<5 && countDay<5 &&countEve<5){


var pwpCount=0
for(var i=0;i<this.PWP.length;i++){
 if(this.PWP[i]==''){
   pwpCount= pwpCount+ + +1
 }
}



let dayli_shifts={"daily_shifts":{SUN,MON,TUE,WED,THU,FRI,SAT}}
    this.requiredWorkforceData={
     "Schedule":null,
     "shift_length":Number(this.selected_shift_duration),
     "PWP":this.PWP,
     "PSO": this.PSO,
     "daily_shifts":{SUN,MON,TUE,WED,THU,FRI,SAT},
   }

         this.updaterequiredWorkforceData={

           "SUN":{"DAY":this.totalSunDay,"EVE":this.totalSunEve,"MID":this.totalSunMid},
           "MON":{"DAY":this.totalMonDay,"EVE":this.totalMonEve,"MID":this.totalMonMid},
           "TUE":{"DAY":this.totalTueDay,"EVE":this.totalTueEve,"MID":this.totalTueMid},
           "WED":{"DAY":this.totalWedDay,"EVE":this.totalWedEve,"MID":this.totalWedMid},
           "THU":{"DAY":this.totalThuDay,"EVE":this.totalThuEve,"MID":this.totalThuMid},
           "FRI":{"DAY":this.totalFriDay,"EVE":this.totalFriEve,"MID":this.totalFriMid},
           "SAT":{"DAY":this.totalSatDay,"EVE":this.totalSatEve,"MID":this.totalSatMid},
       }
       // if(pwpCount>0){

       if(pwpCount>0){
         await loading.dismiss();
         //   },15000);
         //  }
         let alert = this.alertCtrl.create({
           // title: 'Low battery',
           header:'Error!' ,
           subHeader:'Preferred Work Pattern has an excluded shift. Please fix the Preferred Work Pattern!',
           buttons: ['Cancel']
         });
         (await alert).present();

       }else{

                 this.requiredWorkforce.postRequiredWorkforceData(this.result,this.requiredWorkforceData).subscribe(
                 async (response)=>{

                  console.log(response)
                 this.res=JSON.stringify(response[0])
                 this.allDefaultGeneratedSchedule=[]
                 this.allGeneratedSchedule=[]
                 this.convertResponseToJsonStrigify=JSON.parse(this.res)


                 if (Object.keys(this.convertResponseToJsonStrigify.generated_schedule_1.schedule).length>0) {
                   for(var s=0;s<response.length;s++){

                     this.outliervalues=false

                       this.scheduleData= JSON.parse(response[s]?.["generated_schedule_"+(s+ + +1)]?.["schedule"]),

                       this.comparisonData=JSON.parse(response[s]?.["generated_schedule_"+(s+ + +1)]?.["shift totals"])

                     this.scheduleDataArray=[]
                     this.comparisonDataArray=[]
                     this.scheduleDataArray.push(this.scheduleData)
                     this.comparisonDataArray.push(this.comparisonData)
                     this.gDatasun=this.scheduleDataArray?.[0].SUN
                     this.gDatamon=this.scheduleDataArray?.[0].MON
                     this.gDatatue=this.scheduleDataArray?.[0].TUE
                     this.gDatawed=this.scheduleDataArray?.[0].WED
                     this.gDatathu=this.scheduleDataArray?.[0].THU
                     this.gDatafri=this.scheduleDataArray?.[0].FRI
                     this.gDatasat=this.scheduleDataArray?.[0].SAT
                     this.gDataPattern=this.scheduleDataArray?.[0].Pattern
                     this.gDataShiftLineName=this.scheduleDataArray?.[0].shiftline_name
                     this.scheduleShift=[]
                           for(var i=0;i<i+1 && this.gDatasun[i]!=null;i++){
                                       this.gData={"id":i,"Sun":this.gDatasun[i],"Mon":this.gDatamon[i],"Tue":this.gDatatue[i],"Wed":this.gDatawed[i],"Thu":this.gDatathu[i],"Fri":this.gDatafri[i],"Sat":this.gDatasat[i],"Pattern":this.gDataPattern[i],"SL":this.gDataShiftLineName[i],"shiftdurationc":this.selected_shift_duration}
                                         for(var j=0;j<this.allShiftName.length;j++){
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatasun[i]))||(this.allShiftName[j].startTime==this.gDatasun[i])){
                                             this.gDatasun[i]=this.allShiftName[j].shift_name
                                           }
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatamon[i]))||(this.allShiftName[j].startTime==this.gDatamon[i])){
                                             this.gDatamon[i]=this.allShiftName[j].shift_name
                                           }
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatatue[i]))||(this.allShiftName[j].startTime==this.gDatatue[i])){
                                             this.gDatatue[i]=this.allShiftName[j].shift_name
                                           }
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatawed[i]))||(this.allShiftName[j].startTime==this.gDatawed[i])){
                                             this.gDatawed[i]=this.allShiftName[j].shift_name
                                           }
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatathu[i]))||(this.allShiftName[j].startTime==this.gDatathu[i])){
                                             this.gDatathu[i]=this.allShiftName[j].shift_name
                                           }
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatafri[i]))||(this.allShiftName[j].startTime==this.gDatafri[i])){
                                             this.gDatafri[i]=this.allShiftName[j].shift_name
                                           }
                                           if((Number(this.allShiftName[j].startTime)==Number(this.gDatasat[i]))||(this.allShiftName[j].startTime==this.gDatasat[i])){
                                             this.gDatasat[i]=this.allShiftName[j].shift_name
                                         }
                                         this.gData={"id":i,"Sun":this.gDatasun[i],"Mon":this.gDatamon[i],"Tue":this.gDatatue[i],"Wed":this.gDatawed[i],"Thu":this.gDatathu[i],"Fri":this.gDatafri[i],"Sat":this.gDatasat[i],"Pattern":this.gDataPattern[i],"SL":this.gDataShiftLineName[i],"shiftdurationc":this.selected_shift_duration}
                                       }
                                       this.scheduleShift.push(this.gData)
                                     }
                                     var tempArr=[]
                                     for(var i=0;i<this.scheduleShift.length;i++){
                                      tempArr.push({"id":i,
                                      "Sun":this.scheduleShift[i].Sun,
                                      "Mon":this.scheduleShift[i].Mon,
                                      "Tue":this.scheduleShift[i].Tue,
                                      "Wed":this.scheduleShift[i].Wed,
                                      "Thu":this.scheduleShift[i].Thu,
                                      "Fri":this.scheduleShift[i].Fri,
                                      "Sat":this.scheduleShift[i].Sat,
                                      "Pattern":this.scheduleShift[i].Pattern,
                                      "SL":this.scheduleShift[i].SL,
                                      "shiftdurationp":this.selected_shift_duration,
                                      "seq":this.checkID(i,this.scheduleShift[i].SL,this.scheduleShift),
                                      "shiftdurationc":this.selected_shift_duration})
                                     }
                                     this.defaultscheduleShift=[]
                                     for(var i=0;i<i+1 && this.gDatasun[i]!=null;i++){
                                       this.gData={"id":i,"Sun":this.gDatasun[i],"Mon":this.gDatamon[i],"Tue":this.gDatatue[i],"Wed":this.gDatawed[i],"Thu":this.gDatathu[i],"Fri":this.gDatafri[i],"Sat":this.gDatasat[i],"Pattern":this.gDataPattern[i],"SL":this.gDataShiftLineName[i],"shiftdurationc":this.selected_shift_duration
                                       }
                                         this.defaultscheduleShift.push(this.gData)


                                     }
                                     this.testing={"scheduleData":this.scheduleShift}
                                     this.allGeneratedSchedule.push(tempArr)
                                     this.allDefaultGeneratedSchedule.push(tempArr)
                                 }
                                     this.requiredEmpData={"SUN_DAY":this.totalSunDay,"SUN_MID":this.totalSunMid,"SUN_EVE":this.totalSunEve,"SUN_MID_DAY":this.totalSunMidDay,"SUN_DAY_EVE":this.totalSunDayEve,"SUN_EVE_MID":this.totalSunEveMid,
                               "MON_DAY":this.totalMonDay,"MON_MID":this.totalMonMid,"MON_EVE":this.totalMonEve,"MON_MID_DAY":this.totalMonMidDay,"MON_DAY_EVE":this.totalMonDayEve,"MON_EVE_MID":this.totalMonEveMid,
                               "TUE_DAY":this.totalTueDay,"TUE_MID":this.totalTueMid,"TUE_EVE":this.totalTueEve,"TUE_MID_DAY":this.totalTueMidDay,"TUE_DAY_EVE":this.totalTueDayEve,"TUE_EVE_MID":this.totalTueEveMid,
                               "WED_DAY":this.totalWedDay,"WED_MID":this.totalWedMid,"WED_EVE":this.totalWedEve,"WED_MID_DAY":this.totalWedMidDay,"WED_DAY_EVE":this.totalWedDayEve,"WED_EVE_MID":this.totalWedEveMid,
                               "THU_DAY":this.totalThuDay,"THU_MID":this.totalThuMid,"THU_EVE":this.totalThuEve,"THU_MID_DAY":this.totalThuMidDay,"THU_DAY_EVE":this.totalThuDayEve,"THU_EVE_MID":this.totalThuEveMid,
                               "FRI_DAY":this.totalFriDay,"FRI_MID":this.totalFriMid,"FRI_EVE":this.totalFriEve,"FRI_MID_DAY":this.totalFriMidDay,"FRI_DAY_EVE":this.totalFriDayEve,"FRI_EVE_MID":this.totalFriEveMid,
                               "SAT_DAY":this.totalSatDay,"SAT_MID":this.totalSatMid,"SAT_EVE":this.totalSatEve,"SAT_MID_DAY":this.totalSatMidDay,"SAT_DAY_EVE":this.totalSatDayEve,"SAT_EVE_MID":this.totalSatEveMid
                               }

                             localStorage.setItem('PWP-PSO',JSON.stringify({"PWP":this.PWP,"PSO":this.PSO}))
                               localStorage.setItem('outliers',JSON.stringify([]))
                             localStorage.setItem('focusShiftLine',JSON.stringify(''))
                             localStorage.setItem('updateScheduleId',JSON.stringify(''))
                             localStorage.setItem('allShiftRequiredData',JSON.stringify(allShiftDataInclude))
                             localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(allShiftDataIncludeWithExclude))
                             localStorage.setItem('customizedScheduleShiftLine',JSON.stringify(this.allGeneratedSchedule))
                             localStorage.setItem('defaultScheduleShiftLine',JSON.stringify(this.allDefaultGeneratedSchedule))
                             localStorage.setItem('requiredEmpData',JSON.stringify(this.requiredEmpData))
                             localStorage.setItem('hideBLrulesLabels',JSON.stringify({"hideBLrulesLabels":false}))

                            if(this.user_data.role=='bidmanager'){
                              if(straightlines_io_apis.apis.enter_Work_load===String(this.route.url).substr(1)){
                                this.navCtrl.navigateForward([straightlines_io_apis.apis.generated_schedule])
                              }else{
                                this.navCtrl.navigateForward([straightlines_io_apis.apis.generated_schedule_api])
                              }
                            }else{
                              this.navCtrl.navigateForward([straightlines_io_apis.apis.guest_generated_schedule_api])
                            }
                           } else if(Object.keys(this.convertResponseToJsonStrigify.generated_schedule_1.outliers).length>0){
                             this.outliervalues=true

                             const outliers=this.convertResponseToJsonStrigify.generated_schedule_1.outliers


                             localStorage.setItem('outliers',JSON.stringify([outliers]))
                             localStorage.setItem('allShiftRequiredData',JSON.stringify(allShiftDataInclude))
                             localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(allShiftDataIncludeWithExclude))
                             this.ngOnInit()
                           }
                           else if(Object.keys(this.convertResponseToJsonStrigify.generated_schedule_1.pwp_error).length>0){

                             let alert = this.alertCtrl.create({
                               // title: 'Low battery',
                               header:'Error!' ,
                               subHeader:this.convertResponseToJsonStrigify.generated_schedule_1.pwp_error,
                               buttons: ['Cancel']
                             });
                             (await alert).present();
                             localStorage.setItem('outliers',JSON.stringify([]))
                             localStorage.setItem('allShiftRequiredData',JSON.stringify(allShiftDataInclude))
                             localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(allShiftDataIncludeWithExclude))
                           }


                           // }
             },
             async (error: any)=>{this.errorMsg=error;console.log(this.errorMsg)
             if(this.errorMsg!=null){
               // setTimeout(async function(){

                             await loading.dismiss();
                   //   },15000);
                   //  }
                   let alert = this.alertCtrl.create({
                     // title: 'Low battery',
                     header:'Error!' ,
                     subHeader:'Please try again',
                     buttons: ['Cancel']
                   });
                   (await alert).present();
                 }
             },
             async () => {


               await loading.dismiss();
               }
             );


   }

  }
    checkID(id,sl,scheduleShift){

      var tempArr=[]
      for(var i=0; i<=scheduleShift.length;i++)
      {
        if(scheduleShift[i] !=undefined){
        if(scheduleShift[i]?.SL  == sl || scheduleShift[i]?.SL  == (sl+'-A')){
         tempArr.push(Number(scheduleShift[i]?.id))
        }
        }
      }
      tempArr=tempArr.sort((a,b)=>{return a -b})
      var newid=tempArr.indexOf(id)
      return newid
    }
 home(){
   this.navCtrl.navigateBack('home')
 }
 segmentChanged(event){

  this.hideSplitShiftMidDay=false
  this.hideSplitShiftDayEve=false
  this.hideSplitShiftEveMid=false
  this.selected_shift_duration=event.detail.value
  this.ngOnInit()
  }

 getAllScheduleName(){
  var tempObj={}
  var tempArr=[]
  var all_shift_data=[]
  var user_data=JSON.parse(sessionStorage.getItem('userData'))
  this.scheduleService.newgetAllSchedule(user_data.id).subscribe((res)=>{
    this.all_schedule=res

    if(this.user_data.role=='bidmanager'){
      if(this.all_schedule.length>0){
        return  this.headerTitleService.setBackUrl(straightlines_io_apis.apis.manage_shift_line_schedule);
        }else{
          return this.headerTitleService.setBackUrl(straightlines_io_apis.apis.dashboard);
        }
    }else{
      if(this.all_schedule.length>0){
        return  this.headerTitleService.setBackUrl(straightlines_io_apis.apis.guest_manage_shift_line_schedule);
        }else{
          return this.headerTitleService.setBackUrl(straightlines_io_apis.apis.guest_dashboard);
        }
    }
    // localStorage.setItem('allSchedule',JSON.stringify(this.all_schedule))
    // return this.all_schedule

  },(error)=>{
    console.log(error)
  },()=>{
  })
}
 onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


}
