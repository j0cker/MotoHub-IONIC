import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  correo: any;
  password1: any;
  password2: any;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  signin(correo: any, password1: any, password2: any) {
    const control = new FormControl(correo, Validators.email);

    console.log('correo: ' + correo);
    console.log('pass1: ' + password1);
    console.log('pass2: ' + password2);

    console.log(control.errors); // {email: true}
    // tslint:disable-next-line: no-conditional-assignment
    if (control.errors == null) {
      // tslint:disable-next-line: triple-equals
        console.log('Busco');
        if (password1 === password2) {
          this.router.navigate( ['/registro-moto', correo, password1] );
        } else {
          console.log('Ocurrio un error');
        }
    // tslint:disable-next-line: triple-equals
    } else if (control.errors.email == true) {
      console.log('Ingresar un email válido');
    }
    // console.log($event.detail.checked);
    // tslint:disable-next-line: triple-equals
  }

}
