import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { NombreusuarioService } from 'src/app/service/nombreusuario.service';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  usuario : string = ''
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private navCtrl: NavController, 
    private alertCtrl: AlertController,
    private firestore: AngularFirestore,
    private nombreUsuario:NombreusuarioService
  ) { }

  ngOnInit() {
    this.usuario = this.nombreUsuario.getIdUsuario();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    if (barcodes.length > 0) {
      const qrData = JSON.parse(barcodes[0].rawValue);
      this.registrarAsistencia(qrData);
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  registrarAsistencia(qrData: any) {
    const asistencia = {
      alumnoId: this.usuario, // Reemplaza con el ID del alumno actual
      fecha: qrData.fecha,
      timestamp: new Date()
    };
  
    this.firestore.collection('asignaturas').doc(qrData.asignaturaId)
      .collection('clases').doc(qrData.claseId)
      .collection('asistencia').add(asistencia).then(() => {
        console.log('Asistencia registrada');
      }).catch(error => {
        console.error('Error al registrar asistencia: ', error);
      });
  }

  volver() {
    this.navCtrl.navigateForward('/home-alumno');
  }
}
