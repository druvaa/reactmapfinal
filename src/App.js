import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  InfoWindow, 
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';
Geocode.setApiKey("AIzaSyDIATTz7w5lKJYfjR5XssI2-AsPxwgqxQw")
var getDistanceBetweenPoints = require('get-distance-between-points');

class App extends React.Component {

state = {
  address: "",
  city : "",
  area : "",
  state : "",
  zoom:10,
  height : 400,
  mapPosition : {
    lat:13.026917188055844,
    lng:77.61748632812503,
  },
 pickUpLocation : {
    lat:13.026917188055844,
    lng:77.61748632812503,
  },
  dropLocation : {
    lat:12.026917188055844,
    lng:77.61748632812503,
  }

}
pickupMarkerDraggend =(event) =>{
let pickUpLat = event.latLng.lat();
let pickUpLng = event.latLng.lng();
console.log("pickUp latitude"+pickUpLat +" pick up longitude "+pickUpLng);

Geocode.fromLatLng(pickUpLat,pickUpLng).then(response => {
 const address = response.results[0].formatted_address

 this.setState({
   zoom :12,
  pickUpLocation : {
     lat: pickUpLat,
     lng:pickUpLng,
   },
    mapPosition : {
     lat: pickUpLat,
     lng:pickUpLng,
   }
 })
  
})

}
dropMarkerDraggend =(event) =>{
let dropLocationLat = event.latLng.lat();
let dropLocationLng = event.latLng.lng();
console.log("drop location latitude"+dropLocationLat +"drop location longitude "+dropLocationLng);

Geocode.fromLatLng(dropLocationLat,dropLocationLng).then(response => {
 const address2 = response.results[0].formatted_address

 this.setState({
   zoom :12,
   dropLocation : {
     lat: dropLocationLat,
     lng:dropLocationLng,
   },
    mapPosition : {
     lat: dropLocationLat,
     lng:dropLocationLng,
   }
 })
  
})
var distanceInMeters = getDistanceBetweenPoints.getDistanceBetweenPoints(
    this.state.pickUpLocation.lat, this.state.pickUpLocation.lng, // Lat, Long of point A
    this.state.dropLocation.lat, this.state.dropLocation.lng// Lat, Long of point B
);
 
// Outputs: Distance in Meters:  1813.5586276614192
console.log("Distance in Meters: ", distanceInMeters);
 
// Outputs: Distance in Kilometers:  1.8135586276614193
console.log("Distance in Kilometers: ", (distanceInMeters * 0.001));

}
onPickUpBoxSelected = (place) =>{
  console.log("pickup latitude is "+place.geometry.location.lat()+"pickup longitude is "+place.geometry.location.lng());
   this.setState({
   zoom :12,
   pickUpLocation : {
     lat:place.geometry.location.lat(),
     lng:place.geometry.location.lng(),
   },
    mapPosition : {
     lat:place.geometry.location.lat(),
     lng:place.geometry.location.lng(),
   }
 })
}
onDropBoxSelected = (place2) =>{
  console.log(" drop location latitude is "+place2.geometry.location.lat()+"drop location longitude is "+place2.geometry.location.lng());
   this.setState({
   zoom :12,
  dropLocation : {
     lat:place2.geometry.location.lat(),
     lng:place2.geometry.location.lng(),
   },
    mapPosition : {
     lat:place2.geometry.location.lat(),
     lng:place2.geometry.location.lng(),
   }
 })
}
 render(){
   const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={this.state.zoom}
    defaultCenter={{ lat : this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
  >
   <Marker
      draggable={true}
      onDragEnd={this.pickupMarkerDraggend}
      position={{ lat:  this.state.pickUpLocation.lat, lng: this.state.pickUpLocation.lng }}
    />

     <Marker
      draggable={true}
      onDragEnd={this.dropMarkerDraggend}
      position={{ lat:  this.state.dropLocation.lat, lng: this.state.dropLocation.lng}}
    />

    <AutoComplete
    style={{width : "80%"}}
    types={['establishment'],['(regions)']}
    componentRestrictions={{country: "in"}}
    onPlaceSelected={this.onPickUpBoxSelected}
    text={"hi"}

    />
    <AutoComplete
      style={{width : "80%"}}
       types={['establishment'],['(regions)']}
    componentRestrictions={{country: "in"}}
      onPlaceSelected={this.onDropBoxSelected}
    />
       
  </GoogleMap>
));
  return (
   <MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIATTz7w5lKJYfjR5XssI2-AsPxwgqxQw&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
  );
}
}

export default App;
