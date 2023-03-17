import {Component} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-order-progress-bar',
  templateUrl: './order-progress-bar.component.html',
  styleUrls: ['./order-progress-bar.component.css']
})
export class OrderProgressBarComponent {

  card = "";

  constructor(private themeService: ThemeService) {
    this.card = this.themeService.orderProgressBarTheme;
    this.themeService.orderProgressBarThemeObservable.subscribe(value => {
      this.card = value;
    });
  }
}
