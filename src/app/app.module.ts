import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OrderProgressBarComponent } from './components/orderProgressBar/order-progress-bar.component';
import { EvalInformationsComponent } from './components/eval/evalInformations/eval-informations.component';
import { EvalUserComponent } from './components/eval/evalUser/eval-user.component';
import { EvalScoresComponent } from './components/eval/evalScores/eval-scores.component';
import {EvalImagesAndSoundsComponent} from "./components/eval/evalImagesAndSounds/eval-images-and-sounds.component";
import { ChooseSoundComponent } from './components/chooseSound/choose-sound.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderProgressBarComponent,
    EvalInformationsComponent,
    EvalUserComponent,
    EvalScoresComponent,
    EvalImagesAndSoundsComponent,
    ChooseSoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    MatDialog
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
