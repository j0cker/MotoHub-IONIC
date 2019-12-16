import { Component, OnInit } from '@angular/core';
import { VerificacionPasswordPage } from '../verificacion-password/verificacion-password.page';
import { ToastController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  celular: any;

  label = 'dark';

  flag1: boolean; hide1 = true;

  constructor(private modalCtrl: ModalController, private dataService: DataService, public toastController: ToastController) { }

  ngOnInit() {
  }

  async recoverPassword(celular: any) {
    // console.log('Entro a terminos y condiciones');

    if (celular === '' || celular === undefined) {
      this.completo();
      this.label = 'danger';
    } else {
      this.label = 'medium';

      if (celular.length < 10) {
        this.flag1 = false;
        this.hide1 = false;
      } else {
        this.flag1 = true;
        this.hide1 = true;

        this.sendSMS();

        const modal = await this.modalCtrl.create({
          component: VerificacionPasswordPage,
          componentProps: {
            celular: this.celular
          }
        });

        await modal.present();
      }
    }

  }

  sendSMS() {
    this.dataService.sendSMS(this.celular)
      .subscribe((data: any) => {

          console.log('success: ' + data.success);
          // this.userData = data; tslint:disable-next-line: triple-equals
          if (data.success == 'TRUE') {
              // this.router2.navigate( ['/dashboard'] ); tslint:disable-next-line:
              console.log('Funciono API Send SMS');

          } else {
              this.mal(data.description);
              console.log('Error: ' + data.description);
          }

      }, (error) => {
          console.log(error);
          // this.userData = 'Este es el error: ' + error.toString();
          this.mal(error);
      });
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
      position: 'bottom'
    });
    toast.present();
  }

}
