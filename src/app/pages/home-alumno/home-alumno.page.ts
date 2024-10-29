import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { NombreusuarioService } from 'src/app/service/nombreusuario.service';
import { ApiTiempoService } from 'src/app/service/api-tiempo.service';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {
  usuario : string = ''
  temperature: number | null = null;
  constructor(private navCtrl:NavController, private nombreUsuario:NombreusuarioService, private apiTiempoService: ApiTiempoService) { }

  ngOnInit(): void{
    this.usuario = this.nombreUsuario.getNombre();
    this.apiTiempoService.getWeather(-33.5985053, -70.5813781).subscribe(data => {
      this.temperature = data.current_weather.temperature;
    });
  }

  get temperatureClass(): string {
    if (this.temperature === null) return '';
    if (this.temperature >= 30) return 'hot';
    if (this.temperature <= 15) return 'cold';
    return '';
  }
 
  mis_cursos(){
    this.navCtrl.navigateForward('/mis-cursos')
  }
  leer_qr(){
    this.navCtrl.navigateForward('/leer-qr')
  }
  cerrar_sesion(){
    this.navCtrl.navigateForward('/login')
  }
}
