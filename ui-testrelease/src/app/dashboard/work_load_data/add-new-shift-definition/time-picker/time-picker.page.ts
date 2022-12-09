import { Time } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ShiftCategoryInfoPage } from '../shift-category-info/shift-category-info.page';
import { ShiftCategoryStartTimePage } from '../shift-category-start-time/shift-category-start-time.page';
import { ShiftDefinition } from 'src/app/model/shiftDefinition';
import { WorkLoadService } from 'src/app/services/work-load.service';

import workloadData from 'src/app/json/work-load-data.json';
@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.page.html',
  styleUrls: ['./time-picker.page.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TimePickerPage, multi: true }]
})
export class TimePickerPage implements OnInit {
  work_load_data=workloadData
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
  start_time: string;
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
user_defined_shift_name=['A','B','C','D','E','F','G','H','I','J','K','L','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// user_defined_shift_name=['A','B','C','D']
select_shift_name= [] as any
  shift_Category: any;
  user_data: any;
  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
this.midShift_start=2300
this.midShift_end=700
this.dayShift_start=700
this.dayShift_end=1500
this.eveShift_start=1500
this.eveShift_end=2300
if(this.midShift_start>1200){
  this.midShift_start= this.midShift_start+ - + 2400

}
this.midAvg=(this.midShift_start + + + this.midShift_end) / 2
this.dayAvg=(this.dayShift_start + + + this.dayShift_end) / 2
this.eveAvg=(this.eveShift_start + + + this.eveShift_end) / 2


    this.allShiftData=  JSON.parse(localStorage.getItem('allShift'))

    if(this.allShiftData!=null){
    for(var i=0;i<this.allShiftData.length;i++){

      if(this.allShiftData[i].sh_name!=null){
      this.allShiftName.push(this.allShiftData[i].sh_name)
    }
    }}

    this.allShiftName = this.user_defined_shift_name.filter(val => !this.allShiftName.includes(val));

    if(this.allShiftName.length>0){
      this.addnewShiftDefinition.sh_category=this.allShiftName[0]
    }else{
      this.addnewShiftDefinition.sh_category='N/A'
    }

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

  constructor(public addNewShiftDefinition:WorkLoadService,
              public modalCtrl: ModalController,
              public shiftDefSer:WorkLoadService,
              public navCtrl: NavController,
              public formBuilder: FormBuilder) {


    const j = 84;
    for (let min = 1; min <= 12; min++) {
      const hh = String(min);



      const x = 1 + Math.sin(Math.PI * 2 * (min / 12));
      const y = 1 - Math.cos(Math.PI * 2 * (min / 12));
      this.dialhr.push({ top: j * y + 'px', left: j * x + 'px', hh });
    }
    for (let min = 1; min <= 60; min++) {


      let mm = String('00' + min ).slice(-2);

      const x = 1 + Math.sin(Math.PI * 2 * (min / 60));
      const y = 1 - Math.cos(Math.PI * 2 * (min / 60));
      if(mm==='60'){
       mm="00"

       this.dial.push({ top: j * y + 'px', left: j * x + 'px', mm });
      }else{
        this.dial.push({ top: j * y + 'px', left: j * x + 'px', mm });
      }

    }


  }

  public writeValue() {

    let hh = this.date.getHours(),

      mm = this.date.getMinutes();

      this.ampm = hh < 12 ? 'am' : 'pm';
    this.hour = String(hh % 12 || 12);

    this.minute = String('00' + (mm )).slice(-2);
    this.time1=String(hh % 12  || 12)





//8 hours
    if(this.ampm=='pm'){
      let addHh=(Number(this.hour)+20)
      if(24<=addHh){
        this.ampm248=addHh % 24
        this.hour8=this.ampm248
        if(Number(this.hour)==12 && this.ampm=='pm'){
          this.addampm8='pm'
        }else{
          this.addampm8 = this.ampm248 < 12 ? 'am' : 'pm';
        }
      }else{
        this.addampm8 = this.ampm248 < 12 ? 'am' : 'pm';
        this.hour8=addHh % 12 ||12
      }

    }else{
      let addHh=(Number(this.hour)+8)

      this.hour8=addHh % 12 ||12
      if(Number(this.hour)==12 && this.ampm=='am'){
        this.addampm8='am'
      }else{
        this.addampm8 = addHh < 12 ? 'am' : 'pm';
      }
    }

    if(this.ampm=='am'){
      if(Number(this.hour)<10){
        if(Number(this.hour)==12 && this.ampm==='am'){
          this.start_time='00'+':'+this.minute+':00'
        }else{
          this.start_time='0'+Number(this.hour)+':'+this.minute+':00'
        }
      }else{
        if(Number(this.hour)==12 && this.ampm=='am'){
          this.start_time='00'+':'+this.minute+':00'
        }else{
          this.start_time=Number(this.hour)+':'+this.minute+':00'
        }
      }

    }else if(this.ampm=='pm'){
        if(Number(this.hour)==12 ){
          this.start_time=Number(this.hour)+':'+this.minute+':00'
        }else{
          this.start_time=(Number(this.hour)+ + +12)+':'+this.minute+':00'
        }

    }

    this.end_time=this.hour8+':'+this.minute+':00'

this.convertTimetoString=Array.from(this.start_time)
this.convert_start_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]

this.convertTimetoString=Array.from(this.end_time)
this.convert_end_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]



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



// if(Number(this.c)>2300 && Number(this.c)<2400){this.c=Number(this.c)+ - +2400
// }
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
//9 hours
    if(this.ampm=='pm'){
      let addHh=(Number(this.hour)+21)
      if(24<=addHh){
        this.ampm249=addHh % 24
        this.hour9=this.ampm249
        if(Number(this.hour)==12 && this.ampm=='pm'){
          this.addampm9='pm'
        }else{
          this.addampm9 = this.ampm249 < 12 ? 'am' : 'pm';
        }
      }else{
        this.addampm9 = this.ampm24 < 12 ? 'am' : 'pm';
        this.hour9=addHh % 12 ||12
      }

    }else{
      let addHh=(Number(this.hour)+9)

      this.hour9=addHh % 12 ||12
      if(Number(this.hour)==12 && this.ampm=='am'){
        this.addampm9='am'
      }else{
        this.addampm9 = addHh < 12 ? 'am' : 'pm';
      }
    }

//10 hours
    if(this.ampm=='pm'){
      let addHh=(Number(this.hour)+22)
      if(24<=addHh){
        this.ampm2410=addHh % 24
        this.hour10=this.ampm2410
        if(Number(this.hour)==12 && this.ampm=='pm'){
          this.addampm10='pm'
        }else{
          this.addampm10 = this.ampm2410 < 12 ? 'am' : 'pm';
        }
      }else{
        this.addampm10 = this.ampm2410 < 12 ? 'am' : 'pm';
        this.hour10=addHh % 12 ||12
      }

    }else{
      let addHh=(Number(this.hour)+10)

      this.hour10=addHh % 12 ||12
      if(Number(this.hour)==12 && this.ampm=='am'){
        this.addampm10='am'
      }else{
        this.addampm10 = addHh < 12 ? 'am' : 'pm';
      }
    }

  }
  // // get ShiftAlies(){
    // return this.addNewShiftDefinitionForm.get('shiftAlies')
  // }
  public registerOnChange = (fn: any) => this.onChange = fn;
