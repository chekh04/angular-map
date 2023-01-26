import { Component, EventEmitter, Output } from '@angular/core';
import { MapPoint } from "../../core/models/map-point";
import { defaultPoints } from "../../core/default-points";
import { MapService } from "../../core/map.service";

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent {
  public points: MapPoint[] = defaultPoints;
  constructor(private mapService: MapService) {
  }

  updateMarker(marker: MapPoint): void {
    this.mapService.updateMarker(marker);
  }

}
