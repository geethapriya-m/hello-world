import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { AddNewEmployeeService } from 'src/app/services/manage-bid-schedule/add-new-employee/add-new-employee.service';
import { BidScheduleService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-schedule.service';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import Swal from 'sweetalert2';
import straightlines_io_apis from 'src/app/json/apis.json';
import { BidLeaveSetupService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-leave-setup.service';
import { SetupBidRoundService } from 'src/app/services/manage-bid-schedule/bid-schedule/setup-bid-round.service';
import { AddNewEmployeeComponent } from 'src/app/dashboard/add-new-employee/add-new-employee.component';
import { CreateNewBidScheduleService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/create-new-bid-schedule.service';
@Component({
  selector: 'app-selected-employee-summary',
  templateUrl: './selected-employee-summary.component.html',
  styleUrls: ['./selected-employee-summary.component.scss'],
})
export class SelectedEmployeeSummaryComponent implements OnInit {
  user_data: any;
  allEmployee=[]
  view_bid_schedule_id: any;
  newBidSchedule
  editBidSchedule=false
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private getAllEmp:AddNewEmployeeService,
    public alertController:AlertController,
    private scheduleService:GeneratedScheduleService,
    private setUPbidRoundSer:SetupBidRoundService,
    private bidScheduleSer:CreateNewBidScheduleService
    ) {
    this.view_bid_schedule_id=navParams.get('view_bid_schedule_id')
    this.editBidSchedule=navParams.get('editBidSchedule');

  }

  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    if(this.view_bid_schedule_id==undefined){
    var tempObj=JSON.parse(localStorage.getItem('newBidSchedule'))
    this.allEmployee=[]
    for(var i=0;i<tempObj.employeemap.length;i++){
      this.getAllEmployeeList(tempObj.employeemap[i])
    }
  }else{
          if(this.editBidSchedule==true){
            var tempObj=JSON.parse(localStorage.getItem('editBidSchedule'))
            this.allEmployee=[]
            for(var i=0;i<tempObj.employeemap.length;i++){
              this.getAllEmployeeList(tempObj.employeemap[i].empidref)
            }
          }
        else{
          this.viewBidScheduleData()
        }
      }
  }
  viewBidScheduleData(){
    this.bidScheduleSer.getBidScheduleBasedOnBidScheduleIDgetAllBidScheduleData(this.view_bid_schedule_id).subscribe((res)=>{
      this.newBidSchedule=res
      var temp
      for(var i=0;i<this.newBidSchedule.employeemap.length;i++){
        this.getAllEmployeeList(this.newBidSchedule.employeemap[i].empidref)
      }
    },(err)=>{},()=>{})
  }
  getAllEmployeeList(empId){
    this.getAllEmp.getEmpDataBasedOnEmpId(empId).subscribe(
      (res)=>{
        this.allEmployee.push(res)
        this.allEmployee=this.allEmployee.sort((a, b) => a.rank - b.rank)

    },
      (err)=>{console.log(err)},()=>{})
  }
  close(){
    this.modalCtrl.dismiss()
  }
  cssForTotalEmployee(totalSelectdEmployees){
    if(totalSelectdEmployees<10){
      return 'round-button-single-digit data'
    }else if(totalSelectdEmployees>9 && totalSelectdEmployees<100){
      return 'round-button-double-digit data'
    }else{
      return 'round-button-three-digit data'
    }

  }
}
