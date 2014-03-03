define(["can", "can/control", "can/map", "sylvester", "warp/corner/control"], function (can, control, Map, $, Control) {
    "use strict";

    return control.extend({
        defaults: {
            scope: null,
            template: null
        }
    }, {
        init: function() {
            this.corners = [];
            this.element.html("").append(this.options.template(this.options.scope));
            can.each(this.options.scope.attr("figure.corners"), can.proxy(function(e) {
                this.corners.push(new Control(window.document.getElementById(e.attr("id")), {
                    model: e
                }));
            }, this));
            this.options.scope.attr("figure.style", "-webkit-transform:translate3d(10%,10%,0)");
            console.log(this.options.scope.attr("figure.corners"));
        }
    });
});