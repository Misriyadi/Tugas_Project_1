//koneksi database
var mysql = require('mysql');
var koneksi = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "testnodejs_1"
});

koneksi.connect();
module.exports = koneksi;