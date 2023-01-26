import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Feature, Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import {fromLonLat} from 'ol/proj';
import { MapPoint } from "../../core/models/map-point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Icon, Style } from "ol/style";
import { MapService } from "../../core/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map!: Map;
  private vectorLayer!: VectorLayer<any>;
  private overlay!: Overlay;
  private tooltip!: HTMLElement;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.map = this.generateMap();
    this.tooltip = document.getElementById('tooltip') as HTMLElement;
    this.overlay = this.getOverlay(this.tooltip);

    this.mapService.mapMarker$.subscribe((marker: MapPoint) => {
      this.map.removeLayer(this.vectorLayer)
      this.map.addLayer(this.generateNewMarker(marker))
    })

    this.map.addOverlay(this.overlay);

    this.map.on('pointermove', e => this.checkToolTipToDisplay(e));
  }

  private checkToolTipToDisplay(event: any): void {
    const tooltip = document.getElementById('tooltip') as HTMLElement;
    const pixel = event.pixel;
    const feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
      return feature;
    });
    tooltip.style.display = feature ? '' : 'none';
    if (feature) {
      this.overlay.setPosition(event.coordinate);
      tooltip.innerHTML = feature.get('name');
    }
  }

  private getOverlay(el: HTMLElement): Overlay {
    return new Overlay({
      element:  el ,
      offset: [10, 0],
      positioning: 'bottom-left'
    });
  }

  private generateMap(): Map {
    return new Map({
      layers: [
        new TileLayer({
            source: new OSM()
          }
        )
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([30.523333, 48.450001]),
        zoom: 6,
        maxZoom: 18
      })
    })
  }

  private generateNewMarker(marker: MapPoint): VectorLayer<any> {
    this.vectorLayer =  new VectorLayer({
      source: new VectorSource({
        features: [this.getIconFeature(marker)]
      }),
      style: this.generateMarkerStyle()
    })
    return this.vectorLayer
  }

  private getIconFeature(point: MapPoint): Feature {
    console.log(point)
    const {name, longitude, latitude} = point
    return new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
      name: name
    })
  }
  private generateMarkerStyle(): Style {
    return new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })
    })
  }

}
