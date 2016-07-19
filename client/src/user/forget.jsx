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
		<div class="ui middle aligned center aligned grid login">
		  <div class="column">
		    <h2 class="ui teal image header">
		      <div class="content">
		     Reset Password
		      </div>
		    </h2>
		    <div>
		    
		    				<div>
		    				<form class="ui large form" config={ctrl.Validate} >

						      <div class="ui stacked segment">
						        <div class="field">
						          <div class="ui left icon input">
						            <i class="user icon"></i>
									            <input type="text" name="email_id" placeholder="Email Id" oninput={m.withAttr("value",ctrl.email_id)} value={ctrl.email_id()}/>
						          </div>
						        </div>
						       
								<button type="submit" class="ui fluid large teal button" onclick={m.startComputation()}>Submit </button>



								
						      </div>

						      
						      <div class="ui error message"></div>

						    </form>
						    </div>
		    			
		    	
		    {
		    	function(){
		    		if(ctrl.ErrorMsg())
		    		{
		    			return(
		    				  <div class="ui warning message">
							  <i class="close icon"></i>
							  <div class="header">
							  
							    {ctrl.ErrorMsg()}
							  </div>
							  
							</div>
		    				)
		    		}
		    	}()
		    }
		    
		    
		  

		    <div class="ui message">
		    

		     Not A Member? <a config={m.route} href="/conect">signup</a>

		    </div>
		    <div class="ui message">
		    

		    Already have Unique code? <a config={m.route} href="/forget" onclick={ctrl.send(true)}>reset</a>

		    </div>
		  </div>
		</div>
		</div>
	)


}
Forget.reload=function(){
	return (
		<div class="ui middle aligned center aligned grid login">
		  <div class="column">
		    <h2 class="ui teal image header">
		      <div class="content">
		     Reset Password
		      </div>
		    </h2>

		    <form class="ui large form" config={ctrl.Validate_reset} >

		      <div class="ui stacked segment">
		      <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
					     <input type="text" name="unique_code" placeholder="unique code" oninput={m.withAttr("value",ctrl.unique_code)} value={ctrl.unique_code()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
					     <input type="text" name="email_id" placeholder="Email Id" oninput={m.withAttr("value",ctrl.email_id)} value={ctrl.email_id()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
					     <input type="password" name="password" placeholder="Password" oninput={m.withAttr("value",ctrl.password)} value={ctrl.password()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
					     <input type="password" name="confirm_password" placeholder="confirm password" oninput={m.withAttr("value",ctrl.confirm_password)} value={ctrl.confirm_password()}/>
		          </div>
		        </div>

		       
				<button type="submit" class="ui fluid large teal button" onclick={m.startComputation()}>reset </button>



				
		      </div>

		      
		      <div class="ui error message"></div>

		    </form>
		    {
		    	function(){
		    		if(ctrl.ErrorMsg())
		    			return(
		    				  <div class="ui warning message">
							  <i class="close icon"></i>
							  <div class="header">
							  
							    {ctrl.ErrorMsg()}
							  </div>
							  
							</div>
		    				)
		    	}()
		    }
		  

		    <div class="ui message">
		    

		     Resend code? <a config={m.route} href="/forget" onclick={ctrl.send(false)}>resend </a>

		    </div>
		  </div>
		</div>
	)

}


Forget.view = function() {


	return (
	ctrl.send()? this.reload():	this.load()
	)


}

module.exports = Forget;