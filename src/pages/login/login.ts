import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Menu0Page } from '../menu0/menu0';
import { MostrarImagenesPage } from '../mostrar-imagenes/mostrar-imagenes';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private arrUsuarios : Array<any> = [];
  private loading;
  private actionSheet;

  private usuario: string;
  private contrasenia: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private usuarioProvider: UsuarioProvider,
              private loadingCtrl: LoadingController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    this.createLoading("Estableciendo conexión con la BD...");
    this.loading.present();
    this.traerUsuariosFB();
  }

  private traerUsuariosFB()
  {
    this.usuarioProvider.getUsuarios().subscribe(
      data => 
      {
        this.arrUsuarios = data;
        this.loading.dismiss();
        console.log(this.arrUsuarios);
      },
      err => console.error(err)
    )
  }

  private ingresar() {
    let usuarioEncontrado = false;
    for(let i=0 ; i<this.arrUsuarios.length; i++)
    {
      if(this.usuario == this.arrUsuarios[i].nombre && this.contrasenia == this.arrUsuarios[i].clave)
      {
        usuarioEncontrado = true;
        this.createLoading("Por favor espere...");
        localStorage.setItem("usuario",this.usuario);
        this.loading.present();
        setTimeout(()=> {
          this.navCtrl.push(Menu0Page);
        }, 1000);
        setTimeout(()=> {
          this.loading.dismiss();
        }, 3000);
        
      }
    }
    if(usuarioEncontrado == false)
    {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Usuario invàlido, intente nuevamente.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  private createLoading(message: string)
  {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: message
    });
  }

  private inicializarActionSheet()
  {
    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Acceder como...',
      buttons: [
        {
          text: this.arrUsuarios[0].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[0].nombre;
            this.contrasenia = this.arrUsuarios[0].clave;
          }
        }, {
          text: this.arrUsuarios[1].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[1].nombre;
            this.contrasenia = this.arrUsuarios[1].clave;
          }
        }, 
        {
          text: this.arrUsuarios[2].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[2].nombre;
            this.contrasenia = this.arrUsuarios[2].clave;
          }
        }, 
        {
          text: this.arrUsuarios[3].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[3].nombre;
            this.contrasenia = this.arrUsuarios[3].clave;
          }
        }, 
        {
          text: this.arrUsuarios[4].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[4].nombre;
            this.contrasenia = this.arrUsuarios[4].clave;
          }
        }, 
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
  }

  private ingresarComo() {
    
      if(this.arrUsuarios.length == 0)
      {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'No se pudo conectar con firebase, intente màs tarde.',
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        this.inicializarActionSheet();
        this.actionSheet.present();
      }
    }

}
