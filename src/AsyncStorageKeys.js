import {AsyncStorage} from "react-native";

const FavouriteItemId = 'FavouriteItemId';


export default class AsyncStorageKeys {

    static setFavouriteItemId = (id) => {
        return new Promise(resolve => {
            AsyncStorage.setItem(FavouriteItemId, id).then(() => {
                resolve();
            });
        }).catch(err => {
            reject(err);
        });
    }

    static getFavouriteItemId = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(FavouriteItemId).then(Id => {
                if (Id !== "") {
                    resolve(Id);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

}