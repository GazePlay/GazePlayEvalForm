import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EvalJsonService} from "../../services/json/eval-json.service";
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orderProgress: any;

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";

  constructor(private router: Router,
              private evalJsonService: EvalJsonService,
              private themeService: ThemeService) {

    this.cardTheme = this.themeService.homeTheme[0];
    this.cardHeaderTheme = this.themeService.homeTheme[1];
    this.cardTextTheme = this.themeService.homeTheme[2];

    this.themeService.homeThemeObservable.subscribe(value => {
      this.cardTheme = value[0];
      this.cardHeaderTheme = value[1];
      this.cardTextTheme = value[2];
    })
  }

  ngOnInit(): void {
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "visibility: hidden";
    this.evalJsonService.resetJson();
  }
}
