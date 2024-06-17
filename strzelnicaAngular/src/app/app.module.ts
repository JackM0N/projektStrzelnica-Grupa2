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
import { UsersProfileComponent } from './components/users/usersprofile.component';
import { UsersProfileEditComponent } from './components/users/usersprofileedit.component';
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
import { RulesComponent } from './components/rules/rules.component';
import { CompetitionsComponent } from './components/competitions/competitions.component'
import { CompetitionsFormComponent } from './components/competitions/competitionsform.component'
import { CompetitionsDeleteComponent } from './components/competitions/competitionsdelete.component'
import { QuillModule } from 'ngx-quill';
import { JwtModule } from '@auth0/angular-jwt'; // Import JwtModule
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RouterModule } from '@angular/router';
import { CompetitionsAddAlbumComponent } from './components/competitions/competitionsaddalbum.component';
import { CompetitionsAlbumComponent } from './components/competitions/competitionsalbum.component';
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
    UsersProfileComponent,
    UsersProfileEditComponent,
    RegistrationComponent,
    ServicesComponent,
    ServiceFormComponent,
    ServiceDeleteComponent,
    ReservationsComponent,
    LoginComponent,
    AvailabilitiesComponent,
    RulesComponent,
    CompetitionsComponent,
    CompetitionsFormComponent,
    CompetitionsDeleteComponent,
    CompetitionsAddAlbumComponent,
    CompetitionsAlbumComponent
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
    RouterModule,
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
    RoleGuard,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
