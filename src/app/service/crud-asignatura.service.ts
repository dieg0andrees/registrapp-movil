import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Alumno } from 'src/app/service/crud-alumno.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudAsignaturaService {

  constructor(private firestore: AngularFirestore) { }

  listarAsignaturas(): Observable<{ id: string; nombre: string; profesorId: string; alumnos: string[] }[]> {
    return this.firestore.collection<{ nombre: string; profesorId: string; alumnos: string[] }>('asignaturas').valueChanges({ idField: 'id' });
  }

  obtenerAsignaturaPorId(id: string): Observable<Asignatura> {
    return this.firestore.collection('asignaturas').doc<Asignatura>(id).valueChanges().pipe(
      map(asignatura => {
        if (!asignatura) {
          throw new Error('Asignatura no encontrada');
        }
        return asignatura;
      })
    );
  }

  modificar(id: string, asignatura: { nombre?: string; profesorId?: string; alumnos?: string[] }) {
    return this.firestore.collection('asignaturas').doc(id).update(asignatura);
  }
}

export interface Asignatura {
  id?: string;
  nombre: string;
  alumnos: string[];
  profesorId: string;
  porcentajeAsistencia?: number;
}
