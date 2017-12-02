import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class ImagenesProvider {

  private observableLindo: FirebaseListObservable<any[]> = this.db.list('cosasLindas');
  private observableFeo: FirebaseListObservable<any[]> = this.db.list('cosasFeas');
  private usuario : string;
  private opcion: string;
  private observableGenerico: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) 
  {
    this.usuario = localStorage.getItem("usuario");
    this.opcion = localStorage.getItem("opcion");

    if(this.opcion == "lindas")
      this.observableGenerico = this.observableLindo;
    else
      this.observableGenerico = this.observableFeo;
  }

  public insertarImagenes(imgs: Array<any>)
  {
    console.log(imgs);
    console.log(this.opcion);
    console.log(this.observableGenerico);
    for(let i=0; i < imgs.length; i++)
    {
      this.observableGenerico.push(
        {
          imagen : imgs[i].img,
          usuario: this.usuario
        }
      );
    }
  }

  public devolverImagenes()
  {
    return this.observableGenerico;
  }

}
