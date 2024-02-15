import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ThemeService} from "../../../services/theme/theme.service";
import {AudioRecorderService} from "../../../services/audioRecorder/audio-recorder.service";
import {SettingsService} from "../../../services/settings/settings.service";
import {moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-manual-eval',
  templateUrl: './manual-eval.component.html',
  styleUrls: ['./manual-eval.component.css']
})
export class ManualEvalComponent implements OnInit{

  actualStep: number = 4;
  nbItem: number = 0;
  cols: number[] = [];
  rows: number[] = [];
  itemLength: number[] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  imgToDisplay: any[][][] = [];
  songToDisplay: String[][] = [];
  listScores: String[][] = [];
  randomizeImgPos: boolean[] = [];
  songPosition: String[] = [];

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";
  accordionTheme: string = "";
  accordionHeaderTheme: string = "";
  accordionItemTheme: string = "";
  accordionElementsTheme: string = "";

  constructor(private router: Router,
              private orderProgressBarService: OrderProgressBarService,
              private evalJsonService: EvalJsonService,
              public sanitizer: DomSanitizer,
              private themeService: ThemeService,
              private audioRecorderService: AudioRecorderService,
              private settingsService: SettingsService) {

    this.cardTheme = this.themeService.cardTheme[0];
    this.cardHeaderTheme = this.themeService.cardTheme[1];
    this.cardTextTheme = this.themeService.cardTheme[2];
    this.buttonTheme = this.themeService.cardTheme[3];
    this.accordionTheme = this.themeService.cardTheme[4];
    this.accordionHeaderTheme = this.themeService.cardTheme[5];
    this.accordionItemTheme = this.themeService.cardTheme[6];
    this.accordionElementsTheme = this.themeService.cardTheme[7];

    this.nbItem = this.evalJsonService.nbItem;

    this.themeService.cardThemeObservable.subscribe(value => {
      this.cardTheme = value[0];
      this.cardHeaderTheme = value[1];
      this.cardTextTheme = value[2];
      this.buttonTheme = value[3];
      this.accordionTheme = value[4];
      this.accordionHeaderTheme = value[5];
      this.accordionItemTheme = value[6];
      this.accordionElementsTheme = value[7];
    });

    this.audioRecorderService.audioObservable.subscribe(() => {
      this.updateImgAndSong();
    });
  }

  ngOnInit() {
    this.canAccess();
  }

  canAccess(){
    if ((this.orderProgressBarService.actualStep + 1) < this.actualStep){
      this.router.navigate(['/home']);
    }else {
      this.listScores = this.evalJsonService.skillToEvaluate;
      this.updateScores();
      this.updateAccordionConstructor();
    }
  }

  openPlayerRecorder(index: number) {
    this.evalJsonService.index = index;
  }

  addOneMoreItem() {
    this.evalJsonService.nbItem++;
    this.evalJsonService.imgToDisplay.push([]);
    this.evalJsonService.cols.push(0);
    this.evalJsonService.rows.push(0);
    this.evalJsonService.itemLength.push(0);
    this.evalJsonService.fixationLength.push(0);
    this.evalJsonService.nbImgToSee.push(0);
    this.evalJsonService.songToDisplay.push(["", "", ""]);
    this.evalJsonService.imgToZip.push([]);
    this.evalJsonService.randomizeImgPos.push(false);
    this.evalJsonService.songPosition.push("together");
    this.updateImgAndSong();
  }

  setCols(value: any, index: number) {
    this.evalJsonService.cols[index] = this.checkValue(value.target.value);
    this.updateGrid(index);
    this.updateImgAndSong();
  }

  setRows(value: any, index: number) {
    this.evalJsonService.rows[index] = this.checkValue(value.target.value);
    this.updateGrid(index);
    this.updateImgAndSong();
  }

  updateGrid(index: number) {
    let gridSize = this.evalJsonService.cols[index] * this.evalJsonService.rows[index];
    if (gridSize >= 0) {
      let sizeDifference = this.evalJsonService.imgToDisplay[index].length - gridSize;
      if (sizeDifference > 0) {
        for (let i = 0; i < sizeDifference; i++) {
          this.evalJsonService.imgToDisplay[index].pop();
          this.evalJsonService.imgToZip[index].pop();
          this.evalJsonService.imgToZip[index].pop();
        }
      } else {
        for (let j = 0; j < Math.abs(sizeDifference); j++) {
          this.evalJsonService.imgToDisplay[index].push(["assets/images/NeedImage.png", this.listScores.length]);
          this.evalJsonService.imgToZip[index].push("", "");
        }
      }
    }
    this.setNbScore(index);
    this.updateImgAndSong();
  }

