import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisCursosProfesorPage } from './mis-cursos-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: MisCursosProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisCursosProfesorPageRoutingModule {}
