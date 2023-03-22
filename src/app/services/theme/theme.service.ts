import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeChoice: string = "dark";
  themeChoiceObservable = new Subject<string>();

  bodyTheme: string = "bg-secondary";
  bodyThemeObservable = new Subject<string>();

  navbarTheme: string[] = ["navbar navbar-dark bg-dark", "dropdown-menu dropdown-menu-dark"];
  navbarThemeObservable = new Subject<string[]>();

  menuTheme: string[]= ["offcanvas offcanvas-start text-bg-dark", "closeButton darkText", "navbar-toggler navbar-button darkButton", "darkText"];
  menuThemeObservable = new Subject<string[]>();

  cardTheme: string[] = ["card text-bg-dark cardDark", "card-header cardHeaderColor text-center", "explanationColor", "btn btn-secondary btnColor"];
  cardThemeObservable = new Subject<string[]>();

  playerRecorderTheme: string[] = ["offcanvas offcanvas-start text-bg-dark", "closeButton darkText", "navbar-toggler navbar-button darkButton", "darkText", "nav-tabs-dark", "btn btn-secondary btnColor"];
  playerRecorderThemeObservable = new Subject<string[]>();

  homeAlertTheme: string[] = ["modal-header headerDark", "modal-body bodyDark bg-secondary", "modal-footer bg-secondary"];
  homeAlertThemeObservable = new Subject<string[]>();

  orderProgressBarTheme: string = "card card-timeline px-2 border-none bg-secondary";
  orderProgressBarThemeObservable = new Subject<string>();

  constructor() { }

  changeTheme(value: string){
    this.themeChoice = value;
    this.themeChoiceObservable.next(value);
    if (value == "light"){
      this.bodyTheme = "";
      this.navbarTheme = ["navbar navbar-light bg-light", "dropdown-menu"];
      this.menuTheme = ["offcanvas offcanvas-start text-bg-light", "closeButton lightText", "navbar-toggler navbar-button", "lightText"];
      this.cardTheme = ["card text-bg-light cardLight", "card-header text-center", "", "btn btn-secondary"];
      this.homeAlertTheme = ["modal-header bg-light", "modal-body", "modal-footer"];
      this.orderProgressBarTheme = "card card-timeline px-2 border-none";
      this.playerRecorderTheme = ["offcanvas offcanvas-start text-bg-light", "closeButton lightText", "navbar-toggler navbar-button", "lightText", "nav-tabs-light", "btn btn-secondary"];
      this.bodyThemeObservable.next("");
      this.navbarThemeObservable.next(["navbar navbar-light bg-light", "dropdown-menu"]);
      this.menuThemeObservable.next(["offcanvas offcanvas-start text-bg-light", "closeButton lightText", "navbar-toggler navbar-button", "lightText"]);
      this.cardThemeObservable.next(["card text-bg-light cardLight", "card-header text-center", "", "btn btn-secondary"]);
      this.homeAlertThemeObservable.next(["modal-header bg-light", "modal-body", "modal-footer"]);
      this.orderProgressBarThemeObservable.next("card card-timeline px-2 border-none");
      this.playerRecorderThemeObservable.next(["offcanvas offcanvas-start text-bg-light", "closeButton lightText", "navbar-toggler navbar-button", "lightText", "nav-tabs-light", "btn btn-secondary"]);
    }else {
      this.bodyTheme = "bg-secondary";
      this.navbarTheme = ["navbar navbar-dark bg-dark", "dropdown-menu dropdown-menu-dark"];
      this.menuTheme = ["offcanvas offcanvas-start text-bg-dark", "closeButton darkText", "navbar-toggler navbar-button darkButton", "darkText"];
      this.cardTheme = ["card text-bg-dark cardDark", "card-header cardHeaderColor text-center", "explanationColor", "btn btn-secondary btnColor"];
      this.homeAlertTheme = ["modal-header headerDark", "modal-body bodyDark bg-secondary", "modal-footer bg-secondary"];
      this.orderProgressBarTheme = "card card-timeline px-2 border-none bg-secondary";
      this.playerRecorderTheme = ["offcanvas offcanvas-start text-bg-dark", "closeButton darkText", "navbar-toggler navbar-button darkButton", "darkText", "nav-tabs-dark", "btn btn-secondary btnColor"];
      this.bodyThemeObservable.next("bg-secondary")
      this.navbarThemeObservable.next(["navbar navbar-dark bg-dark", "dropdown-menu dropdown-menu-dark"]);
      this.menuThemeObservable.next(["offcanvas offcanvas-start text-bg-dark", "closeButton darkText", "navbar-toggler navbar-button darkButton", "darkText"]);
      this.cardThemeObservable.next(["card text-bg-dark cardDark", "card-header cardHeaderColor text-center", "explanationColor", "btn btn-secondary btnColor"]);
      this.homeAlertThemeObservable.next(["modal-header headerDark", "modal-body bodyDark bg-secondary", "modal-footer bg-secondary"]);
      this.orderProgressBarThemeObservable.next("card card-timeline px-2 border-none bg-secondary");
      this.playerRecorderThemeObservable.next(["offcanvas offcanvas-start text-bg-dark", "closeButton darkText", "navbar-toggler navbar-button darkButton", "darkText", "nav-tabs-dark", "btn btn-secondary btnColor"]);
    }
  }
}
