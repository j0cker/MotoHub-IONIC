import { Component, OnInit } from '@angular/core';
import { Componente } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuario: string;
  id_user: any;
  token: any;

  componentes: Componente[] = [];
  profile: any[] = [];
  i_nombre: any; i_apellido: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
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

}
