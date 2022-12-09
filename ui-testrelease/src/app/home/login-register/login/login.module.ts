import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatIconModule,
    LoginPageRoutingModule,
    IonicModule.forRoot( { scrollAssist: true, scrollPadding: false } ),
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
