// reporteria-ri.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudAlumnoService, Alumno } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService, Asignatura } from 'src/app/service/crud-asignatura.service';
import { NombreusuarioService } from 'src/app/service/nombreusuario.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reporteria-ri',
  templateUrl: './reporteria-ri.page.html',
  styleUrls: ['./reporteria-ri.page.scss'],
})
export class ReporteriaRiPage implements OnInit {
  asignaturaId: string = '';
  asignatura: Asignatura;
  alumnos: (Alumno & { porcentajeAsistencia?: number })[] = [];
  profesorNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private crudAlumnoService: CrudAlumnoService,
    private crudAsignaturaService: CrudAsignaturaService,
    private nombreusuarioService: NombreusuarioService,
    private navCtrl:NavController
  ) {}

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('asignaturaId') || '';
    this.profesorNombre = this.nombreusuarioService.getNombre();
    this.cargarReporteAsistencia();
  }

  cargarReporteAsistencia() {
    this.crudAsignaturaService.obtenerAsignaturaPorId(this.asignaturaId).subscribe((asignaturaData) => {
      this.asignatura = asignaturaData;
      const alumnoIds = (asignaturaData?.alumnos || []).filter(id => typeof id === 'string' && id.trim() !== '');
      this.crudAlumnoService.listarAlumnos().subscribe((todosAlumnos) => {
        this.alumnos = todosAlumnos.filter(alumno => alumnoIds.includes(alumno.id || ''));
        this.calcularPorcentajesAsistencia();
      });
    });
  }

  calcularPorcentajesAsistencia() {
    this.firestore.collection('asignaturas').doc(this.asignaturaId)
      .collection('clases').get().subscribe((clasesSnapshot) => {
        const totalClases = clasesSnapshot.size;
        const asistenciaPromises = clasesSnapshot.docs.map(claseDoc => {
          return this.firestore.collection('asignaturas').doc(this.asignaturaId)
            .collection('clases').doc(claseDoc.id)
            .collection('asistencia').get().toPromise();
        });

        Promise.all(asistenciaPromises).then(asistenciasSnapshots => {
          this.alumnos.forEach(alumno => {
            let clasesAsistidas = 0;
            asistenciasSnapshots.forEach(snapshot => {
              if (snapshot && snapshot.docs.some(doc => doc.data()['alumnoId'] === alumno.id)) {
                clasesAsistidas++;
              }
            });
            alumno.porcentajeAsistencia = (clasesAsistidas / totalClases) * 100;
          });
        });
      });
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text(`Reporte de Asistencia - ${this.asignatura.nombre}`, 10, 10);
    doc.text(`Profesor: ${this.profesorNombre}`, 10, 20);
    doc.text(`Asignatura: ${this.asignatura.nombre}`, 10, 30);

    const rows = this.alumnos.map(alumno => [
      alumno.nombre,
      alumno.apellido,
      alumno.porcentajeAsistencia?.toFixed(2) ?? '0.00'
    ]);

    (doc as any).autoTable({
      head: [['Nombre', 'Apellido', 'Porcentaje de Asistencia']],
      body: rows,
    });

    doc.save(`reporte_asistencia_${this.asignatura.nombre}.pdf`);
  }

  descargarExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.alumnos.map(alumno => ({
      Nombre: alumno.nombre,
      Apellido: alumno.apellido,
      'Porcentaje de Asistencia': alumno.porcentajeAsistencia?.toFixed(2) ?? '0.00'
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Asistencia');

    XLSX.writeFile(workbook, `reporte_asistencia_${this.asignatura.nombre}.xlsx`);
  }

  volver(){
    this.navCtrl.back();
  }
}
