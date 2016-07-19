var Menu = {};
var Graph = require('module/graph')
	//CTRL
var ctrl = {}
Menu.controller = function() {

$('').modal('hide');
}


Menu.view = function() {
	return (
		{tag: "div", attrs: {class:"ui vertical menu"}, children: [
		  {tag: "a", attrs: {class:"teal active item", config:m.route, href:"/website"}, children: [
		    "Add Website", 
		    {tag: "div", attrs: {class:"ui teal label"}, children: ["+"]}
		  ]}, 


		   {tag: "a", attrs: {class:"item", config:m.route, href:"/dashboard"}, children: ["  List Websites", 
		   {tag: "div", attrs: {class:"ui label"}}
		   ]}, 
		  
		  {tag: "a", attrs: {class:"item", config:m.route, href:"/trafic"}, children: [
		    "trafic", 
		    {tag: "div", attrs: {class:"ui label"}, children: ["1"]}
		  ]}, 
		  
		  {tag: "div", attrs: {class:"item"}, children: [
		    {tag: "div", attrs: {class:"ui transparent icon input"}, children: [
		      {tag: "input", attrs: {type:"text", placeholder:"Search..."}}, 
		      {tag: "i", attrs: {class:"search icon"}}
		    ]}
		  ]}
		]}
	)
}


module.exports = Menu;