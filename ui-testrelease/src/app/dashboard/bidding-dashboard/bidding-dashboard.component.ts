import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HeaderTitleService } from '../nav-bar-footer/header-title.service';
import straightlines_io_apis from 'src/app/json/apis.json';
@Component({
  selector: 'app-bidding-dashboard',
  templateUrl: './bidding-dashboard.component.html',
  styleUrls: ['./bidding-dashboard.component.scss'],
})
export class BiddingDashboardComponent implements OnInit {

  constructor(public navCtrl: NavController,private headerTitleService: HeaderTitleService,) {
    this.headerTitleService.setTitle('');
  }

  ngOnInit() {
    this.headerTitleService.setTitle('');
    this.headerTitleService.setDefaultHeader(true)
    this.headerTitleService.setBackUrl(null);
this.headerTitleService.setForwardUrl(null);

  }
  generateSceduleByStraightline(){
    this.navCtrl.navigateForward([straightlines_io_apis.apis.my_bidding])
  }
  manageBidSchedule(){
    this.navCtrl.navigateForward([straightlines_io_apis.apis.manage_bid_schedule])
  }
}
