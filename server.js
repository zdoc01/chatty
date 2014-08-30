#!/usr/bin/env node

/**
 * Module dependencies.
 */
var hapi = require('hapi')
  , http = require('http')
  , path = require('path')
  , PORT = 8080;

/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
var subdomain = (process.env.SUBDOMAIN) ? process.env.SUBDOMAIN : 'localhost';

var server = new hapi.Server(subdomain, PORT);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            path: path.join(__dirname, 'public'),
            listing: false,
            index: true
        }
    }
});

server.start(function(){
    console.log('Hapi server listening at: ' + server.info.uri);
});