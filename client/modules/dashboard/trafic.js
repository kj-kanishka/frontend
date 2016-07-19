var auth = require('module/auth');

var trafic = {};
var ctrl = {};


var countries = require ('countries-cities').getCountries(); // Returns an array of country names. 
var cities = require ('countries-cities').getCities('India');
//CTRL
trafic.controller = function() {
	ctrl.startTime=m.prop("");
  ctrl.endTime=m.prop("");
auth.isLoggedIn(function(isLoggedIn) {
    if (!isLoggedIn) {
      m.route('/connect')
    }
  });
ctrl.project = m.prop(false);
ctrl.list=false
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
  ctrl.webpage = function(id){
        
        console.log("hi");
        console.log("id",id);
        ctrl.project_id=id;
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
ctrl.hidden=function(){
  if(!ctrl.list[0])
    $('#hidden').show()
}
ctrl.popup = function(ele){
    console.log("ele",ele);
    $(ele)
      .popup({
        inline   : true,
        hoverable: true,
   
  })
;
    
  }
  ctrl.dropdown = function(ele)
  {
    $(ele)
    .dropdown({onChange:function(value,text){console.log("value",value);
      ctrl.filter=value
      ctrl.device=null
      ctrl.location=null
      $("#location").dropdown('refresh')
      m.redraw(true)

  }})
;
  }
  ctrl.dropdown_device=function(ele)
  {
    $(ele)
    .dropdown({onChange:function(value,text){console.log("value",value);
      ctrl.device=value

  }})
;
  }
  ctrl.dropdown_location=function(ele)
  {
    $(ele)
    .dropdown({onChange:function(value,text){console.log("value",value);
      ctrl.location=value
      m.redraw(true)

  }})
;
  }
  ctrl.dropdown_city=function(ele)
  {
    console.log("ele");
    $(ele)
    .dropdown({onChange:function(value,text){console.log("value",value);
      ctrl.city=value

  }})
;
  }
ctrl.reset =function(){
    ctrl.list=false;
    m.redraw(true);

  }
  ctrl.realtime=function(id){
    m.cookie.set("websiteId", id);
    m.route('/realtime?websiteId='+id)

  }
  ctrl.apply=function(){
    console.log("ctrl.device",ctrl.device)
    console.log("ctrl.location",ctrl.location)
    console.log("websiteId",ctrl.project_id)
    if(ctrl.filter=='device')
    {
      
        var data={
          device:ctrl.device
        }
        var transport = m.prop();
        m
          .request({
            method: "PUT",
            url: m.urls("users",ctrl.project_id),
            data:data,
            config: transport,
            background: true

          })
          .then(function(dataa) {
            console.log("dta",dataa)

          });
          transport().onreadystatechange = function() {
      var res=JSON.parse(transport().responseText);
      console.log("response",res);
      if (transport().readyState == XMLHttpRequest.DONE) {
        console.log(" transport().status", transport().status)
        if (transport().status == 200) {
          console.log("data", res.data);
          ctrl.list=res.data;
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
    else
    {
      if(ctrl.filter=='location')
      {
        
      
            var data={
              city:ctrl.city,
              country:ctrl.location
            }
            var transport = m.prop();
            m
              .request({
                method: "POST",
                url: m.urls("users",ctrl.project_id),
                data:data,
                config: transport,
                background: true

              })
              .then(function(dataa) {
                console.log("dta",dataa)

              });
              transport().onreadystatechange = function() {
          var res=JSON.parse(transport().responseText);
          console.log("response",res);
          if (transport().readyState == XMLHttpRequest.DONE) {
            console.log(" transport().status", transport().status)
            if (transport().status == 200) {
              console.log("data", res.data);
              ctrl.list=res.data;
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
      else
        if(ctrl.filter=='time')
        {
          var start = new Date(ctrl.startTime()); // some mock date
            s = (start.getTime())/1000;
          var end = new Date(ctrl.endTime()); // some mock date
            e = (end.getTime())/1000;
          var data={
              start_time:s,
              end_time:e
            }
            var transport = m.prop();
            m
              .request({
                method: "POST",
                url: m.urls("users",ctrl.project_id,"time"),
                data:data,
                config: transport,
                background: true

              })
              .then(function(dataa) {
                console.log("dta",dataa)

              });
              transport().onreadystatechange = function() {
          var res=JSON.parse(transport().responseText);
          console.log("response",res);
          if (transport().readyState == XMLHttpRequest.DONE) {
            console.log(" transport().status", transport().status)
            if (transport().status == 200) {
              console.log("data", res.data);
              ctrl.list=res.data;
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
    }
  }
	return ctrl;
}




trafic.load = function() {

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
            {tag: "div", attrs: {class:"ui raised segment"}, children: [
              
                
                  function(){
                    if(ctrl.project())
                    {
                      return(

                  {tag: "div", attrs: {class:"ui cards"}, children: [
                  
                          
                            ctrl.pro.map(function(website){
                            return(
                              
                              {tag: "div", attrs: {class:"olive card"}, children: [
                                {tag: "div", attrs: {class:"content"}, children: [
                                  {tag: "div", attrs: {class:"header"}, children: [{tag: "font", attrs: {color:"green"}, children: [{tag: "i", attrs: {}, children: [website.website]}]}]}, 
                                  {tag: "div", attrs: {class:"extra content"}, children: [
                                  {tag: "div", attrs: {class:"ui vertical fluid tiny bottom attached buttons"}, children: [
                                    {tag: "button", attrs: {class:"ui button"}, children: [
                                    {tag: "a", attrs: {onclick:ctrl.realtime.bind(ctrl,website.websiteId)}, children: [
                                "Realtime Trafic on worldmap"]}
                              ]}, 
                              {tag: "button", attrs: {class:"ui button"}, children: [
                                  {tag: "a", attrs: {config:m.route, href:"/worldmap"}, children: ["  Overall User Trafic on worldmap"]}
                                ]}, 
                                 {tag: "button", attrs: {class:"ui button"}, children: [
                                  {tag: "a", attrs: {onclick:ctrl.webpage.bind(ctrl,website.websiteId)}, children: ["trafic on webpages"]}
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
                  }()
                

   
           

            ]}
              
            ]}
        ]}
    ]}
                
             
	)
}

trafic.pages = function() {
  
  

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
              {tag: "button", attrs: {class:"mini ui button", onclick:ctrl.reset}, children: [
                        "back"
                      ]}, 
                            {tag: "h1", attrs: {}, children: ["webpages : "]}, 
              {tag: "font", attrs: {color:"green"}, children: [{tag: "i", attrs: {}, children: [{tag: "h3", attrs: {}, children: [
              "Get number of user count on webpages by cooshing a filter"]}
              ]}
              ]}, 
              {tag: "br", attrs: {}}, {tag: "br", attrs: {}}, 

              {tag: "div", attrs: {class:"dropdown"}, children: [
              
              {tag: "div", attrs: {class:"ui selection dropdown", config:ctrl.dropdown}, children: [
  {tag: "input", attrs: {type:"hidden", name:"Filters"}, children: [" "]}, 
  {tag: "i", attrs: {class:"dropdown icon"}}, 
  {tag: "div", attrs: {class:"default text"}, children: ["Filters"]}, 
  {tag: "div", attrs: {class:"menu"}, children: [
    {tag: "div", attrs: {class:"item", "data-value":"no"}, children: ["No Filters"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"device"}, children: ["Device based"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"location"}, children: ["Location based"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"time"}, children: ["Time Based"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"duration"}, children: ["Duration Based"]}
  ]}
]}, 



  function(){
    console.log("inside function",(ctrl.filter))
    if(ctrl.filter=='time')
    {console.log("time")
      return(
    
  {tag: "div", attrs: {class:"time"}, children: [
        {tag: "div", attrs: {class:"ui input"}, children: [
            {tag: "input", attrs: {placeholder:"Start Time", type:"date", oninput:m.withAttr("value",ctrl.startTime), value:ctrl.startTime()}}
          ]}, 
          {tag: "div", attrs: {class:"ui input"}, children: [
            {tag: "input", attrs: {placeholder:"End Time", type:"date", oninput:m.withAttr("value",ctrl.endTime), value:ctrl.endTime()}}
          ]}
          ]}
)
}
    if(ctrl.filter=='location')
{console.log("location")
  return(
    
  {tag: "div", attrs: {class:"ui search selection dropdown", id:"location", config:ctrl.dropdown_location}, children: [
  {tag: "input", attrs: {type:"hidden", name:"Location"}, children: [" "]}, 
  {tag: "i", attrs: {class:"dropdown icon"}}, 
  {tag: "div", attrs: {class:"default text"}, children: ["select country"]}, 
  
  
    function(){
      return(
        {tag: "div", attrs: {class:"menu"}, children: [
        
           countries.map(function(country){
                    
                            return(
                              
    {tag: "div", attrs: {class:"item", "data-value":country}, children: [country]}
                          )

                      
                      })
        
        ]}
      )
    }()
        
  
  
]}
)
}

    if(ctrl.filter=='device')
    {console.log("device")
      return(
    
  {tag: "div", attrs: {class:"ui selection dropdown", config:ctrl.dropdown_device}, children: [
  {tag: "input", attrs: {type:"hidden", name:"Device"}, children: [" "]}, 
  {tag: "i", attrs: {class:"dropdown icon"}}, 
  {tag: "div", attrs: {class:"default text"}, children: ["select Device"]}, 
  {tag: "div", attrs: {class:"menu"}, children: [
    {tag: "div", attrs: {class:"item", "data-value":"Android"}, children: ["Android"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"IOS"}, children: ["IOS"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"desktop"}, children: ["Desktop"]}, 
    {tag: "div", attrs: {class:"item", "data-value":"others"}, children: ["others"]}
  
  ]}
]}
)
}
}(), 


  function(){
     if(ctrl.location)
     {
      var cities = require ('countries-cities').getCities(ctrl.location);
      console.log("cities",cities)
      if(cities)
       return(
    
  {tag: "div", attrs: {class:"ui search selection dropdown", id:"location", config:ctrl.dropdown_city}, children: [
  {tag: "input", attrs: {type:"hidden", name:"city"}, children: [" "]}, 
  {tag: "i", attrs: {class:"dropdown icon"}}, 
  {tag: "div", attrs: {class:"default text"}, children: ["select city"]}, 
  
  
    function(){
      return(
        {tag: "div", attrs: {class:"menu"}, children: [
        
           cities.map(function(city){
                    
                            return(
                              
    {tag: "div", attrs: {class:"item", "data-value":city}, children: [city]}
                          )

                      
                      })
        
        ]}
      )
    }()
        
  
  
]}
)
     }
    }(), 

  

    
{tag: "button", attrs: {class:"ui primary button", onclick:ctrl.apply}, children: ["submit"]}
]}, 
{tag: "br", attrs: {}}, {tag: "br", attrs: {}}, 
                
                  function(){
                  
                        return(
                         {tag: "div", attrs: {class:"ui relaxed divided list"}, children: [
                            
                            
                            ctrl.list.map(function(page){
                      console.log("page",page);
                            return(
                              


  {tag: "div", attrs: {class:"item"}, children: [
    {tag: "i", attrs: {class:"large browser middle aligned icon"}}, 
    {tag: "div", attrs: {class:"content"}, children: [
      {tag: "a", attrs: {class:"header"}, children: [page.address]}
    ]}, 
    {tag: "div", attrs: {class:"description"}, children: ["users according to filters :", 
    
        {tag: "h4", attrs: {}, children: [page.users]}
     
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
trafic.view = function() {
  console.log("ctrl.list",ctrl.list)
  return (
    ctrl.list ?  this.pages():this.load()
  )


}

module.exports = trafic;