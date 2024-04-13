import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['../styles/popup.component.css', '../styles/button-styles.css', '../styles/popup-styles.css']
})

// General pop-up component
export class PopupComponent implements OnInit {
  @Input() showPopup: boolean = false;
  @Input() showCloseButton: boolean = true;
  @Input() showConfirmButton: boolean = false;
  @Input() isDeleted: boolean = false;
  @Input() headerName: string = '';
  @Input() messageText: string = '';
  @Input() closeButtonLabel: string = 'Cofnij';
  @Input() confirmButtonLabel: string = '';
  @Input() confirmButtonNgClass: string = '';
  @Input() style: string = '';
  @Input() ngClass: string = '';
  @Output() closeEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  constructor() {}
  
  ngOnInit() {}

  // Show the pop-up
  public open(): void {
    this.showPopup = true;
  }
  
  // Hide the pop-up
  public close(): void {
    this.showPopup = false;
    this.closeEvent.emit();
  }
  
  // User clicks confirm, delete the news from the database
  public confirm(): void {
    this.showPopup = false;
    this.confirmEvent.emit();
  }

  // Close the pop-up when we click escape
  @HostListener("document:keydown", ["$event"])
  public keydown(event: KeyboardEvent): void {
    if (event.code === "Escape") {
      this.close();
    }
  }

  // Close the pop-up when we click outside of it
  @HostListener("document:click", ["$event"])
  public documentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement.className == "popup-overlay") {
      this.close();
    }
  }
}
