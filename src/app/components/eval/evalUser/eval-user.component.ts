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
  yesOption: Boolean = true;
  noOption:Boolean = false;
  isAnonymous:Boolean = true;
  lastName: String = "";
  firstName: String  = "";
  gender: String  = "";
  age: String  = "";
  birthDate: String  = "";
  birthPlace: String  = "";

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.setIsAnonymous();
  }


  setUser(){
    this.lastName = this.evalJsonService.lastName;
    this.firstName = this.evalJsonService.firstName;
    this.gender = this.evalJsonService.gender;
    this.age = this.evalJsonService.age;
    this.birthDate = this.evalJsonService.birthDate;
    this.birthPlace = this.evalJsonService.birthPlace;
  }

  getIsAnonymous(value: any){
    this.evalJsonService.isAnonymous = value.target.value === 'True';
    this.setIsAnonymous();
  }

  setIsAnonymous(){
    this.isAnonymous = this.evalJsonService.isAnonymous;
    if (!this.isAnonymous){
      this.yesOption = false;
      this.noOption = true;
      this.setUser()
    }else {
      this.yesOption = true;
      this.noOption = false;
    }
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
