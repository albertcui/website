var r = require('./reddit.js'),
    path = require('path'),
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
            subreddits.sort(sorter)
		}
	})
})

function sorter(a, b) {
    a = a.toLowerCase()
    b = b.toLowerCase()
    if (a > b) return 1
    if (a < b) return -1
    return 0
}

app.route('/').get(function(req, res){
	res.render(
        'index.jade',
        {
            subs: subreddits
        }
    )
})


var port = 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
});