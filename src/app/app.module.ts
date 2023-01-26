import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapModule } from "./components/map/map.module";
import { PointsListModule } from "./components/points-list/points-list.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MapModule,
    BrowserAnimationsModule,
    PointsListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
