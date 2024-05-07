import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './components/news.component';
import { NewsDeleteComponent } from './components/newsdelete.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsFormComponent } from './components/newsform.component'
import { PopupComponent } from './components/popup.component';
import { PaginationComponent } from './components/pagination.component';
import { WeaponsComponent } from './components/weapons.component';
import { WeaponFormComponent } from './components/weaponform.component';
import { AboutComponent } from './components/about.component';
import { UsersComponent } from './components/users.component';
import { UsersFormComponent } from './components/usersform.component';
import { WeaponDeleteComponent } from './components/weapondelete.component';
import { RegistrationComponent } from './components/registration.component';
import { OfferComponent } from './components/offer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsDeleteComponent,
    NewsFormComponent,
    PopupComponent,
    PaginationComponent,
    WeaponsComponent,
    WeaponFormComponent,
    WeaponDeleteComponent,
    AboutComponent,
    UsersComponent,
    UsersFormComponent,
    RegistrationComponent,
    OfferComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
