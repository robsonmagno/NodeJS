module.exports = function(app){

app.get('/login', function(req, res){
	/*res.render('login', {
		title: 'Login'
	});*/
	var user = require('./user')(res);
	//res.send(a);
});

app.get('/', function(req, res){
	res.render('index', {
		title: 'Home'
	});
});
//other routes.. 
}