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
    MaterialModule
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
