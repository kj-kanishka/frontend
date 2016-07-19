var auth = require('module/auth');
var verification = {}
var ctrl = {}
ctrl.verify = m.prop(false)
verification.controller = function() {
	//redirect if cookie doesnt exists.
	// if (!auth.isLoggedIn()) {
	// 	console.log("hi");
	// 	console.log("!loggedin", auth.isLoggedIn());
	// 	m.route('/connect');
	// 	return
	// }
	auth.isLoggedIn(function(isLoggedIn) {
		if (!isLoggedIn) {
			m.route('/connect')
		}
	});
	ctrl.ErrorMsg = m.prop("");
	ctrl.unique_code = m.prop("")
	auth.isverified(function(verify) {
		console.log("verify=", verify)
		ctrl.verify(verify)
	})
	ctrl.Validate = function(elem) {
		m.startComputation();
		console.log(jQuery(elem))
		element = jQuery(elem);
		element.form({
			fields: {
				unique_code: {
					identifier: 'unique_code',
					rules: [{
						type: 'empty',
						prompt: 'Please enter uniquecode'
					}]
				}
			},
      onSuccess: function(e) {
      	
      		console.log("onSuccess");
      		ctrl.submit();
      		e.preventDefault();
      		
      		return
            // todo
            
        }
		});
	}
	ctrl.submit = function() {
		ctrl.data = {
			unique_code: ctrl.unique_code
		}
		var transport = m.prop();
		m
			.request({
				method: "PUT",
				url: m.urls("user"),
				data: ctrl.data, 
				config: transport,
				background: true
			})
			.then(function(data) {
				auth.setSession(data.data.token);
				m.route("/company");
			});
			transport().onreadystatechange = function() {
			var res=JSON.parse(transport().responseText);
			if (transport().readyState == XMLHttpRequest.DONE) {
				//console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					
					auth.setSession(res.data.token);
				m.route("/company");
				m.endComputation();
					
				} else {
							ctrl.ErrorMsg=m.prop(res.userMessage)				
							m.redraw(true);
							m.endComputation();
							return 
				}
			}
		}
	}
	ctrl.resend = function() {
		var transport = m.prop();
		m
			.request({
				"method": "POST",
				url: m.urls("user", "resend"),
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
					console.log("data",res.data)
					ctrl.ErrorMsg=m.prop(res.userMessage)
					m.redraw(true);
					return 
					
				} else {
							ctrl.ErrorMsg=m.prop(res.userMessage)				
							m.redraw(true);
							return 
				}
			}
		}
	}
	return ctrl;
}
verification.load = function() {
	return (
		<div class="ui container" config={ctrl.viewConfig}>
			{require('module/partials/header')}
		  <div class="ui divider"></div>
		  <br/>
		  <div class="ui grid">
		    <div class="four wide column">
		    	{require('module/partials/menu')}
		    </div>
		    <div class="twelve wide column" >
		    	<div class="ui column grid">
			      <div class="column">
			        <div class="ui raised segment">
			          <h2>Verify Account</h2>
			          <div class="ui segment">
			          <div>
			          <div class="ui compact message">
					  <p>Check your Email for Validation code
					  </p>
					  </div>
					  </div>
					    <form class="ui large form" config={ctrl.Validate}>
					    					      <div class="ui stacked segment">
					        <div class="field">
					          <div class="ui left icon input">
					            <i class="privacy icon"></i>

					            <input type="text" name="unique_code" placeholder="Unique Code" oninput={m.withAttr("value",ctrl.unique_code)} value={ctrl.unique_code()}/>
					          </div>
					        </div>
					        
					       
					        <button type="submit" class="ui primary button" >
							  Submit
							</button>
							<div class="ui green button" onclick={ctrl.resend}>
							Resend Code
							</div>
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
			          </div>
			        </div>
			      </div>
			    </div>
		    </div>
		  </div>
		</div>
	)
}
verification.view = function() {
	return (
		ctrl.verify() ? m.route('/company') : this.load()
	)
}
module.exports = verification;