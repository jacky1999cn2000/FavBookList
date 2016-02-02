/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 * @type {{connection: string, tableName: string, attributes: {userId: {autoIncrement: boolean, primaryKey: boolean, type: string}, role: {defaultsTo: null, enum: *[], type: string}, name: {required: boolean, type: string}, apiKey: {type: string, unique: boolean}, authToken: {type: string}, authenticated: {defaultsTo: boolean, type: string}, sessionKey: {type: string}}, canAccessVendor: Function, hasRole: Function, apiKeyIsValid: Function, createAuthToken: Function, validateAuthToken: Function}|*}
 */

'use strict';

module.exports = {

    attributes: {
        username: {
            required: true,
            email: true,
            unique: true,
            type: 'string'
        },
        password: {
            required: true,
            type: 'string',
        },
        booklist:{
            collection: 'booklist',
            via: 'owner'
        }
    }

};
