var Hapi = require('hapi');
var Inert = require('inert');
var Basic = require('hapi-auth-basic');

var Authorisation = require('./authorisation.js');
var Home = require('./home.js');
var Login = require('./login.js');

var server = new Hapi.Server();

var init = function(port,next){
  server.connection({port: port});
  server.register([Basic, Authorisation, Inert, Home, Login], function(err){
    if (err) {
      return next(err);
    }

    server.start(function (err) {

      return next(err,server);
    });
  });
};

module.exports = {
  server: server,
  init: init
};
