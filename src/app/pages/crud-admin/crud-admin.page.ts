import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crud-admin',
  templateUrl: './crud-admin.page.html',
  styleUrls: ['./crud-admin.page.scss'],
})
export class CrudAdminPage implements OnInit {
  usuario : string = ''
  constructor(private navCtrl:NavController) { }

  ngOnInit() {
    this.usuario = localStorage.getItem("usuario") ?? ''
  }
  
  crear_alumno(){
    this.navCtrl.navigateForward('/crear-alum')
  }
  crear_profesor(){
    this.navCtrl.navigateForward('/crear-profe')
  }
  cerrar_sesion(){
    this.navCtrl.navigateForward('/login')
  }
}
