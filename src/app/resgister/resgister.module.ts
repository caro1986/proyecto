import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResgisterPageRoutingModule } from './resgister-routing.module';

import { ResgisterPage } from './resgister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResgisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResgisterPage]
})
export class ResgisterPageModule {}
