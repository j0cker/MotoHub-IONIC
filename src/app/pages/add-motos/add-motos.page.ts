import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-motos',
  templateUrl: './add-motos.page.html',
  styleUrls: ['./add-motos.page.scss'],
})
export class AddMotosPage implements OnInit {

  @Input() propietario: any;
  @Input() conductor: any;

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

  isDisabled: boolean;
  info: any;
  hide = true;
  label = 'light'; label2 = 'light';
  flag: boolean;
  disabled = true;

  usuario: string;
  id_user: any;
  token: any;

  // tslint:disable-next-line: max-line-length
  constructor(private dataService: DataService, private modalCtrl: ModalController, private popoverController: PopoverController, public toastController: ToastController) { }

  ngOnInit() {
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
  addMotos(conductor: any, propietario: any, marca: any, submarca: any, modelo: any, motor: any, vin: any, cc: any, ciudad: any, placas: any, compania: any, poliza: any) {
    this.id_user = localStorage.getItem('idUsuario');
    this.token = localStorage.getItem('Token');
    console.log('[Dashboard][ngOnInit] Token: ' + this.token);
    console.log('[Dashboard][ngOnInit] ID Usuario: ' + this.id_user);

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
        this.hide = false;
        // console.log(this.hide);
        this.flag = false;
      } else {
        this.flag = true;
        this.hide = true;
      }
      if (motor == '' || motor == undefined) {
        motor = 'N/A';
      }

      if (this.flag === true) {
        console.log('Flag: ' + this.flag);
        console.log('Hide: ' + this.hide);
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
              this.dataService.addMoto( this.id_user, conductor, propietario, marca, submarca, modelo, motor, vin, cc, ciudad, placas, compania, poliza)
              .subscribe((data2: any) => {

                console.log('[Verify][UserPost] Data: ' + data2);
                console.log('[Verify][UserPost] success: ' + data2.success);
                console.log('[Verify][UserPost] Token: ' + data2.token);
                console.log('[Verify][UserPost] ID Usuario: ' + data2.data[0].id);

                // this.userData = data; tslint:disable-next-line: triple-equals
                if (data2.success == 'TRUE') {
                    // this.bien();
                    console.log('[Verify][AddMoto] Se registro la nueva moto correctamente');
                    this.newMoto();
                    this.cerrarModal();
                } else {
                    this.mal(data2.description);
                    console.log('Error: ' + data2.description);
                }

            }, (error) => {
                console.log('Error: ' + error);
                // this.userData = 'Este es el error: ' + error.toString();
                this.mal(error);
            });

            }

          }, ( error ) => {
            console.log(error);
            // this.userData = 'Este es el error: ' + error.toString();
            this.mal(error);
          });

      } else {
        // console.log('Flag3: ' + this.flag3 + ' Flag4: ' + this.flag4);
        // console.log('Hide3: ' + this.hide3 + ' Hide4: ' + this.hide4);
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

  async yaVIN() {
    const toast = await this.toastController.create({
      message: 'El VIN ya ha sido registrado anteriormente',
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

  async newMoto() {
    const toast = await this.toastController.create({
      message: 'Se ha registrado una nueva moto',
      duration: 4000,
      color: 'medium',
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

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
