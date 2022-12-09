import { Time } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import workloadData from 'src/app/json/work-load-data.json';
import { ShiftDefinition } from 'src/app/model/shiftDefinition';
import { WorkLoadService } from 'src/app/services/work-load.service';
import straightlines_io_apis from 'src/app/json/apis.json';
import { HeaderTitleForModalPageService } from '../../nav-bar-footer/header-title-for-modal-page.service';
import { ShiftCategoryInfoPage } from '../add-new-shift-definition/shift-category-info/shift-category-info.page';
import { ShiftCategoryStartTimePage } from '../add-new-shift-definition/shift-category-start-time/shift-category-start-time.page';
@Component({
  selector: 'app-create-new-shift-defintion',
  templateUrl: './create-new-shift-defintion.page.html',
  styleUrls: ['./create-new-shift-defintion.page.scss'],
})
export class CreateNewShiftDefintionPage implements OnInit {
  shift_duration:any=8
  work_load_data=[]
  workloadData=workloadData
  arrangeShiftdefintionG=[]
  arrangeShiftdefintionL=[]
  allShiftData
  shiftLen
    allll=[]as any
    sh_startTime
    shift_name
    convertTimetoString
    allShiftName=[] as any
  time: any;
  test: any;
  test1: any;
  errorMsg: any;
  result: Time;
  start_time: any;
  testing="testing"
  addampm8: string;
  ampm24: any;
  hour8: any;
  shiftCategoray: any;
  hour9: number;
  addampm9: string;
  addampm10: string;
  hour10: number;
  ampm248: number;
  ampm249: number;
  ampm2410: number;
  t: number;
  t8: number;
  t9: any;
  t10: number;
  shiftTime: any;
  end_time
  allShift: ShiftDefinition[];
dayShift_start
midShift_start
eveShift_start
shiftDiff_start
dayShift_end
eveShift_end
midShift_end
dayShift
dayAvg
midAvg
eveAvg
midShift
eveShift
s_category
shiftCategory_diff
convert_start_shift_time_to_number
convert_end_shift_time_to_number
updated_hour8
start_time_summary
user_defined_shift_name=['A','B','C','D','E','F','G','H','I','J','K','L','O','P','Q','R','S','T','U','V','W','Y','Z']
// user_defined_shift_name=['A','B','C','D']
select_shift_name= [] as any
  shift_Category: any;
  user_data: any;
allShiftDefintions=[]
myDate
  dateParsed: string;
  end____time: any;
  duplicateShiftDefintion=false;


  constructor(public addNewShiftDefinition:WorkLoadService,
    public modalCtrl: ModalController,
    public shiftDefSer:WorkLoadService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private headerTitleService: HeaderTitleForModalPageService,
    public formBuilder: FormBuilder) {
      this.shift_duration=navParams.get('shift_duration')

}

