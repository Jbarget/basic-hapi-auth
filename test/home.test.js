var test = require('tape');
var start = require('../lib/start.js');
var Server = require('../lib/index.js');

test("testing handler to serve up home page", function(t){
  var options = {
    method : "GET",
    url: "/"
  };

  Server.server.inject(options, function(res){
    t.ok(res.payload.indexOf("<title>Home</title>") > -1, "Home page being served correctly");
    t.end();
  });
});

testAuth("john", "123", 401);
testAuth("tom", "123", 302);


function testAuth(username, password, expectedStatusCode){
  test("testing handler at restricted endpoint", function(t){
    var options = {
      method : "GET",
      url: "/restricted",
      headers: {
        authorization: basicHeader(username, password)
      }
    };

    Server.server.inject(options, function(res){
      var actual = res.statusCode;
      var expected = expectedStatusCode;

      t.equal(actual, expected, "Login page being responding correctly");
    });
    Server.server.stop(t.end);
  });
}

function basicHeader(username, password) {
	return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
}
