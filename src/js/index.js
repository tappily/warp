require(["can", "requirejs-text!../data/index/warp.json", "warp"], function (can, json, warp) {
    "use strict";

    var conf = can.$.parseJSON(json);

    warp("div[data-warp]", {
        scope: conf
    });
});