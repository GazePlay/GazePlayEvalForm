import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EvalJsonService} from "../../services/json/eval-json.service";
import {ThemeService} from "../../services/theme/theme.service";
import {OrderProgressBarService} from "../../services/orderProgressBar/order-progress-bar.service";
import {DatabaseService} from "../../services/database/database.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  actualStep: number = 0;
  orderProgress: any;

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";

  constructor(private router: Router,
              private evalJsonService: EvalJsonService,
              private themeService: ThemeService,
              private orderProgressBarService: OrderProgressBarService,
              private databaseService: DatabaseService) {

    this.databaseService.init();

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
    this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "visibility: hidden";
  }

  startEval() {
    this.evalJsonService.resetJson();
    this.orderProgress.style = "";
    this.router.navigate(['/informations']);
  }
}
