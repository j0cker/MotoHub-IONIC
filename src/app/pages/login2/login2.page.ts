import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {

  userData = null;
  correo: any;
  password: any;

  constructor( private dataService: DataService, private fb: Facebook, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  entrar(correo: any, password: any) {
    console.log('Email: ' + correo);
    console.log('Password: ' + password);

    this.dataService.login(correo, password)
    .subscribe( (data: any) => {

      console.log('[Login][Entrar] Data: ' + data);
      console.log('[Login][Entrar] success: ' + data.success);

      // this.userData = data;
      // tslint:disable-next-line: triple-equals
      if (data.success == 'TRUE') {
  
        console.log('[Login][Entrar] Token: ' + data.token);
        console.log('[Login][Entrar] Usuario: ' + data.data[0].id_usuarios);

        localStorage.setItem('idUsuario', data.data[0].id_usuarios);
        localStorage.setItem('Token', data.token);

        this.correo = '';
        this.password = '';

        this.router.navigate( ['/dashboard'] );
        // this.bien();
      } else {
        this.mal(data.description);
      }

    }, ( error ) => {
      console.log(error);
      this.userData = 'Este es el error: ' + error.toString();
      this.mal(error);
    });
  }

  loginWithFB() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).as(picture_large)', []).then(profile => {
        // tslint:disable-next-line: max-line-length
        this.userData = {email: profile.email, first_name: profile.first_name, picture: profile.picture_large.data.url, username: profile.name};
        this.router.navigate( ['/registro-moto'] );
        this.bien();
      });
    })
    .catch(e => console.log('Error logging into Facebook', e));

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
