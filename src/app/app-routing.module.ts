import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login2', loadChildren: './pages/login2/login2.module#Login2PageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'registro-moto/:id_userfb/:correo/:password/:nombre/:apellido/:edad/:celular/:motoClub', loadChildren: './pages/registro-moto/registro-moto.module#RegistroMotoPageModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'registro-salud/:id_userfb/:correo/:password/:nombre/:apellido/:edad/:celular/:conductor/:propietario/:motoClub/:marca/:submarca/:modelo/:motor/:vin/:cc/:ciudad/:placas/:compania/:poliza', loadChildren: './pages/registro-salud/registro-salud.module#RegistroSaludPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'verificacion/:id_userfb/:correo/:password/:nombre/:apellido/:edad/:celular/:conductor/:propietario/:motoClub/:marca/:submarca/:modelo/:motor/:vin/:cc/:ciudad/:placas/:compania/:poliza/:seguro/:sangre/:alergia/:organos/:contactoEmergencia/:parentezco/:celContacto', loadChildren: './pages/verificacion/verificacion.module#VerificacionPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'reg-usuario/:id_userfb/:correo/:password1', loadChildren: './pages/reg-usuario/reg-usuario.module#RegUsuarioPageModule' },
  { path: 'mis-motos', loadChildren: './pages/mis-motos/mis-motos.module#MisMotosPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'servicios', loadChildren: './pages/servicios/servicios.module#ServiciosPageModule' },
  { path: 'contacto-emerg', loadChildren: './pages/contacto-emerg/contacto-emerg.module#ContactoEmergPageModule' },
  { path: 'recover-password/:celular', loadChildren: './pages/recover-password/recover-password.module#RecoverPasswordPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
