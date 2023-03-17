import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";
import {OrderProgressBarService} from "../../services/orderProgressBar/order-progress-bar.service";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navbarTheme: string = "";
  navbarDropdownTheme: string = "";

  activateAlert: string = "";

  constructor(private themeService: ThemeService,
              private orderProgressBarService: OrderProgressBarService,
              private settingsService: SettingsService) {

    this.navbarTheme = this.themeService.navbarTheme[0];
    this.navbarDropdownTheme = this.themeService.navbarTheme[1];

    this.themeService.navbarThemeObservable.subscribe(value => {
      this.navbarTheme = value[0];
      this.navbarDropdownTheme = value[1];
    });

    this.orderProgressBarService.actualStepObservable.subscribe(value => {
      if (value != 0){
        this.activateAlert = "modal";
      }else {
        this.activateAlert = "";
      }
    });
  }

  openModalWithNavbarTitle(value: boolean){
    this.settingsService.openModal(value);
  }
}
