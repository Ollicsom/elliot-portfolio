import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { saveSerieService } from 'src/app/services/save-serie.service';
import { Language } from 'src/app/shared/models/language';
import { Serie } from 'src/app/shared/models/serie.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnDestroy {

  @Input() serie: Serie;
  @Input() languages: Array<Language>;
  @Output() saveSerieEvent = new EventEmitter<Serie>();
  faTimes = faTimes;
  serieForm: FormGroup;
  mediaEndpoint = environment.mediaEndpoint;
  
  constructor(
    private apiService: ApiService,
    private saveSerieService: saveSerieService
  ) {
   }

  ngOnInit(): void {
    this.serieForm = new FormGroup({
        id: new FormControl(this.serie.id || null),
        main_photo_file: new FormControl(this.serie.main_photo_file || null),
        SerieTranslations: new FormArray([]),
        Photos: new FormArray([])
    })

    const serieTranslationArray = this.serieForm.get('SerieTranslations') as FormArray;
    const photoFormArray = this.serieForm.get('Photos') as FormArray;

    if (this.serie.Photos && this.serie.Photos.length) {
      this.serie.Photos.forEach(photo => {
          photoFormArray.push(new FormGroup({
              id: new FormControl(photo.id),
              fileName: new FormControl(photo.fileName),
              PhotoTranslations: new FormArray([]),
          }))
      });
    } else {
      this.addPhoto();
    }

    this.languages.forEach(language => {
        const serieTranslation = this.serie.SerieTranslations?.find(translation => translation.LanguageISO === language.LanguageISO);
        serieTranslationArray.push(new FormGroup({
          LanguageISO: new FormControl(language.LanguageISO),
          title: new FormControl(serieTranslation?.title || null),
          description: new FormControl(serieTranslation?.description || null)
        }));
        let photos =  this.serieForm.get('Photos') as FormArray;
        if(  this.serie.Photos)
        photos.controls.forEach((photo, index) => {
            const photoTranslation = this.serie.Photos[index].PhotoTranslations.find(translation => translation.LanguageISO === language.LanguageISO)
            const photoTranslationArray = photoFormArray.get('' + index).get('PhotoTranslations') as FormArray;
            photoTranslationArray.push(new FormGroup({
                LanguageISO: new FormControl(language.LanguageISO),
                title: new FormControl(photoTranslation?.title || null),
                description: new FormControl(photoTranslation?.description || null)
            }));
        })
    })
  }

  changeSeriePicture(event: any) {
    if(event.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {}
        let photoData:FormData = new FormData();
        photoData.append('upload', event.target.files[0], event.target.files[0].name);
        this.apiService.uploadImage(photoData).subscribe((res) => {
            this.serieForm.get('main_photo_file').setValue(res.filename)
        });
    }
  }

  changePhotoPicture(event: any, index: number) {
    if(event.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {}
        let photoData:FormData = new FormData();
        photoData.append('upload', event.target.files[0], event.target.files[0].name);
        this.apiService.uploadImage(photoData).subscribe((res) => {
            this.serieForm.get('Photos').get('' + index).get('fileName').setValue(res.filename)
        });
    }
  }

  addPhoto() {
    const photoFormArray = this.serieForm.get('Photos') as FormArray;
    const photoControl = new FormGroup({
        id: new FormControl(null),
        fileName: new FormControl(null),
        PhotoTranslations: new FormArray([]),
    });
    const PhotoTranslationsArray = photoControl.get('PhotoTranslations') as FormArray;
    this.languages.forEach(language => {
        PhotoTranslationsArray.push(new FormGroup({
            LanguageISO: new FormControl(language.LanguageISO),
            title: new FormControl(null),
            description: new FormControl(null)
        }));
    })
    photoFormArray.push(photoControl);
  }

  deletePhoto(index: number){
    const photoArray = this.serieForm.controls['Photos'] as FormArray;
    photoArray.removeAt(index);
  }

  get serieTranslation() {
    return this.serieForm.get('SerieTranslations') as FormArray;
  }

  getPhotoTranslation(getPhotoTranslation: AbstractControl) {
    const photoTranslationArray = getPhotoTranslation.get('PhotoTranslations') as FormArray;
    return photoTranslationArray.controls;
  }

  getPhotoURL(index: number) {
    return this.serieForm.get('Photos').get('' + index).get('fileName').value;
  }

  getSerieUrl() {
    return this.serieForm.get('main_photo_file').value;
  }

  getSerieName() {
    return this.serieForm.get('SerieTranslations').value.find((translation: any) => translation.LanguageISO == localStorage.getItem("language")).title;
  }

  get photo() {
    return this.serieForm.get('Photos') as FormArray;
  }

  async ngOnDestroy() {
    this.savePhoto();
  }
  
  async savePhoto() {
    await this.apiService.updateOrCreateSerie(this.serieForm.value).subscribe(serie => {
      this.saveSerieService.saveSerieEvent.emit(serie)
    });
  }

}
