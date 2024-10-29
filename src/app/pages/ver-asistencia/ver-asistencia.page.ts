// ver-asistencia.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudAlumnoService, Alumno } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService, Asignatura } from 'src/app/service/crud-asignatura.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  asignaturaId: string = '';
  alumnos: Alumno[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private crudAlumnoService: CrudAlumnoService,
    private crudAsignaturaService: CrudAsignaturaService,
    private navCtrl:NavController
  ) {}

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('asignaturaId') || '';
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.crudAsignaturaService.obtenerAsignaturaPorId(this.asignaturaId).subscribe((asignaturaData) => {
      const alumnoIds = (asignaturaData?.alumnos || []).filter(id => typeof id === 'string' && id.trim() !== '');
      this.crudAlumnoService.listarAlumnos().subscribe((todosAlumnos) => {
        this.alumnos = todosAlumnos.filter(alumno => alumnoIds.includes(alumno.id || ''));
      });
    });
  }

  volver() {
    this.navCtrl.back();
  }
}
