import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteriaRiPageRoutingModule } from './reporteria-ri-routing.module';

import { ReporteriaRiPage } from './reporteria-ri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteriaRiPageRoutingModule
  ],
  declarations: [ReporteriaRiPage]
})
export class ReporteriaRiPageModule {}
