import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    // Style exclusive for this component
    '../styles/popup.component.css',
    // Shared button styles
    '../styles/shared-button-styles.css',
    // Popup styles
    '../styles/popup-styles.css'
  ]
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
  @Input() disableDefaultButtonCancels: boolean = false;

  constructor() {}
  
  ngOnInit() {}

  // Show the pop-up
  public open(): void {
    this.showPopup = true;
  }
  // Hide the pop-up
  public close(): void {
    this.showPopup = false;
  }
  
  // User clicks the cancel button
  public cancel(): void {
    if (!this.disableDefaultButtonCancels) {
      this.close();
    }
    this.closeEvent.emit();
  }
  // User clicks the confirm button
  public confirm(): void {
    if (!this.disableDefaultButtonCancels) {
      this.close();
    }
    this.confirmEvent.emit();
  }

  // Close the pop-up when we click escape
  @HostListener("document:keydown", ["$event"])
  public keydown(event: KeyboardEvent): void {
    if (event.code === "Escape") {
      this.cancel();
    }
  }

  // Close the pop-up when we click outside of it
  @HostListener("document:click", ["$event"])
  public documentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement.className == "popup-overlay") {
      this.cancel();
    }
  }
}
