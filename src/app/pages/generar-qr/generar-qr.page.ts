import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CrudAlumnoService } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService } from 'src/app/service/crud-asignatura.service';
import { NombreusuarioService } from 'src/app/service/nombreusuario.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Asignatura } from 'src/app/service/crud-asignatura.service'; // Importa la interfaz Asignatura

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  idUsuario: string = '';
  asignaturas: Asignatura[] = []; // Cambia de any[] a Asignatura[]

  constructor(private navCtrl: NavController,
              private crudAlumno: CrudAlumnoService, 
              private crudAsignatura: CrudAsignaturaService,
              private nombreUsuario: NombreusuarioService,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.idUsuario = this.nombreUsuario.getIdUsuario();
    this.cargarAsignaturasProfesor();
  }

  cargarAsignaturasProfesor() {
    this.firestore.collection<Asignatura>('asignaturas', ref => ref.where('profesorId', '==', this.idUsuario))
      .get().subscribe((snapshot) => {
        this.asignaturas = []; // Limpiar antes de cargar nuevas asignaturas
        snapshot.forEach(doc => {
          const data = doc.data() as Asignatura; // Tipamos los datos como Asignatura
          this.asignaturas.push({ id: doc.id, ...data }); // Guardar el ID del documento junto con los datos
          console.log('Asignatura ID cargada:', doc.id); // Agrega este log
        });
      });
  }

  generarQr(asignaturaId: any, asignaturaNombre: any) {
    console.log('ID de asignatura al generar QR:', asignaturaId); // Agrega este log
    this.navCtrl.navigateForward(`/scan-qr/${asignaturaId}/${asignaturaNombre}`);
  }

  volver() {
    this.navCtrl.navigateForward('/home-profesor');
  }
}
