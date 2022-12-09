import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { HeaderTitleService } from '../../header-title.service';
import straightlines_io_apis from 'src/app/json/apis.json';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { BidRoundsService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/bid-rounds/bid-rounds.service';
import { CreateNewBidScheduleService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/create-new-bid-schedule.service';
import { BidWindowService } from 'src/app/services/manage-bid-schedule/create-new-bid-schedule/bid-window.service';
@Component({
  selector: 'app-blank-header',
  templateUrl: './blank-header.component.html',
  styleUrls: ['./blank-header.component.scss'],
})
export class BlankHeaderComponent implements OnInit {
title
goBackUrl
hideGoBack
hideForward
forwardUrl
defaultHeader
minutes;
defaultTimer
  seconds: any;
  distance: number;
  interval
  round_id
  user_data
  bid_schedule_id: any;
  empId
  hours
  empName
  bidShculeTimeZone='US/Eastern'
  constructor( public navCtrl: NavController,
    private route: ActivatedRoute,
    public navParams: NavParams,
    private newBidScheduleSer:CreateNewBidScheduleService,
    private bidWindowSer:BidWindowService,
    private bidScheduleSer:CreateNewBidScheduleService,
    public alertController: AlertController,
    public bidRoundSer:BidRoundsService,
    private headerTitleService: HeaderTitleService,) {

    }

  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))

    this.route.params.subscribe(params => {
      this.bid_schedule_id = params['_bidid'];
      this.round_id = params['_roundId'];

  });
    this.headerTitleService.title.subscribe(title => {
      this.title = title;
    });

    this.headerTitleService.goBackUrl.subscribe(goBackUrl => {
      this.goBackUrl = goBackUrl;

      this.checkGoBackUrl(this.goBackUrl )
    });
    this.headerTitleService.defaultTimer.subscribe(defaultTimer => {
      this.defaultTimer = defaultTimer;
      if(this.defaultTimer=="biddingheader"){
        this.route.queryParams.subscribe(params=>{
          this.bid_schedule_id=params.bidId
          this.round_id=params.round,
          this.empName=params.i,
          this.empId=params.eid
        })
        if(this.user_data.empid!=undefined){
          this.empId=this.user_data.empid
          this.empName= this.user_data.initials
        }
        // if(this.user_data.empid!==undefined){
          if(this.empId!=NaN && this.empId!=undefined && this.empId!=null){
            this.empId=Number(this.empId)
            this.getBidRoundData()
          }

        // }

    }else{
      clearInterval(this.interval);
      this.defaultTimer=''
      this.distance=0
    }
      // this.checkGoBackUrl(this.goBackUrl )
    });
    this.headerTitleService.forwardUrl.subscribe(forwardUrl => {
      this.forwardUrl = forwardUrl;
      this.checkForward(this.forwardUrl)
    });

    this.headerTitleService.defaultHeader.subscribe(dh=>{
      this.defaultHeader=dh

    })

    // this.timer()
  }
  checkForward(fUrl){
    this.forwardUrl=fUrl
    if(this.forwardUrl!=null){
      if(this.forwardUrl==straightlines_io_apis.apis.generated_schedule_api || this.forwardUrl==straightlines_io_apis.apis.generated_schedule){
        if(JSON.parse(localStorage.getItem('customizedScheduleShiftLine'))==null){
          this.hideForward=true
        }else{
          this.hideForward=false
        }
      }
    }else{
      this.hideForward=true
    }
  }

  checkGoBackUrl(goBackUrl ){

    this.goBackUrl=goBackUrl

    if(this.goBackUrl!=null){

      this.hideGoBack=false

    }else {
      this.hideGoBack=true

    }

  }
  goBack(){
    // localStorage.clear()

    this.navCtrl.navigateBack(this.goBackUrl)
    // this.route.navigateByUrl('home')
  }
  forwardOldGeneratedShiftLines(){
    this.navCtrl.navigateForward(this.forwardUrl)
  }

  timer(){
    this.interval=setInterval( async ()=> {
      var countDownDate = new Date("Dec 02, 2021 10:15:00").getTime();
      var today,date,invdate,diff
      date = new Date();
      invdate = new Date(date.toLocaleString('en-US', {
        timeZone: this.bidShculeTimeZone
      }));
       diff = date.getTime() - invdate.getTime();
       today=new Date(date.getTime() - diff)
      var now = today.getTime();
      this.distance = countDownDate - now;

        if(this.distance<0){
          this.minutes='00'
          this.seconds='00'
          clearInterval(this.interval);
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            message: 'Bid window time has ended.',
            buttons: ['OK']
          });

          await alert.present();
          if(this.user_data.empid==undefined){
            this.navCtrl.navigateBack(straightlines_io_apis.apis.my_bidding)
          }else{
            this.navCtrl.navigateBack(straightlines_io_apis.apis.employee_home)
          }
        }
      var minutes =Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      if(minutes<10){
        this.minutes='0'+String(minutes)
      }else{
        this.minutes=minutes
      }
     var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
        if(seconds<10){
          this.seconds='0'+String(seconds)
        }else{
          this.seconds=seconds
        }
      }, 1000);


  }
  currentactiveRoundNumber
  currentSelectedRound
  roundStartDate
  roundStartTime
  roundDuration
  roundStatus

  all_SBP_rounds_length
  allBidRoundData=[]
  all_SBP_rounds=[]
  all_Bid_schedule_list=[]
  bidSchedule
  dailyEndTIme=undefined
  getBidRoundData(){
      this.newBidScheduleSer.getAllBidScheduleData(this.user_data.id).subscribe((res)=>{
        this.all_Bid_schedule_list=[]
        this.all_Bid_schedule_list=res
        for(var i=0;i<this.all_Bid_schedule_list.length;i++){
          if(Number(this.all_Bid_schedule_list[i].bidschid)==Number(this.bid_schedule_id)){
            this.bidSchedule=this.all_Bid_schedule_list[i]
            this.bidShculeTimeZone=this.bidSchedule.timezone

            this.dailyEndTIme=this.bidSchedule.roundmap[0].roundendttime
          }
        }

          this.bidWindowSer.getBidWindowDataBasedOnempId(this.empId).subscribe((res)=>{
            var temp=res
            var tempObj
            this.allBidRoundData=[]
            for(var i=0;i<temp.length;i++){
              if(temp[i].bidschidref===Number(this.bid_schedule_id)){
                this.allBidRoundData.push(temp[i])
              }
            }
            this.all_SBP_rounds=this.allBidRoundData
            this.all_SBP_rounds_length=this.all_SBP_rounds.length
            if(this.all_SBP_rounds.length>0){

              this.getRoundData(this.all_SBP_rounds[Number(this.round_id)],Number(this.round_id))
            }
          },(err)=>{console.log(err)},()=>{})
        },(err)=>{console.log(err)},()=>{})
  }
  getRoundData(all_SBP_rounds,j){
    this.currentactiveRoundNumber=j
    this.currentSelectedRound=all_SBP_rounds
    var defStartDate=this.currentSelectedRound.empbid_start_time.split(" ")
    var defendDate=this.currentSelectedRound.empbid_end_time.split(" ")
    var start =defStartDate[0].split("-");
    var start_Date = new Date(start[0],Number(start[1])+ - +1, start[2],0 ,0, 0);
    this.roundStartTime= defStartDate[1]
    this.roundStartDate=start_Date
    this.roundDuration=this.currentSelectedRound.empbidduration.split(":")
    this.roundDuration=this.roundDuration[1]
    var roundStartTime= this.roundStartTime.split(":")
    var start =defStartDate[0].split("-");
    var roundstartDate = new Date(start[0],Number(start[1])+ - +1, Number(start[2]),Number( roundStartTime[0]) ,Number( roundStartTime[1]),0);
    var end =defendDate[0].split("-");
    var endTIme=defendDate[1].split(":")
    var roundendDate = new Date(end[0],Number(end[1])+ - +1, Number(end[2]),Number(endTIme[0]) ,Number(endTIme[1]),0);
    var today,date,invdate,diff
    date = new Date();
    invdate = new Date(date.toLocaleString('en-US', {
      timeZone: this.bidShculeTimeZone
    }));
     diff = date.getTime() - invdate.getTime();
     today=new Date(date.getTime() - diff)
    if(today<roundstartDate){
      this.roundStatus="Closed"
      clearInterval(this.interval);
      this.distance=1
      this.minutes=this.roundDuration
      this.seconds='00'
    }else{
      if(today<roundendDate){

        this.roundStatus="Open"
        clearInterval(this.interval);
        this.time(roundendDate)
      }else{
        this.distance=0
        this.roundStatus="Closed"
      }
    }

    //timer

  }
