var auth = require('module/auth');

var login = {};


login.loaded = m.prop(false);
var ctrl = {};
//CTRL
login.controller = function() {
	$('').modal('hide');

	auth.isLoggedIn(function(isLoggedIn) {
		ctrl.login=1;
		if (isLoggedIn) {
			
			m.route('/dashboard')
		}
	});
	ctrl.ErrorMsg=m.prop("");
	ctrl.email_id = m.prop("");
		ctrl.password = m.prop("");
		ctrl.Validate = function(elem) {
		m.startComputation();
		console.log(jQuery(elem))
		element = jQuery(elem);
		element.form({
			fields:{
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
      }			},
      onSuccess: function(e) {
      		console.log("onSuccess");
      		console.log("onSuccess1");
      		ctrl.sign_in();
      		e.preventDefault();
      		return
            // todo
            
        }
		});
	}

	ctrl.sign_in = function() {
		ctrl.oldUser = {
			email_id: ctrl.email_id(),
			password: ctrl.password()
		}
		var transport = m.prop();
		m
			.request({
				method: "POST",
				url: m.urls("user", "session"),
				data: ctrl.oldUser, //new Object({"test":"test"})
				config: transport,
				background: true
			})
			.then(function(data) {
				

			});
			transport().onreadystatechange = function() {
			console.log("111111");
			var res=JSON.parse(transport().responseText);
			console.log(res);
			if (transport().readyState == XMLHttpRequest.DONE) {
				//console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					console.log("login");
					auth.setSession(res.data.token);
					m.route("/company");
					transport().abort();
					m.endComputation();
					return

					
				} else {
					console.log("sign_in else");
							ctrl.ErrorMsg=m.prop(res.userMessage)				
							console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg());
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



login.form = function(ctrl) {



	return (
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
		  {tag: "div", attrs: {class:"column"}, children: [
		    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
		      {tag: "div", attrs: {class:"content"}, children: [
		      "Sign In To Your Account"
		      ]}
		    ]}, 
		    {tag: "form", attrs: {class:"ui large form", config:ctrl.Validate}, children: [
		      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
		            {tag: "input", attrs: {type:"text", name:"email", placeholder:"E-mail address", oninput:m.withAttr("value",ctrl.email_id), value:ctrl.email_id()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"lock icon"}}, 
		            {tag: "input", attrs: {type:"password", name:"password", placeholder:"Password", oninput:m.withAttr("value",ctrl.password), value:ctrl.password()}}
		          ]}
		        ]}, 
		       {tag: "button", attrs: {type:"submit", class:"ui fluid large teal button"}, children: ["Sign in "]}
		      ]}, 

		      {tag: "div", attrs: {class:"ui error message"}}


		    ]}, 
		    
		    	function(){
		    		console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
		    		if(ctrl.ErrorMsg())
		    			return(
		    				  {tag: "div", attrs: {class:"ui warning message"}, children: [
							  {tag: "div", attrs: {class:"header"}, children: [
							  
							    ctrl.ErrorMsg()
							  ]}
							  
							]}
		    				)
		    	}(), 
		    
		    {tag: "div", attrs: {class:"ui message"}, children: [
		     "Forget Password? ", {tag: "a", attrs: {config:m.route, href:"/forget"}, children: ["reset password"]}
		    ]}, 
		    {tag: "div", attrs: {class:"ui message"}, children: [
		      "New to us? ", {tag: "a", attrs: {config:m.route, href:"/connect"}, children: ["signup"]}
		    ]}
		  ]}
		]}
	)
}

login.view = function(ctrl) {
	return((ctrl.login) ?  login.form(ctrl) : require('module/loader'))
}


module.exports = login;