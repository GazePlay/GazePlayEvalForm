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
  info: any[][] = [];
  options: Boolean[][] = [];
  type: String[] = [];
  scores: String[][] = [];
  errorsScores: Boolean[] = [];
  output: String = "all";
  imgToDisplay: any[][][] = [];
  songToDisplay: String[][] = [];
  cols: number[] = [];
  rows: number[] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  rowHeight: number = 0;
  imgToZip: String[][] = [];

  constructor() {
  }

  createEval() {
    this.generateConfigFile();
    this.checkEval();
    const zip = new JSZip();

    let infoData = new Blob([JSON.stringify(this.generateInfoFile())], {type: 'application/json'});
    let configData = new Blob([JSON.stringify(this.generateConfigFile())], {type: 'application/json'});
    zip.file(this.nameEval + "/info.json", infoData);
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
    for (let i = 0; i < this.info.length; i++) {
      info.push([this.info[i][0], this.info[i][1]]);
    }
    return info;
  }

  generateConfigFile() {
    let config: any[] = [];
    for (let i = 0; i < this.imgToDisplay.length; i++) {
      config.push([this.rows[i], this.cols[i]]);
      for (let j = 0; j < this.imgToZip[i].length; j += 2) {
        config[i].push(this.imgToZip[i][j]);
        for (let k = 2; k < this.imgToDisplay[i][j / 2].length; k++) {
          config[i].push(this.imgToDisplay[i][j / 2][k]);
        }
      }
      config[i].push(this.songToDisplay[i][0]);
      config[i].push(this.nbImgToSee[i]);
      config[i].push(this.fixationLength[i]);
    }
    return config;
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

    this.nameEval = "GazePlayEval";
    this.info = [];
    this.options = [];
    this.type = [];
    this.scores = [];
    this.errorsScores = [];
    this.output = "all";
    this.imgToDisplay = [];
    this.songToDisplay = [];
    this.cols = [];
    this.rows = [];
    this.fixationLength = [];
    this.nbImgToSee = [];
    this.rowHeight = 0;
    this.imgToZip = [];
  }
}
