import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {EvalInformationsComponent} from "./components/eval/evalInformations/eval-informations.component";
import {EvalUserComponent} from "./components/eval/evalUser/eval-user.component";
import {EvalScoresComponent} from "./components/eval/evalScores/eval-scores.component";
import {EvalImagesAndSoundsComponent} from "./components/eval/evalImagesAndSounds/eval-images-and-sounds.component";
import {EvalGetZipComponent} from "./components/eval/evalGetZip/eval-get-zip.component";

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'informations', component:EvalInformationsComponent},
  {path: 'user', component:EvalUserComponent},
  {path: 'scores', component:EvalScoresComponent},
  {path: 'assets', component:EvalImagesAndSoundsComponent},
  {path: 'zip', component:EvalGetZipComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
