import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResgisterPage } from './resgister.page';

const routes: Routes = [
  {
    path: '',
    component: ResgisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResgisterPageRoutingModule {}
