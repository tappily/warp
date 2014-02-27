define(["can", "sylvester", "can/map/attributes", "can/map/delegate"], function(can, $, map) {
    "use strict";
    return map.extend({
        attributes: {
            "style": function(raw) {
                return raw;
            },
            "vector": function(raw) {
                return new $.V(raw);
            }
        }
    }, {
        init: function() {
            this.delegate("vector", "set", can.proxy(function(ev, val){
                if(val) {
                    this.attr("style", "left:"+val.elements[0]+"%;top:"+val.elements[1]+"%");
                } else {
                    this.removeAttr("style");
                }
            }, this));
        }
    });
});