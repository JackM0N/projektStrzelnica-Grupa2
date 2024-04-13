import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news.component';
import { NewsFormComponent } from './components/newsform.component';
import { WeaponsComponent } from './components/weapons.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'news/add', component: NewsFormComponent },
  { path: 'news/edit/:id', component: NewsFormComponent },
  { path: 'weapons', component: WeaponsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
