'use strict';

var Users1 = function(id, first_name, last_name,  email, password, created){
    this.id = id;
    this.first_name = first_name;
    this.last_name= last_name;
    this.email= email;
    this.password = password;
    this.created = created;
};

Users1.prototype.isValidPassword = function(password){
    return this.password === password;
};

module.exports = Users1;
