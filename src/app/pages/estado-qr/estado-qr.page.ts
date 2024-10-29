import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudAlumnoService, Alumno } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService, Asignatura } from 'src/app/service/crud-asignatura.service';

@Component({
  selector: 'app-estado-qr',
  templateUrl: './estado-qr.page.html',
  styleUrls: ['./estado-qr.page.scss'],
})
export class EstadoQrPage implements OnInit {
  asignaturaId: string = '';
  claseId: string = '';
  alumnos: (Alumno & { presente?: boolean })[] = [];
  asistencia: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private crudAlumnoService: CrudAlumnoService,
    private crudAsignaturaService: CrudAsignaturaService
  ) {}

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('asignaturaId') || '';
    this.claseId = this.route.snapshot.paramMap.get('claseId') || '';
    this.cargarEstadoQr();
  }

  cargarEstadoQr() {
    console.log('Cargando alumnos para asignatura:', this.asignaturaId);
    // Obtener los IDs de los alumnos de la asignatura
    this.crudAsignaturaService.obtenerAsignaturaPorId(this.asignaturaId).subscribe((asignaturaData) => {
      console.log('Datos de la asignatura:', asignaturaData); // Añadir log para verificar los datos de la asignatura
      const alumnoIds = (asignaturaData?.alumnos || []).filter(id => typeof id === 'string' && id.trim() !== '');
      console.log('IDs de alumnos:', alumnoIds); // Añadir log para verificar los IDs

      // Obtener todos los alumnos y filtrar por los IDs obtenidos
      this.crudAlumnoService.listarAlumnos().subscribe((todosAlumnos) => {
        this.alumnos = todosAlumnos.filter(alumno => alumnoIds.includes(alumno.id || ''));
        console.log('Alumnos cargados:', this.alumnos);

        // Cargar la asistencia de la clase
        this.firestore.collection('asignaturas').doc(this.asignaturaId)
          .collection('clases').doc(this.claseId)
          .collection('asistencia').get().subscribe((snapshot) => {
            this.asistencia = snapshot.docs.map(doc => doc.data()['alumnoId']);
            console.log('Asistencia cargada:', this.asistencia);
            this.marcarAsistencia();
          });
      }, error => {
        console.error('Error al cargar los alumnos:', error);
      });
    }, error => {
      console.error('Error al cargar la asignatura:', error);
    });
  }

  marcarAsistencia() {
    this.alumnos.forEach(alumno => {
      alumno.presente = this.asistencia.includes(alumno.id || '');
    });
    console.log('Estado de asistencia actualizado:', this.alumnos);
  }

  volver() {
    this.navCtrl.back();
  }
}
