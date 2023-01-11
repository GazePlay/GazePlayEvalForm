import { Component } from '@angular/core';
import * as FileSaver from "file-saver";
import * as JSZip from "jszip";

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
  listTag:String[] = [];
  output:String = "all";
  assets:String[][] = [["assets/NeedImage.png", "", "assets/NeedImage.png", "", "", "", "", ""]];

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
    this.listTag[index] = this.scores[index][0];
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
    this.removeOneTag(index);
  }

  removeOneTag(index: number){
    let tmp:String[]= [];
    for (let i=0; i<this.listTag.length; i++){
      if (i != index){
        tmp.push(this.listTag[i]);
      }
    }
    this.listTag = tmp;
  }

  getImageLeft(value: any, index: number){
    const image = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.assets[index][0] = String(reader.result);
      };
    }catch (e){
      this.assets[index][0] = "assets/NeedImage.png";
    }
  }

  getImageRight(value: any, index: number){
    const image = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.assets[index][2] = String(reader.result);
      };
    }catch (e){
      this.assets[index][2] = "assets/NeedImage.png";
    }
  }

  resetImageLeft(index: number){
    this.assets[index][0] = "assets/NeedImage.png";
  }

  resetImageRight(index: number){
    this.assets[index][2] = "assets/NeedImage.png";
  }

  getSound(value: any, index:number){
    const son = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(son);
      reader.onload = () => {
        this.assets[index][4] = String(reader.result);
      };
    }catch (e){
      this.assets[index][4] = "";
    }
  }

  resetSound(index: number){
    this.assets[index][4] = "";
  }

  getDescriptionImageLeft(value: any, index: number){
    this.assets[index][1] = value.target.value;
  }

  getDescriptionImageRight(value: any, index: number){
    this.assets[index][3] = value.target.value;
  }

  getDescriptionSound(value: any, index: number){
    this.assets[index][5] = value.target.value;
  }

  getGoodImage(value: String, index: number){
    this.assets[index][6] = value;
  }

  addOneMoreItem(){
    this.assets.push(["assets/NeedImage.png", "", "assets/NeedImage.png", "", "", "", "", ""]);
  }

  removeOneMoreItem(index: number){
    let tmp:String[][] = [];
    for (let i=0; i<this.assets.length; i++){
      if (i != index){
        tmp.push(this.assets[i]);
      }
    }
    this.assets = tmp;
  }

  addTag(value: Event, index: number, tagIndex: number){
    console.log("Previous tag = " + this.assets[index][7]);
    if (this.assets[index][7].includes(this.listTag[tagIndex].toString())){
      let tmp:String[] = this.assets[index][7].split(",");
      this.assets[index][7] = "";
      tmp.forEach(value => {
        if (value != this.listTag[tagIndex]){
          if (this.assets[index][7] == ""){
            this.assets[index][7] = this.assets[index][7].toString() + value;
          }else {
            this.assets[index][7] = this.assets[index][7] + "," + value;
          }
        }
      });
    }else {
      if ( this.assets[index][7] == ""){
        this.assets[index][7] = this.listTag[tagIndex];
      }else {
        this.assets[index][7] = this.assets[index][7] + "," + this.listTag[tagIndex];
      }
    }
    console.log("Current tag = " + this.assets[index][7]);
  }

  getOutput(value: any){
    this.output = value.target.value;
  }

  submit(){
    const zip = new JSZip();
    let data = {
      "EvalName": this.nameEval,
      "Anonymous": String(this.isAnonymous),
      "Profil": [this.lastName, this.firstName, this.gender, this.age, this.birthDate, this.birthPlace],
      "Scores": [this.scores],
      "Assets": [this.assets],
      "Output": this.output
    };
    let jsonData = new Blob([JSON.stringify(data)], {type: 'application/json'});
    zip.file("config.json", jsonData);
    zip.generateAsync({type:"blob"}).then((content) => {
      FileSaver.saveAs(content, this.nameEval.toString());
    });
  }
}
