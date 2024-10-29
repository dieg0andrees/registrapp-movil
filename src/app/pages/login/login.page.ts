import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Profesor } from 'src/app/service/crud-profesor.service';
import { Alumno } from 'src/app/service/crud-alumno.service';

import { NombreusuarioService } from 'src/app/service/nombreusuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario : string = ''
  nombreusuario : string = ''
  contrasena : string = ''
  idalumno : string = ''
  idprofe : string = ''
  constructor(private navCtrl:NavController, private alertCtrl:AlertController, private firestore: AngularFirestore, private nombreUsuario:NombreusuarioService)  { }

  ngOnInit() {
  }
  login() {
    if (this.usuario === 'admin' && this.contrasena === 'admin') {
      this.navCtrl.navigateForward('/crud-admin');
      return;
    }

    // Buscar en la colección de alumnos
    this.firestore.collection<Alumno>('alumno', ref => ref.where('email', '==', this.usuario)).get().subscribe(alumnos => {
      if (!alumnos.empty) {
        const alumno = alumnos.docs[0].data() as Alumno;
        const alumnoId = alumnos.docs[0].id;  // Obtener el id del documento
  
        if (alumno.contrasena === this.contrasena) {
          // Redirigir al home del alumno
          this.nombreusuario = alumno.nombre;
          this.nombreUsuario.setNombre(this.nombreusuario);

          this.idalumno = alumnoId;
          this.nombreUsuario.setIdusuario(this.idalumno);
          this.navCtrl.navigateForward('/home-alumno');
        } else {
          this.presentAlert();
        }
      } else {
        // Si no encontramos al alumno, buscar en la colección de profesores
        this.firestore.collection<Profesor>('profesor', ref => ref.where('email', '==', this.usuario)).get().subscribe(profesores => {
          if (!profesores.empty) {
            const profesor = profesores.docs[0].data() as Profesor;
            const profesorId = profesores.docs[0].id;
  
            if (profesor.contrasena === this.contrasena) {
              this.nombreusuario = profesor.nombre;
              this.nombreUsuario.setNombre(this.nombreusuario);

              this.idprofe = profesorId;
              this.nombreUsuario.setIdusuario(this.idprofe);
              // Redirigir al home del profesor
              this.navCtrl.navigateForward('/home-profesor');
            } else {
              this.presentAlert();
            }
          } else {
            this.presentAlert();
          }
        });
      }
    });
  }
  /*
  validar(){
    if (this.contrasena == 'alumno'){
      localStorage.setItem("usuario", this.usuario)
      this.navCtrl.navigateForward('/home-alumno')
    }
    else if (this.contrasena == 'profesor'){
      localStorage.setItem("usuario", this.usuario)
      this.navCtrl.navigateForward('/home-profesor')
    }
    else{
      this.presentAlert()
    }
  }
  */

  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header : 'Error',
      subHeader : 'Validacion usuario',
      message : 'Usuario o Contraseña Incorrecta',
      buttons : ['Aceptar'], 
    });
    await alert.present();
  }
}
