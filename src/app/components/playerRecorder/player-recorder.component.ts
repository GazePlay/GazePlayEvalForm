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

  showError: boolean = false;
  showFile: boolean = false;
  showFileUpload: boolean = false;

  soundName: string = "";
  soundToListen: any = "";
  soundToZip: any = "";
  uploadFileProgress: string = "width: 0%"

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

  dropFile(value: any) {
    const song = value.addedFiles[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(song);
      reader.onload = () => {
        this.showFileUpload = true;

        let progressUpload: number = 0;
        const progressInterval = setInterval(() => {
          if (progressUpload < 99){
            progressUpload += 5;
            this.uploadFileProgress = "width: " + progressUpload + "%";
          }else {
            clearInterval(progressInterval);
            setTimeout(() => {
              this.soundName = song.name;
              this.soundToListen = String(reader.result);
              this.soundToZip = song;

              this.showError = false;
              this.showFileUpload = false;
              this.showFile = true
            }, 1000);
          }
        }, 200);
      };
    } catch (e) {
      this.showError = true;
    }
  }

  onRemove() {
    this.soundName = "";
    this.soundToListen = "";
    this.soundToZip = "";

    this.showFile = false;
  }

}
