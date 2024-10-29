import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoQrPageRoutingModule } from './estado-qr-routing.module';

import { EstadoQrPage } from './estado-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoQrPageRoutingModule
  ],
  declarations: [EstadoQrPage]
})
export class EstadoQrPageModule {}
