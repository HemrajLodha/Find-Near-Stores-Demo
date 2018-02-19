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
import MapView, {AnimatedRegion, Marker, Polyline} from 'react-native-maps';
import color from "../../../assets/values/color";
import {Utils} from "../../utils/Utils";
import AsyncStorageKeys from "../../AsyncStorageKeys";
import {PermissionUtils} from "../../utils/PermissionUtils";
import MapViewList from "./MapViewList";


const ASPECT_RATIO = size.screen_width / size.screen_height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showMapView: false,
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

    checkForLocationPermission = () => {
        PermissionUtils._checkLocationPermission().then(() => {
            this.getCurrentLocation();
        }).catch(err => {
            PermissionUtils._requestLocationPermission().then(() => {
                this.getCurrentLocation();
            }).catch(err => {
                this.requestLocationPermission();
            });
        });
    };


    requestLocationPermission = () => {
        if (Platform.OS === "android") {
            if (Platform.Version > 22) {
                this.checkForLocationPermission();
            } else {
                this.getCurrentLocation();
            }
        } else {
            this.checkForLocationPermission();
        }
    };

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
        AsyncStorageKeys.setCurrentLocation(JSON.stringify(region)).then(() => {
            this.actionSetButton();
            this.refs.messageView.hideMessageView();
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

    componentDidMount() {
        if (Platform.OS === "android") {
            this.requestLocationPermission();
        } else {
            this.getCurrentLocation();
        }
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
                <MapViewList
                    region={mapRegion}
                    lastLat={lastLat}
                    lastLong={lastLong}
                    data={data}
                    style={styles.map_view}
                    pinColor={color.colorPrimary}
                    loading={this.props.searchLocationsData.isLoading}
                />
                }
                <View
                    style={showMapView && {flex: 0} || {flex: 1}}
                >
                    <LocationsList
                        lastLat={lastLat || 0}
                        lastLong={lastLat || 0}
                        favouriteId={favouriteLocId}
                        onPressItem={this.onPressItem}
                        data={data || []}
                        loading={this.searchServiceCalling && this.props.searchLocationsData.isLoading || false}
                    />
                </View>
                <MessageView
                    autoHide={false}
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