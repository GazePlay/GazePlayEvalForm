import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../../services/orderProgressBar/order-progress-bar.service";
import {EvalJsonService} from "../../../services/json/eval-json.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ThemeService} from "../../../services/theme/theme.service";
import {AudioRecorderService} from "../../../services/audioRecorder/audio-recorder.service";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-eval-images-and-sounds',
  templateUrl: './eval-images-and-sounds.component.html',
  styleUrls: ['./eval-images-and-sounds.component.css']
})
export class EvalImagesAndSoundsComponent implements OnInit {

  actualStep: number = 4;

  cardTheme: string = "";
  cardHeaderTheme: string = "";
  cardTextTheme: string = "";
  buttonTheme: string = "";

  constructor(private router: Router,
              private orderProgressBarService: OrderProgressBarService,
              private evalJsonService: EvalJsonService,
              private dialog: MatDialog,
              public sanitizer: DomSanitizer,
              private themeService: ThemeService,
              private audioRecorderService: AudioRecorderService,
              private settingsService: SettingsService) {

    this.cardTheme = this.themeService.cardTheme[0];
    this.cardHeaderTheme = this.themeService.cardTheme[1];
    this.cardTextTheme = this.themeService.cardTheme[2];
    this.buttonTheme = this.themeService.cardTheme[3];
  }

  ngOnInit(): void {
    this.canAccess();
  }

  canAccess(){
    if ((this.orderProgressBarService.actualStep + 1) < this.actualStep){
      this.router.navigate(['/home']);
    }else {
      this.orderProgressBarService.setStepOrderProgressBar(this.actualStep);
      this.orderProgressBarService.setupOrderProgressBar();
    }
  }

  manual(){
    this.router.navigate(['/manual']);
  }

  auto(){
    this.router.navigate(['/auto']);
  }

  next() {
    this.settingsService.saveAuto();
    this.router.navigate(['/zip']);
  }

  previous() {
    this.settingsService.saveAuto();
    this.router.navigate(['/scores']);
  }
}
