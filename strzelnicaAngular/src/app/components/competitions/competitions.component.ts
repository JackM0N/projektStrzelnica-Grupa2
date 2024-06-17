import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Competition } from '../../interfaces/competition';
import { CompetitionsService } from '../../services/competitions.service';
import { PaginationComponent } from '../pagination.component';
import { AuthService } from '../../services/auth.service';
import { CompetitionParticipantService } from '../../services/competitionparticipant.service';
import { UserService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: [
    // Styles shared between all the list components
    '/src/app/styles/shared-list-styles.css',
    // Shared button styles
    '/src/app/styles/shared-button-styles.css'
  ]
})
export class CompetitionsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;

  competitionsList: Competition[] = [];
  pastCompetitionsList: Competitions[] = [];
  currentUser: Users | null = null;
  registeredCompetitions: { [competitionId: number]: boolean } = {};

  constructor(
    private competitionsService: CompetitionsService,
    private albumService: AlbumsService,
    private cd: ChangeDetectorRef,
    public authService: AuthService,
    private competitionParticipantService: CompetitionParticipantService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (user: Users) => {
        this.currentUser = user;
        this.fetchCompetitions();
      },
      (error: any) => {
        console.error("Błąd podczas pobierania użytkownika", error);
      }
    );
  }

  ngAfterViewInit(): void {
    if(this.competitionsList.length == 0 && this.pastCompetitionsList.length == 0){ // fast fix for only users getting list
      this.fetchCompetitions();
    }
  }

  fetchCompetitions(): void {
    if (this.paginationComponent) {
      this.competitionsService.getPaginatedCompetitions(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(competitions => {
        this.paginationComponent.totalPages = competitions.totalPages;
        this.paginationComponent.calculatePages();
        this.competitionsList = competitions.content;
        this.checkRegistrations();
        this.moveCompletedCompetitions();
        this.cd.detectChanges();

        this.competitionsList.forEach(competition => {
          this.albumService.getAlbumByCompetition(competition.id).subscribe((album: Album) => {
            if (album) {
              competition.album = album;
            }
          });
        });

      });
    } else {
      console.error('PaginationComponent is not initialized.');
    }
  }
  

  checkRegistrations(): void {
    if (this.currentUser != null) {
      this.competitionsList.forEach(competition => {
        this.competitionParticipantService.isRegistered(this.currentUser!.id, competition.id).subscribe(isRegistered => {
          this.registeredCompetitions[competition.id] = isRegistered;
          this.cd.detectChanges();
        });
      });
    }
  }

  moveCompletedCompetitions(): void {
    this.pastCompetitionsList = this.competitionsList.filter(competition => competition.done);
    this.competitionsList = this.competitionsList.filter(competition => !competition.done);
  }

  isRegistered(competitionId: number): boolean {
    return this.registeredCompetitions[competitionId] || false;
  }

  registerForCompetition(competitionId: number): void {
    if (this.currentUser != null) {
      this.competitionParticipantService.register(this.currentUser.id, competitionId).subscribe(() => {
        this.fetchCompetitions();
      }, error => {
        console.error('Error registering for competition:', error);
      });
    }
  }

  unregisterFromCompetition(competitionId: number): void {
    if (this.currentUser != null) {
      this.competitionParticipantService.unregister(this.currentUser.id, competitionId).subscribe(() => {
        this.fetchCompetitions();
      }, error => {
        console.error('Error unregistering from competition:', error);
      });
    }
  }
}
