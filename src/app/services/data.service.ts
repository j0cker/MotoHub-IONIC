import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient, public toastController: ToastController) { }

  login(correo: string, password: string) {
    // tslint:disable-next-line: max-line-length
    console.log('DataService userPost');
    // tslint:disable-next-line: max-line-length
    return this.http.get('http://127.0.0.1:8000/api/usuarios/ingresar?correo=' + correo + '&password=' + password).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  userPost(correo: string, password: string, nombre: string, apellido: string, edad: string, celular: string, conductor: string, propietario: string, motoCLub: string, marca: string, submarca: string, modelo: string, motor: string, vin: string, cc: string, ciudad: string, placas: string, compania: string, poliza: string, seguro: string, sangre: string, alergia: string, organos: string, contactoEmergencia: string, parentezco: string, celContacto: string) {
    // tslint:disable-next-line: max-line-length
    console.log('DataService userPost');
    // tslint:disable-next-line: max-line-length
    return this.http.get('http://127.0.0.1:8000/api/usuarios/registrar?correo=' + correo + '&password=' + password + '&nombre=' + nombre + '&apellido=' + apellido + '&edad=' + edad + '&celular=' + celular + '&conductor=' + conductor + '&propietario=' + propietario + '&motoClub=' + motoCLub + '&marca=' + marca + '&submarca=' + submarca + '&modelo=' + modelo + '&motor=' + motor + '&vin=' + vin + '&cc=' + cc + '&ciudad=' + ciudad + '&placas=' + placas + '&compania=' + compania + '&poliza=' + poliza + '&seguro=' + seguro + '&sangre=' + sangre + '&alergia=' + alergia + '&organos=' + organos + '&contactoEmergencia=' + contactoEmergencia + '&parentezco=' + parentezco + '&celContacto=' + celContacto ).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  async alerta() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Emiliano mira ya entró',
      duration: 2000,
      position: 'top',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}