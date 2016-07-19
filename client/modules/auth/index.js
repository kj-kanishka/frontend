var Auth = {};

Auth.UserData = m.prop(false);

//CTRL
Auth.controller = function() {

}

Auth.setSession = function(token) {
	console.log("setSession", token)
	m.cookie.set("session", token);
}

Auth.clearSession = function() {
	m.cookie.remove("session");
}

Auth.PingServer = function(cookie, cb) {
	//console.log("11111122222");
	if (!this.UserData() && cookie) {

		var transport = m.prop();
		m
			.request({
				method: "GET",
				url: m.urls('ping'),
				config: transport,
				background: true
			})
			.then(Auth.UserData);

		transport().onreadystatechange = function() {
			////console.log("111111");
			if (transport().readyState == XMLHttpRequest.DONE) {
				//console.log(" transport().status", transport().status)
				if (transport().status == 401 || transport().status == 403) {
					//console.log("forbidden222222");
					Auth.clearSession();
					m.route('/connect')
					console.log("ping", false)
					transport().abort();
					cb(false)
				} else {
					Auth.UserData = m.prop(JSON.parse(transport().responseText));

					if (Auth.UserData().logged_in) {
						this.session_exists = m.prop(true);
					}
					//console.log("return true")

					m.redraw(true);
					console.log("ping", true);
					transport().abort();
					cb(true)

				}


			}
		}


	} else {
		console.log("ping else", false)
		cb(false);
	}
}

Auth.session_exists = m.prop(false);

//just check cookie and set authorization
Auth.gotSession = function() {
	var cookie = m.cookie.get("session");

	if (cookie) {

		if (!this.session_exists()) {
			m.removeGlobalHeader('Authorization')
			m.addGlobalHeader('Authorization', 'Bearer ' + cookie);
		}
		return m.cookie.get("session");
	}

	return false;
}

//PING server and get user data.
Auth.isLoggedIn = m.prop();

Auth.isLoggedIn = function(cb) {
	//console.log("isLoggedIn111");
	//console.log(Auth.gotSession() ? true : false);

	var cookie = Auth.gotSession();

	if (!cookie) {
		console.log("isLoggedIn", false);
		cb(false)
	}
	else
	{
	Auth.PingServer(cookie, function(loggedIn) {
		console.log('isLoggedIn', Auth.UserData() ? Auth.UserData() : loggedIn);
		cb(Auth.UserData() ? Auth.UserData() : loggedIn)
	});
}
}


Auth.isverified = m.prop()

Auth.isverified = function(cb) {
	var cookie = Auth.gotSession();
	m
		.request({
			method: "GET",
			url: m.urls('ping'),

		}).then(function(data) {
			cb(data.data.user.email_verified)
		})


}

Auth.iscompany = m.prop()

Auth.iscompany = function(cb) {
	var cookie = Auth.gotSession();
	//console.log("iscompany");
	//var transport = m.prop();
	m
		.request({
			method: "GET",
			url: m.urls('company'),
			//config: transport,
			//background: true

		}).then(function(data) {
			//console.log("then", data);
			cb(true)
		})



}






module.exports = Auth;