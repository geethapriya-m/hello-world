import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { MyBiddingService } from '../../my-bidding.service';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {

  dates = [
    { date: "2021-10-14", text: "RA, VP" },
    { date: "2021-10-15", text: "RA, VP" }
  ];
  @ViewChild('calendarTwo')  calendarTwo: MatCalendar<Date>;
  value=0
  id_one=0
  id_two=1
  id_three=2
  totalTenDays=0
  id_four=3
  id_five=4
  id_six=5
  selected: Date | null;
  currentSelectedDate=null
  cal_id: any;
  eventSource: any[];
  selectedDate: any;
  viewTitle: any;
  isToday: boolean;
  leaveType: any;
  currentSelectedTwoDate: any[];
  datesToHighlight = [];
  temp: any;
  tempSelectedDate: string;
  clickName: string;
  clickCount=0;
  t: any;
  defaultEventSource
  holiday: boolean;
  selectedLeaveDates: any[];
  rdosInLeave=0
  alertPresented
  selectedLeaves=0
  lockSwipeToPrev: boolean;
  constructor(
    public navCtrl: NavController,
    private myBiddingSer:MyBiddingService,
    private cdref: ChangeDetectorRef,
    private activaRouter: ActivatedRoute,
    private ref: ChangeDetectorRef,
    public alertController: AlertController,
    private headerTitleService: HeaderTitleService) {
    this.activaRouter.params.subscribe(params => {
      this.cal_id=params['_id']
    });
   }
   dateMulti: string[];
   type: 'string';


   calendar = {
     mode: 'month' as CalendarMode,
     step: 30 as Step,
     month:[
       new Date('01/01/2021'),
      new Date('02/01/2021'),
       new Date('03/01/2021'),
      new Date('04/01/2021'),
       new Date('05/01/2021'),
       new Date('06/01/2021'),
       new Date('07/01/2021'),
       new Date('08/01/2021'),
       new Date('09/01/2021'),
       new Date('10/01/2021'),
       new Date('11/01/2021'),
       new Date('12/01/2021'),
     ]
 };

  ngOnInit() {
    this.headerTitleService.setTitle('Calendar');
    this.headerTitleService.setDefaultHeader(true)
      this.headerTitleService.setForwardUrl(null);this.headerTitleService.checkBiddingTime('biddingheader')
      this.headerTitleService.checkBiddingTime('biddingheader')
      if (this.calendar.mode === 'month') {
            this.lockSwipeToPrev = true;
      }
      this.loadEvents()
this.selectedLeaveDates=[]
this.selectedDate=[]
      if(this.cal_id==0){
        this.leaveType='2 weeks NC'
      }else if(this.cal_id==1){
        this.leaveType='2 weeks C'
        this.currentSelectedTwoDate=[]
      }
      else if(this.cal_id==2){
        this.leaveType='5 days (1 Week) in 7'
      }
      else if(this.cal_id==3){
        this.leaveType='Up to 10 days NC'
      }
      else if(this.cal_id==4){
        this.leaveType='1 week'
      }
      else if(this.cal_id==5){
        this.leaveType='1 day'
      }


  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
}
conditionOne(e){
  return (!(this.tempSelectedDate!=null&&e.selected!==true  && e===this.tempSelectedDate)&&e.selected!==true)
}
conditionTwo(e){
  return (e.selected===true)
}
conditionThree(e){
  return (this.tempSelectedDate!=null&&e.selected!==true  && e===this.tempSelectedDate)
}
conditionFour(e){
  var arr=['09/06/2021','10/11/2021','01/11/2021']
  var i=0
  do{
    if(new Date(e.date).getDate() === new Date(arr[i]).getDate() && new Date(e.date).getMonth() === new Date(arr[i]).getMonth() && new Date(e.date).getFullYear() === new Date(arr[i]).getFullYear()){
         this.holiday= true
         return (this.holiday= true)
    }else{
      i++
    }
  }while(i<arr.length)
}

checkConditionTwoDoubleCLick(e){

  return e.slot-e.emp.length>0
}
checkHoliday(){
  var arr=['09/06/2021','10/11/2021','01/11/2021']
var i=0


 do{
  for(var j=0;j<this.eventSource.length;j++){
    var e={"date":this.eventSource[j].startTime}

    if(new Date(e.date).getDate() === new Date(arr[i]).getDate() && new Date(e.date).getMonth() === new Date(arr[i]).getMonth() && new Date(e.date).getFullYear() === new Date(arr[i]).getFullYear()){

  i++
  //  'bg-color'
  }else{
    i++
    // return ''
  }}
}while(i<arr.length)

}

  selectTwo(e){

    this.currentSelectedDate=e
    var temp={
      "date":e.date,
      "disabled":e.disabled,
      "events":e.events,
      "label":e.label,
      "secondary":e.secondary,
      "selected":e.selected,
      "multi":true
    }
    this.currentSelectedTwoDate.push(this.currentSelectedDate)
    // this.testing(this.currentSelectedDate.startTime)

  }
  ch(e)
  {


    // return temp

  }
  testing(e){

var test=e

    for(var i=0;i<this.currentSelectedTwoDate.length;i++){

      if(test.date===this.currentSelectedTwoDate[i].date){


        return true
      }else{
        return false
      }
    }
  }
  onChange($event) {

  }
  idTwo(e){

  }
  dateClass() {

    return (date: Date): MatCalendarCellCssClasses => {

      const highlightDate = this.datesToHighlight.map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

        if(highlightDate==true){
          var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          var dayName = days[new Date(date).getDay()];
          if(dayName=='Sun' || dayName=='Sat'){
            return 'special-date'
          }else{
            return 'special-date-rdo'
          }

        }else{
          return ''
        }
    };
  }

  test1(e){

    this.clickCount++;
    setTimeout(async () => {
        if (this.clickCount === 1) {
             // single
             this.selectedDate=[]
             this.tempSelectedDate=e
             this.selectedDate=[]

             this.selectedDate.push({"event":e})
             this.clickName='single'
        } else if (this.clickCount === 2) {
            // double

this.cal_id=1
            this.currentSelectedDate=e
              if(this.currentSelectedDate===this.tempSelectedDate){
                this.tempSelectedDate=''
              }
            var d=this.currentSelectedDate.startTime
            var tempArr=[] ,temp,date
              if(this.cal_id==4){

              this.selectedLeaves=0
              this.rdosInLeave=0
               var result=this.four()
                this.eventSource=[]
                this.eventSource=result

                this.currentSource=this.listToMatrix(this.eventSource)
                for(var i=0;i<this.selectedLeaveDates.length;i++){
          if(this.selectedLeaveDates[i].title==''){
            if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){
              this.selectedLeaves++
            }
          }else if(this.selectedLeaveDates[i].title!=''){
              this.rdosInLeave++
          }

          }
          if(this.selectedLeaves<1){
            this.eventSource=this.defaultEventSource

            if(!this.alertPresented) {
             this.alertPresented = true
             const alert = await this.alertController.create({
               cssClass: 'my-custom-class',
               header: 'Alert',
               // subHeader: 'Subtitle',
               message: 'All slots are filled. Please select other dates.',
               buttons: [{text:'OK', handler: () => {
                 this.alertPresented = false}
               }]
               });

             await alert.present();
             }
           }
      }else if(this.cal_id==0){

        this.selectedLeaves=0
        this.rdosInLeave=0
                var result=this.six()
                 this.eventSource=[]
                 this.eventSource=result
                 this.listToMatrix(this.eventSource)
                 for(var i=0;i<this.selectedLeaveDates.length;i++){
                  if(this.selectedLeaveDates[i].title==''){
                    if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){
                      this.selectedLeaves++
                    }
                  }else if(this.selectedLeaveDates[i].title!=''){
                      this.rdosInLeave++
                  }

                  }
               }
              else if(this.cal_id==1){
                this.selectedLeaves=0
                this.rdosInLeave=0
                var result=this.one()
                 this.eventSource=[]
                 this.eventSource=result
                 this.currentSource=this.listToMatrix(this.eventSource)

                 for(var i=0;i<this.selectedLeaveDates.length;i++){
                  if(this.selectedLeaveDates[i].title==''){
                    if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){
                      this.selectedLeaves++
                    }
                  }else if(this.selectedLeaveDates[i].title!=''){
                      this.rdosInLeave++
                  }

                  }
                  if(this.selectedLeaves<1){
                   this.eventSource=this.defaultEventSource

                   if(!this.alertPresented) {
                    this.alertPresented = true
                    const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Alert',
                      // subHeader: 'Subtitle',
                      message: 'All slots are filled. Please select other dates.',
                      buttons: [{text:'OK', handler: () => {
                        this.alertPresented = false}
                      }]
                      });

                    await alert.present();
                    }
                  }
               }
               else if(this.cal_id==2){

                this.selectedLeaves=0
                this.rdosInLeave=0
                var result=this.two()
                 this.eventSource=[]
                 this.eventSource=result
                 this.listToMatrix(this.eventSource)
                 for(var i=0;i<this.selectedLeaveDates.length;i++){
                  if(this.selectedLeaveDates[i].title==''){
                    if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){
                      this.selectedLeaves++
                    }
                  }else if(this.selectedLeaveDates[i].title!=''){
                      this.rdosInLeave++
                  }

                  }
                  if(this.selectedLeaves<1){
                    this.eventSource=this.defaultEventSource

                    if(!this.alertPresented) {
                     this.alertPresented = true
                     const alert = await this.alertController.create({
                       cssClass: 'my-custom-class',
                       header: 'Alert',
                       // subHeader: 'Subtitle',
                       message: 'All slots are filled. Please select other dates.',
                       buttons: [{text:'OK', handler: () => {
                         this.alertPresented = false}
                       }]
                       });

                     await alert.present();
                     }
                   }
               }
               else if(this.cal_id==3){


                if(this.currentSelectedDate.events[0].emp.length<this.currentSelectedDate.events[0].slot){
                var result=this.three()
                 this.eventSource=[]
                 this.eventSource=result
                 this.currentSource=this.listToMatrix(this.eventSource)
                 this.selectedLeaves=0
                 this.rdosInLeave=0
                 for(var i=0;i<this.selectedLeaveDates.length;i++){
                  if(this.selectedLeaveDates[i].title==''){
                    // if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){

                      this.selectedLeaves++
                    // }
                  }else if(this.selectedLeaveDates[i].title!=''){
                      this.rdosInLeave++
                  }
                  if(this.totalTenDays>10){
                    this.selectedLeaves=10
                    if(!this.alertPresented) {
                      this.alertPresented = true
                      const alert = await this.alertController.create({
                        cssClass: 'my-custom-class',
                        header: 'Alert',
                        // subHeader: 'Subtitle',
                        message: "You cannot select more than 10 days of NC leave.",
                        buttons: [{text:'OK', handler: () => {
                          this.alertPresented = false}
                        }]
                        });

                      await alert.present();
                      }
                  }
                  }
                }else{

                  if(this.currentSelectedDate.events[0].emp.indexOf('VP') !== -1){
                    var result=this.three()
                              this.eventSource=[]
                              this.eventSource=result
                              this.selectedLeaves=0
                              this.rdosInLeave=0
                              for(var i=0;i<this.selectedLeaveDates.length;i++){
                                if(this.selectedLeaveDates[i].title==''){
                                  // if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){

                                    this.selectedLeaves++
                                  // }
                                }else if(this.selectedLeaveDates[i].title!=''){
                                    this.rdosInLeave++
                                }
                              }
                    }
                  else{
                      if(!this.alertPresented) {
                        this.alertPresented = true
                        const alert = await this.alertController.create({
                          cssClass: 'my-custom-class',
                          header: 'Alert',
                          // subHeader: 'Subtitle',
                          message: 'All slots are filled. Please select other dates.',
                          buttons: [{text:'OK', handler: () => {
                            this.alertPresented = false}
                          }]
                          });

                        await alert.present();
                        }
                }
              }
               }
               else if(this.cal_id==5){

                this.selectedLeaves=0
                this.rdosInLeave=0
                var result=this.five()
                 this.eventSource=[]
                 this.eventSource=result
                 this.listToMatrix(this.eventSource)
                 for(var i=0;i<this.selectedLeaveDates.length;i++){
                  if(this.selectedLeaveDates[i].title==''){
                    if(this.selectedLeaveDates[i].slot-this.selectedLeaveDates[i].emp.length>0){

                      this.selectedLeaves++
                    }
                  }else if(this.selectedLeaveDates[i].title!=''){
                      this.rdosInLeave++
                  }
                  }
               }
            this.clickName='double'
            this.ref.detectChanges()
        }
        this.clickCount = 0;
    }, 250)

  }
   removeDuplicates(array) {
    let x = {};
    array.forEach(function(i) {
      if(!x[i]) {
        x[i] = true
      }
    })
    return Object.keys(x)
  };
  cssClassSingle(){
      return 'single-click'
  }
  cssClassDouble(){
    return 'double-click'
  }

  loadEvents() {

var sDate=[
  {"startDate":'01/01/2021',"endDate":"01/01/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/02/2021',"endDate":"01/02/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/03/2021',"endDate":"01/03/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/04/2021',"endDate":"01/04/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/05/2021',"endDate":"01/05/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/06/2021',"endDate":"01/06/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/07/2021',"endDate":"01/07/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/08/2021',"endDate":"01/08/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/09/2021',"endDate":"01/09/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/10/2021',"endDate":"01/10/2021","title":"SS","emp":['PC'],"slot":3},
{"startDate":'01/11/2021',"endDate":"01/11/2021","title":"SS","emp":['PC'],"slot":3},
{"startDate":'01/12/2021',"endDate":"01/12/2021","title":"SS","emp":['PC'],"slot":3},
{"startDate":'01/13/2021',"endDate":"01/13/2021","title":"SS","emp":['PC'],"slot":3},
{"startDate":'01/14/2021',"endDate":"01/14/2021","title":"SS","emp":['PC'],"slot":3},
{"startDate":'01/15/2021',"endDate":"01/15/2021","title":"SS","emp":['IK','PY'],"slot":3},
{"startDate":'01/16/2021',"endDate":"01/16/2021","title":"SS","emp":['IK','PY'],"slot":3},
{"startDate":'01/17/2021',"endDate":"01/17/2021","title":"SS","emp":['IK'],"slot":3},
{"startDate":'01/18/2021',"endDate":"01/18/2021","title":"SS","emp":['IK'],"slot":3},
{"startDate":'01/19/2021',"endDate":"01/19/2021","title":"SS","emp":['IK'],"slot":3},
{"startDate":'01/20/2021',"endDate":"01/20/2021","title":"SS","emp":['KT','SC'],"slot":3},
{"startDate":'01/21/2021',"endDate":"01/21/2021","title":"SS","emp":['KT'],"slot":3},
{"startDate":'01/22/2021',"endDate":"01/22/2021","title":"SS","emp":['KT'],"slot":3},
{"startDate":'01/23/2021',"endDate":"01/23/2021","title":"SS","emp":['WY','KT'],"slot":3},
{"startDate":'01/24/2021',"endDate":"01/24/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/25/2021',"endDate":"01/25/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/26/2021',"endDate":"01/26/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/27/2021',"endDate":"01/27/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'01/28/2021',"endDate":"01/28/2021","title":"SS","emp":['KT','SC'],"slot":3},
{"startDate":'01/29/2021',"endDate":"01/29/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/30/2021',"endDate":"01/30/2021","title":"SS","emp":[],"slot":3},
{"startDate":'01/31/2021',"endDate":"01/31/2021","title":"SS","emp":[],"slot":3},
{"startDate":'02/01/2021',"endDate":"02/01/2021","title":"SS","emp":[],"slot":3},
{"startDate":'02/02/2021',"endDate":"02/02/2021","title":"SS","emp":['KT'],"slot":3},
{"startDate":'02/03/2021',"endDate":"02/03/2021","title":"SS","emp":['ZN'],"slot":3},
{"startDate":'02/04/2021',"endDate":"02/04/2021","title":"SS","emp":['JA'],"slot":3},
{"startDate":'02/05/2021',"endDate":"02/05/2021","title":"SS","emp":['JA'],"slot":3},
{"startDate":'02/06/2021',"endDate":"02/06/2021","title":"SS","emp":['ZN','JA'],"slot":3},
{"startDate":'02/07/2021',"endDate":"02/07/2021","title":"SS","emp":['ZN','RS'],"slot":3},
{"startDate":'02/08/2021',"endDate":"02/08/2021","title":"SS","emp":['ZN','RS'],"slot":3},
{"startDate":'02/09/2021',"endDate":"02/09/2021","title":"SS","emp":['ZN','KT'],"slot":3},
{"startDate":'02/10/2021',"endDate":"02/10/2021","title":"SS","emp":['ZN','SC'],"slot":3},
{"startDate":'02/11/2021',"endDate":"02/11/2021","title":"SS","emp":[],"slot":3},
{"startDate":'02/12/2021',"endDate":"02/12/2021","title":"SS","emp":[],"slot":3},
{"startDate":'02/13/2021',"endDate":"02/13/2021","title":"SS","emp":['UJ'],"slot":3},
{"startDate":'02/14/2021',"endDate":"02/14/2021","title":"SS","emp":['UJ'],"slot":3},
{"startDate":'02/15/2021',"endDate":"02/15/2021","title":"SS","emp":['UJ','OC'],"slot":3},
{"startDate":'02/16/2021',"endDate":"02/16/2021","title":"SS","emp":['OC','KT'],"slot":3},
{"startDate":'02/17/2021',"endDate":"02/17/2021","title":"SS","emp":['OC','SC'],"slot":3},
{"startDate":'02/18/2021',"endDate":"02/18/2021","title":"SS","emp":['OC'],"slot":3},
{"startDate":'02/19/2021',"endDate":"02/19/2021","title":"SS","emp":['OC'],"slot":3},
{"startDate":'02/20/2021',"endDate":"02/20/2021","title":"SS","emp":[],"slot":3},
{"startDate":'02/21/2021',"endDate":"02/21/2021","title":"SS","emp":[],"slot":3},
{"startDate":'02/22/2021',"endDate":"02/22/2021","title":"SS","emp":['OC'],"slot":3},
{"startDate":'02/23/2021',"endDate":"02/23/2021","title":"SS","emp":['OC','KT'],"slot":3},
{"startDate":'02/24/2021',"endDate":"02/24/2021","title":"SS","emp":['OC','SC'],"slot":3},
{"startDate":'02/25/2021',"endDate":"02/25/2021","title":"SS","emp":['OC'],"slot":3},
{"startDate":'02/26/2021',"endDate":"02/26/2021","title":"SS","emp":['OC'],"slot":3},
{"startDate":'02/27/2021',"endDate":"02/27/2021","title":"SS","emp":['WY'],"slot":3},
{"startDate":'02/28/2021',"endDate":"02/28/2021","title":"SS","emp":[],"slot":3},
{"startDate":'03/01/2021',"endDate":"03/01/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/02/2021',"endDate":"03/02/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/03/2021',"endDate":"03/03/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'03/04/2021',"endDate":"03/04/2021","title":"SS","emp":[],"slot":3},
{"startDate":'03/05/2021',"endDate":"03/05/2021","title":"SS","emp":['PY'],"slot":3},
{"startDate":'03/06/2021',"endDate":"03/06/2021","title":"SS","emp":['PY'],"slot":3},
{"startDate":'03/07/2021',"endDate":"03/07/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/08/2021',"endDate":"03/08/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/09/2021',"endDate":"03/09/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/10/2021',"endDate":"03/10/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'03/11/2021',"endDate":"03/11/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'03/12/2021',"endDate":"03/12/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/13/2021',"endDate":"03/13/2021","title":"SS","emp":['WY','DD'],"slot":3},
{"startDate":'03/14/2021',"endDate":"03/14/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/15/2021',"endDate":"03/15/2021","title":"SS","emp":['DD'],"slot":3},
{"startDate":'03/16/2021',"endDate":"03/16/2021","title":"SS","emp":['PB','DD'],"slot":3},
{"startDate":'03/17/2021',"endDate":"03/17/2021","title":"SS","emp":['PB','SC'],"slot":3},
{"startDate":'03/18/2021',"endDate":"03/18/2021","title":"SS","emp":['PB','SC'],"slot":3},
{"startDate":'03/19/2021',"endDate":"03/19/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'03/20/2021',"endDate":"03/20/2021","title":"SS","emp":['PX','SC'],"slot":3},
{"startDate":'03/21/2021',"endDate":"03/21/2021","title":"SS","emp":['PB','PC'],"slot":3},
{"startDate":'03/22/2021',"endDate":"03/22/2021","title":"SS","emp":['PB','PC'],"slot":3},
{"startDate":'03/23/2021',"endDate":"03/23/2021","title":"SS","emp":['PC','DD'],"slot":3},
{"startDate":'03/24/2021',"endDate":"03/24/2021","title":"SS","emp":['PC','SC'],"slot":3},
{"startDate":'03/25/2021',"endDate":"03/25/2021","title":"SS","emp":['LH','PC','SC'],"slot":3},
{"startDate":'03/26/2021',"endDate":"03/26/2021","title":"SS","emp":['DD','IK','LH'],"slot":3},
{"startDate":'03/27/2021',"endDate":"03/27/2021","title":"SS","emp":['DD','WY','IK'],"slot":3},
{"startDate":'03/28/2021',"endDate":"03/28/2021","title":"SS","emp":['DD','WY','IK'],"slot":3},
{"startDate":'03/29/2021',"endDate":"03/29/2021","title":"SS","emp":['DD','IK','WY'],"slot":3},
{"startDate":'03/30/2021',"endDate":"03/30/2021","title":"SS","emp":['DD','IK','WY'],"slot":3},
{"startDate":'03/31/2021',"endDate":"03/31/2021","title":"SS","emp":['WY','RS','LV'],"slot":3},
{"startDate":'04/01/2021',"endDate":"04/01/2021","title":"SS","emp":['RS','JU','LV'],"slot":3},
{"startDate":'04/02/2021',"endDate":"04/02/2021","title":"SS","emp":['DD','IK','JU'],"slot":3},
{"startDate":'04/03/2021',"endDate":"04/03/2021","title":"SS","emp":['DD','JU','KT'],"slot":3},
{"startDate":'04/04/2021',"endDate":"04/04/2021","title":"SS","emp":['RS','DD','JU'],"slot":3},
{"startDate":'04/05/2021',"endDate":"04/05/2021","title":"SS","emp":['RS','DD','JU'],"slot":3},
{"startDate":'04/06/2021',"endDate":"04/06/2021","title":"SS","emp":['RS','KT','PX'],"slot":3},
{"startDate":'04/07/2021',"endDate":"04/07/2021","title":"SS","emp":['RS','KT','PX'],"slot":3},
{"startDate":'04/08/2021',"endDate":"04/08/2021","title":"SS","emp":['RS','KT','PX'],"slot":3},
{"startDate":'04/09/2021',"endDate":"04/09/2021","title":"SS","emp":['KT','PX','WM'],"slot":3},
{"startDate":'04/10/2021',"endDate":"04/10/2021","title":"SS","emp":['KT','PX','WM'],"slot":3},
{"startDate":'04/11/2021',"endDate":"04/11/2021","title":"SS","emp":['WM','RS'],"slot":3},
{"startDate":'04/12/2021',"endDate":"04/12/2021","title":"SS","emp":['WM','WV','PS'],"slot":3},
{"startDate":'04/13/2021',"endDate":"04/13/2021","title":"SS","emp":['WM','WV','LH'],"slot":3},
{"startDate":'04/14/2021',"endDate":"04/14/2021","title":"SS","emp":['WV','LH','SC'],"slot":3},
{"startDate":'04/15/2021',"endDate":"04/15/2021","title":"SS","emp":['WV','LH','SC'],"slot":3},
{"startDate":'04/16/2021',"endDate":"04/16/2021","title":"SS","emp":['VK','WV','LH'],"slot":3},
{"startDate":'04/17/2021',"endDate":"04/17/2021","title":"SS","emp":['VK','LH','XY'],"slot":3},
{"startDate":'04/18/2021',"endDate":"04/18/2021","title":"SS","emp":['VK','XY'],"slot":3},
{"startDate":'04/19/2021',"endDate":"04/19/2021","title":"SS","emp":['VK','PS'],"slot":3},
{"startDate":'04/20/2021',"endDate":"04/20/2021","title":"SS","emp":['VK','KT'],"slot":3},
{"startDate":'04/21/2021',"endDate":"04/21/2021","title":"SS","emp":['HU','SC'],"slot":3},
{"startDate":'04/22/2021',"endDate":"04/22/2021","title":"SS","emp":['HU','SC','PC'],"slot":3},
{"startDate":'04/23/2021',"endDate":"04/23/2021","title":"SS","emp":['HU','PY','DD'],"slot":3},
{"startDate":'04/24/2021',"endDate":"04/24/2021","title":"SS","emp":['HU','PY','DD'],"slot":3},
{"startDate":'04/25/2021',"endDate":"04/25/2021","title":"SS","emp":['LH','PY','DD'],"slot":3},
{"startDate":'04/26/2021',"endDate":"04/26/2021","title":"SS","emp":['PY','DD','PS'],"slot":3},
{"startDate":'04/27/2021',"endDate":"04/27/2021","title":"SS","emp":['PY','DD','KT'],"slot":3},
{"startDate":'04/28/2021',"endDate":"04/28/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'04/29/2021',"endDate":"04/29/2021","title":"SS","emp":['JA'],"slot":3},
{"startDate":'04/30/2021',"endDate":"04/30/2021","title":"SS","emp":['FJ'],"slot":3},
{"startDate":'05/01/2021',"endDate":"05/01/2021","title":"SS","emp":['VK','XY'],"slot":3},
{"startDate":'05/02/2021',"endDate":"05/02/2021","title":"SS","emp":['VK','XY'],"slot":3},
{"startDate":'05/03/2021',"endDate":"05/03/2021","title":"SS","emp":['FJ','PS'],"slot":3},
{"startDate":'05/04/2021',"endDate":"05/04/2021","title":"SS","emp":['KT'],"slot":3},
{"startDate":'05/05/2021',"endDate":"05/05/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'05/06/2021',"endDate":"05/06/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'05/07/2021',"endDate":"05/07/2021","title":"SS","emp":['PY','SC'],"slot":3},
{"startDate":'05/08/2021',"endDate":"05/08/2021","title":"SS","emp":['HU','PY','WY'],"slot":3},
{"startDate":'05/09/2021',"endDate":"05/09/2021","title":"SS","emp":['HU','XY'],"slot":3},
{"startDate":'05/10/2021',"endDate":"05/10/2021","title":"SS","emp":['PS'],"slot":3},
{"startDate":'05/11/2021',"endDate":"05/11/2021","title":"SS","emp":['KT'],"slot":3},
{"startDate":'05/12/2021',"endDate":"05/12/2021","title":"SS","emp":['SC','WY'],"slot":3},
{"startDate":'05/13/2021',"endDate":"05/13/2021","title":"SS","emp":['JA','LH','SC'],"slot":3},
{"startDate":'05/14/2021',"endDate":"05/14/2021","title":"SS","emp":['JA','LH','SC'],"slot":3},
{"startDate":'05/15/2021',"endDate":"05/15/2021","title":"SS","emp":['JA','WY','LH'],"slot":3},
{"startDate":'05/16/2021',"endDate":"05/16/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'05/17/2021',"endDate":"05/17/2021","title":"SS","emp":['FJ','JU','PS'],"slot":3},
{"startDate":'05/18/2021',"endDate":"05/18/2021","title":"SS","emp":['FJ','KT'],"slot":3},
{"startDate":'05/19/2021',"endDate":"05/19/2021","title":"SS","emp":['FJ','WY','SC'],"slot":3},
{"startDate":'05/20/2021',"endDate":"05/20/2021","title":"SS","emp":['FJ','JU','SC'],"slot":3},
{"startDate":'05/21/2021',"endDate":"05/21/2021","title":"SS","emp":['FJ','AO','JU'],"slot":3},
{"startDate":'05/22/2021',"endDate":"05/22/2021","title":"SS","emp":['AO','JU','VK'],"slot":3},
{"startDate":'05/23/2021',"endDate":"05/23/2021","title":"SS","emp":['AO','VK','MB'],"slot":3},
{"startDate":'05/24/2021',"endDate":"05/24/2021","title":"SS","emp":['MB','OT','PS'],"slot":3},
{"startDate":'05/25/2021',"endDate":"05/25/2021","title":"SS","emp":['MB','OT','LV'],"slot":3},
{"startDate":'05/26/2021',"endDate":"05/26/2021","title":"SS","emp":['MB','OT','LV'],"slot":3},
{"startDate":'05/27/2021',"endDate":"05/27/2021","title":"SS","emp":['MB','OT','LV'],"slot":3},
{"startDate":'05/28/2021',"endDate":"05/28/2021","title":"SS","emp":['PY','DD','LD'],"slot":3},
{"startDate":'05/29/2021',"endDate":"05/29/2021","title":"SS","emp":['PY','DD','LD'],"slot":3},
{"startDate":'05/30/2021',"endDate":"05/30/2021","title":"SS","emp":['PC','PY','DD'],"slot":3},
{"startDate":'05/31/2021',"endDate":"05/31/2021","title":"SS","emp":['PC','DD','RS'],"slot":3},
{"startDate":'06/01/2021',"endDate":"06/01/2021","title":"SS","emp":['PC','DD','RS'],"slot":3},
{"startDate":'06/02/2021',"endDate":"06/02/2021","title":"SS","emp":['PC','WB','RS'],"slot":3},
{"startDate":'06/03/2021',"endDate":"06/03/2021","title":"SS","emp":['PC','PB','WB'],"slot":3},
{"startDate":'06/04/2021',"endDate":"06/04/2021","title":"SS","emp":['WB','LH','JU'],"slot":3},
{"startDate":'06/05/2021',"endDate":"06/05/2021","title":"SS","emp":['WB','LH','JU'],"slot":3},
{"startDate":'06/06/2021',"endDate":"06/06/2021","title":"SS","emp":['PB','WB','LH'],"slot":3},
{"startDate":'06/07/2021',"endDate":"06/07/2021","title":"SS","emp":['PB','SC','FJ'],"slot":3},
{"startDate":'06/08/2021',"endDate":"06/08/2021","title":"SS","emp":['PB','SC','FJ'],"slot":3},
{"startDate":'06/09/2021',"endDate":"06/09/2021","title":"SS","emp":['HU','PB','HC'],"slot":3},
{"startDate":'06/10/2021',"endDate":"06/10/2021","title":"SS","emp":['HU','PB','HC'],"slot":3},
{"startDate":'06/11/2021',"endDate":"06/11/2021","title":"SS","emp":['HU','KT','OC'],"slot":3},
{"startDate":'06/12/2021',"endDate":"06/12/2021","title":"SS","emp":['HU','LD','KT'],"slot":3},
{"startDate":'06/13/2021',"endDate":"06/13/2021","title":"SS","emp":['MB','HU','PB'],"slot":3},
{"startDate":'06/14/2021',"endDate":"06/14/2021","title":"SS","emp":['MB','PB','WM'],"slot":3},
{"startDate":'06/15/2021',"endDate":"06/15/2021","title":"SS","emp":['MB','PB','WM'],"slot":3},
{"startDate":'06/16/2021',"endDate":"06/16/2021","title":"SS","emp":['MB','LV','PB'],"slot":3},
{"startDate":'06/17/2021',"endDate":"06/17/2021","title":"SS","emp":['WV','MB','LV'],"slot":3},
{"startDate":'06/18/2021',"endDate":"06/18/2021","title":"SS","emp":['WV','WM','LD'],"slot":3},
{"startDate":'06/19/2021',"endDate":"06/19/2021","title":"SS","emp":['WY','WM','PX'],"slot":3},
{"startDate":'06/20/2021',"endDate":"06/20/2021","title":"SS","emp":['LV','WY','WM'],"slot":3},
{"startDate":'06/21/2021',"endDate":"06/21/2021","title":"SS","emp":['WV','LV','WY'],"slot":3},
{"startDate":'06/22/2021',"endDate":"06/22/2021","title":"SS","emp":['WV','LV','WY'],"slot":3},
{"startDate":'06/23/2021',"endDate":"06/23/2021","title":"SS","emp":['WV','WY','XY'],"slot":3},
{"startDate":'06/24/2021',"endDate":"06/24/2021","title":"SS","emp":['WV','UJ','PS'],"slot":3},
{"startDate":'06/25/2021',"endDate":"06/25/2021","title":"SS","emp":['WV','UJ','PS'],"slot":3},
{"startDate":'06/26/2021',"endDate":"06/26/2021","title":"SS","emp":['WV','UJ','PS'],"slot":3},
{"startDate":'06/27/2021',"endDate":"06/27/2021","title":"SS","emp":['WV','UJ','PS'],"slot":3},
{"startDate":'06/28/2021',"endDate":"06/28/2021","title":"SS","emp":['WV','XY','UJ'],"slot":3},
{"startDate":'06/29/2021',"endDate":"06/29/2021","title":"SS","emp":['WV','LD','XY'],"slot":3},
{"startDate":'06/30/2021',"endDate":"06/30/2021","title":"SS","emp":['WV','LD','XY'],"slot":3},
{"startDate":'07/01/2021',"endDate":"07/01/2021","title":"SS","emp":['LD','AO','OT'],"slot":3},
{"startDate":'07/02/2021',"endDate":"07/02/2021","title":"SS","emp":['LD','AO','OT'],"slot":3},
{"startDate":'07/03/2021',"endDate":"07/03/2021","title":"SS","emp":['LD','ZN','AO'],"slot":3},
{"startDate":'07/04/2021',"endDate":"07/04/2021","title":"SS","emp":['ZN','AO','PC'],"slot":3},
{"startDate":'07/05/2021',"endDate":"07/05/2021","title":"SS","emp":['OC','ZN','OT'],"slot":3},
{"startDate":'07/06/2021',"endDate":"07/06/2021","title":"SS","emp":['OC','PX','ZN'],"slot":3},
{"startDate":'07/07/2021',"endDate":"07/07/2021","title":"SS","emp":['OC','PX','ZN'],"slot":3},
{"startDate":'07/08/2021',"endDate":"07/08/2021","title":"SS","emp":['OC','PX','JA'],"slot":3},
{"startDate":'07/09/2021',"endDate":"07/09/2021","title":"SS","emp":['OC','PX','JA'],"slot":3},
{"startDate":'07/10/2021',"endDate":"07/10/2021","title":"SS","emp":['OC','PX','JA'],"slot":3},
{"startDate":'07/11/2021',"endDate":"07/11/2021","title":"SS","emp":['MB','WY','JA'],"slot":3},
{"startDate":'07/12/2021',"endDate":"07/12/2021","title":"SS","emp":['MB','OC','WY'],"slot":3},
{"startDate":'07/13/2021',"endDate":"07/13/2021","title":"SS","emp":['MB','OC','WY'],"slot":3},
{"startDate":'07/14/2021',"endDate":"07/14/2021","title":"SS","emp":['MB','OC','WY'],"slot":3},
{"startDate":'07/15/2021',"endDate":"07/15/2021","title":"SS","emp":['MB','OC','UJ'],"slot":3},
{"startDate":'07/16/2021',"endDate":"07/16/2021","title":"SS","emp":['OC','UJ','LH'],"slot":3},
{"startDate":'07/17/2021',"endDate":"07/17/2021","title":"SS","emp":['UJ','LH','LD'],"slot":3},
{"startDate":'07/18/2021',"endDate":"07/18/2021","title":"SS","emp":['SC','UJ','LH'],"slot":3},
{"startDate":'07/19/2021',"endDate":"07/19/2021","title":"SS","emp":['OT','SC','UJ'],"slot":3},
{"startDate":'07/20/2021',"endDate":"07/20/2021","title":"SS","emp":['OT','SC','LD'],"slot":3},
{"startDate":'07/21/2021',"endDate":"07/21/2021","title":"SS","emp":['OT','SC','HU'],"slot":3},
{"startDate":'07/22/2021',"endDate":"07/22/2021","title":"SS","emp":['OT','SC','HU'],"slot":3},
{"startDate":'07/23/2021',"endDate":"07/23/2021","title":"SS","emp":['OT','HU','WM'],"slot":3},
{"startDate":'07/24/2021',"endDate":"07/24/2021","title":"SS","emp":['HU','XY','WM'],"slot":3},
{"startDate":'07/25/2021',"endDate":"07/25/2021","title":"SS","emp":['HU','XY','WM'],"slot":3},
{"startDate":'07/26/2021',"endDate":"07/26/2021","title":"SS","emp":['XY','WM','PS'],"slot":3},
{"startDate":'07/27/2021',"endDate":"07/27/2021","title":"SS","emp":['LD','XY','WM'],"slot":3},
{"startDate":'07/28/2021',"endDate":"07/28/2021","title":"SS","emp":['LD','XY','WB'],"slot":3},
{"startDate":'07/29/2021',"endDate":"07/29/2021","title":"SS","emp":['LD','EB','PS'],"slot":3},
{"startDate":'07/30/2021',"endDate":"07/30/2021","title":"SS","emp":['LD','EB','PS'],"slot":3},
{"startDate":'07/31/2021',"endDate":"07/31/2021","title":"SS","emp":['LD','EB','NK'],"slot":3},
{"startDate":'08/01/2021',"endDate":"08/01/2021","title":"SS","emp":['WB','NK','JU'],"slot":3},
{"startDate":'08/02/2021',"endDate":"08/02/2021","title":"SS","emp":['NK','JU','PY'],"slot":3},
{"startDate":'08/03/2021',"endDate":"08/03/2021","title":"SS","emp":['NK','PY','PC'],"slot":3},
{"startDate":'08/04/2021',"endDate":"08/04/2021","title":"SS","emp":['NK','PC','CG'],"slot":3},
{"startDate":'08/05/2021',"endDate":"08/05/2021","title":"SS","emp":['JU','PC','CG'],"slot":3},
{"startDate":'08/06/2021',"endDate":"08/06/2021","title":"SS","emp":['JU','PY','CG'],"slot":3},
{"startDate":'08/07/2021',"endDate":"08/07/2021","title":"SS","emp":['JU','PY','CG'],"slot":3},
{"startDate":'08/08/2021',"endDate":"08/08/2021","title":"SS","emp":['PY','MB','PC'],"slot":3},
{"startDate":'08/09/2021',"endDate":"08/09/2021","title":"SS","emp":['MB','RS','PC'],"slot":3},
{"startDate":'08/10/2021',"endDate":"08/10/2021","title":"SS","emp":['CG','MB','RS'],"slot":3},
{"startDate":'08/11/2021',"endDate":"08/11/2021","title":"SS","emp":['CG','MB','RS'],"slot":3},
{"startDate":'08/12/2021',"endDate":"08/12/2021","title":"SS","emp":['CG','MB','RS'],"slot":3},
{"startDate":'08/13/2021',"endDate":"08/13/2021","title":"SS","emp":['CG','RS','FJ'],"slot":3},
{"startDate":'08/14/2021',"endDate":"08/14/2021","title":"SS","emp":['CG','WY','HU'],"slot":3},
{"startDate":'08/15/2021',"endDate":"08/15/2021","title":"SS","emp":['PY','HU','JU'],"slot":3},
{"startDate":'08/16/2021',"endDate":"08/16/2021","title":"SS","emp":['RS','PY','FJ'],"slot":3},
{"startDate":'08/17/2021',"endDate":"08/17/2021","title":"SS","emp":['RS','KT','PY'],"slot":3},
{"startDate":'08/18/2021',"endDate":"08/18/2021","title":"SS","emp":['RS','LV','KT'],"slot":3},
{"startDate":'08/19/2021',"endDate":"08/19/2021","title":"SS","emp":['RS','LV','KT'],"slot":3},
{"startDate":'08/20/2021',"endDate":"08/20/2021","title":"SS","emp":['RS','KT','PY'],"slot":3},
{"startDate":'08/21/2021',"endDate":"08/21/2021","title":"SS","emp":['KT','PY','PS'],"slot":3},
{"startDate":'08/22/2021',"endDate":"08/22/2021","title":"SS","emp":['LV','PS','SC'],"slot":3},
{"startDate":'08/23/2021',"endDate":"08/23/2021","title":"SS","emp":['LV','PS','SC'],"slot":3},
{"startDate":'08/24/2021',"endDate":"08/24/2021","title":"SS","emp":['LV','SC','PC'],"slot":3},
{"startDate":'08/25/2021',"endDate":"08/25/2021","title":"SS","emp":['SC','AO','PC'],"slot":3},
{"startDate":'08/26/2021',"endDate":"08/26/2021","title":"SS","emp":['PS','SC','AO'],"slot":3},
{"startDate":'08/27/2021',"endDate":"08/27/2021","title":"SS","emp":['PS','OC','AO'],"slot":3},
{"startDate":'08/28/2021',"endDate":"08/28/2021","title":"SS","emp":['AO','UJ','WB'],"slot":3},
{"startDate":'08/29/2021',"endDate":"08/29/2021","title":"SS","emp":['AO','UJ','WB'],"slot":3},
{"startDate":'08/30/2021',"endDate":"08/30/2021","title":"SS","emp":['OC','UJ','DD'],"slot":3},
{"startDate":'08/31/2021',"endDate":"08/31/2021","title":"SS","emp":['OC','DD','RS'],"slot":3},
{"startDate":'09/01/2021',"endDate":"09/01/2021","title":"SS","emp":['OC','WB','RS'],"slot":3},
{"startDate":'09/02/2021',"endDate":"09/02/2021","title":"SS","emp":['OC','RS','SC'],"slot":3},
{"startDate":'09/03/2021',"endDate":"09/03/2021","title":"SS","emp":['VK','OC','RS'],"slot":3},
{"startDate":'09/04/2021',"endDate":"09/04/2021","title":"SS","emp":['VK','IK','PX'],"slot":3},
{"startDate":'09/05/2021',"endDate":"09/05/2021","title":"SS","emp":['VK','IK','HU'],"slot":3},
{"startDate":'09/06/2021',"endDate":"09/06/2021","title":"SS","emp":['VK','IK','OC'],"slot":3},
{"startDate":'09/07/2021',"endDate":"09/07/2021","title":"SS","emp":['VK','IK','OC'],"slot":3},
{"startDate":'09/08/2021',"endDate":"09/08/2021","title":"SS","emp":['HU','WY','OT'],"slot":3},
{"startDate":'09/09/2021',"endDate":"09/09/2021","title":"SS","emp":['OT','LV','JU'],"slot":3},
{"startDate":'09/10/2021',"endDate":"09/10/2021","title":"SS","emp":['FJ','OT','JU'],"slot":3},
{"startDate":'09/11/2021',"endDate":"09/11/2021","title":"SS","emp":['JA','WY','PY'],"slot":3},
{"startDate":'09/12/2021',"endDate":"09/12/2021","title":"SS","emp":['LV','PB','JA'],"slot":3},
{"startDate":'09/13/2021',"endDate":"09/13/2021","title":"SS","emp":['LV','PB','JA'],"slot":3},
{"startDate":'09/14/2021',"endDate":"09/14/2021","title":"SS","emp":['LV','PB','PS'],"slot":3},
{"startDate":'09/15/2021',"endDate":"09/15/2021","title":"SS","emp":['LV','PB','WB'],"slot":3},
{"startDate":'09/16/2021',"endDate":"09/16/2021","title":"SS","emp":['LV','PB','WB'],"slot":3},
{"startDate":'09/17/2021',"endDate":"09/17/2021","title":"SS","emp":['WB','JA','LH'],"slot":3},
{"startDate":'09/18/2021',"endDate":"09/18/2021","title":"SS","emp":['WB','LH','JA'],"slot":3},
{"startDate":'09/19/2021',"endDate":"09/19/2021","title":"SS","emp":['WB','AO','PB'],"slot":3},
{"startDate":'09/20/2021',"endDate":"09/20/2021","title":"SS","emp":['PB','OT','FJ'],"slot":3},
{"startDate":'09/21/2021',"endDate":"09/21/2021","title":"SS","emp":['PB','KT','MB'],"slot":3},
{"startDate":'09/22/2021',"endDate":"09/22/2021","title":"SS","emp":['AO','PB','PC'],"slot":3},
{"startDate":'09/23/2021',"endDate":"09/23/2021","title":"SS","emp":['AO','PB','PC'],"slot":3},
{"startDate":'09/24/2021',"endDate":"09/24/2021","title":"SS","emp":['AO','FJ','WV'],"slot":3},
{"startDate":'09/25/2021',"endDate":"09/25/2021","title":"SS","emp":['AO','XY','CG'],"slot":3},
{"startDate":'09/26/2021',"endDate":"09/26/2021","title":"SS","emp":['XY','AO','PC'],"slot":3},
{"startDate":'09/27/2021',"endDate":"09/27/2021","title":"SS","emp":['WV','FJ','PS'],"slot":3},
{"startDate":'09/28/2021',"endDate":"09/28/2021","title":"SS","emp":['WV','PS','OT'],"slot":3},
{"startDate":'09/29/2021',"endDate":"09/29/2021","title":"SS","emp":['WV','AO','SC'],"slot":3},
{"startDate":'09/30/2021',"endDate":"09/30/2021","title":"SS","emp":['WV','AO','RS'],"slot":3},
{"startDate":'10/01/2021',"endDate":"10/01/2021","title":"SS","emp":['WV','OC','PX'],"slot":3},
{"startDate":'10/02/2021',"endDate":"10/02/2021","title":"SS","emp":['CG','UJ','PX'],"slot":3},
{"startDate":'10/03/2021',"endDate":"10/03/2021","title":"SS","emp":['LV','XY','HU'],"slot":3},
{"startDate":'10/04/2021',"endDate":"10/04/2021","title":"SS","emp":['LV','OT','OC'],"slot":3},
{"startDate":'10/05/2021',"endDate":"10/05/2021","title":"SS","emp":['LV','OT','KT'],"slot":3},
{"startDate":'10/06/2021',"endDate":"10/06/2021","title":"SS","emp":['LV','OC','HU'],"slot":3},
{"startDate":'10/07/2021',"endDate":"10/07/2021","title":"SS","emp":['LV','PC','WV'],"slot":3},
{"startDate":'10/08/2021',"endDate":"10/08/2021","title":"SS","emp":['WV','HU','LD'],"slot":3},
{"startDate":'10/09/2021',"endDate":"10/09/2021","title":"SS","emp":['XY','PX','CG'],"slot":3},
{"startDate":'10/10/2021',"endDate":"10/10/2021","title":"SS","emp":['PC','XY','HU'],"slot":3},
{"startDate":'10/11/2021',"endDate":"10/11/2021","title":"SS","emp":['PC','XY','OC'],"slot":3},
{"startDate":'10/12/2021',"endDate":"10/12/2021","title":"SS","emp":['PX','OT','WV'],"slot":3},
{"startDate":'10/13/2021',"endDate":"10/13/2021","title":"SS","emp":['PX','SC','WV'],"slot":3},
{"startDate":'10/14/2021',"endDate":"10/14/2021","title":"SS","emp":['PX','JA','SC'],"slot":3},
{"startDate":'10/15/2021',"endDate":"10/15/2021","title":"SS","emp":['PX','JA','SC'],"slot":3},
{"startDate":'10/16/2021',"endDate":"10/16/2021","title":"SS","emp":['VK','JA','SC'],"slot":3},
{"startDate":'10/17/2021',"endDate":"10/17/2021","title":"SS","emp":['VK','JA','XY'],"slot":3},
{"startDate":'10/18/2021',"endDate":"10/18/2021","title":"SS","emp":['JA','WV','OT'],"slot":3},
{"startDate":'10/19/2021',"endDate":"10/19/2021","title":"SS","emp":['WV','OT'],"slot":3},
{"startDate":'10/20/2021',"endDate":"10/20/2021","title":"SS","emp":['WV','AO'],"slot":3},
{"startDate":'10/21/2021',"endDate":"10/21/2021","title":"SS","emp":['WV','LV'],"slot":3},
{"startDate":'10/22/2021',"endDate":"10/22/2021","title":"SS","emp":['LD','SC'],"slot":3},
{"startDate":'10/23/2021',"endDate":"10/23/2021","title":"SS","emp":['PX','PY','WY'],"slot":3},
{"startDate":'10/24/2021',"endDate":"10/24/2021","title":"SS","emp":['JA','LV','HU'],"slot":3},
{"startDate":'10/25/2021',"endDate":"10/25/2021","title":"SS","emp":['WV','LV'],"slot":3},
{"startDate":'10/26/2021',"endDate":"10/26/2021","title":"SS","emp":['LV','KT','SC'],"slot":3},
{"startDate":'10/27/2021',"endDate":"10/27/2021","title":"SS","emp":['LV','WB','PY'],"slot":3},
{"startDate":'10/28/2021',"endDate":"10/28/2021","title":"SS","emp":['LV','WB'],"slot":3},
{"startDate":'10/29/2021',"endDate":"10/29/2021","title":"SS","emp":['WB','FJ','LD'],"slot":3},
{"startDate":'10/30/2021',"endDate":"10/30/2021","title":"SS","emp":['WB','PS','PY'],"slot":3},
{"startDate":'10/31/2021',"endDate":"10/31/2021","title":"SS","emp":['WB','PS','PY'],"slot":3},
{"startDate":'11/01/2021',"endDate":"11/01/2021","title":"SS","emp":['OT','PS','FJ'],"slot":3},
{"startDate":'11/02/2021',"endDate":"11/02/2021","title":"SS","emp":['OT','PS','KT'],"slot":3},
{"startDate":'11/03/2021',"endDate":"11/03/2021","title":"SS","emp":['OT','SC'],"slot":3},
{"startDate":'11/04/2021',"endDate":"11/04/2021","title":"SS","emp":['OT','OC'],"slot":3},
{"startDate":'11/05/2021',"endDate":"11/05/2021","title":"SS","emp":['OT','LD','SC'],"slot":3},
{"startDate":'11/06/2021',"endDate":"11/06/2021","title":"SS","emp":['ZN','PY'],"slot":3},
{"startDate":'11/07/2021',"endDate":"11/07/2021","title":"SS","emp":['ZN','SC'],"slot":3},
{"startDate":'11/08/2021',"endDate":"11/08/2021","title":"SS","emp":['ZN','OT'],"slot":3},
{"startDate":'11/09/2021',"endDate":"11/09/2021","title":"SS","emp":['KT','OT'],"slot":3},
{"startDate":'11/10/2021',"endDate":"11/10/2021","title":"SS","emp":['KT','ZN'],"slot":3},
{"startDate":'11/11/2021',"endDate":"11/11/2021","title":"SS","emp":['KT','RS','PC'],"slot":3},
{"startDate":'11/12/2021',"endDate":"11/12/2021","title":"SS","emp":['KT','IK','LD'],"slot":3},
{"startDate":'11/13/2021',"endDate":"11/13/2021","title":"SS","emp":['KT','WY','IK'],"slot":3},
{"startDate":'11/14/2021',"endDate":"11/14/2021","title":"SS","emp":['RS','PC','XY'],"slot":3},
{"startDate":'11/15/2021',"endDate":"11/15/2021","title":"SS","emp":['RS','PC','WV'],"slot":3},
{"startDate":'11/16/2021',"endDate":"11/16/2021","title":"SS","emp":['KT','LV'],"slot":3},
{"startDate":'11/17/2021',"endDate":"11/17/2021","title":"SS","emp":['SC','LV'],"slot":3},
{"startDate":'11/18/2021',"endDate":"11/18/2021","title":"SS","emp":['SC','LV','JU'],"slot":3},
{"startDate":'11/19/2021',"endDate":"11/19/2021","title":"SS","emp":['LD','JU','SC'],"slot":3},
{"startDate":'11/20/2021',"endDate":"11/20/2021","title":"SS","emp":['ZN','UJ','PY'],"slot":3},
{"startDate":'11/21/2021',"endDate":"11/21/2021","title":"SS","emp":['ZN','XY','JU'],"slot":3},
{"startDate":'11/22/2021',"endDate":"11/22/2021","title":"SS","emp":['ZN','WV','JU'],"slot":3},
{"startDate":'11/23/2021',"endDate":"11/23/2021","title":"SS","emp":['CG','ZN','LH'],"slot":3},
{"startDate":'11/24/2021',"endDate":"11/24/2021","title":"SS","emp":['SC','FJ','CG'],"slot":3},
{"startDate":'11/25/2021',"endDate":"11/25/2021","title":"SS","emp":['SC','FJ','CG','JA','NK','LH'],"slot":6},
{"startDate":'11/26/2021',"endDate":"11/26/2021","title":"SS","emp":['SC','FJ','CG','JA','LH','LD'],"slot":6},
{"startDate":'11/27/2021',"endDate":"11/27/2021","title":"SS","emp":['SC','CG','JA'],"slot":3},
{"startDate":'11/28/2021',"endDate":"11/28/2021","title":"SS","emp":['JA','JU','MB'],"slot":3},
{"startDate":'11/29/2021',"endDate":"11/29/2021","title":"SS","emp":['JA','JU','MB'],"slot":3},
{"startDate":'11/30/2021',"endDate":"11/30/2021","title":"SS","emp":['JA','ZN','JU'],"slot":3},
{"startDate":'12/01/2021',"endDate":"12/01/2021","title":"SS","emp":['SC'],"slot":3},
{"startDate":'12/02/2021',"endDate":"12/02/2021","title":"SS","emp":['JA'],"slot":3},
{"startDate":'12/03/2021',"endDate":"12/03/2021","title":"SS","emp":['WM','LD','SC'],"slot":3},
{"startDate":'12/04/2021',"endDate":"12/04/2021","title":"SS","emp":['WM','XY','CG'],"slot":3},
{"startDate":'12/05/2021',"endDate":"12/05/2021","title":"SS","emp":['WM','PY'],"slot":3},
{"startDate":'12/06/2021',"endDate":"12/06/2021","title":"SS","emp":['WM','WV'],"slot":3},
{"startDate":'12/07/2021',"endDate":"12/07/2021","title":"SS","emp":['WM','PX','MB'],"slot":3},
{"startDate":'12/08/2021',"endDate":"12/08/2021","title":"SS","emp":['ZN','PX'],"slot":3},
{"startDate":'12/09/2021',"endDate":"12/09/2021","title":"SS","emp":['PX','JU','SC'],"slot":3},
{"startDate":'12/10/2021',"endDate":"12/10/2021","title":"SS","emp":['PX','LD','JU'],"slot":3},
{"startDate":'12/11/2021',"endDate":"12/11/2021","title":"SS","emp":['ZN','PY','PX'],"slot":3},
{"startDate":'12/12/2021',"endDate":"12/12/2021","title":"SS","emp":['PS','MB'],"slot":3},
{"startDate":'12/13/2021',"endDate":"12/13/2021","title":"SS","emp":['FJ','PS','MB'],"slot":3},
{"startDate":'12/14/2021',"endDate":"12/14/2021","title":"SS","emp":['PS','MB','LV'],"slot":3},
{"startDate":'12/15/2021',"endDate":"12/15/2021","title":"SS","emp":['LV','MB','PX'],"slot":3},
{"startDate":'12/16/2021',"endDate":"12/16/2021","title":"SS","emp":['LV','MB','SC'],"slot":3},
{"startDate":'12/17/2021',"endDate":"12/17/2021","title":"SS","emp":['VK','PS','LD'],"slot":3},
{"startDate":'12/18/2021',"endDate":"12/18/2021","title":"SS","emp":['VK','PS','CG'],"slot":3},
{"startDate":'12/19/2021',"endDate":"12/19/2021","title":"SS","emp":['VK','MB','XY'],"slot":3},
{"startDate":'12/20/2021',"endDate":"12/20/2021","title":"SS","emp":['XY','VK','MB'],"slot":3},
{"startDate":'12/21/2021',"endDate":"12/21/2021","title":"SS","emp":['XY','VK','MB'],"slot":3},
{"startDate":'12/22/2021',"endDate":"12/22/2021","title":"SS","emp":['XY','MB','SC'],"slot":3},
{"startDate":'12/23/2021',"endDate":"12/23/2021","title":"SS","emp":['NK','UJ','MB'],"slot":3},
{"startDate":'12/24/2021',"endDate":"12/24/2021","title":"SS","emp":['NK','CG','PX','UJ','IK','KT'],"slot":6},
{"startDate":'12/25/2021',"endDate":"12/25/2021","title":"SS","emp":['NK','CG','XY','PX','UJ','KT'],"slot":6},
{"startDate":'12/26/2021',"endDate":"12/26/2021","title":"SS","emp":['PC','NK','XY','UJ'],"slot":4},
{"startDate":'12/27/2021',"endDate":"12/27/2021","title":"SS","emp":['OT','PC','NK','WV'],"slot":4},
{"startDate":'12/28/2021',"endDate":"12/28/2021","title":"SS","emp":['OT','PC','WV','CG'],"slot":4},
{"startDate":'12/29/2021',"endDate":"12/29/2021","title":"SS","emp":['OT','PC','WV','CG'],"slot":4},
{"startDate":'12/30/2021',"endDate":"12/30/2021","title":"SS","emp":['OT','PC','WV','CG'],"slot":4},
{"startDate":'12/31/2021',"endDate":"12/31/2021","title":"SS","emp":['OT','WV','AO','UJ'],"slot":4},

//   {"startDate":'02/01/2021',"endDate":"05/15/2021","title":"WT"},
// {"startDate":'05/15/2021',"endDate":"09/03/2021","title":"MT"},
// {"startDate":'09/03/2021',"endDate":"10/10/2021","title":"SS","emp":["RA"],"slot":2},
// {"startDate":'10/10/2021',"endDate":"12/31/2021","title":"SS","emp":["MK","RA"],"slot":2},
]

var temp=[]
this.eventSource=[]
var temp1=[]
    var t
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for(var d=0;d<sDate.length;d++){
      t=new Date(sDate[d].startDate)
      var dayName = days[new Date(t).getDay()];
      if(sDate[d].title=="SS"){
          if(dayName=='Sun' || dayName=='Sat'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "SS","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="SM"){
          if(dayName=='Sun' || dayName=='Mon'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "SM","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="MT"){
          if(dayName=='Mon' || dayName=='Tue'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "MT","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="TW"){
          if(dayName=='Tue' || dayName=='Wed'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "TW","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="WT"){
          if(dayName=='Wed' || dayName=='Thu'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "WT","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="TF"){
          if(dayName=='Thu' || dayName=='Fri'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "TF","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"selected":false,"slot":sDate[d].slot})
          }
        }
        else if(sDate[d].title=="FS"){
          if(dayName=='Fri' || dayName=='Sat'){
            var te=String(t.toLocaleDateString());
            this.eventSource.push( {"title": "FS","startTime":new Date(te),"endTime":new Date(te),"emp":sDate[d].emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
           var te=String(t.toLocaleDateString());
           this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"selected":false,"slot":sDate[d].slot})
          }
        }
      else{
        var te=String(t.toLocaleDateString());
        this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":sDate[d].emp,"selected":false,"slot":sDate[d].slot})
       }
    }

this.defaultEventSource=this.eventSource

this.listToMatrix(this.eventSource)
}


four(){
  var d=this.currentSelectedDate.startTime
var tempArr=[] ,temp,date




var i=0
this.t=0
var tempArr1=[]
this.selectedLeaveDates=[]
for(var k=0;k<this.eventSource.length;k++){
  tempArr1.push({"title": this.eventSource[k].title,"startTime":this.eventSource[k].startTime,"endTime":this.eventSource[k].endTime,"allDay": this.eventSource[k].allDay,"emp":this.eventSource[k].emp,"slot":this.eventSource[k].slot,"selected":false})
}
this.eventSource=this.defaultEventSource
var totalDay=7
   do{
     if(this.t<totalDay){
    d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate()+this.t )))
     }
    date=this.eventSource[i].startTime

    if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){

      if(this.eventSource[i].title=='SS'){
       temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }else if(this.eventSource[i].title=='SM'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
      }
      else  if(this.eventSource[i].title=='MT'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='TW'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='WT'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='TF'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='FS'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
    else{
    if(this.eventSource[i].selected==false){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":true}
     this.t++
     }
    }
    this.selectedLeaveDates.push(temp)
       tempArr.push(temp)
    }else{
     temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
     tempArr.push(temp)
    }
    i++;

}while (i<this.eventSource.length)

    var tempEmpDetails,tempEmpDetailsArr=[]
    for(var i=0;i<tempArr.length;i++){
      if(tempArr[i].selected==true){
              if(tempArr[i].emp.length<tempArr[i].slot){
                var tempALlEmp=[]
                for(var k=0;k<tempArr[i].emp.length;k++){
                  tempALlEmp.push(tempArr[i].emp[k])
                }
                tempALlEmp.push('VP')
                  tempEmpDetails={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempALlEmp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                tempEmpDetailsArr.push(tempEmpDetails)
                }else{
                  var tempEmpDetailsTwo={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                  tempEmpDetailsArr.push(tempEmpDetailsTwo)
                }
      }else{
      var  tempEmpDetailsthree={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
        tempEmpDetailsArr.push(tempEmpDetailsthree)
      }
    }
    return tempEmpDetailsArr

}














// 2 WEEK C
one(){
  var d=this.currentSelectedDate.startTime
var tempArr=[] ,temp,date


this.selectedLeaveDates=[]

var i=0
this.t=0
var tempArr1=[]

for(var k=0;k<this.eventSource.length;k++){
  tempArr1.push({"title": this.eventSource[k].title,"startTime":this.eventSource[k].startTime,"endTime":this.eventSource[k].endTime,"allDay": this.eventSource[k].allDay,"emp":this.eventSource[k].emp,"slot":this.eventSource[k].slot,"selected":false})
}
  var totalDay=14
  this.eventSource=this.defaultEventSource
   do{
     if(this.t<totalDay){
    d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate()+this.t )))
     }
    date=this.eventSource[i].startTime

    if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){
      if(this.eventSource[i].title=='SS'){
          temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
          this.t++
      }
      else if(this.eventSource[i].title=='SM'){
       temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='MT'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
      }
      else if(this.eventSource[i].title=='TW'){
       temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      } else if(this.eventSource[i].title=='WT'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
      }
      else if(this.eventSource[i].title=='TF'){
       temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='FS'){
       temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else{
      if(this.eventSource[i].selected==false){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":true}
       this.t++
       }
      }
      this.selectedLeaveDates.push(temp)
       tempArr.push(temp)
    }else{
     temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
     tempArr.push(temp)
    }
    i++;
}while (i<this.eventSource.length)
var tempEmpDetails,tempEmpDetailsArr=[]
for(var i=0;i<tempArr.length;i++){
  if(tempArr[i].selected==true){
   if(tempArr[i].emp.length<tempArr[i].slot){
            var tempALlEmp=[]
            for(var k=0;k<tempArr[i].emp.length;k++){
              tempALlEmp.push(tempArr[i].emp[k])
            }
            tempALlEmp.push('VP')
              tempEmpDetails={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempALlEmp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
            tempEmpDetailsArr.push(tempEmpDetails)
            }else{
              var tempEmpDetailsTwo={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
              tempEmpDetailsArr.push(tempEmpDetailsTwo)
            }
  }else{
  var  tempEmpDetailsthree={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
    tempEmpDetailsArr.push(tempEmpDetailsthree)
  }
}

return tempEmpDetailsArr
}











// 5 DAYS
two(){
  var d=this.currentSelectedDate.startTime
var tempArr=[] ,temp,date



this.selectedLeaveDates=[]

var i=0
this.t=0
var tempArr1=[]
for(var k=0;k<this.eventSource.length;k++){
  tempArr1.push({"title": this.eventSource[k].title,
  "startTime":this.eventSource[k].startTime,
  "endTime":this.eventSource[k].endTime,
  "allDay": this.eventSource[k].allDay,
  "emp":this.eventSource[k].emp,
  "slot":this.eventSource[k].slot,
  "selected":false})
}
this.eventSource=this.defaultEventSource
var totalDay=5
   do{
     if(this.t<totalDay){
    d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate()+this.t )))
     }
    date=this.eventSource[i].startTime

    if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){
      if(this.eventSource[i].title=='SS'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
    }else if(this.eventSource[i].title=='SM'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
  }
  else if(this.eventSource[i].title=='MT'){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
    this.t++
    }
    else if(this.eventSource[i].title=='TW'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
    } else if(this.eventSource[i].title=='WT'){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
    this.t++
    }
    else if(this.eventSource[i].title=='TF'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
    }
    else if(this.eventSource[i].title=='FS'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
    }
    else{
    if(this.eventSource[i].selected==false){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":true}
     this.t++
     }
    }
    this.selectedLeaveDates.push(temp)
       tempArr.push(temp)
    }else{
     temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
     tempArr.push(temp)
    }
    i++;

}while (i<this.eventSource.length)

var tempEmpDetails,tempEmpDetailsArr=[]
    for(var i=0;i<tempArr.length;i++){
      if(tempArr[i].selected==true){
              if(tempArr[i].emp.length<tempArr[i].slot){
                var tempALlEmp=[]
                for(var k=0;k<tempArr[i].emp.length;k++){
                  tempALlEmp.push(tempArr[i].emp[k])
                }
                tempALlEmp.push('VP')
                  tempEmpDetails={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempALlEmp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                tempEmpDetailsArr.push(tempEmpDetails)
                }else{
                  var tempEmpDetailsTwo={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                  tempEmpDetailsArr.push(tempEmpDetailsTwo)
                }
      }else{
      var  tempEmpDetailsthree={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
        tempEmpDetailsArr.push(tempEmpDetailsthree)
      }
    }

    return tempEmpDetailsArr
}








// 10 DAYS
three(){
  var d=this.currentSelectedDate.startTime
var tempArr=[] ,temp,date
var i=0
this.t=0
  d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate())))

   do{
    date=this.eventSource[i].startTime

    if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){
      if(this.eventSource[i].title=='SS'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
    }
    else if(this.eventSource[i].title=='SM'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++

  }
  else if(this.eventSource[i].title=='MT'){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}

    this.t++
    }
    else if(this.eventSource[i].title=='TW'){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
    } else if(this.eventSource[i].title=='WT'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
    this.t++
    }
    else if(this.eventSource[i].title=='TF'){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
    }
    else if(this.eventSource[i].title=='FS'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
       this.t++
    }
    else{
    if(this.eventSource[i].selected==false){
    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":true}

     this.t++
     }else{

      if(this.eventSource[i].emp.indexOf('VP') !== -1){
        const index = this.eventSource[i].emp.indexOf('VP');
        if (index > -1) {
          this.eventSource[i].emp.splice(index, 1);
        }
    }
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":false}
     }
    }
       tempArr.push(temp)
    }else{
     temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
     tempArr.push(temp)
    }
    i++;
}while (i<this.eventSource.length)
var count=0
this.selectedLeaveDates=[]
  for(var i=0;i<tempArr.length;i++){
    if(tempArr[i].selected==true){
      count++
    if(count<11){
      this.selectedLeaveDates.push(tempArr[i])
    }
    }
  }
  this.totalTenDays=count
  if(count<11){


    var tempEmpDetails,tempEmpDetailsArr=[]
    for(var i=0;i<tempArr.length;i++){
      if(tempArr[i].selected==true){
              if(tempArr[i].emp.length<tempArr[i].slot){
                var tempALlEmp=[]
                for(var k=0;k<tempArr[i].emp.length;k++){
                  tempALlEmp.push(tempArr[i].emp[k])
                }
                if(tempALlEmp.indexOf('VP') == -1){
                  tempALlEmp.push('VP')
                }

                  tempEmpDetails={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempALlEmp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                tempEmpDetailsArr.push(tempEmpDetails)
                }else{

                  var tempEmpDetailsTwo={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                  tempEmpDetailsArr.push(tempEmpDetailsTwo)
                }
      }else{
      var  tempEmpDetailsthree={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
        tempEmpDetailsArr.push(tempEmpDetailsthree)
      }
    }
    return tempEmpDetailsArr}else{
return this.eventSource
}
}











// 2 WEEK NC

six(){
          var d=this.currentSelectedDate.startTime
        var tempArr=[] ,temp,date



        var count=0
          for(var i=0;i<this.eventSource.length;i++){
            if(this.eventSource[i].selected==true){

            }
          }
          for(var i=0;i<this.selectedLeaveDates.length;i++)
          {
            d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate())))
            date=this.selectedLeaveDates[i].startTime
            if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){

              this.selectedLeaveDates=[]
            }
          }
        if(this.selectedLeaveDates.length<7){
          var i=0
          this.t=0
          var tempArr1=[]
          this.selectedLeaveDates=[]
          for(var k=0;k<this.eventSource.length;k++){
            tempArr1.push({"title": this.eventSource[k].title,"startTime":this.eventSource[k].startTime,"endTime":this.eventSource[k].endTime,"allDay": this.eventSource[k].allDay,"emp":this.eventSource[k].emp,"slot":this.eventSource[k].slot,"selected":false})
          }
          this.eventSource=this.defaultEventSource
          var totalDay=7
             do{
               if(this.t<totalDay){
              d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate()+this.t )))
               }
              date=this.eventSource[i].startTime

              if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){
                if(this.eventSource[i].title=='SS'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}

                  this.t++
              }else if(this.eventSource[i].title=='SM'){
                temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                this.t++
                }
                else  if(this.eventSource[i].title=='MT'){
                    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                    this.t++
                }
                else if(this.eventSource[i].title=='TW'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
                else if(this.eventSource[i].title=='WT'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
                else if(this.eventSource[i].title=='TF'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
                else if(this.eventSource[i].title=='FS'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
              else{
              if(this.eventSource[i].selected==false){
                temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":true}
               this.t++
               }
              }
              this.selectedLeaveDates.push(temp)
                 tempArr.push(temp)
              }else{
                temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
               tempArr.push(temp)
              }
              i++;

          }while (i<this.eventSource.length)
        }else if(this.selectedLeaveDates.length<14){
          var i=0
          this.t=0
          var tempArr1=[]
        var totalDaySeven=7


            do{

              if(this.t<totalDaySeven){
              d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate()+this.t )))
              }
              date=this.eventSource[i].startTime

                                for (var c = 0; c < this.selectedLeaveDates.length; c++) {
                                  if(d.getDate() === this.selectedLeaveDates[c].startTime.getDate() && d.getMonth() === this.selectedLeaveDates[c].startTime.getMonth() && d.getFullYear() === this.selectedLeaveDates[c].startTime.getFullYear()) {

                                          this.selectedLeaveDates=[]
                                      this.eventSource=this.defaultEventSource
                                      }
                                  }


              if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){


                if(this.eventSource[i].title=='SS'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                  this.selectedLeaveDates.push(temp)
              }else if(this.eventSource[i].title=='SM'){
                temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                this.t++
                }
                else  if(this.eventSource[i].title=='MT'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                    this.t++
                }
                else if(this.eventSource[i].title=='TW'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
                else if(this.eventSource[i].title=='WT'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
                else if(this.eventSource[i].title=='TF'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
                else if(this.eventSource[i].title=='FS'){
                  temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
                  this.t++
                }
              else{
                  if(this.eventSource[i].selected==false){
                    temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":true}
                  this.t++
                  this.selectedLeaveDates.push(temp)
                  }
                  }
                 tempArr.push(temp)
              }else{
                temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
               tempArr.push(temp)
              }

              i++;
          }while (i<this.eventSource.length)
        }else{
        this.selectedLeaveDates=[]
        tempArr=this.defaultEventSource
        }

      var count=0
        for(var i=0;i<tempArr.length;i++){
          if(tempArr[i].selected==true){
            count++
          }
        }

  if(count<15){
    var tempEmpDetails,tempEmpDetailsArr=[]
    for(var i=0;i<tempArr.length;i++){
      if(tempArr[i].selected==true){
              if(tempArr[i].emp.length<tempArr[i].slot){
                var tempALlEmp=[]
                for(var k=0;k<tempArr[i].emp.length;k++){
                  tempALlEmp.push(tempArr[i].emp[k])
                }
                if(tempALlEmp.indexOf("VP") !== -1)
                  {

                  }   else{
                    tempALlEmp.push('VP')
                  }

                  tempEmpDetails={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempALlEmp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                tempEmpDetailsArr.push(tempEmpDetails)
                }else{
                  var tempEmpDetailsTwo={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
                  tempEmpDetailsArr.push(tempEmpDetailsTwo)
                }
      }else{
      var  tempEmpDetailsthree={"title": tempArr[i].title,"startTime":tempArr[i].startTime,"endTime":tempArr[i].endTime,"allDay":tempArr[i].allDay,"emp":tempArr[i].emp,"slot":tempArr[i].slot,"selected":tempArr[i].selected}
        tempEmpDetailsArr.push(tempEmpDetailsthree)
      }
    }
    return tempEmpDetailsArr
}else{
return this.eventSource
}

}



// 1 DAY
five(){
  var d=this.currentSelectedDate.startTime
  var tempArr=[] ,temp,date
  var tempArr1=[]
  for(var k=0;k<this.eventSource.length;k++){
  tempArr1.push({"title": this.eventSource[k].title,"startTime":this.eventSource[k].startTime,"endTime":this.eventSource[k].endTime,"allDay": this.eventSource[k].allDay,"emp":this.eventSource[k].emp,"slot":this.eventSource[k].slot,"selected":false})
}
this.eventSource=tempArr1


  var i=0
  this.t=0
    d=(new Date(new Date(this.currentSelectedDate.startTime).setDate(new Date(this.currentSelectedDate.startTime).getDate())))

     do{
      date=this.eventSource[i].startTime

      if(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()){
        if(this.eventSource[i].title=='SS'){
          temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
          this.t++

      }
      else if(this.eventSource[i].title=='SM'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++

    }
    else if(this.eventSource[i].title=='MT'){
      temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
      this.t++
      }
      else if(this.eventSource[i].title=='TW'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++

      } else if(this.eventSource[i].title=='WT'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++
      }
      else if(this.eventSource[i].title=='TF'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++

      }
      else if(this.eventSource[i].title=='FS'){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++

      }
      else{
      if(this.eventSource[i].selected==false){
        temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
        this.t++

       }
      }
         tempArr.push(temp)
      }else{
       temp={"title": this.eventSource[i].title,"startTime":this.eventSource[i].startTime,"endTime":this.eventSource[i].endTime,"allDay": this.eventSource[i].allDay,"emp":this.eventSource[i].emp,"slot":this.eventSource[i].slot,"selected":this.eventSource[i].selected}
       tempArr.push(temp)
      }
      i++;
  }while (i<this.eventSource.length)
  this.selectedLeaveDates=[]
  var count=0
    for(var i=0;i<tempArr.length;i++){
      if(tempArr[i].selected==true){
        count++
        if(count<2){
          this.selectedLeaveDates.push(tempArr[i])
        }
      }
    }
    if(count<2){

    var tempEmpDetails,tempEmpDetailsArr=[]
    for(var i=0;i<tempArr.length;i++){
      if(tempArr[i].selected==true){
              if(tempArr[i].emp.length<tempArr[i].slot){
                var tempALlEmp=[]
                for(var k=0;k<tempArr[i].emp.length;k++){
                  tempALlEmp.push(tempArr[i].emp[k])
                }
                if(tempALlEmp.indexOf('VP') == -1){
                  tempALlEmp.push('VP')
              }

                  tempEmpDetails={
                    "title": tempArr[i].title,
                    "startTime":tempArr[i].startTime,
                    "endTime":tempArr[i].endTime,
                    "allDay":tempArr[i].allDay,
                    "emp":tempALlEmp,
                    "slot":tempArr[i].slot,
                    "selected":tempArr[i].selected
                  }
                tempEmpDetailsArr.push(tempEmpDetails)
                }else{

                  var tempEmpDetailsTwo={
                    "title": tempArr[i].title,
                    "startTime":tempArr[i].startTime,
                    "endTime":tempArr[i].endTime,
                    "allDay":tempArr[i].allDay,
                    "emp":tempArr[i].emp,
                    "slot":tempArr[i].slot,
                    "selected":tempArr[i].selected
                  }
                  tempEmpDetailsArr.push(tempEmpDetailsTwo)
                }
      }else{
        if(tempArr[i].emp.indexOf('VP') !== -1){
          // tempALlEmp.push('VP')
          const index = this.eventSource[i].emp.indexOf('VP');
          if (index > -1) {
            this.eventSource[i].emp.splice(index, 1);
          }
      }
      var  tempEmpDetailsthree={
          "title": tempArr[i].title,
          "startTime":tempArr[i].startTime,
          "endTime":tempArr[i].endTime,
          "allDay":tempArr[i].allDay,
          "emp":tempArr[i].emp,
          "slot":tempArr[i].slot,
          "selected":tempArr[i].selected
        }
        tempEmpDetailsArr.push(tempEmpDetailsthree)
      }
    }
    return tempEmpDetailsArr}else{
  return this.eventSource
  }
}

ngAfterViewInit() {
  this.listToMatrix(this.eventSource)
}
daysInMonth (month, year) {
  return new Date(year, month+ + 1, 0).getDate();
}
currentSource=[]
listToMatrix(list) {
  var matrix = [], i, k,sun=[],mon=[],tue=[],wed=[],thu=[],fri=[],sat=[],matrixOne = [], j, l,h

var tempNum=0,tempArr=[],tempArr2=[]
for (j = 0;j < list.length; j++) {
  if(list[j-1]!=undefined){

    if(list[j].startTime.getMonth()==list[j-1].startTime.getMonth() ){
      tempArr.push(list[j])
      if((Number(list.length)+ - +1)===j){
        matrixOne.push(tempArr)
        tempArr=[]
      }
    }else{

      matrixOne.push(tempArr)
      tempArr=[]
      tempArr.push(list[j])
    }
}else{
  if(list[j+1]==undefined ){
    matrixOne.push(tempArr)
    tempArr=[]
  }else{
    tempArr.push(list[j])
  }

}



}
var newArr=[]
for(var a=0;a<matrixOne.length;a++){
  newArr=new Array()
  if(matrixOne[a][0].startTime.getDay()==0){
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  if(matrixOne[a][0].startTime.getDay()==1){
    for(var p=0;p<1;p++){
      newArr.push(undefined);
    }
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  if(matrixOne[a][0].startTime.getDay()==2){
    for(var p=0;p<2;p++){
      newArr.push(undefined);
    }
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  if(matrixOne[a][0].startTime.getDay()==3){
    for(var p=0;p<3;p++){
      newArr.push(undefined);
    }
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  if(matrixOne[a][0].startTime.getDay()==4){
    for(var p=0;p<4;p++){
      newArr.push(undefined);
    }
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  if(matrixOne[a][0].startTime.getDay()==5){
    for(var p=0;p<5;p++){
      newArr.push(undefined);
    }
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  if(matrixOne[a][0].startTime.getDay()==6){
    for(var p=0;p<6;p++){
      newArr.push(undefined);
    }
    for(var b=0;b<matrixOne[a].length;b++){
      newArr.push(matrixOne[a][b])
    }
  }
  matrix.push(newArr)
}
this.currentSource=matrix
  return matrix;
}
}


