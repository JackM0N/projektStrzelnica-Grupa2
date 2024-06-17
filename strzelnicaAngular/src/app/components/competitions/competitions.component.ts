import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Competition } from '../../interfaces/competition';
import { CompetitionsService } from '../../services/competitions.service';
import { PaginationComponent } from '../pagination.component';
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

  constructor(
    private competitionsService: CompetitionsService,
    private albumService: AlbumsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    if (this.paginationComponent) {
      this.competitionsService.getPaginatedCompetitions(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(competitions => {
        this.paginationComponent.totalPages = competitions.totalPages;
        this.paginationComponent.calculatePages();
        this.competitionsList = competitions.content;
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
}
