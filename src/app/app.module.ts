import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {OrderProgressBarComponent} from './components/orderProgressBar/order-progress-bar.component';
import {EvalInformationsComponent} from './components/eval/evalInformations/eval-informations.component';
import {EvalUserComponent} from './components/eval/evalUser/eval-user.component';
import {EvalImagesAndSoundsComponent} from "./components/eval/evalImagesAndSounds/eval-images-and-sounds.component";
import {ChooseSoundComponent} from './components/chooseSound/choose-sound.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {EvalGetZipComponent} from './components/eval/evalGetZip/eval-get-zip.component';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderProgressBarComponent,
    EvalInformationsComponent,
    EvalUserComponent,
    EvalImagesAndSoundsComponent,
    ChooseSoundComponent,
    EvalGetZipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag
  ],
  providers: [
    MatDialog
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
