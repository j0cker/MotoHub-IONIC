import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TextAvatarModule } from '../../components/text-avatar';

import { MisMotosPage } from './mis-motos.page';
import { EditMotosPage } from '../edit-motos/edit-motos.page';
import { EditMotosPageModule } from '../edit-motos/edit-motos.module';
import { EditSeguroPage } from '../edit-seguro/edit-seguro.page';
import { EditSeguroPageModule } from '../edit-seguro/edit-seguro.module';
import { AddMotosPage } from '../add-motos/add-motos.page';
import { AddMotosPageModule } from '../add-motos/add-motos.module';

const routes: Routes = [
  {
    path: '',
    component: MisMotosPage
  }
];

@NgModule({
  entryComponents: [
    EditMotosPage,
    EditSeguroPage,
    AddMotosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TextAvatarModule,
    EditMotosPageModule,
    EditSeguroPageModule,
    AddMotosPageModule
  ],
  declarations: [MisMotosPage]
})
export class MisMotosPageModule {}
