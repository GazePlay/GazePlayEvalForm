import { Injectable } from '@angular/core';
import {EvalJsonService} from "../json/eval-json.service";
import arrayShuffle from "array-shuffle";
import {SettingsService} from "../settings/settings.service";

@Injectable({
  providedIn: 'root'
})
export class EvalGenerationService {

  listImagesToDisplay: String[] = [];
  listImagesToZip: any[][] = [];

  nbItems: number = 1;
  minCols: number = 1;
  maxCols: number = 1;
  minRows: number = 1;
  maxRows: number = 1;
  minFixationLength: number = 0;
  maxFixationLength: number = 0;
  minGoodAnswer: number = 1;
  maxGoodAnswer: number = 1;
  fillImages: boolean = false;
  reuseImages: boolean = false;
  addSongText: boolean = false;
  isSong: boolean = false;

  cols: number[] = [];
  rows: number[] = [];
  songToDisplay: String[][] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  imgToDisplay: any[][][] = [];
  imgToZip: String[][] = [];

  maxIndex = 0;
  indexImgUse: number[] = [];

  constructor(private evalJsonService: EvalJsonService,
              private settingsService: SettingsService) { }

  setupEvalGeneration(displayImg: String[], zipImg: any[][]){
    this.listImagesToDisplay = displayImg;
    this.listImagesToZip = zipImg;

    this.maxIndex = this.listImagesToDisplay.length;

    this.generateMinMaxValues();
    this.generateImg();
    this.updateGrid();
    this.settingsService.onLoadingAlert();

    /*console.log("Img to display");
    console.log(this.imgToDisplay);

    console.log("Img to zip");
    console.log(this.imgToZip);*/
  }

  generateMinMaxValues(){
    let minCol = Math.ceil(this.minCols);
    let maxCol = Math.ceil(Number(this.maxCols) + 1);

    let minRow = Math.ceil(this.minRows);
    let maxRow = Math.floor(Number(this.maxRows) + 1);

    let minFixationLength = this.minFixationLength;
    let maxFixationLength = Number(this.maxFixationLength) + 1;

    let minGoodAnswer = Math.ceil(this.minGoodAnswer);
    let maxGoodAnswer = Math.floor(Number(this.maxGoodAnswer) + 1);

    for (let i=0; i<this.nbItems; i++){
      this.cols.push(Math.floor(Math.random() * (maxCol - minCol) + minCol));
      this.rows.push(Math.floor(Math.random() * (maxRow - minRow) + minRow));
      this.fixationLength.push(Math.random() * (maxFixationLength - minFixationLength) + minFixationLength);
      this.nbImgToSee.push(Math.floor(Math.random() * (maxGoodAnswer - minGoodAnswer) + minGoodAnswer));
      this.imgToDisplay.push([]);
      this.imgToZip.push([]);
      this.songToDisplay.push(["", "", ""]);
    }
    console.log(this.fixationLength);
  }

  generateImg(){
    if (this.fillImages){
      for (let i=0; i<this.nbItems; i++) {
        for (let j = 0; j < (this.cols[i] * this.rows[i]); j++) {
          this.chooseImageWithoutBlank(i);
        }
      }
    }else {
      let tmpImg: any = [];
      for (let i=0; i<this.nbItems; i++) {
        let size = Math.ceil((this.cols[i]*this.rows[i]) / 2);
        let nbBlank = Math.floor(Math.random() * size);
        for (let j = 0; j < (this.cols[i] * this.rows[i] - nbBlank); j++) {
          this.chooseImageWithBlank(i, tmpImg);
        }
        for (let k=0; k<nbBlank; k++){
          tmpImg.push(["assets/images/NeedImage.png", this.evalJsonService.skillToEvaluate.length, "", ""]);
        }
      }
      tmpImg = arrayShuffle(tmpImg);
      for (let k=0; k<tmpImg.length; k++){
        this.imgToDisplay[k].push([tmpImg[0], tmpImg[1]]);
        this.imgToZip[k].push(tmpImg[2], tmpImg[3]);
      }
    }
  }

  chooseImageWithoutBlank(index: number){
    if (this.reuseImages){
      let indexImg = Math.floor(Math.random() * this.maxIndex);
      this.imgToDisplay[index].push([this.listImagesToDisplay[indexImg], this.evalJsonService.skillToEvaluate.length]);
      this.imgToZip[index].push(this.listImagesToZip[indexImg][0],this.listImagesToZip[indexImg][1]);
    }else {
      let indexImg = Math.floor(Math.random() * this.maxIndex);
      while (this.indexImgUse.includes(indexImg)){
        indexImg = Math.floor(Math.random() * this.maxIndex);
      }
      this.imgToDisplay[index].push([this.listImagesToDisplay[indexImg], this.evalJsonService.skillToEvaluate.length]);
      this.imgToZip[index].push(this.listImagesToZip[indexImg][0],this.listImagesToZip[indexImg][1]);
      this.indexImgUse.push(indexImg);
    }
  }

  chooseImageWithBlank(index: number, tmpImg: any[]){
    if (this.reuseImages){
      let indexImg = Math.floor(Math.random() * this.maxIndex);
      tmpImg.push([this.listImagesToDisplay[indexImg], this.evalJsonService.skillToEvaluate.length, this.listImagesToZip[indexImg][0], this.listImagesToZip[indexImg][1]]);
    }else {
      let indexImg = Math.floor(Math.random() * this.maxIndex);
      while (this.indexImgUse.includes(indexImg)){
        indexImg = Math.floor(Math.random() * this.maxIndex);
      }
      tmpImg.push([this.listImagesToDisplay[indexImg], this.evalJsonService.skillToEvaluate.length, this.listImagesToZip[indexImg][0], this.listImagesToZip[indexImg][1]]);
      this.indexImgUse.push(indexImg);
    }
  }

  updateGrid(){
    this.evalJsonService.nbItem = this.nbItems;
    this.evalJsonService.cols = this.cols;
    this.evalJsonService.rows = this.rows;
    this.evalJsonService.songToDisplay = this.songToDisplay;
    this.evalJsonService.fixationLength = this.fixationLength;
    this.evalJsonService.nbImgToSee = this.nbImgToSee;
    this.evalJsonService.imgToDisplay = this.imgToDisplay;
    this.evalJsonService.imgToZip = this.imgToZip;
  }

  reset(){
    this.cols = [];
    this.rows = [];
    this.songToDisplay = [];
    this.fixationLength = [];
    this.nbImgToSee = [];
    this.imgToDisplay = [];
    this.imgToZip = [];
    this.indexImgUse = [];
  }
}
