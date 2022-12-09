import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimePickerPage } from './time-picker.page';

const routes: Routes = [
  {
    path: '',
    component: TimePickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimePickerPageRoutingModule {}
