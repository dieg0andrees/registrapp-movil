// reporteria.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CrudAsignaturaService, Asignatura } from 'src/app/service/crud-asignatura.service';
import { NombreusuarioService } from 'src/app/service/nombreusuario.service'; // Importa el servicio del usuario

@Component({
  selector: 'app-reporteria',
  templateUrl: './reporteria.page.html',
  styleUrls: ['./reporteria.page.scss'],
})
export class ReporteriaPage implements OnInit {
  asignaturas: Asignatura[] = [];

  constructor(
    private navCtrl: NavController,
    private crudAsignaturaService: CrudAsignaturaService,
    private nombreusuarioService: NombreusuarioService // Inyecta el servicio del usuario
  ) {}

  ngOnInit() {
    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    const usuarioId = this.nombreusuarioService.getIdUsuario(); // Obtén el ID del usuario logueado
    this.crudAsignaturaService.listarAsignaturas().subscribe((data) => {
      this.asignaturas = data.filter(asignatura => asignatura.profesorId === usuarioId);
    });
  }

  irAReporte(asignaturaId: any) {
    this.navCtrl.navigateForward(`/reporteria-ri/${asignaturaId}`);
  }
  volver(){
    this.navCtrl.navigateForward('/home-profesor');
  }
}
