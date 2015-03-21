/*
 * Generated on 2014-11-01
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */


// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  'use strict';
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src:        'src',
      dist:       'dist',
      sassDir:    '<%= config.src %>/scss/',
      bower:      'bower_components',
      bootstrap:  'bower_components/bootstrap-sass-twbs/assets/'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      img:{
        files: [
          '<%= config.src %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['copy:imgs']
      },
      scss:{
        files: [
          '<%= config.src %>/scss/{,*/}*.scss'
        ],
        tasks: ['compass:dev']
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.sassDir %>',
          cssDir: '<%= config.dist %>/assets/css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: '<%= config.sassDir %>',
          cssDir: '<%= config.dist %>/assets/css'
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= config.bootstrap %>/fonts/',
        src: '**',
        dest: '<%= config.dist %>/assets/fonts'
      },
      jsLibs:{
        expand: true,
        cwd: '<%= config.bootstrap %>javascripts/bootstrap',
        src: '**',
        dest: '<%= config.dist %>/assets/javascripts/bootstrap'
      },
      theme: {
        expand: true,
        cwd: '<%= config.src %>/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      imgs: {
        expand: true,
        cwd: '<%= config.src %>/assets/images/',
        src: '**',
        dest: '<%= config.dist %>/assets/images/'
      },
      statics: {
        expand: true,
        cwd: '<%= config.src %>/statics/',
        src: '**',
        dest: '<%= config.dist %>/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'compass:dev',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
