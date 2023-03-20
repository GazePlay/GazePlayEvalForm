import {Component} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent{

  isDarkTheme: boolean = true;

  offcanvas: string = "";
  closeButton: string = "";
  navbarButton: string = "";
  text: string = "";

  constructor(private themeService: ThemeService) {

    this.isDarkTheme = this.themeService.themeChoice == "dark";
    this.themeService.themeChoiceObservable.subscribe(value => {
      this.isDarkTheme = value == "dark";
    });

    this.offcanvas = this.themeService.menuTheme[0];
    this.closeButton = this.themeService.menuTheme[1];
    this.navbarButton = this.themeService.menuTheme[2];
    this.text = this.themeService.menuTheme[3];
    this.themeService.menuThemeObservable.subscribe(value => {
      this.offcanvas = value[0];
      this.closeButton = value[1];
      this.navbarButton = value[2];
      this.text = value[3];
      this.adapteOffcanvas();
    });
    this.adapteOffcanvas();
  }

  changeTheme(value: string){
    this.themeService.changeTheme(value);
  }

  adapteOffcanvas(){
    this.offcanvas = this.offcanvas.replace("offcanvas offcanvas-start", "offcanvas offcanvas-end");
  }
}
