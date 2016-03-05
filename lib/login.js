exports.register = function(server,options,next) {

  server.route([
    {
      method:'GET',
      path:'/restricted',
      config: {
        auth: 'simple',
        handler: loginHandler
      }
    }
  ]);

  function loginHandler(request, reply){
    reply.redirect("/login.html");
  }

  return next();
};

exports.register.attributes = {
  name: 'Login'
};
