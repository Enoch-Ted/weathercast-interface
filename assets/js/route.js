/**
 * @license MIT
 * @fileoverview All module functions
 * @copyright teddy 2023 All rights reserved
 * @author teddy <teddynoughton@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat51.5073219&lon=-0.1276474" //london

const currentlocation = function () {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

        updateWeather('lat=${latitude}', 'lon=${longitude}');
    }, err => {
        window.location.hash = defaultLocation;
    });
}
/**
 * @param {string} query Searched query
 */
const searchedLocation = query => updateWeather(...query.split("&"));
//updateWeather("lat=51.5073219", "lon=51.5073219")

const routes = new Map([
    ["/current-location", currentlocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.slice("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!window.location.hash) {
        window.location.hash = "/current-location";
    } else {
        checkHash();
    }
});


