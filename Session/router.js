var session = require('express-session');
var mongoose = require('mongoose');
var Login = require('./Login.model');

// Authentication and Authorization Middleware
var auth = function(req, res, next) {

if (req.session && req.session.logged){
    return next();
  }else{
    return res.sendStatus(401);
}

};

module.exports = function(app){

var db = 'mongodb://localhost/example'

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// Login endpoint
app.get('/login', function (req, res) {
if (!req.query.username || !req.query.password) {
    res.send('login failed');
}else{

mongoose.connect(db);

Login.findOne({
    username: req.query.username
    })
    .exec(function(err, login) {
      if(err) {
        //res.send('error occured');
        res.render('login', {
								title: 'Login'
						 });
      } else {
      	if(login){	if(login.password===req.query.password)
      		{
      			req.session.username = login.username;
    				req.session.logged = true;
    				res.send("login success!");
      		}else{
      			//res.send('Invalid Password'); 
      			res.render('login', {
								title: 'Login'
							});
      		}
      		}else{
      				//res.send('Invalid Login');
      				res.render('login', {
									title: 'Login'
								});
      		}
      }
    });
}
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("wellcome "+req.session.username);
});
}