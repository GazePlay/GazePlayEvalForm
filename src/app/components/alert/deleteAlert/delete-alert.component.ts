import { Component } from '@angular/core';
import {ThemeService} from "../../../services/theme/theme.service";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent {

  modalHeader: string = "";
  modalBody: string = "";
  modalFooter: string = "";

  constructor(private themeService: ThemeService,
              private settingsService: SettingsService) {

    this.modalHeader = this.themeService.homeAlertTheme[0];
    this.modalBody = this.themeService.homeAlertTheme[1];
    this.modalFooter = this.themeService.homeAlertTheme[2];
    this.themeService.homeAlertThemeObservable.subscribe(value => {
      this.modalHeader = value[0];
      this.modalBody = value[1];
      this.modalFooter = value[2];
    });
  }

  deleteElem(value: boolean){
    this.settingsService.deleteElemWithModal(value);
  }
}
