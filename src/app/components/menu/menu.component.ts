import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme/theme.service";
import {OrderProgressBarService} from "../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../services/json/eval-json.service";
import {SettingsService} from "../../services/settings/settings.service";
import {ImportEvalComponent} from "../importEval/import-eval.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  orderProgress: any;
  infoAlert: any;

  titleInfoAlertMessage: string = " Sauvegarde";
  contentInfoAlertMessage: string = "Une sauvegarde a été effectuer !";
  delayForCloseInfoAlert: any = setTimeout;

  offcanvas: string = "";
  closeButton: string = "";
  navbarButton: string = "";
  text: string = "";

  activateAlert: string[] = ["", ""];

  constructor(private router: Router,
              private themeService: ThemeService,
              private orderProgressBarService: OrderProgressBarService,
              private evalJsonService: EvalJsonService,
              private settingsService: SettingsService,
              private dialog: MatDialog) {

    this.offcanvas = this.themeService.menuTheme[0];
    this.closeButton = this.themeService.menuTheme[1];
    this.navbarButton = this.themeService.menuTheme[2];
    this.text = this.themeService.menuTheme[3];

    this.themeService.menuThemeObservable.subscribe(value => {
      this.offcanvas = value[0];
      this.closeButton = value[1];
      this.navbarButton = value[2];
      this.text = value[3];
    });

    this.orderProgressBarService.actualStepObservable.subscribe(value => {
        if (value != 0){
          this.activateAlert = ["modal", "offcanvas"];
        }else {
          this.activateAlert = ["", ""];
        }
    });
  }

  startEval() {
    this.evalJsonService.resetJson();
    this.orderProgress = document.getElementById("orderProgressBar");
    this.orderProgress.style = "";
    this.router.navigate(['/informations']);
  }

  save(){
    clearTimeout(this.delayForCloseInfoAlert);
    this.settingsService.changeMessageInfoAlert(this.titleInfoAlertMessage, this.contentInfoAlertMessage);
    this.infoAlert = document.getElementById("infoAlert");
    this.infoAlert.style = "display: block !important";
    this.delayForCloseInfoAlert = setTimeout(() => {
      this.infoAlert.style = "display: none !important";
    }, this.settingsService.timeForMessageInfoAlert);
  }

  import(){
    this.router.navigate(['/import']);
  }
}
