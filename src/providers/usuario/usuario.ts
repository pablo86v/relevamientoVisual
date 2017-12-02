import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UsuarioProvider {

  private usuarioObservable : FirebaseListObservable<any[]> = this.db.list('/usuario');

  constructor(private db: AngularFireDatabase) {
  }

  public getUsuarios()
  {
    return this.usuarioObservable;
  }

}
