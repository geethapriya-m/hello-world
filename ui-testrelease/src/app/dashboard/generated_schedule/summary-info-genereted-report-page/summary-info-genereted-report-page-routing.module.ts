import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryInfoGeneretedReportPagePage } from './summary-info-genereted-report-page.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryInfoGeneretedReportPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryInfoGeneretedReportPagePageRoutingModule {}
