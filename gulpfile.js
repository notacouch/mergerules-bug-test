var gulp            = require('gulp');
var util            = require('gulp-util');
//var chalk           = require('gulp-util/node_modules/chalk');
var chalk           = require('chalk');
var flatten         = require('gulp-flatten');
var cssnano         = require('gulp-cssnano');
//var postcss         = require('gulp-postcss'); var postcss_filter_mq = require('postcss-filter-mq');
var changed         = require('gulp-changed');
var rename          = require('gulp-rename');
var browserslist    = require('browserslist');
var autoprefixer    = require('autoprefixer');


var cssnano_options = {
    autoprefixer: {
        add: false,
        //browsers: ['last 3 versions', '> 0.2% in my stats', 'IE >= 9'], // Pull from browserslist automatically.
        cascade: false,
        flexbox: false,
        grid: false,
        remove: true,
        // stats
        //
        // To generate this file you must have access to Northwell Health's Google Analytics and be logged into a Google account that has access to it.
        // Then visit caniuse.com, click Settings/gear icon, click "From Google Analytics: Import...", choose Northwell Health's.
        // Then open console and run:
        // var e=document.createElement('a');e.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(JSON.parse(localStorage['usage-data-by-id'])[localStorage['config-primary_usage']])));e.setAttribute('download','stats.json');document.body.appendChild(e);e.click();document.body.removeChild(e);
        //
        // The above instructions are found on Browserslist's documentation:
        // @link https://github.com/ai/browserslist#custom-usage-data
        //
        //stats: 'browserslist-stats.json', // Pull from browserslist's browserslist-stats.json automatically
        supports: false
    },
    calc: false, // Tried this. Would prefer to leave things like 52/3 up to the browser.
    colormin: true, // Pretty cool. May convert rgba to hsla.
    convertValues: false,
    core: false,
    discardComments: {
        removeAll: true
    },
    discardDuplicates: false,
    discardEmpty: true, // For now doesnt do anything bc codekit
    discardUnused: false,
    filterOptimiser: false,
    filterPlugins: false,
    functionOptimiser: false,
    mergeIdents: false,
    mergeLonghand: false,
    mergeRules: true, // Can potentially trigger bug: @link https://github.com/ben-eb/cssnano/issues/340
    //mergeRules: false, // Merge adjacent rules by selectors & overlapping property/value pairs: @link http://cssnano.co/optimisations/mergeRules/
    minifyFontValues: false,
    minifyGradients: false,
    minifyParams: false,
    minifySelectors: false,
    normalizeCharset: true, // No diff.
    normalizeString: false,
    normalizeUnicode: false,
    normalizeUrl: false,
    orderedValues: false,
    reduceBackgroundRepeat: false,
    reduceDisplayValues: false,
    reduceIdents: false,
    reduceInitial: false,
    reducePositions: false,
    reduceTimingFunctions: false,
    reduceTransforms: false,
    styleCache: false,
    svgo: false,
    uniqueSelectors: false,
    zindex: false // This HAS to stay false. Totally unsafe.
}

var nested_css_files_task_name = 'Copy nested .css files directly to /css/';
var stylesheets_to_root = ['css/templates/**/*.css', 'css/pages/*.css', 'css/components/*.css', 'css/components/**/*.css']; // 'css/widgets/*.css'];

gulp.task(nested_css_files_task_name, function() {

    util.log('\tMoving nested stylesheets to root...');

    var rooted_stylesheets = gulp.src(stylesheets_to_root)
        .pipe( cssnano(cssnano_options) ) // Commments need to be removed first so actual changes can be matched
        .pipe( flatten() )
        .pipe( changed('css') )
        .pipe( gulp.dest('css') )
        .on('end', function(){
            util.log('\tFinished moving nested stylesheets to root...');
        });

    // @link http://stackoverflow.com/questions/24468310/how-do-i-output-gulp-results-to-console
    // Ran for every css file
//    var i = 0;
//    rooted_stylesheets.on('data', function(chunk){
//        console.log('data event ', i++, '\n', chunk);
//
//    });

    // Runs once
//    var j = 0;
//    rooted_stylesheets.on('end', function() {
//        console.log('data end ', j++, '\n', this);
//
//    });

});
