var auth = require('module/auth');

var project = {}
Clipboard=require('clipboard');
var ctrl = {}
ctrl.del=m.prop("");
ctrl.project = m.prop(false);
//ctrl.pro = m.prop([]);
ctrl.array=[];
	//ctrl.embed=m.prop("");

project.controller = function() {
	console.log("project");

	auth.isLoggedIn(function(isLoggedIn) {
		if (!isLoggedIn) {
			m.route('/connect')
		}
	});
	//console.log("document.baseURI.split("=")[1]",document.baseURI)
 	ctrl.ErrorMsg=m.prop("");
ctrl.close=function(){
console.log("hi",$(".close.icon"))

  $("#embed").hide();
  

}
	ctrl.getproject = function(cb) {
		var transport = m.prop();
		m
			.request({
				method: "GET",
				url: m.urls("company", "website"),
				config: transport,
				background: true

			})
			.then(function(data) {
				

			});
			transport().onreadystatechange = function() {
			var res=JSON.parse(transport().responseText);
			console.log(res);
			if (transport().readyState == XMLHttpRequest.DONE) {
				console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					console.log("data", res.data.projects);
					if(res.data.projects.length>0)
						ctrl.project(true)
					cb(res.data.projects)

					
				} else {
					ctrl.project(false)
					 cb(false)
				}


			}
		}
	}
	ctrl.getproject(function(web) {
		console.log("web",web);
		ctrl.pro = web;
		m.redraw(true);
	})

	//console.log("pro", ctrl.pro())
	ctrl.code = function(id,name){
        
		var transport = m.prop();
		m
			.request({
				method: "GET",
				url: m.urls("website",id,"embedcode"),
				config: transport,
				background: true

			})
			.then(function(data) {
				

			});
			transport().onreadystatechange = function() {
			var res=JSON.parse(transport().responseText);
			if (transport().readyState == XMLHttpRequest.DONE) {
				console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					console.log("data", res.data);
					ctrl.embed=res.data;
					ctrl.web = name;
					$("").hide();
					 $("#embed").show();
					 
					m.redraw(true)
										
				} else {

					ctrl.ErrorMsg=m.prop(res.userMessage) 
					console.log("ErrorMsgErrorrrrrr")
					console.log("ctrl.ErrorMsg",ctrl.ErrorMsg())
					m.redraw(true);
				}


			}
		}
	}.bind(ctrl);
	ctrl.list=false
	ctrl.webpage = function(id){
        
        console.log("hi");
        console.log("id",id);
		var transport = m.prop();
		m
			.request({
				method: "GET",
				url: m.urls("websites",id,"webpages"),
				config: transport,
				background: true

			})
			.then(function(data) {
				

			});
			transport().onreadystatechange = function() {
			var res=JSON.parse(transport().responseText);
			//console.log(res);
			if (transport().readyState == XMLHttpRequest.DONE) {
				console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					console.log("data", res.data);
					ctrl.list=res.data;
					console.log("in ctrl . list",ctrl.list)

					m.redraw(true);
					
					//ctrl.embed.id=id;
					//ctrl.array.push(ctrl.embed);
					//document.getElementById(id).innerHTML=ctrl.embed()
					//m.redraw(true);
					
				} else {
					console.log("res",res);
					ctrl.ErrorMsg=m.prop(res.userMessage) 
					console.log("ErrorMsgErrorrrrrr")
					console.log("ctrl.ErrorMsg",ctrl.ErrorMsg())
					m.redraw(true);
					//ctrl.ErrorMsg=m.prop(res.userMessage) 
				}


			}
		}
	}.bind(ctrl);

	ctrl.reset =function(){
		ctrl.list=false;
		m.redraw(true);

	}
	ctrl.resetdraw=function(){
		ctrl.draw=false
		m.redraw(true);
	}
	ctrl.heatmap =function(id){
		console.log("heatmap");
		m.cookie.set("pageId", id);
       m.route('/heatmap?pageId='+id)
       return
	}.bind(ctrl);
	ctrl.graph =function(web_id){
		console.log("inside graph");
		console.log("web_id",web_id)
		m.cookie.set("websiteId", web_id);
		m.route('/showcharts?websiteId='+web_id)
		return
	}.bind(ctrl);
