// mis-cursos.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudAlumnoService } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService, Asignatura } from 'src/app/service/crud-asignatura.service';
import { NombreusuarioService } from 'src/app/service/nombreusuario.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {
  idUsuario: string = '';
  asignaturas: Asignatura[] = [];

  constructor(
    private navCtrl: NavController,
    private crudAlumno: CrudAlumnoService,
    private crudAsignatura: CrudAsignaturaService,
    private nombreUsuario: NombreusuarioService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.idUsuario = this.nombreUsuario.getIdUsuario();
    this.cargarAsignaturasAlumno();
  }

  cargarAsignaturasAlumno() {
    this.firestore.collection('asignaturas', ref => ref.where('alumnos', 'array-contains', this.idUsuario))
      .get().subscribe((snapshot) => {
        snapshot.forEach(doc => {
          const asignatura = doc.data() as Asignatura;
          asignatura.id = doc.id;
          this.calcularPorcentajeAsistencia(asignatura);
        });
      });
  }

  calcularPorcentajeAsistencia(asignatura: Asignatura) {
    this.firestore.collection('asignaturas').doc(asignatura.id)
      .collection('clases').get().subscribe((clasesSnapshot) => {
        const totalClases = clasesSnapshot.size;
        const asistenciaPromises = clasesSnapshot.docs.map(claseDoc => {
          return this.firestore.collection('asignaturas').doc(asignatura.id)
            .collection('clases').doc(claseDoc.id)
            .collection('asistencia').get().toPromise();
        });

        Promise.all(asistenciaPromises).then(asistenciasSnapshots => {
          let clasesAsistidas = 0;
          asistenciasSnapshots.forEach(snapshot => {
            if (snapshot && snapshot.docs.some(doc => doc.data()['alumnoId'] === this.idUsuario)) {
              clasesAsistidas++;
            }
          });
          asignatura.porcentajeAsistencia = (clasesAsistidas / totalClases) * 100;
          this.asignaturas.push(asignatura);
        });
      });
  }

  volver() {
    this.navCtrl.navigateForward('/home-alumno');
  }
}
