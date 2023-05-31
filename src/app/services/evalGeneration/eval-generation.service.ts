import { Injectable } from '@angular/core';
import {EvalJsonService} from "../json/eval-json.service";

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

  constructor(private evalJsonService: EvalJsonService) { }

  setupEvalGeneration(displayImgs: String[], zipImgs: any[][]){
    this.listImagesToDisplay = displayImgs;
    this.listImagesToZip = zipImgs;

    this.generateMinMaxValues();
    this.generateSong();
  }

  generateMinMaxValues(){
    let minCol = Math.ceil(this.minCols);
    let maxCol = Math.floor(this.maxCols + 1);

    let minRow = Math.ceil(this.minRows);
    let maxRow = Math.floor(this.maxRows + 1);

    let minFixationLength = Math.ceil(this.minFixationLength);
    let maxFixationLength = Math.floor(this.maxFixationLength + 1);

    let minGoodAnswer = Math.ceil(this.minGoodAnswer);
    let maxGoodAnswer = Math.floor(this.maxGoodAnswer + 1);

    for (let i=0; i<this.nbItems; i++){
      this.cols.push(Math.floor(Math.random() * (maxCol - minCol) + minCol));
      this.rows.push(Math.floor(Math.random() * (maxRow - minRow) + minRow));
      this.fixationLength.push(Math.floor(Math.random() * (maxFixationLength - minFixationLength) + minFixationLength));
      this.nbImgToSee.push(Math.floor(Math.random() * (maxGoodAnswer - minGoodAnswer) + minGoodAnswer));
    }
  }

  generateSong(){

  }
}
