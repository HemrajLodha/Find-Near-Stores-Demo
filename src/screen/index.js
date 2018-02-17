import {Navigation} from 'react-native-navigation'
import Locations from "./Locations/Locations";


export function registerScreens(store, Provider) {
    Navigation.registerComponent('findstoredemo.Locations', () => Locations, store, Provider);
}