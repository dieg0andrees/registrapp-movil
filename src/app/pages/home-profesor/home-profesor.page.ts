import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { NombreusuarioService } from 'src/app/service/nombreusuario.service';
import { ApiTiempoService } from 'src/app/service/api-tiempo.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {
  usuario: string = '';
  temperature: number | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private navCtrl: NavController,
    private nombreUsuario: NombreusuarioService,
    private apiTiempoService: ApiTiempoService
  ) {}

  ngOnInit(): void {
    this.usuario = this.nombreUsuario.getNombre();
    this.loadTemperature();
  }

  private loadTemperature(): void {
    this.apiTiempoService.getWeather(-33.5985053, -70.5813781).subscribe(
      (data) => {
        this.temperature = data.current_weather?.temperature || null;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'No se pudo cargar la temperatura.';
        this.isLoading = false;
      }
    );
  }

  get temperatureClass(): string {
    if (this.temperature === null) return '';
    if (this.temperature >= 30) return 'hot';
    if (this.temperature <= 15) return 'cold';
    return '';
  }

  listar_cursos(): void {
    this.navCtrl.navigateForward('/mis-cursos-profesor');
  }

  qr(): void {
    this.navCtrl.navigateForward('/generar-qr');
  }

  reporteria(): void {
    this.navCtrl.navigateForward('/reporteria');
  }

  cerrar_sesion(): void {
    this.navCtrl.navigateForward('/login');
  }
}
