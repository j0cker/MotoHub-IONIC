import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController, IonSearchbar, AlertController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';

@Component({
  selector: 'app-registro-moto',
  templateUrl: './registro-moto.page.html',
  styleUrls: ['./registro-moto.page.scss'],
})
export class RegistroMotoPage implements OnInit {

  public isDisabled: boolean;
  user: any;
  correo: any;
  password: any;
  nombre: any;
  apellido: any;
  edad: any;
  celular: any;
  conductor: any;
  propietario: any;
  motoClub: any;
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
  info: any;

  // tslint:disable-next-line: max-line-length
  constructor( private router: ActivatedRoute, private router2: Router, private popoverController: PopoverController, public alertController: AlertController) {
    this.router.params.subscribe((params: any) => {
      console.log(params);
      this.user = params;
      this.correo = this.user.correo;
      this.password = this.user.password1;
    });
  }

  ngOnInit() {
  }

  seguro_change($event: any) {
    // console.log($event.detail.checked);
    // tslint:disable-next-line: triple-equals
    if ($event.detail.checked == 1) {
      this.isDisabled = false;
      // console.log('Esta prendido');
    } else {
      this.isDisabled = true;
      // console.log('Esta apagado');
    }
  }

  async presentPopover(ev: any, help: any) {
    if (help === 'conductor') {
      this.info = '¿Quién conduce la moto?';
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
      this.info = 'Número de serie o Vehicle Identification Number';
    } else if (help === 'cc') {
      this.info = '¿De cuántos centimetros cúbico es tu moto?';
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

  async yoCondcutor() {
    const alert = await this.alertController.create({
      header: 'Condcutor',
      message: '¿El conductor de esta motocicleta soy yo?',
      buttons: ['Cancel', 'Aceptar']
    });

    await alert.present();
  }

  // tslint:disable-next-line: max-line-length
  regMoto(nombre: any, apellido: any, edad: any, celular: any, conductor: any, propietario: any, motoClub: any, marca: any, submarca: any, modelo: any, motor: any, vin: any, cc: any, ciudad: any, placas: any, compania: any, poliza: any) {
    // tslint:disable-next-line: no-conditional-assignment
    if (this.isDisabled = true) {
      compania = 'N/A';
      poliza = 'N/A';
    }
    // tslint:disable-next-line: max-line-length
    this.router2.navigate( ['/registro-salud', this.correo, this.password, nombre, apellido, edad, celular, conductor, propietario, motoClub, marca, submarca, modelo, motor, vin, cc, ciudad, placas, compania, poliza] );
  }

}
