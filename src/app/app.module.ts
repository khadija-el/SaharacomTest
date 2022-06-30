import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleComponent } from './article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { MatModule } from './mat.module';
import { InjectService } from './inject.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client/client.component';
import { UpdateComponent } from './client/update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateArticleComponent } from './article/update-article/update-article.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { LivraisonClientComponent } from './livraison-client/livraison-client.component';
import { UpdateLivraisonComponent } from './livraison-client/update-livraison/update-livraison.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DetailLivraisonClientComponent } from './livraison-client/detail-livraison-client/detail-livraison-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ClientComponent,
    UpdateComponent,
    DeleteComponent,
    UpdateArticleComponent,
    LivraisonClientComponent,
    UpdateLivraisonComponent,
    DetailLivraisonClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    
  ],
  providers: [
   
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent],
  schemas:[
    // CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(private injector: Injector) {    // Create global Service Injector.
    InjectService.injector = this.injector;
    registerLocaleData(localeFr, 'fr')
  }
}
