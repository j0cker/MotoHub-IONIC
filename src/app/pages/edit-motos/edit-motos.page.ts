import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-motos',
  templateUrl: './edit-motos.page.html',
  styleUrls: ['./edit-motos.page.scss'],
})
export class EditMotosPage implements OnInit {

  id_user: any;
  token: any;
  disabled = true;

  motos: any[] = [];

  motor: any; placas: any;

  hide3 = true; hide4 = true;
  label = 'medium'; label2 = 'dark';

  constructor(private dataService: DataService, private modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() {
    this.getPerfil();
  }

  getPerfil() {
    this.id_user = localStorage.getItem('idUsuario');
    this.token = localStorage.getItem('Token');
    console.log('[Dashboard][ngOnInit] Token: ' + this.token);
    console.log('[Dashboard][ngOnInit] ID Usuario: ' + this.id_user);

    this.dataService.getMotos(this.token, this.id_user )
    .subscribe( (data: any) => {
      // this.userData = data;
      // tslint:disable-next-line: triple-equals
      if (data.success == 'TRUE') {
        console.log('[Dashboard][getMotos]');
        this.motos = data.data[0];
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

  editMotos(motor: any, placas: any) {
    // tslint:disable-next-line: no-conditional-assignment
    // tslint:disable-next-line: max-line-length
    if ( placas == undefined || placas == '') {
      this.completo();
      this.label = 'danger';
    } else {

      this.label = 'light';

      if (motor == '' || motor == undefined) {
        motor = 'N/A';
      }

      this.dataService.updateMoto(this.token, this.id_user, motor, placas)
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

    }
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

}
