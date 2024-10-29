import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoQrPage } from './estado-qr.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoQrPageRoutingModule {}
