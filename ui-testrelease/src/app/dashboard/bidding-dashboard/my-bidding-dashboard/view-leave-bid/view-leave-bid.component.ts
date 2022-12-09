import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import * as fs from 'file-saver';
import straightlines_io_apis from 'src/app/json/apis.json';
import { MyBiddingService } from '../my-bidding.service';
import { BidScheduleService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-schedule.service';
import { BidLeaveSetupService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-leave-setup.service';
import { SetupBidRoundService } from 'src/app/services/manage-bid-schedule/bid-schedule/setup-bid-round.service';
import { SetUpBidLeaveService } from 'src/app/services/manage-bid-schedule/bid-schedule/set-up-bid-leave.service';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CreateNewBidScheduleService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/create-new-bid-schedule.service';
import { BidVacationLeaveService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/bid-leave/bid-vacation-leave.service';
import { ActivatedRoute } from '@angular/router';
import { Workbook } from 'exceljs';
import { AddNewEmployeeService } from 'src/app/services/manage-bid-schedule/add-new-employee/add-new-employee.service';
import { BidShiftlinesService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/bid-shiftlines.service';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';

@Component({
  selector: 'app-view-leave-bid',
  templateUrl: './view-leave-bid.component.html',
  styleUrls: ['./view-leave-bid.component.scss'],
})
export class ViewLeaveBidComponent implements OnInit {
  spinner=false
  all_shift_lines=[]
  @Output() passBidScheduleName: EventEmitter<any> = new EventEmitter<any>();@Output() passroundId: EventEmitter<any> = new EventEmitter<any>();
  customPopoverOptions: any = {
   cssClass:'custom-popover'
  };
  openClose="animate bottom"
  all_SBP_rounds=[]
  user_data
  bid_schedule=[]
  bid_scheduleName=[]
  get_leave_data=[]
  years=[]
  all_employee=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R']
  selectShiftLineForm
  schedule_id: number=0;
  bidShculeTimeZone='US/Eastern'
  step_form_name
  empSelectedShiftlineData=[]
  empName="VP"
    selectYearForm: FormGroup;
    selectBidScheduleNameForm: FormGroup;
    start_date: any;
    end_date: any;
    all_bid_schedule: any[];
    currentSelectedRound: any;
    roundStartTime: any;
    roundStartDate: any;
    roundDuration: any;
    roundStatus: any;
    showPopUp: any;
    bidding_status=0;
    currentactiveRoundNumber=0;
    minutes;
    seconds: any;
    distance: number;
    interval
    bid_schedule_length=0
    all_Bid_schedule_list
  all_slots: any[];
  lockSwipeToPrev: boolean;
  all_slots_length: any;
  popUpId: any;
  currentPopupId: any;
  checkClickForPopup=false;
  currentBidScheduleData
  currentBidScheduleId=0;
  oldPopUpId: any;
  get_leave_data_data=[]
  cssClassForsingleClick='single-click';
  bid_schedulename
  rowCount=0
  checkBidShceduleInProgress=false
  _nextId
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  _chars
  bidSchedule: any;
  empId
  round_id
  slideOption={
    shortSwipes:true,
    longSwipes:true,
    longSwipesRatio:0.5,
    initialSlide: 0,
    slidesPerView: 4.4,
    spaceBetween: 10,
    centeredSlides:false,
    loop:false,
    zoom: false,
   }
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
      private newBidScheduleSer:CreateNewBidScheduleService,
      private fb:FormBuilder,
      private bidShiftLineSer:BidShiftlinesService,
    ) {
      this.route.params.subscribe(params => {
        this.bid_schedulename = params['_bidScheduleName'];

        this.round_id = params['_rid'];

        this.passBidScheduleName.emit(this.bid_schedulename)
        this.passroundId.emit(this.round_id)

    });
     }

    ngOnInit() {
      this.spinner=true
      this.headerTitleService.setTitle('');
      this.headerTitleService.setDefaultHeader(false)
      this.headerTitleService.setBackUrl(straightlines_io_apis.apis.dashboard);
      this.headerTitleService.setForwardUrl(null);this.headerTitleService.checkBiddingTime('biddingheader')
      this.headerTitleService.checkBiddingTime('biddingheader');this.headerTitleService.checkBiddingEndDate('');
      this.myBiddingSer.setTitle('viewLeaveBid')
      this.user_data=JSON.parse(sessionStorage.getItem('userData'))
      this.passBidScheduleName.emit(this.bid_schedulename)
      this.passroundId.emit(this.round_id)
      this.slideOption.initialSlide=Number(this.round_id)+ + +1
      // this.getAllBidSchedule()
      // this.getAllNewBidSchedule()
      // thi s.calendarMethod()
      if(this.bid_schedulename!=='select bid schedule name'){
      this.getAllNewBidSchedule()
      }else{
        this.spinner=false
      }
      this.selectShiftLineForm = this.formBuilder.group({
        allShiftLine: this.formBuilder.array([]) ,
    });
    this.selectYearForm = this.formBuilder.group({
      year:new FormControl("select year"),
    })
    this.selectBidScheduleNameForm = this.formBuilder.group({
      bid_schedule_name:new FormControl("select bid schedule name"),
    })
    }

    get allShiftLine() : FormArray {
      return this.selectShiftLineForm.get("allShiftLine") as FormArray
     }
     get year(){
      return  this.selectYearForm.get("year")
      }
      get bid_schedule_name(){
        return  this.selectBidScheduleNameForm.get("bid_schedule_name")
        }
     newWorkLoadData(): FormGroup {
      return this.formBuilder.group({
        selectShiftLine:new FormControl(),
        id:new FormControl(),
        shiftline:new FormControl(),
        emp:new FormControl(),
      })

    }
    getAllNewBidSchedule(){
      this.newBidScheduleSer.getAllBidScheduleData(this.user_data.id).subscribe((res)=>{
        this.all_Bid_schedule_list=res
        for(var i=0;i<this.all_Bid_schedule_list.length;i++){
          if(this.all_Bid_schedule_list[i].bidschename===this.bid_schedulename){
            this.currentBidScheduleData=this.all_Bid_schedule_list[i]
            this.currentBidScheduleId=this.currentBidScheduleData.bidschid
            this.all_slots=this.currentBidScheduleData.leavemap
            this.all_SBP_rounds=[]
            this.all_SBP_rounds.push({
              "actual_bidround_end_time": "",
              "actual_bidround_start_time": "",
              "bidleavereason": "",
              "bidroundid": '',
              "bidschref":this.currentBidScheduleId,
              "roundduration": "",
              "roundenddate": "",
              "roundendttime": "",
              "roundseq_id": 0,
              "roundstartdate": '',
              "roundstarttime": '',
            })
            var tempArrRound
            tempArrRound=this.currentBidScheduleData.roundmap
            for(var j=0;j<tempArrRound.length;j++){
              this.all_SBP_rounds.push(tempArrRound[j])
            }

            this.bidSchedule=this.all_Bid_schedule_list[i]
          }
        }

        this.bid_schedule=this.all_bid_schedule
            this.getAllShiftLineData()
      },(err)=>{console.log(err)},()=>{})
    }
    activeroundId
    onActivate(componentReference) {
     componentReference.passroundId.subscribe((data) => {
      this.activeroundId=data

   })
   }
   countnumber=0
   employeeselected=[]
   donthaveanyscheduledates=[]
    getAllShiftLineData(){
      var empId=0
      if(this.user_data.empid!=undefined){
        empId=this.user_data.empid


      this.bidShiftLineSer.getBidShiftlinesDataBasedOnEmpid(empId).subscribe((res)=>{
        var temp
      temp=res
      this.empSelectedShiftlineData=[]
      this.employeeselected=[]
      this.countnumber=0
      for(var i=0;i<temp.length;i++){
        if(temp[i].bidschidref==Number(this.currentBidScheduleId)){
          this.countnumber++
          this.employeeselected.push(temp[i])
        }
      }

      if(this.countnumber==0){
        this.displayRoundData(this.all_SBP_rounds[(Number(this.round_id)+ + +1)],(Number(this.round_id)+ + +1))
      }
      var checkDates=false
        this.donthaveanyscheduledates=[]
        for(var j=0;j<this.bidSchedule.shiftdefmap.length;j++){
          checkDates=false
          for(var i =0;i<this.employeeselected.length;i++){
            if(this.bidSchedule.shiftdefmap[j].shiftdefref==this.employeeselected[i].shiftidref){
              checkDates=true
              this.getshiflineData(this.bidSchedule.shiftdefmap[j],this.employeeselected[i],i)
            }
          }
          if(checkDates==false){
            this.getShiftLineSchedule(this.bidSchedule.shiftdefmap[j])

          }
      }

      },(err)=>{
        console.log(err)
      },()=>{})
    }else{
      this.displayRoundData(this.all_SBP_rounds[(Number(this.round_id)+ + +1)],(Number(this.round_id)+ + +1))
    }
    }
    getShiftLineSchedule(data){
      this.scheduleService.newgetAllShiftLinesBasedOnScheduleId(data.shiftdefref).subscribe((res)=>{

        var temp
        temp=res
        this.donthaveanyscheduledates.push({"shiftlineScheduleName":temp[0].schedulename,"data":data})
      },(err)=>{console.log(err)},()=>{})
    }
    getshiflineData(bidScheduleShiftlineSchedulData,ShiftlineData,index){
      this.scheduleService.newGetShiftLineBasedOnShiftLineId(ShiftlineData.shiftlineidref).subscribe((res)=>{
        var tempObj
        tempObj=res
        this.empSelectedShiftlineData.push({
          "shiftdefenddate": bidScheduleShiftlineSchedulData.shiftdefenddate,
          "shiftdefref": bidScheduleShiftlineSchedulData.shiftdefref,
          "shiftdefstartdate": bidScheduleShiftlineSchedulData.shiftdefstartdate,
          "schedulename": ShiftlineData.schedulename,
          "shiftname":  tempObj.shiftname,
          "shiftseq_id": ShiftlineData.shiftseq_id,
          "fri": tempObj.fri,
          "mon": tempObj.mon,
          "sat": tempObj.sat,
          "sun": tempObj.sun,
          "thu": tempObj.thu,
          "tue": tempObj.tue,
          "wed": tempObj.wed,
        })

        if((index+ + +1)==this.countnumber){
          this.displayRoundData(this.all_SBP_rounds[(Number(this.round_id)+ + +1)],(Number(this.round_id)+ + +1))

        }

      },(err)=>{console.log(err)},()=>{})

    }
    getRoundData(all_SBP_rounds,i){

      this.currentactiveRoundNumber=i
      this.selectedDateEmp=[]
      this.checkSelectedDate=undefined
      this.currentSelectedRound=all_SBP_rounds
      var start =this.currentSelectedRound.roundstartdate.split("-");
      var start_Date = new Date(start[0],Number(start[1])+ - +1, start[2],0 ,0, 0);
      this.roundStartTime= this.currentSelectedRound.roundstarttime
      this.roundStartDate=start_Date
      this.roundDuration=this.currentSelectedRound.roundduration.split(":")
      this.roundDuration=this.roundDuration[1]
      var start =this.currentSelectedRound.roundstartdate.split("-");
      var roundstartDate = new Date(start[0],Number(start[1])+ - +1, Number(start[2]),0 ,0, 0);
      var end =this.currentSelectedRound.roundenddate.split("-");
      var roundendDate = new Date(end[0],Number(end[1])+ - +1, Number(end[2])+ + +1,0 ,0, 0);
      var today,date,invdate,diff
    date = new Date();
            invdate = new Date(date.toLocaleString('en-US', {
              timeZone: this.bidShculeTimeZone
            }));
             diff = date.getTime() - invdate.getTime();
             today=new Date(date.getTime() - diff)
      if(today<roundstartDate){
        this.roundStatus="Closed"
      }else{
        if(today<roundendDate){
          this.roundStatus="Open"
        }else{
          this.roundStatus="Closed"
        }
      }
    }


    checkEmpExist(emp){
      var count=0

      if(this.user_data.empid==undefined){
        return false
      }else{
      if(emp.indexOf(this.user_data.initials) !== -1){
        return true
      }else{
        return false
      }
    }
    }










    convertNumber(m){
      return Number(m)
    }

    anyFunction(){

    }
    formatDate(date) {
      var d = date,
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;

      return [year, month, day].join('-');
  }
    displayRoundData(all_SBP_rounds,i){


      this.currentactiveRoundNumber=i

      this.selectedDate=null
      this.spinner=true
      this.getAllLeaveBasedOnBidScheduleName(i)

    }
    myFunction() {
      this.showPopUp
      this.checkClickForPopup=true
      var popup = document.getElementById("myPopupStatus");

      if(popup.style.visibility=="visible"){
        popup.style.visibility="hidden";
      }else{
        popup.style.visibility="visible";
      }
    }
    getIndicatorClass(index){
      if(this.currentactiveRoundNumber==index){
        return 'data ion-border-1px-mercurius-secondary-color app-background-mercurius-secondary-color'
      }else{
        return 'data ion-border-1px-mercurius-secondary-color app-font-mercurius-secondary-color'
      }

    }
    viewBidWindow(){
      return 'test'
    }
    changeCSS(){
      if(this.openClose=="animate bottom"){
        return this.openClose="animate bottom move"
      }else{
        this.openClose="animate bottom"
      }
    }
    getAllLeaveBasedOnBidScheduleName(index){
      this.getAllData(index)
    }

    getAllData(index){

      this.bidLeaveSer.getBidVacationDataBasedOnBidScheduleId(this.currentBidScheduleId).subscribe((res)=>{

        this.get_leave_data=[]
        this.get_leave_data_data=[]
        var temp
        temp=res
        this.get_leave_data_data=temp
        for(var i=0;i<temp.length;i++){
          if(this.currentactiveRoundNumber==0){
            this.get_leave_data.push(temp[i])
          }else{
          if((this.currentactiveRoundNumber) ==temp[i].roundseq_id){
            this.get_leave_data.push(temp[i])
          }
        }
        }

        this.calendarMethod()

        if(this.eventSource!=undefined){
  this.listToMatrix(this.eventSource)
}
      },(err)=>{console.log(err)},()=>{})

    }
    dateMulti: string[];
    type: 'string';
    selected: Date | null;
    currentSelectedDate=null
    cal_id: any;
    eventSource: any[];
    selectedDate=null
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
    selectedLeaveDates: any
    rdosInLeave=0
    alertPresented
    selectedLeaves=0
    calendar = {
      mode: 'month' as CalendarMode,
      step: 30 as Step,
      month:[

      ]
    }
    checkRDOs(date){
      var updatedDate,startDate,endDate
      updatedDate=new Date(Number(date.split('/')[2]),Number(date.split('/')[0])+ - +1,Number(date.split('/')[1]),0,0,0)
      for(var i=0;i<this.empSelectedShiftlineData.length;i++){
        startDate=new Date(Number(this.empSelectedShiftlineData[i].shiftdefstartdate.split('-')[0]),Number(this.empSelectedShiftlineData[i].shiftdefstartdate.split('-')[1])+ - +1,Number(this.empSelectedShiftlineData[i].shiftdefstartdate.split('-')[2]),0,0,0)
        endDate=new Date(Number(this.empSelectedShiftlineData[i].shiftdefenddate.split('-')[0]),Number(this.empSelectedShiftlineData[i].shiftdefenddate.split('-')[1])+ - +1,Number(this.empSelectedShiftlineData[i].shiftdefenddate.split('-')[2]),0,0,0)
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
    calendarMethod(){
   if (this.calendar.mode === 'month') {
            this.lockSwipeToPrev = true;
      }
      this.selectedDateEmp=[]
      this.checkSelectedDate=undefined
  var sDate=[]
var temp=[]
this.selectedDate
this.eventSource=[]
var temp1=[]
    var t
    var uniqueDate=[]

    for(var i=0;i<this.all_slots.length;i++){
      for(var j=0;j<12;j++){
        uniqueDate.push(new Date(this.all_slots[i].leavestartdate.split("-")[0],j,1,0,0,0))
      }
    }
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var uniqueDa = uniqueDate.map(s => s.getTime()).filter((s, i, a) => a.indexOf(s) == i).map(s => new Date(s));
  this.calendar.month=uniqueDa
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
  for(var j=0;j<this.all_slots.length;j++){
    for(var i=0;i<tempArr.length;i++){
      var tempT= !!sDate.find(item => {
       return new Date(item.startDate).getMonth() === tempArr[i].getMonth() && new Date(item.startDate).getFullYear() === tempArr[i].getFullYear() && new Date(item.startDate).getDate() === tempArr[i].getDate()})
          var tempDate=(Number(tempArr[i].getMonth())+ + + 1)+'/'+tempArr[i].getDate()+'/'+tempArr[i].getFullYear()
      if(tempArr[i]<new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0)){
        if(tempT==false){
        sDate.push({"startDate":tempDate,"endDate":tempDate,"title":this.checkRDOs(tempDate),"emp":[],"slot":0})
        }
      }else if(tempArr[i]>=new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0) ){
              if(tempT==false){
                if( tempArr[i]>=new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0) && tempArr[i]<=new Date(this.all_slots[j].leaveenddate.split("-")[0],Number(this.all_slots[j].leaveenddate.split("-")[1])+ - +1,Number(this.all_slots[j].leaveenddate.split("-")[2]),0,0,0) ){
                    sDate.push({"startDate":tempDate,"endDate":tempDate,"title":this.checkRDOs(tempDate),"emp":[],"slot":this.all_slots[j].leaveslots})
                }
                else if(this.all_slots.length<=j+1){
                  sDate.push({"startDate":tempDate,"endDate":tempDate,"title":this.checkRDOs(tempDate),"emp":[],"slot":0})
                }

              }else if(tempT==true){
                  var tempA=[],slot=0
                  for(var k=0;k<sDate.length;k++){
                    if((Number(sDate[k].startDate.split("/")[0]) ===Number( tempArr[i].getMonth()+ + +1)) &&Number( sDate[k].startDate.split("/")[2]) === tempArr[i].getFullYear() && Number(sDate[k].startDate.split("/")[1] )=== tempArr[i].getDate()){
                      if(tempArr[i]>=new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0) && tempArr[i]<=new Date(this.all_slots[j].leaveenddate.split("-")[0],Number(this.all_slots[j].leaveenddate.split("-")[1])+ - +1,Number(this.all_slots[j].leaveenddate.split("-")[2]),0,0,0) ){
                      slot=this.all_slots[j].leaveslots+ + +sDate[k].slot

                      tempA.push({"startDate":sDate[k].startDate,"endDate":sDate[k].startDate,"title":sDate[k].title,"emp":sDate[k].emp,"slot":slot})
                      }else{
                        tempA.push({"startDate":sDate[k].startDate,"endDate":sDate[k].startDate,"title":sDate[k].title,"emp":sDate[k].emp,"slot":sDate[k].slot})
                      }
                    }else{
                      tempA.push({"startDate":sDate[k].startDate,"endDate":sDate[k].startDate,"title":sDate[k].title,"emp":sDate[k].emp,"slot":sDate[k].slot})
                    }
                  }
                  sDate=tempA
              }
        }
    }
  }


    for(var d=0;d<sDate.length;d++){
      t=new Date(sDate[d].startDate)
      var emp
      emp=this.checkEmp(t)
      // uniqueDate.push(new Date((new Date(sDate[d].startDate).getMonth()+ + +1)+'-01-'+new Date(sDate[d].startDate).getFullYear()))
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
    this.clickCount++;
             this.tempSelectedDate=e

             this.selectedDate=e
             if(this.selectedDate.emp.length===0 && this.selectedDate.slot===0){
                this.cssClassForsingleClick='default-single-click'
              }else{
                this.cssClassForsingleClick='single-click'
              }
              // this.cdref.detectChanges()
             this.clickName='single'

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
popUp(i,e){

  this.addNewEmp.getAllEmployeeBasedOnmanagerIdEmpInitials(this.user_data.id,e).subscribe((res)=>{

  },(err)=>{console.log(err)},()=>{})
  this.popUpId=i
  this.currentPopupId=i
  this.checkClickForPopup=true
  var popupTime = document.getElementById("myPopup"+this.popUpId);
  popupTime.style.visibility='visible'

  if(this.oldPopUpId!=undefined && this.popUpId!==this.oldPopUpId){
    var popupTwo = document.getElementById("myPopup"+this.oldPopUpId);
    popupTwo.style.visibility='hidden'
  }
  this.oldPopUpId=this.popUpId

}
  removePopup(){
    if(this.checkClickForPopup==false){
      if(this.oldPopUpId!=undefined){
      var popupTwo = document.getElementById("myPopup"+this.oldPopUpId);
        popupTwo.style.visibility='hidden'
      }

    }
    this.checkClickForPopup=false
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
convertDate(date){
  return new Date(Number(date.split('-')[0]),Number(date.split('-')[1])+ - +1,Number(date.split('-')[2]),0,0,0)
}
checkEmp(date){

  var tempArr=[]
  for(var i=0;i<this.get_leave_data.length;i++){

    if(this.convertDate(this.get_leave_data[i].vacationstartdate)<=date && this.convertDate(this.get_leave_data[i].vacationenddate)>=date){
     tempArr.push(this.get_leave_data[i].initials)

    }
  }
  return tempArr
}


checkEmpForExport(date){

  var tempArr=[]
  for(var i=0;i<this.get_leave_data_data.length;i++){

    if(this.convertDate(this.get_leave_data_data[i].vacationstartdate)<=date && this.convertDate(this.get_leave_data_data[i].vacationenddate)>=date){
     tempArr.push(this.get_leave_data_data[i].initials)

    }
  }
  return tempArr
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
all_leave_slots=[]
exportEventSource=[]
export(){
      this.all_slots=[]

      this.all_slots=this.currentBidScheduleData.leavemap
      var sDate=[]
      var temp=[]

      var temp1=[]
          var t
          var uniqueDate=[]
      for(var i=0;i<this.all_slots.length;i++){
        for(var j=0;j<12;j++){
          uniqueDate.push(new Date(this.all_slots[i].leavestartdate.split("-")[0],j,1,0,0,0))
        }

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
    for(var j=0;j<this.all_slots.length;j++){
      for(var i=0;i<tempArr.length;i++){
        var tempT= !!sDate.find(item => {
        return new Date(item.startDate).getMonth() === tempArr[i].getMonth() && new Date(item.startDate).getFullYear() === tempArr[i].getFullYear() && new Date(item.startDate).getDate() === tempArr[i].getDate()})
        var tempDate=(Number(tempArr[i].getMonth())+ + + 1)+'/'+tempArr[i].getDate()+'/'+tempArr[i].getFullYear()
        if(tempArr[i]<new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0)){
          if(tempT==false){
          sDate.push({"startDate":tempDate,"endDate":tempDate,"title":'',"emp":[],"slot":0})
          }
        }else if(tempArr[i]>=new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0) ){
                if(tempT==false){
                  if( tempArr[i]>=new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0) && tempArr[i]<=new Date(this.all_slots[j].leaveenddate.split("-")[0],Number(this.all_slots[j].leaveenddate.split("-")[1])+ - +1,Number(this.all_slots[j].leaveenddate.split("-")[2]),0,0,0) ){
                      sDate.push({"startDate":tempDate,"endDate":tempDate,"title":'',"emp":[],"slot":this.all_slots[j].leaveslots})
                  }
                  else if(this.all_slots.length<=j+1){
                    sDate.push({"startDate":tempDate,"endDate":tempDate,"title":'',"emp":[],"slot":0})
                  }

                }else if(tempT==true){
                    var tempA=[],slot=0
                    for(var k=0;k<sDate.length;k++){
                        if((Number(sDate[k].startDate.split("/")[0]) ===Number( tempArr[i].getMonth()+ + +1)) &&Number( sDate[k].startDate.split("/")[2]) === tempArr[i].getFullYear() && Number(sDate[k].startDate.split("/")[1] )=== tempArr[i].getDate()){
                          if(tempArr[i]>=new Date(this.all_slots[j].leavestartdate.split("-")[0],Number(this.all_slots[j].leavestartdate.split("-")[1])+ - +1,Number(this.all_slots[j].leavestartdate.split("-")[2]),0,0,0) && tempArr[i]<=new Date(this.all_slots[j].leaveenddate.split("-")[0],Number(this.all_slots[j].leaveenddate.split("-")[1])+ - +1,Number(this.all_slots[j].leaveenddate.split("-")[2]),0,0,0) ){
                          slot=this.all_slots[j].leaveslots+ + +sDate[k].slot
                          tempA.push({"startDate":sDate[k].startDate,"endDate":sDate[k].startDate,"title":sDate[k].title,"emp":sDate[k].emp,"slot":slot})
                          }else{
                            tempA.push({"startDate":sDate[k].startDate,"endDate":sDate[k].startDate,"title":sDate[k].title,"emp":sDate[k].emp,"slot":sDate[k].slot})
                          }
                      }else{
                        tempA.push({"startDate":sDate[k].startDate,"endDate":sDate[k].startDate,"title":sDate[k].title,"emp":sDate[k].emp,"slot":sDate[k].slot})
                      }
                    }
                    sDate=tempA
                }
          }
      }
    }
    this.exportEventSource=[]
    for(var d=0;d<sDate.length;d++){
      t=new Date(sDate[d].startDate)
      var emp
      emp=this.checkEmp(t)
      var dayName = days[new Date(t).getDay()];
      if(sDate[d].title=="SS"){
          if(dayName=='Sun' || dayName=='Sat'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "SS","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":sDate[d].startDate,"allDay": true,"emp":emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="SM"){
          if(dayName=='Sun' || dayName=='Mon'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "SM","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="MT"){
          if(dayName=='Mon' || dayName=='Tue'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "MT","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="TW"){
          if(dayName=='Tue' || dayName=='Wed'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "TW","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="WT"){
          if(dayName=='Wed' || dayName=='Thu'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "WT","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"slot":sDate[d].slot,"selected":false})
          }
        }
        else if(sDate[d].title=="TF"){
          if(dayName=='Thu' || dayName=='Fri'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "TF","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"selected":false,"slot":sDate[d].slot})
          }
        }
        else if(sDate[d].title=="FS"){
          if(dayName=='Fri' || dayName=='Sat'){
            var te=String(t.toLocaleDateString());
            this.exportEventSource.push( {"title": "FS","startDate":sDate[d].startDate,"endTime":new Date(te),"emp":emp,"allDay": true,"slot":sDate[d].slot,"selected":false})
          }else{
          var te=String(t.toLocaleDateString());
          this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"selected":false,"slot":sDate[d].slot})
          }
        }
      else{
        var te=String(t.toLocaleDateString());
        this.exportEventSource.push( {"title": "","startDate":sDate[d].startDate,"endTime":new Date(te),"allDay": true,"emp":emp,"selected":false,"slot":sDate[d].slot})
      }
    }
        this.allLeaveData=[]
        var tempAr=[]
        this.all_leave_slots=[]
    for(var i=0;i<this.exportEventSource.length;i++){
      if(i==0){
        tempAr.push(this.exportEventSource[i])
      }else{
        if(this.exportEventSource[i-1].startDate.split('/')[0]==this.exportEventSource[i].startDate.split('/')[0] && this.exportEventSource[i-1].startDate.split('/')[2]==this.exportEventSource[i].startDate.split('/')[2]){
          tempAr.push(this.exportEventSource[i])
        }
        else{
          this.all_leave_slots.push(tempAr)
          tempAr=[]
          tempAr.push(this.exportEventSource[i])
        }
      }
      if((i + + +1)==sDate.length){
      this.all_leave_slots.push(tempAr)
      }
    this.allLeaveData=this.exportEventSource
    }
  this.eSheet()
}
allLeaveData=[]
eSheet(){
  this.rowCount=1
  const workbook = new Workbook();
  var temp
  const customized_worksheet = workbook.addWorksheet('Bid Schedule Data');
  var tempMonth

  this._chars = this.chars;
  this._nextId = [0];
  temp=this.next()
  if(this.currentactiveRoundNumber==0){
    const defCompBidScheduleName=customized_worksheet.getCell(temp+this.rowCount);
    defCompBidScheduleName.value=String(this.bid_schedulename)
    defCompBidScheduleName.font = {bold: true};
    defCompBidScheduleName.alignment={ vertical: 'middle',horizontal: 'center' ,wrapText:true  }
    defCompBidScheduleName.font = {bold: true,  size: 22};
    var lastCol,firstrow
    for(var i=0;i<18;i++){
      lastCol=this.next()
    }
    firstrow=this.rowCount
    for(var i=0;i<5;i++){
      this.rowCount=this.rowCount+ + + i
    }
    customized_worksheet.mergeCells(temp+firstrow+':'+lastCol+this.rowCount);
  }else{
      const defCompBidScheduleName=customized_worksheet.getCell(temp+this.rowCount);
      defCompBidScheduleName.value=String(this.bid_schedulename)
      defCompBidScheduleName.font = {bold: true};
      defCompBidScheduleName.alignment={ vertical: 'middle',horizontal: 'center' ,wrapText:true  }
      defCompBidScheduleName.font = {bold: true,  size: 22};
      var lastCol,firstrow
      for(var i=0;i<18;i++){
        lastCol=this.next()
      }
      firstrow=this.rowCount
      for(var i=0;i<4;i++){
        this.rowCount=this.rowCount+ + + i
      }

      customized_worksheet.mergeCells(temp+firstrow+':'+lastCol+this.rowCount);

        this._chars = this.chars;
        this._nextId = [0];
        temp=this.next()
        this.rowCount++
      const defCompRoundNum=customized_worksheet.getCell(temp+this.rowCount);
      defCompRoundNum.value="Round "+String(this.currentactiveRoundNumber)
      defCompRoundNum.font = {bold: true};
      defCompRoundNum.alignment={ vertical: 'middle',horizontal: 'center' ,wrapText:true  }
      defCompRoundNum.font = {bold: true,  size: 22};
      var lastCol,firstrow
      for(var i=0;i<18;i++){
        lastCol=this.next()
      }
      firstrow=this.rowCount
      for(var i=0;i<3;i++){
        this.rowCount=this.rowCount+ + + i
      }

      customized_worksheet.mergeCells(temp+firstrow+':'+lastCol+this.rowCount);
  }
  for(var k=0;k<this.all_leave_slots.length;k++){
    this.allLeaveData=this.all_leave_slots[k]
    const header = [];
    for(var i=0;i<18;i++){
       tempMonth=new Date(Number( this.allLeaveData[0].startDate.split('/')[2]),Number(this.allLeaveData[0].startDate.split('/')[0])+-  +1,Number(this.allLeaveData[0].startDate.split('/')[1]),0,0,0).toLocaleString('en-us', { month: 'short' })
      header.push(tempMonth.toUpperCase())
      header.push('')
    }
  this._chars = this.chars;
  this._nextId = [0];
  this.rowCount++
  for(var i=0;i<header.length;i++){
    temp=this.next()

    const defCompT=customized_worksheet.getCell(temp+this.rowCount);
    defCompT.value=header[i]
    defCompT.alignment={ vertical: 'middle',horizontal: 'center'   }
    defCompT.font = {bold: true};
  }
  this.rowCount++
  this._chars = this.chars;
  this._nextId = [1];
  var tempValue
  this.rowCount++
  for(var i=0;i<this.allLeaveData.length;i++){
    temp=this.next()
    const defCompTitle=customized_worksheet.getCell(temp+this.rowCount);
     tempValue=String(this.allLeaveData[i].startDate.split('/')[1])
    defCompTitle.value=tempValue
    defCompTitle.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
    defCompTitle.alignment={ vertical: 'middle', horizontal: 'center' };
    defCompTitle.border = {
      top: {style:'medium'},
        left: {style:'medium'},
        right: {style:'medium'},
      };
      defCompTitle.font = {bold: true};

    }

    this._chars = this.chars;
    this._nextId = [1];
    this.rowCount++
    for(var i=0;i<this.allLeaveData.length;i++){
      temp=this.next()
      const defCompDay=customized_worksheet.getCell(temp+this.rowCount);
       tempValue=new Date(Number(this.allLeaveData[i].startDate.split('/')[2]),Number(this.allLeaveData[i].startDate.split('/')[0])+ - +1,Number(this.allLeaveData[i].startDate.split('/')[1]),0,0,0).getDay()
       if(tempValue==0){
        defCompDay.value='S'
       }
       else if(tempValue==1){
        defCompDay.value='M'
       }
       else if(tempValue==2){
        defCompDay.value='T'
       }
       else if(tempValue==3){
        defCompDay.value='W'
       }
       else if(tempValue==4){
        defCompDay.value='TH'
       }
       else if(tempValue==5){
        defCompDay.value='F'
       }
       else if(tempValue==6){
        defCompDay.value='S'
       }
       defCompDay.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
       defCompDay.alignment={ vertical: 'middle', horizontal: 'center' };
       defCompDay.border = {
        bottom: {style:'medium'},
          left: {style:'medium'},
          right: {style:'medium'},
        };
        defCompDay.font = {bold: true};
      }
      var RDOS=['SS','SM','MT','TW','WT','TF','FS']
      for(var i=0;i<RDOS.length;i++){
        const defCompRDOS=customized_worksheet.getCell('A'+(this.rowCount+ + +i));
        defCompRDOS.value=RDOS[i]
        defCompRDOS.alignment={ vertical: 'middle', horizontal: 'center' };
        defCompRDOS.font = {bold: true};
      }

      this._chars = this.chars;
      this._nextId = [1];
      this.rowCount++
      for(var j=0;j<7;j++){
        this._chars = this.chars;
        this._nextId = [1];

        for(var i=0;i<this.allLeaveData.length;i++){
          temp=this.next()
          const defCompDayRDO=customized_worksheet.getCell(temp+(this.rowCount+ + +j));

          tempValue=new Date(Number(this.allLeaveData[i].startDate.split('/')[2]),Number(this.allLeaveData[i].startDate.split('/')[0])+ - +1,Number(this.allLeaveData[i].startDate.split('/')[1]),0,0,0).getDay()
          if(tempValue==0   && (j==0 || j==1)){
            defCompDayRDO.value='X'
          }
          else if(tempValue==1  && (j==1 || j==2)){
            defCompDayRDO.value='X'
          }
          else if(tempValue==2  && (j==2 || j==3)){
            defCompDayRDO.value='X'
          }
          else if(tempValue==3  && (j==3 || j==4)){
            defCompDayRDO.value='X'
          }
          else if(tempValue==4  && (j==4 || j==5)){
            defCompDayRDO.value='X'
          }
          else if(tempValue==5  && (j==5 || j==6)){
            defCompDayRDO.value='X'
          }
          else if(tempValue==6 && (j==0 || j==6)){
            defCompDayRDO.value='X'
          }
          defCompDayRDO.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
          defCompDayRDO.alignment={ vertical: 'middle', horizontal: 'center' };
          defCompDayRDO.border = {
              left: {style:'medium'},
              right: {style:'medium'},
            };
            defCompDayRDO.font = {bold: true};
            if(j==6){
              defCompDayRDO.border = {
                left: {style:'medium'},
                right: {style:'medium'},
                bottom:{style:'medium'}
              };

            }
          }
          temp=this.next()
          const defCompRDOS=customized_worksheet.getCell(temp+(this.rowCount+ + +j));
          defCompRDOS.value=RDOS[j]
          defCompRDOS.alignment={ vertical: 'middle', horizontal: 'center' };
          defCompRDOS.font = {bold: true};
      }
      this._chars = this.chars;
      this._nextId = [1];
      var tempValue
      this.rowCount=this.rowCount+ + +7
      for(var i=0;i<this.allLeaveData.length;i++){
        temp=this.next()
      this.rowCount
        const defCompTitle=customized_worksheet.getCell(temp+this.rowCount);
         tempValue=String(this.allLeaveData[i].startDate.split('/')[1])
        defCompTitle.value=tempValue
        defCompTitle.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
        defCompTitle.alignment={ vertical: 'middle', horizontal: 'center' };
        defCompTitle.border = {
          top: {style:'medium'},
            left: {style:'medium'},
            right: {style:'medium'},
          };
          defCompTitle.font = {bold: true};

        }

        this._chars = this.chars;
        this._nextId = [1];
        this.rowCount++
        for(var i=0;i<this.allLeaveData.length;i++){
          temp=this.next()
          const defCompDay=customized_worksheet.getCell(temp+this.rowCount);
           tempValue=new Date(Number(this.allLeaveData[i].startDate.split('/')[2]),Number(this.allLeaveData[i].startDate.split('/')[0])+ - +1,Number(this.allLeaveData[i].startDate.split('/')[1]),0,0,0).getDay()
           if(tempValue==0){
            defCompDay.value='S'
           }
           else if(tempValue==1){
            defCompDay.value='M'
           }
           else if(tempValue==2){
            defCompDay.value='T'
           }
           else if(tempValue==3){
            defCompDay.value='W'
           }
           else if(tempValue==4){
            defCompDay.value='TH'
           }
           else if(tempValue==5){
            defCompDay.value='F'
           }
           else if(tempValue==6){
            defCompDay.value='S'
           }
           defCompDay.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
           defCompDay.alignment={ vertical: 'middle', horizontal: 'center' };
           defCompDay.border = {
            bottom: {style:'medium'},
              left: {style:'medium'},
              right: {style:'medium'},
            };
            defCompDay.font = {bold: true};
          }


        var maxSlot=0,maxSlotArr=[]
          for(var  j=0;j<this.allLeaveData.length;j++){
            if(maxSlot>=this.allLeaveData[j].slot){
              maxSlot=maxSlot
            }else{
              maxSlot=this.allLeaveData[j].slot
            }
          }
          // maxSlot=4
          this.rowCount++
          for(var i=0;i<this.allLeaveData.length;i++){
            for(var j=0;j<maxSlot;j++){

            const defCompSlotNumber=customized_worksheet.getCell('A'+(this.rowCount + + +j));
            defCompSlotNumber.value=j + + +1
            defCompSlotNumber.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
            defCompSlotNumber.alignment={ vertical: 'middle', horizontal: 'center' };
            defCompSlotNumber.border = {
             bottom: {style:'medium'},
               left: {style:'medium'},
               right: {style:'medium'},
               top: {style:'medium'},
             };
             defCompSlotNumber.font = {bold: true};
          }
          }
          this._chars = this.chars;
          this._nextId = [1];
          for(var i=0;i<this.allLeaveData.length;i++){
            temp=this.next()
            var s
            s=this.allLeaveData[i].slot
            // if(i==4){
            //   s=4
            // }
            for(var j=0;j<maxSlot;j++){


              const defCompSlot=customized_worksheet.getCell(temp+(this.rowCount + + +j));
              defCompSlot.font = {bold: true};
              if(j<maxSlot && j<s){

                defCompSlot.value=this.allLeaveData[i].emp[j]
                defCompSlot.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'95B3D7'}};
                defCompSlot.alignment={ vertical: 'middle', horizontal: 'center' };
                defCompSlot.border = {
                  bottom: {style:'medium'},
                    left: {style:'medium'},
                    right: {style:'medium'},
                  };
            }else{
                defCompSlot.value=''
                defCompSlot.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'000000'}};
                defCompSlot.alignment={ vertical: 'middle', horizontal: 'center' };
                defCompSlot.border = {
                  bottom: {style:'medium'},
                    left: {style:'medium'},
                    right: {style:'medium'},
                  };
            }

            }
            if((i+ + +1)==this.allLeaveData.length){
              temp=this.next()
              for(var j=0;j<maxSlot;j++){
            const defCompSlotNumber=customized_worksheet.getCell(temp+(this.rowCount + + +j));
            defCompSlotNumber.value=j + + +1
            defCompSlotNumber.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'C2D69B'}};
            defCompSlotNumber.alignment={ vertical: 'middle', horizontal: 'center' };
            defCompSlotNumber.border = {
             bottom: {style:'medium'},
               left: {style:'medium'},
               right: {style:'medium'},
               top: {style:'medium'},
             };
             defCompSlotNumber.font = {bold: true};
            }
          }
          }
          this.rowCount=this.rowCount+ + +maxSlot
          this.rowCount=this.rowCount+ + +2
          this._chars = this.chars;
          this._nextId = [0];
          for(var i=0;i<header.length;i++){
            temp=this.next()

            const defCompT=customized_worksheet.getCell(temp+this.rowCount);
            defCompT.value=header[i]
            defCompT.alignment={ vertical: 'middle',horizontal: 'center'   }
            defCompT.font = {bold: true};
          }
          this.rowCount=this.rowCount+ + +2
          this._chars = this.chars;
          this._nextId = [0];
          for(var i=0;i<header.length;i++){
            temp=this.next()

            const defCompT=customized_worksheet.getCell(temp+this.rowCount);
            defCompT.border={bottom:{style:'thick'}}
          }

          this.rowCount=this.rowCount+ + +2
        }
  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob,  this.bid_schedulename+' Bid Schedule Data.xlsx');
  })
}
PopUpIdEmp
// checkClickForPopup=false
oldPopUpIdEmp
myFunctionPopup() {
  this.checkClickForPopup=true

  var popup = document.getElementById("myPopupEmp");
  popup.classList.toggle("showEmp");
}
disablePopup(){
  if(this.checkClickForPopup==false){
    var popup = document.getElementById("myPopupEmp");
    if(popup!=null){
      if(popup.classList.contains("showEmp")==true){

        popup.classList.toggle("showEmp");
      }
    }
    }
   this.checkClickForPopup=false
}

}

