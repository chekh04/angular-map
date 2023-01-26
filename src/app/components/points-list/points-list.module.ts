import { NgModule } from "@angular/core";
import { PointsListComponent } from "./points-list.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PointsListComponent],
  exports: [
    PointsListComponent
  ],
  imports: [
    CommonModule
  ]
})

export class PointsListModule {

}
