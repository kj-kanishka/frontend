var Graph = {};

require('transition');



Graph.SubRoutes = function(element){
	console.log("set element")
	Graph.container = m.prop(jQuery(element))
}

Graph.header = m.prop("Welcome")

//CTRL
Graph.controller = function(){
	


	var ctrl = {};

	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }

	ctrl.DashboardElement = m.prop();

	ctrl.viewConfig = function(element){
		var elm = jQuery(element);
		ctrl.DashboardElement = m.prop(elm);
	};

	ctrl.fadeOut = function(element){
		var elem = jQuery(element);

            elem
            .transition({
                animation  : 'fade out',
                onComplete : function(){
                	m.redraw(true);

                	ctrl.DashboardElement()
                	.transition('fade in');                    
                }
            })
	}


	return ctrl;	
}


Graph.Load = function(ctrl){

	return (
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column", config:Graph.SubRoutes}, children: [
		    	{tag: "div", attrs: {class:"ui column grid"}, children: [
			      {tag: "div", attrs: {class:"column"}, children: [
			        {tag: "div", attrs: {class:"ui raised segment"}, children: [
			          {tag: "h2", attrs: {}, children: [this.header()]}, 
			          {tag: "p", attrs: {}, children: ["Welcome to graphed.io"]}
			        ]}
			      ]}
			    ]}
		    ]}
		  ]}
		]}
	);
}

Graph.view = function(ctrl){
	return (
		this.Load(ctrl)
		)
	// return (
	// 	auth.isLoggedIn()() ? this.Load(ctrl) : require('module/loader')
	// )
	
}

module.exports = Graph;