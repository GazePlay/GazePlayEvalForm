import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ChooseSoundComponent} from "../../chooseSound/choose-sound.component";
import {moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-eval-images-and-sounds',
  templateUrl: './eval-images-and-sounds.component.html',
  styleUrls: ['./eval-images-and-sounds.component.css']
})
export class EvalImagesAndSoundsComponent implements OnInit {

  actualStep: number = 4;
  nbItem: number = 0;
  rowHeight: number[] = [];
  cols: number[] = [];
  rows: number[] = [];
  fixationLength: number[] = [];
  nbImgToSee: number[] = [];
  imgToDisplay: any[][][] = [];
  songToDisplay: String[][] = [];
  listScores: String[][] = [];

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService,
    private dialog: MatDialog,
    public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.listScores = this.evalJsonService.scores;
    this.updateImgAndSong();
  }

  openChooseSoundDialog(index: number) {
    let dialogRef = this.dialog.open(ChooseSoundComponent, {
      width: '500px',
      height: '375px',
      data: {index: index}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateImgAndSong();
    })
  }

  addOneMoreItem() {
    this.evalJsonService.nbItem++;
    this.evalJsonService.imgToDisplay.push([]);
    this.evalJsonService.cols.push(0);
    this.evalJsonService.rows.push(0);
    this.evalJsonService.fixationLength.push(0);
    this.evalJsonService.nbImgToSee.push(0);
    this.evalJsonService.songToDisplay.push(["", "", ""]);
    this.evalJsonService.rowHeight.push(0);
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
    this.updateRowHeightGrid(gridSize, index);
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
          this.evalJsonService.imgToDisplay[index].push(["../../../../assets/NeedImage.png", 0]);
          this.evalJsonService.imgToZip[index].push("", "");
        }
      }
    }
    this.updateImgAndSong();
  }

  updateRowHeightGrid(value: number, index: number) {
    if (value == 0) {
      this.evalJsonService.rowHeight[index] = 0;
    } else {
      if (this.evalJsonService.rowHeight[index] < 280) {
        this.evalJsonService.rowHeight[index] = 280;
      }
    }
  }

  setFixationLength(value: any, index: number) {
    this.evalJsonService.fixationLength[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setNbImgToSee(value: any, index: number) {
    this.evalJsonService.nbImgToSee[index] = this.checkValue(value.target.value);
    this.updateImgAndSong();
  }

  setNbScore(value: any, indexItem: number, indexGrid: number) {
    let nbScore;
    if (Number(value.target.value) < 0) {
      nbScore = 0 - this.evalJsonService.imgToDisplay[indexItem][indexGrid][1];
    } else {
      nbScore = Number(value.target.value) - this.evalJsonService.imgToDisplay[indexItem][indexGrid][1];
    }

    if (this.evalJsonService.imgToDisplay[indexItem][indexGrid][1] < Number(value.target.value)) {
      for (let i = 0; i < nbScore; i++) {
        this.evalJsonService.imgToDisplay[indexItem][indexGrid].push("", 0);
      }
    } else {
      for (let i = 0; i < Math.abs(nbScore); i++) {
        this.evalJsonService.imgToDisplay[indexItem][indexGrid].pop();
        this.evalJsonService.imgToDisplay[indexItem][indexGrid].pop();
      }
    }

    this.evalJsonService.imgToDisplay[indexItem][indexGrid][1] = Number(value.target.value);
    this.resizeRowHeightGrid(Number(value.target.value), nbScore, indexItem);
    this.updateImgAndSong();
  }

  resizeRowHeightGrid(value: number, nbScore: number, indexItem: number) {
    if ((value != 1) || (nbScore < 0)) {
      if ((this.evalJsonService.rowHeight[indexItem] + nbScore * 40) < 280) {
        this.evalJsonService.rowHeight[indexItem] = 280;
      } else {
        this.evalJsonService.rowHeight[indexItem] += nbScore * 40;
      }
    }
  }

  setChoiceOption(value: any, indexItem: number, indexGrid: number, indexChoice: number) {
    let calculIndex = 2 + (indexChoice * 2);
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][calculIndex] = value.target.value;
    this.updateImgAndSong();
  }

  choiceIsSelected(value: any, indexItem: number, indexGrid: number, indexChoice: number) {
    let calculIndex = 2 + (indexChoice * 2);
    return value == this.imgToDisplay[indexItem][indexGrid][calculIndex];
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
      this.evalJsonService.imgToDisplay[indexItem][indexGrid][0] = "assets/NeedImage.png";
      this.evalJsonService.imgToZip[indexItem][indexGrid * 2] = "";
      this.evalJsonService.imgToZip[indexItem][indexGrid * 2 + 1] = "";
    } finally {
      this.updateImgAndSong();
    }
  }

  resetImg(indexItem: number, indexGrid: number) {
    this.evalJsonService.imgToDisplay[indexItem][indexGrid][0] = "assets/NeedImage.png";
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

  home() {
    this.router.navigate(['/home']);
  }

  next() {
    this.router.navigate(['/zip']);
  }

  previous() {
    this.router.navigate(['/scores']);
  }
}
