import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { UpdateArticleComponent } from './article/update-article/update-article.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: '', redirectTo: 'article', pathMatch: 'full'},
  { path: 'article', component: ArticleComponent, data: { state: 'connection' } },
  { path: 'clients', component: ClientComponent, data: { state: 'connection' } },
  { path: 'update/:id', component: UpdateArticleComponent, data: { breadcrumb: 'Update' } },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
