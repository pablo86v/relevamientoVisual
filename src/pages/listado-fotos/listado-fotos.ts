import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

declare var jQuery:any;
declare var $:any;


@IonicPage()
@Component({
  selector: 'page-listado-fotos',
  templateUrl: 'listado-fotos.html',
})
export class ListadoFotosPage {

  //@param puede ser lindas o feas
  private arrFotos = [];
  private arrFotosSubir = [];
  private estilo;
  private image: string = null;
  private id = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera,
              private imagenesProvider: ImagenesProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let fotoTraida = this.navParams.get('foto');
    this.arrFotos.push({"id": this.id.toString(), "imagen": fotoTraida});
  }

  private getPicture(){
    this.estilo = "animated pulse";
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.id++;
      this.arrFotos.push({"id":this.id.toString(), "imagen":this.image});
    })
    .catch(error =>{
      console.error( error );
    });
  }


  private seleccionar(i, img)
  {
    //Agrego la foto seleccionada (la variable i indica la posicion actual en el array de fotos) al array de fotos a subir
    let encontrado = false;
    let indiceEncontrado;
    let indiceArray;
    console.log("Indice del html: " + i);
    for(let i=0; i<this.arrFotosSubir.length; i++)
    {
      if(this.arrFotosSubir[i].img == img)
      {
        encontrado = true;
        indiceEncontrado = this.arrFotosSubir[i].id;
        indiceArray = i;
      }
    }
    console.log("Se encontrò: " + encontrado);

    if(!encontrado)
    {
      this.arrFotosSubir.push({id:i,img:img});
      $(`#${i}`).css({
        "border": "4px solid blue"
      })
    }
    else
    {
      console.log("Indice encontrado: " + indiceEncontrado);
      this.arrFotosSubir.splice(indiceArray,1);
      $(`#${indiceEncontrado}`).css({
        "border": "2px solid white"
      })
    }
  }

  private subirImagenes()
  {
    if(this.arrFotosSubir.length != 0)
    {
      this.imagenesProvider.insertarImagenes(this.arrFotosSubir);
      this.arrFotosSubir = [];
  
      let loader = this.loadingCtrl.create({
        content: "Guardando imàgenes...",
      });
      loader.present();
  
      setTimeout(()=> 
      {
        this.navCtrl.push(MenuPage);
        this.toastCtrl.create({
          message: '¡Imàgenes guardadas satisfactoriamente!',
          duration: 3000
        }).present();
        loader.dismiss();
      },3000);
    }
    else
    {
      this.toastCtrl.create({
        message: 'No se ha seleccionado ninguna imagen',
        duration: 3000
      }).present();
    }

  }

}
