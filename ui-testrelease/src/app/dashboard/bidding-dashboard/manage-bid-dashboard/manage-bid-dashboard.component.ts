import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HeaderTitleService } from '../../nav-bar-footer/header-title.service';
import straightlines_io_apis from 'src/app/json/apis.json';
@Component({
  selector: 'app-manage-bid-dashboard',
  templateUrl: './manage-bid-dashboard.component.html',
  styleUrls: ['./manage-bid-dashboard.component.scss'],
})
export class ManageBidDashboardComponent implements OnInit {

  all_shift_lines=[
    {"shift_line_name":"SS-1","shift_line":"X3176MX","emp":"MK"},
    {"shift_line_name":"SS-2","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-3","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-4","shift_line":"X3176MX","emp":"RA"},
    {"shift_line_name":"SS-5","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-6","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-7","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-8","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-9","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-10","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-11","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-12","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-13","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-14","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-15","shift_line":"X3176MX","emp":""},
    {"shift_line_name":"SS-16","shift_line":"X3176MX","emp":""},

  ]
  constructor(public navCtrl: NavController,private headerTitleService: HeaderTitleService,) { }

  ngOnInit() {
    this.headerTitleService.setTitle('');
    this.headerTitleService.setDefaultHeader(true)
    this.headerTitleService.setBackUrl(null);
this.headerTitleService.setForwardUrl(null);
  }
  generateSceduleByStraightline(){
    this.navCtrl.navigateForward([straightlines_io_apis.apis.enter_Work_load_api])
  }
  manageBidSchedule(){

    this.navCtrl.navigateForward([straightlines_io_apis.apis.manage_bid_schedule])
  }
  myBidding(){

    localStorage.setItem('all_shift_line',JSON.stringify(this.all_shift_lines))
    this.navCtrl.navigateForward([straightlines_io_apis.apis.my_bidding])
  }
}
