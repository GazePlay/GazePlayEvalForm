import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {OrderProgressBarComponent} from './components/orderProgressBar/order-progress-bar.component';
import {EvalInformationsComponent} from './components/eval/evalInformations/eval-informations.component';
import {EvalUserComponent} from './components/eval/evalUser/eval-user.component';
import {EvalImagesAndSoundsComponent} from "./components/eval/evalImagesAndSounds/eval-images-and-sounds.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {EvalGetZipComponent} from './components/eval/evalGetZip/eval-get-zip.component';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {EvalScoresComponent} from './components/eval/evalScores/eval-scores.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeAlertComponent } from './components/alert/homeAlert/home-alert.component';
import { DeleteAlertComponent } from './components/alert/deleteAlert/delete-alert.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PlayerRecorderComponent } from './components/playerRecorder/player-recorder.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgxFileDropModule} from 'ngx-file-drop';
import { InfoAlertComponent } from './components/alert/infoAlert/info-alert.component';
import { AutomaticEvalComponent } from './components/generateEval/automatic/automatic-eval.component';
import { ManualEvalComponent } from './components/generateEval/manual/manual-eval.component';
import { LoadingPageComponent } from './components/loading/loading-page.component';
import {MatRadioModule} from "@angular/material/radio";
import { ImportEvalComponent } from './components/importEval/import-eval.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderProgressBarComponent,
    EvalInformationsComponent,
    EvalUserComponent,
    EvalImagesAndSoundsComponent,
    EvalGetZipComponent,
    EvalScoresComponent,
    MenuComponent,
    NavbarComponent,
    HomeAlertComponent,
    DeleteAlertComponent,
    SettingsComponent,
    PlayerRecorderComponent,
    InfoAlertComponent,
    AutomaticEvalComponent,
    ManualEvalComponent,
    LoadingPageComponent,
    ImportEvalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatDialogModule,
        MatButtonModule,
        CdkDropList,
        CdkDrag,
        MatGridListModule,
        CdkDropListGroup,
        MatTooltipModule,
        NgxDropzoneModule,
        NgxFileDropModule,
        MatRadioModule
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
