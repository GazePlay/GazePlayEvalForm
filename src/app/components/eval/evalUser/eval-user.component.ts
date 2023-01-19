import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";

@Component({
  selector: 'app-eval-user',
  templateUrl: './eval-user.component.html',
  styleUrls: ['./eval-user.component.css']
})
export class EvalUserComponent implements OnInit{

  actualStep:number = 2;

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
  }

  setIsAnonymous(value: any){
    this.evalJsonService.isAnonymous = value.target.value === 'True';
  }

  getIsAnonymous(){
    return this.evalJsonService.isAnonymous;
  }

  setLastName(value: any){
    this.evalJsonService.lastName = value.target.value;
  }

  setFirstName(value: any){
    this.evalJsonService.firstName = value.target.value;
  }

  setGender(value: any){
    this.evalJsonService.gender = value.target.value;
  }

  setAge(value: any){
    this.evalJsonService.age = value.target.value;
  }

  setBirthDate(value: any){
    this.evalJsonService.birthDate = value.target.value;
  }

  setBirthPlace(value: any){
    this.evalJsonService.birthPlace = value.target.value;
  }

  home(){
    this.router.navigate(['/home']);
  }

  next(){
    this.router.navigate(['/scores']);
  }

  previous(){
    this.router.navigate(['/informations']);
  }
}
