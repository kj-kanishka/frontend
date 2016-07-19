
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
			<div>
				<br/>
				<i> welcome {ctrl.user.firstname} {ctrl.user.lastname}</i>
				<div class="ui secondary menu">
			    	<div class="ui compact menu">
					    <a class="item">
					      <i class="icon announcement"></i> Milestones
					    </a>
					    <a class="item" href="/" config={m.route}>
						    <i class="icon mail"></i> Conversation
						</a>
					</div>
				    
				    <div class="right menu">
					  <a class="item" href="/settings">
				        Settings
				      </a>
				      <a class="item" onclick={$('').modal('hide')} href="/logout" config={m.route}>
				        Logout
				      </a>
					</div>

			  	</div>

		  	</div>
		 )


}


module.exports = Header;