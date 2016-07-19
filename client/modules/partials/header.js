
var Menu = require('module/partials/menu');
var Header = {};

var auth = require('module/auth');
var ctrl={}
//CTRL
Header.controller = function(){

auth.isLoggedIn(function(isLoggedIn) {
    if (!isLoggedIn) {
      m.route('/connect')
    }
    else
    {
      
        ctrl.user=isLoggedIn.data.user
        ctrl.login=1;
        m.redraw(true)
          }
  });
return ctrl
}

Header.config = function(ctrl){

	return function(element,isInit){
	}
};

var slideout;

Header.sidebarIcon =  function(element,isInit){

	slideout = new Slideout({
	    'panel': element,
	    'menu': Menu.Elements.sidebar,
	    'padding': 120,
	    'tolerance': 20
	});
	element.onclick = function(e){
		e.preventDefault(); 
		slideout.toggle();
	}
}

Header.view = function(){
	return (
			{tag: "div", attrs: {}, children: [
				{tag: "br", attrs: {}}, 
				{tag: "i", attrs: {}, children: [" welcome ", ctrl.user.firstname, " ", ctrl.user.lastname]}, 
				{tag: "div", attrs: {class:"ui secondary menu"}, children: [
			    	{tag: "div", attrs: {class:"ui compact menu"}, children: [
					    {tag: "a", attrs: {class:"item"}, children: [
					      {tag: "i", attrs: {class:"icon announcement"}}, " Milestones"
					    ]}, 
					    {tag: "a", attrs: {class:"item", href:"/", config:m.route}, children: [
						    {tag: "i", attrs: {class:"icon mail"}}, " Conversation"
						]}
					]}, 
				    
				    {tag: "div", attrs: {class:"right menu"}, children: [
					  {tag: "a", attrs: {class:"item", href:"/settings"}, children: [
				        "Settings"
				      ]}, 
				      {tag: "a", attrs: {class:"item", onclick:$('').modal('hide'), href:"/logout", config:m.route}, children: [
				        "Logout"
				      ]}
					]}

			  	]}

		  	]}
		 )


}


module.exports = Header;