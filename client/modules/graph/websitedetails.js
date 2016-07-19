var Website = {}
Website.SubRoutes = function (element) {

	// body...
}
var ctrl={}
ctrl.webpages=m.prop([])

Website.controller = function(){
	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }
	var websiteId = document.baseURI.split("=")[1];
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
	ctrl.loadWebsite = m.prop()
	ctrl.loadWebsite = function () {
		m.addGlobalHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWtzaGF5a3VtYXI1NzA3NzdjMmQ1ZTVmMTRmMDVhNmNjY2Rha3NoYXlAaGF0Y2hpdHVwLmNvbQ.w1pumA55gppaAjBl7f_cg5BmCM-3LHMp6wrQG6fl4mQ');
		m
		.request({
			method:"GET",
			url:m.urls("webpages/"+websiteId)
		}).then(function(data){
			console.log(data);
			data.data.forEach(function(page){
				m
				.request({
					method:'GET',
					url:m.urls('users/'+page.pageId)
				}).then(function(resp){
					page.users = resp.data.users;
					ctrl.webpages().push(page);
				})
			})
		})
	}
	ctrl.loadWebsite()
	// ctrl.loadwebsiteById = function(element){
	// 	var elem = jQuery(element);
	// 	Website.websiteId(element.attr("id"))
	// }
	return ctrl;	
}

Website.view = function(){
	return (
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column", config:Website.SubRoutes}, children: [
		    	    {tag: "div", attrs: {class:"ui raised segment"}, children: [
			          {tag: "h2", attrs: {}, children: ["Webpages "]}, 
			          
			          	ctrl.webpages().map(function(val){
			          		return  {tag: "div", attrs: {class:"ui segment"}, children: [
			          					{tag: "div", attrs: {class:"ui grid"}, children: [
			          						{tag: "div", attrs: {class:"two wide column"}, children: [{tag: "i", attrs: {class:"world icon"}}]}, 
			          						{tag: "div", attrs: {class:"ten wide column"}, children: [{tag: "a", attrs: {href:"websitedetails?id="+val.pageId}, children: [val.address]}]}, 
			          						{tag: "div", attrs: {class:"two wide column"}, children: ["users:", val.users]}, 
			          						{tag: "div", attrs: {class:"two wide column"}, children: [{tag: "i", attrs: {class:"remove icon"}}]}
			          					]}
			          				]}

			          	})
			          
			         
			        ]}
			  ]}
		  ]}
		]}
	)
}

module.exports = Website;