  ngOnInit() {
    this.headerTitleService.setTitle('New Shift');

    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
this.midShift_start=2300
this.midShift_end=700
this.dayShift_start=700
this.dayShift_end=1500
this.eveShift_start=1500
this.eveShift_end=2300
this.allShiftDefintions=[]
for(var i=0;i<this.workloadData.length;i++){
  if(this.workloadData[i].shift_created_by=='system'){
  this.allShiftDefintions.push({"startTime":this.workloadData[i].startTime,'sh_duration':this.workloadData[i].shift_duration})
  }
}
if(this.midShift_start>1200){
  this.midShift_start= this.midShift_start+ - + 2400
}
this.midAvg=(this.midShift_start + + + this.midShift_end) / 2
this.dayAvg=(this.dayShift_start + + + this.dayShift_end) / 2
this.eveAvg=(this.eveShift_start + + + this.eveShift_end) / 2
    this.allShiftData=  JSON.parse(localStorage.getItem('allShift'))

    this.allShiftName=[]
    if(this.allShiftData!=null){
    for(var i=0;i<this.allShiftData.length;i++){
      if(this.allShiftData[i].sh_name!=null){
        this.allShiftDefintions.push({"startTime":this.allShiftData[i].sh_starttime.split(':')[0]+this.allShiftData[i].sh_starttime.split(':')[1],'sh_duration':this.allShiftData[i].sh_duration})
      this.allShiftName.push(this.allShiftData[i].sh_name)
    }
    }}

    this.allShiftName = this.user_defined_shift_name.filter(val => !this.allShiftName.includes(val));
    if(this.allShiftName.length>0){
      this.addnewShiftDefinition.sh_category=this.allShiftName[0]
    }else{
      this.addnewShiftDefinition.sh_category='N/A'
    }
this.addnewShiftDefinition.sh_duration=String(this.shift_duration)
    this.start_time = new Date().toString();
    this.dateParsed=this.start_time
var startTimeForvalidation


    if(this.date.getHours()<10){
      if(this.date.getMinutes()<10){
        startTimeForvalidation='0'+this.date.getHours()+'0'+this.date.getMinutes()
      }else{
        startTimeForvalidation='0'+this.date.getHours()+''+this.date.getMinutes()
      }
    }else{
      if(this.date.getMinutes()<10){
        startTimeForvalidation=this.date.getHours()+'0'+this.date.getMinutes()
      }else{
        startTimeForvalidation=this.date.getHours()+''+this.date.getMinutes()
      }
    }
   this.start_time_summary=this.date.toLocaleTimeString().substr(0,4)+' '+this.date.toLocaleTimeString().substr(8,9)

    var temp_cur_time=Number(this.date.getHours())
    var temp_cur_min=Number(this.date.getMinutes())
    var cur_minutes
    if(temp_cur_min<10){
      cur_minutes='0'+temp_cur_min
    }else{
      cur_minutes=temp_cur_min
    }

    if(Number(this.date.getHours())>12){
      this.ampm='PM'
       temp_cur_time=Number(this.date.getHours())+ - +12
      if(temp_cur_time>9){
        this.start_time_summary=temp_cur_time+':'+cur_minutes+' '+this.ampm
        }else{
          this.start_time_summary='0'+temp_cur_time+':'+cur_minutes+' '+this.ampm
        }
    }else{
      this.ampm='AM'
      if(this.date.getHours()>9){
      this.start_time_summary=temp_cur_time+':'+cur_minutes+' '+this.ampm
      }else{
        this.start_time_summary='0'+temp_cur_time+':'+cur_minutes+' '+this.ampm
      }

    }

    var temp_end_cur_time=Number(this.date.getHours())
    var temp_end_cur_min=Number(this.date.getMinutes())
    var cur_end_minutes
    var end_time=temp_end_cur_time+':'+temp_end_cur_min
    if(temp_end_cur_min<10){
      cur_end_minutes='0'+temp_end_cur_min
    }else{
      cur_end_minutes=temp_end_cur_min
    }
var end_time_hour=Number(temp_end_cur_time)+ + +this.shift_duration;
if(Number(end_time_hour>23)){
  end_time_hour=end_time_hour+ - +24
}
var temp_end_time
if(Number(end_time_hour>12)){
  temp_end_time=(Number(end_time_hour))+ - +12
  this.ampm='PM'
  if(temp_end_time<10){
    this.end_time='0'+temp_end_time+':'+cur_end_minutes+' '+this.ampm
  }else{
    this.end_time=temp_end_time+':'+cur_end_minutes+' '+this.ampm
  }
}else{
  this.ampm='AM'
  if(end_time_hour==12){
    this.ampm='PM'
  }
  if(end_time_hour<10){
    this.end_time='0'+end_time_hour+':'+cur_end_minutes+' '+this.ampm
  }else{
    this.end_time=end_time_hour+':'+cur_end_minutes+' '+this.ampm
  }


}
this.end____time=this.end_time
var count=0
for(var i=0;i<this.allShiftDefintions.length;i++){
  if(this.allShiftDefintions[i].startTime==startTimeForvalidation){
    count++
  }
}
if(count>0){
  this.duplicateShiftDefintion=true
}
this.shiftTimeCategory(this.start_time_summary,this.end_time)
}

convertStringToNumber(str){
  var number
  number=Number(str)
  return number
}
  @Output() close = new EventEmitter();
  time1
  auto = true;
  hhmm = 'hh';
  ampm = 'am';
  dial = [];
  dialhr = [];
  hour = '12';
  minute = '00';
  shift=[]
  // shiftAlies='A'
  addnewShiftDefinition= new ShiftDefinition();
  // addNewShiftDefinitionForm: FormGroup;
  private date = new Date;
  private date1 = new Date;
  private onChange = (v: Date) => {};

