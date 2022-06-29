import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { UpdateArticleComponent } from './article/update-article/update-article.component';
import { ClientComponent } from './client/client.component';
import { UpdateComponent } from './client/update/update.component';
import { LivraisonClientComponent } from './livraison-client/livraison-client.component';
import { UpdateLivraisonComponent } from './livraison-client/update-livraison/update-livraison.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full'},
  { path: 'articles', component: ArticleComponent, data: { state: 'connection' } },
  { path: 'articles/update/:id', component: UpdateArticleComponent, data: { breadcrumb: 'Update' } },

  { path: 'clients', component: ClientComponent, data: { state: 'connection' } },
  { path: 'clients/update/:id', component: UpdateComponent, data: { breadcrumb: 'UpdateC' } },

  { path: 'livraisons', component: LivraisonClientComponent, data: { state: 'connection' } },
  { path: 'livraisons/update/:id', component: UpdateLivraisonComponent, data: { breadcrumb: 'Update' } },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
