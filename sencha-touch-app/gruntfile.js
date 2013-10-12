module.exports = function(grunt) {
  'use strict';
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    srcDir: "src",
    buildDir: "dest",
    libDir: "lib",
    testDir: "test",
    docDir: "doc",
    senchatouchDir: 'node_modules/sencha-touch.jsx/lib',

    watch: {
      build: {
        files: ['<%= srcDir %>/*.jsx', '<%= libDir %>/*.jsx'],
        tasks: ['jsx:build']
      },
      test: {
        src: ['<%= libDir %>/*.jsx', '<%= srcDir %>/*.jsx', '<%= testDir %>/*.jsx'],
        files: ['<%= testDir %>/*.jsx'],
        tasks: ['jsx:test']
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dest',
          keepalive: true
        }
      }
    },

    jsx: {
      build: {
        src: ['<%= srcDir %>/app.jsx'],
        add_search_path: ['<%= libDir %>', '<%= senchatouchDir %>'],
        dest: '<%= buildDir %>/app.js',
        release: true
      },

      test: {
        src: ['<%= testDir %>/*.jsx'],
        add_search_path: ['<%= libDir %>', '<%= srcDir %>', '<%= senchatouchDir %>'],
        test: true
      },

      doc: {
        src: ['<%= libDir %>/*.jsx', '<%= srcDir %>/*.jsx'],
        add_search_path: ['<%= libDir %>', '<%= srcDir %>', '<%= senchatouchDir %>'],
        dest: '<%= docDir %>',
        mode: 'doc'
      }
    }
  });

  for (var key in pkg.devDependencies) {
    if (/grunt-/.test(key)) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.registerTask('default', ['jsx:build']);
  grunt.registerTask('build', ['jsx:build']);
  grunt.registerTask('test', ['jsx:test']);
  grunt.registerTask('doc', ['jsx:doc']);
  grunt.registerTask('runserver', ['connect:server']);
};
// vim: set expandtab tabstop=2 shiftwidth=2:
