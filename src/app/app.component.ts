import { Component, OnInit, ViewChild } from '@angular/core';
import { min } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'customVideoPlayer';
  @ViewChild('video') video;
  @ViewChild('play') play;
  @ViewChild('stop') stop;
  @ViewChild('progress') progress;
  @ViewChild('timestamp') timestamp;
  time = '00:00';
  paused: boolean = true;

  onToggleVideoStatus() {
    if (this.video.nativeElement.paused) {
      this.video.nativeElement.play();
      this.paused = !this.paused;
    } else {
      this.video.nativeElement.pause();
      this.paused = !this.paused;
    }
  }

  onUpdateProgress() {
    this.progress.nativeElement.value =
      (this.video.nativeElement.currentTime /
        this.video.nativeElement.duration) *
      100;
    
    // Get minutes
    let mins: string | number = Math.floor(this.video.nativeElement.currentTime / 60);
    if (mins < 10) {
      mins = '0' + String(mins); 
    }

    // Get seconds
    let secs: string | number = Math.floor(this.video.nativeElement.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs); 
    }

    this.time = `${mins}:${secs}`
  }

  setVideoProgress() {
    this.video.nativeElement.currentTime =
      (+this.progress.nativeElement.value * this.video.nativeElement.duration) /
      100;
  }

  stopVideo() {
    this.video.nativeElement.currentTime = 0;
    this.video.nativeElement.pause();
    this.paused = true;
  }
}
