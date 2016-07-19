var auth = require('module/auth');

var company = {}


var ctrl = {}
ctrl.company = m.prop(false);
ctrl.verify = m.prop(false)
company.controller = function() {
    console.log("company");
    auth.isLoggedIn(function(isLoggedIn) {
        ctrl.check=1;
        if (!isLoggedIn) {
            m.route('/connect')
        }
        else
        {
            auth.iscompany(function(comp) {
        
        console.log("ctrl",ctrl.check)
        console.log("company=", comp)
        ctrl.company(comp)

    })
        }
    });
    ctrl.ErrorMsg=m.prop("");


    //redirect if cookie doesnt exists.


    ctrl.name = m.prop(""),
    ctrl.description = m.prop(""),
    ctrl.website = m.prop("")

    auth.isverified(function(verify) {
        console.log("verify=", verify)
        ctrl.verify(verify)
    })
    ctrl.Validate = function(elem) {
        m.startComputation()
        console.log(jQuery(elem))
        element = jQuery(elem);
        element.form({
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter company name'
                    }]
                },
                description: {
                    identifier: 'description',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter a description'
                    }]
                },
                website: {
                    identifier: 'website',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter a website'
                    }]
                },
                terms: {
                    identifier: 'terms',
                    rules: [{
                        type: 'checked',
                        prompt: 'You must agree to the terms and conditions'
                    }]
                }
            },
            onSuccess: function(e) {
                
                console.log("onSuccess");
                ctrl.submit();
                e.preventDefault();
                return
            // todo

            }
        });
    }
    ctrl.submit = function() {
        
        console.log("submit");
        ctrl.newCompany = {
            name: ctrl.name(),
            description: ctrl.description(),
            website: ctrl.website()
        }
        var transport = m.prop();
        m
        .request({
            method: "POST",
            url: m.urls("company"),
            data: ctrl.newCompany, //new Object({"test":"test"})
            config: transport,
            background: true
        })
        .then(function(data) {
            console.log("then1", data);
            m.route("/dashboard");
        });
        transport().onreadystatechange = function() {
            console.log("111111");
            var res=JSON.parse(transport().responseText);
            console.log(res);
            if (transport().readyState == XMLHttpRequest.DONE) {
                //console.log(" transport().status", transport().status)
                if (transport().status == 200) {
                    console.log("submit if");
                    
                    m.route("/dashboard");
                    transport().abort();
                    m.endComputation();
                    return
                    
                } else {
                    console.log("submit else")
                            ctrl.ErrorMsg=m.prop(res.userMessage)               
                            console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
                            m.redraw(true);
                            transport().abort();
                            m.endComputation();
                            return 

                }


            }
        }


    }

    return ctrl;
}

company.load = function() {



    return (
    {tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
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
                        {tag: "h2", attrs: {}, children: ["Add Company"]}, 


                            
                                function(){

                                    if(ctrl.verify())
                                    {
                                    return (

                                        {tag: "form", attrs: {class:"ui large form", config:ctrl.Validate}, children: [

                                            {tag: "div", attrs: {class:"ui stacked segment"}, children: [
                                                {tag: "div", attrs: {class:"field"}, children: [
                                                    {tag: "div", attrs: {class:"ui left icon input"}, children: [
                                                    {tag: "i", attrs: {class:"certificate icon"}}, 
                                                        {tag: "input", attrs: {type:"text", name:"name", placeholder:"Company Name", oninput:m.withAttr("value",ctrl.name), value:ctrl.name()}}
                                                    ]}

                                                ]}, 
                                                    {tag: "div", attrs: {class:"field"}, children: [
                                                        {tag: "div", attrs: {class:"ui left icon input"}, children: [
                                                        {tag: "i", attrs: {class:"align center icon"}}, 
                                                            {tag: "input", attrs: {type:"text", name:"description", placeholder:"Description", oninput:m.withAttr("value",ctrl.description), value:ctrl.description()}}
                                                        ]}
                                                    ]}, 
                                                    {tag: "div", attrs: {class:"field"}, children: [
                                                        {tag: "div", attrs: {class:"ui left icon input"}, children: [
                                                        {tag: "i", attrs: {class:"browser icon"}}, 
                                                            {tag: "input", attrs: {type:"text", name:"website", placeholder:"Website", oninput:m.withAttr("value",ctrl.website), value:ctrl.website()}}
                                                        ]}
                                                    ]}, 
                                                    {tag: "button", attrs: {type:"submit", class:"ui primary button"}, children: [
                                                        "Submit"
                                                    ]}
                                                ]}, 
                                            {tag: "div", attrs: {class:"ui error message"}}
                                        ]}
                                        )
                                    }
                                    else
                                    {
                                        console.log("hi");
                                        return (
                                            {tag: "div", attrs: {class:"ui info message"}, children: [

                                          

                                                "Get all the best inventions in your e-mail every day. verify your email id now!",    

                                                  {tag: "a", attrs: {config:m.route, href:"/verification"}, children: ["   verify emali"]}
                                                
                                            ]}

                                            )
                                    }
                                }(), 
                            
                            
                                function(){
                                    console.log("ctrl.ErrorMsg()",ctrl.ErrorMsg())
                                    if(ctrl.ErrorMsg())
                                        return(
                                              {tag: "div", attrs: {class:"ui warning message"}, children: [
                                              {tag: "i", attrs: {class:"close icon"}}, 
                                              {tag: "div", attrs: {class:"header"}, children: [
                                              
                                                ctrl.ErrorMsg()
                                              ]}
                                              
                                            ]}
                                            )
                                }()
                            
                        ]}
                    ]}
                ]}
            ]}
        ]}
    ]}
    )
}


company.view = function() {
console.log("ctrl.check",ctrl.check)

return (
    ctrl.check ?
(ctrl.company() ? m.route("/dashboard") : this.load() ): require('module/loader')
)


}

module.exports = company;
