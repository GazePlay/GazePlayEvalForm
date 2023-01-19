import { Injectable } from '@angular/core';
import * as FileSaver from "file-saver";
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root'
})
export class EvalJsonService {

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
  imgAndSongToDisplay:String[][] = [["assets/NeedImage.png", "assets/NeedImage.png", ""]];
  imgAndSongToZip:any[][] = [["", "", ""]];
  assets:String[][] = [["", "", "", "", "", "", "", ""]];

  constructor() { }

  createEval(){
    const zip = new JSZip();
    let data = {
      "EvalName": this.nameEval,
      "Anonymous": String(this.isAnonymous),
      "Profil": [this.lastName, this.firstName, this.gender, this.age, this.birthDate, this.birthPlace],
      "Scores": this.scores,
      "Assets": this.assets,
      "Output": this.output
    };
    let jsonData = new Blob([JSON.stringify(data)], {type: 'application/json'});
    zip.file(this.nameEval + "/config.json", jsonData);
    this.addImgAndSongToZip(zip);
    zip.generateAsync({type:"blob"}).then((content) => {
      FileSaver.saveAs(content, this.nameEval.toString());
    });
  }

  addImgAndSongToZip(zip: any){
    for (let i=0; i<this.imgAndSongToDisplay.length; i++){
      zip.file(this.nameEval + "/images/" + this.assets[i][0], this.imgAndSongToZip[i][0]);
      zip.file(this.nameEval + "/images/" + this.assets[i][2], this.imgAndSongToZip[i][1]);
      zip.file(this.nameEval + "/sounds/" + this.assets[i][4], this.imgAndSongToZip[i][2]);
    }
  }

  resetJson(){
    this.index = 0;
    this.nameEval = "GazePlayEval";
    this.isAnonymous = true;
    this.lastName = "";
    this.firstName = "";
    this.gender = "";
    this.age = "";
    this.birthDate = "";
    this.birthPlace = "";
    this.scores = [["Total","tot1","1","10"]];
    this.listTag = [];
    this.output = "all";
    this.imgAndSongToDisplay = [["assets/NeedImage.png", "assets/NeedImage.png", ""]];
    this.imgAndSongToZip = [["", "", ""]];
    this.assets = [["", "", "", "", "", "", "", ""]];
  }
}
