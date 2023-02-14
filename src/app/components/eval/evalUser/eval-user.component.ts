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
  info: any[][] = [];
  options: Boolean[][] = [[true, false, false, false]];
  type: String[] = ["none"];

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
    this.evalJsonService.info[index][0] = value.target.value;
    this.updateInfo();
  }

  getValueInfo(value: any, index: number) {
    this.evalJsonService.info[index][1] = String(value.target.value);
    this.updateInfo();
  }

  getOutput(value: any, index: number) {
    this.evalJsonService.type[index] = value.target.value;

    switch (this.type[index]) {
      case "none":
        this.evalJsonService.options[index] = [true, false, false, false];
        break;
      case "text":
        this.evalJsonService.options[index] = [false, true, false, false];
        break;
      case "number":
        this.evalJsonService.options[index] = [false, false, true, false];
        break;
      case "date":
        this.evalJsonService.options[index] = [false, false, false, true];
        break;
      default:
        break;
    }
    this.updateInfo();
  }

  addOneMoreInfo() {
    this.evalJsonService.info.push(["", ""]);
    this.evalJsonService.options.push([true, false, false, false]);
    this.evalJsonService.type.push("");
    this.updateInfo();
  }

  removeInfo(index: number) {
    let tmpInfo: String[][] = [];
    let tmpOption: Boolean[][] = [];
    let tmpType: String[] = [];
    for (let i = 0; i < this.evalJsonService.info.length; i++) {
      if (i != index) {
        tmpInfo.push(this.evalJsonService.info[i]);
        tmpOption.push(this.evalJsonService.options[i]);
        tmpType.push(this.evalJsonService.type[i]);
      }
    }
    this.evalJsonService.info = tmpInfo;
    this.evalJsonService.options = tmpOption;
    this.evalJsonService.type = tmpType;
    this.updateInfo();
  }

  updateInfo() {
    this.info = this.evalJsonService.info;
    this.options = this.evalJsonService.options;
    this.type = this.evalJsonService.type;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.evalJsonService.info, event.previousIndex, event.currentIndex);
    moveItemInArray(this.evalJsonService.options, event.previousIndex, event.currentIndex);
    moveItemInArray(this.evalJsonService.type, event.previousIndex, event.currentIndex);
    this.updateInfo();
  }

  home() {
    this.router.navigate(['/home']);
  }

  next() {
    this.router.navigate(['/assets']);
  }

  previous() {
    this.router.navigate(['/informations']);
  }
}
