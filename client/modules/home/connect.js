var auth = require('module/auth');
var signup = {};
var ctrl = {};

//CTRL
signup.controller = function() {

	auth.isLoggedIn(function(isLoggedIn) {
		console.log("connect1111",isLoggedIn)
		ctrl.login=1
		if (isLoggedIn) {
			
			m.route('/dashboard')
		}
			});
	


	ctrl.googleTokens = m.prop(false);
	ctrl.GoogleClick = m.prop();
	ctrl.ErrorMsg = m.prop("");
	ctrl.firstname = m.prop("");
		ctrl.lastname = m.prop("");
		ctrl.password = m.prop("");
		ctrl.email_id = m.prop("");

/*

	ctrl.LoadGOne = function(element) {
		var elem = jQuery(element);
		var button = (elem.find("button.google.plus"));


		var script = document.createElement('script');
		script.src = "https://plus.google.com/js/client:plusone.js";
		script.onload = function() {

			gapi.load('auth2', function() {
				gapi.auth2.init({
					client_id: '905249695279-seq2aus8mnd40i3a9bo21truglfgktpk.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
					fetch_basic_profile: false,
					scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.signup'
				}).then(function() {

					console.log("Google + init")

					auth2 = gapi.auth2.getAuthInstance();

					ctrl.GoogleClick = function() {

						ctrl.ErrorMsg = m.prop();

						button.addClass('loading');

						auth2
							.signIn()
							.then(function(googleUser) {

								button.removeClass('loading');

								ctrl.googlesignup();

								ctrl.googleTokens = m.prop(googleUser);

								m.redraw(true);

							}, function(error) {
								elem.addClass('error');
								ctrl.ErrorMsg = m.prop("Something wrong happened! Try again, perhaps?");
								button.removeClass('loading');
								m.redraw(true);
								console.log(error);
							});

					};

					//right after auth initiated
					auth2.then(function() {
						//redraw for onclick
						m.redraw(true);

						button.removeClass('loading');

					});

				});
			});
		};

		document.head.appendChild(script);
	}*/
/*
	ctrl.googlesignup = function() {

		m
			.request({
				method: "POST",
				url: m.urls("user"),
				data: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
			})
			.then(function(data) {
				console.log("data", data);
				auth.setSession(data.token);
				m.route("/dashboard");
			});

	};*/
	ctrl.Validate = function(elem) {
		m.startComputation();
		console.log("jQuery(elem)",jQuery(elem))
		element = jQuery(elem);
		element.form({
			fields: {
				firstname: {
					identifier: 'firstname',
					rules: [{
						type: 'empty',
						prompt: 'Please enter First Name'
					}]
				},
				lastname: {
					identifier: 'lastname',
					rules: [{
						type: 'empty',
						prompt: 'Please enter Last Name'
					}]
				},
				email: {
					identifier: 'email',
					rules: [{
						type: 'email',
						prompt: 'Please enter valid email'
					}]
				},
				password: {
        identifier: 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'minLength[6]',
            prompt : 'Your password must be at least {ruleValue} characters'
          }
        ]
      }			
  },
      onSuccess: function(e) {
      	m.startComputation();
      		console.log("onSuccess");
      		ctrl.signup();
      		e.preventDefault();
      		return
            // todo
            
        }
      //onValid : ctrl.signup()
		});

	}

	ctrl.signup = function(e) {
		console.log("signup");
		ctrl.newUser = {
			firstname: ctrl.firstname(),
			lastname: ctrl.lastname(),
			email_id: ctrl.email_id(),
			password: ctrl.password()
		}
		var transport = m.prop();
			m
			.request({
				method: "POST",
				url: m.urls("user"),
				data: ctrl.newUser, //new Object({"test":"test"})
				config: transport,
				background: true
			})
			.then(function(data) {
				
			})
			transport().onreadystatechange = function() {
			var res=JSON.parse(transport().responseText);
			if (transport().readyState == XMLHttpRequest.DONE) {
				//console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					console.log("signup")
					auth.setSession(res.data.token);
					m.route("/verification");
					transport().abort();
					m.endComputation();

					return
					
				} else {
					console.log("signup else");
							ctrl.ErrorMsg=m.prop(res.userMessage)				
							m.redraw(true);
							transport().abort();
							m.endComputation();
							return 

				}


			}
		}

	}

	return ctrl;
}



signup.form = function(ctrl) {


	return (
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
		  {tag: "div", attrs: {class:"column"}, children: [
		    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
		      {tag: "div", attrs: {class:"content"}, children: [
		      "Create Your Account"
		      ]}
		    ]}, 

		    {tag: "form", attrs: {class:"ui large form", config:ctrl.Validate}, children: [

		      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
		            {tag: "input", attrs: {type:"text", name:"firstname", placeholder:"First Name", oninput:m.withAttr("value",ctrl.firstname), value:ctrl.firstname()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
		            {tag: "input", attrs: {type:"text", name:"lastname", placeholder:"Last Name", oninput:m.withAttr("value",ctrl.lastname), value:ctrl.lastname()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"mail square icon"}}, 
		            {tag: "input", attrs: {type:"text", name:"email", placeholder:"Email id", oninput:m.withAttr("value",ctrl.email_id), value:ctrl.email_id()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"lock icon"}}, 
		            {tag: "input", attrs: {type:"password", name:"password", placeholder:"Password", oninput:m.withAttr("value",ctrl.password), value:ctrl.password()}}
		          ]}
		        ]}, 
				{tag: "button", attrs: {type:"submit", class:"ui fluid large teal button"}, children: ["Sign Up "]}



				
		      ]}, 

		      
		      {tag: "div", attrs: {class:"ui error message"}}

		    ]}, 
		    
		    	function(){
		    		if(ctrl.ErrorMsg())
		    			return(
		    				  {tag: "div", attrs: {class:"ui warning message"}, children: [
							  {tag: "i", attrs: {class:"close icon"}}, 
							  {tag: "div", attrs: {class:"header"}, children: [
							  
							    ctrl.ErrorMsg()
							  ]}
							  
							]}
		    				)
		    	}(), 
		    
		  

		    {tag: "div", attrs: {class:"ui message"}, children: [
		    

		     "Alraedy A Member? ", {tag: "a", attrs: {config:m.route, href:"/login"}, children: ["Signin"]}

		    ]}
		  ]}
		]}
	)
}

signup.view = function(ctrl) {

	return((ctrl.login) ?  signup.form(ctrl) : require('module/loader'))
}



module.exports = signup;