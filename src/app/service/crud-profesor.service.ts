import { Injectable } from '@angular/core';
//Librerias
import { Observable } from 'rxjs';
import { AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class CrudProfesorService {

  constructor(private firestore:AngularFirestore) { }

  crearProfesor(profesor:Profesor){
    return this.firestore.collection('profesor').add(profesor)
  }

  listarProfesores():Observable<Profesor[]> {
    return this.firestore.collection<Profesor>('profesor').valueChanges({ idField: 'id' });
  }

  eliminarProfesor(id:any){
    return this.firestore.collection('profesor').doc(id).delete()
  }

  modificarProfesor(id:any,profesor:Profesor){
    return this.firestore.collection('profesor').doc(id).update(profesor)
  }
}

//Crear Modelo de la colección Profesor
export interface Profesor{
  id?:string;
  nombre:string;
  apellido:string;
  email:string;
  contrasena: string;
  asignaturas:string[];
}
