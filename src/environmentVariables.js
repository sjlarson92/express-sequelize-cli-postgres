"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = void 0;
var getEnvVar = function (name) {
    var env = process.env[name];
    if (!env) {
        throw new Error("Environment variable for ".concat(name, " is missing"));
    }
    return env;
};
var getEnvironmentVariables = function () {
    return {
        PORT: getEnvVar('PORT'),
        ENVIRONMENT: getEnvVar('ENVIRONMENT'),
        DB_HOST: getEnvVar('DB_HOST'),
        DB_NAME: getEnvVar('DB_NAME'),
        DB_USER: getEnvVar('DB_USER'),
        DB_PASSWORD: getEnvVar('DB_PASSWORD'),
        DB_DIALECT: getEnvVar('DB_DIALECT')
    };
};
exports.getEnvironmentVariables = getEnvironmentVariables;
