define(["can", "can/map/attributes", "warp/corners", "warp/face"], function(can, map, Corners, Face) {
    "use strict";

    return map.extend({
        attributes: {
            "corners": function(raw) {
                return new Corners(raw);
            },
            "cols": "number",
            "rows": "number"
        }
    }, {
            init: function(options) {
                var rows = options.rows || 0,
                    cols = options.cols || 0,
                    faces = new Array(cols * rows),
                    w = (100 / options.cols),
                    h = (100 / options.rows),
                    o = options.origin || [0,0];

                for(var i = 0, j = -1, l=faces.length; i< l; i++) {

                    j = (i % cols) ? j : (j + 1);

                    faces[i] = new Face({
                        origin: [o[0] + w * (i % cols), o[1] + h * j],
                        width: w,
                        height: h
                    });
                }

                this.attr("faces", faces);
            }
    });
});