import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news.component';
import { NewsFormComponent } from './components/newsform.component';
import { WeaponsComponent } from './components/weapons.component';
import { AboutComponent } from './components/about.component';
import { WeaponFormComponent } from './components/weaponform.component';
import { UsersComponent } from './components/users.component';
import { UsersFormComponent } from './components/usersform.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'news/add', component: NewsFormComponent },
  { path: 'news/edit/:id', component: NewsFormComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapons/add', component: WeaponFormComponent },
  { path: 'weapons/edit/:id', component: WeaponFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UsersComponent },
  { path: 'register', component: UsersFormComponent },
  { path: 'users/edit/:id', component: UsersFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
