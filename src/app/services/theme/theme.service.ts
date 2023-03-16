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

  homeTheme: string[] = ["card text-bg-dark", "card-header cardHeaderColor text-center", "explanation explanationColor"];
  homeThemeObservable = new Subject<string[]>();

  constructor() { }

  changeTheme(value: string){
    this.themeChoice = value;
    this.themeChoiceObservable.next(value);
    if (value == "light"){
      this.bodyTheme = "";
      this.navbarTheme = ["navbar navbar-light bg-light", "dropdown-menu"];
      this.homeTheme = ["card text-bg-light", "card-header text-center", "explanation"];
      this.bodyThemeObservable.next("");
      this.navbarThemeObservable.next(["navbar navbar-light bg-light", "dropdown-menu"]);
      this.homeThemeObservable.next(["card text-bg-light", "card-header text-center", "explanation"]);
    }else {
      this.bodyTheme = "bg-secondary";
      this.navbarTheme = ["navbar navbar-dark bg-dark", "dropdown-menu dropdown-menu-dark"];
      this.homeTheme = ["card text-bg-dark", "card-header cardHeaderColor text-center", "explanation explanationColor"];
      this.bodyThemeObservable.next("bg-secondary")
      this.navbarThemeObservable.next(["navbar navbar-dark bg-dark", "dropdown-menu dropdown-menu-dark"]);
      this.homeThemeObservable.next(["card text-bg-dark", "card-header cardHeaderColor text-center", "explanation explanationColor"]);
    }
  }
}
