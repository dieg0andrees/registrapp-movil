// mis-cursos-profesor.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudAlumnoService } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService } from 'src/app/service/crud-asignatura.service';
import { NombreusuarioService } from 'src/app/service/nombreusuario.service';

@Component({
  selector: 'app-mis-cursos-profesor',
  templateUrl: './mis-cursos-profesor.page.html',
  styleUrls: ['./mis-cursos-profesor.page.scss'],
})
export class MisCursosProfesorPage implements OnInit {
  idUsuario: string = '';
  asignaturas: any[] = [];

  constructor(
    private navCtrl: NavController,
    private crudAlumno: CrudAlumnoService,
    private crudAsignatura: CrudAsignaturaService,
    private nombreUsuario: NombreusuarioService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.idUsuario = this.nombreUsuario.getIdUsuario();
    this.cargarAsignaturasProfesor();
  }

  cargarAsignaturasProfesor() {
    this.firestore.collection('asignaturas', ref => ref.where('profesorId', '==', this.idUsuario))
      .get().subscribe((snapshot) => {
        this.asignaturas = []; // Limpiar antes de cargar nuevas asignaturas
        snapshot.forEach(doc => {
          const data = doc.data();
          this.asignaturas.push(data);
        });
      });
  }

  generarQr(asignaturaId: string) {
    this.navCtrl.navigateForward(`/scan-qr/${asignaturaId}`);
  }

  volver() {
    this.navCtrl.navigateForward('/home-profesor');
  }

  ver_asignaturas(asignaturaId: string) {
    this.navCtrl.navigateForward(`/ver-asistencia/${asignaturaId}`);
  }
}
