import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCursosProfesorPageRoutingModule } from './mis-cursos-profesor-routing.module';

import { MisCursosProfesorPage } from './mis-cursos-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisCursosProfesorPageRoutingModule
  ],
  declarations: [MisCursosProfesorPage]
})
export class MisCursosProfesorPageModule {}
