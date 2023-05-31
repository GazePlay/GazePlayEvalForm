import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";
import {AudioRecorderService} from "../../services/audioRecorder/audio-recorder.service";
import {DomSanitizer} from "@angular/platform-browser";
import {EvalJsonService} from "../../services/json/eval-json.service";

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
  recordedSongToListen: any = "";
  soundToListen: any = "";
  nameSound: string = "";
  soundToZip: any = "";
  uploadFileProgress: string = "width: 0%"

  errorDropFile: string = "";

  constructor(private themeService: ThemeService,
              public sanitizer: DomSanitizer,
              private audioRecorderService: AudioRecorderService,
              private evalJsonService: EvalJsonService) {

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
                this.nameSound = song.name;
                this.soundToListen = String(reader.result);
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
    this.nameSound = "";
    this.soundToListen = "";
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
      this.soundToListen = this.audioRecorderService.audioUrl;
      this.soundToZip = this.audioRecorderService.audioBlob;
      this.recordedSongToListen = this.sanitizer.bypassSecurityTrustResourceUrl(this.audioRecorderService.audioUrl);
    }, 500);
    this.checkRecord();
  }

  getNameRecord(value: any){
    this.nameSound = value.target.value;
    this.checkRecord();
    this.showErrorRecord = this.nameSound == "";
    this.nameSound = this.nameSound  + ".wav";
  }

  checkRecord(){
    this.disableAddSongButton = !((this.nameSound != "") && (this.soundToListen != ""));
  }

  getText(value: any){
    this.nameSound = value.target.value;
    this.checkText();
    this.showErrorText = this.nameSound == "";
  }

  checkText(){
    this.disableAddSongButton = !(this.nameSound != "");
  }

  listenText(){
    this.audioRecorderService.speechSynthesis(this.nameSound);
  }

  addSong(){
    this.showErrorDropFile = false;
    this.showErrorRecord = false;
    this.showErrorText = false;

    const index = this.evalJsonService.index;
    this.evalJsonService.songToDisplay[index][0] = this.nameSound;
    this.evalJsonService.songToDisplay[index][1] = this.soundToListen;
    this.evalJsonService.songToDisplay[index][2] = this.soundToZip;

    this.audioRecorderService.audioObservable.next("");
    this.reset();
  }

  reset(){
    this.nameSound = "";
    this.soundToListen = "";
    this.soundToZip = "";
    this.uploadFileProgress = "width: 0%";

    this.showErrorDropFile = false;
    this.showErrorRecord = false;
    this.showErrorText = false;
    this.showFile = false;
    this.showFileUpload = false;
    this.disableAddSongButton = true;
    this.isRecording = false;
  }
}
