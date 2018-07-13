'use strict';

var db = require('../config/mysql_koneksi');
var UserRepo = require('../report/user1_report');
var User = require('../table/user1_table');

var saveUserShowForm = (req, res, next) => {
    res.render('new_user', {'title': 'Add New User'});
};

var saveUser = (req, res, next) => {
    if(!req.body){
        next('semua field harus diisi.. tanpa kecuali');
    }
    var data = req.body;
    var user = new User(data.id, data.first_name, data.last_name, data.email, data.password, parseInt(data.id));
    var userRepo = new UserRepo(db);
    userRepo.save(user, result => {
        res.redirect('index');
}, err => {
        if(err){
            next(err);
        }
    });
};

var updateUserShowForm = (req, res, next) => {
    if(!req.params){
        next('parameter code tidak ada');
    }
    var code = req.params.code;
    var userRepo = new UserRepo(db);
    userRepo.findOne(code, result => {
        res.render('update_user', {'user': result, 'title': 'Update User'});
}, err => {
        if(err){
            next(err);
        }
    });
};

var updateUser = (req, res, next) => {
    if(!req.body){
        next('semua field harus diisi .. Tanpa Kecuali');
    }
    var data = req.body;
    var user = new User(data.id, data.first_name, data.last_name, data.email, data.password, parseInt(data.id));
    var userRepo = new UserRepo(db);
    userRepo.update(user, result => {
        res.redirect('/index');
}, err => {
        if(err){
            next(err);
        }
    });
};

var deleteUser = (req, res, next) => {
    if(!req.params){
        next('parameter code tidak ada');
    }
    var code = req.params.code;
    var userRepo = new UserRepo(db);
    userRepo.delete(code, result => {
        res.redirect('/index');
}, err => {
        if(err){
            next(err);
        }
    });
};

var getUser = (req, res, next) => {
    if(!req.params){
        next('parameter code tidak ada');
    }
    var code = req.params.code;
    var userRepo = new UserRepo(db);
    userRepo.findOne(code, result => {
        res.render('user_detail', {'user': result, 'title': 'User Detail'});
}, err => {
        if(err){
            next(err);
        }
    });
};

var getAllUser = (req, res, next) => {
    var userRepo = new UserRepo(db);
   userRepo.findAll(results => {
        res.render('./user/users1', {'users': results, 'title': 'User List'});
}, err => {
        if(err){
            next(err);
        }
    });
};


module.exports = {
    saveUserShowForm: saveUserShowForm,
    saveUser: saveUser,
    updateUserShowForm: updateUserShowForm,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getAllUser: getAllUser
};
