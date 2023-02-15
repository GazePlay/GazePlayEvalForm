import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {MatDialog} from "@angular/material/dialog";
import {ChooseSoundComponent} from "../../chooseSound/choose-sound.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-eval-images-and-sounds',
  templateUrl: './eval-images-and-sounds.component.html',
  styleUrls: ['./eval-images-and-sounds.component.css']
})
export class EvalImagesAndSoundsComponent implements OnInit{

  actualStep:number = 4;
  imgAndSongToDisplay:String[][] = [];
  assets:String[][] = [];

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
    this.imgAndSongToDisplay = this.evalJsonService.imgAndSongToDisplay;
    this.assets = this.evalJsonService.assets;
  }

  openChooseSoundDialog(index:number){
    let dialogRef = this.dialog.open(ChooseSoundComponent,{
      width: '500px',
      height: '375px',
      data: {index: index}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateImgAndSongToDisplay();
    })
  }

  updateLeftImageDescription(index: number){
    return this.assets[index][1];
  }

  updateRightImageDescription(index: number){
    return this.assets[index][3];
  }

  updateSongDescription(index: number){
    return this.assets[index][5];
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

  checkGoodImage(value: String, index: number){
    if (this.evalJsonService.assets[index][6] == ""){
      return value == "leftImg";
    } else {
      if (value == "leftImg"){
        return this.evalJsonService.assets[index][6] == "First";
      }else {
        return this.evalJsonService.assets[index][6] == "Second";
      }
    }
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

  updateImgAndSongToDisplay(){
    this.imgAndSongToDisplay = this.evalJsonService.imgAndSongToDisplay;
  }

  getSrcFile(index:number){
    return this.sanitizer.bypassSecurityTrustResourceUrl(String(this.imgAndSongToDisplay[index][2]));
  }

  home(){
    this.router.navigate(['/home']);
  }

  next(){
    this.router.navigate(['/zip']);
  }

  previous(){
    this.router.navigate(['/scores']);
  }
}
