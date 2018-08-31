import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-progressive-image-loader';
  image3 = '/assets/Avengers3.jpg';
  image4 = '/assets/Avengers4.jpg';
  image41 = '/assets/Avengers41.jpg';
  image5 = '/assets/Avengers5.jpg';
  image6 = '/assets/Avengers6.jpg';
  image61 = '/assets/Avengers61.jpg';
  image7 = '/assets/Avengers7.jpg';
  image71 = '/assets/Avengers71.png';
  image51 = '/assets/Avengers51.jpg';
  image8 = '/assets/Avengers8.jpg';

  onImageSwitch() {
    this.image3 = this.image8;
  }
  onImageSetSwitch() {
    this.image6 = this.image61;
    this.image7 = this.image71;
  }

  onPictureSwitch() {
    this.image4 = this.image41;
    this.image5 = this.image51;
  }
}
