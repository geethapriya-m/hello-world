import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { EditScheduleDataPage } from 'src/app/dashboard/generated_schedule/add-edit-shift-lines/edit-schedule-data/edit-schedule-data.page';
import { HeaderTitleForModalPageService } from 'src/app/dashboard/nav-bar-footer/header-title-for-modal-page.service';
import { BusinessRulesValidationService } from 'src/app/services/business-rules-validation.service';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { WorkLoadService } from 'src/app/services/work-load.service';
import defData from 'src/app//json/work-load-data.json';
import { CreateNewShiftDefintionPage } from 'src/app/dashboard/work_load_data/create-new-shift-defintion/create-new-shift-defintion.page';
@Component({
  selector: 'app-edit-shift-line-schedule',
  templateUrl: './edit-shift-line-schedule.component.html',
  styleUrls: ['./edit-shift-line-schedule.component.scss'],
})
export class EditShiftLineScheduleComponent implements OnInit {



  workShiftLine=[] as any;
  resultShiftLine=[] as any
  finalResultShiftLine=[]as any
  scheduleDataId: any;
  scheduleData: any;
  errorMsg: any;
  scheduleDataSunSat: any;
  // workLoadData: any;
  da1=[] as any
  wDataThree: any;
  wDataTwelve: any;
  wDataOne: any;
  wDataTwo: any;
  wDataFour: any;
  wDataElevenNight: any;
  wDataEleven: any;
  wDataTen: any;
  wDataNine: any;
  wDataEight: any;
  wDataSeven: any;
  wDataSix: any;
  wDataFive: any;
  selected_shift_duration=8
  default_selected_shift_duration=8
  disableAddButton=false
  x
  status: boolean = true;
  editScheduleDataForm: FormGroup;

