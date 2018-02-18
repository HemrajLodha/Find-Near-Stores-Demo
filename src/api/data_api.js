import {restApiGet} from "./data_api_base";

const api_get_location = 'http://www.mocky.io/v2/5a88820e3000007a007f9483';
const api_get_routes = 'https://maps.googleapis.com/maps/api/directions/json';

export function getLocationData(data) {
    return restApiGet(api_get_location, data);
}

export function getRoutesData(data) {
    return restApiGet(api_get_routes, data);
}

