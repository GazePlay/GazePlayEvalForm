import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";

@Component({
  selector: 'app-eval-informations',
  templateUrl: './eval-informations.component.html',
  styleUrls: ['./eval-informations.component.css']
})
export class EvalInformationsComponent implements OnInit{

  actualStep:number = 1;

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
  }

  getNameEval(value: any){
    this.evalJsonService.nameEval = value.target.value;
  }

  getOutput(value: any){
    this.evalJsonService.output = value.target.value;
  }

  next(){
    this.router.navigate(['/user']);
  }
}
