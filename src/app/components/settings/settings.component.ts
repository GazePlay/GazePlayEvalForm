import {Component} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent{
  showThemes: boolean = false;
  isDarkTheme: boolean = true;
  svgPathCaretRight: string = "M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z";
  svgPathCaretDown: string = "M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z";
  svgPathCaret: string = this.svgPathCaretRight;

  constructor(private themeService: ThemeService) {

    this.isDarkTheme = this.themeService.themeChoice == "dark";

    this.themeService.themeChoiceObservable.subscribe(value => {
      this.isDarkTheme = value == "dark";
    });
  }

  showHideTheme(){
    if (this.svgPathCaret == this.svgPathCaretRight){
      this.svgPathCaret = this.svgPathCaretDown;
      this.showThemes = true;
    }else {
      this.svgPathCaret = this.svgPathCaretRight;
      this.showThemes = false;
    }
  }

  changeTheme(value: string){
    this.themeService.changeTheme(value);
  }
}
