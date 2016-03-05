
var Auth = exports.register = function(server, options, next) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    next();
  };

function validate(request, username, password, callback){
  var isValid = username === "tom" && password === "123";
  callback(null, isValid, {user:"admin"});
}

exports.register.attributes = {
  name: 'Authentication'
};
