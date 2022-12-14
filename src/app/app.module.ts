import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentViewerComponent } from './content-viewer/content-viewer.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FolderComponent } from './folder/folder.component';
import { FileComponent } from './file/file.component';
import { ContentComponent } from './content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@NgModule({
  imports: [
    BrowserModule,
    PdfJsViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ContentViewerComponent },
      { path: 'editor', component: ContentEditorComponent },
    ]),
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    ContentViewerComponent,
    FileTreeComponent,
    FolderComponent,
    FileComponent,
    ContentComponent,
    ContentEditorComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/