import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvalFormComponent} from "./components/evalForm/eval-form.component";

const routes: Routes = [
  {path: 'form', component:EvalFormComponent},
  {path: '', redirectTo:'form', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
