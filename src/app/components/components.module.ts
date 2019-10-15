import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinfoComponent } from './popinfo/popinfo.component';



@NgModule({
  declarations: [
    PopinfoComponent
  ],
  exports: [
    PopinfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
