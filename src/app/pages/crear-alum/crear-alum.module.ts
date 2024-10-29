import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAlumPageRoutingModule } from './crear-alum-routing.module';

import { CrearAlumPage } from './crear-alum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAlumPageRoutingModule
  ],
  declarations: [CrearAlumPage]
})
export class CrearAlumPageModule {}
