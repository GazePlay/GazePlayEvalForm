import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-eval-user',
  templateUrl: './eval-user.component.html',
  styleUrls: ['./eval-user.component.css']
})
export class EvalUserComponent implements OnInit {

  actualStep: number = 2;
  infoPatient: any[][] = [];
  showErrors: boolean = false;
  error: any[] = ["", ""];

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.updateInfo();
  }

  getNameInfo(value: any, index: number) {
    this.evalJsonService.infoPatient[index][0] = String(value.target.value);
    this.updateInfo();
  }

  getValueInfo(value: any, index: number) {
    this.evalJsonService.infoPatient[index][1] = String(value.target.value);
    this.updateInfo();
  }

  addOneMoreInfo() {
    this.evalJsonService.infoPatient.push(["", ""]);
    this.updateInfo();
  }

  removeInfo(index: number) {
    let tmpInfoPatient: String[][] = [];
    for (let i = 0; i < this.evalJsonService.infoPatient.length; i++) {
      if (i != index) {
        tmpInfoPatient.push(this.evalJsonService.infoPatient[i]);
      }
    }
    this.evalJsonService.infoPatient = tmpInfoPatient;
    this.updateInfo();
  }

  updateInfo() {
    this.infoPatient = this.evalJsonService.infoPatient;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex != 0){
      moveItemInArray(this.evalJsonService.infoPatient, event.previousIndex, event.currentIndex);
      this.updateInfo();
    }
  }

  checkValues(){
    let error: boolean = false;
    for (let i=0; i<this.infoPatient.length; i++){
      if (this.infoPatient[i][0] == ""){
        error = true;
        this.error = ["L'intitulé", i+1];
        break;
      }else if (this.infoPatient[i][1] == ""){
        error = true;
        this.error = ["La valeur", i+1];
        break;
      }
    }
    return error;
  }

  next() {
    if (!this.checkValues()){
      this.showErrors = false;
      this.router.navigate(['/scores']);
    }else {
      this.showErrors = true;
    }
  }

  previous() {
    this.router.navigate(['/informations']);
  }
}
