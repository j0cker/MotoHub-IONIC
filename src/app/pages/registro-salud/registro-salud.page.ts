import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {ToastController, PopoverController, ModalController} from '@ionic/angular';
import {PopinfoComponent} from '../../components/popinfo/popinfo.component';
import {empty, EmptyError} from 'rxjs';
import {TerminosPage} from '../terminos/terminos.page';

@Component(
    {selector: 'app-registro-salud', templateUrl: './registro-salud.page.html', styleUrls: ['./registro-salud.page.scss']}
)
export class RegistroSaludPage implements OnInit {

    user: any;
    id_userfb: any;
    correo: any;
    password: any;
    nombre: any;
    apellido: any;
    edad: any;
    celular: any;
    conductor: any;
    propietario: any;
    motoClub: any;
    marca: any;
    submarca: any;
    modelo: any;
    motor: any;
    vin: any;
    cc: any;
    ciudad: any;
    placas: any;
    compania: any;
    poliza: any;
    seguro: any;
    sangre: any;
    alergia: any;
    organos: any;
    contactoEmergencia: any;
    parentezco: any;
    celContacto: any;
    info: any;
    public hide1 = true;
    label = 'light';
    label2 = 'light';
    flag1: boolean;
    checkTerminos: boolean;

    // tslint:disable-next-line: max-line-length
    constructor(
        private router: ActivatedRoute,
        private router2: Router,
        private dataService: DataService,
        public toastController: ToastController,
        private popoverController: PopoverController,
        private modalCtrl: ModalController
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

    async terminos() {
        console.log('Entro a terminos y condiciones');

        const modal = await this
            .modalCtrl
            .create({component: TerminosPage});

        await modal.present();
    }

    terminos_change($event: any) {
        // console.log($event.detail.checked); tslint:disable-next-line: triple-equals
        if ($event.detail.checked == 1) {
            // console.log('Esta prendido');
            this.checkTerminos = true;
        } else {
            // console.log('Esta apagado');
            this.checkTerminos = false;
        }
    }

    registro(
        seguro : any,
        sangre : any,
        alergia : any,
        organos : any,
        contactoEmergencia : any,
        parentezco : any,
        celContacto : any
    ) {

        console.log('[RegistroSalud][Registro]');
        // tslint:disable-next-line: max-line-length
        if (organos == undefined || organos == '' || contactoEmergencia == undefined || contactoEmergencia == '' || parentezco == undefined || parentezco == '' || celContacto == undefined || celContacto == '') {
            this.completo();
            this.label = 'danger';
        } else {

            this.label = 'light';

            if (seguro == undefined || seguro == '') {
                seguro = '';
            }
            if (sangre == undefined || sangre == '') {
                sangre = '';
            }
            if (alergia == undefined || alergia == '') {
                alergia = '';
            }

            if (celContacto.length < 10) {

                this.hide1 = false;
                // console.log(this.hide);
                this.flag1 = false;
            } else {
                this.hide1 = true;
                this.flag1 = true;
            }

            if (this.flag1 === true) {
                if (this.checkTerminos === true) {

                    this.dataService.sendSMS(this.user.celular)
                        .subscribe((data : any) => {

                            console.log('success: ' + data.success);
                            // this.userData = data; tslint:disable-next-line: triple-equals
                            if (data.success == 'TRUE') {
                                // this.router2.navigate( ['/dashboard'] ); tslint:disable-next-line:
                                // max-line-length
                                this.router2.navigate([
                                        '/verificacion',
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
                                        seguro,
                                        sangre,
                                        alergia,
                                        organos,
                                        contactoEmergencia,
                                        parentezco,
                                        celContacto
                                    ]);
                                // this.bien();
                                console.log('Funciono API Send SMS');

                            } else {
                                this.mal(data.description);
                                console.log('Error: ' + data.description);
                            }

                        }, (error) => {
                            console.log(error);
                            // this.userData = 'Este es el error: ' + error.toString();
                            this.mal(error);
                        });

                } else {
                    this.label2 = 'danger';
                }
            }

        }

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

    async completo() {
        const toast = await this
            .toastController
            .create(
                {message: 'LLenar todos los campos obligatorio', duration: 4000, color: 'medium', position: 'bottom'}
            );
        toast.present();
    }

    async presentPopover(ev : any, help : any) {
        if (help === 'seguro') {
            this.info = '¿Cuál es el número de tu seguro social en caso de necesitarlo?';
        } else if (help === 'alergia') {
            this.info = '¿Tienes alguna alergía? En caso de no dejarlo en blanco';
        } else if (help === 'contactoEmergencia') {
            this.info = 'En caso de necesitarlo, ¿A quién podemos contactar?';
        } else if (help === 'parentezco') {
            this.info = '¿Qués es de tí esta persona?';
        }
        const popover = await this
            .popoverController
            .create({
                component: PopinfoComponent,
                componentProps: {
                    info: this.info
                },
                mode: 'ios',
                event: ev,
                translucent: true
            });
        // console.log(ev);
        return await popover.present();
    }

}
