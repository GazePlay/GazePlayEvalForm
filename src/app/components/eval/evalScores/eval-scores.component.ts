import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-eval-scores',
  templateUrl: './eval-scores.component.html',
  styleUrls: ['./eval-scores.component.css']
})
export class EvalScoresComponent implements OnInit {

  actualStep: number = 3;
  scores: String[][] = [];
  errorsScores: Boolean[] = [];
  errorElem: any;
  errorNameScore: String = "Ce nom de score existe déjà !";
  haveError: Boolean = false;

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.updateScores();
    this.haveScoresErrors();
    setTimeout(() => {
      this.updateErrors();
    }, 250);
  }

  setNameScore(value: any, index: number) {
    if (!this.checkIfNameExist(value.target.value, index)) {
      this.evalJsonService.scores[index][0] = value.target.value;
      this.setError(false, index);
    } else {
      this.evalJsonService.scores[index][0] = value.target.value;
      this.setError(true, index);
    }
    this.updateScores();
    this.haveScoresErrors();
    this.updateErrors();
  }

  checkIfNameExist(name: String, index: number) {
    let find = false;
    this.scores.forEach(elem => {
      if (elem[0].toLowerCase() == name.toLowerCase()) {
        find = true;
      }
    });
    this.evalJsonService.errorsScores[index] = find;
    return find;
  }

  setError(value: boolean, index: number) {
    let id = "ErrorScoreName" + index;
    this.errorElem = document.getElementById(id);
    if (value) {
      this.errorElem.style = "";
    } else {
      this.errorElem.style = "visibility: hidden";
    }
  }

  addOneMoreScore() {
    this.evalJsonService.scores.push([""]);
    this.evalJsonService.errorsScores.push(false);
    this.updateScores();
  }

  removeScore(index: number) {
    let tmpScore: String[][] = [];
    let tmpErrorsScores: Boolean[] = [];
    for (let i = 0; i < this.evalJsonService.scores.length; i++) {
      if (i != index) {
        tmpScore.push(this.evalJsonService.scores[i]);
        tmpErrorsScores.push(this.errorsScores[i]);
      }
    }
    this.evalJsonService.scores = tmpScore;
    this.evalJsonService.errorsScores = tmpErrorsScores;
    this.updateScores();
    this.haveScoresErrors();
  }

  updateScores() {
    this.scores = this.evalJsonService.scores;
    this.errorsScores = this.evalJsonService.errorsScores;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.evalJsonService.scores, event.previousIndex, event.currentIndex);
    this.updateScores();
  }

  haveScoresErrors() {
    let haveScoresErrors = false;
    this.errorsScores.forEach(elem => {
      if (elem) {
        haveScoresErrors = true;
      }
    });
    this.haveError = haveScoresErrors;
  }

  updateErrors() {
    for (let i = 0; i < this.evalJsonService.scores.length; i++) {
      let id = "ErrorScoreName" + i;
      this.errorElem = document.getElementById(id);
      if (this.evalJsonService.errorsScores[i]) {
        this.errorElem.style = "";
      } else {
        this.errorElem.style = "visibility: hidden";
      }
    }
  }

  home() {
    this.router.navigate(['/home']);
  }

  next() {
    this.router.navigate(['/assets']);
  }

  previous() {
    this.router.navigate(['/user']);
  }

  checkValues() {

  }
}