  HideId: boolean = false;
  showHideText: boolean = false;
  editData: any;
   exampleArray = []
  valid: any =true;
  tempScheduleDataStored: any[];
  data1: any[];
  gapBetweenshift: any;
  da: any[];
  static urlArray;
  workD: any;
  scheduleShiftLine: any;
  scheduleLData: any;
  // workLoadData: any=defData;
  // testing: any[];
  static data5;
  data2: any;
  pattern
  work_Pattern: any;
  dat1: any;
  WED: any;
  workPattern
  workPatternResult
  convertStringToCharLeft
  convertStringToCharRight
  patternLeft
  patternRight
  hrs=40
  da2=[]
  allShiftName=[] as any
  allShiftData
  shift_Pattern
  shift_line: {};
  temp: any;
  allShiftNameForEditShiftLine=[]
  schedule_id
  all_Schedule: any;
  scheduleShift: any;
  edit_schedule_id: any;
  resetScheduleData
  resetschedule_id
  resetButtonCheck=false
  // workloadData=data222
  constructor(private route:Router,
              public workLoadDataService:WorkLoadService,
              public navCtrl: NavController,
              public dataService:ScheduleDataService,
              public busniessRulesValidation:BusinessRulesValidationService,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public viewCtrl: ModalController,
              private cd : ChangeDetectorRef,
              private headerTitleService: HeaderTitleForModalPageService,
             public formBuilder: FormBuilder
    ) {

      EditScheduleDataPage.urlArray ="false";
      this.scheduleData=navParams.get('scheduleData')
      this.headerTitleService.setTitle('Edit Shift Line');
      this.edit_schedule_id=navParams.get('schedule_id')
      this.resetScheduleData=this.scheduleData
      this.resetschedule_id=this.edit_schedule_id
        this.selected_shift_duration=Number(this.scheduleData.shiftdurationc)
        if(this.selected_shift_duration==undefined){
          this.selected_shift_duration=8
        }
        this.default_selected_shift_duration=this.selected_shift_duration

    }
    get staticUrlArray() {
      return EditScheduleDataPage.urlArray
    }
  ngOnInit() {
    this.all_Schedule=JSON.parse(localStorage.getItem('allSchedule'))
    this.scheduleShift=JSON.parse(localStorage.getItem('editCustomizedScheduleShiftLine'))
    this.allShiftData= JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))

    this.allShiftNameForEditShiftLine=[]

    for(var i=0;i<this.allShiftData.length;i++){
      if(this.allShiftData[i].shift_duration==Number(this.selected_shift_duration)){
    if(isNaN(this.allShiftData[i].shiftName)==false){

      if(this.allShiftData[i].shiftCategory==1){
        this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==2){
        this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==3){
        this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==4){
        this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==5){
        this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==6){
        this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }

    }else{
      if(this.allShiftData[i].shiftCategory==1){
        this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==2){
        this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==3){
        this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==4){
        this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==5){
        this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
      else if(this.allShiftData[i].shiftCategory==6){
        this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
      }
    }
  }
  }
  if(Number(this.selected_shift_duration)!=9){
  let countValueOfX=0
  let countValueOfM=0
  this.da2 =[this.scheduleData.seq_id,this.scheduleData.Sun+'-'+this.selected_shift_duration,this.scheduleData.Mon+'-'+this.selected_shift_duration,this.scheduleData.Tue+'-'+this.selected_shift_duration,this.scheduleData.Wed+'-'+this.selected_shift_duration,this.scheduleData.Thu+'-'+this.selected_shift_duration,this.scheduleData.Fri+'-'+this.selected_shift_duration,this.scheduleData.Sat+'-'+this.selected_shift_duration,this.scheduleData.Pattern,this.scheduleData.SL]
    this.tempScheduleDataStored = [String(this.scheduleData.Sun)+'-'+this.selected_shift_duration,String(this.scheduleData.Mon)+'-'+this.selected_shift_duration,String(this.scheduleData.Tue)+'-'+this.selected_shift_duration,String(this.scheduleData.Wed)+'-'+this.selected_shift_duration,String(this.scheduleData.Thu)+'-'+this.selected_shift_duration,String(this.scheduleData.Fri)+'-'+this.selected_shift_duration,String(this.scheduleData.Sat)+'-'+this.selected_shift_duration]
    this.shift_Pattern=''
    for(var j=0;j<this.tempScheduleDataStored.length;j++){
          this.shift_Pattern=this.shift_Pattern+this.tempScheduleDataStored[j].split('-')[0]
    }

          var right_text = this.shift_Pattern.substring(7, this.shift_Pattern.indexOf("X"),this.shift_Pattern.indexOf("X"));
          var left_text = this.shift_Pattern.substring(0, this.shift_Pattern.indexOf("X"),this.shift_Pattern.indexOf("X"));
          this.convertStringToCharLeft=Array.from(left_text)
          this.convertStringToCharRight=Array.from(right_text)
          this.patternRight=''
          this.patternLeft=''
        for(var i=0;i<this.convertStringToCharRight.length;i++){
          if(this.convertStringToCharRight[i]!=='X'){
            this.patternRight=this.patternRight+this.convertStringToCharRight[i]
          }
        }
        for(var i=0;i<this.convertStringToCharLeft.length;i++){
          if(this.convertStringToCharLeft[i]!=='X'){
            this.patternLeft=this.patternLeft+this.convertStringToCharLeft[i]
          }
        }
    this.shift_Pattern=this.patternRight+this.patternLeft
    this.workPattern=''
    this.work_Pattern=this.da2[8]
    this.workPattern=String(this.work_Pattern)
    this.convertStringToCharLeft=Array.from(this.shift_Pattern)
       this.da1=[]
          for(var i=0;i<this.da2.length;i++){
          this.da1.push(String(this.da2[i]))
          }

        this.all_Schedule=JSON.parse(localStorage.getItem('allSchedule'))
        this.scheduleShift=JSON.parse(localStorage.getItem('editCustomizedScheduleShiftLine'))
        this.data2=JSON.parse(localStorage.getItem('workData'))
        const test=[]


          for(var j = 0;j<this.tempScheduleDataStored.length;j++){
            for(var i=0;i<this.allShiftNameForEditShiftLine.length;i++){
            if(this.allShiftNameForEditShiftLine[i].shiftData==this.tempScheduleDataStored[j]){
              this.temp =this.allShiftNameForEditShiftLine[i].shift_StartTime
            }else if(this.tempScheduleDataStored[j].split('-')[0]=='X'){
              this.temp='X'
            }
          }
          test.push(this.temp)
          }
        this.shift_line={
          "shift_line": test,
            "shift_length":Number(this.selected_shift_duration)
        }


        this.busniessRulesValidation.businessRulesCheck(this.shift_line).subscribe(
           (res)=>{
            var tempRule
            tempRule=res
            this.valid=tempRule.business_rules
        },
        (error: any)=>{this.errorMsg=error;console.log(this.errorMsg)},
        async () => {
        }
        );

      this.scheduleShiftLine=JSON.parse(localStorage.getItem('editCustomizedScheduleShiftLine'))
      this.hrs=Number(Array.from(String(this.workPattern)).length*Number(this.selected_shift_duration))
      this.editScheduleDataForm = this.formBuilder.group({
        id:[this.scheduleData.seq_id],
        Mon: [this.checkRdo(this.da2[2])],
        Tue:[this.checkRdo(this.da2[3])],
        Wed: [this.checkRdo(this.da2[4])],
        Thu: [this.checkRdo(this.da2[5])],
        Fri: [this.checkRdo(this.da2[6])],
        Sat: [this.checkRdo(this.da2[7])],
        Sun: [this.checkRdo(this.da2[1])],
        Pattern:[this.da2[8]],
        BMLRule: [this.valid],
        SL:[this.scheduleData.SL]
     })
     this.oldValue= [this.Sun.value,this.Mon.value,this.Tue.value,this.Wed.value,this.Thu.value,this.Fri.value,this.Sat.value];
      return  this.wDataOne,this.wDataTwo,this.wDataThree,this.wDataFour,this.wDataFive,this.wDataSix,this.wDataSeven,this.wDataEight,this.wDataNine,this.wDataTen,this.wDataEleven,this.wDataElevenNight, this.wDataTwelve
    }else{
      this.ngOnInitForNineHours()
    }
    }
    checkRdo(value){
      if(value.split('-')[0]=='X'){
        return 'X'
      }else{
        return value
      }
    }
    segmentChanged(event){

      this.selected_shift_duration=Number(event.detail.value)
      if(this.selected_shift_duration!=9){
        this.updateDataBasedonShiftLength()
      }else{
        this.updateDataBasedon9HoursShiftLength()
      }
    }
      updateDataBasedonShiftLength(){




      if(this.selected_shift_duration==10){
        if(this.default_selected_shift_duration==this.selected_shift_duration){
          this.ngOnInit()
        }else{
        this.allShiftNameForEditShiftLine=[]
        for(var i=0;i<this.allShiftData.length;i++){
              if(this.allShiftData[i].shift_duration==Number(this.selected_shift_duration)){
                if(isNaN(this.allShiftData[i].shiftName)==false){

                  if(this.allShiftData[i].shiftCategory==1){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==2){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==3){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==4){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==5){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==6){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }

                }else{
                  if(this.allShiftData[i].shiftCategory==1){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==2){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==3){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==4){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==5){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==6){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
              }
            }
          }

          this.updateDataBasedOntheChagedShiftLength()
        }

      }else{

        if(this.default_selected_shift_duration==this.selected_shift_duration){
          this.ngOnInit()
        }else{
        this.allShiftNameForEditShiftLine=[]
            for(var i=0;i<this.allShiftData.length;i++){
              if(this.allShiftData[i].shift_duration==Number(this.selected_shift_duration)){
                if(isNaN(this.allShiftData[i].shiftName)==false){

                  if(this.allShiftData[i].shiftCategory==1){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==2){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==3){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==4){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==5){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==6){
                    this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }

                }else{
                  if(this.allShiftData[i].shiftCategory==1){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==2){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==3){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==4){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==5){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
                  else if(this.allShiftData[i].shiftCategory==6){
                    this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
                  }
              }
            }

          }
          this.updateDataBasedOntheChagedShiftLength()
        }
      }


      }

      updateDataBasedOntheChagedShiftLength(){
        this.workPattern=''
        this.hrs=0
        this.disableAddButton=true
        this.valid=false
        this. oldValue=['X','X','X','X','X','X','X']
        if(this.resetButtonCheck==false || this.selected_shift_duration!=9){
          this.editScheduleDataForm = this.formBuilder.group({
            id:[this.scheduleData.seq_id],
            Mon: ['X'],
            Tue:['X'],
            Wed: ['X'],
            Thu: ['X'],
            Fri: ['X'],
            Sat: ['X'],
            Sun: ['X'],
            SL:[this.scheduleData.SL]

          })
        }
      }
      oldValue=['X','X','X','X','X','X','X']
      async checkAddNewShiftDefintion(){
      this.tempScheduleDataStored =  [this.Sun.value,this.Mon.value,this.Tue.value,this.Wed.value,this.Thu.value,this.Fri.value,this.Sat.value];
      var checkAddNew=false
      var count
      for(var j=0;j<this.tempScheduleDataStored.length;j++){
        if(this.tempScheduleDataStored[j]=='add'){
          checkAddNew=true
          if(j==0){this.editScheduleDataForm.controls.Sun.setValue(this.oldValue[0])}
          else if(j==1){this.editScheduleDataForm.controls.Mon.setValue(this.oldValue[1])}
          else if(j==2){this.editScheduleDataForm.controls.Tue.setValue(this.oldValue[2])}
          else if(j==3){this.editScheduleDataForm.controls.Wed.setValue(this.oldValue[3])}
          else if(j==4){this.editScheduleDataForm.controls.Thu.setValue(this.oldValue[4])}
          else if(j==5){this.editScheduleDataForm.controls.Fri.setValue(this.oldValue[5])}
          else if(j==6){this.editScheduleDataForm.controls.Sat.setValue(this.oldValue[6])}
        }
      }

      this.oldValue= [this.Sun.value,this.Mon.value,this.Tue.value,this.Wed.value,this.Thu.value,this.Fri.value,this.Sat.value];

      if(checkAddNew==true){
          const modal = await this.modalCtrl.create({
            component: CreateNewShiftDefintionPage,
            componentProps: { shift_duration:this.selected_shift_duration },
            cssClass: 'AddNewShiftDefintion',
            swipeToClose:true
          });
          modal.onDidDismiss().then(()=>{
            this.updateShiftDefintionData()
           })
          return await modal.present();
      }else{
          this.businessRuleValidation()
      }
    }
    updateShiftDefintionData(){
      this.allShiftData= JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
      this.allShiftNameForEditShiftLine=[]
      for(var i=0;i<this.allShiftData.length;i++){
        if(this.allShiftData[i].shift_duration==Number(this.selected_shift_duration)){
          if(isNaN(this.allShiftData[i].shiftName)==false){

            if(this.allShiftData[i].shiftCategory==1){
              this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==2){
              this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==3){
              this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==4){
              this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==5){
              this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==6){
              this.allShiftNameForEditShiftLine.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }

          }else{
            if(this.allShiftData[i].shiftCategory==1){
              this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==2){
              this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==3){
              this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==4){
              this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==5){
              this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
            else if(this.allShiftData[i].shiftCategory==6){
              this.allShiftNameForEditShiftLine.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
            }
        }
      }

    }
    this.editScheduleDataForm = this.formBuilder.group({
      id:[this.scheduleData.id],
      Mon: [this.Mon.value],
      Tue:[this.Tue.value],
      Wed: [this.Wed.value],
      Thu: [this.Thu.value],
      Fri: [this.Fri.value],
      Sat: [this.Sat.value],
      Sun: [this.Sun.value],
      // Pattern:[''],
      // BMLRule: [this.valid],
      SL:[this.scheduleData.SL]

    })
    this.businessRuleValidation()
    }
    businessRuleValidation(){
var count=0
    this.tempScheduleDataStored = [this.Sun.value,this.Mon.value,this.Tue.value,this.Wed.value,this.Thu.value,this.Fri.value,this.Sat.value];
    for(var j=0;j<this.tempScheduleDataStored.length;j++){
      if(this.tempScheduleDataStored[j]=='X'){
        count++
      }
    }
    this.work_Pattern=''
    var pa
   for(var j=0;j<this.tempScheduleDataStored.length;j++){
    if(this.tempScheduleDataStored[j]!='X'){
     for(var k=0;k<this.allShiftNameForEditShiftLine.length;k++){
       if(this.tempScheduleDataStored[j]==this.allShiftNameForEditShiftLine[k].shiftData){
         this.work_Pattern=this.work_Pattern+this.allShiftNameForEditShiftLine[k].shiftCategory
       }
      }
      }else{
        this.work_Pattern=this.work_Pattern+'X'
     }
   }
   var right_text = this.work_Pattern.substring(7, this.work_Pattern.indexOf("X"),this.work_Pattern.indexOf("X"));
    var left_text = this.work_Pattern.substring(0, this.work_Pattern.indexOf("X"),this.work_Pattern.indexOf("X"));
    this.convertStringToCharLeft=Array.from(left_text)
    this.convertStringToCharRight=Array.from(right_text)
   this.patternRight=''
   this.patternLeft=''
   for(var i=0;i<this.convertStringToCharRight.length;i++){
     if(this.convertStringToCharRight[i]!=='X'){
       this.patternRight=this.patternRight+this.convertStringToCharRight[i]
     }
   }
   for(var i=0;i<this.convertStringToCharLeft.length;i++){
     if(this.convertStringToCharLeft[i]!=='X'){
       this.patternLeft=this.patternLeft+this.convertStringToCharLeft[i]
     }
   }
   this.work_Pattern=this.patternRight+this.patternLeft
   this.workPattern=''
   this.convertStringToCharLeft=Array.from(this.work_Pattern)

   for(var i=0;i<this.convertStringToCharLeft.length;i++){
     if(this.convertStringToCharLeft[i]=='1'||this.convertStringToCharLeft[i]==1){
       this.workPattern=this.workPattern+'M'
     }
     else if(this.convertStringToCharLeft[i]=='2'||this.convertStringToCharLeft[i]==2){
       this.workPattern=this.workPattern+'E'
     }
     else if(this.convertStringToCharLeft[i]=='3'||this.convertStringToCharLeft[i]==3){
       this.workPattern=this.workPattern+'D'
     }
     else if(this.convertStringToCharLeft[i]=='4'||this.convertStringToCharLeft[i]==4){
      this.workPattern=this.workPattern+'S'
    }
    else if(this.convertStringToCharLeft[i]=='5'||this.convertStringToCharLeft[i]==5){
      this.workPattern=this.workPattern+'S'
    }else if(this.convertStringToCharLeft[i]=='6'||this.convertStringToCharLeft[i]==6){
      this.workPattern=this.workPattern+'S'
    }

   }
   this.work_Pattern=this.workPattern
  this.hrs=Number(Array.from(this.work_Pattern).length*Number(this.selected_shift_duration))
  if(Number(this.selected_shift_duration)==8){
    if(count==2){
      this.disableAddButton=false
      this.nextValidation()
    }else{
      this.disableAddButton=true
    }
  }else{
  if(Number(this.selected_shift_duration)==10){
    if(count==3){
        this.disableAddButton=false
        this.nextValidation()
      }else{
        this.disableAddButton=true
      }
    }
  }
}
nextValidation(){
  const test=[]

    for(var j = 0;j<this.tempScheduleDataStored.length;j++){
      for(var i=0;i<this.allShiftNameForEditShiftLine.length;i++){
      if(this.allShiftNameForEditShiftLine[i].shiftData==this.tempScheduleDataStored[j]){
        this.temp =this.allShiftNameForEditShiftLine[i].shift_StartTime
      }else if(this.tempScheduleDataStored[j]=='X'){
        this.temp='X'
      }
    }
    test.push(this.temp)
  }


  this.shift_line={
    "shift_line": test,
      "shift_length":Number(this.selected_shift_duration)
  }

  this.busniessRulesValidation.businessRulesCheck(this.shift_line).subscribe(
    (res)=>{
      var tempRule
      tempRule=res
      this.valid=tempRule.business_rules

  },
  (error: any)=>{this.errorMsg=error;console.log(this.errorMsg)},
  async () => {
  }
  );
  }
  get Mon(){
    return this.editScheduleDataForm.get('Mon')
  }

  get Tue(){
    return this.editScheduleDataForm.get('Tue')
  }
  get Wed(){
    return this.editScheduleDataForm.get('Wed')
  }
  get Thu(){
    return this.editScheduleDataForm.get('Thu')
  }
  get Fri(){
    return this.editScheduleDataForm.get('Fri')
  }
  get Sat(){
    return this.editScheduleDataForm.get('Sat')
  }
  get Sun(){
    return this.editScheduleDataForm.get('Sun')
  }
  get BMRule(){
    return this.editScheduleDataForm.get('BMRule')
  }
  get Pattern(){
    return this.editScheduleDataForm.get('Pattern')
  }


    async update(index){
      if(Number(this.selected_shift_duration)!=9){
      this.editData=this.editScheduleDataForm.value
      this.editData.BMLRule=this.valid
  if(isNaN(this.editData.Sun)==false){
    this.editData.Sun=Number(this.editData.Sun)
  }else{
    this.editData.Sun=this.editData.Sun
  }
  if(isNaN(this.editData.Mon)==false){
    this.editData.Mon=Number(this.editData.Mon)
  }else{
    this.editData.Mon=this.editData.Mon
  }
  if(isNaN(this.editData.Tue)==false){
    this.editData.Tue=Number(this.editData.Tue)
  }else{
    this.editData.Tue=this.editData.Tue
  }
  if(isNaN(this.editData.Wed)==false){
    this.editData.Wed=Number(this.editData.Wed)
  }else{
    this.editData.Wed=this.editData.Wed
  }
  if(isNaN(this.editData.Thu)==false){
    this.editData.Thu=Number(this.editData.Thu)
  }else{
    this.editData.Thu=this.editData.Thu
  }
  if(isNaN(this.editData.Fri)==false){
    this.editData.Fri=Number(this.editData.Fri)
  }else{
    this.editData.Fri=this.editData.Fri
  }
  if(isNaN(this.editData.Sat)==false){
    this.editData.Sat=Number(this.editData.Sat)
  }else{
    this.editData.Sat=this.editData.Sat
  }


  this.finalResultShiftLine=[]
          var ob,tempArr=[]
        ob={
          "areaid": this.scheduleData.areaid,
          "schedule_id": this.scheduleData.schedule_id,
            "Fri":this.checkRdo(this.editData.Fri).split('-')[0],
            "id":this.scheduleData.id,
            "Mon":this.checkRdo(this.editData.Mon).split('-')[0],
            "shiftdurationc":this.selected_shift_duration,
            "Sat": this.checkRdo(this.editData.Sat).split('-')[0],
            "schedulename": this.scheduleData.schedulename.split('-')[0],
            "seq_id":this.scheduleData.seq_id,
            "seq":this.scheduleData.seq,
            "SL": this.scheduleData.SL,
            "Sun": this.checkRdo(this.editData.Sun).split('-')[0],
            "Thu": this.checkRdo(this.editData.Thu).split('-')[0],
            "Tue": this.checkRdo(this.editData.Tue).split('-')[0],
            "userid": this.scheduleData.userid,
            "shiftdurationp":this.scheduleData.shiftdurationp,
            "Wed":this.checkRdo(this.editData.Wed).split('-')[0],
            "Monshift2":null,
            "Tueshift2":null,
            "Wedshift2": null,
            "Thushift2": null,
            "Frishift2": null,
            "Satshift2": null,
            "Sunshift2": null,
            "Pattern":this.workPattern,
          "BMLRule":this.editData.BMLRule
        }}
        else{
          var ob
          ob=
          {
            "areaid": this.scheduleData.areaid,
          "schedule_id": this.scheduleData.schedule_id,
            "userid": this.scheduleData.userid,
            "id":this.scheduleData.id,
            "Mon":this.addScheduleDataFormForNineHours.controls.Mon1.value,
            "Tue":this.addScheduleDataFormForNineHours.controls.Tue1.value,
            "Wed": this.addScheduleDataFormForNineHours.controls.Wed1.value,
            "Thu": this.addScheduleDataFormForNineHours.controls.Thu1.value,
            "Fri": this.addScheduleDataFormForNineHours.controls.Fri1.value,
            "Sat": this.addScheduleDataFormForNineHours.controls.Sat1.value,
            "Sun": this.addScheduleDataFormForNineHours.controls.Sun1.value,
            "Monshift2":this.addScheduleDataFormForNineHours.controls.Mon2.value,
            "Tueshift2":this.addScheduleDataFormForNineHours.controls.Tue2.value,
            "Wedshift2": this.addScheduleDataFormForNineHours.controls.Wed2.value,
            "Thushift2": this.addScheduleDataFormForNineHours.controls.Thu2.value,
            "Frishift2": this.addScheduleDataFormForNineHours.controls.Fri2.value,
            "Satshift2": this.addScheduleDataFormForNineHours.controls.Sat2.value,
            "Sunshift2": this.addScheduleDataFormForNineHours.controls.Sun2.value,
            "SL": this.addScheduleDataFormForNineHours.controls.SL.value,
            "shiftdurationc":Number(this.selected_shift_duration),
            "BMLRule":this.valid,
            "shiftdurationp":this.scheduleData.shiftdurationp,
            "seq_id":this.scheduleData.seq_id,
            "seq":this.scheduleData.seq,
            "Pattern":this.work_Pattern,
          }
        }
        this.finalResultShiftLine=[]
        this.scheduleShiftLine= JSON.parse(localStorage.getItem('editCustomizedScheduleShiftLine'))
        for(var i=0;i<this.scheduleShiftLine.length;i++)
          {
            if(this.scheduleShiftLine[i]?.seq_id!=ob.seq_id)
            {
              this.finalResultShiftLine.push(this.scheduleShiftLine[i])
            }
            else{
              this.finalResultShiftLine.push(ob)
            }
          }

              localStorage.setItem('editCustomizedScheduleShiftLine',JSON.stringify(this.finalResultShiftLine))
          localStorage.setItem('hideBLrulesLabels',JSON.stringify({"hideBLrulesLabels":true}))
          localStorage.setItem('focusShiftLineEdit',JSON.stringify(this.scheduleData.seq_id))
                this.modalCtrl.dismiss();
                const alert = await this.alertCtrl.create({
                  cssClass: 'my-custom-class',
                  header: 'Alert',
                  message: "Successfully updated!!!",
                  buttons: ['OK']
                });
                await alert.present();
                    // location.reload()
    }
    dismiss() {
      this.modalCtrl.dismiss();
    }
    ngAfterContentChecked() : void {
      this.cd.detectChanges();
  }
     BusinessRulesPdf(){
      this.showHideText = !this.showHideText;
      this.cd.detectChanges();
    }
    // ngAfterViewChecked() {
    //   let show = this.isShowExpand();
    //   if (show != this.show) { // check if it change, tell CD update view
    //     this.show = show;
    //     this.cdRef.detectChanges();
    //   }
    // }

    isShowExpand()
    {
      //...
    }

    reset(){
      this.scheduleData=this.resetScheduleData
      this.edit_schedule_id=this.resetschedule_id
        this.selected_shift_duration=Number(this.scheduleData.shiftdurationc)
        if(this.selected_shift_duration==undefined){
          this.selected_shift_duration=8
        }
        this.default_selected_shift_duration=this.selected_shift_duration

      if(Number(this.selected_shift_duration)==Number(this.default_selected_shift_duration)){
        if(Number(this.selected_shift_duration)==9){
          this.ngOnInitForNineHours()
        }else{
          this.ngOnInit()
        }
      }else{
        if(Number(this.selected_shift_duration)==9){
          this.work_Pattern=''
        this.hrs=0
        this.valid=false
        this.addScheduleDataFormForNineHours = this.formBuilder.group({
          id:[this.scheduleData.id],
          Mon1: ['X'],
          Tue1:['X'],
          Wed1: ['X'],
          Thu1: ['X'],
          Fri1: ['X'],
          Sat1: ['X'],
          Sun1: ['X'],
          Mon2: ['X'],
          Tue2:['X'],
          Wed2: ['X'],
          Thu2: ['X'],
          Fri2: ['X'],
          Sat2: ['X'],
          Sun2: ['X'],
          Pattern:[''],
          // Pattern:[this.da1[8]],
          BMLRule: [this.valid],
          SL:[this.scheduleData.SL]

        })
        }else{

          this.work_Pattern=''
          this.hrs=0
          this.valid=false
          this.editScheduleDataForm = this.formBuilder.group({
            id:[this.scheduleData.id],
            Mon: ['X'],
            Tue: ['X'],
            Wed: ['X'],
            Thu: ['X'],
            Fri: ['X'],
            Sat: ['X'],
            Sun: ['X'],
            Pattern:[''],
            BMLRule: [this.valid],
            SL:[this.scheduleData.SL]

          })
        }
      }
    }
    afterdeleteShiftLines=[]
    deleteShiftLines=[]
    deletedShiftLines=[]
    async removeItem(sd){
      sd=this.scheduleData
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

          let j = 0;
          this.afterdeleteShiftLines=[]
          this.deleteShiftLines=[]
          do {
            if( this.scheduleShift[j].seq_id==sd.seq_id){

                if(this.scheduleShift[j]?.seq_id == sd.seq_id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }
                else if(this.scheduleShift[j]?.Sun == 'X' && this.scheduleShift[j]?.Mon == 'X' &&this.scheduleShift[j]?.id == sd.id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }
                else if(this.scheduleShift[j]?.Mon == 'X' && this.scheduleShift[j]?.Tue == 'X' &&this.scheduleShift[j]?.id == sd.id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }
                else if(this.scheduleShift[j]?.Tue == 'X' && this.scheduleShift[j]?.Wed == 'X' &&this.scheduleShift[j]?.id == sd.id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }
                else if(this.scheduleShift[j]?.Wed == 'X' && this.scheduleShift[j]?.Thu == 'X' &&this.scheduleShift[j]?.id == sd.id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }
                else if(this.scheduleShift[j]?.Thu == 'X' && this.scheduleShift[j]?.Fri == 'X' &&this.scheduleShift[j]?.id == sd.id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }
                else if(this.scheduleShift[j]?.Fri == 'X' && this.scheduleShift[j]?.Sat == 'X' &&this.scheduleShift[j]?.id == sd.id && this.scheduleShift[j] == sd){
                  this.scheduleShift.splice( this.scheduleShift.indexOf(sd), 1);
                }

              }else{
                this.afterdeleteShiftLines.push(this.scheduleShift[j])
              }

              j++;
            }while(j < this.scheduleShift.length)
            var tempArr=[]
            for(var i=0;i<this.afterdeleteShiftLines.length;i++){
              if(this.afterdeleteShiftLines[i]!=null){
                tempArr.push(this.afterdeleteShiftLines[i])
              }
            }
      this.deletedShiftLines=JSON.parse(localStorage.getItem('deletedShiftLines'))
      if(this.deletedShiftLines==null){
        this.deletedShiftLines=[]
        if(sd.id!=null){
          this.deletedShiftLines.push(sd)
        }

      }else{
        if(sd.id!=null){
          this.deletedShiftLines.push(sd)
        }
      }

      localStorage.setItem('deletedShiftLines',JSON.stringify(this.deletedShiftLines))
      localStorage.setItem('editCustomizedScheduleShiftLine',JSON.stringify(tempArr))
      this.modalCtrl.dismiss()
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: "Successfully deleted!!!",
        buttons: ['OK']
      });
      await alert.present();
            }
          }
        ]
      });
  await confirm.present();

      }
      addScheduleDataFormForNineHours
      tempScheduleDataStoredForNineHoursTwo=[]
      tempScheduleDataStoredForNineHoursOne=[]
      ngOnInitForNineHours(){
        this.tempScheduleDataStoredForNineHoursOne= [this.scheduleData.Sun,this.scheduleData.Mon,this.scheduleData.Tue,this.scheduleData.Wed,this.scheduleData.Thu,this.scheduleData.Fri,this.scheduleData.Sat];
             this.tempScheduleDataStoredForNineHoursTwo=  [this.scheduleData.Sunshift2,this.scheduleData.Monshift2,this.scheduleData.Tueshift2,this.scheduleData.Wedshift2,this.scheduleData.Thushift2,this.scheduleData.Frishift2,this.scheduleData.Satshift2];;
             this.hrs=0
             this.shift_Pattern=''
             for(var j=0;j<this.tempScheduleDataStoredForNineHoursOne.length;j++){
              this.shift_Pattern=this.shift_Pattern+this.tempScheduleDataStoredForNineHoursOne[j].split('-')[0]
               if(this.tempScheduleDataStoredForNineHoursOne[j]!='X' && this.tempScheduleDataStoredForNineHoursOne[j]!=undefined){
                 this.hrs=this.hrs+ + +Number(this.tempScheduleDataStoredForNineHoursOne[j].split('-')[1])
               }
             }
             for(var j=0;j<this.tempScheduleDataStoredForNineHoursTwo.length;j++){
              this.shift_Pattern=this.shift_Pattern+this.tempScheduleDataStoredForNineHoursTwo[j].split('-')[0]
               if(this.tempScheduleDataStoredForNineHoursTwo[j]!='X' && this.tempScheduleDataStoredForNineHoursTwo[j]!=undefined){
                 this.hrs=this.hrs+ + +Number(this.tempScheduleDataStoredForNineHoursTwo[j].split('-')[1])
               }
             }
        this.scheduleShiftLine=JSON.parse(localStorage.getItem('editCustomizedScheduleShiftLine'))
        this.scheduleShiftLine=this.scheduleShiftLine[this.schedule_id]

        this.work_Pattern=this.scheduleData.Pattern
        this.allShiftName=[]
        for(var i=0;i<this.allShiftData.length;i++){
        if(isNaN(this.allShiftData[i].shiftName)==false){

          if(this.allShiftData[i].shiftCategory==1){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==2){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==3){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==4){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==5){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==6){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }

        }else{
          if(this.allShiftData[i].shiftCategory==1){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==2){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==3){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==4){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==5){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==6){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
        // }
        }
        }
        this.allShiftName=this.allShiftName.sort((a,b)=>{
          return a.shift_duration - b.shift_duration
        })
        this.addScheduleDataFormForNineHours = this.formBuilder.group({
          id:[this.scheduleData.id],
          Mon1: [this.tempScheduleDataStoredForNineHoursOne[1]],
          Tue1:[this.tempScheduleDataStoredForNineHoursOne[2]],
          Wed1: [this.tempScheduleDataStoredForNineHoursOne[3]],
          Thu1: [this.tempScheduleDataStoredForNineHoursOne[4]],
          Fri1: [this.tempScheduleDataStoredForNineHoursOne[5]],
          Sat1: [this.tempScheduleDataStoredForNineHoursOne[6]],
          Sun1: [this.tempScheduleDataStoredForNineHoursOne[0]],
          Mon2: [this.tempScheduleDataStoredForNineHoursTwo[1]],
          Tue2:[this.tempScheduleDataStoredForNineHoursTwo[2]],
          Wed2: [this.tempScheduleDataStoredForNineHoursTwo[3]],
          Thu2: [this.tempScheduleDataStoredForNineHoursTwo[4]],
          Fri2: [this.tempScheduleDataStoredForNineHoursTwo[5]],
          Sat2: [this.tempScheduleDataStoredForNineHoursTwo[6]],
          Sun2: [this.tempScheduleDataStoredForNineHoursTwo[0]],
          Pattern:[''],
          // Pattern:[this.da1[8]],
          BMLRule: [this.valid],
          SL:[this.scheduleData.SL]

        })
        this.businessRuleValidationForNineHours()
        return  this.wDataOne,this.wDataTwo,this.wDataThree,this.wDataFour,this.wDataFive,this.wDataSix,this.wDataSeven,this.wDataEight,this.wDataNine,this.wDataTen,this.wDataEleven,this.wDataElevenNight, this.wDataTwelve
      }
      updateDataBasedon9HoursShiftLength(){
        this.allShiftName=[]
        for(var i=0;i<this.allShiftData.length;i++){
        if(isNaN(this.allShiftData[i].shiftName)==false){

          if(this.allShiftData[i].shiftCategory==1){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==2){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==3){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==4){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==5){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==6){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }

        }else{
          if(this.allShiftData[i].shiftCategory==1){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==2){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==3){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==4){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==5){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==6){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
        // }
        }
        }
        this.allShiftName=this.allShiftName.sort((a,b)=>{
          return a.shift_duration - b.shift_duration
        })
        this.work_Pattern=''
        this.hrs=0
        this.valid=false
        if(this.resetButtonCheck==false && (this.default_selected_shift_duration ==8 || this.default_selected_shift_duration==10)){
          this.addScheduleDataFormForNineHours = this.formBuilder.group({
            id:[this.scheduleData.id],
            Mon1: ['X'],
            Tue1:['X'],
            Wed1: ['X'],
            Thu1: ['X'],
            Fri1: ['X'],
            Sat1: ['X'],
            Sun1: ['X'],
            Mon2: ['X'],
            Tue2:['X'],
            Wed2: ['X'],
            Thu2: ['X'],
            Fri2: ['X'],
            Sat2: ['X'],
            Sun2: ['X'],
            Pattern:[''],
            // Pattern:[this.da1[8]],
            BMLRule: [this.valid],
            SL:[this.scheduleData.SL]
          })
        }
        if(this.default_selected_shift_duration==9){
          this.businessRuleValidationForNineHours()
        }
      }
      get Mon1(){
        return this.addScheduleDataFormForNineHours.get('Mon')
      }

      get Tue1(){
        return this.addScheduleDataFormForNineHours.get('Tue1')
      }
      get Wed1(){
        return this.addScheduleDataFormForNineHours.get('Wed1')
      }
      get Thu1(){
        return this.addScheduleDataFormForNineHours.get('Thu1')
      }
      get Fri1(){
        return this.addScheduleDataFormForNineHours.get('Fri1')
      }
      get Sat1(){
        return this.addScheduleDataFormForNineHours.get('Sat1')
      }
      get Sun1(){
        return this.addScheduleDataFormForNineHours.get('Sun1')
      }
      get Mon2(){
        return this.addScheduleDataFormForNineHours.get('Mon2')
      }

      get Tue2(){
        return this.addScheduleDataFormForNineHours.get('Tue2')
      }
      get Wed2(){
        return this.addScheduleDataFormForNineHours.get('Wed2')
      }
      get Thu2(){
        return this.addScheduleDataFormForNineHours.get('Thu2')
      }
      get Fri2(){
        return this.addScheduleDataFormForNineHours.get('Fri2')
      }
      get Sat2(){
        return this.addScheduleDataFormForNineHours.get('Sat2')
      }
      get Sun2(){
        return this.addScheduleDataFormForNineHours.get('Sun2')
      }
      oldtempScheduleDataStoredForNineHoursOne=['X','X','X','X','X','X','X']
      oldtempScheduleDataStoredForNineHoursTwo=['X','X','X','X','X','X','X']
      async checkAddNewShiftDefintionForNineHours(){
        this.tempScheduleDataStoredForNineHoursTwo= [this.addScheduleDataFormForNineHours.controls.Sun2.value,this.addScheduleDataFormForNineHours.controls.Mon2.value,this.addScheduleDataFormForNineHours.controls.Tue2.value,this.addScheduleDataFormForNineHours.controls.Wed2.value,this.addScheduleDataFormForNineHours.controls.Thu2.value,this.addScheduleDataFormForNineHours.controls.Fri2.value,this.addScheduleDataFormForNineHours.controls.Sat2.value];
        this.tempScheduleDataStoredForNineHoursOne= [this.addScheduleDataFormForNineHours.controls.Sun1.value,this.addScheduleDataFormForNineHours.controls.Mon1.value,this.addScheduleDataFormForNineHours.controls.Tue1.value,this.addScheduleDataFormForNineHours.controls.Wed1.value,this.addScheduleDataFormForNineHours.controls.Thu1.value,this.addScheduleDataFormForNineHours.controls.Fri1.value,this.addScheduleDataFormForNineHours.controls.Sat1.value];
        var checkAddNew=false
        var count

        for(var j=0;j<this.tempScheduleDataStoredForNineHoursOne.length;j++){
          if(this.tempScheduleDataStoredForNineHoursOne[j]=='add'){
            checkAddNew=true
            if(j==0){this.addScheduleDataFormForNineHours.controls.Sun1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[0])}
            else if(j==1){this.addScheduleDataFormForNineHours.controls.Mon1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[1])}
            else if(j==2){this.addScheduleDataFormForNineHours.controls.Tue1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[2])}
            else if(j==3){this.addScheduleDataFormForNineHours.controls.Wed1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[3])}
            else if(j==4){this.addScheduleDataFormForNineHours.controls.Thu1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[4])}
            else if(j==5){this.addScheduleDataFormForNineHours.controls.Fri1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[5])}
            else if(j==6){this.addScheduleDataFormForNineHours.controls.Sat1.setValue(this.oldtempScheduleDataStoredForNineHoursOne[6])}
          }
        }
        for(var j=0;j<this.tempScheduleDataStoredForNineHoursTwo.length;j++){
          if(this.tempScheduleDataStoredForNineHoursTwo[j]=='add'){
            checkAddNew=true
            if(j==0){this.addScheduleDataFormForNineHours.controls.Sun2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[0])}
            else if(j==1){this.addScheduleDataFormForNineHours.controls.Mon2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[1])}
            else if(j==2){this.addScheduleDataFormForNineHours.controls.Tue2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[2])}
            else if(j==3){this.addScheduleDataFormForNineHours.controls.Wed2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[3])}
            else if(j==4){this.addScheduleDataFormForNineHours.controls.Thu2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[4])}
            else if(j==5){this.addScheduleDataFormForNineHours.controls.Fri2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[5])}
            else if(j==6){this.addScheduleDataFormForNineHours.controls.Sat2.setValue(this.oldtempScheduleDataStoredForNineHoursTwo[6])}
          }
        }
        this.oldtempScheduleDataStoredForNineHoursTwo= [this.addScheduleDataFormForNineHours.controls.Sun2.value,this.addScheduleDataFormForNineHours.controls.Mon2.value,this.addScheduleDataFormForNineHours.controls.Tue2.value,this.addScheduleDataFormForNineHours.controls.Wed2.value,this.addScheduleDataFormForNineHours.controls.Thu2.value,this.addScheduleDataFormForNineHours.controls.Fri2.value,this.addScheduleDataFormForNineHours.controls.Sat2.value];
        this.oldtempScheduleDataStoredForNineHoursOne= [this.addScheduleDataFormForNineHours.controls.Sun1.value,this.addScheduleDataFormForNineHours.controls.Mon1.value,this.addScheduleDataFormForNineHours.controls.Tue1.value,this.addScheduleDataFormForNineHours.controls.Wed1.value,this.addScheduleDataFormForNineHours.controls.Thu1.value,this.addScheduleDataFormForNineHours.controls.Fri1.value,this.addScheduleDataFormForNineHours.controls.Sat1.value];
        if(checkAddNew==true){

            const modal = await this.modalCtrl.create({
              component: CreateNewShiftDefintionPage,
              componentProps: { shift_duration:this.selected_shift_duration },
              cssClass: 'AddNewShiftDefintion',
              swipeToClose:true
            });
            modal.onDidDismiss().then(()=>{
              if(this.selected_shift_duration==9){
                this.allShiftData= JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
                this.allShiftName=[]
        for(var i=0;i<this.allShiftData.length;i++){
        if(isNaN(this.allShiftData[i].shiftName)==false){

          if(this.allShiftData[i].shiftCategory==1){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==2){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==3){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==4){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==5){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==6){
            this.allShiftName.push({"shiftName":Number(this.allShiftData[i].shiftName),"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }

        }else{
          if(this.allShiftData[i].shiftCategory==1){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'MID',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==2){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'EVE',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==3){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'DAY',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==4){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'M/D',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==5){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'D/E',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
          else if(this.allShiftData[i].shiftCategory==6){
            this.allShiftName.push({"shiftName":this.allShiftData[i].shiftName,"shiftCategory":this.allShiftData[i].shiftCategory,"shift_StartTime":this.allShiftData[i].startTime,"shift_category_name":'E/M',"shift_duration":this.allShiftData[i].shift_duration,"shiftData":String(this.allShiftData[i].shiftName)+'-'+String(this.allShiftData[i].shift_duration)})
          }
        // }
        }
        }
        this.allShiftName=this.allShiftName.sort((a,b)=>{
          return a.shift_duration - b.shift_duration
        })
        this.tempScheduleDataStoredForNineHoursTwo= [this.addScheduleDataFormForNineHours.controls.Sun2.value,this.addScheduleDataFormForNineHours.controls.Mon2.value,this.addScheduleDataFormForNineHours.controls.Tue2.value,this.addScheduleDataFormForNineHours.controls.Wed2.value,this.addScheduleDataFormForNineHours.controls.Thu2.value,this.addScheduleDataFormForNineHours.controls.Fri2.value,this.addScheduleDataFormForNineHours.controls.Sat2.value];
        this.tempScheduleDataStoredForNineHoursOne= [this.addScheduleDataFormForNineHours.controls.Sun1.value,this.addScheduleDataFormForNineHours.controls.Mon1.value,this.addScheduleDataFormForNineHours.controls.Tue1.value,this.addScheduleDataFormForNineHours.controls.Wed1.value,this.addScheduleDataFormForNineHours.controls.Thu1.value,this.addScheduleDataFormForNineHours.controls.Fri1.value,this.addScheduleDataFormForNineHours.controls.Sat1.value];

        this.addScheduleDataFormForNineHours = this.formBuilder.group({
          id:[this.scheduleData.id],
          Mon1: [this.tempScheduleDataStoredForNineHoursOne[1]],
          Tue1:[this.tempScheduleDataStoredForNineHoursOne[2]],
          Wed1: [this.tempScheduleDataStoredForNineHoursOne[3]],
          Thu1: [this.tempScheduleDataStoredForNineHoursOne[4]],
          Fri1: [this.tempScheduleDataStoredForNineHoursOne[5]],
          Sat1: [this.tempScheduleDataStoredForNineHoursOne[6]],
          Sun1: [this.tempScheduleDataStoredForNineHoursOne[0]],
          Mon2: [this.tempScheduleDataStoredForNineHoursTwo[1]],
          Tue2:[this.tempScheduleDataStoredForNineHoursTwo[2]],
          Wed2: [this.tempScheduleDataStoredForNineHoursTwo[3]],
          Thu2: [this.tempScheduleDataStoredForNineHoursTwo[4]],
          Fri2: [this.tempScheduleDataStoredForNineHoursTwo[5]],
          Sat2: [this.tempScheduleDataStoredForNineHoursTwo[6]],
          Sun2: [this.tempScheduleDataStoredForNineHoursTwo[0]],
          Pattern:[''],
          // Pattern:[this.da1[8]],
          BMLRule: [this.valid],
          SL:[this.scheduleData.SL]

        })
        this.businessRuleValidationForNineHours()
              }else{
                this.ngOnInit()
              }
              })

            return await modal.present();
        }else{
            this.businessRuleValidationForNineHours()
          }
      }
      businessRuleValidationForNineHours(){
        var countOne=0,count=0
        for(var j=0;j<this.tempScheduleDataStoredForNineHoursOne.length;j++){
          if(this.tempScheduleDataStoredForNineHoursOne[j]=='X'){
            countOne++
          }
        }
        for(var j=0;j<this.tempScheduleDataStoredForNineHoursTwo.length;j++){
          if(this.tempScheduleDataStoredForNineHoursTwo[j]=='X'){
            count++
          }
        }

          this.work_Pattern=''
          var tempBLRuleArray=[]


          for(var j=0;j<this.tempScheduleDataStoredForNineHoursOne.length;j++){
            if(this.tempScheduleDataStoredForNineHoursOne[j]=='X'){
              tempBLRuleArray.push({"sd":'X',"sdu":'X',"id":j})
            }else{
            for(var k=0;k<this.allShiftName.length;k++){
              if(this.tempScheduleDataStoredForNineHoursOne[j]==this.allShiftName[k].shiftData){

                tempBLRuleArray.push({"sd":this.allShiftName[k].shift_StartTime,"sdu":this.allShiftName[k].shift_duration,"id":j})
                this.work_Pattern=this.work_Pattern+this.allShiftName[k].shiftCategory
              }
            }
          }
          }
          for(var j=0;j<this.tempScheduleDataStoredForNineHoursTwo.length;j++){
            if(this.tempScheduleDataStoredForNineHoursTwo[j]=='X'){
              tempBLRuleArray.push({"sd":'X',"sdu":'X',"id":(j+ + +this.tempScheduleDataStoredForNineHoursOne.length)})
            }else{
            for(var k=0;k<this.allShiftName.length;k++){
              if(this.tempScheduleDataStoredForNineHoursTwo[j]==this.allShiftName[k].shiftData){
                this.work_Pattern=this.work_Pattern+this.allShiftName[k].shiftCategory
                tempBLRuleArray.push({"sd":this.allShiftName[k].shift_StartTime,"sdu":this.allShiftName[k].shift_duration,"id":j+ ++this.tempScheduleDataStoredForNineHoursOne.length})
              }
            }
          }
        }


          var right_text = this.work_Pattern.substring(14, this.work_Pattern.indexOf("X"),this.work_Pattern.indexOf("X"));
          var left_text = this.work_Pattern.substring(0, this.work_Pattern.indexOf("X"),this.work_Pattern.indexOf("X"));
          this.convertStringToCharLeft=Array.from(left_text)
          this.convertStringToCharRight=Array.from(right_text)
          this.patternRight=''
          this.patternLeft=''
          for(var i=0;i<this.convertStringToCharRight.length;i++){
            if(this.convertStringToCharRight[i]!=='X'){
              this.patternRight=this.patternRight+this.convertStringToCharRight[i]
            }
          }
          for(var i=0;i<this.convertStringToCharLeft.length;i++){
            if(this.convertStringToCharLeft[i]!=='X'){
              this.patternLeft=this.patternLeft+this.convertStringToCharLeft[i]
            }
          }
          this.work_Pattern=this.patternRight+this.patternLeft
          this.workPattern=''
          this.convertStringToCharLeft=Array.from(this.work_Pattern)

          for(var i=0;i<this.convertStringToCharLeft.length;i++){
            if(this.convertStringToCharLeft[i]=='1'||this.convertStringToCharLeft[i]==1){
              this.workPattern=this.workPattern+'M'
            }
            else if(this.convertStringToCharLeft[i]=='2'||this.convertStringToCharLeft[i]==2){
              this.workPattern=this.workPattern+'E'
            }
            else if(this.convertStringToCharLeft[i]=='3'||this.convertStringToCharLeft[i]==3){
              this.workPattern=this.workPattern+'D'
            }
            else if(this.convertStringToCharLeft[i]=='4'||this.convertStringToCharLeft[i]==4 || this.convertStringToCharLeft[i]=='5'||this.convertStringToCharLeft[i]==5 || this.convertStringToCharLeft[i]=='6'||this.convertStringToCharLeft[i]==6){
              this.workPattern=this.workPattern+'S'
            }
          }
          this.work_Pattern=this.workPattern

            this.hrs=0
            for(var j=0;j<this.tempScheduleDataStoredForNineHoursOne.length;j++){
              if(this.tempScheduleDataStoredForNineHoursOne[j]!='X' && this.tempScheduleDataStoredForNineHoursOne[j]!=undefined){
                this.hrs=this.hrs+ + +Number(this.tempScheduleDataStoredForNineHoursOne[j].split('-')[1])
              }
            }
            for(var j=0;j<this.tempScheduleDataStoredForNineHoursTwo.length;j++){
              if(this.tempScheduleDataStoredForNineHoursTwo[j]!='X' && this.tempScheduleDataStoredForNineHoursTwo[j]!=undefined){
                this.hrs=this.hrs+ + +Number(this.tempScheduleDataStoredForNineHoursTwo[j].split('-')[1])
              }
            }
            tempBLRuleArray=tempBLRuleArray.sort((a,b)=>{return a.id-b.id})
            this.shift_line={
              "SUN": {"shift":tempBLRuleArray[0].sd, "length": tempBLRuleArray[0].sdu},
              "MON": {"shift":tempBLRuleArray[1].sd, "length": tempBLRuleArray[1].sdu},
              "TUE": {"shift":tempBLRuleArray[2].sd, "length": tempBLRuleArray[2].sdu},
              "WED": {"shift":tempBLRuleArray[3].sd, "length": tempBLRuleArray[3].sdu},
              "THU": {"shift":tempBLRuleArray[4].sd, "length": tempBLRuleArray[4].sdu},
              "FRI": {"shift":tempBLRuleArray[5].sd, "length": tempBLRuleArray[5].sdu},
              "SAT": {"shift":tempBLRuleArray[6].sd, "length": tempBLRuleArray[6].sdu},
              "SUN2": {"shift":tempBLRuleArray[7].sd, "length": tempBLRuleArray[7].sdu},
              "MON2": {"shift":tempBLRuleArray[8].sd, "length": tempBLRuleArray[8].sdu},
              "TUE2": {"shift":tempBLRuleArray[9].sd, "length": tempBLRuleArray[9].sdu},
              "WED2": {"shift":tempBLRuleArray[10].sd, "length": tempBLRuleArray[10].sdu},
              "THU2": {"shift":tempBLRuleArray[11].sd, "length": tempBLRuleArray[11].sdu},
              "FRI2": {"shift":tempBLRuleArray[12].sd, "length": tempBLRuleArray[12].sdu},
              "SAT2": {"shift":tempBLRuleArray[13].sd, "length": tempBLRuleArray[13].sdu},
          }
          if(this.hrs==80){

            this.busniessRulesValidation.businessRulesCheckForHybridShiftLines(this.shift_line).subscribe(
               (res)=>{

                var tempRes,tempObj,tempArr=[]
                tempRes=res
                this.valid=tempRes.business_rules
                for(var j=0;j<tempBLRuleArray.length;j++){
                  if(tempBLRuleArray[j]!=undefined && tempBLRuleArray[j].sd!=undefined&& tempBLRuleArray[j].sd!=null&&tempBLRuleArray[j].sd!='X'){
                      tempArr.push(tempBLRuleArray[j].sd)
                    }else{
                      tempArr.push('X')
                   }
                 }
                 var tempObj
                 tempObj={
                    "shift_line": tempArr,
                 }

                   this.disableAddButton=false

              },
            (error: any)=>{
              this.disableAddButton=true
              this.errorMsg=error;console.log(this.errorMsg)},
             () => {
            }

            );
          }
            if((countOne==2 && count==3) ||(countOne==3 && count==2) ){

         }
      }

}





