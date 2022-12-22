import { Component } from '@angular/core';

@Component({
  selector: 'app-eval-form',
  templateUrl: './eval-form.component.html',
  styleUrls: ['./eval-form.component.css']
})
export class EvalFormComponent {

  index:number = 0;

  nameEval:String = "GazePlayEval";
  isAnonymous:boolean = true;
  lastName:String = "";
  firstName:String = "";
  gender:String = "";
  age:String = "";
  birthDate:String = "";
  birthPlace:String = "";
  scores:String[][] = [["Total","tot1","1","10"]];

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

  getNameScore(value: any, index: number){
    this.scores[index][0] = value.target.value;
    this.scores[index][1] = value.target.value.slice(0,3) + this.index;
    this.index++;
  }

  getValueScore(value: any, index: number){
    this.scores[index][2] = value.target.value;
  }

  getMaxValeScore(value: any, index: number){
    this.scores[index][3] = value.target.value;
  }

  addOneMoreScore(){
    this.scores.push(["", "", "", ""]);
  }

  removeOneMoreScore(index: number){
    let tmp:String[][] = [];
    for (let i=0; i<this.scores.length; i++){
      if (i != index){
        tmp.push(this.scores[i]);
      }
    }
    this.scores = tmp;
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
    console.log(this.scores);
  }
}
