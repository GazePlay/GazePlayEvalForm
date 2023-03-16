import {Component} from '@angular/core';
import {ThemeService} from "./services/theme/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'GazePlayEvalForm';
  bodyTheme = "bg-secondary";

  constructor(private themeService: ThemeService) {
    this.bodyTheme = themeService.bodyTheme;
    this.themeService.bodyThemeObservable.subscribe(value => {
      this.bodyTheme = value;
    });
  }
}
