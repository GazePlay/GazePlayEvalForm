import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-player-recorder',
  templateUrl: './player-recorder.component.html',
  styleUrls: ['./player-recorder.component.css']
})
export class PlayerRecorderComponent {

  offcanvas: string = "";
  closeButton: string = "";
  navbarButton: string = "";
  text: string = "";
  navTabs: string = "";

  constructor(private themeService: ThemeService) {

    this.offcanvas = this.themeService.menuTheme[0];
    this.closeButton = this.themeService.menuTheme[1];
    this.navbarButton = this.themeService.menuTheme[2];
    this.text = this.themeService.menuTheme[3];

    this.themeService.menuThemeObservable.subscribe(value => {
      this.offcanvas = value[0];
      this.closeButton = value[1];
      this.navbarButton = value[2];
      this.text = value[3];
      this.navTabs = value[4];
      this.adapteOffcanvas();
    });
    this.adapteOffcanvas();
  }

  adapteOffcanvas(){
    this.offcanvas = this.offcanvas.replace("offcanvas offcanvas-start", "offcanvas offcanvas-bottom");
  }
}
