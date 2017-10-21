import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
//Providers
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  arrItems : any[];
  image: string = null;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl:
    App, public data: DataProvider,private camera: Camera,) {
   
  }

   getPicture(){
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
      this.guardarImagen(this.image);
    })
    .catch(error =>{
      console.error( error );
    });
  }

  traerImagenes() {
    this.data.getItems().subscribe(
      data => {
        this.arrItems = data;
      },
      err => console.error(err),
      () => console.log(this.arrItems)
    );
  }

  guardarImagen(img)
  {
    if (this.arrItems.length > 0){
    this.data.setItem(img,localStorage.getItem("usuario"));
    
    }
  }

}//class
