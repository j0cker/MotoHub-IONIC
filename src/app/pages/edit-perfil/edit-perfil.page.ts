import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  usuario: string;
  id_user: any;
  token: any;

  profile: any[] = [];
  i_nombre: any; i_apellido: any;

  nombre: any; apellido: any; edad: any; celular: any; motoClub: any;

  label = 'light';
  hide1 = true; hide2 = true;
  flag1: boolean; flag2: boolean;

  constructor(private dataService: DataService, private modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() {
    this.getPerfil();
  }

  getPerfil() {
    this.id_user = localStorage.getItem('idUsuario');
    this.token = localStorage.getItem('Token');
    console.log('[Dashboard][ngOnInit] Token: ' + this.token);
    console.log('[Dashboard][ngOnInit] ID Usuario: ' + this.id_user);

    this.dataService.getProfile(this.token, this.id_user )
      .subscribe( (data: any) => {
        // this.userData = data;
        // tslint:disable-next-line: triple-equals
        if (data.success == 'TRUE') {
          console.log('[Dashboard][getProfile]');
          this.profile = data.data[0];
          this.i_nombre = data.data[0].nombre.substr(0,1 );
          this.i_apellido = data.data[0].apellido.substr(0,1 );
        } else {
          // this.mal(data2.description);
          console.log('Error: ' + data.description);
        }

      }, ( error ) => {
        console.log(error);
        // this.userData = 'Este es el error: ' + error.toString();
        // this.mal(error);
      });
  }

  editPerfil(nombre: any, apellido: any, edad: any, celular: any, motoClub: any) {

    // tslint:disable-next-line: no-conditional-assignment
    // tslint:disable-next-line: max-line-length
    if ( nombre == undefined || nombre == '' || apellido == undefined || apellido == '' || edad == undefined || edad == '' || celular == undefined || celular == '') {
      this.completo();
      this.label = 'danger';
    } else {

      this.label = 'light';


      if (edad.length < 4) {
        this.hide1 = false;
        // console.log(this.hide);
        this.flag1 = false;
      } else {
        this.flag1 = true;
        this.hide1 = true;
      }
      if (celular.length < 10) {
        this.hide2 = false;
        // console.log(this.hide);
        this.flag2 = false;
      } else {
        this.flag2 = true;
        this.hide2 = true;
      }

      if (motoClub == '' || motoClub == undefined) {
        motoClub = 'N/A';
      }

      if (this.flag1 === true && this.flag2 === true) {
        console.log('Flag1:' + this.flag1 + ' Flag2: ' + this.flag2);
        console.log('Hide1:' + this.hide1 + ' Hide2: ' + this.hide2)

        this.dataService.updatePerfil(this.token, this.id_user, nombre, apellido, edad, celular, motoClub)
          .subscribe( (data2: any) => {

            // this.userData = data;
            // tslint:disable-next-line: triple-equals
            if (data2.success == 'TRUE') {
              // this.bien();
              console.log('Edit-Perfil][updatePerfil] Funciono API Update');
              this.cerrarModal();
              this.editComplete();
            } else {
              this.mal(data2.description);
              console.log('Error: ' + data2.description);
            }

          }, ( error ) => {
            console.log(error);
            // this.userData = 'Este es el error: ' + error.toString();
            this.mal(error);
          });

      } else {
        console.log('Flag1:' + this.flag1 + ' Flag2: ' + this.flag2);
        console.log('Hide1:' + this.hide1 + ' Hide2: ' + this.hide2);
      }

    }
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

  async completo() {
    const toast = await this.toastController.create({
      message: 'LLenar todos los campos obligatorio',
      duration: 4000,
      color: 'medium',
      position: 'bottom'
    });
    toast.present();
  }

  async editComplete() {
    const toast = await this.toastController.create({
      message: 'Se han actualizado los datos correctamente',
      duration: 4000,
      color: 'medium',
      position: 'bottom'
    });
    toast.present();
  }

  async yaCel() {
    const toast = await this.toastController.create({
      message: 'El celular ya ha sido registrado anteriormente',
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
