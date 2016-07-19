var auth = require('module/auth');

var website = {}

var ctrl = {}

ctrl.company = m.prop(false);
website.controller = function() {
	console.log("website");
	
	auth.isLoggedIn(function(isLoggedIn) {
		if (!isLoggedIn) {
			m.route('/connect')
		}
	});


	auth.iscompany(function(comp) {
			console.log("company=", comp)
			ctrl.company(comp)
		})
		//redirect if cookie doesnt exists.

	ctrl.ErrorMsg=m.prop("");
	ctrl.website = m.prop("");


	ctrl.Validate = function(elem) {
	      	 m.startComputation();
		console.log(jQuery(elem))
		element = jQuery(elem);
		element.form({
			fields: {
				
				website: {
					identifier: 'website',
					rules: [{
						type: 'empty',
						prompt: 'Please enter a website'
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
		console.log("submit");
		ctrl.newwebsite = {
			website: ctrl.website()
		}
		var transport = m.prop();
		m
			.request({
				method: "POST",
				url: m.urls("company", "website"),
				data: ctrl.newwebsite, //new Object({"test":"test"})
				background: true,
				config: transport
			})
			.then(function(data) {
				console.log("then1", data);
				m.route("/dashboard");
			});
			transport().onreadystatechange = function() {
            console.log("111111");
            var res=JSON.parse(transport().responseText);
            console.log(res);
            if (transport().readyState == XMLHttpRequest.DONE) {
                //console.log(" transport().status", transport().status)
                if (transport().status == 200) {

                    console.log("website if");
                    m.route("/dashboard");
                    transport().abort();
					m.endComputation();
                    return
                    
                } else {
                	console.log("website else");
                            ctrl.ErrorMsg=m.prop(res.userMessage)               
                            console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
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


website.load = function() {
	/*auth.user(function(data){
		
			console.log("data",data);
		
	});*/



	return (



		{tag: "div", attrs: {class:"ui container"}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column"}, children: [
			      {tag: "div", attrs: {class:"column"}, children: [
			      

			          {tag: "h2", attrs: {}, children: ["Add website"]}, 
			          
			          	function(){
			          		if(ctrl.company())
			          		{
			          			return(

			          				{tag: "form", attrs: {class:"ui large form", config:ctrl.Validate}, children: [
								      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
								        {tag: "div", attrs: {class:"field"}, children: [
								          {tag: "div", attrs: {class:"ui left icon input"}, children: [
								            {tag: "i", attrs: {class:"browser icon"}}, 
								            {tag: "input", attrs: {type:"text", name:"website", placeholder:"Website Address", oninput:m.withAttr("value",ctrl.website), value:ctrl.website()}}
								          ]}
								        ]}, 
								        
								       
										{tag: "button", attrs: {type:"submit", class:"ui primary button"}, children: [
										  "Submit"
										]}
										
								      ]}, 


								      {tag: "div", attrs: {class:"ui error message"}}

					   				 ]}

			          				)
			          		}
			          		else
			          		{
			          			console.log("not company")
			          			return(
			          				{tag: "div", attrs: {class:"ui info message"}, children: [
			          			
			          			{tag: "div", attrs: {class:"header"}, children: [
								  {tag: "p", attrs: {}, children: ["To add your projects please add your company :",  
								  {tag: "a", attrs: {config:m.route, href:"/company"}, children: [
								   "Add company"
								   ]}
								  ]}
								  ]}
								]}

			          			)
			          		}
			          	}(), 
			          

			          	
                                function(){
                                    console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
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
	)
}




website.view = function() {
return (this.load())	


}

module.exports = website;