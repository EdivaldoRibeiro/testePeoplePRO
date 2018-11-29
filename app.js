var app = require('./app_config.js');
var db = require('./db_config.js');
var userController = require('./controller/userController.js');
var validator = require('validator');

var allowCors = function(req,res,next) {
  res.header('Access-Control-Allow-Origin','127.0.0.1:5000');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
}

// http://127.0.0.1:5000/users
app.get('/users', function(req,res) {

  userController.list(function(result) {
    res.json(result);
  });

});

//http://127.0.0.1:5000/users/5bfebf969ebbee4662ea3218
app.get('/users/:id', function(req,res) {

  var id = req.param('id');
  userController.user(id,function(ret) {
    res.json(ret);
  });
});

//http://127.0.0.1:5000/users?fullname=EdivaldoRibeiro1&email=java.betel@uol.com.br1&password=1234
app.post('/users', function(req,res) {

  var fullname = req.param('fullname');
  var email = req.param('email');
  var password = req.param('password');
  var latitude = req.param('latitude');
  var longitude = req.param('longitude');
  var ip = req.param('ip');
  var city = req.param('city');
  var woeid = req.param('woeid');
  var min_temp = req.param('min_temp');
  var max_temp = req.param('max_temp');

  new_user = new db.User({
    'fullname': fullname,
    'email': email,
    'password': password,
    'latitude': latitude,
    'longitude': longitude,
    'ip': ip,
    'city': city,
    'woeid': woeid,
    'min_temp': min_temp,
    'max_temp': max_temp,
    'created_at' : new Date()
  });

  userController.geolocalization(new_user, function(ret_geol) {
    userController.cidade(ret_geol, function(ret_cidade) {
        userController.temperatura(ret_cidade, function(ret_temp) {
          userController.save(ret_temp,function(result) {
            res.json(result);
          });
        });
    });
  });
});

//http://127.0.0.1:5000/users?fullname=EdivaldoRibeiro_um&email=java.betel@uol.com.br_um&password=1234&id=5bfed11cf1915c4da1ea97d1
app.put('/users', function(req,res) {

  var id = req.param('id');
  var fullname = req.param('fullname');
  var email = req.param('email');
  var password = req.param('password');
  var latitude = req.param('latitude');
  var longitude = req.param('longitude');
  var ip = req.param('ip');
  var city = req.param('city');
  var woeid = req.param('woeid');
  var min_temp = req.param('min_temp');
  var max_temp = req.param('max_temp');

  upd_user = new db.User({
    'fullname': fullname,
    'email': email,
    'password': password,
    'longitude': longitude,
    'latitude': latitude,
    'ip': ip,
    'city': city,
    'woeid': woeid,
    'min_temp': min_temp,
    'max_temp': max_temp,
    'created_at' : new Date()
  });

  userController.geolocalization(upd_user, function(ret_geol) {
    userController.cidade(ret_geol, function(ret_cidade) {
      userController.temperatura(ret_cidade, function(ret_temp) {
        userController.save(ret_temp,function(result) {
          res.json(result);
        });
      });
    });
  });
});

//http://127.0.0.1:5000/users/5bfed11cf1915c4da1ea97d1
app.delete('/users/:id', function(req,res) {

  var id = req.param('id');
  userController.delete(id,function(ret) {
    res.json(ret);
  });
});
