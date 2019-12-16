import { Component, OnInit } from '@angular/core';
import { Componente } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { EditPerfilPage } from '../edit-perfil/edit-perfil.page';
import { ModalController } from '@ionic/angular';
import { EditSaludPage } from '../edit-salud/edit-salud.page';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: string;
  id_user: any;
  token: any;

  componentes: Componente[] = [];
  profile: any[] = [];
  i_nombre: any; i_apellido: any;

  constructor(private dataService: DataService, private router: Router, private modalCtrl: ModalController) { }

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

  doRefresh(event: { target: { complete: () => void; }; }) {
    console.log('Begin async operation');

    setTimeout(() => {
      // console.log('Async operation has ended');
      this.getPerfil();
      event.target.complete();
    }, 2000);
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: EditPerfilPage
    });

    await modal.present();
  }

  async editSalud() {
    const modal = await this.modalCtrl.create({
      component: EditSaludPage
    });

    await modal.present();
  }

}
