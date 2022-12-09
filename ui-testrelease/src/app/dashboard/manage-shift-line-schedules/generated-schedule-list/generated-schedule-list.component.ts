import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../nav-bar-footer/header-title.service';
import straightlines_io_apis from 'src/app/json/apis.json';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import Swal from 'sweetalert2';
import workloadData from 'src/app/json/work-load-data.json';
import { WorkLoadService } from 'src/app/services/work-load.service';
import { BidScheduleService } from 'src/app/services/manage-bid-schedule/bid-schedule/bid-schedule.service';
import { SelectOptionForShiftlineEditDeleteComponent } from './select-option-for-shiftline-edit-delete/select-option-for-shiftline-edit-delete.component';
@Component({
  selector: 'app-generated-schedule-list',
  templateUrl: './generated-schedule-list.component.html',
  styleUrls: ['./generated-schedule-list.component.scss'],
})
export class GeneratedScheduleListComponent implements OnInit {
all_schedule=[]
allShiftData=[]
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
  allScheduleName: any[];
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    private scheduleService:GeneratedScheduleService,
    private headerTitleService: HeaderTitleService,
    private bidSer:BidScheduleService,
    public modalCtrl: ModalController,
    public shiftDefSer:WorkLoadService
  ) { }

  ngOnInit() {
    this.headerTitleService.setTitle('Manage Shiftline Schedules');
    this.headerTitleService.setDefaultHeader(true)
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    // this.headerTitleService.setBackUrl(straightlines_io_apis.apis.dashboard);
    // this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.enter_Work_load_api);
    if(this.user_data.role=='bidmanager'){
      this.headerTitleService.setBackUrl(straightlines_io_apis.apis.dashboard);
      this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.enter_Work_load_api);
    }else{
      this.headerTitleService.setBackUrl(straightlines_io_apis.apis.guest_dashboard);
    this.headerTitleService.setForwardUrl(straightlines_io_apis.apis.guest_enter_Work_load);
    }
    this.headerTitleService.checkBiddingTime('');this.headerTitleService.checkBiddingEndDate('');
    this.allShiftData=  JSON.parse(localStorage.getItem('allShiftRequiredData'))
  this.getSchedule()
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
   onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  addNewSchedule(){
    if(this.user_data.role=='bidmanager'){
    this.navCtrl.navigateForward([straightlines_io_apis.apis.enter_Work_load_api])
    }else{
    this.navCtrl.navigateForward([straightlines_io_apis.apis.guest_enter_Work_load])
    }
  }
  async presentActionSheetForEditDelete(aS) {
    localStorage.removeItem('editCustomizedScheduleShiftLine')
    localStorage.removeItem('editDefaultScheduleShiftLine')
    localStorage.removeItem('allShiftRequiredDataForEditSchedule')
    localStorage.removeItem('focusShiftLine')

    const modal = await this.modalCtrl.create({
      component: SelectOptionForShiftlineEditDeleteComponent,
      cssClass: 'action-sheet-for-shiftline-schedule',
      componentProps: { shiftlineSchedule_data:aS},
      swipeToClose:true
    });
    modal.onDidDismiss()
    .then((data) => {
      if(data.data==='delete'){
        this.ngOnInit()
      }
    });

    return await modal.present();
  }


  PopUpId
  checkClickForPopup=false
  oldPopUpId
  myFunction(i) {
    this.PopUpId=i
    this.checkClickForPopup=true
    var popupOne = document.getElementById("myPopup"+this.PopUpId);
    popupOne.style.visibility='visible'
    if(this.oldPopUpId==this.PopUpId){
        if(this.oldPopUpId!=undefined ){
          var popup = document.getElementById("myPopup"+this.oldPopUpId);
          popup.style.visibility='hidden'
        }
        this.oldPopUpId=undefined
    }else{
      if(this.oldPopUpId!=undefined  && this.PopUpId!=this.oldPopUpId){
        var oldPopup = document.getElementById("myPopup"+this.oldPopUpId);
        oldPopup.style.visibility='hidden'
      }
      this.oldPopUpId=this.PopUpId
    }
  }
  disablePopup(){

    if(this.checkClickForPopup==false){
      if(this.oldPopUpId!=undefined){
        var popupTwo = document.getElementById("myPopup"+this.oldPopUpId);
        popupTwo.style.visibility='hidden'
      }
    }
     this.checkClickForPopup=false
  }

}





















