var r = require('./reddit.js'),
	express = require('express')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');

var subreddits;

r.login(function(){
	r.getAllSubreddits(function(err, data){
		if(err) throw err
		else {
			subreddits = data
		}
	})
})

app.route('/').get(function(req, res){
	res.render('index.jade')
})


var port = 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
});