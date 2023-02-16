import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";

@Component({
  selector: 'app-eval-get-zip',
  templateUrl: './eval-get-zip.component.html',
  styleUrls: ['./eval-get-zip.component.css']
})
export class EvalGetZipComponent implements OnInit{

  actualStep:number = 5;
  isAnonymous: Boolean = true;
  scores:String[][] = [];
  assets:String[][] = [];
  imgAndSongToDisplay:String[][] = [];
  listTag:String[] = [];
  displayScore: Boolean = true;

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.checkScore();
  }

  getName(){
    return this.evalJsonService.nameEval;
  }

  getIsAnonymous(){
    if (this.isAnonymous){
      return "Oui";
    }else {
      return "Non";
    }
  }

  checkScore(){
    this.displayScore = this.scores.length != 0;
  }

  playAudio(index:number){
    const audio = new Audio(this.assets[index][2].toString());
    audio.play();
  }

  getLastname(){
  }

  getFirstName(){
  }

  getGender(){
  }

  getAge(){
  }

  getBirthDate(){
  }

  getBirthPlace(){
  }

  getZip(){
    this.evalJsonService.createEval();
  }

  home(){
    this.router.navigate(['/home']);
  }

  previous(){
    this.router.navigate(['/assets']);
  }
}
