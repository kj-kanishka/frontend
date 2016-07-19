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

		//redirect if cookie doesnt exists.

	ctrl.ErrorMsg=m.prop("");
	ctrl.website = m.prop("");
	console.log("document.baseURI",document.baseURI)
	var website = document.baseURI.split("=")[1];
	ctrl.website=m.prop(website)
	console.log("ctrl.website",ctrl.website())

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
		    	{tag: "div", attrs: {class:"ui column grid"}, children: [
			      {tag: "div", attrs: {class:"column"}, children: [
			        {tag: "div", attrs: {class:"ui raised segment"}, children: [

			          
			          {tag: "div", attrs: {class:"ui segment"}, children: [


			          	
                                function(){
                                    console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
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
                                    else
                                    {
                                    	return(
                                    		{tag: "div", attrs: {class:"ui error message"}, children: [
											  {tag: "div", attrs: {class:"header"}, children: [
											     "Are You Sure You want to permantly delete ", ctrl.website()
											  ]}, 
											  {tag: "ul", attrs: {class:"list"}, children: [
											    {tag: "li", attrs: {}, children: ["This action will permantly delete this project."]}, 
											    {tag: "li", attrs: {}, children: [
											    {tag: "div", attrs: {class:"ui two buttons"}, children: [
											        {tag: "div", attrs: {class:"ui basic green button"}, children: ["Approve"]}, 
											        {tag: "div", attrs: {class:"ui basic red button"}, children: ["Decline"]}
											     ]}
											     ]}
											  ]}
											]}
                                    	)
                                    }
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




website.view = function() {

	return (
		this.load()
	)


}

module.exports = website;