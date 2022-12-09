import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewShiftDefinitionPage } from './add-new-shift-definition.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewShiftDefinitionPage
  },
  {
    path: 'shift-category-start-time',
    loadChildren: () => import('./shift-category-start-time/shift-category-start-time.module').then( m => m.ShiftCategoryStartTimePageModule)
  },
  {
    path: 'shift-category-info',
    loadChildren: () => import('./shift-category-info/shift-category-info.module').then( m => m.ShiftCategoryInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewShiftDefinitionPageRoutingModule {}
