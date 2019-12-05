import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/component/canvas.component';
import { NavBarComponent } from './navigation/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
