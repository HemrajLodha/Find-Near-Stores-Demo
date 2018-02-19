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
import * as searchRoutesDataActions from "../../api/routes/actions";
import {connect} from "react-redux";
import MessageView from "../../widget/MessageView";
import size from "../../../assets/values/dimens";
import MapView, {AnimatedRegion} from 'react-native-maps';
import color from "../../../assets/values/color";
import {Utils} from "../../utils/Utils";
import AsyncStorageKeys from "../../AsyncStorageKeys";
import * as Polyline from "@mapbox/polyline/src/polyline";
import {PermissionUtils} from "../../utils/PermissionUtils";


const ASPECT_RATIO = size.screen_width / size.screen_height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            coords: [],
            distance: 0
        };

        AsyncStorageKeys.getFavouriteItemId().then(id => {
            if (id === this.state.data.id.toString()) {
                this.isFavourite = true;
            } else {
                this.isFavourite = false;
            }
            this.actionSetButton();
        }).catch(err => {
            this.isFavourite = false;
            this.actionSetButton();
        });
        this.getDistance();
    }

    getDistance = () => {
        AsyncStorageKeys.getCurrentLocation().then(location => {
            let distance = Utils.getDistance(location.latitude, location.longitude, this.state.data.latitude, this.state.data.longitude, "K");
            distance = distance / 1000;
            distance = parseFloat(distance).toFixed(1);
            this.setState({distance: distance});
        });
    };

    actionSetButton = () => {
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'action_menu_fav',
                    showAsAction: 'always',
                    icon: this.isFavourite ? require('./../../../assets/images/menu/ic_action_star.png')
                        : require('./../../../assets/images/menu/ic_action_star_border.png')
                }
            ]
        });
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    };


    toggleShowState = () => {
        this.isFavourite = !this.isFavourite;
        if (this.isFavourite) {
            AsyncStorageKeys.setFavouriteItemId(this.state.data.id.toString()).then(() => {
                this.actionSetButton();
            });
        } else {
            AsyncStorageKeys.setFavouriteItemId("").then(() => {
                this.actionSetButton();
            });
        }
    };


    onNavigatorEvent = (event) => {
        switch (event.id) {
            case 'action_menu_fav':
                this.toggleShowState();
                break;
            case 'willAppear':
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

    requestLocationPermission() {
        if (Platform.OS === "android") {
            if (Platform.Version > 22) {
                this.checkForLocationPermission();
            } else {
                this.getCurrentLocation();
            }
        } else {
            this.checkForLocationPermission();
        }
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
        let data = {
            origin: region.latitude.toString() + "," + region.longitude.toString(),
            destination: this.state.data.latitude.toString() + "," + this.state.data.longitude.toString()
        };
        this.searchServiceCalling = true;
        this.refs.messageView.showMessage("Fetching routes....");
        this.props.searchRoutesDataActions.getRoutes(data);
    }

    getCurrentLocation = () => {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setCurrentLocation(position.coords.latitude, position.coords.longitude);
        });
    };

    setCurrentLocation = (latitude, longitude) => {
        let region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };
        this.onRegionChange(region, region.latitude, region.longitude);
    };

    getDirections = (respJson) => {
        try {
            console.log("points", respJson.routes[0].overview_polyline.points);
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            });
            console.log("coords", coords);
            this.setState({coords: coords})
        } catch (error) {
            console.log("err", error);
        }
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    getMarkersCoordinates = () => {
        let {data} = this.state;
        return (
            <MapView.Marker
                key={"marker_dest"}
                title={data.name}
                description={data.brand}
                coordinate={{
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                pinColor={color.gray_900}
            />
        )
    };

    getPolylinesToLocations = () => {
        return (
            <MapView.Polyline
                ref={polyline => {
                    this.polyline = polyline;
                }}
                key={'route_line'}
                coordinates={this.state.coords}
                strokeColor={"#5F02D0"}
                strokeColors={[
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={2}
            />
        )
    };

    componentDidMount() {
        console.log("componentDidMount");
        AsyncStorageKeys.getCurrentLocation().then(location => {
            console.log("location", location);
            this.setCurrentLocation(location.latitude, location.longitude);
        }).catch(err => {
            console.error("err", err);
            this.requestLocationPermission();
        });

    }

    onPressItem = (item, index) => {
        this.props.navigator.push({
            screen: "findstoredemo.LocationDetail",
            title: item.name,
            passProps: {data: item}
        })
    };

    componentWillReceiveProps(nextProps) {
        if (this.searchServiceCalling && !nextProps.searchLocationRoutesData.isLoading) {
            this.searchServiceCalling = false;
            if (nextProps.searchLocationRoutesData.status) {
                this.getDirections(nextProps.searchLocationRoutesData.data);
            } else {
                this.refs.messageView.showError(nextProps.searchLocationRoutesData.message);
            }
        }
    }

    getTagViews = (tags) => {
        return tags.map((item, index) => {
            return (
                <View
                    key={`tag${index}`}
                    style={styles.list_item_tag}>
                    <Text style={styles.list_item_tag_text}>{item}</Text>
                </View>
            );
        })
    };

    render() {
        let {mapRegion, lastLat, lastLong, data, distance} = this.state;
        return (
            <View style={styles.container}>
                {
                    mapRegion &&
                    <MapView
                        showsUserLocation={true}
                        style={styles.map_view}
                        showsPointsOfInterest={true}
                        region={mapRegion}>
                        <MapView.Marker
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
                <View style={styles.list_item_container}>
                    <View style={styles.list_item_title_cnt}>
                        <Text style={styles.list_item_title}>{data.name}</Text>
                    </View>
                    <Text style={styles.list_item_distance}>{distance} km away</Text>
                    <View style={styles.list_item_title_cnt}>
                        <Text
                            style={styles.list_item_address}>{data.address}</Text>
                    </View>
                    <View style={styles.list_item_tag_cnt}>
                        {this.getTagViews(data.store_tags.split(","))}
                    </View>
                </View>
                <MessageView
                    ref='messageView'
                    autoHide={true}
                />
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        searchLocationRoutesData: state.routesReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchRoutesDataActions: bindActionCreators(searchRoutesDataActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);