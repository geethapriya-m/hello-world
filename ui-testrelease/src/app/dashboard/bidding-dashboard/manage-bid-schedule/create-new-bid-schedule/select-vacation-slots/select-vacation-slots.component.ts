import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavController, NavParams } from '@ionic/angular';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { AddNewEmployeeService } from 'src/app/services/manage-bid-schedule/add-new-employee/add-new-employee.service';
import { BidScheduleService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-schedule.service';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import Swal from 'sweetalert2';
import straightlines_io_apis from 'src/app/json/apis.json';
import { ActivatedRoute } from '@angular/router';
import { SelectBidRoundsComponent } from '../select-bid-rounds/select-bid-rounds.component';


@Component({
  selector: 'app-select-vacation-slots',
  templateUrl: './select-vacation-slots.component.html',
  styleUrls: ['./select-vacation-slots.component.scss'],
})
export class SelectVacationSlotsComponent implements OnInit {
  totalHours=0
  setUpBidParametersForm: FormGroup;
  bid_schedule_data: any;
  all_schedule: any;
  selected_schedule_data: any;
  user_data: any;
  allShiftData=[];
  old_list=[]
  getAllScheduleName: any[];
  allEmployee=[]
  scheduleListForm : any;
  schedule_data=[];
  lastDate
  all_vacation_slots_list=[]
  checkDate=[]
  dateValidation=false
  checkShiftLineSchedule=false
  setUpBidScheduleOne: any;
  updatedData: any[];
  allScheduleData=[]
  disable=true
  countOfDateRange=0
  all_final_data=[]
  view_bid_schedule_id
  updatedValue=false
  checkEditBidSchedule=false
  newBidSchedule
  minDate=new Date()
  totalRequiredHours=0
  remainingAccuredHours=0
  totalAccuredHours=0
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private getAllEmp:AddNewEmployeeService,
    private scheduleService:GeneratedScheduleService,
    private headerTitleService: HeaderTitleService,
    private activaRouter: ActivatedRoute,
    private bidScheduleSer:BidScheduleService,
    public actionSheetController: ActionSheetController,
    private fb:FormBuilder) {
      this.bid_schedule_data=navParams.get('bid_schedule_data')
      this.allScheduleData=navParams.get('all_schedule_data')
      this.checkEditBidSchedule=navParams.get('editBidSchedule')
      this.activaRouter.params.subscribe(params => {
        this.view_bid_schedule_id=params['_id']
      });
   }
   ngOnInit() {

    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    if(this.checkEditBidSchedule==false){
      this.newBidSchedule=JSON.parse(localStorage.getItem('newBidSchedule'))
      this.getEmp()
    }else{
      this.newBidSchedule=JSON.parse(localStorage.getItem('editBidSchedule'))
      this.editgetEmp()
    }

    this.getShiftLineSchedule()
    this.all_vacation_slots_list=[]
    this.scheduleListForm  = this.fb.group({
      allScheduleListData: this.fb.array([]) ,
    });

  }
  get allScheduleListData() : FormArray {
    return this.scheduleListForm .get("allScheduleListData") as FormArray
   }
   newWorkLoadData(): FormGroup {
    return this.fb.group({
      id:new FormControl(),
      startDate:new FormControl(),
      endDate:new FormControl(),
      bidschref:new FormControl(),
      bidleaveid:new FormControl(),
      SBP_slots:new FormControl('',Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]))
    })
  }
  getShiftLineSchedule() {
    this.scheduleService.newgetAllSchedule(this.user_data.id).subscribe((res)=>{

      this.all_schedule=res

      this.shiftLineForm()
      return this.all_schedule

    },(error)=>{
      console.log(error)
    },()=>{
    })

  }
  editgetEmp(){
    this.allEmployee=[]
    for(var i=0;i<this.newBidSchedule.employeemap.length;i++){
      this.getEmployeeList(this.newBidSchedule.employeemap[i].empidref,i)
    }
  }
getEmp(){
  this.allEmployee=[]
  for(var i=0;i<this.newBidSchedule.employeemap.length;i++){
    this.getEmployeeList(this.newBidSchedule.employeemap[i],i)
  }
}

