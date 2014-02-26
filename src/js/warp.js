define(["can/view/mustache", "requirejs-text!../template/partial/warp.hbs",
    "warp/scaffold", "can/map"], function (can, template, Scaffold, Map) {

    "use strict";

    var renderer = can.view.mustache(template);

    return function(selector, options) {

        return new Scaffold(selector, {
            scope: new Map(options.scope),
            template: renderer
        });
    };
});