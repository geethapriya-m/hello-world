import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import straightlines_io_apis from 'src/app/json/apis.json';
import { GeneratedScheduleService } from 'src/app/services/schedule/generated-schedule.service';
import { HeaderTitleService } from '../nav-bar-footer/header-title.service';
@Component({
  selector: 'app-s-t-lines-dashboard',
  templateUrl: './s-t-lines-dashboard.component.html',
  styleUrls: ['./s-t-lines-dashboard.component.scss'],
})
export class STLinesDashboardComponent implements OnInit {
id=0
all_schedule=[]
// allShiftData=[]
  user_data: any;
  all_Schedule=[];
  constructor(public navCtrl: NavController,
    private scheduleService:GeneratedScheduleService,
    public alertController: AlertController,
    private headerTitleService: HeaderTitleService,) { }

  ngOnInit() {
    this.headerTitleService.setTitle('Welcome!');
    this.headerTitleService.setBackUrl(null);
    this.headerTitleService.setDefaultHeader(true)
this.headerTitleService.setForwardUrl(null);
this.headerTitleService.checkBiddingTime('');this.headerTitleService.checkBiddingEndDate('');
this.user_data=JSON.parse(sessionStorage.getItem('userData'))
this.getSchedule()
  }
  getSchedule(){
    var tempObj={}
    var tempArr=[]
    var all_shift_data=[]

    this.scheduleService.newgetAllSchedule(this.user_data.id).subscribe((res)=>{

      this.all_schedule=res
      return this.all_schedule

    },(error)=>{
      console.log(error)
    },()=>{
    })
  }
   onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  start(){

    if(this.user_data.role=='bidmanager'){
      if(this.all_schedule.length>0){
        this.navCtrl.navigateForward([straightlines_io_apis.apis.manage_shift_line_schedule])
      }else{
        this.navCtrl.navigateForward([straightlines_io_apis.apis.enter_Work_load_api])
      }
    }else{

      if(this.all_schedule.length>0){
        this.navCtrl.navigateForward([straightlines_io_apis.apis.guest_manage_shift_line_schedule])
      }else{
        this.navCtrl.navigateForward([straightlines_io_apis.apis.guest_enter_Work_load])
      }
    }

  }
  async bidding(){

    if(this.user_data.role=='bidmanager'){
      this.navCtrl.navigateForward([straightlines_io_apis.apis.my_bidding])
    }else{

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: "Sorry, you don't have access to bidding feature! Please upgrade your plan.",
        buttons: ['OK']
      });

      await alert.present();

    }
  }
  async reports(){
    if(this.user_data.role=='bidmanager'){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Coming soon...',
        message: "This feature is coming soon!!!",
        buttons: ['OK']
      });

      await alert.present();

    }else{

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: "Sorry, you don't have access to reports feature! Please upgrade your plan.",
        buttons: ['OK']
      });

      await alert.present();

    }

  }
}
