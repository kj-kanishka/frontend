var Signup = {};


Signup.loaded = m.prop(false);

//CTRL
Signup.controller = function() {

	var ctrl = {};

	ctrl.loaded = m.prop(false);

	ctrl.transport = m.prop();

	ctrl.user = m.prop({});
	/*
		ctrl.init = function(element, isInitialized, context){
			//height of init loader
			jQuery(element).height(jQuery("body").height());

			var self = this;
			this.user = m.prop([]);

			//first request
			m
			.request({
				method: "GET",
				url: "http://localhost:8888/",
				config: ctrl.transport
			})
			.then(ctrl.user);


			ctrl.transport().onprogress = function(evt){
			
			    if (evt.lengthComputable) 
				   {  
				     var percentComplete = (evt.loaded / evt.total)*100;  
				     ctrl.loaded(true);
				   }
			}

			return this;
		}
	*/
	return ctrl;

}

Signup.load = function(ctrl) {

	return require('module/loader').view(ctrl.init);
}

Signup.form = function(ctrl) {

	return (
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
		  {tag: "div", attrs: {class:"column"}, children: [
		    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
		      {tag: "div", attrs: {class:"content"}, children: [
		      "Sign In To Your Account"
		      ]}
		    ]}, 
		    {tag: "form", attrs: {class:"ui large form"}, children: [
		      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"user icon"}}, 
		            {tag: "input", attrs: {type:"text", name:"email", placeholder:"E-mail address"}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"field"}, children: [
		          {tag: "div", attrs: {class:"ui left icon input"}, children: [
		            {tag: "i", attrs: {class:"lock icon"}}, 
		            {tag: "input", attrs: {type:"password", name:"password", placeholder:"Password"}}
		          ]}
		        ]}, 
		        {tag: "div", attrs: {class:"ui fluid large teal submit button"}, children: ["Sign in "]}
		      ]}, 

		      {tag: "div", attrs: {class:"ui error message"}}

		    ]}, 

		    {tag: "div", attrs: {class:"ui message"}, children: [
		      "New to us? ", {tag: "a", attrs: {config:m.fadesOutPage, href:"/connect"}, children: ["Signup"]}
		    ]}
		  ]}
		]}
	)
}

Signup.view = function(ctrl) {

	return Signup.form(ctrl)
}


module.exports = Signup;