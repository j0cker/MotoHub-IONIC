import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  info = null;

  constructor( private navParams: NavParams) {
    this.info = this.navParams.get('info');
    console.log(this.info);
   }

  ngOnInit() {
  }

}
