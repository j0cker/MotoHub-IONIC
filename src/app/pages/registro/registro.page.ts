import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  id_userfb= 'N/A';
  correo: any;
  password1: any;
  password2: any;

  constructor( private router: Router, public toastController: ToastController, private dataService: DataService) { }

  ngOnInit() {
  }

  signin(correo: any, password1: any, password2: any) {
    // const control = new FormControl(correo, Validators.email);

    // console.log(control.errors); // {email: true}
    // Verificar que ningun campo este vacio
    if (correo == undefined || correo == '' || password1 == undefined || password1 == '' || password2 == undefined || password2 == '') {

      this.completo();

    } else {
      console.log('[Registro][signin] id_userfb: ' + this.id_userfb);
      console.log('[Registro][signin] correo: ' + correo);
      console.log('[Registro][signin] pass1: ' + password1);
      console.log('[Registro][signin] pass2: ' + password2);

      const esMail = this.isEmail(correo);
      // tslint:disable-next-line: no-conditional-assignment
      if (esMail === true) {
        // tslint:disable-next-line: triple-equals
          console.log('[Registro][signin] Si es un correo válido');

          // Verificar si el correo ya ha sido registrado anteriormente
          // tslint:disable-next-line: max-line-length
          this.dataService.verificarCorreo(correo)
          .subscribe( (data: any) => {

          console.log('success: ' + data.success);
          // this.userData = data;
          // tslint:disable-next-line: triple-equals
          if (data.success == 'TRUE') {
            // Alertar que el correo ya ha sido registrado anteriormente
            console.log('[Registro][signin] El correo ya ha sido registrado anteriormente');
            this.yaMail();
          } else {
            // Continuar registrando
            if (password1 === password2) {
              this.router.navigate( ['/reg-usuario', this.id_userfb, correo, password1] );
            } else {
              console.log('[Registro][signin] Las contraseñas no coinciden');
              this.malpass();
            }
          }

          }, ( error ) => {
            console.log(error);
            // this.userData = 'Este es el error: ' + error.toString();
            this.mal(error);
          });
      // tslint:disable-next-line: triple-equals
      } else {
        console.log('Ingresar un email válido');
        this.mail();
      }
      // console.log($event.detail.checked);
      // tslint:disable-next-line: triple-equals
    }

  }

  // tslint:disable-next-line: max-line-length
  isEmail(correo: any): boolean {
    let  serchfind: boolean;
    let regexp: any;

    // tslint:disable-next-line: max-line-length
    regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    serchfind = regexp.test(correo);

    console.log(serchfind);
    return serchfind;
  }

  async completo() {
    const toast = await this.toastController.create({
      header: 'Alerta',
      message: 'LLenar todos los campos',
      duration: 4000,
      color: 'medium',
      position: 'bottom',
    });
    toast.present();
  }

  async mail() {
    const toast = await this.toastController.create({
      message: 'Ingresar un correo válido',
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  async yaMail() {
    const toast = await this.toastController.create({
      message: 'El correo ya ha sido registrado anteriormente',
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  async malpass() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden',
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  async mal(msj: any) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

}