time(roundendDate){
var i = 0;
this.interval=setInterval( async ()=> {
  var countDownDate

  if(new Date().getDate()!=roundendDate.getDate() ){
    countDownDate=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),Number(this.dailyEndTIme.split(':')[0]),Number(this.dailyEndTIme.split(':')[1]),0).getTime()
  }else{
    countDownDate = roundendDate.getTime();
  }

var today,date,invdate,diff
date = new Date();
invdate = new Date(date.toLocaleString('en-US', {
  timeZone: this.bidShculeTimeZone
}));
 diff = date.getTime() - invdate.getTime();
 today=new Date(date.getTime() - diff)
var now = today.getTime();
this.distance = countDownDate - now;
  if(this.distance<0){
    this.minutes='00'
    this.seconds='00'
    this.hours='00'
    clearInterval(this.interval);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Bid window time has ended.',
      buttons: ['OK']
    });

    await alert.present();
    if(this.user_data.empid==undefined){
      this.navCtrl.navigateBack(straightlines_io_apis.apis.my_bidding)
    }else{
      this.navCtrl.navigateBack(straightlines_io_apis.apis.employee_home)
    }

    this.roundStatus="Closed"
  }
var minutes =Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
if(minutes<10){
  this.minutes='0'+String(minutes)
}else{
  this.minutes=minutes
}
    var hours=Math.floor(this.distance / 1000 / 60 / 60);
    if(hours<10){
      this.hours='0'+hours
    }else{
      this.hours=hours
    }
var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
  if(seconds<10){
    this.seconds='0'+String(seconds)
  }else{
    this.seconds=seconds
  }
}, 1000);
}


  convertNumber(m){
    return Number(m)
  }

}



