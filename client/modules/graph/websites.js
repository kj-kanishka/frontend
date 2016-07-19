var Websites = {}

Websites.SubRoutes = function(element) {

	// body...
}
var ctrl = {}


ctrl.websites = m.prop([{
	"_id": "570228210828dec30367481d",
	"companyId": "570227c90828dec30367481c",
	"active": true,
	"websiteId": 325,
	"website": "www.hatchitservices.com",
	"__v": 0
}, {
	"_id": "570228210828dec30367481d",
	"companyId": "570227c90828dec30367481c",
	"active": true,
	"websiteId": 325,
	"website": "www.google.com",
	"__v": 0
}])

Websites.controller = function() {


	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }

	ctrl.DashboardElement = m.prop();

	ctrl.viewConfig = function(element) {
		var elm = jQuery(element);
		ctrl.DashboardElement = m.prop(elm);
	};

	ctrl.fadeOut = function(element) {
		var elem = jQuery(element);

		elem
			.transition({
				animation: 'fade out',
				onComplete: function() {
					m.redraw(true);

					ctrl.DashboardElement()
						.transition('fade in');
				}
			})
	}
	ctrl.loadWebsites = m.prop()
	ctrl.loadWebsites = function() {
		m.addGlobalHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWtzaGF5a3VtYXI1NzA3NzdjMmQ1ZTVmMTRmMDVhNmNjY2Rha3NoYXlAaGF0Y2hpdHVwLmNvbQ.w1pumA55gppaAjBl7f_cg5BmCM-3LHMp6wrQG6fl4mQ');
		m
			.request({
				method: "GET",
				url: m.urls("company/website")
			}).then(function(data) {
				console.log(data);
				ctrl.websites(data.data.projects);
			})
	}
	ctrl.loadWebsites()

	return ctrl;
}

Websites.view = function() {
	return (
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column", config:Websites.SubRoutes}, children: [
		    	    {tag: "div", attrs: {class:"ui raised segment"}, children: [
			          {tag: "h2", attrs: {}, children: ["Websites List"]}, 
			          
			          	ctrl.websites().map(function(val){
			          		return  {tag: "div", attrs: {class:"ui segment"}, children: [
			          					{tag: "div", attrs: {class:"ui grid"}, children: [
			          						{tag: "div", attrs: {class:"two wide column"}, children: [{tag: "i", attrs: {class:"world icon"}}]}, 
			          						{tag: "div", attrs: {class:"twelve wide column"}, children: [{tag: "a", attrs: {href:"websitedetails?id="+val.websiteId}, children: [val.website]}]}, 
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

module.exports = Websites;