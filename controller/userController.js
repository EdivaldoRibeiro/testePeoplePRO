var db = require('../db_config.js');

exports.list = function(callback) {
  console.log('exports.list');
  db.User.find({}, function(error,users) {
    if(error) {
      console.log('error='+error);
      callback({error: 'Não foi possível retornar os usuários'});
    } else {
      callback(users);
    }
  });
};

exports.user = function(id, callback) {
  console.log('exports.user===>'+id);
  db.User.findById(id, function(error, user) {
    if(error) {
      console.log('error='+error);
      callback({error: 'Não foi possível retornar o usuário'});
    } else {
      callback(user);
    }
  });
};

//exports.save = function(fullname, email, password, latitude,longitude,callback) {
exports.save = function(new_user,callback) {
  console.log('exports.save');
//  new db.User({
//    'fullname': fullname,
//    'email': email,
//    'password': password,
//    'latitude': latitude,
//    'longitude': longitude,
//    'created_at' : new Date()
//  }).save(function(error,user) {
    new_user.save(function(error,user) {
    if(error) {
      console.log('error='+error);
      callback({error:'Não foi possível salvar o usuário'});
    } else {
      console.log('gravou usuario sem erros');
      callback(user);
    }
  });
};

//exports.update = function(id,fullname,email,password,latitude,longitude,callback) {
exports.update = function(id,upd_user,callback) {
  db.User.findById(id, function(error,user) {
    if(upd_user.fullname) {
      user.fullname = upd_user.fullname;
    }
    if(upd_user.email) {
      user.email = upd_user.email;
    }
    if(upd_user.password) {
      user.password = upd_user.password;
    }
    if(upd_user.ip) {
      user.ip = upd_user.ip;
    }
    if(upd_user.latitude) {
      user.latitude = upd_user.latitude;
    }
    if(upd_user.longitude) {
      user.longitude = upd_user.longitude;
    }
    if(upd_user.city) {
      user.city = upd_user.city;
    }
    if(upd_user.woeid) {
      user.woeid = upd_user.woeid;
    }
    if(upd_user.min_temp) {
      user.min_temp = upd_user.min_temp;
    }
    if(upd_user.max_temp) {
      user.max_temp = upd_user.max_temp;
    }
    user.save(function(error,user) {
      if(error) {
        callback({error: 'Não foi possível salvar o usuário'});
      } else {
        callback(user);
      }
    });
  });
};

exports.delete = function(id, callback) {
  console.log('exports.delete');
  db.User.findById(id,function(error,user) {
    if (error) {
      callback({error:'Não foi possível encontrar o usuário'});
    } else {
      user.remove(function(error) {
        if(!error) {
          callback({resposta:' Usuário excluído com sucesso'});
        }
      });
    }
  });
};

exports.geolocalization = function(user, callback) {

  'use strict';
  var https = require('https');

  var options = {
      host: 'ipvigilante.com',
      path: user.ip,      //'/8.8.8.8/full',
      port : 443,
      method : 'GET',
      headers: {'User-Agent': 'request'}
  };

  https.get(options, function (res) {
      var json = '';
      res.on('data', function (chunk) {
          json += chunk;
      });
      res.on('end', function () {
          if (res.statusCode === 200) {
              try {
                  var result = JSON.parse(json);

                  user.latitude = result.data.latitude;
                  user.longitude = result.data.longitude;

                  callback(user);

//                  console.log('-----------');
//                  console.log('Status: ', result.status);
//                  console.log('-----------');
//                  console.log('IPv4: ', result.data.ipv4);
//                  console.log('Hostname: ', result.data.hostname);
//                  console.log('Continent code: ', result.data.continent_code);
//                  console.log('Continent name: ', result.data.continent_name);
//                  console.log('Country ISO code: ', result.data.country_iso_code);
//                  console.log('Country name: ', result.data.country_name);
//                  console.log('Subdivision 1 ISO code: ', result.data.subdivision_1_iso_code);
//                  console.log('Subdivision 1 name: ', result.data.subdivision_1_name);
//                  console.log('Subdivision 2 ISO code: ', result.data.subdivision_2_iso_code);
//                  console.log('Subdivision 2 name: ', result.data.subdivision_2_name);
//                  console.log('City name: ', result.data.city_name);
//                  console.log('Metro code: ', result.data.metro_code);
//                  console.log('Time zone: ', result.data.time_zone);
//                  console.log('Postal code: ', result.data.postal_code);
//                  console.log('Latitude: ', result.data.latitude);
//                  console.log('Longitude: ', result.data.longitude);
//                  console.log('Accuracy radius: ', result.data.accuracy_radius);
              } catch (e) {
                callback({
                  'Error': 'Error parsing JSON!'
                })
              }
          } else {
            callback({
              'Error': 'Status: '+res.statusCode
            })
          }
      });
  }).on('error', function (err) {
    callback({
      'Error': err
    })
  });
}







exports.cidade = function(callback) {

  'use strict';

  const https = require('https');
  https.get('https://www.metaweather.com/api/location/search/?lattlong=37.386,-122.08380', function (res) {
      var json = '';
      res.on('data', function (chunk) {
          json += chunk;
      });

      res.on('end', function () {

          if (res.statusCode === 200) {
              try {

                  var result = JSON.parse(json);

                  var title = [0].title;
                  var woeid = [0].woeid;

                  console.log(json);
                  console.log("title="+title);
                  console.log("woeid="+woeid);

                  callback({
                    'Sucesso': 'Error parsing JSON!'
                  })

              } catch (e) {
                callback({
                  'Error': 'Error parsing JSON!'
                })
              }
          } else {
            callback({
              'Error': 'Status: '+res.statusCode
            })
          }
      });
  }).on('error', function (err) {
    callback({
      'Error': err
    })
  });


}
