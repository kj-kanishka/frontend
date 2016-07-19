var auth = require('module/auth');

var Dashboard = {};

require('transition');



Dashboard.SubRoutes = function(element) {}
var ctrl = {};


//CTRL
Dashboard.controller = function() {

    ctrl.comp = m.prop(false)

    //redirect if cookie doesnt exists.
    auth.isLoggedIn(function(isLoggedIn) {
        console.log("Dashboard111",isLoggedIn)
        if (!isLoggedIn) {

            m.route('/connect');
        }
    });

    auth.iscompany(function(c) {
        //ctrl.comp = m.prop(false)
        console.log("c=", c)
        ctrl.comp(c)
    })

    ctrl.DashboardElement = m.prop();

    ctrl.viewConfig = function(element) {
        var elm = jQuery(element);
        ctrl.DashboardElement = m.prop(elm);
    };

    ctrl.fadeOut = function(element) {
        var elem = jQuery(element);

        elem
            .transition({
                animation: 'fade out',
                onComplete: function() {
                    m.redraw(true);

                    ctrl.DashboardElement()
                        .transition('fade in');
                }
            })
    }


    return ctrl;
}


Dashboard.Load = function() {

    return (
        {tag: "div", attrs: {
         class:"ui container", 
         config: ctrl.viewConfig}, children: [
       require('module/partials/header'), 
      {tag: "div", attrs: {class:"ui divider"}}, 
      {tag: "br", attrs: {}}, 
      {tag: "div", attrs: {class:"ui grid"}, children: [
        {tag: "div", attrs: {class:"four wide column"}, children: [
           require('module/partials/menu') 
        ]}, 
        {tag: "div", attrs: {
             class:"twelve wide column", 
             config: Dashboard.SubRoutes}, children: [
          {tag: "div", attrs: {class:"ui column grid"}, children: [
            {tag: "div", attrs: {class:"column"}, children: [
              {tag: "div", attrs: {class:"ui raised segment"}, children: [
                {tag: "h2", attrs: {}, children: ["Your tasks"]}, 
                {tag: "img", attrs: {
                     class:"ui wireframe image", 
                     src:"http://semantic-ui.com/images/wireframe/paragraph.png"}}
              ]}
            ]}
          ]}
        ]}
      ]}
    ]}
    );

}

Dashboard.company = function() {
    return (
        {tag: "div", attrs: {
         class:"ui container", 
         config: ctrl.viewConfig}, children: [
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
                {tag: "div", attrs: {class:"ui compact message"}, children: [
                  {tag: "p", attrs: {}, children: [
                    "Add your company details to see your projects", 
                    {tag: "a", attrs: {href:"/company"}, children: ["add company"]}
                  ]}
                ]}, 
                {tag: "div", attrs: {class:"ui segment"}
                }
              ]}
            ]}
          ]}
        ]}
      ]}
    ]}
    )
}

Dashboard.view = function(ctrl) {
    return (
        ctrl.comp() ? this.Load() : this.company()
    )

}

module.exports = Dashboard;
