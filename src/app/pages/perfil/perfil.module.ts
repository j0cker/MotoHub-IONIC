import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { EditPerfilPage } from '../edit-perfil/edit-perfil.page';
import { EditPerfilPageModule } from '../edit-perfil/edit-perfil.module';
import { EditSaludPage } from '../edit-salud/edit-salud.page';
import { EditSaludPageModule } from '../edit-salud/edit-salud.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  entryComponents: [
    EditPerfilPage,
    EditSaludPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EditPerfilPageModule,
    EditSaludPageModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
