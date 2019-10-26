import React, { Component } from 'react';
import  { Map as LeafletMap,TileLayer,Marker,Popup}  from 'react-leaflet';
//Home page representation
type State = {
  [key: string]: any
}


export class Home extends Component<any, State> {
  state = {
    cords:[10.8505, 76.2711]
  }
  handleClick = (e)  => {
    const { lat, lng } = e.latlng;
    console.log(`Clicked at ${lat}, ${lng}`)
    this.setState({cords:[lat,lng]})
    
  }; 
    //TODO: some contents to home page
    render() {
        return (
            <div className="map" id="map">
              <LeafletMap
                center={[10.8505, 76.2711]}
                zoom={10}
                maxZoom={100}
                onClick={this.handleClick} 
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                overlay={false}
                animate={true}
                easeLinearity={0.35}
              >
                <TileLayer
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={this.state.cords}>
                  <Popup>
                    Coming Soon
                  </Popup>
                </Marker>
              </LeafletMap>
            </div>
        )
    }
}