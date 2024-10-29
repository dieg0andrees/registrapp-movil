import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./pages/home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule)
  },
  {
    path: 'home-profesor',
    loadChildren: () => import('./pages/home-profesor/home-profesor.module').then( m => m.HomeProfesorPageModule)
  },
  {
    path: 'mis-cursos',
    loadChildren: () => import('./pages/mis-cursos/mis-cursos.module').then( m => m.MisCursosPageModule)
  },
  {
    path: 'leer-qr',
    loadChildren: () => import('./pages/leer-qr/leer-qr.module').then( m => m.LeerQrPageModule)
  },
  {
    path: 'mis-cursos-profesor',
    loadChildren: () => import('./pages/mis-cursos-profesor/mis-cursos-profesor.module').then( m => m.MisCursosProfesorPageModule)
  },
  {
    path: 'ver-asistencia/:asignaturaId',
    loadChildren: () => import('./pages/ver-asistencia/ver-asistencia.module').then( m => m.VerAsistenciaPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule)
  },
  {
    path: 'scan-qr/:asignaturaId/:asignaturaNombre',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
  },
  {
    path: 'estado-qr/:asignaturaId/:claseId',
    loadChildren: () => import('./pages/estado-qr/estado-qr.module').then( m => m.EstadoQrPageModule)
  },
  {
    path: 'reporteria',
    loadChildren: () => import('./pages/reporteria/reporteria.module').then( m => m.ReporteriaPageModule)
  },
  {
    path: 'reporteria-ri/:asignaturaId',
    loadChildren: () => import('./pages/reporteria-ri/reporteria-ri.module').then( m => m.ReporteriaRiPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'crud-admin',
    loadChildren: () => import('./pages/crud-admin/crud-admin.module').then( m => m.CrudAdminPageModule)
  },
  {
    path: 'crear-profe',
    loadChildren: () => import('./pages/crear-profe/crear-profe.module').then( m => m.CrearProfePageModule)
  },
  {
    path: 'crear-alum',
    loadChildren: () => import('./pages/crear-alum/crear-alum.module').then( m => m.CrearAlumPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
