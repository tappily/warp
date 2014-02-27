define(["can/control", "can/map", "sylvester"], function (control, Map, $) {
    "use strict";
    return control.extend({
        defaults: {
            scope: null,
            template: null
        }
    }, {
        init: function() {
            this.element.html("").append(this.options.template(this.options.scope));
            this.options.scope.attr("figure.style", "background-color: green; height: 500px");
        },
        "{scope} change": function() {
            console.log(arguments);
        },
        "menu li click": function(el, ev) {

            //el.css({ top: ev.pageY+"px", left: ev.pageX+"px"});
        }
    });
});