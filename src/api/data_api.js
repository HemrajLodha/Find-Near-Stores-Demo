import {restApiGet} from "./data_api_base";

const api_get_location = 'http://www.mocky.io/v2/5a881e673000006f007f93db';

export function getLocationData(data) {
    return restApiGet(api_get_location, data);
}

