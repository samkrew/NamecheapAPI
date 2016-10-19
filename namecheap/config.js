(function () {
    'use strict';
    
    var lodash = require('lodash'),
        
        config = {},
        proxy = null,
        requiredProperties = ['ApiUser', 'ApiKey', 'UserName', 'ClientIp'];
    
    function set(configName, configValue) {
        if (configName === "Proxy") {
            proxy = configValue;
            return;
        }
        
        if (requiredProperties.indexOf(configName) === -1) {
            throw new Error("That is not a configurable property.");
        }
        if (!lodash.isString(configValue) || configValue.length === 0) {
            throw new Error("Configurable property must have a string value."); 
        }

        config[configName] = configValue;
    }
    
    function get(globalName) {
        return config[globalName];
    }
    
    function getAll() {
        return lodash.clone(config);   
    }

    function getProxy() {
        return proxy;
    }
    
    function isSatisfied() {
        return lodash.every(requiredProperties, function (requiredProperty) {
            return config.hasOwnProperty(requiredProperty);   
        });
    }
    
    module.exports = {
        set: set,
        get: get,
        getAll: getAll,
        getProxy: getProxy,
        isSatisfied: isSatisfied
    };
    
}());
