var Charts = {}
var ctrl={}
var Cytoscape = require('cytoscape')

var Highcharts = require('highcharts');
var Months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Charts.Data=m.prop([])
Charts.timeSlot =m.prop([])
Charts.getTimeSlot = function(startTime,endTime,cb){
// var now = new Date();
// var daysOfYear = [];

var timePayload={
	startTime:[],
	endTime:[]
};
var TimeSlot=[];
console.log((new Date("2016-04-21"))-(new Date("2016-04-20")))
var i=0;
while(startTime<=endTime){
	// timePayload.push({startTime:startTime.valueOf(),endTime:startTime.valueOf()+86400000})
	timePayload.startTime.push(startTime.valueOf()/1000)
	timePayload.endTime.push((startTime.valueOf()+86400000)/1000)
	TimeSlot.push(Months[startTime.getMonth()]+" "+startTime.getDate())
	// Charts.Data().push(i++)
	startTime.setDate(startTime.getDate()+1);
}
Charts.timeSlot(TimeSlot)
cb(TimeSlot,timePayload);

}

Charts.showDeviceChart = function(){
	Charts.getTimeSlot(new Date(ctrl.startTime()),new Date(ctrl.endTime()),function(timeSlot,timePayload){
	console.log(timePayload)
		

	m
	 .request({
	 	method:"POST",
	 	url:m.urls('websites/'+ctrl.websiteId()+'/users?filter=device&device=mobile'),
	 	data:timePayload

	 }).then(function(data){
		console.log(data);
		
		var mobileData=data.data.dataset;
	m
	 .request({
	 	method:"POST",
	 	url:m.urls('websites/'+ctrl.websiteId()+'/users?filter=device&device=desktop'),
	 	data:timePayload

	 }).then(function(data){

	 	Highcharts.chart('container2', {
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: 'Device Users'
	        },
	        xAxis: {
	            categories: Charts.timeSlot()
	        },
	        yAxis: {
	            title: {
	                text: 'Users Count'
	            }
	        },
	        series: [{
	            name: 'Mobile',
	            data: mobileData
	        }, {
	            name: 'Desktop',
	            data: data.data.dataset
	        }],
	    });
	 });
	    
	    
	    

	 });
	 
	});
};

Charts.showCountryChart = function(){

	Charts.getTimeSlot(new Date(ctrl.startTime()),new Date(ctrl.endTime()),function(timeSlot,timePayload){
	console.log(timePayload)
		

	m
	 .request({
	 	method:"POST",
	 	url:m.urls('websites/'+ctrl.websiteId()+'/users?filter=country'),
	 	data:timePayload

	 }).then(function(data){
		console.log(data);
		var series=[];
		var dataset = data.data.dataset;
		Object.keys(dataset).forEach(function(value){
			console.log(value)
			series.push({name:value,data:dataset[value]})
		});

		Highcharts.chart('container3', {
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: 'Top Countries'
	        },
	        xAxis: {
	            categories: Charts.timeSlot()
	        },
	        yAxis: {
	            title: {
	                text: 'Users Count'
	            }
	        },
	        series: series
	    });
	
	    
	    
	    

	 });
	 
	});	
}


Charts.showCityChart = function(){

	Charts.getTimeSlot(new Date(ctrl.startTime()),new Date(ctrl.endTime()),function(timeSlot,timePayload){
	console.log(timePayload)
		

	m
	 .request({
	 	method:"POST",
	 	url:m.urls('websites/'+ctrl.websiteId()+'/users?filter=city'),
	 	data:timePayload

	 }).then(function(data){
		var series=[];
		var dataset = data.data.dataset;
		Object.keys(dataset).forEach(function(value){
			console.log(value)
			series.push({name:value,data:dataset[value]})
		});
		Highcharts.chart('container4', {
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: 'Top Cities'
	        },
	        xAxis: {
	            categories: Charts.timeSlot()
	        },
	        yAxis: {
	            title: {
	                text: 'Users Count'
	            }
	        },
	        series: series
	    });
	    
	    
	    

	 });
	 
	});	
}

