import {Navigation} from 'react-native-navigation'
import Locations from "./Locations/Locations";
import LocationDetail from "./LocationDetail/LocationDetail";
import StoreDirection from "./StoreDirection/StoreDirection";


export function registerScreens(store, Provider) {
    Navigation.registerComponent('findstoredemo.Locations', () => Locations, store, Provider);
    Navigation.registerComponent('findstoredemo.LocationDetail', () => LocationDetail);
    Navigation.registerComponent('findstoredemo.StoreDirection', () => StoreDirection, store, Provider);
}