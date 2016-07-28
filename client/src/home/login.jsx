var auth = require('module/auth');

var login = {};


login.loaded = m.prop(false);
var ctrl = {};
//CTRL
login.controller = function() {

	// auth.isLoggedIn(function(isLoggedIn) {
	// 	ctrl.login=1;
	// 	if (isLoggedIn) {
			
	// 		m.route('/dashboard')
	// 	}
	// });
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
		<div class="ui middle aligned center aligned grid login">
		  <div class="column">
		    <h2 class="ui teal image header">
		      <div class="content">
		      Sign In To Your Account
		      </div>
		    </h2>
		    <form class="ui large form" config={ctrl.Validate}>
		      <div class="ui stacked segment">
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
		            <input type="text" name="email" placeholder="E-mail address" oninput={m.withAttr("value",ctrl.email_id)} value={ctrl.email_id()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="lock icon"></i>
		            <input type="password" name="password" placeholder="Password" oninput={m.withAttr("value",ctrl.password)} value={ctrl.password()}/>
		          </div>
		        </div>
		       <button type="submit" class="ui fluid large teal button" >Sign in </button>
		      </div>

		      <div class="ui error message"></div>


		    </form>
		    {
		    	function(){
		    		console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
		    		if(ctrl.ErrorMsg())
		    			return(
		    				  <div class="ui warning message">
							  <div class="header">
							  
							    {ctrl.ErrorMsg()}
							  </div>
							  
							</div>
		    				)
		    	}()
		    }
		    <div class="ui message">
		     Forget Password? <a config={m.route} href="/forget">reset password</a>
		    </div>
		    <div class="ui message">
		      New to us? <a config={m.route} href="/signup">signup</a>
		    </div>
		  </div>
		</div>
	)
}

login.view = function(ctrl) {
	return login.form(ctrl) 
}


module.exports = login;