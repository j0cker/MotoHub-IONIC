import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificacion-password',
  templateUrl: './verificacion-password.page.html',
  styleUrls: ['./verificacion-password.page.scss'],
})
export class VerificacionPasswordPage implements OnInit {

  @Input() celular: any;
  code: any;

  // tslint:disable-next-line: max-line-length
  constructor(private router2: Router, private modalCtrl: ModalController, private dataService: DataService, public toastController: ToastController) { }

  ngOnInit() {
  }

  verify(code: any) {

    // tslint:disable-next-line: max-line-length
    if (code == '' || code == undefined) {
        this.completo();
    } else {
        console.log(this.code);
        console.log(this.celular);

        // tslint:disable-next-line: max-line-length
        this
            .dataService
            .verifyCode(this.code, this.celular)
            .subscribe((data: any) => {

                console.log('success: ' + data);
                // this.userData = data; tslint:disable-next-line: triple-equals
                if (data.success == 'TRUE') {
                  console.log('[Verify][Verify Code] Success: TRUE');
                  this.router2.navigate(['/recover-password', this.celular]);
                  this.cerrarModal();
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
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async completo() {
    const toast = await this.toastController.create({
      message: 'LLenar todos los campos',
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
