import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearProfePageRoutingModule } from './crear-profe-routing.module';

import { CrearProfePage } from './crear-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearProfePageRoutingModule
  ],
  declarations: [CrearProfePage]
})
export class CrearProfePageModule {}
