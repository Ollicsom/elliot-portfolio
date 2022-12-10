import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Photo } from 'src/app/shared/models/photo.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-opened-gallery',
  templateUrl: './opened-gallery.component.html',
  styleUrls: ['./opened-gallery.component.scss']
})
export class OpenedGalleryComponent implements OnInit {

  @Input() index: number = 0;
  @Input() photosList: Array<Photo> = [];
  @Output() closeGalleryEvent = new EventEmitter<string>();
  photo: Photo;
  vw: number;
  inside = false;
  elementRef: any;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faTimes = faTimes;
  mediaEndpoint = environment.mediaEndpoint;
  descriptionShown =false;

  constructor() {
  }

  ngOnInit(): void {
    this.photo = this.photosList[this.index];
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  }

  changeIndex(side: string) {
    this.inside = true;
    side === 'back' ? this.index -= 1 : this.index += 1
    if(this.index < 0) {
      this.index = this.photosList.length - 1;
    } else if (this.index >= this.photosList.length) {
      this.index = 0;
    }
    this.photo = this.photosList[this.index];
  }

  closeGallery() {
    this.closeGalleryEvent.emit();
  }

  displayDesc() {
    this.descriptionShown = true;
  }

  hideDesc() {
    this.descriptionShown = false;
  }
}
