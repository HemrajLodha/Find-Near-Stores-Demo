import {restApiGet} from "./data_api_base";

const api_get_location = 'http://www.mocky.io/v2/5a88820e3000007a007f9483';

export function getLocationData(data) {
    return restApiGet(api_get_location, data);
}

