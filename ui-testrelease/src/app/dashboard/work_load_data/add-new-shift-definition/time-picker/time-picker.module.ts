import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimePickerPageRoutingModule } from './time-picker-routing.module';

import { TimePickerPage } from './time-picker.page';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatDividerModule,
    TimePickerPageRoutingModule
  ],
  declarations: [TimePickerPage],
  exports: [TimePickerPage],
})
export class TimePickerPageModule {}