Charts.chart = function() {

console.log(ctrl.startTime(),ctrl.endTime())
Charts.getTimeSlot(new Date(ctrl.startTime()),new Date(ctrl.endTime()),function(timeSlot,timePayload){
console.log(timePayload)
	

m
 .request({
 	method:"POST",
 	url:m.urls('websites/'+ctrl.websiteId()+'/users'),
 	data:timePayload

 }).then(function(data){
	console.log(data);
	Charts.Data(data.data.dataset);
	Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Time Scale'
        },
        xAxis: {
            categories: Charts.timeSlot()
        },
        yAxis: {
            title: {
                text: 'Users Count'
            }
        },
        series: [{
            name: 'Users',
            data: Charts.Data()
        }]
    });
    

 });
 
});
}

Charts.SubRoutes = function (element) {
	

	// body...
}

ctrl.startTime=m.prop("")
ctrl.endTime=m.prop("")
ctrl.webpages=m.prop([])
ctrl.nodes= m.prop([])
ctrl.edges = m.prop([])
Charts.controller = function(){

	var websiteId = document.baseURI.split("=")[1] || m.cookie.get("websiteId");
	console.log("charts",websiteId)
	ctrl.websiteId=m.prop(websiteId)
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
var now =new Date()
console.log(now)
var day=now.getDate()-15
ctrl.startTime(now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+day)
ctrl.endTime(now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate());
Charts.chart()

ctrl.activeTab = function(){
	
	var data_attr= $(this).attr("data-tab");
	$('div.ui.tab.segment.active').removeClass("active")
	$('a.active').removeClass("active")
	$(this).addClass("active");
	$("div[data-tab="+data_attr+"]").addClass("active")
	if(data_attr=="device"){
		console.log("device")
		Charts.showDeviceChart();
	}else if(data_attr=="country"){
		Charts.showCountryChart()
	}else if (data_attr=="city"){
		Charts.showCityChart()
	}
}

// var tabs = jQuery(document.getElementById("tabs")).find(".item");
// $(tabs).on('click',function(){
// 	console.log($(this).attr("data-tab"))
// })
	return ctrl;	
}

Charts.view = function(){
	return (
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {id:"test", class:"twelve wide column", config:Charts.SubRoutes}, children: [
				

			    {tag: "div", attrs: {class:"ui raised segment"}, children: [
		        
		        {tag: "div", attrs: {class:"ui input"}, children: [
				  {tag: "input", attrs: {placeholder:"Start Time", type:"date", oninput:m.withAttr("value",ctrl.startTime), value:ctrl.startTime()}}
				]}, 
				{tag: "div", attrs: {class:"ui input"}, children: [
				  {tag: "input", attrs: {placeholder:"End Time", type:"date", oninput:m.withAttr("value",ctrl.endTime), value:ctrl.endTime()}}
				]}, 
				{tag: "button", attrs: {class:"ui button", onclick:Charts.chart}, children: ["Show"]}, 
				{tag: "div", attrs: {class:"ui pointing secondary menu", id:"tabs", config:ctrl.Tab}, children: [
				  {tag: "a", attrs: {class:"item active", "data-tab":"topViews", onclick:ctrl.activeTab}, children: ["By Top Views"]}, 
				  {tag: "a", attrs: {class:"item", "data-tab":"device", onclick:ctrl.activeTab}, children: ["By Device"]}, 
				  {tag: "a", attrs: {class:"item", "data-tab":"country", onclick:ctrl.activeTab}, children: ["By Country"]}, 
				  {tag: "a", attrs: {class:"item", "data-tab":"city", onclick:ctrl.activeTab}, children: ["By City"]}
				]}, 
				{tag: "div", attrs: {class:"ui tab segment active", "data-tab":"topViews"}, children: [
				  {tag: "h1", attrs: {}, children: ["Top Views"]}, 
				  {tag: "div", attrs: {id:"container"}}
				]}, 
				{tag: "div", attrs: {class:"ui tab segment", "data-tab":"device"}, children: [
				  {tag: "h1", attrs: {}, children: ["By Device"]}, 
				  {tag: "div", attrs: {id:"container2"}}
				]}, 
				{tag: "div", attrs: {class:"ui tab segment", "data-tab":"country"}, children: [
				  {tag: "h1", attrs: {}, children: ["By Top Countries"]}, 
				   {tag: "div", attrs: {id:"container3"}}
				]}, 
				{tag: "div", attrs: {class:"ui tab segment", "data-tab":"city"}, children: [
				  {tag: "h1", attrs: {}, children: ["By Top Cities"]}, 
				   {tag: "div", attrs: {id:"container4"}}
				]}
	    	    

		         
		        ]}
			  ]}
		  ]}
		]}
	)
}

module.exports = Charts;