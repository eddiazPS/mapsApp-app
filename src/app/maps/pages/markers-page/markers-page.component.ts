import { Component, ViewChild, ElementRef } from '@angular/core';
import {Map , LngLat, Marker } from 'mapbox-gl'


interface MarkerAndColor {
  color: string;
  marker: Marker;
}


interface PlainMarker {
  color: string;
  lngLat: number [];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers : MarkerAndColor []=[];
  public zoom: number = 15;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.07107196315216, 4.71195735766851)

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // referncia local #map
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.readFromLocalStorage();
    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML='Edgar Diaz'


    // const marker = new Marker({
    //   //color :'blue'
    //   element: markerHTML,

    // })
    // .setLngLat(this.currentLngLat)
    // .addTo(this.map);


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
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

      this.markers.push({color,marker});
      this.saveToLocalStorage();

      marker.on('dragend',() => this.saveToLocalStorage()
        //{console.log(marker.getLngLat());}
      );

  }


  deleteMarker(index : number):void{

    this.markers[index].marker.remove();
    this.markers.splice(index,1);
    this.saveToLocalStorage();
  }



  flyto(marker : Marker){
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat(),
    });
  }




  saveToLocalStorage(){
    const plainMarkers : PlainMarker[] = this.markers.map ( ({color,marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers',JSON.stringify(plainMarkers));

  }


  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! OJO

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng , lat ] = lngLat;
      const coords = new LngLat (lng,lat);

      this.addMarker(coords , color);
    })

  }


}
