import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderProgressBarService {

  orderProgress: any;
  actualStep:number = 1;
  maxStep:number = 5;

  constructor() { }

  setStepOrderProgressBar(step: number){
    this.actualStep = step;
  }

  setupOrderProgressBar(){
    this.resetOrderProgressBar();
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "";
    for (let i=1; i<=this.actualStep; i++){
      this.orderProgress = document.getElementById(String(i));
      this.orderProgress.className = "step active";
    }
  }

  resetOrderProgressBar(){
    for (let i=1; i<=this.maxStep; i++){
      this.orderProgress = document.getElementById(String(i));
      this.orderProgress.className = "step";
    }
  }
}
