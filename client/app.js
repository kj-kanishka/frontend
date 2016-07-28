require('transition');
require('form');
require('popup');
require('modal');
require('dimmer');
// require('jquery-address')
require('accordion');
require('state');
require('tabs');
require('mithril-global-request-headers')(m);
require('dropdown');
//m.addGlobalHeader('Content-Type', 'application/json');
m.cookie = require('cookie-monster');
m.route.mode = "pathname";

//custom animations
m.mainElement = document.body;
m.fadesOutPage = function(element, isInitialized, context) {

    if (!isInitialized) {
        element.onclick = function(e) {
            e.preventDefault()

            var elem = jQuery(m.mainElement);
            elem
                .transition({
                    animation: 'fade top',
                    onComplete: function() {
                        m.route(element.getAttribute("href"))
                        elem.transition('fade top')
                    }
                })
        }
    }
}



var api = 'http://localhost:3000'


m.urls = function(theClass, theObject, action) {
    var url = '';

    if (action) {
        url = api + '/' + theClass + '/' + theObject + '/' + action
    } else {
        if (theObject) {
            url = api + '/' + theClass + '/' + theObject
        } else {
            url = api + '/' + theClass
        }
    }

    return url;
}


//start the routings
require('./routes')