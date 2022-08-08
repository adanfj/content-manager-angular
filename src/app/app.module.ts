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

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ContentViewerComponent },
    ])
  ],
  declarations: [
    AppComponent,
    ContentViewerComponent,
    FileTreeComponent,
    FolderComponent,
    FileComponent,
    ContentComponent,
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