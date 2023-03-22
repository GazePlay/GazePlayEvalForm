import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";
import {AudioRecorderService} from "../../services/audioRecorder/audio-recorder.service";
import {DomSanitizer} from "@angular/platform-browser";

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
  buttonAdd: string = "";

  showErrorDropFile: boolean = false;
  showErrorRecord: boolean = false;
  showErrorText: boolean = false;

  showFile: boolean = false;
  showFileUpload: boolean = false;
  disableAddSongButton: boolean = true;
  isRecording: boolean = false;

  acceptedFile: string[] = ["mp3", "wav"];
  soundName: string = "";
  soundFileToListen: any = "";
  soundRecordedToListen: any = "";
  soundToZip: any = "";
  uploadFileProgress: string = "width: 0%"
  nameRecord: string = "";
  nameText: string = "";

  errorDropFile: string = "";

  constructor(private themeService: ThemeService,
              public sanitizer: DomSanitizer,
              private audioRecorderService: AudioRecorderService) {

    this.offcanvas = this.themeService.playerRecorderTheme[0];
    this.closeButton = this.themeService.playerRecorderTheme[1];
    this.navbarButton = this.themeService.playerRecorderTheme[2];
    this.text = this.themeService.playerRecorderTheme[3];
    this.navTabs = this.themeService.playerRecorderTheme[4];
    this.buttonAdd = this.themeService.playerRecorderTheme[5];

    this.themeService.playerRecorderThemeObservable.subscribe(value => {
      this.offcanvas = value[0];
      this.closeButton = value[1];
      this.navbarButton = value[2];
      this.text = value[3];
      this.navTabs = value[4];
      this.buttonAdd = value[5];
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
    if (this.checkFile(song)){
      this.showErrorDropFile = false;
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
                this.soundFileToListen = String(reader.result);
                this.soundToZip = song;

                this.showFileUpload = false;
                this.showFile = true
                this.disableAddSongButton = false;
              }, 1000);
            }
          }, 200);
        };
      } catch (e) {
        this.errorDropFile = " Le fichier est corrompu, impossible de le charger ! ";
        this.showErrorDropFile = true;
      }
    }else {
      this.errorDropFile = " Le fichier n'est pas un format que l'on accepte, mp3 ou wav seulement ! ";
      this.showErrorDropFile = true;
    }
  }

  checkFile(song: any){
    const songName: string = song.name;
    const getExtension: string[] = songName.split(".");
    return this.acceptedFile.includes(getExtension[getExtension.length-1]);
  }

  removeFile() {
    this.soundName = "";
    this.soundFileToListen = "";
    this.soundToZip = "";

    this.showFile = false;
  }

  recording(){
    if (this.isRecording){
      this.stopRecord();
    }else {
      this.startRecord();
    }
  }

  startRecord(){
    this.isRecording = true;
    this.audioRecorderService.startRecording();
  }

  stopRecord(){
    this.isRecording = false;
    this.audioRecorderService.stopRecording();
    setTimeout(() => {
      this.soundRecordedToListen = this.sanitizer.bypassSecurityTrustResourceUrl(this.audioRecorderService.audioUrl);
    }, 500);
    this.checkRecord();
  }

  getNameRecord(value: any){
    this.nameRecord = value.target.value;
    this.checkRecord();
    this.showErrorRecord = this.nameRecord == "";
  }

  checkRecord(){
    this.disableAddSongButton = !((this.nameRecord != "") && (this.soundRecordedToListen != ""));
  }

  getText(value: any){
    this.nameText = value.target.value;
    this.checkText();
    this.showErrorText = this.nameText == "";
  }

  checkText(){
    this.disableAddSongButton = !(this.nameText != "");
  }

  listenText(){
    this.audioRecorderService.speechSynthesis(this.nameText);
  }

  addSong(){
    this.showErrorDropFile = false;
    this.showErrorRecord = false;
    this.showErrorText = false;
  }

  reset(){
    this.soundName = "";
    this.soundFileToListen = "";
    this.soundRecordedToListen= "";
    this.soundToZip = "";
    this.uploadFileProgress = "width: 0%";
    this.nameRecord = "";
    this.nameText = "";

    this.showErrorDropFile = false;
    this.showErrorRecord = false;
    this.showErrorText = false;
    this.showFile = false;
    this.showFileUpload = false;
    this.disableAddSongButton = true;
    this.isRecording = false;
  }
}
