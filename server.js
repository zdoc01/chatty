#!/usr/bin/env node

/**
 * Module dependencies.
 */
var hapi = require('hapi')
  , http = require('http')
  , path = require('path')
  , PORT = 8080
  , server = new hapi.Server(PORT);

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