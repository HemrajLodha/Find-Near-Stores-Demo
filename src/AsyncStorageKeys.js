import {AsyncStorage} from "react-native";

const FavouriteItemId = 'FavouriteItemId';
const CurrentLocation = 'DemoCurrentLocation';


export default class AsyncStorageKeys {

    static setFavouriteItemId = (id) => {
        return new Promise(resolve => {
            AsyncStorage.setItem(FavouriteItemId, id).then(() => {
                resolve();
            });
        }).catch(err => {
            reject(err);
        });
    };

    static getFavouriteItemId = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(FavouriteItemId).then(Id => {
                if (Id !== "") {
                    resolve(Id);
                } else {
                    reject("no favourite")
                }
            }).catch(err => {
                reject(err);
            });
        });
    };

    static setCurrentLocation = (location) => {
        return new Promise(resolve => {
            AsyncStorage.setItem(CurrentLocation, location).then(() => {
                resolve();
            });
        }).catch(err => {
            reject(err);
        });
    };

    static getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(CurrentLocation).then(location => {
                if (location) {
                    resolve(JSON.parse(location));
                } else {
                    reject('no location found!');
                }
            }).catch(err => {
                console.log("err", err);
                reject(err);
            });
        });
    };


}