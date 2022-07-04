import { Component, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit {

  index2: number = 0;
  position: string = '';

  @ViewChild("photo")
  photoElement: any;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let offset =  window.pageYOffset - (window.innerHeight*4.1) - (window.innerHeight * 0.9 * this.index2);
    let offsetParralax = offset * 0.15;
    this.renderer.setStyle(this.photoElement.nativeElement, 'background-position-y', `${(- this.photoElement.nativeElement.offsetHeight/3) - Math.round(offsetParralax)}px`);
  }

  @Input() set index(value: number) {
    this.index2 = value;
    if (value % 2 === 0) {
      this.position = 'left'
    } else {
      this.position = 'right'
    }
}
  rotation = 0;
  
  constructor(
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    this.rotation = Math.round(Math.random());
  }

  setAnimation() {
    this.renderer.setStyle(this.photoElement.nativeElement, 'transition-duration', `0.5s`);
    setTimeout(() => {
      this.renderer.setStyle(this.photoElement.nativeElement, 'transition-duration', `0s`);
    }, 500)
  
  }
}
