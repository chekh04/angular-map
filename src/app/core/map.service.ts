import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MapPoint } from "./models/map-point";
import { defaultPoints } from "./default-points";

@Injectable({
  providedIn: "root"
})
export class MapService {
  private mapMarkerSource: BehaviorSubject<MapPoint> = new BehaviorSubject<MapPoint>(defaultPoints[0])


  get mapMarker$(): Observable<MapPoint> {
    return this.mapMarkerSource.asObservable();
  }

  updateMarker(marker: MapPoint): void {
    this.mapMarkerSource.next(marker);
  }
}
