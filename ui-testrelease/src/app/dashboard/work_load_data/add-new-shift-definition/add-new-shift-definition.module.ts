import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewShiftDefinitionPageRoutingModule } from './add-new-shift-definition-routing.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AddNewShiftDefinitionPage } from './add-new-shift-definition.page';
import { TimePickerPage } from './time-picker/time-picker.page';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { TimePickerPageModule } from './time-picker/time-picker.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDividerModule,
    NgxMaterialTimepickerModule,
    AddNewShiftDefinitionPageRoutingModule,
    TimePickerPageModule,

  ],
  declarations: [AddNewShiftDefinitionPage]
})
export class AddNewShiftDefinitionPageModule {}
