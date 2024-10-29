import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NombreusuarioService } from 'src/app/service/nombreusuario.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  idUsuario: string = '';
  codigoQr: any;  // Código QR que se generará
  qr: string = '';  // Código QR en formato JSON
  asignaturaId: string;  // ID de la asignatura, ahora se recibe como parámetro
  nombreCurso: string = ''; // Nombre de la asignatura
  profesorId: string = ''; // ID del profesor
  fechaClase: Date = new Date();  // Fecha actual para la clase
  claseId: string = ''; // ID de la clase generada

  constructor(
    private navCtrl: NavController, 
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private nombreUsuario: NombreusuarioService,
  ) {}

  ngOnInit() {
    this.idUsuario = this.nombreUsuario.getIdUsuario();
    // Obtener el ID y nombre de la asignatura desde los parámetros de la ruta
    this.asignaturaId = this.route.snapshot.paramMap.get('asignaturaId') || ''; 
    this.nombreCurso = this.route.snapshot.paramMap.get('asignaturaNombre') || '';
    this.profesorId = this.idUsuario;
    this.generarQr();
  }

  async generarQr() {
    this.claseId = this.firestore.createId();
    console.log('Generado claseId:', this.claseId); // Agrega este log
  
    if (!this.asignaturaId) {
      console.error('El ID de asignatura está vacío.');
      return;
    }
  
    const claseData = {
      id: this.claseId,
      nombreCurso: this.nombreCurso,
      profesorId: this.profesorId,
      fecha: this.fechaClase,
      asistencia: []
    };
  
    await this.firestore.collection('asignaturas').doc(this.asignaturaId)
      .collection('clases').doc(this.claseId).set(claseData);
  
    this.codigoQr = {
      asignaturaId: this.asignaturaId,
      claseId: this.claseId,
      fecha: this.fechaClase.toISOString()
    };
  
    this.qr = JSON.stringify(this.codigoQr);
  }
  
  verEstadoQr() {
    this.navCtrl.navigateForward(`/estado-qr/${this.asignaturaId}/${this.claseId}`);
  }

  volver() {
    this.navCtrl.navigateForward('/generar-qr');
    alert("Clase Finalizada");
  }
}
