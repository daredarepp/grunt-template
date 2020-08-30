module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            pages: {
                files: [
                    { expand: true, cwd: 'resources/', src: 'index.html', dest: 'public/' },
                    { expand: true, cwd: 'resources/pages/', src: '**/*.html', dest: 'public/pages' },
                ]
            },
            scripts: {
                expand: true,
                cwd: 'resources/js/',
                src: '**/*.js',
                dest: 'public/js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                expand: true,
                cwd: 'public/js/',
                src: ['**/*.js'],
                dest: 'public/js/',
                ext: '.min.js',
            }
        },
        watch: {
            options: {
                spawn: false
            },
            style: {
                files: ['resources/scss/**/*.scss'],
                tasks: ['postcss']
            },
            pages: {
                files: ['resources/index.html', 'resources/pages/**/*.html'],
                tasks: ['copy:pages']
            },
            scripts: {
                files: ['resources/js/**/*.js'],
                tasks: ['babel', 'uglify']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['public/index.html', 'public/pages/**/*.html', 'public/css/**/*.css', 'public/js/**/*.js']
                },
                options: {
                    server: 'public',
                    watchTask: true
                },
            }
        },
        postcss: {
            options: {
                processors: [
                    require('postcss-node-sass')(),
                    require('autoprefixer')()
                ],
            },
            main: {
                expand: true,
                cwd: 'resources/scss/',
                src: '**/*.scss',
                dest: 'public/css',
                ext: '.css'
            }
        },
        babel: {
            options: {
                presets: ["@babel/preset-env",]
            },
            main: {
                expand: true,
                cwd: 'resources/js/',
                src: '**/*.js',
                dest: 'public/js'
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['copy', 'postcss', 'babel', 'uglify']);
    grunt.registerTask('dev', ['default', 'browserSync', 'watch']);
}