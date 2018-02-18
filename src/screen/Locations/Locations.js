import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Platform,
    Switch,
    TouchableOpacity,
    TextInput, Alert, ActivityIndicator, SectionList, ScrollView, PermissionsAndroid
} from 'react-native';
import styles from './styles'
import {Icons} from "react-native-fontawesome";
import {bindActionCreators} from "redux";
import * as searchLocationsDataActions from "../../api/locations/actions";
import {connect} from "react-redux";
import MessageView from "../../widget/MessageView";
import LocationsList from "./LocationsList";
import {Navigation} from "react-native-navigation";
import font from "../../../assets/values/font";
import size from "../../../assets/values/dimens";
import MapView, {Marker, Polyline} from 'react-native-maps';
import color from "../../../assets/values/color";
import {Utils} from "../../utils/Utils";
import AsyncStorageKeys from "../../AsyncStorageKeys";


const ASPECT_RATIO = size.screen_width / size.screen_height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [], showMapView: false,
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            favouriteLocId: null,
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    onNavigatorEvent = (event) => {
        switch (event.id) {
            case 'action_toggle_menu':
                this.toggleShowState();
                break;
            case 'willAppear':
                AsyncStorageKeys.getFavouriteItemId().then(Id => {
                    this.setState({favouriteLocId: Id});
                });
                break;
            case 'didAppear':

                break;
            case 'willDisappear':

                break;
            case 'didDisappear':

                break;
            case 'willCommitPreview':
                break;
        }
    };


    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Find Store Demo',
                    'message': 'App needed location for better results.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getCurrentLocation();
            } else {
                console.log("permission denied");
                this.requestLocationPermission();
            }
        } catch (err) {
            console.warn(err)
        }
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
        AsyncStorageKeys.setCurrentLocation(JSON.stringify(region)).then(() => {
            this.actionSetButton();
        }).catch(err => console.log("err", err));
    }

    getCurrentLocation = () => {
        this.refs.messageView.showMessage("Fetching current location...");
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
            this.onRegionChange(region, region.latitude, region.longitude);
        });
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    actionSetButton = () => {
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'action_toggle_menu',
                    showAsAction: 'always',
                    icon: this.state.showMapView ? require('./../../../assets/images/menu/ic_action_view_list.png')
                        : require('./../../../assets/images/menu/ic_action_map.png')
                }
            ]
        });
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    };


    toggleShowState = () => {
        this.setState({showMapView: !this.state.showMapView}, () => {
            this.actionSetButton();
        });
    };

    getMarkersCoordinates = () => {
        return this.state.data.map((item, index) => {
            return (
                <Marker
                    key={`marker${index}`}
                    title={item.name}
                    description={item.brand}
                    coordinate={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    pinColor={color.gray_900}
                />
            )
        });
    };

    getPolylinesToLocations = () => {
        return this.state.data.map((item, index) => {
            return (
                <Polyline
                    key={`poliline${index}`}
                    coordinates={[
                        {latitude: parseFloat(this.state.lastLat), longitude: parseFloat(this.state.lastLong)},
                        {latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)},
                    ]}
                    lineCap={"round"}
                    lineJoin={"round"}
                    strokeColor={Utils.getRandomColor()}
                    strokeColors={[
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={2}
                />
            )
        });
    };

    componentDidMount() {
        this.requestLocationPermission();
        this.searchLocations();
    }

    onPressItem = (item, index) => {
        this.props.navigator.push({
            screen: "findstoredemo.LocationDetail",
            title: item.name,
            passProps: {data: item}
        })
    };

    componentWillReceiveProps(nextProps) {
        if (this.searchServiceCalling && !nextProps.searchLocationsData.isLoading) {
            this.searchServiceCalling = false;
            if (nextProps.searchLocationsData.status) {
                this.setState({data: nextProps.searchLocationsData.data});
            } else {
                this.setState({data: []});
                this.refs.messageView.showError(nextProps.searchLocationsData.message);
            }
        }
    }

    searchLocations = () => {
        this.searchServiceCalling = true;
        this.props.searchLocationsDataActions.getLocations({});
    };

    render() {
        let {data, showMapView, mapRegion, lastLat, lastLong, favouriteLocId} = this.state;
        return (
            <View style={styles.container}>
                {showMapView &&
                <MapView
                    showsUserLocation={true}
                    style={styles.map_view}
                    region={mapRegion}
                    showsPointsOfInterest={true}
                >
                    <Marker
                        key={"my_marker"}
                        title={"you are here"}
                        coordinate={{
                            latitude: parseFloat(lastLat),
                            longitude: parseFloat(lastLong),
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        pinColor={color.colorPrimary}
                    />
                    {this.getMarkersCoordinates()}
                    {this.getPolylinesToLocations()}
                </MapView>
                }
                <View
                    style={showMapView && {flex: 0} || {flex: 1}}
                >
                    <LocationsList
                        favouriteId={favouriteLocId}
                        onPressItem={this.onPressItem}
                        data={data}
                        loading={this.searchServiceCalling && this.props.searchLocationsData.isLoading}
                    />
                </View>
                <MessageView
                    ref='messageView'
                />
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        searchLocationsData: state.locationsReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchLocationsDataActions: bindActionCreators(searchLocationsDataActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);