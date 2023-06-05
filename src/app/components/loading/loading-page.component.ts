import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Router} from "@angular/router";
import {OrderProgressBarService} from "../../services/orderProgressBar/order-progress-bar.service";

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit{

  actualStep: number = 4;

  constructor(private settingsService: SettingsService,
              private orderProgressBarService: OrderProgressBarService,
              private router: Router) {
    this.settingsService.onLoadingObservable.subscribe(value => {
      if (value){
        setTimeout(() => {
          this.router.navigate(['/manual']);
        }, 5000)
      }
    });
  }

  ngOnInit() {
    this.canAccess();
  }

  canAccess(){
    if ((this.orderProgressBarService.actualStep + 1) < this.actualStep){
      this.router.navigate(['/home']);
    }
  }
}
