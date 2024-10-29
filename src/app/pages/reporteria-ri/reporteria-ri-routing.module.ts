import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteriaRiPage } from './reporteria-ri.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteriaRiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteriaRiPageRoutingModule {}
