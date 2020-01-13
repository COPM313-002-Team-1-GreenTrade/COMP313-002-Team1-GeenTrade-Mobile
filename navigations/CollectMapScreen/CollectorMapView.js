import React, { Component } from "react";
import { Text, View, SafeAreaView, Linking, Platform } from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import styles from "./styles";
import { Button } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-elements";
import Environment from '../../config/FireBaseConfig';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";



export default class CollectorMapView extends React.Component{

  mapView = React.createRef();

  constructor(props) {
    super(props);
    this.state = {

      isLoading: true,
      region: null,
      addressMarker: {},
    }
    this._getLocationAsync();
  }
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('didFocus', () => {
      this._getLocationAsync();
    });
  }

  componentDidUpdate() {
    this.state.isLoading = true;
  }

  // open native map with defined address
  // currently unused
  openMap = () => {
    const scheme = Platform.select({ ios: `maps:${this.state.region.latitude},${this.state.region.longitude}?q=`, android: `geo:${this.state.region.latitude},${this.state.region.longitude}?q=` });
    const destination = "43.7756435641" + "," + "-79.2340690637"
    const url = Platform.select({
      ios: `${scheme}${`${this.props.selected} Destination`}@${destination}`,
      android: `${scheme}${`${this.props.selected} Destination`}@${destination}`
    });
    Linking.openURL(url)
  }

  // gets the location of the client's address and updates the map's state
  _getLocationAsync = async () => {
    const address = this.props.navigation.getParam('address');
    const notes = this.props.navigation.getParam('notes');

    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });

    try {
      let concatAddress = address.street + "," + address.city + "," + address.province + "," + address.postalCode;
      let mapQuestURI = "http://www.mapquestapi.com/geocoding/v1/address?key=" + Environment['MAPQUEST_API_KEY'] + "&location=" + concatAddress;
      let mapQuestResponse = await fetch(mapQuestURI);
      let responseJson = await mapQuestResponse.json();

      let region = {
        latitude: responseJson.results[0].locations[0].latLng.lat,
        longitude: responseJson.results[0].locations[0].latLng.lng,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      }

      let marker = {
        latitude: responseJson.results[0].locations[0].latLng.lat,
        longitude: responseJson.results[0].locations[0].latLng.lng,
        title: address.street,
        notes: notes,
      }
      this.setState({ region: region, addressMarker: marker, isLoading: false })
      if (this.mapView) {
        this.mapView.current.animateToRegion(region, 1000);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  // returns a MapView marker based on the provided marker
  getMapViewMarker = (marker) => {
    const coords = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    };

    return (
      <MapView.Marker
        key = { 1 }
        coordinate = { coords }
        title = { marker.title }
        description = { marker.notes }
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <Icon
                type="material"
                name="keyboard-arrow-left"
                size={30}
                color="#fff"
                containerStyle={styles.drawerIcon}
              />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.textTitle}>Confirmed Pickups</Text>
            </View>
          </View>
        </View>
        <View style={styles.mapContainer}>
          <View style={{ flex: 1 }}>
            <MapView
              ref = { this.mapView }
              provider='google'
              showsMyLocationButton={true}
              initialRegion={this.state.region}
              showCompass={true}
              showUserLocation={true}
              rotateEnabled={true}
              style={styles.maps}
            >
            {this.state.isLoading ? null : this.getMapViewMarker(this.state.addressMarker)}
            </MapView>
          </View>
          
      { /* Do not need inner button for current implementation
      <View style={styles.buttonView}>
        <Button
          titleStyle={{ color: 'white' }}
          title="Collect"
          onPress={() => this.openMap()}
        />
      </View> */}

        </View>
      </SafeAreaView>
    )
  }
}