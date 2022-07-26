import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    id: string | null | undefined;
    serie: any;
    urls: Array<string> = [
        'http://localhost:8000/medias/CR-48.jpg', 'http://localhost:8000/medias/CR-49.jpg', 'http://localhost:8000/medias/CR-50.jpg',
        'http://localhost:8000/medias/CR-14.jpg', 'http://localhost:8000/medias/CR-29.jpg', 'http://localhost:8000/medias/CR-30.jpg',
        'http://localhost:8000/medias/CR-33.jpg', 'http://localhost:8000/medias/CR-39.jpg', 'http://localhost:8000/medias/CR-41.jpg',
        'http://localhost:8000/medias/CR-44.jpg', 'http://localhost:8000/medias/CR-66.jpg'];

    vh: number = 0;
    vw: number = 0;
    galleryWidth: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
    this.apiService.getSerie(parseInt(this.id!, 10), localStorage.getItem('language') || '').subscribe(serie => {
        this.serie = serie;
        console.log(this.serie)
    })

    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    this.vw > 640 ? this.galleryWidth = this.vw * 0.65 / 3 - 5 : this.galleryWidth = this.vw * 0.65;
  }

  public get images(): IMasonryGalleryImage[] {
    return this.urls.map(m => <IMasonryGalleryImage>{
        imageUrl: m
    }
  )};

  log(value: any) {
    console.log(value);
  }

}
