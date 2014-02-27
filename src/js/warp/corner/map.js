define(["can/map/attributes", "sylvester"], function(map, $) {
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
    }, {});
});