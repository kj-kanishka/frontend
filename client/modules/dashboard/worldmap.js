var auth = require('module/auth');

var worldmap = {};
var ctrl = {};



//CTRL
worldmap.controller = function(ele) {
	


  /*
	var sock = new SockJS('http://localhost:9999/sock');
		 sock.onopen = function() {
		     //console.log('open');	  
		 	 sock.onmessage = function(e) {
	     	//console.log('message', e.data);
		 		 };
		  sock.onclose = function() {
			     //console.log('close');
			 };
			 sock.close();
			  sock.send('worldmap');
		 };*/
     auth.isLoggedIn(function(isLoggedIn) {
      ctrl.login=1;
    if (!isLoggedIn) {
      
      m.route('/connect')
    }
    else
    {
      m.redraw(true)
    }
  });

ctrl.world_map=function(){
  console.log("it's world map");
$(function()
  {
console.log("and it's me")
    var width = 750;
    height = 480;

var projection = d3.geo.equirectangular()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);



var graticule = d3.geo.graticule();
    console.log("its a function",d3.select("#mymap"))
    var svg = d3.select("#mymap")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);
  svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


  var div = d3.select("#mymap").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  var g = svg.append("g");
  var max_user=0;
d3.json("http://admin.livetest.io/worldmap/1285", function(error, world) {
  if (error) 
    {
      //console.log("error",error)
      throw error;
    }
    console.log("world",world)
    var countries = topojson.feature(world, world.objects.countries),
      geometries = countries.features;
  
  
 
svg.selectAll(".usersCount")
        .data(geometries)
      .enter()
        .append("text")
        .attr("class", "usersCount")
        .text(function(d) { 
          if(d.properties.usersCount>0)
            {
              if(d.properties.usersCount>max_user)
                max_user=d.properties.usersCount
               
            }
          })
       
        //console.log("max_user",max_user);



 

svg.selectAll(".land")
        .data(geometries)
        .enter()
          .append("path")
          .attr("class", "land")
          .attr("d", path)
          .on("mouseover", function(d) {   
          //console.log("hi");   
          div.transition()        
                .duration(200)      
                .style("opacity", .9) ;

            div.html(d.properties.usersCount + "<br/>"  + d.properties.name)  
                   .attr("x", function(d) { return path.centroid(d)[0]; })
        .attr("y", function(d) { return path.centroid(d)[1]; });
                      
            
            })
            .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })
    
          .style("fill",function(d) { 
            half=max_user/2
            less=half/2
            more=half+less
          if(d.properties.usersCount<more)
            if(d.properties.usersCount<half)
              if(d.properties.usersCount<less)
                if(d.properties.usersCount==0)
                  return "white"
                else
                return "#ECF8F8"
              else
                return "#CDEEEE"
            else
              return "#AEE3E3"
          else
            return "#8FD8D8"

          })
          .style("stroke","black");
});
});
 }





	return ctrl;
}




worldmap.load = function() {

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
                 {tag: "div", attrs: {id:"mymap", config:ctrl.world_map}, children: [" "]}, 
                           
                            {tag: "script", attrs: {src:"//d3js.org/d3.v3.min.js", charset:"utf-8"}}, 
{tag: "script", attrs: {src:"//d3js.org/topojson.v1.min.js"}}, 

{tag: "script", attrs: {type:"text/javascript"}





      
       
    }
  


   
           


              
                    ]}
                ]}
            ]}
        ]}
    ]}
                
             
	)
}
worldmap.wait= function() {

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



   {tag: "div", attrs: {class:"ui segment"}, children: [
  {tag: "div", attrs: {class:"ui active inverted dimmer"}, children: [
    {tag: "div", attrs: {class:"ui text loader"}, children: ["Loading"]}
  ]}, 
  {tag: "p", attrs: {}}
]}
           

                  ]}
              
                    ]}
                ]}
            ]}
        ]}
    ]}
                
             
  )
}
worldmap.view = function(){
  console.log("ctrl.login",ctrl.login)
  return(
  ctrl.login? this.load():this.wait()
  )
}



module.exports = worldmap;