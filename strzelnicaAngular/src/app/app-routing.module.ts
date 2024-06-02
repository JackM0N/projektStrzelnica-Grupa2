import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { NewsFormComponent } from './components/news/newsform.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { AboutComponent } from './components/about/about.component';
import { WeaponFormComponent } from './components/weapons/weaponform.component';
import { UsersComponent } from './components/users/users.component';
import { UsersFormComponent } from './components/users/usersform.component';
import { UsersProfileComponent } from './components/users/usersprofile.component';
import { UsersProfileEditComponent } from './components/users/usersprofileedit.component';
import { RegistrationComponent } from './components/authentication/registration.component';
import { LoginComponent } from './components/authentication/login.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceFormComponent } from './components/services/serviceform.component';
import { ReservationsComponent } from './components/services/reservations.component';
import { AvailabilitiesComponent } from './components/services/availabilities.component';
import { RulesComponent } from './components/rules/rules.component';
import { AuthGuard } from './guards/auth.guard';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CompetitionsFormComponent } from './components/competitions/competitionsform.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'news/add', component: NewsFormComponent },
  { path: 'news/edit/:id', component: NewsFormComponent },

  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapons/add', component: WeaponFormComponent },
  { path: 'weapons/edit/:id', component: WeaponFormComponent },

  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },

  { path: 'users', component: UsersComponent },
  { path: 'users/edit/:id', component: UsersFormComponent },
  { path: 'users/account', component:UsersProfileComponent},
  { path: 'users/account/edit', component:UsersProfileEditComponent},

  { path: 'offer', component: ServicesComponent },
  { path: 'offer/add', component: ServiceFormComponent },
  { path: 'offer/edit/:id', component: ServiceFormComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'availabilities', component: AvailabilitiesComponent, canActivate: [AuthGuard]},

  { path: 'competitions', component: CompetitionsComponent },
  { path: 'competitions/add', component: CompetitionsFormComponent },
  { path: 'competitions/edit/:id', component: CompetitionsFormComponent },

  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
