define(["can/control", "can-touch"], function(control, touch) {
     "use strict";
    return control.extend({
        defaults: {
            model: null
        }
    }, {
        init: function() {
            this.origin = this.element.offsetParent();
            this.options.touch = touch(this.element, {
                preventDefault: true,
                sticky: true
            });
        },
        " onetouchmove": function(el, ev, touch) {

            var o = this.origin.offset(),
                t = touch.point.y - o.top,
                l = touch.point.x - o.left,
                x = l / this.origin.width() * 100,
                y = t / this.origin.height() * 100;

            this.options.model.attr("vector", [x, y]);
        }
    });
});
