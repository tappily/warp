module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', 'assemble', '!grunt-template-*']
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                assets: '<%= connect.app.options.base %>/asset',
                data: ['bower.json', 'src/data/*.json'],
                layoutdir: 'src/template/layout',
                partials: 'src/template/partial/*.hbs',
                layout: 'default.hbs',
                flatten: true
            },
            index: {
                options: {
                    data: ['src/data/index/*.json']
                },
                files: {
                    '<%= connect.app.options.base %>/': ['src/template/page/index.hbs']
                }
            }
        },
        autoprefixer: {
            dist: {
                expand: true,
                flatten: true,
                src: '.grunt/less/*.css',
                dest: 'dist/css/'
            },
            site: {
                expand: true,
                flatten: true,
                src: '.grunt/less/*.css',
                dest: '<%= assemble.options.assets %>/css/'
            }
        },
        bower: {
            all: {
                options: {
                    exclude: ['normalize-css', 'flexboxgrid', 'loopless', 'rootless']
                },
                rjsConfig: 'src/js/config.js'
            }
        },
        clean: {
            temp: ['.grunt'],
            dist: ['dist']
        },
        compress: {
            main: {
                options: {
                    archive: 'dist/archive.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= connect.app.options.base %>/',
                        src: ['**'],
                        dest: 'public/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        connect: {
            options: {
                hostname: grunt.option('connect-hostname') || 'localhost'
            },
            app: {
                options: {
                    base: '.grunt/connect/<%= pkg.name %>',
                    livereload: true,
                    open: true
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/asset',
                        src: 'img/**',
                        dest: '<%= connect.app.options.base %>/asset/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
                formatters: [
                    {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
                    {id: 'csslint-xml', dest: 'report/csslint.xml'}
                ]
            },
            site: {
                src: ['<%%= autoprefixer.site.dest>*.css']
            },
            dist: {
                src: ['<%%= autoprefixer.dist.dest>*.css']
            }
        },
        'gh-pages': {
            options: {
                base: '<%= connect.app.options.base %>'
            },
            src: '**/*'
        },
        jshint: {
            options: {
                jshintrc: true
            },
            configurations: ['Gruntfile.js', 'bower.json', 'package.json'],
            sources: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: ['src/js/**/*.js']
                }
            }
        },
        less: {
            options: {
                strictUnits: true,
                strictMath: true
            },
            files: {
                expand: true,
                cwd: 'src/less/',
                src: ['*.less'],
                dest: '.grunt/less/',
                ext: '.css'
            }
        },
        release: {
            options: {
                file: 'bower.json'
            }
        },
        requirejs: {
            options: {
                baseUrl: 'src/js',
                locale: 'en-us',
                mainConfigFile: 'src/js/config.js',
                name: 'almond'
            },
            app: {
                options: {
                    optimize: 'none',
                    include: ['<%= pkg.name %>'],
                    out: 'dist/js/<%= pkg.name %>.js'
                }
            },
            index: {
                options: {
                    optimize: 'none',
                    include: ['index'],
                    out: '<%= assemble.options.assets %>/js/index.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            assets: {
                files: ['<%= assemble.options.assets %>/**']
            },
            images: {
                files: ['src/asset/img/**'],
                tasks: ['copy:images']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['requirejs']
            },
            json: {
                files: ['src/data/**/*.json'],
                tasks: ['requirejs', 'assemble']
            },
            less: {
                files: 'src/less/**/*.less',
                tasks: ['less', 'autoprefixer:site', 'csslint:site']
            },
            template: {
                files: ['src/template/**/*.hbs'],
                tasks: ['requirejs', 'assemble']
            }
        }
    });

    grunt.registerTask('default', ['bower']);

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('build', ['clean', 'test', 'less', 'autoprefixer:dist', 'csslint:dist', 'requirejs:app']);

    grunt.registerTask('site', ['clean', 'jshint', 'less', 'autoprefixer:site', 'csslint:site', 'requirejs', 'assemble', 'copy']);

    grunt.registerTask('live', ['site', 'connect:app', 'watch']);

    grunt.registerTask('deploy', ['site', 'gh-pages']);

    grunt.registerTask('archive', ['site', 'compress']);
};