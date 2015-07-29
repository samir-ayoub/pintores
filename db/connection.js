mysql = require('mysql');
connectionString = 'mysql://root:@localhost/pintores';

db = function(){}
db.cnn = function(){};
db.cnn.exec = function(query, callback) {
  var connection = mysql.createConnection(connectionString);
  connection.query(query, function(err, rows) {
    if(err) throw err;
    callback(rows, err);
    connection.end();
  });
};

module.exports = db.cnn;