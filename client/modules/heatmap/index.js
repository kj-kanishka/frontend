var Heatmap = {}
var ctrl={}
var h337 = require('heatmap.js')
Heatmap.SubRoutes = function (element) {
	

	// body...
}
ctrl.Data=m.prop({
	src:"",
	heatmap:[]
});
ctrl.test = function(element){
console.log(element)
}
Heatmap.genrateHeatmap2 = function(element){
	console.log(element)
	var heatmap = h337.create({
        container:element,
        maxOpacity: .6,
        radius: 50,
        blur: .90,
          // backgroundColor with alpha so you can see through it
          // backgroundColor: 'rgba(0, 0, 58, 0.96)'
    });
	var data = { 
		max: 100, 
		data:ctrl.Data().heatmap
	};
	heatmap.setData(data);
	
	
}

Heatmap.controller = function(){

	ctrl.DashboardElement = m.prop();

	ctrl.viewConfig = function(element){
		var elm = jQuery(element);
		ctrl.DashboardElement = m.prop(elm);
		var image = document.createElement("img");
		element.appendChild(image)
		image.src = ctrl.Data().src;
		image.crossOrigin = "Anonymous";
		image.onload = function(){
		element.style.width = image.width+"px";
		element.style.height = image.height+"px";
		Heatmap.genrateHeatmap2(element)
		}
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
	var pageId = document.baseURI.split("=")[1] || m.cookie.get("pageId")
	console.log("pageId",pageId)
	m
	.request({
		method:'GET',
		url:m.urls('webpages/'+pageId+'/heatmap3')
	})
	.then(function(data){
	
		ctrl.Data(data.data)
		
	})

	return ctrl;	
}

Heatmap.view = function(){
	return (
		{tag: "div", attrs: {class:"heatmapContainerWrapper", config:ctrl.viewConfig}
			
		}
	)
}

module.exports = Heatmap;