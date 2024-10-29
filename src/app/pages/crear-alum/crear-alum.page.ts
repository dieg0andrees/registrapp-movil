import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//Librerias
import { CrudAlumnoService, Alumno } from 'src/app/service/crud-alumno.service';
import { CrudAsignaturaService } from 'src/app/service/crud-asignatura.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-alum',
  templateUrl: './crear-alum.page.html',
  styleUrls: ['./crear-alum.page.scss'],
})
export class CrearAlumPage implements OnInit {
  nuevo_alumno: Alumno = {nombre:'', apellido:'',contrasena:'',email:'',asignaturas:[]}
  listado_alumno: Alumno[]=[]
  asignaturas$: Observable<{ id: string; nombre: string; profesorId: string; alumnos: string[] }[]>;
  sw:boolean=false //flag (banderitas)
  sw2:boolean=true //flag (banderitas)
  alumno_mod: Alumno = {nombre: '', apellido: '',contrasena:'', email: '', asignaturas: []};

  constructor(private CrudAlumno:CrudAlumnoService, private crudAsignatura:CrudAsignaturaService, private firestore:AngularFirestore, private navCtrl:NavController) { }
  

  ngOnInit() {
    this.listar();
    this.asignaturas$ = this.crudAsignatura.listarAsignaturas();
  }

  agregar_alumno() {
    // Crear el alumno en la colección 'alumno'
    this.CrudAlumno.crearAlumno(this.nuevo_alumno).then((docRef) => {
      const alumnoId = docRef.id;  // Obtenemos el ID del nuevo alumno creado
      this.nuevo_alumno.id = alumnoId; 

      // Ahora, por cada asignatura seleccionada, agregamos este alumnoId en su campo 'alumnos[]'
      this.nuevo_alumno.asignaturas.forEach(asignaturaId => {
        // Actualizamos el campo 'alumnos[]' de la asignatura usando firebase.firestore.FieldValue.arrayUnion
        this.firestore.collection('asignaturas').doc(asignaturaId).update({
          alumnos: firebase.firestore.FieldValue.arrayUnion(alumnoId)  // Usamos arrayUnion de firebase para añadir el ID del alumno
        });
      });

      // Mensaje de éxito
      alert("Alumno guardado y asignado a las asignaturas");

      // Limpiar el formulario
      this.nuevo_alumno = { nombre: '', apellido: '',contrasena:'', email: '', asignaturas: [] };
    }).catch((error) => {
      console.log("Error al guardar alumno:", error);
      alert("Ocurrió un error al guardar el alumno");
    });
  }

  listar(){
    this.CrudAlumno.listarAlumnos().subscribe(data=>{
      this.listado_alumno=data
    })
  }

  eliminarAlumno(id: any) {
    let alertShown = false; // Bandera para controlar la alerta
  
    // Obtener asignaturas y eliminar el alumno
    this.crudAsignatura.listarAsignaturas().pipe(take(1)).subscribe(asignaturas => {
      const asignaturasActualizadas = asignaturas.map(asignatura => {
        if (asignatura.alumnos.includes(id)) {
          asignatura.alumnos = asignatura.alumnos.filter(alumnoId => alumnoId !== id);
          return this.crudAsignatura.modificar(asignatura.id, asignatura);
        }
        return Promise.resolve();
      });
  
      Promise.all(asignaturasActualizadas).then(() => {
        return this.CrudAlumno.eliminarAlumno(id);
      }).then(() => {
        if (!alertShown) {
          alert("Alumno eliminado correctamente");
          alertShown = true; // Cambiar el estado a mostrado
        }
      }).catch(err => {
        console.error("Error al eliminar el alumno:", err);
      });
    });
  }

  modificar(alumno: Alumno) {
    this.alumno_mod = alumno;
    this.sw = true;
    this.sw2 = false;
  }

  cancelar() {
    this.sw = false;
    this.sw2 = true;
  }
  

  actualizar() {
    this.CrudAlumno.modificarAlumno(this.alumno_mod.id, this.alumno_mod)
    .then(() => {
      alert('Modificó');
      this.cancelar();
    }).catch(err => {
      console.error(err);
    });
  }

  volver(){
    this.navCtrl.navigateForward('/crud-admin')
  }
}

