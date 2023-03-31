import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  styleUrls: ['./info-alert.component.css']
})
export class InfoAlertComponent {

  infoAlert: any;

  titleMessage: string = "";
  contentMessage: string = "";

  constructor(private settingsService: SettingsService) {
    this.settingsService.messageInfoAlertObservable.subscribe(value => {
      this.titleMessage = value[0];
      this.contentMessage = value[1];
    });
  }

  close(){
    this.infoAlert = document.getElementById("infoAlert");
    this.infoAlert.style = "display: none !important";
  }
}
