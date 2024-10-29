import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class NombreusuarioService {

  private nombreUsuario : string;
  private idUsuario : string;

  constructor() { }

  setNombre(nombre:string){
    console.log(nombre)
    this.nombreUsuario=nombre;
  }

  setIdusuario(id:string){
    this.idUsuario=id
  }

  getNombre(){
    return this.nombreUsuario;
  }

  getIdUsuario(){
    return this.idUsuario;
  }
}
