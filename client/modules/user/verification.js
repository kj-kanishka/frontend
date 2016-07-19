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
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column"}, children: [
		    	{tag: "div", attrs: {class:"ui column grid"}, children: [
			      {tag: "div", attrs: {class:"column"}, children: [
			        {tag: "div", attrs: {class:"ui raised segment"}, children: [
			          {tag: "h2", attrs: {}, children: ["Verify Account"]}, 
			          {tag: "div", attrs: {class:"ui segment"}, children: [
			          {tag: "div", attrs: {}, children: [
			          {tag: "div", attrs: {class:"ui compact message"}, children: [
					  {tag: "p", attrs: {}, children: ["Check your Email for Validation code"
					  ]}
					  ]}
					  ]}, 
					    {tag: "form", attrs: {class:"ui large form", config:ctrl.Validate}, children: [
					    					      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
					        {tag: "div", attrs: {class:"field"}, children: [
					          {tag: "div", attrs: {class:"ui left icon input"}, children: [
					            {tag: "i", attrs: {class:"privacy icon"}}, 

					            {tag: "input", attrs: {type:"text", name:"unique_code", placeholder:"Unique Code", oninput:m.withAttr("value",ctrl.unique_code), value:ctrl.unique_code()}}
					          ]}
					        ]}, 
					        
					       
					        {tag: "button", attrs: {type:"submit", class:"ui primary button"}, children: [
							  "Submit"
							]}, 
							{tag: "div", attrs: {class:"ui green button", onclick:ctrl.resend}, children: [
							"Resend Code"
							]}
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
					    	}()
					    
			          ]}
			        ]}
			      ]}
			    ]}
		    ]}
		  ]}
		]}
	)
}
verification.view = function() {
	return (
		ctrl.verify() ? m.route('/company') : this.load()
	)
}
module.exports = verification;