import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController, IonSearchbar, AlertController, ToastController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.page.html',
  styleUrls: ['./reg-usuario.page.scss'],
})
export class RegUsuarioPage implements OnInit {

  nombre: any; apellido: any; edad: any; celular: any; conductor: any; propietario: any; motoClub: any;
  user: any;
  isDisabled: boolean;
  hide1 = true; hide2 = true;
  label = 'light'; label2 = 'light';
  flag1: boolean; flag2: boolean;
  info: any;

  // tslint:disable-next-line: max-line-length
  constructor(private router: ActivatedRoute, private router2: Router, private dataService: DataService, private popoverController: PopoverController, public toastController: ToastController) {
    this.router.params.subscribe((params: any) => {
      console.log(params);
      this.user = params;
    });
  }

  ngOnInit() {
  }

  // tslint:disable-next-line: max-line-length
  regUser(nombre: any, apellido: any, edad: any, celular: any, motoClub: any) {

    // tslint:disable-next-line: no-conditional-assignment
    // tslint:disable-next-line: max-line-length
    if ( nombre == undefined || nombre == '' || apellido == undefined || apellido == '' || edad == undefined || edad == '' || celular == undefined || celular == '') {
      this.completo();
      this.label = 'danger';
    } else {

      this.label = 'light';


      if (edad.length < 4) {
        this.hide1 = false;
        // console.log(this.hide);
        this.flag1 = false;
      } else {
        this.flag1 = true;
        this.hide1 = true;
      }
      if (celular.length < 10) {
        this.hide2 = false;
        // console.log(this.hide);
        this.flag2 = false;
      } else {
        this.flag2 = true;
        this.hide2 = true;
      }

      if (motoClub == '' || motoClub == undefined) {
        motoClub = 'N/A';
      }

      if (this.flag1 === true && this.flag2 === true) {
        console.log('Flag1:' + this.flag1 + ' Flag2: ' + this.flag2);
        console.log('Hide1:' + this.hide1 + ' Hide2: ' + this.hide2);
        this.dataService.verificarCelular(celular)
          .subscribe( (data: any) => {

            console.log('success: ' + data.success);
            // this.userData = data;
            // tslint:disable-next-line: triple-equals
            if (data.success == 'TRUE') {
              // Alertar que el correo ya ha sido registrado anteriormente
              console.log('[Registro][signin] El celular ya ha sido registrado anteriormente');
              this.yaCel();
            } else {
              // tslint:disable-next-line: max-line-length
              this.router2.navigate( ['/registro-moto', this.user.id_userfb, this.user.correo, this.user.password1, nombre, apellido, edad, celular, motoClub] );
            }

          }, ( error ) => {
            console.log(error);
            // this.userData = 'Este es el error: ' + error.toString();
            this.mal(error);
          });

      } else {
        console.log('Flag1:' + this.flag1 + ' Flag2: ' + this.flag2);
        console.log('Hide1:' + this.hide1 + ' Hide2: ' + this.hide2);
      }

    }
  }

  async presentPopover(ev: any, help: any) {
    if (help === 'celular') {
      this.info = 'Recuerda que el celular se conforma de 10 dígitos';
    }
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      componentProps: {info: this.info},
      mode: 'ios',
      event: ev,
      translucent: true
    });
    // console.log(ev);
    return await popover.present();
  }

  async yaCel() {
    const toast = await this.toastController.create({
      message: 'El celular ya ha sido registrado anteriormente',
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  async completo() {
    const toast = await this.toastController.create({
      message: 'LLenar todos los campos obligatorio',
      duration: 4000,
      color: 'medium',
      position: 'bottom'
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
