import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {EvalInformationsComponent} from "./components/eval/evalInformations/eval-informations.component";
import {EvalUserComponent} from "./components/eval/evalUser/eval-user.component";
import {EvalImagesAndSoundsComponent} from "./components/eval/evalImagesAndSounds/eval-images-and-sounds.component";
import {EvalGetZipComponent} from "./components/eval/evalGetZip/eval-get-zip.component";
import {EvalScoresComponent} from "./components/eval/evalScores/eval-scores.component";
import {AutomaticEvalComponent} from "./components/generateEval/automatic/automatic-eval.component";
import {ManualEvalComponent} from "./components/generateEval/manual/manual-eval.component";
import {LoadingPageComponent} from "./components/loading/loading-page.component";
import {ImportEvalComponent} from "./components/importEval/import-eval.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'informations', component: EvalInformationsComponent},
  {path: 'user', component: EvalUserComponent},
  {path: 'scores', component: EvalScoresComponent},
  {path: 'assets', component: EvalImagesAndSoundsComponent},
  {path: 'zip', component: EvalGetZipComponent},
  {path: 'auto', component: AutomaticEvalComponent},
  {path: 'manual', component: ManualEvalComponent},
  {path: 'loading', component: LoadingPageComponent},
  {path: 'import', component: ImportEvalComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
