import React, { Component } from 'react';
import  { Map as LeafletMap,TileLayer,Marker,Popup}  from 'react-leaflet';
import * as L from 'leaflet';

type State = {
  [key: string]: any
}

export class Home extends Component<any, State> {
  state = {
    cordsgreen:[2222.8505, 76.2711],
    cordsred:[222.8505, 76.2711],
  }

  OnGeoIPFound = (position) => {
    let cords = position.coords;
    this.setState({cordsgreen:[cords.latitude,cords.longitude],cordsred:[cords.latitude,cords.longitude]})
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.OnGeoIPFound,null,{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    })
  }

  OnDragGreenMarker = (e) => {
    const { lat, lng } = e.latlng;
    console.log(`dragged at ${lat}, ${lng}`)
    this.setState({cordsgreen:[lat,lng]})
  }

  OnDragRedMarker = (e) => {
    const { lat, lng } = e.latlng;
    console.log(`dragged at ${lat}, ${lng}`)
    this.setState({cordsred:[lat,lng]})
  }
  //handleClick = (e)  => {
  //  const { lat, lng } = e.latlng;
  //  console.log(`Clicked at ${lat}, ${lng}`)
  //  this.setState({cordsgreen:[lat,lng]})
  //}; 

    //TODO: some contents to home page
  render() {
    const greenmarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    const redmarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

      return (
        <>
        <div className="instructions">
          <h1>Instructions</h1>
          <ul>
            <li>Drag and place Start (Green marker) and End marker (Red marker) </li>
            
          </ul>
          </div>
          <div className="map">
            <LeafletMap
              center={this.state.cordsgreen}
              zoom={10}
              maxZoom={100}
              //onClick={this.handleClick}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              overlay={true}
              animate={false}
              easeLinearity={0.35}
            >
              <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              <Marker icon={greenmarker} position={this.state.cordsgreen} draggable={true} OnMouseUp={this.OnDragGreenMarker} >
                <Popup>
                  Start
                </Popup>
              </Marker>
              <Marker icon={redmarker} position={this.state.cordsred} draggable={true} OnMouseUp={this.OnDragRedMarker}>
                <Popup>
                  End
                </Popup>
              </Marker>
            </LeafletMap>
          </div>
        </>
      )
  }
}