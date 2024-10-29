import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAlumPage } from './crear-alum.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAlumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAlumPageRoutingModule {}
