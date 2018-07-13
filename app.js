var express = require('express');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// manggil table/control user
var userControl = require('./app/control/user1_control');
app.get('/users1', userControl.getAllUser);
app.get('/new_user', userControl.saveUserShowForm);
app.post('/save_user', userControl.saveUser);
// manggil koneksi
var koneksi = require ('./app/config/mysql_koneksi');
passport.use(new LocalStrategy(
    function (username, password, done) {
        koneksi.query(" select * from users1 where first_name = ? and password = ?",
                   [username, password], function (err, rows, fields) {
                    if (err) {
                    app.get ('/utama', function (reg, res) {
                        res.render('utama');
                    });

                }
                  else  if (rows.length <=0   ) {
                        //return done('Incorrect username or password.');
                        app.get ('/salah', function (reg, res) {
                            res.render('./awal/salah');
                        });


                    } return done(null, rows[0]);
            });

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    koneksi.query(" select * from users1 where id =?", [id], function (err, user) {
    if(err) return done(err);
    done(null, user);
    });
});

app.use( require('body-parser').urlencoded({extended: true}));
app.use( require ('express-session')(
    { secret: 'keyboard cat', resave: false, saveUninitialized: false }
));

app.use(passport.initialize());
app.use(passport.session());

function  isAuthenticated(reg, res, next) {
  if (reg.isAuthenticated())
    return next();
  res.redirect('/login');

}

app.get ('/',  isAuthenticated, function (reg, res) {
    res.render('utama', {title: 'Express JS'});
});

app.get ('/logout', function (reg, res) {
    reg.logOut();
    res.redirect('/');
});

app.get ('/login', function (reg, res) {
    res.render('index');
});


app.get ('/salah', function (reg, res) {
    res.render('./awal/salah');
});


app.get ('/signin', function (reg, res) {
    res.render('./awal/signin');
});


app.post('/utama', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/salah'}),
  function (reg, res) {
  res.redirect('/');
  } );
// catch 404 and forward to error handler


module.exports = app;
app.listen(3088, () => console.log('berjalan'));