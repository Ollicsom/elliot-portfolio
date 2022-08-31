import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';
import { Photo } from "../shared/models/photo.model";
import { Serie } from '../shared/models/serie.model';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    id: string;
    serie: Serie;
    vh: number = 0;
    vw: number = 0;
    galleryWidth: number = 0;
    openedIndex: number = 0;
    isGalleryOpened = false;
    faArrowLeft = faArrowLeft;
    isSerieLoaded: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id')
    this.apiService.getSerie(parseInt(this.id!, 10), localStorage.getItem('language') || '').subscribe(serie => {
        this.serie = serie;
        if(this.serie && this.serie.Photos.length > 0){
          this.isSerieLoaded = true;
        } else {
          this.isSerieLoaded = false;
        }
    })

    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    this.vw > 640 ? this.galleryWidth = this.vw * 0.65 / 3 - 5 : this.galleryWidth = this.vw * 0.65;
  }

  public get images(): IMasonryGalleryImage[] {
    return this.serie.Photos.map((m: Photo) => <IMasonryGalleryImage>{
        imageUrl: environment.mediaEndpoint + m.fileName
    }
  )};

  openGallery(value: any) {
    this.openedIndex = this.serie.Photos.findIndex(photo => {
      return environment.mediaEndpoint + photo.fileName == value.imageUrl
    })
    this.isGalleryOpened = true;
  }

  closeGallery() {
    this.isGalleryOpened = false;
  }

  backHome() {
    this.location.back()
  }

}
