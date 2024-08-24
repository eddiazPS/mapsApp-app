import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import  { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

// No Hice
//import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
//npm i --save-dev @types/mapbox-gl


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

@ViewChild ('map') divMap?: ElementRef;

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap.nativeElement, // referncia local #map
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }




}
