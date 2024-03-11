/**
 * @license MIT
 * @fileoverview All module functions
 * @copyright teddy 2023 All rights reserved
 * @author teddy <teddynoughton@gmail.com>
 */

'use strict';

const api_key = "9b1e6ef955b6049d29aafeee2bdb5c73";

/**
 * Fetch data from server
 * @param {string} URL Api url
 * @param {Function} callback callback
 */
export const fetchData = function (URL, callback) {
    fetch('${URL}&appid=${api_key}')
        .then(res => res.json())
        .then(data => callback(data));
}

export const url = {
    currentWeather(lat, lon) {
        return 'https://api.openweathermap.org/data/2.5/weather?${lat}&{lon}&units=metric'
    },
    forecast(lat, lon) {
        return 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric'
    },
    airPollution(lat, lon) {
        return 'https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}'
    },
    reverseGeo(lat, lon) {
        return 'http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}limit=5'
    },
    /** 
     * @param {string} query Search query e.g.:"london","New york"
     */
    geo(query) {
        return 'http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5'
    }
}