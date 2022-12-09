import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import straightlines_io_apis from 'src/app/json/apis.json';
@Component({
  selector: 'app-add-new-shift-definition',
  templateUrl: './add-new-shift-definition.page.html',
  styleUrls: ['./add-new-shift-definition.page.scss'],
})
export class AddNewShiftDefinitionPage implements OnInit {

  someDate: Date = new Date;

  constructor(public navCtrl: NavController) {
    this.someDate.setHours(2);
    this.someDate.setMinutes(30);
  }

  change() {
    alert(this.someDate);
  }
  ngOnInit() {
  }
  goBack(){
    this.navCtrl.navigateBack(straightlines_io_apis.apis.enter_Work_load_api)
  }

}
