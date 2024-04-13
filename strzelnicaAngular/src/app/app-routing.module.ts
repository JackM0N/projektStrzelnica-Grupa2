import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news.component';
<<<<<<< Updated upstream
import { NewsFormComponent } from './components/newsform.component';
=======
import { NewsFormComponent } from './components/newsform.component';
import { WeaponsComponent } from './components/weapons.component';
import { AboutComponent } from './components/about.component';
import { UsersComponent } from './components/users.component';
>>>>>>> Stashed changes

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'news/add', component: NewsFormComponent },
  { path: 'news/edit/:id', component: NewsFormComponent },
<<<<<<< Updated upstream
=======
  { path: 'weapons', component: WeaponsComponent },
  { path: 'about', component: AboutComponent },
  {path: 'users', component: UsersComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
