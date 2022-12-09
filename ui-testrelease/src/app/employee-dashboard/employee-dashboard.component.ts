import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import straightlines_io_apis from 'src/app/json/apis.json';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(public navCtrl: NavController,) { }

  ngOnInit() {}
  next(){
    this.navCtrl.navigateForward([straightlines_io_apis.apis.employee_view_seniority_list])
  }
}
