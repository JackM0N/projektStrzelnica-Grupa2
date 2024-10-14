import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Album } from '../../interfaces/album';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../services/albums.service';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-add-weapon',
  templateUrl: './competitionsalbum.component.html',
  styleUrls: [
    '/src/app/styles/competitionsalbum.css',
    '/src/app/styles/shared-button-styles.css',
    '/src/app/styles/shared-form-styles.css'
  ]
})
// Component for adding or editing weapons
export class CompetitionsAlbumComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';

  images: any = [];
  
  album: Album = {
    id: 0,
    name: '',
    description: '',
    competition: undefined,
    images: []
  };

  // Constructor, determine whether we are adding or editing a weapon
  constructor (
    private route: ActivatedRoute,
    private albumService: AlbumsService,
    private location: Location,
  ) {}

  // On init, if there is an id in the page URL, fetch the weapon with that id and display it
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];

        const observer: Observer<any> = {
          next: response => {
            const images = response.images;

            this.album = response;
            this.album.images = [];

            for (let i = 0; i < images.length; i++) {
              this.images.push(images[i].base64Image);
            }
          },
          error: error => {
            this.responsePopupHeader = 'Podany album nie istnieje.';
            this.responsePopupNgClass = 'popupError';
            this.responsePopup.open();
      
          },
          complete: () => {}
        };

        // Retrieve the album
        this.albumService.getAlbum(id).subscribe(observer);
        
      } else {
        this.responsePopupHeader = 'Podane album nie istnieje.';
        this.responsePopupNgClass = 'popupError';
        this.responsePopup.open();  
      }
    });

  }

  // Open the main page after user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    this.location.back();
  }
  
  public goBack(): void {
    this.location.back();
  }
}
