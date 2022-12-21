import { Component } from '@angular/core';

@Component({
  selector: 'app-eval-form',
  templateUrl: './eval-form.component.html',
  styleUrls: ['./eval-form.component.css']
})
export class EvalFormComponent {

  nameEval = "GazePlayEval";
  isAnonymous = true;
  lastName = "";
  firstName = "";
  gender = "";
  age = "";
  birthDate = "";
  birthPlace = "";

  getNameEval(value: any){
    this.nameEval = value.target.value;
  }

  getIsAnonymous(value: any){
    this.isAnonymous = value.target.value === 'True';
  }

  getLastName(value: any){
    this.lastName = value.target.value;
  }

  getFirstName(value: any){
    this.firstName = value.target.value;
  }

  getGender(value: any){
    this.gender = value.target.value;
  }

  getAge(value: any){
    this.age = value.target.value;
  }

  getBirthDate(value: any){
    this.birthDate = value.target.value;
  }

  getBirthPlace(value: any){
    this.birthPlace = value.target.value;
  }

  submit(){
    console.log("Nom évaluation : " + this.nameEval);
    console.log("Anonyme ? : " + this.isAnonymous);
    if (!this.isAnonymous){
      console.log("Nom : " + this.lastName);
      console.log("Prénom : " + this.firstName);
      console.log("Genre : " + this.gender);
      console.log("Age : " + this.age);
      console.log("Date de naissance : " + this.birthDate);
      console.log("Lieu de naissance : " + this.birthPlace);
    }
  }
}
