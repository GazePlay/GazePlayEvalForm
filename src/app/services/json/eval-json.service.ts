import {Injectable} from '@angular/core';
import * as FileSaver from "file-saver";
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root'
})
export class EvalJsonService {

  index: number = 0;
  nbItem: number = 0;

  nameEval: String = "";
  infoPatient: any[][] = [];
  skillToEvaluate: String[][] = [];
  output: String = "all";
  imgToDisplay: any[][][] = [];
  songToDisplay: String[][] = [];
  cols: number[] = [];
  rows: number[] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  imgToZip: String[][] = [];

  constructor() {
  }

  createEval() {
    this.checkEval();
    const zip = new JSZip();

    let configData = new Blob([JSON.stringify(this.generateJson())], {type: 'application/json'});
    zip.file(this.nameEval + "/config.json", configData);
    this.addImgAndSongToZip(zip);
    zip.generateAsync({type: "blob"}).then((content) => {
      FileSaver.saveAs(content, this.nameEval.toString());
    });
  }

  checkEval() {
    if (this.nameEval == "") {
      this.nameEval = "GazePlayEval";
    }
  }

  generateInfoFile() {
    let info: any[] = [];
    info.push(this.nameEval, this.output);
    for (let i = 0; i < this.infoPatient.length; i++) {
      info.push([this.infoPatient[i][0], this.infoPatient[i][1]]);
    }
    return info;
  }

  generateConfigFile() {
    let config: any[] = [];
    for (let i = 0; i < this.imgToDisplay.length; i++) {
      config.push([this.rows[i], this.cols[i], this.skillToEvaluate.length]);
      for (let j = 0; j < this.imgToZip[i].length; j += 2) {
        config[i].push(this.imgToZip[i][j]);
        for (let k = 2; k < this.imgToDisplay[i][j / 2].length; k++) {
          config[i].push(this.imgToDisplay[i][j / 2][k]);
        }
      }
      config[i].push(this.songToDisplay[i][0]);
      config[i].push(this.nbImgToSee[i]);
      config[i].push(this.fixationLength[i] * 1000); //seconds to milliseconds
    }
    return config;
  }

  generateJson(){
    let infoUser: any[] = this.generateInfoFile();
    let config: any[] = this.generateConfigFile();
    let json: any[] = [];

    json.push(infoUser);
    for (let i=0; i<config.length; i++){
      json.push(config[i]);
    }

    return json;
  }

  addImgAndSongToZip(zip: any) {
    for (let i = 0; i < this.imgToDisplay.length; i++) {
      for (let j = 0; j < this.imgToZip[i].length; j += 2) {
        zip.file(this.nameEval + "/images/" + this.imgToZip[i][j], this.imgToZip[i][j + 1]);
        zip.file(this.nameEval + "/sounds/" + this.songToDisplay[i][0], this.songToDisplay[i][2]);
      }
    }
  }

  resetJson() {
    this.index = 0;
    this.nbItem = 0;
    this.nameEval = "";
    this.infoPatient = [["Identifiant du patient", this.generateId()]];
    this.skillToEvaluate = [];
    this.output = "all";
    this.imgToDisplay = [];
    this.songToDisplay = [];
    this.cols = [];
    this.rows = [];
    this.fixationLength = [];
    this.nbImgToSee = [];
    this.imgToZip = [];
  }

  generateId(){
    let possibleValue: string = "1234567890";
    let sizeId: number = 4;
    let id: string = "P";

    for (let i = 0; i < sizeId; i++) {
      id += possibleValue.charAt(Math.floor(Math.random() * possibleValue.length));
    }
    return id;
  }

  save(){
    return [
      this.nameEval,
      this.infoPatient,
      this.skillToEvaluate,
      this.output,
      this.imgToDisplay,
      this.songToDisplay,
      this.cols,
      this.rows,
      this.fixationLength,
      this.nbImgToSee,
      this.imgToZip
    ]
  }

  load(value: any[]){
    this.nameEval = value[0];
    this.infoPatient = value[1];
    this.skillToEvaluate = value[2];
    this.output = value[3];
    this.imgToDisplay = value[4];
    this.songToDisplay = value[5];
    this.cols = value[6];
    this.rows = value[7];
    this.fixationLength = value[8];
    this.nbImgToSee = value[9];
    this.imgToZip = value[10];
  }
}
