import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: '', redirectTo: 'article', pathMatch: 'full'},
  { path: 'article', component: ArticleComponent, data: { state: 'connection' } },
  { path: 'clients', component: ClientComponent, data: { state: 'connection' } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
