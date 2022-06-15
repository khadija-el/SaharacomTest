import { Injector, NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ClientComponent,
    UpdateComponent,
    DeleteComponent,
    UpdateArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {    // Create global Service Injector.
    InjectService.injector = this.injector;
  }
}