getEmployeeList(empId,i){
  this.getAllEmp.getEmpDataBasedOnEmpId(empId).subscribe(
    (res)=>{
      this.allEmployee.push(res)
      this.allEmployee=this.allEmployee.sort((a, b) => a.rank - b.rank)
      if(this.newBidSchedule.employeemap.length===(i+ + +1)){
        this.totalLeaveAccured()
      }
    },
    (err)=>{console.log(err)},()=>{})
  }
  totalLeaveAccured(){
    this.totalRequiredHours=0
    for(var i=0;i<this.allEmployee.length;i++){
        this.totalRequiredHours= this.totalRequiredHours+ + +this.allEmployee[i].vacation
    }
    this.totalAccuredHours=JSON.parse(localStorage.getItem('totalRequiredVacationHours'))
    this.remainingAccuredHours=this.totalAccuredHours+ - +this.totalHours
  }

dateRangeChange() {
this.updatedValue=true

}
submit(){
var temp=[]
var nextId=0
var tempObj=JSON.parse(localStorage.getItem('newBidSchedule'))
if(tempObj!=null){
  if(tempObj.leavemap.length>0)
  {
    // temp=tempObj.leavemap
    // nextId=tempObj.leavemap.length
  }
  }

for(var i=0;i<this.scheduleListForm.value.allScheduleListData.length;i++){
  if(this.scheduleListForm.value.allScheduleListData[i].startDate!=null && this.scheduleListForm.value.allScheduleListData[i].endDate!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots>0 && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=''){
    nextId++
    temp.push(
      {
        "leavestartdate":this.scheduleListForm.value.allScheduleListData[i].startDate,
        "leaveenddate":this.scheduleListForm.value.allScheduleListData[i].endDate,
        "leaveslots": this.scheduleListForm.value.allScheduleListData[i].SBP_slots,
        "leaveseq_id": i+ + +1
      }
     )
  }
}

var tempNewObj
if(tempObj==null){
  tempNewObj={
    "bidschename": null,
    "bidmanagerid": this.user_data.id,
    "timezone":"",
    "weekendstatus": false,
    "bidschstartdate":null ,
    "bidschenddate": null,
    "schedulesavestatus": 0,
    "leavesavestatus": 0,
    "roundsavestatus": 0,
    "shiftdefmap": [],
    "employeemap": [],
    "leavemap": temp,
    "roundmap": []
  }
}else{
  tempNewObj={
    "bidschename": tempObj.bidschename,
    "bidmanagerid": this.user_data.id,
    "timezone":tempObj.timezone,
    "weekendstatus": tempObj.weekendstatus,
    "bidschstartdate":tempObj.bidschstartdate,
    "bidschenddate":tempObj.bidschenddate,
    "schedulesavestatus": tempObj.schedulesavestatus,
    "leavesavestatus": tempObj.leavesavestatus,
    "roundsavestatus": tempObj.roundsavestatus,
    "shiftdefmap": tempObj.shiftdefmap,
    "employeemap":tempObj.employeemap,
    "leavemap":temp,
    "roundmap": tempObj.roundmap
  }
}
localStorage.setItem('newBidSchedule',JSON.stringify(tempNewObj))

this.modalCtrl.dismiss({'totalHours':this.totalHours,"updatedValue":this.updatedValue})
}

checkDisable(){
  var totalVacationDateRange=0
  for(var i=0;i<this.scheduleListForm.value.allScheduleListData.length;i++){
    if(this.scheduleListForm.value.allScheduleListData[i].startDate!=null && this.scheduleListForm.value.allScheduleListData[i].endDate!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots>0 && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=''){
      totalVacationDateRange++
    }
  }
    if(totalVacationDateRange>0){
      return true
    }else{
      return false
    }

}

