import React, {Component} from 'react';
import { DataTable,TableHeader,TableRow,TableColumn,Button,Autocomplete } from "react-md";
import  { Map as LeafletMap,TileLayer,Marker,Popup,Polyline}  from 'react-leaflet';
import * as L from 'leaflet';
import { CommutePaths } from '../api/requests';
import { GetStreetName } from "../api/requests";

type State = {
  [key: string]: any
}

export class Home extends Component<any, State> {
  state = {
    cordsgreen:[2222.8505, 76.2711],
    centerpoint:[2222.8505, 76.2711],
    cordsred:[2222.8505, 76.2711],
    result_fetched:false,
    results:[],
    locations:[],
    tempend:[],
    tempstart:[]
  }

  OnGeoIPFound = (position) => {
    let cords = position.coords;
    this.setState({cordsgreen:[cords.latitude,cords.longitude],cordsred:[cords.latitude,cords.longitude],centerpoint:[cords.latitude,cords.longitude]})
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
  
  OnClickEstimateButton = async () => {
    let data = await CommutePaths(this.state.cordsgreen,this.state.cordsred)
    this.setState({result_fetched:true,results:data.products})
  }

  onStartValueEntered = async (value: any, _event: any) => {
    let data = await GetStreetName( value);
    if(data[0] !== undefined) {
      console.log(data)
      this.setState({locations:data.map(cool => cool['display_name']),tempstart:[data[0]['lat'],data[0]['lon']]})
    }
  }

  onEndValueEntered = async (value: any, _event: any) => {
    let data = await GetStreetName( value);
    if(data[0] !== undefined) {
      console.log(data)
      this.setState({locations:data.map(cool => cool['display_name']),tempend:[data[0]['lat'],data[0]['lon']]})
    }
    
  }

  onStartAutoComplete = async () => {
    this.setState({cordsgreen:this.state.tempstart,centerpoint:this.state.tempstart})
  }

  onEndAutoComplete = async () => {
    this.setState({cordsred:this.state.tempend,centerpoint:this.state.tempend})
  }

  render() {
    var latlngs = [
      new L.LatLng(this.state.cordsgreen[0], this.state.cordsgreen[1]),
      new L.LatLng(this.state.cordsred[0], this.state.cordsred[1]),
    ];
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
      {this.state.result_fetched===false ?(
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
          filter={Autocomplete.caseInsensitiveFilter}
          onChange={this.onStartValueEntered}
          onAutocomplete={this.onStartAutoComplete}
        /><br/>
        End : 
        <Autocomplete
          id="ending-location"
          label="Ending location"
          placeholder="cool"
          data={this.state.locations}
          filter={Autocomplete.caseInsensitiveFilter}
          onChange={this.onEndValueEntered}
          onAutocomplete={this.onEndAutoComplete}
        /><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/>
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
          >
              
            <Polyline positions={latlngs}/>
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
          <br/>
          <br/>
          <br/>
          <div className="estimate_button">
            <Button
              onClick={this.OnClickEstimateButton}
              type="submit"
              raised={true}
            >
              Estimate
            </Button>
          </div>
        </div>
        </>
        ):(
          <div id="results">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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