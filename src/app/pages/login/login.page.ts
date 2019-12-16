import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = null;
  password1 = 'N/A';

  constructor( private fb: Facebook, public toastController: ToastController, private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  loginWithFB() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).as(picture_large)', []).then(profile => {
        // tslint:disable-next-line: max-line-length
        this.userData = {id_userfb: profile.id, correo: profile.email, first_name: profile.first_name, last_name: profile.last_name, middle_name: profile.middle_name, username: profile.name, name_format: profile.name_format, picture: profile.picture_large.data.url};
        console.log(this.userData);

        // Verificar si el correo ya ha sido registrado anteriormente
        // tslint:disable-next-line: max-line-length
        this.dataService.verificarFB(this.userData.id_userfb)
        .subscribe( (data: any) => {

        console.log('success: ' + data.success);
        // this.userData = data;
        // tslint:disable-next-line: triple-equals
        // Si ya existe un usuario registrado anteriormente...
        if (data.success == 'TRUE') {
          // Alertar que el correo ya ha sido registrado anteriormente
          this.bien();
          this.router.navigate( ['/dashboard'] );
        } else if (data.success == 'FALSE') {
          // Continuar registrando
          this.router.navigate( ['/registro-moto', this.userData.id_userfb, this.userData.correo, this.password1 ] );
          this.noFB();
        }

        }, ( error ) => {
          console.log(error);
          // this.userData = 'Este es el error: ' + error.toString();
          this.mal(error);
        });
      });
    })
    .catch(e => {
      this.mal(e);
      console.log('Error logging into Facebook', e);
    });

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }


  async bien() {
    const toast = await this.toastController.create({
      message: 'Sesión iniciada con Facebook',
      duration: 4000,
      color: 'medium',
      position: 'bottom'
    });
    toast.present();
  }

  async noFB() {
    const toast = await this.toastController.create({
      message: 'El usuario aun no ha sido registrado, favor de registrar su motocicleta',
      duration: 4000,
      color: 'danger',
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
