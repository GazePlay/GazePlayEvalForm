import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {ThemeService} from "../../../services/theme/theme.service";

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

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";

  constructor(private router: Router,
              private orderProgressBarService: OrderProgressBarService,
              private evalJsonService: EvalJsonService,
              private themeService: ThemeService) {

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
      this.nameEval = this.evalJsonService.nameEval;
      this.setOption();
    }
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

  next() {
    this.router.navigate(['/user']);
  }
}
