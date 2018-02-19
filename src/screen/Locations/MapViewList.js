import React, {Component, PureComponent} from 'react';
import color from "../../../assets/values/color";
import size from "../../../assets/values/dimens";
import {Utils} from "../../utils/Utils";
import PropTypes from "prop-types";
import MapView, {Marker, Polyline} from "react-native-maps";

const ASPECT_RATIO = size.screen_width / size.screen_height;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapViewList extends PureComponent {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        loading: PropTypes.bool.isRequired,
        region: PropTypes.any.isRequired,
        lastLat: PropTypes.number.isRequired,
        lastLong: PropTypes.number.isRequired,
        style: PropTypes.any.isRequired,
        pinColor: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
    }


    getMarkersCoordinates = () => {
        return this.props.data.map((item, index) => {
            return (
                <Marker
                    key={`marker${index}`}
                    title={item.name}
                    description={item.brand}
                    geodesic={true}
                    lineJoin={"round"}
                    coordinate={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    pinColor={color.gray_900}
                />
            );
        });
    };

    getPolylinesToLocations = () => {
        return this.props.data.map((item, index) => {
            return (
                <Polyline
                    key={`poliline${index}`}
                    coordinates={[
                        {latitude: parseFloat(this.props.lastLat), longitude: parseFloat(this.props.lastLong)},
                        {latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)},
                    ]}
                    geodesic={true}
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

    render() {
        let {region, lastLat, lastLong, style, pinColor} = this.props;
        return (
            <MapView
                showsUserLocation={true}
                style={style}
                region={region}
                showsPointsOfInterest={true}>
                <Marker
                    key={"my_marker"}
                    title={"you are here"}
                    coordinate={{
                        latitude: parseFloat(lastLat),
                        longitude: parseFloat(lastLong),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    pinColor={pinColor}
                />
                {this.getMarkersCoordinates()}
                {this.getPolylinesToLocations()}
            </MapView>
        );
    };
}