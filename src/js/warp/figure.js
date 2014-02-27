define(["can/map/attributes", "warp/corners"], function(map, Corners) {
    "use strict";
    return map.extend({
        attributes: {
            "corners": function(raw) {
                return new Corners(raw);
            }
        }
    }, {

    });
});