var auth = require('module/auth');

var test = {};
var ctrl = {};
ctrl.user=m.prop("");
ctrl.Outgoing=m.prop("");
var value={
  name:"India",
  user:"6"
}
console.log("value.name",value.name)
var wsUri = 'ws://graph.livetest.io/traffic/1285';
  var output;
     function init()
  {
    console.log("init")
    output = document.getElementById("output");
    testWebSocket();
  }

  function testWebSocket()
  {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt)
  {
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
  }

  function onClose(evt)
  {
    console.log("DISCONNECTEDdi")
    writeToScreen("DISCONNECTED");
  }

  function onMessage(evt)
  {
    ctrl.user=m.prop(evt.data)
        console.log("onmsg",evt.data);
        m.redraw(true);
   // writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    //websocket.close();
  }

  function onError(evt)
  {
    console.log("error",evt.data)
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend(message)
  {
    ctrl.Outgoing=m.prop(message);
    websocket.send(message);
    m.redraw(true);
  }

  function writeToScreen(message)
  {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
  }

  window.addEventListener("load", init, false);



//CTRL
test.controller = function() {
	

ctrl.msg=function(message){

console.log("message",message)
  doSend(message)

}.bind(ctrl);  
	
 
$(function()
  {

    var width = 750;
    height = 480;

var projection = d3.geo.equirectangular()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);



var graticule = d3.geo.graticule();
console.log("d3.select",d3.select("#mymap"))
    //console.log("its a function")
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
d3.json("http://localhost:8000/test", function(error, world) {
  console.log("hi")
  if (error) 
    {
      //console.log("error",error)
      throw error;
    }
    var countries = topojson.feature(world, world.objects.countries),
      geometries = countries.features;
  
  
 /*
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
        .attr("x", function(d) { return path.centroid(d)[0]; })
        .attr("y", function(d) { return path.centroid(d)[1]; });
        //console.log("max_user",max_user);

*/

 

svg.selectAll(".land")
        .data(geometries)
        .enter()
          .append("path")
          .attr("class", "land")
          .attr("id",function(d){return d.properties.name})
          .attr("d", path)
          .on("mouseover", function(d) {   
          //console.log("hi");   
          div.transition()        
                .duration(200)      
                .style("opacity", .9) ;

            div.html(d.properties.name)  
                   .attr("x", function(d) { return path.centroid(d)[0]; })
        .attr("y", function(d) { return path.centroid(d)[1]; });
                      
            
            })
            .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })
         .style("fill","white")
          .style("stroke","black");

});

});
 

ctrl.now=function(){
  console.log("called");
  $(function()
{
   var div = d3.select("#mymap").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

d3.select("#"+value.name)
.on("mouseover", function(d) {   
          //console.log("hi");   
          div.transition()        
                .duration(200)      
                .style("opacity", .9) ;

            div.html(value.user+ "<br/>" + value.name)  
                  
                      
            
            })
            .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })
.style("fill",function(d){console.log("test"); return "black"})

})
}




	return ctrl;
}




test.view = function(ctrl) {

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
                            {tag: "div", attrs: {id:"mymap"}, children: [" "]}, 
                            {tag: "script", attrs: {src:"//d3js.org/d3.v3.min.js", charset:"utf-8"}}, 
{tag: "script", attrs: {src:"//d3js.org/topojson.v1.min.js"}}, 

{tag: "script", attrs: {type:"text/javascript"}





      
       
    }, 
  


   
           
{tag: "div", attrs: {id:"output"}, children: [
{tag: "button", attrs: {class:"mini ui button", onclick:ctrl.now}, children: [
                        "send"
                      ]}, 
                      {tag: "h4", attrs: {}, children: [" Outgoing message : ", ctrl.Outgoing()]}, 
                      {tag: "h5", attrs: {}, children: ["incoming message : ", ctrl.user(), " "]}
]}

              
                        ]}
                    ]}
                ]}
            ]}
        ]}
    ]}
                
             
	)
}



module.exports = test;