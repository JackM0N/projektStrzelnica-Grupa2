import { Component, OnInit, ViewChild } from '@angular/core';
import { Competitions } from '../../interfaces/competitions';
import { CompetitionsService } from '../../services/competitions.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../popup.component';
import { Observer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-competition',
  templateUrl: './competitionsform.component.html',
  styleUrls: [
    // Shared button styles
    '/src/app/styles/shared-button-styles.css',
    // Shared form styles
    '/src/app/styles/shared-form-styles.css'
  ]
})

// Component for adding or editing competitions
export class CompetitionsFormComponent implements OnInit {
  @ViewChild('responsePopup') responsePopup!: PopupComponent;
  public responsePopupHeader = '';
  public responsePopupMessage = '';
  public responsePopupNgClass = '';
  competitionForm: FormGroup;

  isAddCompetitionRoute: boolean;
  competitionId: number = 0;
  actionText = 'Dodaj nowe zawody';

  competition: Competitions = {
    id: 0,
    name: '',
    description: '',
    date: new Date(),
    hourStart: 0,
    hourEnd: 0,
    done: false
  };

  quillToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  constructor (
    private location: Location,
    private route: ActivatedRoute,
    private competitionsService: CompetitionsService,
    private formBuilder: FormBuilder,
  ) {
    // Determine if the route is for adding a new competition or editing an existing one
    this.isAddCompetitionRoute = this.route.snapshot.routeConfig?.path?.includes('/add') == true;
    if(!this.isAddCompetitionRoute) {
      this.actionText = 'Edytuj zawody';
    }

    // Initialize the form group for the competition form
    this.competitionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      done: [false]
    });
  }

  // On init, if there is an id in the page URL, fetch the competition with that id and display it
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.competitionId = +params['id'];
        this.competitionsService.getCompetitionById(this.competitionId).subscribe((competition: Competitions) => {
          this.competition = competition;
        });
      }
    });
  }

  // On submit, user clicks to confirm adding/editing the competition, complete it with the database
  onSubmit() {
    if (this.competitionForm.valid) {
      this.competition.name = this.competitionForm.value.name;
      this.competition.description = this.competitionForm.value.description;
      this.competition.date = this.competitionForm.value.date;
      this.competition.hourStart = this.competitionForm.value.hourStart;
      this.competition.hourEnd = this.competitionForm.value.hourEnd;
      this.competition.done = this.competitionForm.value.done;

      const observer: Observer<any> = {
        next: response => {
          if (this.isAddCompetitionRoute) {
            this.responsePopupHeader = 'Pomyślnie dodano zawody ' + this.competition.name + '.';
          } else {
            this.responsePopupHeader = 'Pomyślnie zaktualizowano zawody ' + this.competition.name + '.';
          }
          this.responsePopupNgClass = 'popupSuccess';
          this.responsePopup.open();
        },
        error: error => {
          if (this.isAddCompetitionRoute) {
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

      // Subscribe using the observer object
      if (this.isAddCompetitionRoute) {
        this.competitionsService.addCompetition(this.competition).subscribe(observer);
      } else {
        this.competitionsService.updateCompetition(this.competition).subscribe(observer);
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
