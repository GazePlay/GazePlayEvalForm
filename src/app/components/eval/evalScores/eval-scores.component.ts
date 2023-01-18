import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";

@Component({
  selector: 'app-eval-scores',
  templateUrl: './eval-scores.component.html',
  styleUrls: ['./eval-scores.component.css']
})
export class EvalScoresComponent implements OnInit{

  actualStep:number = 3;
  scores:String[][];

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
    this.scores = this.evalJsonService.scores;
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
  }

  setNameScore(value: any, index: number){
    this.evalJsonService.scores[index][0] = value.target.value;
    this.evalJsonService.scores[index][1] = value.target.value.slice(0,3) + this.evalJsonService.index;
    this.evalJsonService.listTag[index] = this.scores[index][1];
    this.evalJsonService.index++;
  }

  setValueScore(value: any, index: number){
    this.evalJsonService.scores[index][2] = value.target.value;
  }

  setMaxValeScore(value: any, index: number){
    this.evalJsonService.scores[index][3] = value.target.value;
  }

  addOneMoreScore(){
    this.evalJsonService.scores.push(["", "", "", ""]);
    this.updateScores();
  }

  removeOneMoreScore(index: number){
    let tmp:String[][] = [];
    for (let i=0; i<this.evalJsonService.scores.length; i++){
      if (i != index){
        tmp.push(this.evalJsonService.scores[i]);
      }
    }
    this.evalJsonService.scores = tmp;
    this.removeOneTag(index);
    this.updateScores();
  }

  removeOneTag(index: number){
    let tmp:String[]= [];
    for (let i=0; i<this.evalJsonService.listTag.length; i++){
      if (i != index){
        tmp.push(this.evalJsonService.listTag[i]);
      }
    }
    this.evalJsonService.listTag = tmp;
  }

  updateScores(){
    this.scores = this.evalJsonService.scores;
  }

  next(){
    this.router.navigate(['/assets']);
  }

  previous(){
    this.router.navigate(['/user']);
  }
}
