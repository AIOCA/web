import React, { Component, createRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { DataTable, TableHeader, TableRow, TableColumn, Button, Autocomplete } from "react-md";
import { Map as LeafletMap, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import * as L from 'leaflet';
import { CommutePaths, GetPath } from '../api/requests';
import { GetStreetName } from "../api/requests";
import cookie from 'react-cookies';

type State = {
  [key: string]: any
}

export class Estimate extends Component<any, State> {
  state = {
    cordsgreen: [2222.8505, 76.2711],
    centerpoint: [2222.8505, 76.2711],
    cordsred: [2222.8505, 76.2711],
    result_fetched: false,
    results: [],
    locations: [],
    waypoints: [],
    tempend: [],
    tempstart: [],
    distance:0,
    error:''

  }
  map = createRef<LeafletMap>();
  //saveMap = ;
  OnGeoIPFound = (position) => {
    let cords = position.coords;
    this.setState({ cordsgreen: [cords.latitude, cords.longitude], cordsred: [cords.latitude, cords.longitude], centerpoint: [cords.latitude, cords.longitude] })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.OnGeoIPFound, null, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    });

  }

  OnDragGreenMarker = async (e) => {
    const { lat, lng } = e.latlng;
    console.log(`dragged at ${lat}, ${lng}`)
    this.setState({ cordsgreen: [lat, lng] })
    let data = await GetPath(this.state.cordsgreen, this.state.cordsred);
    console.log(data)
    this.setState({ waypoints: data["waypoint"].map(coord => new L.LatLng(coord[1], coord[0])),distance:parseFloat(data["distance"]) })
  }

  OnDragRedMarker = async (e) => {
    const { lat, lng } = e.latlng;
    console.log(`dragged at ${lat}, ${lng}`)
    this.setState({ cordsred: [lat, lng] })
    let data = await GetPath(this.state.cordsgreen, this.state.cordsred);
    console.log(data)
    this.setState({ waypoints: data["waypoint"].map(coord => new L.LatLng(coord[1], coord[0])),distance:parseFloat(data["distance"]) })
    console.log(this.state.waypoints)
  }

  OnClickEstimateButton = async () => {
    let data = await CommutePaths(this.state.distance,cookie.load("jwt"))
    if(data.OK) {
      this.setState({ result_fetched: true, results: data.products })
    } else {
      this.setState({error:data.message})
    }
  }

  onStartValueEntered = async (value: any, _event: any) => {
    let data = await GetStreetName(value);
    if (data[0] !== undefined) {
      console.log(data)
      this.setState({ locations: data.map(cool => cool['display_name']), tempstart: [data[0]['lat'], data[0]['lon']] })
    }
  }

  onEndValueEntered = async (value: any, _event: any) => {
    let data = await GetStreetName(value);
    if (data[0] !== undefined) {
      console.log(data)
      this.setState({ locations: data.map(cool => cool['display_name']), tempend: [data[0]['lat'], data[0]['lon']] })
    }

  }

  onStartAutoComplete = async () => {
    this.setState({ cordsgreen: this.state.tempstart, centerpoint: this.state.tempstart })
    let data = await GetPath(this.state.cordsgreen, this.state.cordsred);
    console.log(data)
    this.setState({ waypoints: data["waypoint"].map(coord => new L.LatLng(coord[1], coord[0])),distance:parseFloat(data["distance"]) })
  }

  onEndAutoComplete = async () => {
    this.setState({ cordsred: this.state.tempend, centerpoint: this.state.tempend })
    let data = await GetPath(this.state.cordsgreen, this.state.cordsred);
    console.log(data)
    this.setState({ waypoints: data["waypoint"].map(coord => new L.LatLng(coord[1], coord[0])),distance:parseFloat(data["distance"]) })
  }

  render() {
    var latlngs = [
      new L.LatLng(this.state.cordsgreen[0], this.state.cordsgreen[1]),
      new L.LatLng(this.state.cordsred[0], this.state.cordsred[1]),
    ];
    console.log(latlngs)
    //var polyline = L.polyline(latlngs, {color: 'red'})
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
        {this.state.result_fetched === false ? (
          <>
            <div className="instructions">
              <h1>Instructions</h1>
              <ul>
                <li>Drag and place Start (Green marker) and End marker (Red marker) </li>
                <li>Click Estimate Button below </li>
              </ul>
              Start :
              <Autocomplete
                id="starting-location"
                label="Starting location"

                placeholder="cool"
                data={this.state.locations}
                filter={null}
                onChange={this.onStartValueEntered}
                onAutocomplete={this.onStartAutoComplete}
              /><br />
              End :
              <Autocomplete
                id="ending-location"
                label="Ending location"
                placeholder="cool"
                data={this.state.locations}
                filter={null}
                onChange={this.onEndValueEntered}
                onAutocomplete={this.onEndAutoComplete}
              /><br />
            </div>
            <div className="map">
              <LeafletMap
                center={this.state.centerpoint}
                zoom={10}
                maxZoom={100}
                //onClick={this.handleClick}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                overlay={false}
                animate={false}
                easeLinearity={0.35}
                routing={true}
                ref={this.map}
              >
                <Polyline positions={this.state.waypoints} color={"blue"} />
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
              <br />
              <br />
              <br />
              <div className="estimate_button">
                <Button
                  onClick={this.OnClickEstimateButton}
                  type="submit"
                  raised={true}
                >
                  Estimate
            </Button><br/>{this.state.error}
              </div>
            </div>
          </>
        ) : (
            <div id="results">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h2>Results</h2>
              <DataTable>
                <TableHeader>
                  <TableRow>
                    <TableColumn>Service</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Eta</TableColumn>
                  </TableRow>
                </TableHeader>
                {this.state.results.map(data =>
                  <TableRow>
                    <TableColumn>{data[0]}</TableColumn>
                    <TableColumn>{data[1]}</TableColumn>
                  </TableRow>)
                }

              </DataTable>
            </div>
          )}
      </>
    )
  }
}