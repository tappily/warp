define(["can/list", "warp/corner/map"], function(list, Corner) {
    "use strict";
    return list.extend({
        init: function(a) {
            for(var i= 0, l = a.length; i<l; i++) {
                this.attr(i, new Corner(a[i]));
            }
            return this;
        }
    });
});