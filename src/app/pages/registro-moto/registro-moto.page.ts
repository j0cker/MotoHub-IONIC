import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController, IonSearchbar, AlertController, ToastController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-registro-moto',
  templateUrl: './registro-moto.page.html',
  styleUrls: ['./registro-moto.page.scss'],
})
export class RegistroMotoPage implements OnInit {

  public isDisabled: boolean;
  user: any;
  conductor: any;
  propietario: any;
  marca: any;
  submarca: any;
  modelo: any;
  motor: any;
  vin: any;
  cc: any;
  ciudad: any;
  placas: any;
  compania: any;
  poliza: any;
  info: any; checked = false; disabled = false;
  hide3 = true; hide4 = true;
  label = 'light'; label2 = 'light';
  flag3: boolean; flag4: boolean;

  // tslint:disable-next-line: max-line-length
  constructor( private router: ActivatedRoute, private router2: Router, private dataService: DataService, private popoverController: PopoverController, public alertController: AlertController, public toastController: ToastController) {
    this.router.params.subscribe((params: any) => {
      console.log(params);
      this.user = params;
    });
  }

  ngOnInit() {
  }

  conductor_change($event: any) {
    // console.log($event.detail.checked);
    // tslint:disable-next-line: triple-equals
    if ($event.detail.checked == 1) {
      // console.log('Esta prendido');
      this.conductor = this.user.nombre + ' ' + this.user.apellido;
      this.disabled = true;
    } else {
      this.disabled = false;
      // console.log('Esta apagado');
    }
  }

  seguro_change($event: any) {
    // console.log($event.detail.checked);
    // tslint:disable-next-line: triple-equals
    if ($event.detail.checked == 1) {
      this.isDisabled = false;
      if (this.label === 'danger') {
        this.label2 = 'danger';
      }
      // console.log('Esta prendido');
    } else {
      this.isDisabled = true;
      this.label2 = 'light';
      // console.log('Esta apagado');
    }
  }

  // tslint:disable-next-line: max-line-length
  regMoto(conductor: any, propietario: any, marca: any, submarca: any, modelo: any, motor: any, vin: any, cc: any, ciudad: any, placas: any, compania: any, poliza: any) {

    if (this.isDisabled == true || this.isDisabled == undefined) {
      this.label2 = 'light';
      compania = 'N/A';
      poliza = 'N/A';
    } else if (this.isDisabled == false){
      if ( compania == undefined || compania == '' || poliza == undefined || poliza == ''){
        this.completo();
        this.label2 = 'danger';
      }

    }
    // tslint:disable-next-line: no-conditional-assignment
    // tslint:disable-next-line: max-line-length
    if ( conductor == undefined || conductor == '' || propietario == undefined || propietario == '' || marca == undefined || marca == '' || submarca == undefined || submarca == '' || modelo == undefined || modelo == '' || vin == undefined || vin == '' || cc == undefined || cc == '' || ciudad == undefined || ciudad == '' || placas == undefined || placas == '') {
      this.completo();
      this.label = 'danger';
    } else {

      this.label = 'light';

      if (vin.length < 17) {
        this.hide4 = false;
        // console.log(this.hide);
        this.flag4 = false;
      } else {
        this.flag4 = true;
        this.hide4 = true;
      }
      if (motor == '' || motor == undefined) {
        motor = 'N/A';
      }

      if (this.flag4 === true) {
        console.log('Flag4: ' + this.flag4);
        console.log('Hide4: ' + this.hide4);
        this.dataService.verificarVin(vin)
          .subscribe( (data: any) => {

            console.log('success: ' + data.success);
            // this.userData = data;
            // tslint:disable-next-line: triple-equals
            if (data.success == 'TRUE') {
              // Alertar que el correo ya ha sido registrado anteriormente
              console.log('[Registro][signin] El VIN ya ha sido registrado anteriormente');
              this.yaVIN();
            } else {
              // console.log('[Registro][signin] El VIN no ha sido registrado');
              // tslint:disable-next-line: max-line-length
              this.router2.navigate( ['/registro-salud', this.user.id_userfb, this.user.correo, this.user.password, this.user.nombre, this.user.apellido, this.user.edad, this.user.celular, conductor, propietario, this.user.motoClub, marca, submarca, modelo, motor, vin, cc, ciudad, placas, compania, poliza] );
            }

          }, ( error ) => {
            console.log(error);
            // this.userData = 'Este es el error: ' + error.toString();
            this.mal(error);
          });

      } else {
        console.log('Flag3: ' + this.flag3 + ' Flag4: ' + this.flag4);
        console.log('Hide3: ' + this.hide3 + ' Hide4: ' + this.hide4);
      }

    }
  }

  async presentPopover(ev: any, help: any) {
    if (help === 'conductor') {
      this.info = '¿Quién conducirá la moto?';
    } else if (help === 'propietario') {
      this.info = '¿Quién es el dueño de la moto?';
    } else if (help === 'motoclub') {
      this.info = '¿Pertences a algun Moto Club?';
    } else if (help === 'submarca') {
      this.info = '¿Qué submarca es tu moto?';
    } else if (help === 'modelo') {
      this.info = '¿Qué año es tu motocicleta?';
    } else if (help === 'motor') {
      this.info = '¿Cuál es el numero de motor de tu motocicleta?';
    } else if (help === 'vin') {
      this.info = 'Recuerda que el VIN se conforma por 17 caracteres';
    } else if (help === 'cc') {
      this.info = '¿De cuántos centimetros cúbico es tu motor?';
    } else if (help === 'compania') {
      this.info = '¿De qué compañia es tu seguro de la moto?';
    } else if (help === 'poliza') {
      this.info = 'Número de poliza de tu seguro';
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

  async yoConductor() {
    const toast = await this.toastController.create({
      message: 'Favor de llenar el nombre y apellido',
      duration: 4000,
      color: 'medium',
      position: 'bottom'
    });
    toast.present();
  }

  async yaVIN() {
    const toast = await this.toastController.create({
      message: 'El VIN ya ha sido registrado anteriormente',
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
