import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {ToastController} from '@ionic/angular';

@Component(
    {selector: 'app-verificacion', templateUrl: './verificacion.page.html', styleUrls: ['./verificacion.page.scss']}
)
export class VerificacionPage implements OnInit {


    code: any;
    user: any;

    // tslint:disable-next-line: max-line-length
    constructor(
        private router : ActivatedRoute,
        private router2 : Router,
        private dataService : DataService,
        public toastController : ToastController
    ) {
        this
            .router
            .params
            .subscribe((params : any) => {
                console.log(params);
                this.user = params;
            });
    }

    ngOnInit() {}

    verify(code: any) {

        // tslint:disable-next-line: max-line-length
        if (code == '' || code == undefined) {
            this.completo();
        } else {
            console.log(this.code);
            console.log(this.user.celular);

            // tslint:disable-next-line: max-line-length
            this
                .dataService
                .verifyCode(this.code, this.user.celular)
                .subscribe((data : any) => {

                    console.log('success: ' + data);
                    // this.userData = data; tslint:disable-next-line: triple-equals
                    if (data.success == 'TRUE') {
                        console.log('[Verify][Verify Code]');

                        // tslint:disable-next-line: max-line-length
                        this.dataService.userPost(
                                this.user.id_userfb,
                                this.user.correo,
                                this.user.password,
                                this.user.nombre,
                                this.user.apellido,
                                this.user.edad,
                                this.user.celular,
                                this.user.conductor,
                                this.user.propietario,
                                this.user.motoClub,
                                this.user.marca,
                                this.user.submarca,
                                this.user.modelo,
                                this.user.motor,
                                this.user.vin,
                                this.user.cc,
                                this.user.ciudad,
                                this.user.placas,
                                this.user.compania,
                                this.user.poliza,
                                this.user.seguro,
                                this.user.sangre,
                                this.user.alergia,
                                this.user.organos,
                                this.user.contactoEmergencia,
                                this.user.parentezco,
                                this.user.celContacto
                            )
                            .subscribe((data2 : any) => {

                                console.log('[Verify][UserPost] Data: ' + data2);
                                console.log('[Verify][UserPost] success: ' + data2.success);
                                console.log('[Verify][UserPost] Token: ' + data2.token);
                                console.log('[Verify][UserPost] Usuario: ' + data2.data[0].id);

                                localStorage.setItem('idUsuario', data2.data[0].id);
                                localStorage.setItem('Token', data2.token);
                                // this.userData = data; tslint:disable-next-line: triple-equals
                                if (data2.success == 'TRUE') {
                                    this
                                        .router2
                                        .navigate(['/dashboard']);
                                    this.bien();
                                    console.log('[Verify][UserPost]');
                                } else {
                                    this.mal(data2.description);
                                    console.log('Error: ' + data2.description);
                                }

                            }, (error) => {
                                console.log('Error: ' + error);
                                // this.userData = 'Este es el error: ' + error.toString();
                                this.mal(error);
                            });

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

    resendSMS() {
    this.dataService.sendSMS(this.user.celular)
      .subscribe((data: any) => {

          console.log('success: ' + data.success);
          // this.userData = data;
          // tslint:disable-next-line: triple-equals
          if (data.success == 'TRUE') {
              this.resend();
              console.log('Se reenvio SMS');

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

    async resend() {
        const toast = await this.toastController.create({
          message: 'Se reenvió código de verificación',
          duration: 4000,
          color: 'dark',
          position: 'bottom'
        });
        toast.present();
    }

    async completo() {
        const toast = await this
            .toastController
            .create(
                {message: 'LLenar todos los campos', duration: 4000, color: 'medium', position: 'bottom'}
            );
        toast.present();
    }

    async bien() {
        const toast = await this
            .toastController
            .create(
                {message: 'Usuario registrado con éxito', duration: 4000, color: 'medium', position: 'bottom'}
            );
        toast.present();
    }

    async mal(msj : any) {
        const toast = await this
            .toastController
            .create({message: msj, duration: 4000, color: 'danger', position: 'bottom'});
        toast.present();
    }

}
