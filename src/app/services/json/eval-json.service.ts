import {Injectable} from '@angular/core';
import * as FileSaver from "file-saver";
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root'
})
export class EvalJsonService {

  index: number = 0;

  nameEval: String = "";
  info: any[][] = [];
  options: Boolean[][] = [];
  type: String[] = [];
  output: String = "all";
  imgAndSongToDisplay: String[][] = [["assets/NeedImage.png", "assets/NeedImage.png", ""]];
  imgAndSongToZip: any[][] = [["", "", ""]];
  assets: String[][] = [["", "", "", "", "", "", "", ""]];

  constructor() {
  }

  createEval() {
    this.checkEval();
    const zip = new JSZip();
    let info = {
      "EvalName": this.nameEval,
      "User": this.info,
      "Output": this.output
    };
    let config = {
      "Profil": [],
      "Assets": this.assets,
    };
    let infoData = new Blob([JSON.stringify(info)], {type: 'application/json'});
    let configData = new Blob([JSON.stringify(config)], {type: 'application/json'});
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

  addImgAndSongToZip(zip: any) {
    for (let i = 0; i < this.imgAndSongToDisplay.length; i++) {
      zip.file(this.nameEval + "/images/" + this.assets[i][0], this.imgAndSongToZip[i][0]);
      zip.file(this.nameEval + "/images/" + this.assets[i][2], this.imgAndSongToZip[i][1]);
      zip.file(this.nameEval + "/sounds/" + this.assets[i][4], this.imgAndSongToZip[i][2]);
    }
  }

  resetJson() {
    this.index = 0;
    this.nameEval = "GazePlayEval";
    this.info = [];
    this.options = [];
    this.type = [];
    this.output = "all";
    this.imgAndSongToDisplay = [["assets/NeedImage.png", "assets/NeedImage.png", ""]];
    this.imgAndSongToZip = [["", "", ""]];
    this.assets = [["", "", "", "", "", "", "", ""]];
  }
}
