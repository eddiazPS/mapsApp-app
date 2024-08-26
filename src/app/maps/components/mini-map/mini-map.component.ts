import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import  { LngLat, Map, Marker } from 'mapbox-gl';
@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild ('map') divMap?: ElementRef;

  public zoom: number = 15;
  public map?: Map;

@Input () lngLat?: [number, number];

ngAfterViewInit(): void {
 if(!this.divMap?.nativeElement) throw  "Map Div not found";
 if(!this.lngLat) throw  "LngLat can't be null";

 this.map = new Map({
  container: this.divMap.nativeElement, // referncia local #map
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: this.lngLat, // starting position [lng, lat]
  zoom: this.zoom, // starting zoom
  interactive: false,

});
//this.createMarker();

new Marker ()
  .setLngLat (this.lngLat)
  .addTo(this.map)

}


createMarker (){

  if (!this.map) return;

  const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  const lgnLat = this.map.getCenter();

  this.addMarker(lgnLat,color);
}

addMarker (lngLat: LngLat , color : string ){
  if (!this.map) return;

  const marker = new Marker({
    color: color,
    //draggable: true,
  })
    .setLngLat(lngLat)
    .addTo(this.map);

}



}
