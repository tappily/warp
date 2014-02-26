define(["can/control", "can/map", "can/map/list", "sylvester"], function (control, Map, List, $) {
    "use strict";
    return control.extend({
        defaults: {
            scope: null,
            template: null
        }
    }, {
        init: function() {
            var id = $.Matrix.I(3);

            var m = [].concat.apply([], [[1,0,0],[0,1,0],[0,0,1]]);

            this.options.scope.attr("figure.matrix.style", m.toString());
            console.log(this.options.scope);
            this.element.html("").append(this.options.template(this.options.scope));
        },
        "{scope} change": function() {
            console.log(arguments);
        }
    });
});