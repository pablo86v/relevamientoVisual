import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoFotosPage } from './listado-fotos';

@NgModule({
  declarations: [
    ListadoFotosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoFotosPage),
  ],
})
export class ListadoFotosPageModule {}
