
"use strict";
const jsonpath = require('jsonpath');

const getDataForPath = (data, path) => {
    try {
        // Use jsonpath to parse the value for the path from the data
        var value = jsonpath.query(data, path)[0];
        // Value is a numer
        if (typeof value === 'number') {
            return value;
        // Value is an array
        } else if (value instanceof Array) {
            return value.length
        // Value is a dict
        } else if (typeof value === 'object') {
            return 0;
        // Value is undefined (could be that jsonpath failed)
        } else if (typeof value === 'undefined') {
            // Try to parse identical objects in a list
            var basePath = path.split('.').slice(0, -1).join('.');
            var keyPath = path.split('.').pop();
            // Join the base and key path back together but allow additional layers
            var values = jsonpath.query(data, basePath + ".." + keyPath)
            if (values instanceof Array) {
                // Take the mean of the value of all objects
                var sum = values.reduce((a, b) => a + b, 0);
                var mean = (sum / values.length) || 0
                return mean;
            }
            // Return 0 as default.
            return 0;
        }
    } catch (e) {
        // Cannot read the requested value from the object, returning 0 as default.
        return 0;
    }
}

module.exports = {
    getDataForPath
};