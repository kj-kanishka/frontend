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
        <div
         class="ui container"
         config={ ctrl.viewConfig }>
      { require('module/partials/header') }
      <div class="ui divider"></div>
      <br/>
      <div class="ui grid">
        <div class="four wide column">
          { require('module/partials/menu') }
        </div>
        <div
             class="twelve wide column"
             config={ Dashboard.SubRoutes }>
          <div class="ui column grid">
            <div class="column">
              <div class="ui raised segment">
                <h2>Your tasks</h2>
                <img
                     class="ui wireframe image"
                     src="http://semantic-ui.com/images/wireframe/paragraph.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );

}

Dashboard.company = function() {
    return (
        <div
         class="ui container"
         config={ ctrl.viewConfig }>
      { require('module/partials/header') }
      <div class="ui divider"></div>
      <br/>
      <div class="ui grid">
        <div class="four wide column">
          { require('module/partials/menu') }
        </div>
        <div class="twelve wide column">
          <div class="ui column grid">
            <div class="column">
              <div class="ui raised segment">
                <div class="ui compact message">
                  <p>
                    Add your company details to see your projects
                    <a href='/company'>add company</a>
                  </p>
                </div>
                <div class="ui segment">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

Dashboard.view = function(ctrl) {
    return (
        ctrl.comp() ? this.Load() : this.company()
    )

}

module.exports = Dashboard;
