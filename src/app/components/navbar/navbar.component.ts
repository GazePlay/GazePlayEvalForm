import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navbarTheme: string = "";
  navbarDropdownTheme: string = "";

  constructor(private themeService: ThemeService) {

    this.navbarTheme = this.themeService.navbarTheme[0];
    this.navbarDropdownTheme = this.themeService.navbarTheme[1];

    this.themeService.navbarThemeObservable.subscribe(value => {
      this.navbarTheme = value[0];
      this.navbarDropdownTheme = value[1];
    })
  }

}
