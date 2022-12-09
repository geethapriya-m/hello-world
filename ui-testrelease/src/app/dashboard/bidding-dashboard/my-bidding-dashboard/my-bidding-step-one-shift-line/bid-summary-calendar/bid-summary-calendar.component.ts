import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { BidScheduleService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-schedule.service';
import { SetupBidRoundService } from 'src/app/services/manage-bid-schedule/bid-schedule/setup-bid-round.service';
import { CreateNewBidScheduleService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/create-new-bid-schedule.service';
import { BidVacationLeaveService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/bid-leave/bid-vacation-leave.service';
import { ActivatedRoute } from '@angular/router';
import { AddNewEmployeeService } from 'src/app/services/manage-bid-schedule/add-new-employee/add-new-employee.service';
import { BidShiftlinesService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/bid-shiftlines.service';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import { MyBiddingService } from '../../my-bidding.service';

@Component({
  selector: 'app-bid-summary-calendar',
  templateUrl: './bid-summary-calendar.component.html',
  styleUrls: ['./bid-summary-calendar.component.scss'],
})
export class BidSummaryCalendarComponent implements OnInit {
  selected: Date | null;
  currentSelectedDate=null
  eventSource: any[];
  selectedDate=null
  get_leave_data
  currentSource=[]
  empSelectedShiftlineData=[]
  all_slots=[]
  tempSelectedDate
  viewTitle
  cssClassForsingleClick
  user_data
spinner=true
holiday
defaultEventSource
vacationSummary
shiftlineSummary
round_id
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    public alertCtrl: AlertController,
    private bidSer:BidScheduleService,
    private bidLeaveSer:BidVacationLeaveService,
    private bidRoundSer:SetupBidRoundService,
    private scheduleService:GeneratedScheduleService,
    private route: ActivatedRoute,
    private addNewEmp:AddNewEmployeeService,
    private setUPbidRoundSer:SetupBidRoundService,
    private headerTitleService: HeaderTitleService,
    private myBiddingSer:MyBiddingService,
    public navParams: NavParams,
    private newBidScheduleSer:CreateNewBidScheduleService,
    private fb:FormBuilder,
    public modalCtrl: ModalController,
    private bidShiftLineSer:BidShiftlinesService,
    ) {

      this.round_id=navParams.get('round_id');
    this.shiftlineSummary=navParams.get('shiftlineSummary');
    this.vacationSummary=navParams.get('vacationSummary');
    }
    empId
    empName
  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))

    for(var i=0;i<this.shiftlineSummary.length;i++){
      this.getshiflineData(this.shiftlineSummary[i])
    }

  }
  getshiflineData(bidScheduleShiftlineSchedulData){
    this.scheduleService.newGetShiftLineBasedOnShiftLineId(bidScheduleShiftlineSchedulData.shiftlineidref).subscribe((res)=>{
      var tempObj
      tempObj=res
      this.empSelectedShiftlineData.push({
        "shiftdefenddate": new Date(bidScheduleShiftlineSchedulData.endDate).getFullYear()+'-'+new Date(bidScheduleShiftlineSchedulData.endDate).getMonth()+'-'+new Date(bidScheduleShiftlineSchedulData.endDate).getDate() ,
        "shiftdefref": bidScheduleShiftlineSchedulData.shiftlineidref,
        "shiftdefstartdate": new Date(bidScheduleShiftlineSchedulData.startDate).getFullYear()+'-'+new Date(bidScheduleShiftlineSchedulData.startDate).getMonth()+'-'+new Date(bidScheduleShiftlineSchedulData.startDate).getDate(),
        "shiftname":  tempObj.shiftname,
        "fri": tempObj.fri,
        "mon": tempObj.mon,
        "sat": tempObj.sat,
        "sun": tempObj.sun,
        "thu": tempObj.thu,
        "tue": tempObj.tue,
        "wed": tempObj.wed,
      })
      if(this.empSelectedShiftlineData.length==this.shiftlineSummary.length){
        this.calendarMethod()
      }

    },(err)=>{console.log(err)},()=>{})

  }
  close(){
    this.modalCtrl.dismiss()
  }
  checkRDOs(date){
    var updatedDate,startDate,endDate
    updatedDate=new Date(Number(date.split('/')[0]),Number(date.split('/')[1])+ - +1,Number(date.split('/')[2]),0,0,0)
    for(var i=0;i<this.empSelectedShiftlineData.length;i++){
      startDate=new Date(Number(this.empSelectedShiftlineData[i].shiftdefstartdate.split('-')[0]),Number(this.empSelectedShiftlineData[i].shiftdefstartdate.split('-')[1]),Number(this.empSelectedShiftlineData[i].shiftdefstartdate.split('-')[2]),0,0,0)
      endDate=new Date(Number(this.empSelectedShiftlineData[i].shiftdefenddate.split('-')[0]),Number(this.empSelectedShiftlineData[i].shiftdefenddate.split('-')[1]),Number(this.empSelectedShiftlineData[i].shiftdefenddate.split('-')[2]),0,0,0)
      if(startDate.getTime()<=updatedDate.getTime() && updatedDate.getTime()<=endDate.getTime() ){
        var rdo=''
        if(updatedDate.getDay()==0){
          if(this.empSelectedShiftlineData[i].sun=='X'){
            rdo='rdo'
          }
        }else if(updatedDate.getDay()==1){
          if(this.empSelectedShiftlineData[i].mon=='X'){
            rdo='rdo'
          }
        }else if(updatedDate.getDay()==2){
          if(this.empSelectedShiftlineData[i].tue=='X'){
            rdo='rdo'
          }
        }else if(updatedDate.getDay()==3){
          if(this.empSelectedShiftlineData[i].wed=='X'){
            rdo='rdo'
          }
        }else if(updatedDate.getDay()==4){
          if(this.empSelectedShiftlineData[i].thu=='X'){
            rdo='rdo'
          }
        }else if(updatedDate.getDay()==5){
          if(this.empSelectedShiftlineData[i].fri=='X'){
            rdo='rdo'
          }
        }else if(updatedDate.getDay()==6){
          if(this.empSelectedShiftlineData[i].sat=='X'){
            rdo='rdo'
          }
        }
        return String(rdo)
      }
    }
  }
  checkEmpExist(emp){
    var count=0
    if(this.user_data.empid==undefined){
      if(emp.indexOf(this.vacationSummary.initials) !== -1){
        return true
      }else{
        return false
      }
    }else{
      if(emp.indexOf(this.user_data.initials) !== -1){
        return true
      }else{
        return false
      }
    }
  }
  calendarMethod(){
    this.selectedDateEmp=[]
    this.checkSelectedDate=undefined
    var sDate=[]
    var temp=[]
    this.selectedDate
    this.eventSource=[]
    var temp1=[]
      var t,start,end
      var uniqueDate=[]
      for(var i=0;i<this.vacationSummary.date.length;i++){
        start=this.vacationSummary.date[i].vacationstartdate.getFullYear()+'-'+this.vacationSummary.date[i].vacationstartdate.getMonth()+'-'+this.vacationSummary.date[i].vacationstartdate.getDate()
        end=this.vacationSummary.date[i].vacationenddate.getFullYear()+'-'+this.vacationSummary.date[i].vacationenddate.getMonth()+'-'+this.vacationSummary.date[i].vacationenddate.getDate()
          uniqueDate.push(new Date(start.split("-")[0],start.split("-")[1],1,0,0,0))
          uniqueDate.push(new Date(end.split("-")[0],end.split("-")[1],1,0,0,0))
      }
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var uniqueDa = uniqueDate.map(s => s.getTime()).filter((s, i, a) => a.indexOf(s) == i).map(s => new Date(s));
    var tempArr=[]
    var maxDate=Math.max.apply(null,uniqueDa);
    var minDate=Math.min.apply(null,uniqueDa);
    var diffDays = Math.abs(maxDate - minDate);
    diffDays=Math.ceil(diffDays / (1000 * 60 * 60 * 24));
    var dt,month,year,daysInMonth
    for(var i=0;i<uniqueDa.length;i++){
      month =Number(uniqueDa[i].getMonth())+ + + 1;
      year = uniqueDa[i].getFullYear();
        daysInMonth = new Date(year, month, 0).getDate();
        for(var j=0;j<daysInMonth;j++){
          tempArr.push(new Date(year,month+ - +1,j+1,0,0,0))
        }
    }
    sDate=[]
    var tempDate
      for(var i=0;i<tempArr.length;i++){
        tempDate=tempArr[i].getFullYear()+'/'+(tempArr[i].getMonth()+ + +1)+'/'+tempArr[i].getDate()
          sDate.push({"startDate":tempDate,"endDate":tempDate,"title":this.checkRDOs(tempDate),"emp":[],"slot":0})
      }

      for(var d=0;d<sDate.length;d++){
        t=new Date(sDate[d].startDate)
        var emp
        emp=this.checkEmp(t)
        var dayName = days[new Date(t).getDay()];
        if(sDate[d].title=="rdo"){
              var te=String(t.toLocaleDateString());
              this.eventSource.push( {"title":sDate[d].title,"startTime":new Date(te),"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
        }
        else{
          var te=String(t.toLocaleDateString());
          this.eventSource.push( {"title": "","startTime":new Date(te),"endTime":new Date(te),"allDay": true,"emp":emp,"selected":false,"slot":sDate[d].slot})
        }
      }
    this.spinner=false
    this.defaultEventSource=this.eventSource
    this.listToMatrix(this.eventSource)
}
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
selectedDateEmp=[]
checkSelectedDate=undefined
selectDate(e){
  this.selectedDateEmp=[]
  this.checkSelectedDate=true
  if(e.emp.length<1){
    this.selectedDateEmp=[]
    this.checkSelectedDate=false
  }
  for(var i=0;i<e.emp.length;i++){
    this.addNewEmp.getAllEmployeeBasedOnmanagerIdEmpInitials(this.user_data.id,e.emp[i]).subscribe((res)=>{
      this.selectedDateEmp.push(res[0])
      const key = 'empid';
      this.selectedDateEmp=[...new Map(this.selectedDateEmp.map(item =>
        [item[key], item])).values()]
        this.selectedDateEmp= this.selectedDateEmp.sort((a,b)=>{ return a.rank - b.rank});
    },(err)=>{console.log(err)},()=>{})
  }

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
  // var arr=['09/06/2021','10/11/2021','01/11/2021']
  var arr=[]
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
  // var arr=['09/06/2021','10/11/2021','01/11/2021']
  var arr=[]
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
cssClassSingle(){
  // this.cdref.detectChanges()
  return this.cssClassForsingleClick
}
cssClassDouble(){
return 'double-click'
}
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
  convertDate(date){
    return new Date(Number(date.split('-')[0]),Number(date.split('-')[1])+ - +1,Number(date.split('-')[2]),0,0,0)
  }
  checkEmp(date){
    var tempArr=[]
    this.get_leave_data=this.vacationSummary.date
    for(var i=0;i<this.get_leave_data.length;i++){
      if(this.get_leave_data[i].vacationstartdate<=new Date(date) && this.get_leave_data[i].vacationenddate>=new Date(date)){
       tempArr.push(this.vacationSummary.initials)
      }
    }
    return tempArr
  }
}
