import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Photo } from 'src/app/shared/models/photo.model';

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
  inside = false;
  elementRef: any;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faTimes = faTimes;

  constructor() {
  }

  ngOnInit(): void {
    this.photo = this.photosList[this.index];
    console.log(this.photosList);
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
}
