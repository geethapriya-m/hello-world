import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequiredVsGeneratedWorkforcePageRoutingModule } from './required-vs-generated-workforce-routing.module';
import { ChartsModule } from 'ng2-charts';
import { RequiredVsGeneratedWorkforcePage } from './required-vs-generated-workforce.page';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    MatDividerModule,
    RequiredVsGeneratedWorkforcePageRoutingModule
  ],
  declarations: [RequiredVsGeneratedWorkforcePage]
})
export class RequiredVsGeneratedWorkforcePageModule {}
