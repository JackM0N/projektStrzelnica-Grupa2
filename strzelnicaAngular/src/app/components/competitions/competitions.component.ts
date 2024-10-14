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
    '/src/app/styles/shared-list-styles.css',
    '/src/app/styles/shared-button-styles.css'
  ]
})
export class CompetitionsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;

  competitionsList: Competition[] = [];
  pastCompetitionsList: Competition[] = [];
  currentUser: Users | null = null;
  registeredCompetitions: { [competitionId: number]: boolean } = {};

  constructor(
    private competitionsService: CompetitionsService,
    private albumService: AlbumsService,
    private cd: ChangeDetectorRef,
    public authService: AuthService,
    private competitionParticipantService: CompetitionParticipantService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  ngAfterViewInit(): void {
    if(this.competitionsList.length == 0 && this.pastCompetitionsList.length == 0){ // fast fix for only users getting list
      this.fetchCompetitions();
    }
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser = response;
        this.fetchCompetitions();
      },
      error: (error: any) => {
        console.error("Błąd podczas pobierania użytkownika", error);
      }
    });
  }

  fetchCompetitions(): void {
    if (this.paginationComponent) {
      this.competitionsService.getPaginatedCompetitions(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe({
        next: (response) => {
          this.paginationComponent.totalPages = response.totalPages;
          this.paginationComponent.calculatePages();
          this.competitionsList = response.content;
          this.checkRegistrations();
  
          this.competitionsList.forEach(competition => {
            this.albumService.getAlbumByCompetition(competition.id).subscribe((album: Album) => {
              if (album) {
                competition.album = album;
              }
            });
          });
  
          this.moveCompletedCompetitions();
          this.cd.detectChanges();
        },
        error: (error: any) => {
          console.error('Error unregistering for competition:', error);
        }
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
      this.competitionParticipantService.register(this.currentUser.id, competitionId).subscribe({
        next: () => {
          this.fetchCompetitions();
        },
        error: (error: any) => {
          console.error('Error registering for competition:', error);
        }
      });
    }
  }

  unregisterFromCompetition(competitionId: number): void {
    if (this.currentUser != null) {
      this.competitionParticipantService.unregister(this.currentUser.id, competitionId).subscribe({
        next: () => {
          this.fetchCompetitions();
        },
        error: (error: any) => {
          console.error('Error unregistering for competition:', error);
        }
      });
    }
  }
}