  setItemLength(value: any, index: number) {
    this.evalJsonService.itemLength[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setFixationLength(value: any, index: number) {
    this.evalJsonService.fixationLength[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setRandomizeImgPos(value: boolean, index: number) {
    this.evalJsonService.randomizeImgPos[index] = value;
    this.updateImgAndSong();
  }

  setSongPosition(value: String, index: number){
    this.evalJsonService.songPosition[index] = value;
    this.updateImgAndSong();
  }

  setNbImgToSee(value: any, index: number) {
    this.evalJsonService.nbImgToSee[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setNbScore(indexItem: number) {
    for (let i = 0; i < this.listScores.length; i++) {
      for (let k=0; k<this.evalJsonService.imgToDisplay[indexItem].length; k++){
        if (this.evalJsonService.imgToDisplay[indexItem][k].length < ((this.evalJsonService.imgToDisplay[indexItem][k][1]*3)+2)){
          this.evalJsonService.imgToDisplay[indexItem][k].push(this.listScores[i][0], 0, 0);
        }
      }
    }
    this.updateImgAndSong();
  }

  updateScores(){
    for (let i = 0; i < this.listScores.length; i++) {
      for (let j = 0; j < this.evalJsonService.imgToDisplay.length; j++){
        for (let k=0; k<this.evalJsonService.imgToDisplay[j].length; k++){
          this.evalJsonService.imgToDisplay[j][k][1] = this.listScores.length;
          if (this.evalJsonService.imgToDisplay[j][k].length < ((this.evalJsonService.imgToDisplay[j][k][1]*3)+2)){
            this.evalJsonService.imgToDisplay[j][k].push(this.listScores[i][0], 0, 0);
          }
          this.evalJsonService.imgToDisplay[j][k][2*(i+1)] = this.listScores[i][0];
        }
      }
    }
    this.updateImgAndSong();
  }

  setValueRightAnswer(value: any, indexItem: number, indexGrid: number, indexValueScore: number) {
    let calculIndex = 3 + (indexValueScore * 3);
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][calculIndex] = Number(value.target.value);
    this.updateImgAndSong();
  }

  setValueBadAnswer(value: any, indexItem: number, indexGrid: number, indexValueScore: number) {
    let calculIndex = 4 + (indexValueScore * 3);
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][calculIndex] = Number(value.target.value);
    this.updateImgAndSong();
  }

  checkValue(value: any) {
    if (value < 0) {
      return 0;
    } else if (value > 20){
      return 20;
    } else {
      return value;
    }
  }

  addImg(value: any, indexItem: number, indexGrid: number) {
    console.log(this.evalJsonService.imgToDisplay)
    const image = value.target.files[0];
    console.log(image)
    const reader = new FileReader();
    try {
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.evalJsonService.imgToDisplay[indexItem][indexGrid][0] = String(reader.result);
        this.evalJsonService.imgToZip[indexItem][indexGrid * 2] = image.name;
        this.evalJsonService.imgToZip[indexItem][indexGrid * 2 + 1] = image;
      };
    } catch (e) {
      this.evalJsonService.imgToDisplay[indexItem][indexGrid][0] = "assets/images/NeedImage.png";
      this.evalJsonService.imgToZip[indexItem][indexGrid * 2] = "";
      this.evalJsonService.imgToZip[indexItem][indexGrid * 2 + 1] = "";
    } finally {
      this.updateImgAndSong();
    }
    console.log(this.evalJsonService.imgToDisplay)
  }

  defineImgToBeGood(indexItem: number, indexGrid: number){
      let isGoodImg = "-isGoodImg";
      if (this.evalJsonService.imgToZip[indexItem][indexGrid * 2].includes(isGoodImg)){
        let getNameImage = this.evalJsonService.imgToZip[indexItem][indexGrid * 2].split(isGoodImg);
        this.evalJsonService.imgToZip[indexItem][indexGrid * 2] = getNameImage[0] + getNameImage[1];
      }else {
        let getNameImage = this.evalJsonService.imgToZip[indexItem][indexGrid * 2].split(".png");
        this.evalJsonService.imgToZip[indexItem][indexGrid * 2] = getNameImage[0] + "-isGoodImg.png";
      }
      this.updateImgAndSong();
  }

  resetImg(indexItem: number, indexGrid: number) {
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][0] = "assets/image/NeedImage.png";
    this.updateImgAndSong();
  }

  removeOneItem(index: number) {
    let tmpCols: number[] = [];
    let tmpRows: number[] = [];
    let tmpItemLength: number[] = [];
    let tmpFixationLength: number[] = [];
    let tmpRandomizeImgPos: boolean[] =  [];
    let tmpSongPosition: String[] = [];
    let tmpNbImgToSee: number[] = [];
    let tmpImgToDisplay: String[][][] = [];
    let tmpSongToDisplay: String[][] = [];
    let tmpImgToZip: String[][] = [];

    for (let i = 0; i < this.nbItem; i++) {
      if (i != index) {
        tmpCols.push(this.evalJsonService.cols[i]);
        tmpRows.push(this.evalJsonService.rows[i]);
        tmpItemLength.push(this.evalJsonService.itemLength[i]);
        tmpFixationLength.push(this.evalJsonService.fixationLength[i]);
        tmpRandomizeImgPos.push(this.evalJsonService.randomizeImgPos[i]);
        tmpSongPosition.push(this.evalJsonService.songPosition[i]);
        tmpNbImgToSee.push(this.evalJsonService.nbImgToSee[i]);
        tmpImgToDisplay.push(this.evalJsonService.imgToDisplay[i]);
        tmpSongToDisplay.push(this.evalJsonService.songToDisplay[i]);
        tmpImgToZip.push(this.evalJsonService.imgToZip[i]);
      }
    }

    this.evalJsonService.cols = tmpCols;
    this.evalJsonService.rows = tmpRows;
    this.evalJsonService.itemLength = tmpItemLength;
    this.evalJsonService.fixationLength = tmpFixationLength;
    this.evalJsonService.randomizeImgPos = tmpRandomizeImgPos;
    this.evalJsonService.songPosition = tmpSongPosition;
    this.evalJsonService.nbImgToSee = tmpNbImgToSee;
    this.evalJsonService.imgToDisplay = tmpImgToDisplay;
    this.evalJsonService.songToDisplay = tmpSongToDisplay;
    this.evalJsonService.imgToZip = tmpImgToZip;
    this.evalJsonService.nbItem--;
    this.updateImgAndSong();
  }

  updateImgAndSong() {
    this.nbItem = this.evalJsonService.nbItem;
    this.rows = this.evalJsonService.rows;
    this.cols = this.evalJsonService.cols;
    this.itemLength = this.evalJsonService.itemLength;
    this.fixationLength = this.evalJsonService.fixationLength;
    this.randomizeImgPos = this.evalJsonService.randomizeImgPos;
    this.songPosition = this.evalJsonService.songPosition;
    this.nbImgToSee = this.evalJsonService.nbImgToSee;
    this.imgToDisplay = this.evalJsonService.imgToDisplay;
    this.songToDisplay = this.evalJsonService.songToDisplay;
  }

  updateAccordionConstructor(){
    this.nbItem++;
    this.nbItem--;
  }

  getSrcAudioFile(index: number) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(String(this.songToDisplay[index][1]));
  }

  haveSeparatedLine(index: number){
    if (index > 0){
      return this.accordionElementsTheme;
    }else {
      return "";
    }
  }

  upItem(indexItem: number) {
    if (indexItem != 0) {
      moveItemInArray(this.rows, indexItem, indexItem - 1);
      moveItemInArray(this.cols, indexItem, indexItem - 1);
      moveItemInArray(this.itemLength, indexItem, indexItem - 1);
      moveItemInArray(this.fixationLength, indexItem, indexItem - 1);
      moveItemInArray(this.randomizeImgPos, indexItem, indexItem - 1);
      moveItemInArray(this.songPosition, indexItem, indexItem - 1);
      moveItemInArray(this.nbImgToSee, indexItem, indexItem - 1);
      moveItemInArray(this.imgToDisplay, indexItem, indexItem - 1);
      moveItemInArray(this.songToDisplay, indexItem, indexItem - 1);
      moveItemInArray(this.evalJsonService.imgToZip, indexItem, indexItem - 1);
      this.updateImgAndSong();
    }
  }

  downItem(indexItem: number) {
    if (indexItem != (this.imgToDisplay.length - 1)) {
      moveItemInArray(this.rows, indexItem, indexItem + 1);
      moveItemInArray(this.cols, indexItem, indexItem + 1);
      moveItemInArray(this.itemLength, indexItem, indexItem + 1);
      moveItemInArray(this.fixationLength, indexItem, indexItem + 1);
      moveItemInArray(this.randomizeImgPos, indexItem, indexItem + 1);
      moveItemInArray(this.songPosition, indexItem, indexItem + 1);
      moveItemInArray(this.nbImgToSee, indexItem, indexItem + 1);
      moveItemInArray(this.imgToDisplay, indexItem, indexItem + 1);
      moveItemInArray(this.songToDisplay, indexItem, indexItem + 1);
      moveItemInArray(this.evalJsonService.imgToZip, indexItem, indexItem + 1);
      this.updateImgAndSong();
    }
  }

  next() {
    this.settingsService.saveAuto();
    this.router.navigate(['/zip']);
  }

  previous() {
    this.settingsService.saveAuto();
    if (this.settingsService.generateEvalAuto){
      this.router.navigate(['/auto']);
    }else {
      this.router.navigate(['/assets']);
    }
  }
}
