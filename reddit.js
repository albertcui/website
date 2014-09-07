var request = require('request'),
	config = require('./config')

var reddit = exports

request = request.defaults({
	headers: {
		'User-Agent': 'YARN/1.0 by Triple_A'
	},
	jar: true
})


reddit.login = function(cb) {
	request.post(
	{
		url: 'http://api.reddit.com/api/login',
		form: {api_type: 'json', user: config.user, passwd: config.pass}
	},
	function(err, res, body) {
		if (err || res.statusCode !== 200) throw err
		cb()
	})
}

function getSubReddits(after, allSubs, cb) {
	var url = 'http://api.reddit.com/subreddits/mine/subscriber?limit=100' + (after ? '&after=' + after : '')
	request.get(url, function(err, res, body) {
			if (!err && res.statusCode === 200) {
				
				body = JSON.parse(body)
				
				var subs = []		
				
				body.data.children.forEach(function(sub){
					subs.push(sub.data.url)
				})
				
				allSubs = allSubs.concat(subs)
				
				if (body.data.after) {
					getSubReddits(body.data.after, allSubs, cb)
				} else {
					cb(null, allSubs)	
				}
			} else {
				cb(err)
			}
		})
}

reddit.getAllSubreddits = function(cb) {
	getSubReddits(null, [], function(err, data) {
		if (err) cb(err)
		cb(null, data)		
	})
}