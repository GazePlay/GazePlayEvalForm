import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EvalJsonService} from "../../services/json/eval-json.service";
import {AudioRecorderService} from "../../services/audioRecorder/audio-recorder.service";

export interface DialogData {
  index: number;
}

@Component({
  selector: 'app-choose-sound',
  templateUrl: './choose-sound.component.html',
  styleUrls: ['./choose-sound.component.css']
})
export class ChooseSoundComponent {

  buttonFileActivate: Boolean = true;
  buttonClicked: any;
  buttonToDesactivate: any;
  imgRecord = "assets/rec_inactive.png";
  soundName: String = "";
  soundToListen: any;
  soundToZip: any;
  isRecording: boolean = false;

  sound: any;

  constructor(
    private dialogRef: MatDialogRef<ChooseSoundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private evalJsonService: EvalJsonService,
    private audioRecorderService: AudioRecorderService) {
  }

  activeButton(id1: String, id2: String, buttonActivated: Boolean){
    this.buttonClicked = document.getElementById(id1.toString());
    this.buttonToDesactivate = document.getElementById(id2.toString());
    if (this.buttonClicked.className.includes("active")){
      this.buttonToDesactivate.className = "btn btn-light choiceButton";
    }else {
      this.buttonClicked.className = "btn btn-light choiceButton active";
      this.buttonToDesactivate.className = "btn btn-light choiceButton";
    }
    this.buttonFileActivate = buttonActivated;
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.imgRecord = "assets/rec_active.png";
      this.audioRecorderService.startRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecorderService.stopRecording();
      this.isRecording = false;
      this.imgRecord = "assets/rec_inactive.png";
    }
  }

  listenRecording(){
    this.audioRecorderService.listenRecording();
  }

  getNameRecord(value: any){
    this.soundName = value.target.value + ".wav";
  }

  setRecord(){
    this.soundToZip = this.audioRecorderService.audioBlob;
    this.soundToListen = this.audioRecorderService.audioUrl;

    this.evalJsonService.imgToDisplay[this.data.index][2] = this.soundToListen;
    this.evalJsonService.imgAndSongToZip[this.data.index][2] = this.soundToZip;
  }

  getSound(value: any){
    const song = value.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(song);
      reader.onload = () => {
        this.soundName = song.name;
        this.soundToListen = String(reader.result);
        this.soundToZip = song;
      };
    }catch (e){
      this.soundName = "";
      this.soundToListen = "";
      this.soundToZip = "";
      console.log("Error with the sound ! " + e);
    }
  }

  setSound(){
    this.evalJsonService.imgToDisplay[this.data.index][2] = this.soundToListen;
    this.evalJsonService.imgAndSongToZip[this.data.index][2] = this.soundToZip;
  }

  add(){
    if (this.buttonFileActivate){
      this.setSound();
    }else {
      setTimeout(() => {
        this.setRecord();
      }, 1000);
    }
    this.close();
  }

  close(){
    this.dialogRef.close();
  }
}
