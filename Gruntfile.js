module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: "\n\n"
			},
			dist: {
				src: [
					'src/main.js'
				],
				dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		qunit: {
			files: ['test/*.html']
		},

		jshint: {
			files: ['dist/smartTvKeyboard.js'],
			options: {
				globals: {
					console: true,
					module: true,
					document: true
				},
				jshintrc: '.jshintrc'
			}
		},

		copy: {
			main: {
				files: [{
					src: ['src/css/light.css'],
					dest: 'dist/css/smart-tv-keyboard-light.css'
				}, {
					src: ['src/css/dark.css'],
					dest: 'dist/css/smart-tv-keyboard-dark.css'
				}, {
					expand: true,
					cwd: 'src/',
					src: ['layouts/**'],
					dest: 'dist/'
				}]
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},


		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['concat', 'jshint', 'qunit']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify', 'copy', 'cssmin']);

};