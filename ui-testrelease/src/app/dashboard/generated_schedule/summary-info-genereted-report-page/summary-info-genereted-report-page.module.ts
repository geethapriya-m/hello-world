import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryInfoGeneretedReportPagePageRoutingModule } from './summary-info-genereted-report-page-routing.module';

import { SummaryInfoGeneretedReportPagePage } from './summary-info-genereted-report-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryInfoGeneretedReportPagePageRoutingModule
  ],
  declarations: [SummaryInfoGeneretedReportPagePage]
})
export class SummaryInfoGeneretedReportPagePageModule {}
