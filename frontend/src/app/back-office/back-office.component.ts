import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faArrowLeft, faCirclePlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { saveSerieService } from '../services/save-serie.service';
import { ToastService } from '../services/toast.service';
import { Language } from '../shared/models/language';
import { Serie } from '../shared/models/serie.model';
import { EditFormComponent } from './components/edit-form/edit-form.component';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {
  languages: Array<Language>;
  series: Array<Serie>;
  serie: Serie;
  mediaEndpoint = environment.mediaEndpoint;
  faCirclePlus = faCirclePlus;
  faArrowLeft = faArrowLeft;
  faTimes = faTimes;
  isBlocked = false;

  @ViewChild('editForm', {read: EditFormComponent}) editForm: EditFormComponent;
  constructor(
    private apiService: ApiService,
    private renderer: Renderer2,
    private saveSerieService: saveSerieService,
    private toastsService: ToastService
  ) { }

  ngOnInit(): void {
    this.apiService.getLanguages().subscribe((languages: Array<Language>) => this.languages = languages);
    this.apiService.getAllSeriesData().subscribe((series: Array<Serie>) => this.series = series);

    this.saveSerieService.saveSerieEvent.subscribe((res: Serie) => {
        let index = this.series.findIndex(serie => serie.id === res.id);
        if (index != -1){
            this.series.splice(index, 1);
        }
        this.series.push(res);
        this.series.sort(function(a, b) {
            return a.id - b.id;
        })
    });
  }

  
  setAnimation(event: any) {
    this.renderer.setStyle(event.fromElement, 'transition-duration', `0.5s`);
    setTimeout(() => {
      this.renderer.setStyle(event.fromElement, 'transition-duration', `0s`);
    }, 500)
  }

  selectSerie(serie?: Serie) {
    if(!this.isBlocked) {
      if(serie){
        this.serie = serie;
      } else {
        this.serie = new Serie();
      }
    }
  }

  backToSessionList() {
    this.serie = null;
  }

  deleteSerie(serieId: number, index: number) {
    this.apiService.deleteSerie(serieId).subscribe((res) => 
      this.toastsService.showToast('Succès', 'La série a été supprimé', 'sucess')
    ), (err: any) => {
      console.log(err);
      this.toastsService.showToast('Erreur', err, 'error')
    };
    this.series.splice(index, 1);
  }

  blockSerie(isBlocked: boolean) {
    this.isBlocked = isBlocked;
  }

  getTranslation(index: number) {
    return this.series[index].SerieTranslations.find(translation => translation.LanguageISO === localStorage.getItem('language'))
  }


}
