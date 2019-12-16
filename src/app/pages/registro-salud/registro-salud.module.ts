import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistroSaludPage } from './registro-salud.page';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';
import { ComponentsModule } from '../../components/components.module';
import { TerminosPage } from '../terminos/terminos.page';
import { TerminosPageModule } from '../terminos/terminos.module';

const routes: Routes = [
  {
    path: '',
    component: RegistroSaludPage
  }
];

@NgModule({
  entryComponents: [
    PopinfoComponent,
    TerminosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TerminosPageModule
  ],
  declarations: [RegistroSaludPage]
})
export class RegistroSaludPageModule {}
