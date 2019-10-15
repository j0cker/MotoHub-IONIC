import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login2', loadChildren: './pages/login2/login2.module#Login2PageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'registro-moto/:correo/:password1', loadChildren: './pages/registro-moto/registro-moto.module#RegistroMotoPageModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'emerg-contact', loadChildren: './pages/emerg-contact/emerg-contact.module#EmergContactPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'registro-salud/:correo/:password/:nombre/:apellido/:edad/:celular/:conductor/:propietario/:motoClub/:marca/:submarca/:modelo/:motor/:vin/:cc/:ciudad/:placas/:compania/:poliza', loadChildren: './pages/registro-salud/registro-salud.module#RegistroSaludPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
