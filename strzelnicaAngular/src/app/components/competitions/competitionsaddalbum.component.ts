import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';
import { Location } from '@angular/common';
import { Album } from '../../interfaces/album';
import { AlbumsService } from '../../services/albums.service';
import { CompetitionsService } from '../../services/competitions.service';
import { Competition } from '../../interfaces/competition';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-competitions-addalbum',
  templateUrl: './competitionsaddalbum.component.html',
  styleUrls: [
    // Style for this component
    '/src/app/styles/competitionsaddalbum.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css'
  ]
})
export class CompetitionsAddAlbumComponent implements AfterViewInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  public albumForm: FormGroup;
  public disableAlbumForm = false;

  public images: string[] = []; // Array to store image URLs

  isAddAlbumRoute: boolean;
  actionText = 'Dodaj nowy album';

  album: Album = {
    id: 0,
    name: '',
    description: '',
    competition: undefined,
    images: []
  };

  quillToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  constructor (
    private location: Location,
    private route: ActivatedRoute,
    private albumService: AlbumsService,
    private imagesService: ImagesService,
    private competitionsService: CompetitionsService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // Determine if the route is for adding a new competition or editing an existing one
    this.isAddAlbumRoute = this.route.snapshot.routeConfig?.path?.includes('/add') == true;
    if (!this.isAddAlbumRoute) {
      this.actionText = 'Edytuj album';
    }

    // Initialize the form group for the competition form
    this.albumForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      makePost: [false]
    });
  }

  // On init, if there is an id in the page URL, fetch the competition with that id and display it
  ngAfterViewInit() {

    // Adding, check if an album already exists
    if (this.isAddAlbumRoute) {

      this.route.params.subscribe(params => {
        if (params['id']) {
          const competitionId = +params['id'];
  
          // Retrieve the competition
          this.competitionsService.getCompetitionById(competitionId).subscribe((competition: Competition) => {
            if (competition) {
              this.album.competition = competition;

            } else {
              this.disableAlbumForm = true;
              this.responsePopupHeader = 'Podane zawody nie istnieją.';
              this.responsePopupNgClass = 'popupError';
              this.responsePopup.open();
            }
          });

          this.albumService.getAlbumByCompetition(competitionId).subscribe((album: Album) => {
            if (album) {
              this.disableAlbumForm = true;
              this.responsePopupHeader = 'Album do tych zawodów już istnieje.';
              this.responsePopupNgClass = 'popupError';
              this.responsePopup.open();

              return;
            }
            this.updateForm();
          });
  
        } else {
          this.updateForm();
        }
      });

    // Editing, fetch album
    } else {

      this.route.params.subscribe(params => {
        if (params['id']) {
          const albumId = +params['id'];
  
          this.albumService.getAlbum(albumId).subscribe((album: Album) => {
            this.album = album;
            this.updateForm();
          });
  
        } else {
          this.updateForm();
        }
      });

    }

    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  updateForm() {
    this.albumForm.patchValue({
      name: this.album.name,
      description: this.album.description,
    });
  }

  // On submit, user clicks to confirm adding/editing the album, complete it with the database
  onSubmit() {
    if (this.albumForm.valid) {
      const updatedAlbum = this.albumForm.value as Album;
      this.album = {
        ...this.album,
        ...updatedAlbum
      };

      const observer: Observer<any> = {
        next: response => {
          if (this.isAddAlbumRoute) {
            this.responsePopupHeader = 'Pomyślnie dodano album ' + this.album.name + '.';
          } else {
            this.responsePopupHeader = 'Pomyślnie zaktualizowano album ' + this.album.name + '.';
          }
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          if (this.isAddAlbumRoute) {
            this.responsePopupHeader = 'Przy dodawaniu napotkano błąd.';
          } else {
            this.responsePopupHeader = 'Przy aktualizacji napotkano błąd.';
          }
          this.responsePopupMessage = error.error.message + ' (' + error.message + ')';
          this.responsePopupNgClass = 'popupError';
          this.responsePopup.open();
        },
        complete: () => {}
      };

      const observerImages: Observer<any> = {
        next: response => {
          console.log('Images uploaded successfully');
        },
        error: error => {
          console.log('Image upload error: ' + error.error.message + ' (' + error.message + ')')
        },
        complete: () => {}
      };

      console.log("adding album");
      // Subscribe using the observer object
      if (this.isAddAlbumRoute) {
        this.albumService.addAlbum(this.album).subscribe(observer);
      } else {
        this.albumService.updateAlbum(this.album).subscribe(observer);
      }

      console.log("adding images");
      this.imagesService.uploadImages(this.album.images).subscribe(observerImages);
    }
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.album.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Open the main page after the user clicks on the response pop-up
  public responsePopupCancelAction(): void {
    this.location.back();
  }
  
  // User clicks go back from the form page
  public goBack(): void {
    this.location.back();
  }
}