  private onTouched = () => {};


  cancel(){
    this.modalCtrl.dismiss();
  }

   ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}
changeShiftDuration(){
  this.shift_duration=Number(this.addnewShiftDefinition.sh_duration)
  this.changeShiftTime()
}
shiftTimeCategory(startTime,endTime){
this.convertTimetoString=Array.from(startTime)
this.convert_start_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
if(this.convertTimetoString[6]+this.convertTimetoString[7]=='PM'){
  if(Number(this.convertTimetoString[0]+this.convertTimetoString[1])==12){
    this.convert_start_shift_time_to_number=Number(this.convert_start_shift_time_to_number)
  }else{
    this.convert_start_shift_time_to_number=Number(this.convert_start_shift_time_to_number)+ + +1200;
  }

}
this.convertTimetoString=Array.from(endTime)
this.convert_end_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
if(this.convertTimetoString[6]+this.convertTimetoString[7]=='PM'){
  this.convert_end_shift_time_to_number=Number(this.convert_end_shift_time_to_number)+ + +1200;
}

if(Number(this.convert_start_shift_time_to_number)>=2300 && Number(this.convert_start_shift_time_to_number)<=2400){this.convert_start_shift_time_to_number=Number(this.convert_start_shift_time_to_number)+ - +2400
  this.shiftCategory_diff=Number(this.convert_start_shift_time_to_number)+ - +Number(this.midAvg)
if(this.shiftCategory_diff>0 ){
this.s_category="D"
}else if(this.shiftCategory_diff<0){
this.s_category="M"
}else{
this.s_category="MD"
}
}
else if( (Number(this.convert_start_shift_time_to_number)>=this.midShift_start )&& (Number(this.convert_start_shift_time_to_number)<=this.midShift_end)){
this.shiftCategory_diff=Number(this.convert_start_shift_time_to_number)+ - +Number(this.midAvg)
    if(this.shiftCategory_diff>0 ){
      this.s_category="D"
    }else if(this.shiftCategory_diff<0){
      this.s_category="M"
    }else{
      this.s_category="MD"
    }
}
else if(Number(this.convert_start_shift_time_to_number)>=this.dayShift_start && Number(this.convert_start_shift_time_to_number)<=this.dayShift_end){
this.shiftCategory_diff=Number(this.convert_start_shift_time_to_number)+ - +Number(this.dayAvg)
    if(this.shiftCategory_diff>0 ){
      this.s_category="E"
    }else if(this.shiftCategory_diff<0){
      this.s_category="D"
    }else{
      this.s_category="DE"
    }
  }
  else if(Number(this.convert_start_shift_time_to_number)>=this.eveShift_start && Number(this.convert_start_shift_time_to_number)<=this.eveShift_end){
    this.shiftCategory_diff=Number(this.convert_start_shift_time_to_number)+ - +Number(this.eveAvg)
        if(this.shiftCategory_diff>0 ){
          this.s_category="M"
        }else if(this.shiftCategory_diff<0){
          this.s_category="E"
        }else{
          this.s_category="EM"
        }
      }


}
async shiftCategoryInfo() {

  const modal = await this.modalCtrl.create({
    component: ShiftCategoryInfoPage,
    cssClass: 'shiftCategoryInfo',
    swipeToClose:true
    // mode:'md'
  });
  return await modal.present();
}
changeShiftTime(){

var end_time
var startTimeForvalidation
if(this.dateParsed==this.start_time) {
return this.ngOnInit()
}else{
  this.start_time_summary=this.start_time.substr(11, 5)
  startTimeForvalidation=this.start_time_summary
  end_time=this.start_time.substr(11, 5)


  if(Number(this.start_time_summary[0]+this.start_time_summary[1]>12)){
    var temp_time
    temp_time=(Number(this.start_time_summary[0]+this.start_time_summary[1]))+ - +12
    this.ampm='PM'
    if(temp_time<10){
      this.start_time_summary='0'+temp_time+':'+(this.start_time_summary[3]+this.start_time_summary[4])+' '+this.ampm

    }else{
      this.start_time_summary=temp_time+':'+(this.start_time_summary[3]+this.start_time_summary[4])+' '+this.ampm
    }
  }else{
    this.ampm='AM'
    if(Number(this.start_time_summary[0]+this.start_time_summary[1])==12){
      this.ampm='PM'
    }
    this.start_time_summary=this.start_time_summary+' '+this.ampm


  }



var end_time_hour=Number(end_time[0]+end_time[1])+ + +this.shift_duration;

if(Number(end_time_hour>23)){
  end_time_hour=end_time_hour+ - +24
}

if(Number(end_time_hour>12)){
  var temp_time
  temp_time=(Number(end_time_hour))+ - +12
  this.ampm='PM'
  if(temp_time<10){
    this.end_time='0'+temp_time+':'+(end_time[3]+end_time[4])+' '+this.ampm
  }else{
    this.end_time=temp_time+':'+(end_time[3]+end_time[4])+' '+this.ampm
  }
}else{
  this.ampm='AM'
  if(end_time_hour==12){
    this.ampm='PM'
  }
  if(end_time_hour<10){
    this.end_time='0'+end_time_hour+':'+(end_time[3]+end_time[4])+' '+this.ampm
  }else{
    this.end_time=end_time_hour+':'+(end_time[3]+end_time[4])+' '+this.ampm
  }

}


var count=0
for(var i=0;i<this.allShiftDefintions.length;i++){
  if(this.allShiftDefintions[i].startTime==(startTimeForvalidation.split(':')[0]+startTimeForvalidation.split(':')[1]) && Number(this.shift_duration) == this.allShiftDefintions[i].sh_duration){
    count++
  }
}
if(count>0){
  this.duplicateShiftDefintion=true
}
  this.shiftTimeCategory(this.start_time_summary,this.end_time)
}
}
  async shiftCategoryStartTime(){

  const modal = await this.modalCtrl.create({
    component: ShiftCategoryStartTimePage,
    cssClass: 'shiftCategoryStartTimeInfo',
    swipeToClose:true
    // mode:'md'
  });
  return await modal.present();
}
  set() {
    // this.addnewShiftDefinition.shift_starttime
    var shift_category
    if(this.s_category=='M'){
      shift_category=1
    }else if(this.s_category=='E'){
      shift_category=2
    }else if(this.s_category=='D'){
      shift_category=3
    }else if(this.s_category=='MD'){
      shift_category=4
    }else if(this.s_category=='DE'){
      shift_category=5
    }else if(this.s_category=='EM'){
      shift_category=6
    }
    var final_end_time=this.end_time
    if(final_end_time.substr(6)=="PM"){
      if(Number(final_end_time.substr(0,2))!=12){
        final_end_time=Number(final_end_time.substr(0,2))+ + +12+':'+final_end_time.substr(3,5)
      }
    }
    var final_start_time

    final_start_time=this.start_time_summary

    if(final_start_time.substr(6)=="PM"){
      if(Number(final_start_time.substr(0,2))!=12){
        final_start_time=Number(final_start_time.substr(0,2))+ + +12+':'+final_start_time.substr(3,5)
      }

    }
    final_start_time=final_start_time.substr(0,5)+':00'
    var user_data=JSON.parse(sessionStorage.getItem('userData'))
    final_end_time=final_end_time.substr(0,5)
    final_end_time=final_end_time+':00'
    var new_shift_defintion
    new_shift_defintion={"sh_starttime": final_start_time,"sh_endtime":final_end_time,"sh_duration":this.shift_duration,"sh_created_by":"user","sh_name":this.addnewShiftDefinition.sh_category,"sh_category_id":shift_category,"userid": user_data.id,"sh_include_exclude":"I"}
    this.addnewShiftDefinition.sh_starttime=final_start_time


    this.addNewShiftDefinition.addNewShiftDefinition(new_shift_defintion).subscribe(
        (data: any)=>{
          this.result=data;
          localStorage.setItem('newSHiftDefinition',JSON.stringify(this.result))

        },
            (error: any)=>this.errorMsg=error,
            () => {
              this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(
                (res)=>{
                this.allShift=res;
                this.work_load_data=[]
                  this.getSystemDefinedShifts()

              },
            (error: any)=>{this.errorMsg=error
            console.log(this.errorMsg)},
            ()=>{
              this.close.emit();
              setTimeout(async () => {
                this.modalCtrl.dismiss()
                const alert = await this.alertCtrl.create({
                  cssClass: 'my-custom-class',
                  header: 'Alert',
                  message: "Successfully added!!!",
                  buttons: ['OK']
                });
                await alert.present();
                }, 0);
            }
          );
  }
        );

  }
  getSystemDefinedShifts(){
    var work_load_data=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
      var tempArr=[]
      for(var i=0;i<work_load_data.length;i++){
        if(work_load_data[i].shift_created_by =="system"){
        tempArr.push({
          "id": i,
          "startTime":work_load_data[i].startTime,
          "Sun": work_load_data[i].Sun,
          "Mon": work_load_data[i].Mon,
          "Tue": work_load_data[i].Tue,
          "Wed": work_load_data[i].Wed,
          "Thu": work_load_data[i].Thu,
          "Fri": work_load_data[i].Fri,
          "Sat": work_load_data[i].Sat,
          "shiftName":work_load_data[i].shiftName,
          "shiftCategory":work_load_data[i].shiftCategory,
          "shift_duration":work_load_data[i].shift_duration,
          "shift_created_by":work_load_data[i].shift_created_by,
          "sh_include_exclude":work_load_data[i].sh_include_exclude}
        )
        }
    }
    this.work_load_data=tempArr
        this.getFinalShiftData()
  }
  getFinalShiftData(){
    var user_all_shift=[]
    for(var i=0;i<this.allShift.length;i++){
      if(Number(this.allShift[i].userid)==Number(this.user_data.id)){
        user_all_shift.push(this.allShift[i])
      }
    }
    localStorage.setItem('allShift',JSON.stringify(user_all_shift))
    this.allll=[]
    this.allShiftData=  JSON.parse(localStorage.getItem('allShift'))
    for(var i=0;i<this.allShiftData.length;i++){
      this.convertTimetoString=Array.from(this.allShiftData[i].sh_starttime)
      this.sh_startTime=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
        this.shift_name=this.allShiftData[i].sh_name
        this.work_load_data.push(
          {"id": this.work_load_data.length,
          "startTime": this.sh_startTime,
          "Sun": "0",
          "Mon": "0",
          "Tue": "0",
          "Wed": "0",
          "Thu": "0",
          "Fri": "0",
          "Sat": "0",
          "shiftName":this.shift_name,
          "shiftCategory":this.allShiftData[i].sh_category_id,
          "shift_duration":this.allShiftData[i].sh_duration,
          "shift_created_by":this.allShiftData[i].sh_created_by,
          "sh_include_exclude":this.allShiftData[i].sh_include_exclude
         })
      }
      this.arrangeShiftdefintionG=[]
      this.arrangeShiftdefintionL=[]
      for(var i=0;i<this.work_load_data.length;i++){
        if(Number(this.work_load_data[i].startTime)>2200){
           this.arrangeShiftdefintionG.push(this.work_load_data[i])
        }else if(Number(this.work_load_data[i].startTime)<=2200){
          this.arrangeShiftdefintionL.push(this.work_load_data[i])
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
        if(this.work_load_data[i].shiftName!=null){
          if( Number(this.work_load_data[i].startTime)>2200 ||  Number(this.work_load_data[i].startTime)<600){
            this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
          }
          else if( Number(this.work_load_data[i].startTime)>500 &&  Number(this.work_load_data[i].startTime)<1300){
            this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'D'+ this.work_load_data[i].startTime})
          }
          else if( Number(this.work_load_data[i].startTime)>1200 &&  Number(this.work_load_data[i].startTime)<2300){
            this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'E'+ this.work_load_data[i].startTime})
          }
        }
      }
      localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(this.work_load_data))
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}


