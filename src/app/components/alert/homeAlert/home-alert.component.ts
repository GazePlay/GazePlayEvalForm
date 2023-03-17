import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ThemeService} from "../../../services/theme/theme.service";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-home-alert',
  templateUrl: './home-alert.component.html',
  styleUrls: ['./home-alert.component.css']
})
export class HomeAlertComponent {

  modalHeader: string = "";
  modalBody: string = "";
  modalFooter: string = "";

  openMenu: string = "#menu";

  constructor(private router: Router,
              private themeService: ThemeService,
              private settingsService: SettingsService) {

    this.modalHeader = this.themeService.homeAlertTheme[0];
    this.modalBody = this.themeService.homeAlertTheme[1];
    this.modalFooter = this.themeService.homeAlertTheme[2];
    this.themeService.homeAlertThemeObservable.subscribe(value => {
      this.modalHeader = value[0];
      this.modalBody = value[1];
      this.modalFooter = value[2];
    });

    this.settingsService.openModalWithNavbarTitleObservable.subscribe(value => {
      if (value){
        this.openMenu = "";
      }else {
        this.openMenu = "#menu";
      }
    });
  }

  returnHome(){
    this.router.navigate(['/home']);
  }
}
