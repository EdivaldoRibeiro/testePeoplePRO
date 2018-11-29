var mongoose = require('mongoose');
var mongoURI = "mongodb://127.0.0.1/peoplePRO2";

mongoose.connect(mongoURI, { useNewUrlParser: true }, function(err) {
    if (err) {
      console.log("db connect falhou!");
    } else {
      console.log("db connect ok!");
    }
});

var db = mongoose.connection;

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function () {
  console.log('db connection open to ' + mongoURI);
});

// If the connection throws an error
db.on('error',function (err) {
  console.log('db connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
  console.log('db connection disconnected');
});

db.once('open', function() {

  var userShema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    created_at: Date,
    ip: String,
    latitude: String,
    longitude: String,
    woeid: String,
    city: String,
    min_temp: String,
    max_temp: String
  });

  exports.User = mongoose.model('User', userShema);
});
