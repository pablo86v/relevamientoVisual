import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { ListPage } from './../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App) {

  }

  setType(parType){
     localStorage.setItem("imgType", parType);
    this.navCtrl.push(ListPage);
  }

}
