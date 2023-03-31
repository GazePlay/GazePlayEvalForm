import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ChooseSoundComponent} from "../../chooseSound/choose-sound.component";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {ThemeService} from "../../../services/theme/theme.service";
import {AudioRecorderService} from "../../../services/audioRecorder/audio-recorder.service";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-eval-images-and-sounds',
  templateUrl: './eval-images-and-sounds.component.html',
  styleUrls: ['./eval-images-and-sounds.component.css']
})
export class EvalImagesAndSoundsComponent implements OnInit {

  actualStep: number = 4;
  nbItem: number = 0;
  rowHeight: number = 0;
  cols: number[] = [];
  rows: number[] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  imgToDisplay: any[][][] = [];
  songToDisplay: String[][] = [];
  listScores: String[][] = [];

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";

  constructor(private router: Router,
              private orderProgressBarService: OrderProgressBarService,
              private evalJsonService: EvalJsonService,
              private dialog: MatDialog,
              public sanitizer: DomSanitizer,
              private themeService: ThemeService,
              private audioRecorderService: AudioRecorderService,
              private settingsService: SettingsService) {

    this.cardTheme = this.themeService.cardTheme[0];
    this.cardHeaderTheme = this.themeService.cardTheme[1];
    this.cardTextTheme = this.themeService.cardTheme[2];
    this.buttonTheme = this.themeService.cardTheme[3];

    this.themeService.cardThemeObservable.subscribe(value => {
      this.cardTheme = value[0];
      this.cardHeaderTheme = value[1];
      this.cardTextTheme = value[2];
      this.buttonTheme = value[3];
    });

    this.audioRecorderService.audioObservable.subscribe(value => {
      this.updateImgAndSong();
    });
  }

  ngOnInit(): void {
    this.canAccess();
  }

  canAccess(){
    if ((this.orderProgressBarService.actualStep + 1) < this.actualStep){
      this.router.navigate(['/home']);
    }else {
      this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
      this.orderProgressBarService.setupOrderProgressBar();
      this.listScores = this.evalJsonService.skillToEvaluate;
      this.updateImgAndSong();
      this.updateScores();
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
    this.evalJsonService.fixationLength.push(0);
    this.evalJsonService.nbImgToSee.push(0);
    this.evalJsonService.songToDisplay.push(["", "", ""]);
    this.evalJsonService.imgToZip.push([]);
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
      this.resizeRowHeightGrid(gridSize);
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

  setFixationLength(value: any, index: number) {
    this.evalJsonService.fixationLength[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setNbImgToSee(value: any, index: number) {
    this.evalJsonService.nbImgToSee[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setNbScore(indexItem: number) {
    for (let i = 0; i < this.listScores.length; i++) {
      for (let k=0; k<this.evalJsonService.imgToDisplay[indexItem].length; k++){
        if (this.evalJsonService.imgToDisplay[indexItem][k].length < ((this.evalJsonService.imgToDisplay[indexItem][k][1]*2)+2)){
          this.evalJsonService.imgToDisplay[indexItem][k].push(this.listScores[i][0], 0);
        }
      }
    }
    this.updateImgAndSong();
  }

  resizeRowHeightGrid(gridSize: number) {
    if (gridSize > 0){
      this.evalJsonService.rowHeight = 240;
      this.evalJsonService.rowHeight += this.listScores.length * 40;
    }else {
      this.evalJsonService.rowHeight = 0;
    }
  }

  updateScores(){
    for (let i = 0; i < this.listScores.length; i++) {
      for (let j = 0; j < this.evalJsonService.imgToDisplay.length; j++){
        this.resizeRowHeightGrid((this.cols[j]*this.rows[j]));
        for (let k=0; k<this.evalJsonService.imgToDisplay[j].length; k++){
          this.evalJsonService.imgToDisplay[j][k][1] = this.listScores.length;
          if (this.evalJsonService.imgToDisplay[j][k].length < ((this.evalJsonService.imgToDisplay[j][k][1]*2)+2)){
            this.evalJsonService.imgToDisplay[j][k].push(this.listScores[i][0], 0);
          }
          this.evalJsonService.imgToDisplay[j][k][2*(i+1)] = this.listScores[i][0];
        }
      }
    }
    this.updateImgAndSong();
  }

  setValueScore(value: any, indexItem: number, indexGrid: number, indexValueScore: number) {
    let calculIndex = 3 + (indexValueScore * 2);
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][calculIndex] = Number(value.target.value);
    this.updateImgAndSong();
  }

  checkValue(value: any) {
    if (value < 0) {
      return 0
    } else {
      return value;
    }
  }

  addImg(value: any, indexItem: number, indexGrid: number) {
    const image = value.target.files[0];
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
  }

  resetImg(indexItem: number, indexGrid: number) {
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][0] = "assets/image/NeedImage.png";
    this.updateImgAndSong();
  }

  removeOneItem(index: number) {
    let tmpCols: number[] = [];
    let tmpRows: number[] = [];
    let tmpFixationLength: number[] = [];
    let tmpNbImgToSee: number[] = [];
    let tmpImgToDisplay: String[][][] = [];
    let tmpSongToDisplay: String[][] = [];
    let tmpImgToZip: String[][] = [];

    for (let i = 0; i < this.nbItem; i++) {
      if (i != index) {
        tmpCols.push(this.evalJsonService.cols[i]);
        tmpRows.push(this.evalJsonService.rows[i]);
        tmpFixationLength.push(this.evalJsonService.fixationLength[i]);
        tmpNbImgToSee.push(this.evalJsonService.nbImgToSee[i]);
        tmpImgToDisplay.push(this.evalJsonService.imgToDisplay[i]);
        tmpSongToDisplay.push(this.evalJsonService.songToDisplay[i]);
        tmpImgToZip.push(this.evalJsonService.imgToZip[i]);
      }
    }

    this.evalJsonService.cols = tmpCols;
    this.evalJsonService.rows = tmpRows;
    this.evalJsonService.fixationLength = tmpFixationLength;
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
    this.fixationLength = this.evalJsonService.fixationLength;
    this.nbImgToSee = this.evalJsonService.nbImgToSee;
    this.imgToDisplay = this.evalJsonService.imgToDisplay;
    this.songToDisplay = this.evalJsonService.songToDisplay;
    this.rowHeight = this.evalJsonService.rowHeight;
  }

  getSrcAudioFile(index: number) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(String(this.songToDisplay[index][1]));
  }

  upItem(indexItem: number) {
    if (indexItem != 0) {
      moveItemInArray(this.rows, indexItem, indexItem - 1);
      moveItemInArray(this.cols, indexItem, indexItem - 1);
      moveItemInArray(this.fixationLength, indexItem, indexItem - 1);
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
      moveItemInArray(this.fixationLength, indexItem, indexItem + 1);
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
    this.router.navigate(['/scores']);
  }
}
