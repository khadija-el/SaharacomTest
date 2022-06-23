import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { UpdateArticleComponent } from './article/update-article/update-article.component';
import { ClientComponent } from './client/client.component';
import { UpdateComponent } from './client/update/update.component';
import { LivraisonClientComponent } from './livraison-client/livraison-client.component';
import { UpdateLivraisonComponent } from './livraison-client/update-livraison/update-livraison.component';

const routes: Routes = [
  { path: '', redirectTo: 'article', pathMatch: 'full'},
  { path: 'article', component: ArticleComponent, data: { state: 'connection' } },
  { path: 'clients', component: ClientComponent, data: { state: 'connection' } },
  { path: 'livraison', component: LivraisonClientComponent, data: { state: 'connection' } },
  { path: 'updateLivraison/:id', component: UpdateLivraisonComponent, data: { breadcrumb: 'Update' } },
  { path: 'update/:id', component: UpdateArticleComponent, data: { breadcrumb: 'Update' } },
  { path: 'updateC/:id', component: UpdateComponent, data: { breadcrumb: 'UpdateC' } },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
