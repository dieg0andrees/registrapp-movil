import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  email : string = ''
  codigo : string = ''
  
  constructor(private navCtrl:NavController, private alertCtrl:AlertController) { }

  ngOnInit() {
  }
  ir_login(){
    this.navCtrl.navigateForward('/login')
  }

  async enviar_codigo() {
    const alert = await this.alertCtrl.create({
      header: '¡Exito!',
      message: 'Se han enviado a tu email las instrucciones para cambiar la contraseña',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
