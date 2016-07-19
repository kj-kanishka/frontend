//var m = require('mithril');
var auth = require('module/auth');

var Logout = {};
//CTRL
Logout.controller = function(){
	//logout code here


	auth.isLoggedIn(function(isLoggedIn) {

		if (!isLoggedIn) {
			m.route('/connect')
		}
		else
		{
			


			m
			.request({
				method: "DELETE",
				url: m.urls("user", "session"),
				 //new Object({"test":"test"})
			})
			.then(function(data) {
				console.log("data");
				auth.clearSession();
				m.route('/connect');
				
				
			});
			

		}
	});

}


Logout.view = function(){
	return require('module/loader')
}


module.exports = Logout;