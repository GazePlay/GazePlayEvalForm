import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {MatDialog} from "@angular/material/dialog";
import {ChooseSoundComponent} from "../../chooseSound/choose-sound.component";

@Component({
  selector: 'app-eval-images-and-sounds',
  templateUrl: './eval-images-and-sounds.component.html',
  styleUrls: ['./eval-images-and-sounds.component.css']
})
export class EvalImagesAndSoundsComponent implements OnInit{

  actualStep:number = 4;
  imgAndSongToDisplay:String[][];
  scores:String[][];

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService,
    private dialog: MatDialog) {
    this.imgAndSongToDisplay = this.evalJsonService.imgAndSongToDisplay;
    this.scores = this.evalJsonService.scores;
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
  }

  openChooseSoundDialog(){
    let dialogRef = this.dialog.open(ChooseSoundComponent,{
      width: '500px',
      height: '500px',
      position: {
        top: '-60vh',
        left: '30ch'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateImgAndSongToDisplay();
    })
  }

  setImageLeft(value: any, index: number){
    const image = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.evalJsonService.imgAndSongToDisplay[index][0] = String(reader.result);
        this.evalJsonService.imgAndSongToZip[index][0] = image;
        this.evalJsonService.assets[index][0] = image.name;
      };
    }catch (e){
      this.evalJsonService.imgAndSongToDisplay[index][0] = "assets/NeedImage.png";
    }finally {
      this.updateImgAndSongToDisplay();
    }
  }

  setImageRight(value: any, index: number){
    const image = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.evalJsonService.imgAndSongToDisplay[index][1] = String(reader.result);
        this.evalJsonService.imgAndSongToZip[index][1] = image;
        this.evalJsonService.assets[index][2] = image.name;
      };
    }catch (e){
      this.evalJsonService.imgAndSongToDisplay[index][1] = "assets/NeedImage.png";
    }finally {
      this.updateImgAndSongToDisplay();
    }
  }

  resetImageLeft(index: number){
    this.evalJsonService.imgAndSongToDisplay[index][0] = "assets/NeedImage.png";
    this.evalJsonService.imgAndSongToZip[index][0] = "";
    this.evalJsonService.assets[index][0] = "";
    this.updateImgAndSongToDisplay();
  }

  resetImageRight(index: number){
    this.evalJsonService.imgAndSongToDisplay[index][1] = "assets/NeedImage.png";
    this.evalJsonService.imgAndSongToZip[index][1] = "";
    this.evalJsonService.assets[index][2] = "";
    this.updateImgAndSongToDisplay();
  }

  setSound(value: any, index:number){
    const song = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(song);
      reader.onload = () => {
        this.evalJsonService.imgAndSongToDisplay[index][2] = String(reader.result);
        this.evalJsonService.imgAndSongToZip[index][2] = song;
        this.evalJsonService.assets[index][4] = song.name;
      };
    }catch (e){
      this.evalJsonService.imgAndSongToDisplay[index][3] = "";
    }finally {
      this.updateImgAndSongToDisplay();
    }
  }

  resetSound(index: number){
    this.evalJsonService.imgAndSongToDisplay[index][3] = "";
    this.evalJsonService.assets[index][4] = "";
    this.updateImgAndSongToDisplay();
  }

  setDescriptionImageLeft(value: any, index: number){
    this.evalJsonService.assets[index][1] = value.target.value;
  }

  setDescriptionImageRight(value: any, index: number){
    this.evalJsonService.assets[index][3] = value.target.value;
  }

  setDescriptionSound(value: any, index: number){
    this.evalJsonService.assets[index][5] = value.target.value;
  }

  setGoodImage(value: String, index: number){
    this.evalJsonService.assets[index][6] = value;
  }

  addOneMoreItem(){
    this.imgAndSongToDisplay.push(["assets/NeedImage.png", "assets/NeedImage.png", ""]);
    this.evalJsonService.imgAndSongToZip.push(["","",""]);
    this.evalJsonService.assets.push(["", "", "", "", "", "", "", ""]);
    this.updateImgAndSongToDisplay();
  }

  removeOneMoreItem(index: number){
    let tmp:String[][] = [];
    for (let i=0; i<this.evalJsonService.assets.length; i++){
      if (i != index){
        tmp.push(this.evalJsonService.assets[i]);
      }
    }
    this.evalJsonService.assets = tmp;

    tmp = [];
    for (let j=0; j<this.evalJsonService.imgAndSongToDisplay.length; j++){
      if (j != index){
        tmp.push(this.evalJsonService.imgAndSongToDisplay[j]);
      }
    }
    this.evalJsonService.imgAndSongToDisplay = tmp;
    this.updateImgAndSongToDisplay();
  }

  addTag(value: Event, index: number, tagIndex: number){
    if (this.evalJsonService.assets[index][7].includes(this.evalJsonService.listTag[tagIndex].toString())){
      let tmp:String[] = this.evalJsonService.assets[index][7].split(",");
      this.evalJsonService.assets[index][7] = "";
      tmp.forEach(value => {
        if (value != this.evalJsonService.listTag[tagIndex]){
          if (this.evalJsonService.assets[index][7] == ""){
            this.evalJsonService.assets[index][7] = this.evalJsonService.assets[index][7].toString() + value;
          }else {
            this.evalJsonService.assets[index][7] = this.evalJsonService.assets[index][7] + "," + value;
          }
        }
      });
    }else {
      if (this.evalJsonService.assets[index][7] == ""){
        this.evalJsonService.assets[index][7] = this.evalJsonService.listTag[tagIndex];
      }else {
        this.evalJsonService.assets[index][7] = this.evalJsonService.assets[index][7] + "," + this.evalJsonService.listTag[tagIndex];
      }
    }
    this.updateImgAndSongToDisplay();
  }

  updateImgAndSongToDisplay(){
    this.imgAndSongToDisplay = this.evalJsonService.imgAndSongToDisplay;
  }

  next(){
    //this.router.navigate(['/assets']);
  }

  previous(){
    this.router.navigate(['/scores']);
  }
}
