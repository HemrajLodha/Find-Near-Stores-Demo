import Permissions from "react-native-permissions";

const permissionDeniedList = ['undetermined', 'denied'];

export class PermissionUtils {

    static _checkLocationPermission = () => {
        return new Promise((resolve, reject) => {
            Permissions.check("location").then(response => {
                if (permissionDeniedList.includes(response)) {
                    reject('location');
                } else if ('authorized' === response) {
                    resolve();
                }
            });
        });
    };

    static _requestLocationPermission = () => {
        return new Promise((resolve, reject) => {
            Permissions.request("location").then(response => {
                if ('denied' === response || 'restricted' === response) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    };

}