import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService{

  mediaRecorder!: MediaRecorder;
  audioChunks: any = [];
  audioBlob: Blob = new Blob();
  audioUrl: any;
  audio = new Audio();

  startRecording(){
    this.audioChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.addEventListener("dataavailable", event => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener("stop", () => {
          this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
          this.audioUrl = URL.createObjectURL(this.audioBlob);
          this.audio = new Audio(this.audioUrl);
        });

      });
  }

  stopRecording(){
    this.mediaRecorder.stop();
  }

  listenRecording(){
    this.audio.play();
  }
}
