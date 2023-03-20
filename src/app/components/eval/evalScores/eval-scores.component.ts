import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ThemeService} from "../../../services/theme/theme.service";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-eval-scores',
  templateUrl: './eval-scores.component.html',
  styleUrls: ['./eval-scores.component.css']
})
export class EvalScoresComponent implements OnInit {

  actualStep: number = 3;

  skillToEvaluate: String[][] = [];
  showErrors: boolean = false;
  error: any[] = ["", ""];

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";

  indexElemToDelete: number = -1;

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService,
    private themeService: ThemeService,
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

    this.settingsService.deleteElemWhitModalObservable.subscribe(value => {
      if (value){
        this.removeScore(this.indexElemToDelete);
      }
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
      this.updateScores();
    }
  }

  setNameScore(value: any, index: number) {
      this.evalJsonService.skillToEvaluate[index][0] = value.target.value;
    this.updateScores();
  }

  checkIfNameExist(name: String, index: number) {
    let find = false;
    this.skillToEvaluate.forEach(elem => {
      if (elem[0].toLowerCase() == name.toLowerCase()) {
        find = true;
      }
    });
    return find;
  }

  getIndexElemToDelete(value: number){
    this.indexElemToDelete = value;
  }

  addOneMoreScore() {
    this.evalJsonService.skillToEvaluate.push([""]);
    this.updateScores();
  }

  removeScore(index: number) {
    let tmpScore: String[][] = [];
    for (let i = 0; i < this.evalJsonService.skillToEvaluate.length; i++) {
      if (i != index) {
        tmpScore.push(this.evalJsonService.skillToEvaluate[i]);
      }
    }
    this.evalJsonService.skillToEvaluate = tmpScore;
    this.updateScores();
  }

  updateScores() {
    this.skillToEvaluate = this.evalJsonService.skillToEvaluate;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.evalJsonService.skillToEvaluate, event.previousIndex, event.currentIndex);
    this.updateScores();
  }

  checkValues(){
    let error: boolean = false;
    for (let i=0; i<this.skillToEvaluate.length; i++){
      if (this.skillToEvaluate[i][0] == ""){
        error = true;
        this.error = ["", i];
        break;
      }
    }
    return error;
  }

  next() {
    if (!this.checkValues()){
      this.showErrors = false;
      this.router.navigate(['/assets']);
    }else {
      this.showErrors = true;
    }
  }

  previous() {
    this.router.navigate(['/user']);
  }
}
