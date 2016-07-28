var auth = require('module/auth');
var signup = {};
var ctrl = {};

//CTRL
signup.controller = function() {

	// auth.isLoggedIn(function(isLoggedIn) {
	// 	console.log("connect1111",isLoggedIn)
	// 	ctrl.login=1
	// 	if (isLoggedIn) {
			
	// 		//m.route('/dashboard')
	// 	}
	// 		});
	


	
	ctrl.ErrorMsg = m.prop("");
	ctrl.firstname = m.prop("");
		ctrl.lastname = m.prop("");
		ctrl.password = m.prop("");
		ctrl.email_id = m.prop("");

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
		<div class="ui middle aligned center aligned grid login">
		  <div class="column">
		    <h2 class="ui teal image header">
		      <div class="content">
		      Create Your Account
		      </div>
		    </h2>

		    <form class="ui large form" config={ctrl.Validate} >

		      <div class="ui stacked segment">
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
		            <input type="text" name="firstname" placeholder="First Name" oninput={m.withAttr("value",ctrl.firstname)} value={ctrl.firstname()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
		            <input type="text" name="lastname" placeholder="Last Name" oninput={m.withAttr("value",ctrl.lastname)} value={ctrl.lastname()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="mail square icon"></i>
		            <input type="text" name="email" placeholder="Email id" oninput={m.withAttr("value",ctrl.email_id)} value={ctrl.email_id()}/>
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="lock icon"></i>
		            <input type="password" name="password" placeholder="Password" oninput={m.withAttr("value",ctrl.password)} value={ctrl.password()}/>
		          </div>
		        </div>
				<button type="submit" class="ui fluid large teal button" >Sign Up </button>



				
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
		    

		     Alraedy A Member? <a config={m.route} href="/login">Signin</a>

		    </div>
		  </div>
		</div>
	)
}

signup.view = function(ctrl) {

	return signup.form(ctrl) 
}



module.exports = signup;