import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequiredVsGeneratedWorkforcePage } from './required-vs-generated-workforce.page';

const routes: Routes = [
  {
    path: '',
    component: RequiredVsGeneratedWorkforcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequiredVsGeneratedWorkforcePageRoutingModule {}
