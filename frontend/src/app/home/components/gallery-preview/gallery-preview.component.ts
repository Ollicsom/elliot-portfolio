import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit {

  index2: number = 0;
  position: string = '';

  @Input() set index(value: number) {
    if (value % 2 === 0) {
      this.position = 'left'
    } else {
      this.position = 'right'
    }
}
  rotation = 0;
  
  constructor() { }
  
  ngOnInit(): void {
    this.rotation = Math.round(Math.random());
  }

}
