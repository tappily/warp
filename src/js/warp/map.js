define(["can/map/attributes", "warp/figure"], function(map, Figure) {
    "use strict";
    return map.extend({
        attributes: {
            "figure": function(raw) {
                return new Figure(raw);
            }
        }
    }, {});
});