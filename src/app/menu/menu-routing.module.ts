import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { HomePageModule } from '../home/home.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path:"home",
        loadChildren: () =>
        import("../home/home.module").then(m => m.HomePageModule)
      },

      {
        path: "home",
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
