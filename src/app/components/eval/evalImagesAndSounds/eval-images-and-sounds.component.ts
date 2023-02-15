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
  cols:number[] = [];
  rows:number[] = [];
  imgAndSongToDisplay: String[][] = [[""]];

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
  }

  addOneMoreItem(){

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