ctrl.hidden=function(){
  if(!ctrl.list[0])
    $('#hidden').show()
}
ctrl.popup = function(ele){
		$(ele)
		  .popup({on: 'hover',
		  	inline: true,
		  	
   
  })

;
		
	}
	ctrl.del_pro={}
	ctrl.warning=function(id,name){
		ctrl.del_pro.website=name;
		ctrl.del_pro.id=id;
		ctrl.popup()
		$('#Delete').show();
	}.bind(ctrl);
		ctrl.delete_project=function(){
		console.log("delete_project");
		var transport = m.prop();
		var data={
			website:ctrl.del_pro.website
		}
		m
			.request({
				method: "DELETE",
				url: m.urls("company","website"),
				data:data,
				config: transport,
				background: true
				 //new Object({"test":"test"})
			})
			.then(function(data) {
				
				
			});
			transport().onreadystatechange = function() {
			var res=JSON.parse(transport().responseText);
			//console.log(res);
			if (transport().readyState == XMLHttpRequest.DONE) {
				console.log(" transport().status", transport().status)
				if (transport().status == 200) {
					console.log("Delete")
					console.log("DELETE",res.userMessage)
					ctrl.ErrorMsg=m.prop(res.userMessage+ctrl.del_pro.website)
					ctrl.del_pro.website=null;
		ctrl.del_pro.id=null;
		$('#Delete').hide();
					ctrl.getproject(function(web) {
		console.log("web",web);
		ctrl.pro = web;
		m.redraw(true);
	})

					m.redraw(true);
					
					//ctrl.embed.id=id;
					//ctrl.array.push(ctrl.embed);
					//document.getElementById(id).innerHTML=ctrl.embed()
					//m.redraw(true);
					
				} else {
					console.log("res",res);
					ctrl.ErrorMsg=m.prop(res.userMessage) 
					console.log("ErrorMsgErrorrrrrr")
					console.log("ctrl.ErrorMsg",ctrl.ErrorMsg())
					m.redraw(true);
					//ctrl.ErrorMsg=m.prop(res.userMessage) 
				}


			}
		}
	}
	ctrl.close_err=function(){
		$(".ui.warning.message").hide();
	}
	ctrl.close_warning=function(){
		ctrl.del_pro.website=null;
		ctrl.del_pro.id=null;

		$('#Delete').hide();
	}

	return ctrl;

}
var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
project.load = function() {
	/*auth.user(function(data){
		
			console.log("data",data);
		
	});*/

	return (



		{tag: "div", attrs: {class:"ui container", id:"1"}, children: [
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

			          {tag: "h1", attrs: {}, children: ["Your Projects"]}, 
			          {tag: "div", attrs: {class:"ui hidden negative message", id:"Delete", config:ctrl.hidden}, children: [
                                        {tag: "div", attrs: {class:"header"}, children: [
                                          "Are you sure you want to Delete project ", ctrl.del_pro.website
                                        ]}, 
                                       {tag: "div", attrs: {class:"ui positive button", onclick:ctrl.close_warning}, children: ["No"]}, 
                                       {tag: "div", attrs: {class:"ui negative button", onclick:ctrl.delete_project}, children: ["Yes"]}
                                      ]}, 


			          
			          	function(){
			          		if(ctrl.project())
			          		{
			          			return(

									{tag: "div", attrs: {class:"ui cards"}, children: [						          
									
							          	
							          		ctrl.pro.map(function(website){
							          		return(
							          			
							          			{tag: "div", attrs: {class:"olive card"}, children: [
							          			{tag: "i", attrs: {class:"square inverted red remove circle outline icon link", config:ctrl.popup, onclick:ctrl.warning.bind(ctrl,website.websiteId,website.website)}}, 
							          			{tag: "div", attrs: {class:"ui custom hidden popup top left transition", id:"pop"}, children: [
															{tag: "font", attrs: {color:"red"}, children: [
															"Delete Project"
															]}
														]}, 
								          			{tag: "div", attrs: {class:"content"}, children: [
									          			{tag: "div", attrs: {class:"header"}, children: [{tag: "font", attrs: {color:"green"}, children: [{tag: "i", attrs: {}, children: [website.website]}]}
									          			]}, 
									          			{tag: "div", attrs: {class:"extra content"}, children: [
									          			{tag: "div", attrs: {class:"ui vertical fluid tiny buttons"}, children: [
										          			{tag: "button", attrs: {class:"ui button", onclick:ctrl.graph.bind(ctrl,website.websiteId)}, children: [
																"Show Graphs"
															]}, 
															{tag: "button", attrs: {class:"ui positive button", id:website.websiteId, onclick:ctrl.code.bind(ctrl,website.websiteId,website.website)}, children: [
													      		"Get Embed code"
													    	]}, 





													    	{tag: "button", attrs: {class:"ui button", onclick:ctrl.webpage.bind(ctrl,website.websiteId)}, children: [
													      		"Show webpages"
													    	]}
													    	
														]}
														]}
													]}

												]}
												)

											
											})			          			         
							          
							         

								]}
			          				)
			          		}
			          		else
			          		{
			          			console.log("not there");
			          			return(
			          				{tag: "div", attrs: {class:"ui info message"}, children: [
			          	
									  {tag: "p", attrs: {}, children: ["No project found Add your projects now",     
									  {tag: "a", attrs: {config:m.route, href:"/website"}, children: [
									  "Add project"]}
									  ]}
									]}
			          			)
			          		}
			          	}(), 
			          


{tag: "div", attrs: {class:"ui hidden olive message", id:"embed"}, children: [
  {tag: "i", attrs: {class:"close icon", onclick:ctrl.close}}, 
  {tag: "div", attrs: {class:"header"}, children: [
  {tag: "h4", attrs: {}, children: [" Your Embed code for "]}, " ", {tag: "h3", attrs: {}, children: [" ", ctrl.web]}
  ]}, 
  {tag: "div", attrs: {class:"description", id:"bar"}, children: [
  
           				 function(){
           				 	return(
           				 	{tag: "div", attrs: {class:"ui compact message"}, children: [
           				 	{tag: "pre", attrs: {}, children: [
           				 	{tag: "code", attrs: {class:"code xml"}, children: [
           				 	ctrl.embed
           				 	]}
           				 	



           				 	]}
           				 	]}
           				 	)
           				 }()   
				
			
]}, 
{tag: "button", attrs: {class:"btn", "data-clipboard-action":"copy", "data-clipboard-target":"#bar"}, children: [
    "Copy to clipboard"
]}
  
]}, 
       
			          
                                function(){
                                    console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
                                    if(ctrl.ErrorMsg())
                                        return(
                                              {tag: "div", attrs: {class:"ui warning message"}, children: [
                                              {tag: "i", attrs: {class:"close icon", onclick:ctrl.close_err}}, 
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
	)
}
project.list = function() {
	
	

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
			        
			          
			          
			          	function(){
			          	
			          				return(
				          				{tag: "div", attrs: {class:"header"}, children: [
				          					{tag: "button", attrs: {class:"mini ui button", onclick:ctrl.reset}, children: [
											  "back"
											]}, 
				          					{tag: "h1", attrs: {}, children: ["webpages : "]}, 
				          					
				          					ctrl.list.map(function(page){
				          	
							          		return(
							          			
							          			
													{tag: "div", attrs: {class:"ui animated green basic fade button", onclick:ctrl.heatmap.bind(ctrl,page.pageId), tabindex:"0"}, children: [
												  		{tag: "div", attrs: {class:"visible content"}, children: [page.address]}, 
												  		{tag: "div", attrs: {class:"hidden content"}, children: [
												    		"Show Heatmap"
												  		]}
													]}
												
												)

											
											})
										

				          				]}
			          				)
			          			
			          		
           				 
						}(), 
				
      
 {tag: "div", attrs: {class:"ui hidden negative message", id:"hidden", config:ctrl.hidden}, children: [
                                        {tag: "div", attrs: {class:"header"}, children: [
                                          "We're sorry" 
                                        ]}, 
                                        {tag: "p", attrs: {}, children: ["No data found to display"
                                      ]}]}


			            ]}
			      ]}
			    ]}
		    ]}
		  ]}
		]}

)


}


project.view = function() {
	console.log("ctrl.list",ctrl.list)
	return (
		ctrl.list ?  this.list():this.load()
	)


}

module.exports = project;