var auth = require('module/auth');

var realtime = {};
var ctrl = {};
var obj={"Type":"worldmap","Data":{"websiteId":1285}}
realtime.controller = function() {
  ctrl.world=false;
  ctrl.user=m.prop("");
  ctrl.state=m.prop("");
  ctrl.ErrorMsg=m.prop("");
ctrl.Outgoing=m.prop("");
//CTRL
var websiteId = document.baseURI.split("=")[1] || m.cookie.get("websiteId");
  
  ctrl.websiteId=JSON.parse(websiteId)
         console.log("charts",typeof(ctrl.websiteId))          
  
ctrl.obj={
          "Type":"worldmap",
          "Data":
          {
            "websiteId":ctrl.websiteId
          }
        }
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


ctrl.data=[];
ctrl.max_user=0;
var wsUri = 'ws://graph.livetest.io:8888/socket';
  var output;
     function init()
  {
    //console.log("init")
   
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
     ctrl.state=m.prop("connected");
    doSend(JSON.stringify(ctrl.obj));
  }

  function onClose(evt)
  {
    //console.log("DISCONNECTEDd",evt)
    ctrl.state=m.prop("DISCONNECTED");
    m.redraw(true)
    init()
  }

  function onMessage(evt)
  {
    console.log("onmsg",evt)
    ctrl.user=m.prop(evt.data)
    ctrl.evt=JSON.parse(evt.data)

    ctrl.max_user=ctrl.evt.max_user;
    ctrl.array=Object.keys(ctrl.evt.data)
   // console.log("ctrl.array",ctrl.array)
   // console.log("ctrl.a",ctrl.array.length)

    for(i=0;i<ctrl.data.length;i++)
    {
      for(j=0;j<ctrl.array.length;j++)
      {
        name=ctrl.array[j].replace(" ","-");
        if(ctrl.data[i].country==name)
        {

          ctrl.data[i].count=ctrl.evt.data[ctrl.array[j]];
        }
      }
    
    }
    
    //console.log("ctrl.data",ctrl.array)
    ctrl.now()
    //console.log("")
        //console.log("onmsg",evt);
        m.redraw(true);
   // writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    //websocket.close();
  }

  function onError(evt)
  {
    //console.log("error",evt.data)
  }

  function doSend(message)
  {
    console.log("doSend",message)
    ctrl.Outgoing=m.prop(message);
    websocket.send(message);
    m.redraw(true);
  }

 

      window.addEventListener("load", false);


ctrl.msg=function(message){

//console.log("message",message)
  doSend(message)
}.bind(ctrl);  
  




ctrl.now=function(){
  //console.log("called",d3.select("#count"));
  $(function()
{
   var div = d3.select("#count")
   
for(i=0;i<ctrl.data.length;i++)
{
  //console.log("ctrl.data[i].country",ctrl.data[i])
  document.getElementById(ctrl.data[i].country).setAttribute("count",ctrl.data[i].count)
d3.select("#"+ctrl.data[i].country)

.on("mouseover", function(d) {   
          //console.log("hi",document.getElementById(d.properties.name).getAttribute("count"));   
          div.transition()              
                .style("opacity", .9) ;

            div.html(document.getElementById(d.properties.name).getAttribute("count")+ "<br/>" + d.properties.name)  
                  
                      
            
            })
            .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })
.style("fill",function(d){
  //console.log("d",d.properties);
  if(ctrl.data[i].count==0)
    return "white"
  else
  {
          half=ctrl.max_user/2
            less=half/2
            more=half+less
          if(ctrl.data[i].count<more)
            if(ctrl.data[i].count<half)
              if(ctrl.data[i].count<less)
                
                return "#ECF8F8"
              else
                return "#CDEEEE"
            else
              return "#AEE3E3"
          else
            return "#8FD8D8"

  }
        })
}
})

}
ctrl.world_map=function(ele){

if(ctrl.world==false)
  {


 
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
    var svg = d3.select("#mymap")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);
  svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

  var div = d3.select("#name").style("opacity", 0);

  var g = svg.append("g");
  var max_user=0;
  ctrl.world=true
d3.json("http://admin.livetest.io/worldmap", function(error, world) {

    
      if (error) 
        {
          ////console.log("error",error)
          throw error;
        }
        var countries = topojson.feature(world, world.objects.countries),
          geometries = countries.features;
      
    svg.selectAll(".land")
            .data(geometries)
            .enter()
              .append("path")
              .attr("class", "land")
              .attr("id",function(d){
                var data={
                  country:d.properties.name,
                  count:0
                };
                ctrl.data.push(data);
                return d.properties.name})
              .attr("d", path)
             .style("fill","white")
              .style("stroke","black");
              init();

    });


});
}
 



}



	return ctrl;
}




realtime.load = function() {

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
                            {tag: "div", attrs: {id:"mymap", config:ctrl.world_map}, children: [" "]}, 
                            {tag: "div", attrs: {id:"name"}, children: [" "]}, 
                            {tag: "div", attrs: {id:"count"}}, 
                            {tag: "script", attrs: {src:"//d3js.org/d3.v3.min.js", charset:"utf-8"}}, 
                              {tag: "script", attrs: {src:"//d3js.org/topojson.v1.min.js"}}, 

                                {tag: "script", attrs: {type:"text/javascript"}
       
              }, 
  


   
           
{tag: "div", attrs: {id:"output"}}, 
{tag: "button", attrs: {class:"mini ui button", onclick:ctrl.msg.bind(ctrl,JSON.stringify(ctrl.obj))}, children: [
                        "send"
                      ]}, 
                      {tag: "h4", attrs: {}, children: [" Outgoing message : ", ctrl.Outgoing()]}, 
                      {tag: "h5", attrs: {}, children: ["incoming message : ", ctrl.user(), " "]}, 
                      {tag: "p", attrs: {}, children: ["Connection state : ", ctrl.state()]}


              
                        ]}
                    ]}
                ]}
            ]}
        ]}
    ]}
                
             
	)
}
realtime.wait= function() {

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
realtime.view = function(){
  //console.log("ctrl.login",ctrl.login)
  return(
  ctrl.login? this.load():this.wait()
  )
}


module.exports = realtime;