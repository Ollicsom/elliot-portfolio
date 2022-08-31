import { Component, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit {

  index2: number = 0;
  position: string = '';
  backgroundUrl: string = '';
  vh: number = 0;
  vw: number = 0;

  @ViewChild("photo")
  photoElement: any;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let offset = this.vw >= 640 ? 
    window.pageYOffset - (window.innerHeight*4.1) - (window.innerHeight * 0.9 * this.index2) :
    window.pageYOffset - window.innerHeight - (window.innerHeight * 0.9 * this.index2);
    let offsetParralax = offset * 0.15;
    this.renderer.setStyle(this.photoElement.nativeElement, 'background-position-y', `${(- this.photoElement.nativeElement.offsetHeight/1.8) - Math.round(offsetParralax)}px`);
  }

  @Input() set index(value: number) {
    this.index2 = value;
    if (value % 2 === 0) {
      this.position = 'left'
    } else {
      this.position = 'right'
    }
  }
  @Input() serie: any;
  rotation = 0;
  
  constructor(
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    this.rotation = Math.round(Math.random());
    this.backgroundUrl = environment.mediaEndpoint + this.serie.main_photo_file;
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  }

  setAnimation() {
    this.renderer.setStyle(this.photoElement.nativeElement, 'transition-duration', `0.5s`);
    setTimeout(() => {
      this.renderer.setStyle(this.photoElement.nativeElement, 'transition-duration', `0s`);
    }, 500)
  }

  redirectTo(serieId: number) {
    window.location.href = "gallery/" + serieId;
  }
}
