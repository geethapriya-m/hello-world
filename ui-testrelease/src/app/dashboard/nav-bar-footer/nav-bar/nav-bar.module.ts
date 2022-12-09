import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';
import { NavBarPageRoutingModule } from './nav-bar-routing.module';

import { NavBarPage } from './nav-bar.page';
import { BlankHeaderForModalPageComponent } from './blank-header-for-modal-page/blank-header-for-modal-page.component';
import { BlankHeaderComponent } from './blank-header/blank-header.component';

@NgModule({
  imports: [
    IonicModule,

    CommonModule
  ],
  exports:[BlankHeaderForModalPageComponent,BlankHeaderComponent],
  declarations: [BlankHeaderForModalPageComponent,BlankHeaderComponent]
})
export class NavBarPageModule {}
