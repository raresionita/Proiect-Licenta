import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/component/canvas.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogOverview } from './dialog/dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule} from '@angular/material';
import { MaterialModule } from './dialog/material-module';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import { FileUploadRoutingModule } from './navigation/fileupload-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    NavBarComponent,
    DialogOverview
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    HttpClientModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    FileUploadRoutingModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [
    DialogOverview,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
