var auth = require('module/auth');
var HomePage = {};


//CTRL

HomePage.controller = function(){

	auth.isLoggedIn(function(isLoggedIn) {
		console.log("connect1111",isLoggedIn)
		if (isLoggedIn) {

			m.route('/dashboard')
		}
		else
			m.route("/signup");
	});

	return {
		onunload: function() {
			console.log("unloading home component");
		}
	}
}

HomePage.view = function(ctrl) {
	return require('module/loader')

}


module.exports = HomePage;