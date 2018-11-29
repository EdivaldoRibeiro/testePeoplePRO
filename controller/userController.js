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

        } catch (e) {
          callback({
            'Error': 'Error parsing JSON!'
          })
        }
      } else {
        callback({ 'Error': 'Status: '+res.statusCode })
      }
    });
  }).on('error', function (err) {
    callback({ 'Error': err })
  });
}

exports.cidade = function(user, callback) {

  'use strict';

  var url = 'https://www.metaweather.com/api/location/search/?lattlong=' +user.latitude.trim()+','+user.longitude.trim();
  console.log("url="+url);

  const https = require('https');
    https.get(url, function (res) {
      var json = '';
      res.on('data', function (chunk) {
          json += chunk;
      });

      res.on('end', function () {

          if (res.statusCode === 200) {
              try {

                var arr = JSON.parse(json);
                for(var i = 0; i < arr.length; i++)
                {
                  var title = arr[i].title;
                  var woeid = arr[i].woeid;
                  var latt_long = arr[i].latt_long;

                  user.city=title;
                  user.woeid=woeid;
                  break;
                }

                callback(user);

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

exports.temperatura = function(user, callback) {

  'use strict';

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth()+1;
  var day = d.getDate();
  if (day < 10) {
      day = "0" + day;
  }

  var url = 'https://www.metaweather.com/api/location/' +user.woeid.trim()+'/'+year+'/'+month+'/'+day+'/';
  console.log("url="+url);

  const https = require('https');
  https.get(url, function (res) {
    var json = '';
    res.on('data', function (chunk) {
      json += chunk;
    });

    res.on('end', function () {

      if (res.statusCode === 200) {
        try {

          var arr = JSON.parse(json);
          for(var i = 0; i < arr.length; i++)
          {
            var min_temp = arr[i].min_temp;
            var max_temp = arr[i].max_temp;

            user.min_temp=min_temp;
            user.max_temp=max_temp;
            break;
          }

          callback(user);

        } catch (e) {
          callback({ 'Error': 'Error parsing JSON!' })
        }
      } else {
        callback({ 'Error': 'Status: '+res.statusCode })
      }
    });
  }).on('error', function (err) {
    callback({ 'Error': err })
  });
}
