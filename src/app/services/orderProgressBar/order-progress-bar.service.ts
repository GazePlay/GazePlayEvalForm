import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderProgressBarService {

  orderProgress: any;

  actualStep: number = 0;
  actualStepObservable = new Subject<number>();

  maxStep: number = 5;

  constructor() {
  }

  setStepOrderProgressBar(step: number) {
    this.actualStep = step;
    this.actualStepObservable.next(step);
  }

  setupOrderProgressBar() {
    this.resetOrderProgressBar();
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "";
    for (let i = 1; i <= this.actualStep; i++) {
      this.orderProgress = document.getElementById(String(i));
      this.orderProgress.className = "step active";
    }
  }

  resetOrderProgressBar() {
    for (let i = 1; i <= this.maxStep; i++) {
      this.orderProgress = document.getElementById(String(i));
      this.orderProgress.className = "step";
    }
  }
}
