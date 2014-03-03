define(["can/map", "warp/transform", "can/list"], function (map ,transform, List) {
    "use strict";

    return map.extend({
        init: function (options) {
            var o = options.origin,
                w = options.width,
                h = options.height;

            var vector = [
                [o[0], o[1]],
                [o[0] + w, o[1]],
                [o[0] + w, o[1] + h],
                [o[0], o[1] + h]
            ];

            this.attr("origin", new List(vector));
            this.attr("vector", new List(vector));

            this.delegate("vector", "set", can.proxy(function (ev, val) {
                if (val) {

                    var o = this.attr("origin");
                        v = this.attr("vector");

                    var X = transform(o, v);
                    var e = ev.target.attr("vector") || ev.target;

                    var style = "left:" + e[0][0].toPrecision(4) + "vw;top:" + e[0][1].toPrecision(4) + "vh;" +
                        "-webkit-transform:matrix3d(" +
                        X.mat[0][0] + "," + X.mat[3][0] + ", 0," + X.mat[6][0] + "," +
                        X.mat[1][0] + "," + X.mat[4][0] + ", 0," + X.mat[7][0] +
                        ",0, 0, 1, 0," +
                        X.mat[2][0] + "," + X.mat[5][0] + ", 0, 1)";

                    this.attr("style", style);
                } else {
                    this.removeAttr("style");
                }
            }, this));
        },
        updateVertex: function(config, newValue) {
            for(var i= 0,l=config.length;i<l;i++) {
                if(config[i]) {
                    this.attr("vector").attr(i, newValue);
                }
            }
        }
    });
});