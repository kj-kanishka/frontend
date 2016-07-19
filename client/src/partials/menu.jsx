var Menu = {};
var Graph = require('module/graph')
	//CTRL
var ctrl = {}
Menu.controller = function() {

$('').modal('hide');
}


Menu.view = function() {
	return (
		<div class="ui vertical menu">
		  <a class="teal active item" config={m.route} href="/website">
		    Add Website
		    <div class="ui teal label">+</div>
		  </a>


		   <a class="item" config={m.route} href="/dashboard">  List Websites
		   <div class="ui label"></div>
		   </a>
		  
		  <a class="item" config={m.route} href="/trafic">
		    trafic
		    <div class="ui label">1</div>
		  </a>
		  
		  <div class="item">
		    <div class="ui transparent icon input">
		      <input type="text" placeholder="Search..." />
		      <i class="search icon"></i>
		    </div>
		  </div>
		</div>
	)
}


module.exports = Menu;