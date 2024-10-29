import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudProfesorService, Profesor } from 'src/app/service/crud-profesor.service';
import { CrudAsignaturaService } from 'src/app/service/crud-asignatura.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-profe',
  templateUrl: './crear-profe.page.html',
  styleUrls: ['./crear-profe.page.scss'],
})
export class CrearProfePage implements OnInit {
  nuevo_profesor: Profesor = { nombre: '', apellido: '',contrasena:'', email: '', asignaturas: [] };
  listado_profesor: Profesor[] = [];

  asignaturas$: Observable<{ id: string; nombre: string; profesorId: string; alumnos: string[] }[]>;
  sw: boolean = false;
  sw2: boolean = true;
  profesor_mod: Profesor = { nombre: '', apellido: '',contrasena:'', email: '', asignaturas: [] };

  constructor(private crudProfesor:CrudProfesorService, private crudAsignatura:CrudAsignaturaService, private firestore:AngularFirestore, private navCtrl:NavController) { }

  ngOnInit() {
    this.listar();
    this.asignaturas$ = this.crudAsignatura.listarAsignaturas();
  }

  agregar_profesor() {
    // Crear el profesor en la colección 'profesor'
    this.crudProfesor.crearProfesor(this.nuevo_profesor).then((docRef) => {
      const profesorId = docRef.id;
      this.nuevo_profesor.id = profesorId;

      // Asignar profesorId a las asignaturas seleccionadas
      this.nuevo_profesor.asignaturas.forEach(asignaturaId => {
        this.firestore.collection('asignaturas').doc(asignaturaId).update({
          profesorId: profesorId // Aquí simplemente se asigna el ID del profesor
        });
      });

      alert("Profesor guardado y asignado a las asignaturas");
      this.nuevo_profesor = { nombre: '', apellido: '', contrasena: '', email: '', asignaturas: [] }; // Limpiar formulario
    }).catch((error) => {
      console.error("Error al guardar profesor:", error);
      alert("Ocurrió un error al guardar el profesor");
    });
  }

  listar() {
    this.crudProfesor.listarProfesores().subscribe(data => {
      this.listado_profesor = data;
    });
  }

  eliminarProfesor(id: any) {
    // Obtener las asignaturas que contienen al profesor
    this.crudAsignatura.listarAsignaturas().subscribe(asignaturas => {
      const asignaturasActualizadas = asignaturas.map(asignatura => {
        if (asignatura.profesorId === id) {
          asignatura.profesorId = ''; // Eliminar el ID del profesor de la asignatura
          return this.crudAsignatura.modificar(asignatura.id, asignatura);
        }
        return Promise.resolve();
      });

      // Esperar a que todas las promesas se resuelvan
      Promise.all(asignaturasActualizadas).then(() => {
        return this.crudProfesor.eliminarProfesor(id); // Eliminar el profesor de la colección
      }).then(() => {
        alert("Profesor eliminado correctamente");
      }).catch(err => {
        console.error("Error al eliminar el profesor:", err);
      });
    });
  }

  modificar(profesor: Profesor) {
    this.profesor_mod = profesor;
    this.sw = true;
    this.sw2 = false;
  }

  cancelar() {
    this.sw = false;
    this.sw2 = true;
  }

  actualizar() {
    this.crudProfesor.modificarProfesor(this.profesor_mod.id, this.profesor_mod)
    .then(() => {
      // Actualizar el profesorId en las asignaturas seleccionadas por el profesor
      this.profesor_mod.asignaturas.forEach(asignaturaId => {
        this.firestore.collection('asignaturas').doc(asignaturaId).update({
          profesorId: this.profesor_mod.id  // Asignar el id del profesor a la asignatura
        }).then(() => {
          console.log(`Asignatura ${asignaturaId} actualizada con profesorId: ${this.profesor_mod.id}`);
        }).catch(err => {
          console.error(`Error al actualizar la asignatura ${asignaturaId}:`, err);
        });
      });
  
      alert('Profesor y asignaturas modificadas correctamente');
      this.cancelar();
    }).catch(err => {
      console.error(err);
      alert('Error al modificar el profesor');
    });
  }

  volver(){
    this.navCtrl.navigateForward('/crud-admin')
  }
}
