import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './components/news/news.component';
import { NewsDeleteComponent } from './components/news/newsdelete.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsFormComponent } from './components/news/newsform.component'
import { PopupComponent } from './components/popup.component';
import { PaginationComponent } from './components/pagination.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { WeaponFormComponent } from './components/weapons/weaponform.component';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { UsersFormComponent } from './components/users/usersform.component';
import { WeaponDeleteComponent } from './components/weapons/weapondelete.component';
import { RegistrationComponent } from './components/authentication/registration.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceFormComponent } from './components/services/serviceform.component';
import { ServiceDeleteComponent } from './components/services/servicedelete.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './components/authentication/login.component';
import { ReservationsComponent } from './components/services/reservations.component';
import { AvailabilitiesComponent } from './components/services/availabilities.component';
import { QuillModule } from 'ngx-quill';
import { JwtModule } from '@auth0/angular-jwt'; // Import JwtModule
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
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
    ServicesComponent,
    ServiceFormComponent,
    ServiceDeleteComponent,
    ReservationsComponent,
    LoginComponent,
    AvailabilitiesComponent,
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
    QuillModule.forRoot(), // nah nothing wrong here
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token'); // Get token from localStorage
        },
        allowedDomains: [''], // Replace with your backend domain
        disallowedRoutes: ['localhost:8080/login'] // Replace with your auth endpoint
      }
    }),
  ],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    AuthService,
    AuthGuard,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
