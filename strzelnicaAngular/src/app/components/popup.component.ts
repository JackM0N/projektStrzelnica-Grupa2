import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    '/src/app/styles/popup.component.css',
    '/src/app/styles/shared-button-styles.css',
    '/src/app/styles/popup-styles.css'
  ]
})
// General pop-up component
export class PopupComponent {
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

  public open(): void {
    this.showPopup = true;
  }
  
  public close(): void {
    this.showPopup = false;
  }
  
  public cancel(): void {
    if (!this.disableDefaultButtonCancels) {
      this.close();
    }
    this.closeEvent.emit();
  }
  
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