//
  public registerOnTouched = (fn: any) => this.onTouched = fn;

  timeChange($event) {

    if (this.hhmm === 'hh') {
      this.hour = $event;


      if(this.ampm=='pm'){

        this.t8=Number(this.hour)+20

        if(this.t8>23){

          this.hour8=this.t8-24

          if(Number(this.hour)==12){
            this.addampm8='pm'
          }else{
            this.addampm8='am'
          }
        }else{
          this.hour8=this.t8-12
          this.addampm8='pm'

        }

      }
      else if(this.ampm=='am'){

        this.t8=Number(this.hour)+8

        if(this.t8>23){

        }else{

          if(this.t8>12){

            this.hour8=this.t8-12
            if(Number(this.hour)==12){
              this.addampm8='am'
            }else{
              this.addampm8='pm'
            }

            }else{

            if(Number(this.hour)<4)
            {
              this.addampm8='am'
            }else{
              this.addampm8='pm'
            }
              this.hour8=this.t8

            }

        }
        this.end_time=this.hour8+':'+this.minute+':00'

      }

      if(this.ampm=='pm'){
        this.t9=Number(this.hour)+21

        if(this.t9>23){

          this.hour9=this.t9-24
          this.addampm9='am'
        }else{
          this.hour9=this.t9-12
          this.addampm9='pm'

        }

      }
      else if(this.ampm=='am'){
        this.t9=Number(this.hour)+9
        if(this.t9>23){

        }else{

          if(this.t9>12){
            this.addampm9='pm'
            this.hour9=this.t9-12
            }else{
              this.addampm9='am'
              this.hour9=this.t9
            }
        }
      }

      if(this.ampm=='pm'){
        this.t10=Number(this.hour)+22

        if(this.t10>23){

          this.hour10=this.t10-24
          this.addampm10='am'
        }else{
          this.hour10=this.t10-12
          this.addampm10='pm'

        }

      }
      else if(this.ampm=='am'){
        this.t10=Number(this.hour)+10
        if(this.t10>23){

        }else{

          if(this.t10>12){
            this.addampm10='pm'
            this.hour10=this.t10-12
            }else{
              this.addampm9='am'
              this.hour10=this.t10
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
    this.shiftTime=Number(this.hour)
    // let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
    // if (this.ampm === 'am' && hh === 12 || hh === 24) {
    //   hh = 12;
    // }
    // this.date.setHours(hh);
    // this.date.setMinutes(+this.minute);
    // this.onChange(this.date);
    // this.time=this.date
    if(this.ampm=='am'){
      if(Number(this.hour)<10){
        if(Number(this.hour)==12 && this.ampm==='am'){
          this.start_time='00'+':'+this.minute+':00'
        }else{
          this.start_time='0'+Number(this.hour)+':'+this.minute+':00'
        }
      }else{
        if(Number(this.hour)==12 && this.ampm=='am'){
          this.start_time='00'+':'+this.minute+':00'
        }else{
          this.start_time=Number(this.hour)+':'+this.minute+':00'
        }
      }

    }else if(this.ampm=='pm'){
        if(Number(this.hour)==12 ){
          this.start_time=Number(this.hour)+':'+this.minute+':00'
        }else{
          this.start_time=(Number(this.hour)+ + +12)+':'+this.minute+':00'
        }

    }

if(this.addampm8=='pm'){
  this.updated_hour8=this.hour8+12

}else{

  if(this.hour8==0){
    this.updated_hour8=24
  }else{
    this.updated_hour8=this.hour8
  }

}
    if(Number(this.updated_hour8)<10){
      if(Number(this.updated_hour8)==12 && this.addampm8=='am'){
        this.end_time='00'+':'+this.minute+':00'
      }else{
        this.end_time='0'+Number(this.hour8)+':'+this.minute+':00'
      }
    }else{
      if(Number(this.updated_hour8)==12 && this.addampm8=='am'){
        this.end_time='00'+':'+this.minute+':00'
      }else{
        this.end_time=Number(this.updated_hour8)+':'+this.minute+':00'
      }
    }

    // this.end_time=this.hour8+':'+this.minute+':00'

this.convertTimetoString=Array.from(this.start_time)
this.convert_start_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]

this.convertTimetoString=Array.from(this.end_time)
this.convert_end_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]

// this.e=Number(this.c)+ - +Number(this.midAvg)



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



// if(Number(this.c)>2300 && Number(this.c)<2400){this.c=Number(this.c)+ - +2400
// }
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
  rotateHand() {
    const deg = this.hhmm === 'hh' ? +this.hour * 5 : +this.minute;
    return `rotate(${ deg * 6 }deg)`;
  }
  rotateHandMin() {
    const deg = this.hhmm === 'mm' ? +this.minute : +this.hour * 5  ;
    return `rotate(${ deg *6 }deg)`;
  }

  cancel(){
    this.navCtrl.navigateBack('workload-data-generate')
  }

   ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}


changeAm(){


// if(this.addnewShiftDefinition.shift_category=='A'){
  // this.t8=Number(this.hour8)


  this.t8=Number(this.hour)+8

  if(this.t8>23){

  }else{

    if(this.t8>12){

      this.hour8=this.t8-12
      if(Number(this.hour)==12){
        this.addampm8='am'
      }else{
        this.addampm8='pm'
      }

      }else{

      if(Number(this.hour)<4)
      {
        this.addampm8='am'
      }else{
        this.addampm8='pm'
      }
        this.hour8=this.t8

      }

if(this.hour8<10){
  this.end_time='0'+this.hour8+':'+this.minute+':00'


}else{
  this.end_time=this.hour8+':'+this.minute+':00'


}



}
if(Number(this.hour)==12){
  this.start_time='00'+':'+this.minute+':00'
}else{
  this.start_time=Number(this.hour)+':'+this.minute+':00'
}

  if(Number(this.hour)<10){
    if(Number(this.hour)==12 ){
      this.start_time='00'+':'+this.minute+':00'
    }else{
      this.start_time='0'+Number(this.hour)+':'+this.minute+':00'
    }
  }else{
    if(Number(this.hour)==12 ){
      this.start_time='00'+':'+this.minute+':00'
    }else{
      this.start_time=Number(this.hour)+':'+this.minute+':00'
    }
  }

this.convertTimetoString=Array.from(this.start_time)
this.convert_start_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]

this.convertTimetoString=Array.from(this.end_time)
this.convert_end_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
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
changePm(){
//   this.t8=Number(this.hour)+20
//   if(this.t8>23){
//
//     this.hour8=this.t8-24
//     this.addampm8='am'
//   }else{
//     this.hour8=this.t8
//     this.addampm8='pm'
// }

this.t8=Number(this.hour)+20

if(this.t8>23){

  this.hour8=this.t8-24

  if(Number(this.hour)==12){
    this.addampm8='pm'
  }else{
    this.addampm8='am'
  }
}else{
  this.hour8=this.t8-12
  this.addampm8='pm'

}
// let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
//     if (this.ampm === 'am' && hh === 12 || hh === 24) {
//       hh = 12;
//     }
//     this.date.setHours(hh);
//     this.date.setMinutes(+this.minute);
//     this.onChange(this.date);
//     this.time=this.date
this.start_time=Number(this.hour)+ + +12+':'+this.minute+':00'
    this.end_time=this.hour8+':'+this.minute+':00'

if(Number(this.hour)==12 ){
  this.start_time=Number(this.hour)+':'+this.minute+':00'
}else{
  this.start_time=(Number(this.hour)+ + +12)+':'+this.minute+':00'
}


this.convertTimetoString=Array.from(this.start_time)
this.convert_start_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]

this.convertTimetoString=Array.from(this.end_time)
this.convert_end_shift_time_to_number=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]

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
    if(this.s_category=='M'){
      this.s_category=1
    }else if(this.s_category=='E'){
      this.s_category=2
    }else if(this.s_category=='D'){
      this.s_category=3
    }else if(this.s_category=='MD'){
      this.s_category=4
    }else if(this.s_category=='DE'){
      this.s_category=5
    }else if(this.s_category=='EM'){
      this.s_category=6
    }
    let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
    if (this.ampm === 'am' && hh === 12 || hh === 24) {
      hh = 12;
    }
    this.date.setHours(hh);
    this.date.setMinutes(+this.minute);
    this.onChange(this.date);
    this.time=this.date
    this.start_time=hh+':'+this.minute+':00'
var user_data=JSON.parse(sessionStorage.getItem('userData'))
    this.end_time=this.hour8+':'+this.minute+':00'
    this.result=this.time.toLocaleTimeString('it-IT')
    this.test1={"sh_starttime": this.start_time,"sh_endtime":this.end_time,"sh_duration":8,"sh_created_by":"user","sh_name":this.addnewShiftDefinition.sh_category,"sh_category_id":this.s_category,"userid": user_data.id,"sh_include_exclude":"I"}
    this.addnewShiftDefinition.sh_starttime=this.start_time

    this.addNewShiftDefinition.addNewShiftDefinition(this.test1).subscribe(
        (data: any)=>{
          this.result=data;

          localStorage.setItem('newSHiftDefinition',JSON.stringify(this.result))

        },
            (error: any)=>this.errorMsg=error,
            () => {
               this.shiftDefSer.getAllShiftDefinition(this.user_data.id).subscribe(

                (res)=>{
                this.allShift=res;

                // let res=[]
                var user_all_shift=[]
                for(var i=0;i<this.allShift.length;i++){
                  if(Number(this.allShift[i].userid)==Number(user_data.id)){
                    user_all_shift.push(this.allShift[i])
                  }
                }

                localStorage.setItem('allShift',JSON.stringify(user_all_shift))

                this.allll=[]
                this.allShiftData=  JSON.parse(localStorage.getItem('allShift'))


                for(var i=0;i<this.allShiftData.length;i++){
                  this.convertTimetoString=Array.from(this.allShiftData[i].sh_starttime)
                  this.sh_startTime=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
                    // this.sh_startTime=Array.from(this.allShiftData[i].sh_starttime)
                    // this.sh_startTime=Number(this.sh_startTime)

                    this.shift_name=this.allShiftData[i].sh_name


                    this.work_load_data.push(
                      {"id": 9+i,
                      "startTime": this.sh_startTime,
                      // "s_category":1,
                      "Sun": "0",
                      "Mon": "0",
                      "Tue": "0",
                      "Wed": "0",
                      "Thu": "0",
                      "Fri": "0",
                      "Sat": "0",
                      "shiftName":this.shift_name,
                      "shift_duration":8,
                      "shiftCategory":this.allShiftData[i].sh_category_id,
                      "shift_created_by":'user',
                      "sh_include_exclude":this.allShiftData[i].sh_include_exclude
                     })
                      // this.allShift[i])

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
                  // this.work_load_data.push(this.arrangeShiftdefintionG)
                  for(var i=0;i<this.arrangeShiftdefintionG.length;i++){
                    this.work_load_data.push(this.arrangeShiftdefintionG[i])
                  }
                  for(var i=0;i<this.arrangeShiftdefintionL.length;i++){
                    this.work_load_data.push(this.arrangeShiftdefintionL[i])
                  }

                  for(var i=0;i<this.work_load_data.length;i++){


                    // this.shift_name=this.allShiftData[i].sh_name
                    if(this.work_load_data[i].shiftName!=null){
                        // this.allShiftName.push({"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
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


                  // this.work_load_data.sort((a,b) => a.startTime.localeCompare(b.startTime));

                  localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(this.work_load_data))

              },
            (error: any)=>{this.errorMsg=error
            console.log(this.errorMsg)},
            ()=>{
              this.close.emit();
              setTimeout(() => {
                 location.reload()

                this.navCtrl.navigateForward(['workload-data-generate']).then(() => {
                  location.reload();
                });
                }, 0);
            }
          );
  }
        );

  }
}

