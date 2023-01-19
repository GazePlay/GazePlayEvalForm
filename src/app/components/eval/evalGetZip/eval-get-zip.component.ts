import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";

@Component({
  selector: 'app-eval-get-zip',
  templateUrl: './eval-get-zip.component.html',
  styleUrls: ['./eval-get-zip.component.css']
})
export class EvalGetZipComponent implements OnInit{

  actualStep:number = 5;
  isAnonymous: Boolean = true;
  scores:String[][] = [];

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.isAnonymous = this.evalJsonService.isAnonymous;
    this.scores = this.evalJsonService.scores;
  }

  getName(){
    return this.evalJsonService.nameEval;
  }

  getIsAnonymous(){
    if (this.isAnonymous){
      return "Oui";
    }else {
      return "Non";
    }
  }


  getLastname(){
    return this.evalJsonService.lastName;
  }

  getFirstName(){
    return this.evalJsonService.firstName;
  }

  getGender(){
    return this.evalJsonService.gender;
  }

  getAge(){
    return this.evalJsonService.age;
  }

  getBirthDate(){
    return this.evalJsonService.birthDate;
  }

  getBirthPlace(){
    return this.evalJsonService.birthPlace;
  }

  getZip(){
    this.evalJsonService.createEval();
  }

  home(){
    this.router.navigate(['/home']);
  }

  previous(){
    this.router.navigate(['/assets']);
  }
}
