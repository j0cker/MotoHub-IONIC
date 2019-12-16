import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  user: any;

  // tslint:disable-next-line: max-line-length
  constructor(private router: ActivatedRoute, private router2: Router, public toastController: ToastController, private dataService: DataService) {
    this.router.params
      .subscribe((params : any) => {
          console.log(params);
          this.user = params;
      });
   }

  ngOnInit() {
  }

  recoverPass(newPassword: any, password: any) {
    if(newPassword == '' || newPassword == undefined || password == '' || password == undefined) {
      this.completo();
    } else {
      console.log('[Registro][signin] New Password: ' + newPassword);
      console.log('[Registro][signin] Password: ' + password);

      if (newPassword === password) {

        this.dataService.changePassword(this.user.celular, newPassword)
          .subscribe( (data: any) => {

          console.log('success: ' + data.success);
          // this.userData = data;
          // tslint:disable-next-line: triple-equals
          if (data.success == 'TRUE') {
            // Alertar que el correo ya ha sido registrado anteriormente
            console.log('[Registro][signin] La contraseña ha sido modificada');
            this.bien();
            this.router2.navigate( ['/inicio'] );
          } else {
            // Continuar registrando
            this.mal(data.description);
            console.log('Error: ' + data.description);
          }

          }, ( error ) => {
            console.log(error);
            // this.userData = 'Este es el error: ' + error.toString();
            this.mal(error);
          });

      } else {
        console.log('[Registro][signin] Las contraseñas no coinciden');
        this.malpass();
      }

    }
  }

  async completo() {
    const toast = await this.toastController.create({
      message: 'LLenar todos los campos',
      duration: 4000,
      color: 'medium',
      position: 'bottom',
    });
    toast.present();
  }

  async bien() {
    const toast = await this.toastController.create({
      message: 'La contraseña ha sido modificada',
      duration: 4000,
      color: 'medium',
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

  async malpass() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden',
      duration: 4000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }

}
