var verify = {}


var ctrl={}
verify.controller = function(){


	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }

	

	return ctrl;	
}

verify.view = function(){
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
			          {tag: "h2", attrs: {}, children: ["Please enter unique code"]}, 
			          {tag: "div", attrs: {class:"ui segment"}, children: [
			          {tag: "form", attrs: {class:"ui large form"}, children: [
			      
				  {tag: "div", attrs: {class:"row"}, children: [
				  "Unique Code:", 
				  {tag: "input", attrs: {type:"text", name:"unique_code"}}
				  ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
			        {tag: "button", attrs: {type:"button", class:"submit"}, children: [
			        	
			        	"Submit"
			        ]}
			       ]}, 
				  

			      

			      {tag: "div", attrs: {class:"ui error message"}}
			    
			    ]}
			          ]}
			        ]}
			      ]}
			    ]}
		    ]}
		  ]}
		]}
	)
}

module.exports = verify;