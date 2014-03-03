define(["can", "can/control", "can/map/attributes", "can/list", "sylvester", "warp/corner/control"],
    function (can, control, map, List, $, Control, transform) {
        "use strict";

        return control.extend({
            defaults: {
                scope: null,
                template: null
            }
        }, {
            init: function() {

                this.corners = new List();

                //bind data to template
                this.element.html("").append(this.options.template(this.options.scope));

                can.each(this.options.scope.attr("figure.corners"), can.proxy(function(e) {

                    this.corners.push(new Control(window.document.getElementById(e.attr("id")), {
                        model: e
                    }));

                }, this));

                //this.options.scope.attr("figure.style", "-webkit-transform:translate3d(20%,10%,0)");
                //console.log(this.options.scope.attr("figure.corners"));
            },
            "{scope.figure.corners} change": function(el, ev,what,how,val) {
                var v = ev.target.attr("vertices");
                for(i=0,l=v.length;i<l;i++) {
                    var face = this.options.scope.attr("figure.faces."+v[i].attr("cell"));
                    if(face) {
                        face.updateVertex(v[i].vert, val.elements);
                    }
                }
            }
        });
});