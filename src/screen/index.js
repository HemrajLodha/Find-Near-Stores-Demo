import {Navigation} from 'react-native-navigation'
import Locations from "./Locations/Locations";
import LocationDetail from "./LocationDetail/LocationDetail";


export function registerScreens(store, Provider) {
    Navigation.registerComponent('findstoredemo.Locations', () => Locations, store, Provider);
    Navigation.registerComponent('findstoredemo.LocationDetail', () => LocationDetail);
}