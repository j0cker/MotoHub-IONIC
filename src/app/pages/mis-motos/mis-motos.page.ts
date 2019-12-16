import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Componente } from '../../interfaces/interfaces';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { EditMotosPage } from '../edit-motos/edit-motos.page';
import { EditSeguroPage } from '../edit-seguro/edit-seguro.page';
import { AddMotosPage } from '../add-motos/add-motos.page';

@Component({
  selector: 'app-mis-motos',
  templateUrl: './mis-motos.page.html',
  styleUrls: ['./mis-motos.page.scss'],
})
export class MisMotosPage implements OnInit {

  id_user: any;
  token: any;

  componentes: Componente[] = [];
  profile: any[] = []; motos: any[] = []; newMoto: any[] = [];
  propietario: any; conductor: any; vin: any;
  i_nombre: any; i_apellido: any;
  color = '#ccc';

  // tslint:disable-next-line: max-line-length
  constructor(private dataService: DataService, private modalCtrl: ModalController, public toastController: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getMisMotos();
  }

  getMisMotos() {
    this.id_user = localStorage.getItem('idUsuario');
    this.token = localStorage.getItem('Token');
    console.log('[Dashboard][ngOnInit] Token: ' + this.token);
    console.log('[Dashboard][ngOnInit] ID Usuario: ' + this.id_user);

    this.dataService.getProfile(this.token, this.id_user )
      .subscribe( (data: any) => {
        // this.userData = data;
        // tslint:disable-next-line: triple-equals
        if (data.success == 'TRUE') {
          // console.log('[Dashboard][getProfile]');
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

    this.dataService.getMotos(this.token, this.id_user )
    .subscribe( (data: any) => {
      this.propietario = data.data[0].propietario;
      this.conductor = data.data[0].conductor;
      this.vin = data.data[0].vin;
      // console.log(data.data);
      // this.userData = data;
      // tslint:disable-next-line: triple-equals
      if (data.success == 'TRUE') {
        this.newMoto = data.data;
        console.log(this.newMoto);
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

  deleteMoto(vin: any) {
    console.log('[Mis Motos][DeleteMoto] Vin: ' + vin);

    this.dataService.deleteMoto(this.token, this.id_user, vin)
    .subscribe( (data: any) => {
      // this.userData = data;
      // tslint:disable-next-line: triple-equals
      if (data.success == 'TRUE') {
        console.log('[Dashboard][deleteMoto]');
        this.delete();
        this.getMisMotos();
      } else {
        this.mal(data.description);
        console.log('Error: ' + data.description);
      }

    }, ( error ) => {
      console.log(error);
      // this.userData = 'Este es el error: ' + error.toString();
      // this.mal(error);
    });

  }

  async deleteMotoAlert(vin: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: 'Estas seguro que deseas eliminar la moto con VIN: ' + vin + '?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteMoto(vin);
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
    console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');
      this.getMisMotos();
      event.target.complete();
    }, 2000);
  }

  async addMotos() {
    const modal = await this.modalCtrl.create({
      component: AddMotosPage,
      componentProps: {
        propietario: this.propietario,
        conductor: this.conductor
      }
    });

    await modal.present();
}

  async editMotos() {
    const modal = await this.modalCtrl.create({
      component: EditMotosPage
    });

    await modal.present();
  }

  async editSeguro() {
    const modal = await this.modalCtrl.create({
      component: EditSeguroPage
    });

    await modal.present();
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

  async delete() {
    const toast = await this.toastController.create({
      message: 'Se ha eliminado la motocicleta',
      duration: 4000,
      color: 'medium',
      position: 'bottom',
    });
    toast.present();
  }

}
