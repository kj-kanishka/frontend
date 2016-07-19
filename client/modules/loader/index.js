
var Bullet = require('bullet');
var Auth = require('module/auth');
var Loader = {};


//CTRL
Loader.controller = function(){

}

Loader.random = function(){
	var maximum = 7;
	var minimum = 0;
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

Loader.randomValue = m.prop(Loader.random());

Loader.list = [
	"Sit tight, something is building up...",
	"When the rock is cooking..",
	"Gosh! SOmething goota work.",
	"lorem sir",
	"ipsum sir",
	"dummy sir",
	"idly sir?",
	"dosa sir?"
]
Loader.view = function(onload){

	Bullet.on('change_loading_text',function(){
		Loader.randomValue = m.prop(Loader.random());
		m.redraw("diff");
	});

	//Increase the height of this object
	var height = function(element){
		jQuery(element).height(jQuery("body").height());
	}
	//abort();
	
	console.log(Auth.UserData());

	return (
			{tag: "div", attrs: {class:"ui segment", config:height}, children: [
			  {tag: "div", attrs: {class:"ui active dimmer", config:onload}, children: [
			    {tag: "div", attrs: {class:"ui large indeterminate text loader"}, children: [
			    	Loader.list[Loader.randomValue()]
			    ]}
			  ]}, 
			  {tag: "p", attrs: {}}
			]}
		)
	
}


module.exports = Loader;