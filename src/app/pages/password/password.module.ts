import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PasswordPage } from './password.page';

import { VerificacionPasswordPage } from '../verificacion-password/verificacion-password.page';
import { VerificacionPasswordPageModule } from '../verificacion-password/verificacion-password.module';

const routes: Routes = [
  {
    path: '',
    component: PasswordPage
  }
];

@NgModule({
  entryComponents: [
    VerificacionPasswordPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    VerificacionPasswordPageModule
  ],
  declarations: [PasswordPage]
})
export class PasswordPageModule {}
