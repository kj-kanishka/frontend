var Graphs = {}

var Cytoscape = require('cytoscape')

Graphs.Arch = function(relations){

	relations.sort(function(rel1,rel2){
		return rel1.startTime < rel2.startTime2 ? -1 : 1
	});

	// ctrl.edges(relations);
	var user = {}
	var edge = {}
	var edges = {}
	var strength = 20;
	relations.forEach(function(relation){
		console.log(user[''+relation.userId])
		relation.pageId = relation.pageId ? relation.pageId : 638
		if(user[''+relation.userId]){
			user[''+relation.userId].push(relation)
			if(edges['source'+(user[''+relation.userId][user[''+relation.userId].length-2].pageId)+'target'+relation.pageId]){
				edges['source'+(user[''+relation.userId][user[''+relation.userId].length-2].pageId)+'target'+relation.pageId].data.strength+=30;
			
			}else{
				edge = { data: { source: user[''+relation.userId][user[''+relation.userId].length-2].pageId, target: relation.pageId, faveColor: '#6FB1FC', strength: strength } }
				edges['source'+(user[''+relation.userId][user[''+relation.userId].length-2].pageId)+'target'+relation.pageId]=edge
				// ctrl.edges().push(edge)
			}
			
		}else{
			user[''+relation.userId]=[]
			user[''+relation.userId].push(relation)
			// edge = { data: { source: relation.userId, target: relation.pageId, faveColor: '#6FB1FC', strength: 90 } }
			// ctrl.edges().push(edge)
		}
		
		// edge = { data: { source: relation.userId, target: relation.pageId, faveColor: '#6FB1FC', strength: 90 } }
	
	});
	for(key in edges){
		console.log(key)
		ctrl.edges().push(edges[key])
	}
	
}

Graphs.graph = function(element) {
var cy = Cytoscape({
		"container": jQuery(element),
		layout: {
	    name: 'cose',
	    padding: 10
	  },
  
	  style: Cytoscape.stylesheet()
	    .selector('node')
      .css({
        'shape': 'data(faveShape)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color': '#fff'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'source-arrow-shape': 'circle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'
      })
    .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),
  
    elements: {
    	nodes:ctrl.nodes(),
	    // nodes: [
	    //   { data: { id: 'j', name: 'Jerry', weight: 20, faveColor: '#6FB1FC', faveShape: 'ellipse' } },
	    //   { data: { id: 'e', name: 'Elaine', weight: 20, faveColor: '#6FB1FC', faveShape: 'ellipse' } },
	    //   { data: { id: 'k', name: 'Kramer', weight: 20, faveColor: '#6FB1FC', faveShape: 'ellipse' } },
	    //   { data: { id: 'g', name: 'George', weight: 20, faveColor: '#6FB1FC', faveShape: 'ellipse' } }
	    // ],
	    edges:ctrl.edges()
	 //    edges: [
	 //      { data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 90 } },
	 //      { data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 70 } },
	 //      { data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 80 } },
	     
	 //      { data: { source: 'e', target: 'j', faveColor: '#EDA1ED', strength: 95 } },
	 //      { data: { source: 'e', target: 'k', faveColor: '#EDA1ED', strength: 60 }, classes: 'questionable' },
	      
	 //      { data: { source: 'k', target: 'j', faveColor: '#86B342', strength: 100 } },
	 //      { data: { source: 'k', target: 'e', faveColor: '#86B342', strength: 100 } },
	 //      { data: { source: 'k', target: 'g', faveColor: '#86B342', strength: 100 } },
	      
	 //      { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 } }
		// ]
	},
  
    ready: function(){
	    window.cy = this;
    
    // giddy up
	    }
	});

}

Graphs.SubRoutes = function (element) {

	
	// body...
}
var ctrl={}

ctrl.webpages=m.prop([])
ctrl.nodes= m.prop([])
ctrl.edges = m.prop([])
Graphs.controller = function(){

	
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

	m
	.request({
		method:'GET',
		url:m.urls('journey/723')
	})
	.then(function(data){
		console.log(data.data.rel)
		Graphs.Arch(data.data.rel)

		data.data.nodes.forEach(function(node){
			if (node.name!="User")
				ctrl.nodes().push(new Object({data:{ id: node.id, name: node.name, weight: 20, faveColor: node.faveColor, faveShape: 'ellipse' }}));

		});
		
	})


	// ctrl.loadwebsiteById = function(element){
	// 	var elem = jQuery(element);
	// 	Graphs.websiteId(element.attr("id"))
	// }
	return ctrl;	
}

Graphs.view = function(){
	return (
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column", config:Graphs.SubRoutes}, children: [
			    {tag: "div", attrs: {class:"ui raised segment", config:Graphs.graph}, children: [
		        
		          {tag: "h2", attrs: {}, children: ["Graph "]}, 
		        {tag: "div", attrs: {class:"ui search icon input"}, children: [
				  {tag: "i", attrs: {class:"search icon"}}, 
				  {tag: "input", attrs: {class:"search", type:"text"}}
				]}
	    	     
		         
		        ]}
			  ]}
		  ]}
		]}
	)
}

module.exports = Graphs;