var auth = require('module/auth');

var chat = {};
var ctrl = {};

chat.controller = function() {

ctrl.message=m.prop("");

  ctrl.onLoad = function(){
    console.log("onLoad");
    console.log("require")
      var io = require('websocket');
      socket = io.connect('http://graph.livetest.io:8888/socket.io/');
          socket.on('connect', function(){
            console.log("connected");

          });
      socket.on('message', function(message){
        console.log("message",message)
        console.log("token",message.Token)
        });
  }

  ctrl.keypress = function() {
    console.log("messagesent",ctrl.message())
      socket.emit('message',ctrl.message());
      ctrl.message("")
      
}
  ctrl.onLoad()
	return ctrl;
}




chat.view = function() {

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
                         {tag: "input", attrs: {type:"text", name:"message", placeholder:"message", oninput:m.withAttr("value",ctrl.message), value:ctrl.message()}}, 
              
        {tag: "button", attrs: {type:"submit", class:"ui button", onclick:ctrl.keypress}, children: ["Send "]}
   
              
                        ]}
                    ]}
                ]}
            ]}
        ]}
    ]}
                
             
	)
}


module.exports = chat;