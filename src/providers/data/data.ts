
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class DataProvider {

  private dbImagenes: FirebaseListObservable<any[]> = this.db.list('imagenes');
  private usuario : string;


  constructor(public http: Http, public db: AngularFireDatabase) {
    
  }


  public setItem(img,usuario) {
    this.dbImagenes.push({img:img,usuario:usuario});
  }


  
  public getItems() {
    this.dbImagenes = this.db.list('imagenes');
    return this.dbImagenes;
  }







}//class