close(){
  this.modalCtrl.dismiss({'totalHours':this.totalHours,"updatedValue":false})
}
bidScheduleId
update(){
  var temp=[]
  var nextId=0
  var tempObj=JSON.parse(localStorage.getItem('editBidSchedule'))
  this.bidScheduleId=tempObj.bidschid
  if(tempObj!=null){
    if(tempObj.leavemap.length>0)
    {
      // temp=tempObj.leavemap
      // nextId=tempObj.leavemap.length
    }
    }

  for(var i=0;i<this.scheduleListForm.value.allScheduleListData.length;i++){
    if(this.scheduleListForm.value.allScheduleListData[i].startDate!=null && this.scheduleListForm.value.allScheduleListData[i].endDate!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots>0 && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=''){
      nextId++

      temp.push(
        {
          "bidschref":this.scheduleListForm.value.allScheduleListData[i].bidschref,
          "bidleaveid":this.scheduleListForm.value.allScheduleListData[i].bidleaveid,
          "leavestartdate":this.scheduleListForm.value.allScheduleListData[i].startDate,
          "leaveenddate":this.scheduleListForm.value.allScheduleListData[i].endDate,
          "leaveslots": this.scheduleListForm.value.allScheduleListData[i].SBP_slots,
          "leaveseq_id": i+ + +1
        }
       )
    }
  }

  var tempNewObj
  if(tempObj==null){
    tempNewObj={
      "bidschename": null,
      "bidschid":this.bidScheduleId,
      "bidmanagerid": this.user_data.id,
      "timezone":"",
      "weekendstatus": false,
      "bidschstartdate":null ,
      "bidschenddate": null,
      "schedulesavestatus": 0,
      "leavesavestatus": 0,
      "roundsavestatus": 0,
      "shiftdefmap": [],
      "employeemap": [],
      "leavemap": temp,
      "roundmap": []
    }
  }else{
    tempNewObj={
      "bidschename": tempObj.bidschename,
      "bidmanagerid": this.user_data.id,
      "timezone":tempObj.timezone,
      "bidschid":this.bidScheduleId,
      "weekendstatus": tempObj.weekendstatus,
      "bidschstartdate":tempObj.bidschstartdate,
      "bidschenddate":tempObj.bidschenddate,
      "schedulesavestatus": tempObj.schedulesavestatus,
      "leavesavestatus": tempObj.leavesavestatus,
      "roundsavestatus": tempObj.roundsavestatus,
      "shiftdefmap": tempObj.shiftdefmap,
      "employeemap":tempObj.employeemap,
      "leavemap":temp,
      "roundmap": tempObj.roundmap
    }
  }
  localStorage.setItem('editBidSchedule',JSON.stringify(tempNewObj))
  this.modalCtrl.dismiss({'totalHours':this.totalHours,"updatedValue":this.updatedValue})
}
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  changeDate(date){
    var temp=date.split("T")
    return temp
  }
  shiftLineForm(){
    var temp

    this.all_vacation_slots_list=[]
        this.updatedData=[]
        if(this.checkEditBidSchedule==false){
            var tempObj=JSON.parse(localStorage.getItem('newBidSchedule'))
            if(tempObj!=null && tempObj.leavemap.length>0){

                  for(var i=0;i<tempObj.leavemap.length;i++){
                  this.allScheduleListData.push(this.newWorkLoadData());
                  temp={"id":i,"startDate":tempObj.leavemap[i].leavestartdate,"endDate":tempObj.leavemap[i].leaveenddate,'SBP_slots':tempObj.leavemap[i].leaveslots,  "bidschref":'',
                  "bidleaveid":''}
                  this.all_vacation_slots_list.push(temp)
                    this.updatedData.push(temp)
                  }
                    this.allScheduleListData.setValue(this.all_vacation_slots_list)
            }else{
            for(var i=0;i<1;i++){
                this.allScheduleListData.push(this.newWorkLoadData());
                temp={"id":i,"startDate":null,"endDate":null,'SBP_slots':'',  "bidschref":'',
                "bidleaveid":''}
                this.all_vacation_slots_list.push(temp)
                this.updatedData.push(temp)
            }
            this.allScheduleListData.setValue(this.all_vacation_slots_list)
          }
        }else{
          var tempObj=JSON.parse(localStorage.getItem('editBidSchedule'))
          if(tempObj!=null && tempObj.leavemap.length>0){

                for(var i=0;i<tempObj.leavemap.length;i++){
                this.allScheduleListData.push(this.newWorkLoadData());
                temp={"id":i,"startDate":this.dateConvert(tempObj.leavemap[i].leavestartdate),"endDate":this.dateConvert(tempObj.leavemap[i].leaveenddate),'SBP_slots':tempObj.leavemap[i].leaveslots,  "bidschref":tempObj.leavemap[i].bidschref,
                "bidleaveid":tempObj.leavemap[i].bidleaveid}
                this.all_vacation_slots_list.push(temp)
                  this.updatedData.push(temp)
                }
                  this.allScheduleListData.setValue(this.all_vacation_slots_list)
          }else{
          for(var i=0;i<1;i++){
              this.allScheduleListData.push(this.newWorkLoadData());
              temp={"id":i,"startDate":null,"endDate":null,'SBP_slots':'',  "bidschref":'',
              "bidleaveid":''}
              this.all_vacation_slots_list.push(temp)
              this.updatedData.push(temp)
          }
          this.allScheduleListData.setValue(this.all_vacation_slots_list)
        }
        }
        this.totalSlots()
  }
  dateConvert(date){

    var result = date.includes("T");
    if(result==false){
        var temp=date.split("-")
        var newDate= new Date(temp[0],Number(temp[1])+ - +1,Number(temp[2]),0,0,0)
        return newDate
    }else{
      var temp=date.split("T")
      temp=temp[0].split("-")

        var newDate= new Date(temp[0],Number(temp[1])+ - +1,Number(temp[2]),0,0,0)
        return newDate
    }
  }
  addNew(){
    var temp
    this.countOfDateRange++
var id= this.all_vacation_slots_list.length
var tempArr=[]

if(this.old_list.length>0){
  tempArr=this.all_vacation_slots_list
  this.all_vacation_slots_list=[]
  this.all_vacation_slots_list=this.old_list
}


      this.allScheduleListData.push(this.newWorkLoadData());
      temp={"id":this.countOfDateRange,"startDate":null,"endDate":null,'SBP_slots':'', "bidschref":'',
      "bidleaveid":''}

      this.all_vacation_slots_list.push(temp)
      this.updatedData.push(temp)
  }
  remove(id){
    var tempArr=[]

   this.allScheduleListData.removeAt(id)
  }
  setAll(e){

  }
  totalSlots(){
    this.updatedValue=true
    this.totalHours=0

    for(var i=0;i<this.scheduleListForm.value.allScheduleListData.length;i++){
      if(this.scheduleListForm.value.allScheduleListData[i].startDate!=null && this.scheduleListForm.value.allScheduleListData[i].endDate!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=null && this.scheduleListForm.value.allScheduleListData[i].SBP_slots>0 && this.scheduleListForm.value.allScheduleListData[i].SBP_slots!=''){
        var date1 = new Date(this.scheduleListForm.value.allScheduleListData[i].startDate);
        var date2 = new Date(this.scheduleListForm.value.allScheduleListData[i].endDate);


        date2.setDate(date2.getDate() + 1);
        var Difference_In_Time = date2.getTime() - date1.getTime();

        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

        this.totalHours=this.totalHours+ + + (Difference_In_Days*this.scheduleListForm.value.allScheduleListData[i].SBP_slots*8)
      }
    }

    if(Number.isInteger(this.totalHours)){
      this.totalHours=this.totalHours
    }else{

      this.totalHours=Math.ceil(this.totalHours)
    }
    this.remainingAccuredHours=this.totalAccuredHours+ - +this.totalHours

    if(this.remainingAccuredHours<0){
      this.remainingAccuredHours=0
    }


  }
  async addNewBidRound(){

  //   const modal = await this.modalCtrl.create({
  //     component: SelectBidRoundsComponent,
  //     cssClass: 'bidRounds',
  //     componentProps:{editBidSchedule:false,totalCreatedVacationHours:this.totalHours,totalRequiredVacationHours:this.totalAccuredHours},
  //     swipeToClose:true
  //   });
  //   modal.onDidDismiss()
  //   .then((data) => {
  //     this.ngOnInit()
  // });
}
}















