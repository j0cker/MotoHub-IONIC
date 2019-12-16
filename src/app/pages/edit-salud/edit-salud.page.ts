import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-salud',
  templateUrl: './edit-salud.page.html',
  styleUrls: ['./edit-salud.page.scss'],
})
export class EditSaludPage implements OnInit {

  usuario: string;
  id_user: any;
  token: any;

  profile: any[] = [];
  i_nombre: any; i_apellido: any;

  seguro: any;
  sangre: any;
  alergia: any;
  organos: any;
  flag1: boolean; 
  label = 'light';
  hide1 = true; hide2 = true;

  constructor(private dataService: DataService, private modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() {
    this.getPerfil();
  }

  editSalud(seguro: any, sangre: any, alergia: any, organos: any) {

    console.log('[EditSalud][EditSalud]');
    // tslint:disable-next-line: max-line-length
    if (organos == undefined || organos == '') {
      this.completo();
      this.label = 'danger';
    } else {

      this.label = 'light';

      if(seguro == undefined || seguro == '' ) {
        seguro = '';
      }
      if (sangre == undefined || sangre == '') {
        sangre = '';
      }
      if (alergia == undefined || alergia == '') {
        alergia = '';
      }

      this.dataService.updateSalud(this.token, this.id_user, this.seguro, this.sangre, this.alergia, this.organos)
      .subscribe( (data2: any) => {

        // this.userData = data;
        // tslint:disable-next-line: triple-equals
        if (data2.success == 'TRUE') {
          // this.bien();
          console.log('Edit-Salud][UpdateSalud] Funciono API Update');
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

  cerrarModal() {
    this.modalCtrl.dismiss();
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
          console.log('[Dashboard][getProfile] True');
          this.profile = data.data[0];
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

}
