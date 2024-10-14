import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PaginationComponent } from '../pagination.component';
import { Weapon } from '../../interfaces/weapon';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: [
    '/src/app/styles/weapons.component.css',
    '/src/app/styles/shared-list-styles.css',
    '/src/app/styles/shared-button-styles.css'
  ]
})
// Component that displays a list of weapons
export class WeaponsComponent implements  AfterViewInit {
  @ViewChild('paginationComponent', { static: false }) paginationComponent!: PaginationComponent;
  weaponList: Weapon[] = [];
  showAdminProperties: boolean = false;

  constructor(
    private weaponService: WeaponService,
    private cd: ChangeDetectorRef
  ) {}

  // After init - because we need the pagination to load first
  // Fetch weapons from the database and display them
  ngAfterViewInit(): void {
    this.fetchWeapons();
    // The DOM has been changed, we need to detect the changes to prevent ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }
  
  // Fetches all weapons from the database
  fetchWeapons(): void {
    this.weaponService.getPaginatedWeapons(this.paginationComponent.currentPage, this.paginationComponent.maxItems).subscribe(weapons => {
      this.paginationComponent.totalPages = weapons.totalPages;
      this.paginationComponent.calculatePages();
      this.weaponList = weapons.content;
    });
  }
}
