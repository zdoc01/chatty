var Hapi = require('hapi');
var config = require('getconfig');
var server = new Hapi.Server(config.http.port);
var moonbootsConfig = require('./moonbootsConfig');
var api = require('./api');
var internals = {};

// set clientconfig cookie
internals.configStateConfig = {
    encoding: 'none',
    ttl: 1000 * 60 * 15,
    isSecure: config.isSecure
};
server.state('config', internals.configStateConfig);
internals.clientConfig = JSON.stringify(config.client);
server.ext('onPreResponse', function(request, reply) {
    if (!request.state.config) {
        var response = request.response;
        return reply(response.state('config', encodeURIComponent(internals.clientConfig)));
    }
    else {
        return reply();
    }
});


// require moonboots_hapi plugin
server.pack.register({plugin: require('moonboots_hapi'), options: moonbootsConfig}, function (err) {
    if (err) throw err;
    server.pack.register(api, function (err) {
        if (err) throw err;
        // If everything loaded correctly, start the server:
        server.start(function (err) {
            if (err) throw err;
            var subdomain = process.env.SUBDOMAIN || config.http.listen;
            console.log("Chatty is running at: http://" + subdomain + ":" + config.http.port);
        });
    });
});
