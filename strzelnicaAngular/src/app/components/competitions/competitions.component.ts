import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Competitions } from '../../interfaces/competitions';

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

export class CompetitionsComponent implements OnInit {
  competitionsList: Competitions[] = [
    {
      id: 1,
      name: 'Competition 1',
      description: 'Koleżanki i Koledzy, zbliżają się kolejne zawody klubowe WKSS Poznań. Zawody odbędą się w dniu 22 kwietnia o godzinie 10.00 w Nowolipsku. Na zawodach odbędzie się 11 konkurencji (5 pistoletowych, 4 karabinowe, 2 strzelbowe).',
      date: new Date('2024-06-01'),
      hourStart: 12,
      hourEnd: 17,
      done: true
    },
    {
      id: 2,
      name: 'Competition 2',
      description: 'Description of Competition 2',
      date: new Date(),
      hourStart: 14,
      hourEnd: 17,
      done: false
    }
  ];

  ngOnInit(): void {
    this.sortCompetitions();
  }

  sortCompetitions(): void {
    this.competitionsList.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
