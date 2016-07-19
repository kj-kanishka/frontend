var routes = {

	"/": require('module/home/index'),
	"/signup": require('module/home/connect'),
	"/login": require('module/home/login')
}


m.route(m.mainElement, "/", routes);