import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { tap } from 'rxjs/operators';
import { Componente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  api = 'http://motohub.boogapp.mx/api/';
  // api = 'http://127.0.0.1:8000/api/';

  constructor( private http: HttpClient, public toastController: ToastController) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getServicio() {
    return this.http.get<Componente[]>('/assets/data/servicios.json');
  }

  login(correo: string, password: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/ingresar?correo=' + correo + '&password=' + password).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  changePassword(celular: string, newPassword: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][changePassword]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/changePassword?celular=' + celular + '&password=' + newPassword).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  verificarCorreo(correo: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][VerificarCorreo]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/verificar?correo=' + correo).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  verificarFB(id_userfb: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][VerificarFB]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/verificarFB?id_userfb=' + id_userfb).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  verificarCelular(celular: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][verificarCelular]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/verificarCel?celular=' + celular).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  verificarVin(vin: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][verificarCelular]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/verificarVin?vin=' + vin).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  userPost(id_userfb: string, correo: string, password: string, nombre: string, apellido: string, edad: string, celular: string, conductor: string, propietario: string, motoCLub: string, marca: string, submarca: string, modelo: string, motor: string, vin: string, cc: string, ciudad: string, placas: string, compania: string, poliza: string, seguro: string, sangre: string, alergia: string, organos: string, contactoEmergencia: string, parentezco: string, celContacto: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/registrar?id_userfb=' + id_userfb + '&correo=' + correo + '&password=' + password + '&nombre=' + nombre + '&apellido=' + apellido + '&edad=' + edad + '&celular=' + celular + '&conductor=' + conductor + '&propietario=' + propietario + '&motoClub=' + motoCLub + '&marca=' + marca + '&submarca=' + submarca + '&modelo=' + modelo + '&motor=' + motor + '&vin=' + vin + '&cc=' + cc + '&ciudad=' + ciudad + '&placas=' + placas + '&compania=' + compania + '&poliza=' + poliza + '&seguro=' + seguro + '&sangre=' + sangre + '&alergia=' + alergia + '&organos=' + organos + '&contactoEmergencia=' + contactoEmergencia + '&parentezco=' + parentezco + '&celContacto=' + celContacto ).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  addMoto(id_usuarios: string, conductor: string, propietario: string, marca: string, submarca: string, modelo: string, motor: string, vin: string, cc: string, ciudad: string, placas: string, compania: string, poliza: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][addMoto]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/addMoto?id_usuarios=' + id_usuarios + '&conductor=' + conductor + '&propietario=' + propietario + '&marca=' + marca + '&submarca=' + submarca + '&modelo=' + modelo + '&motor=' + motor + '&vin=' + vin + '&cc=' + cc + '&ciudad=' + ciudad + '&placas=' + placas + '&compania=' + compania + '&poliza=' + poliza).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  updateSalud(token: string, id_user: string, seguro: string, sangre: string, alergia: string, organos: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/updateSalud?token=' + token + '&id_user=' + id_user + '&seguro=' + seguro + '&sangre=' + sangre + '&alergia=' + alergia + '&organos=' + organos).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  updatePerfil(token: string, id_user: string, nombre: string, apellido: string, edad: string, celular: string, motoCLub: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/updatePerfil?token=' + token + '&id_user=' + id_user + '&nombre=' + nombre + '&apellido=' + apellido + '&edad=' + edad + '&celular=' + celular + '&motoClub=' + motoCLub).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  updateMoto(token: string, id_user: string, motor: any, placas: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/updateMoto?token=' + token + '&id_user=' + id_user + '&motor=' + motor + '&placas=' + placas).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  // tslint:disable-next-line: max-line-length
  updateSeguro(token: string, id_user: string, compania: any, poliza: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/updateSeguro?token=' + token + '&id_user=' + id_user + '&compania=' + compania + '&poliza=' + poliza).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  deleteMoto(token: string, id_user: string, vin: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][userPost]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/deleteMoto?token=' + token + '&id_user=' + id_user + '&vin=' + vin).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  getProfile(token: string, id_user: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][getProfile] Data Services');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/getProfile?token=' + token + '&id_user=' + id_user).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  getMotos(token: string, id_user: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][getMotos] Data Services');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/getMotos?token=' + token + '&id_user=' + id_user).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  getContactemerg(token: string, id_user: string) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][getContactemerg]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/getContactemerg?token=' + token + '&id_user=' + id_user).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  sendSMS(celular: any) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][verifyCode]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/enviarsms?celular=' + celular).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  verifyCode(code: any, celular: any) {
    // tslint:disable-next-line: max-line-length
    console.log('[DataService][verifyCode]');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.api + 'usuarios/verifyCode?code=' + code + '&celular=' + celular).pipe(
      tap( data => {
        console.log(data);
      })
    );
  }


}