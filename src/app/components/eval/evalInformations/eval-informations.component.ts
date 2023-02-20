import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";

@Component({
  selector: 'app-eval-informations',
  templateUrl: './eval-informations.component.html',
  styleUrls: ['./eval-informations.component.css']
})
export class EvalInformationsComponent implements OnInit {

  actualStep: number = 1;
  nameEval: String = "";
  allOption: Boolean = true;
  csvOption: Boolean = false;
  xlsxOption: Boolean = false;

  constructor(
    private router: Router,
    private orderProgressBarService: OrderProgressBarService,
    private evalJsonService: EvalJsonService) {
  }

  ngOnInit(): void {
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgressBarService.setupOrderProgressBar();
    this.nameEval = this.evalJsonService.nameEval;
    this.setOption();
  }

  setOption() {
    switch (this.evalJsonService.output) {
      case "all":
        this.allOption = true;
        this.csvOption = false;
        this.xlsxOption = false
        break;
      case "csv":
        this.allOption = false;
        this.csvOption = true;
        this.xlsxOption = false
        break;
      case "xlsx":
        this.allOption = false;
        this.csvOption = false;
        this.xlsxOption = true
        break;
      default:
        break;
    }
  }

  getNameEval(value: any) {
    this.evalJsonService.nameEval = value.target.value;
  }

  getOutput(value: any) {
    this.evalJsonService.output = value.target.value;
  }

  home() {
    this.router.navigate(['/home']);
  }

  next() {
    this.router.navigate(['/user']);
  }
}
