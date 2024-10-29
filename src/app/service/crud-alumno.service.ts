import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudAlumnoService {

  constructor(private firestore: AngularFirestore) { }

  crearAlumno(alumno: Alumno) {
    return this.firestore.collection('alumno').add(alumno);
  }

  listarAlumnos(): Observable<Alumno[]> {
    return this.firestore.collection<Alumno>('alumno').valueChanges({ idField: 'id' });
  }

  eliminarAlumno(id: any) {
    return this.firestore.collection('alumno').doc(id).delete();
  }

  modificarAlumno(id: any, alumno: Alumno) {
    return this.firestore.collection('alumno').doc(id).update(alumno);
  }

  obtenerAlumnosPorIds(ids: string[]): Observable<Alumno[]> {
    console.log('Obteniendo alumnos por IDs:', ids); // Añadir log para verificar los IDs
    const observables = ids.map(id => this.firestore.collection('alumno').doc<Alumno>(id).valueChanges());
    return forkJoin(observables).pipe(
      map(alumnos => {
        console.log('Alumnos obtenidos:', alumnos); // Añadir log para verificar los datos de los alumnos
        return alumnos.filter(alumno => alumno !== undefined) as Alumno[];
      })
    );
  }
}

// Crear Modelo de la colección
export interface Alumno {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  asignaturas: string[];
}
