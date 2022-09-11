import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedGalleryComponent } from './opened-gallery.component';

describe('OpenedGalleryComponent', () => {
  let component: OpenedGalleryComponent;
  let fixture: ComponentFixture<OpenedGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenedGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
