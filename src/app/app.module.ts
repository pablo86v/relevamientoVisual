import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { Menu0Page } from '../pages/menu0/menu0';
import { LoginPage } from '../pages/login/login';
import { MostrarImagenesPage } from '../pages/mostrar-imagenes/mostrar-imagenes';
import { ListadoFotosPage } from '../pages/listado-fotos/listado-fotos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CONFIG } from './firebase';
import { ImagenesProvider } from '../providers/imagenes/imagenes';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    Menu0Page,
    LoginPage,
    MostrarImagenesPage,
    ListadoFotosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    Menu0Page,
    LoginPage,
    MostrarImagenesPage,
    ListadoFotosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagenesProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
