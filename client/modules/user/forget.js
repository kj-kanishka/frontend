var auth = require('module/auth');

var Forget = {}


var ctrl = {};
ctrl.send = m.prop(false)
Forget.controller = function() {
	//redirect if cookie doesnt exists.
auth.isLoggedIn(function(isLoggedIn) {
		console.log("connect1111",isLoggedIn)
		if (isLoggedIn) {

			m.route('/dashboard')
		}
	});

	ctrl.ErrorMsg=m.prop("");
	ctrl.email_id = m.prop("");
	ctrl.unique_code=m.prop("");
	ctrl.password=m.prop("");
	ctrl.confirm_password=m.prop("");
	ctrl.Validate_reset = function(elem) {
		
		console.log(jQuery(elem))
		element = jQuery(elem);
		element.form({
			fields:{
				email: {
					identifier: 'email_id',
					rules: [{
						type: 'email',
						prompt: 'Please enter valid email'
					}]
				},
				unique_code: {
					identifier: 'unique_code',
					rules: [{
						type: 'empty',
						prompt: 'Please enter unique_code'
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
      },
      confirm_password: {
        identifier: 'confirm_password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'match[password]',
            prompt : 'confirm Password must match with {ruleValue} '
          }
        ]
      }
			},
      onSuccess: function(e) {
      		console.log("onSuccess");
      		console.log("onSuccess1");
      		ctrl.reset();
      		e.preventDefault();
      		return
            // todo
            
        }
		});
	}
	ctrl.Validate = function(elem) {
		
		console.log(jQuery(elem))
		element = jQuery(elem);
		element.form({
			fields:{
				email: {
					identifier: 'email_id',
					rules: [{
						type: 'email',
						prompt: 'Please enter valid email'
					}]
				}		},
      onSuccess: function(e) {
      		console.log("onSuccess");
      		console.log("onSuccess1");
      		ctrl.forget();
      		e.preventDefault();
      		return
            // todo
            
        }
		});
	}
	ctrl.forget = function() {
		ctrl.oldUser = {
			email_id: ctrl.email_id()
		}
		var transport = m.prop();
		m
			.request({
				method: "POST",
				url: m.urls("user", "resetpassword"),
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
					ctrl.send(true);
					ctrl.ErrorMsg=m.prop(res.userMessage)
					m.redraw(true);
					transport().abort();
					m.endComputation();
					return

					
				} else {
					console.log("sign_in else");
							ctrl.ErrorMsg=m.prop(res.userMessage)				
							console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg());
							ctrl.send(false)
							m.redraw(true);
							transport().abort();
							m.endComputation();
							return 

				}


			}
		}

	}
	ctrl.reset = function() {
		ctrl.oldUser = {
			email_id: ctrl.email_id(),
			unique_code:ctrl.unique_code(),
			password:ctrl.password(),
			confirm_password:ctrl.confirm_password()
		}
		var transport = m.prop();
		m
			.request({
				method: "PUT",
				url: m.urls("user", "resetpassword"),
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
					m.route("/login");
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

Forget.load = function() {


return (
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
		  {tag: "div", attrs: {class:"column"}, children: [
		    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
		      {tag: "div", attrs: {class:"content"}, children: [
		     "Reset Password"
		      ]}
		    ]}, 
		    {tag: "div", attrs: {}, children: [
		    
		    				{tag: "div", attrs: {}, children: [
		    				{tag: "form", attrs: {class:"ui large form", config:ctrl.Validate}, children: [

						      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
						        {tag: "div", attrs: {class:"field"}, children: [
						          {tag: "div", attrs: {class:"ui left icon input"}, children: [
						            {tag: "i", attrs: {class:"user icon"}}, 
									            {tag: "input", attrs: {type:"text", name:"email_id", placeholder:"Email Id", oninput:m.withAttr("value",ctrl.email_id), value:ctrl.email_id()}}
						          ]}
						        ]}, 
						       
								{tag: "button", attrs: {type:"submit", class:"ui fluid large teal button", onclick:m.startComputation()}, children: ["Submit "]}



								
						      ]}, 

						      
						      {tag: "div", attrs: {class:"ui error message"}}

						    ]}
						    ]}, 
		    			
		    	
		    
		    	function(){
		    		if(ctrl.ErrorMsg())
		    		{
		    			return(
		    				  {tag: "div", attrs: {class:"ui warning message"}, children: [
							  {tag: "i", attrs: {class:"close icon"}}, 
							  {tag: "div", attrs: {class:"header"}, children: [
							  
							    ctrl.ErrorMsg()
							  ]}
							  
							]}
		    				)
		    		}
		    	}(), 
		    
		    
		    
		  

		    {tag: "div", attrs: {class:"ui message"}, children: [
		    

		     "Not A Member? ", {tag: "a", attrs: {config:m.route, href:"/conect"}, children: ["signup"]}

		    ]}, 
		    {tag: "div", attrs: {class:"ui message"}, children: [
		    

		    "Already have Unique code? ", {tag: "a", attrs: {config:m.route, href:"/forget", onclick:ctrl.send(true)}, children: ["reset"]}

		    ]}
		  ]}
		]}
		]}
	)


}
Forget.reload=function(){
	return (
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
		  {tag: "div", attrs: {class:"column"}, children: [
		    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
		      {tag: "div", attrs: {class:"content"}, children: [
		     "Reset Password"
		      ]}
		    ]}, 

		    {tag: "form", attrs: {class:"ui large form", config:ctrl.Validate_reset}, children: [

		      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
		      {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
					     {tag: "input", attrs: {type:"text", name:"unique_code", placeholder:"unique code", oninput:m.withAttr("value",ctrl.unique_code), value:ctrl.unique_code()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
					     {tag: "input", attrs: {type:"text", name:"email_id", placeholder:"Email Id", oninput:m.withAttr("value",ctrl.email_id), value:ctrl.email_id()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
					     {tag: "input", attrs: {type:"password", name:"password", placeholder:"Password", oninput:m.withAttr("value",ctrl.password), value:ctrl.password()}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
					     {tag: "input", attrs: {type:"password", name:"confirm_password", placeholder:"confirm password", oninput:m.withAttr("value",ctrl.confirm_password), value:ctrl.confirm_password()}}
		          ]}
		        ]}, 

		       
				{tag: "button", attrs: {type:"submit", class:"ui fluid large teal button", onclick:m.startComputation()}, children: ["reset "]}



				
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
		    

		     "Resend code? ", {tag: "a", attrs: {config:m.route, href:"/forget", onclick:ctrl.send(false)}, children: ["resend "]}

		    ]}
		  ]}
		]}
	)

}


Forget.view = function() {


	return (
	ctrl.send()? this.reload():	this.load()
	)


}

module.exports = Forget;