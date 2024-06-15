import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Competitions } from '../../interfaces/competitions';
import { CompetitionsService } from '../../services/competitions.service';
import { PaginationComponent } from '../pagination.component';
import { AuthService } from '../../services/auth.service';

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

  competitionsList: Competitions[] = [];

  constructor(
    private competitionsService: CompetitionsService,
    private cd: ChangeDetectorRef,
    public authService: AuthService,
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
      });
    } else {
      console.error('PaginationComponent is not initialized.');
    }
  }
}
