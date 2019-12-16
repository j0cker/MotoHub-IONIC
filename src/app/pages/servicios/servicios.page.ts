import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  servicio: Observable<Servicio[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.servicio = this.dataService.getServicio();
  }


}
