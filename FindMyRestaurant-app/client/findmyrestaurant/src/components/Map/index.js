import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import config from 'config/keys';

class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedRestaurant: {},
    };
    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            selectedRestaurant: props.restaurant
        });
    }
    renderRestaurantMarker() {
        return this.props.restaurants.map((restaurant, index) => {
            const position = {
                lat: restaurant.location.latitude,
                lng: restaurant.location.longitude
            }
            return (
                <Marker
                    onClick={this.onMarkerClick}
                    key={index}
                    title={restaurant.name}
                    name={restaurant.name}
                    restaurant={restaurant}
                    animation={this.props.highlightRestaurant === restaurant ? window.google.maps.Animation.BOUNCE : ''}
                    position={position} />

            );
        });
    }
    mapBoundChanged = (mapProps, map)=>{
        this.props.onVisibleAreaChanged(map.getBounds());
    }
    render() {
        return (
            <Map google={this.props.google}
                {...this.props.map}>
                {
                    this.renderRestaurantMarker()
                }
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h2>{this.state.selectedRestaurant.name}</h2>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: config.GOOGLE_API
})(MapContainer)
