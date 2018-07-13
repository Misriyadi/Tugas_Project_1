'use strict';

var Users1  = require('../table/user1_table');

var Users1Repository = function(db){
    this.db = db;
};

Users1Repository.prototype = {
    save: function(users1, cb, errCb){
        var db = this.db;
        var data = {id: users1.id, first_name : users1.first_name, last_name: users1.last_name, email : users1.email , password : users1.password, create : users1.create };
        var query = 'INSERT INTO users1 SET ?';
        db.query(query, data, (err, results) => {
            if(err){
                errCb(err);
            }
            cb(results);
    });
    },


    update: function(users1, cb, errCb){
        var db = this.db;
        var data = [users1.first_name, users1.last_name, users1.email ,users1.password, users1.created];
        var query = 'UPDATE users1 SET first_name = ?, last_name = ?, email= ?, password = ?, created = ? WHERE id = ?';
        db.query(query, data, (err, results) => {
            if(err){
                errCb(err);
            }
            cb(results);
    });
    },

    delete: function(id, cb, errCb){
        var db = this.db;
        var query = 'DELETE FROM users1 WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if(err){
                errCb(err);
            }
            cb(results);
    });
    },

    findOne: function(id, cb, errCb){
        var db = this.db;
        var query = 'SELECT * FROM users1 WHERE id = ?';
        db.query(query, [id], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            if(!results){
            cb(`Data dengan ID ${id}, tidak di temukan`);
        }else{
            var users1 = results[0];
            var users = new Users1 (users1.id,users1.first_name,users1.last_name,users1.email ,users1.password,  users1.create);
            cb(users);
        }
    });
    },

    findAll: function(cb, errCb){
        var db = this.db;
        var query = 'SELECT * FROM users1';
        db.query(query, (err, results, fields) => {
            if(err){
                errCb(err);
            }
            if(!results){
            cb('tabel user kosong');
        }else{
            var userArray = [];
            for(var i=0;i<results.length;i++){
                var users1 = results[i];
                var users = new Users1(users1.id,  users1.first_name, users1.last_name,users1.email ,users1.password,  users1.create);
                userArray.push(users);
            }
            cb(userArray);
        }
    });
    },
    findByFirstName: function(first_name, cb, errCb){
        var db = this.db;
        var query = 'SELECT * FROM users1 WHERE first_name = ?';
        db.query(query, [first_name], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            if(!results){
            cb(`data dengan email '${first_name}', tidak di temukan`);
        }else{
            var users1 = results[0];
            var users = new Users1(users1.id, users1.first_name, users1.last_name,users1.email , users1.password, users1.create);
            cb(users);
        }
    });
    }
};

module.exports = Users1Repository;
