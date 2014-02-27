require.config({
    baseUrl: 'src/js',
    paths: {
        can: '../../bower_components/canjs/amd/can',
        jquery: '../../bower_components/jquery/jquery',
        jquerypp: '../../bower_components/jquerypp-release/amd/jquerypp/',
        'requirejs-text': '../../bower_components/requirejs-text/text',
        'requirejs-i18n': '../../bower_components/requirejs-i18n/i18n',
        'jquerypp-release': '../../bower_components/jquerypp-release/jquerypp',
        canjs: '../../bower_components/canjs/can.jquery',
        almond: '../../bower_components/almond/almond',
        sylvester: '../../bower_components/sylvester/sylvester',
        sizzle: '../../bower_components/sizzle/dist/sizzle',
        'can-touch': '../../bower_components/can-touch/src/js/can-touch'
    },
    shim: {
        sylvester: {
            init: function () {
            'use strict';
            return {
                Sylvester: this.Sylvester,
                Vector: this.Vector,
                Matrix: this.Matrix,
                Line: this.Line,
                Plane: this.Plane,
                V: this.$V,
                M: this.$M,
                L: this.$L,
                P: this.$P
            };
        }
        }
    }
});