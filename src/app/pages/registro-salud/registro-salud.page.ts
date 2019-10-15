import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastController, PopoverController, AlertController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';
import { empty, EmptyError } from 'rxjs';


@Component({
  selector: 'app-registro-salud',
  templateUrl: './registro-salud.page.html',
  styleUrls: ['./registro-salud.page.scss'],
})
export class RegistroSaludPage implements OnInit {

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
  seguro: any;
  sangre: any;
  alergia: any;
  organos: any;
  contactoEmergencia: any;
  parentezco: any;
  celContacto: any;
  info: any;

  // tslint:disable-next-line: max-line-length
  constructor( private router: ActivatedRoute, private router2: Router, private dataService: DataService, public toastController: ToastController, private popoverController: PopoverController, public alertController: AlertController) {
    this.router.params.subscribe((params: any) => {
      console.log(params);
      this.user = params;
    });
  }

  ngOnInit() {
  }

  registro2(seguro: any, sangre: any, alergia: any, organos: any, contactoEmergencia: any, parentezco: any, celContacto: any) {
    console.log("[Registro Salud][registro2] alergia: " + alergia);
    if (seguro == undefined || seguro == '' || alergia == undefined || alergia == '') {
      console.log('Alergia vacia');
    } else {
      console.log('Fallo prueba');

    }
  }

  registro(seguro: any, sangre: any, alergia: any, organos: any, contactoEmergencia: any, parentezco: any, celContacto: any) {

    // tslint:disable-next-line: max-line-length
    this.dataService.userPost(this.user.correo, this.user.password, this.user.nombre, this.user.apellido, this.user.edad, this.user.celular, this.user.conductor, this.user.propietario, this.user.motoClub, this.user.marca, this.user.submarca, this.user.modelo, this.user.motor, this.user.vin, this.user.cc, this.user.ciudad, this.user.placas, this.user.compania, this.user.poliza, seguro, sangre, alergia, organos, contactoEmergencia, parentezco, celContacto )
    .subscribe( (data: any) => {

      console.log('success: ' + data.success);
      // this.userData = data;
      // tslint:disable-next-line: triple-equals
      if (data.success == 'TRUE') {
         this.router2.navigate( ['/dashboard'] );
         this.bien();
         console.log('Funciono API');
      } else {
         this.mal(data.description);
         console.log('Error: ' + data.description);
      }

    }, ( error ) => {
      console.log(error);
      // this.userData = 'Este es el error: ' + error.toString();
      this.mal(error);
    });

  }

  async bien() {
    const toast = await this.toastController.create({
      header: 'Mensaje',
      message: 'Usuario registrado con éxito',
      duration: 4000,
      color: 'success',
      position: 'bottom',
      /*buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]*/
    });
    toast.present();
  }

  async mal(msj: any) {
    const toast = await this.toastController.create({
      header: 'Mensaje',
      message: msj,
      duration: 4000,
      color: 'danger',
      position: 'bottom',
      /*buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]*/
    });
    toast.present();
  }

  async presentPopover(ev: any, help: any) {
    if (help === 'seguro') {
      this.info = '¿Cuál es el número de tu seguro social en caso de necesitarlo?';
    } else if (help === 'alergia') {
      this.info = '¿Tienes alguna alergía? En caso de no dejarlo en blanco';
    } else if (help === 'contactoEmergencia') {
      this.info = 'En caso de necesitarlo, ¿A quién podemos contactar?';
    } else if (help === 'parentezco') {
      this.info = '¿Qués es de tí esta persona?';
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

}
