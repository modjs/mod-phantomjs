exports.summary = 'Run in phantomjs sandbox';

exports.usage = '<script> [options]';

exports.options = {
    "script" : {
        required: true,
        describe : 'script'
    },
    "args" : {
        describe : 'arguments passed to phantomjs script'
    },
    "opts" : {
        describe : 'options passed to phantomjs'
    }
};

exports.run = function (options, done) {
    var script = options.script;
    var opts = options.opts;
    var args = options.args;

    var childProcess = require('child_process');
    var phantomjs = require('phantomjs');
    var binPath = phantomjs.path;

    var childArgs = [];
    if(opts) childArgs.push(opts);
    if(script) childArgs.push(script);
    if(args) childArgs.push(args);

    exports.log("Running PhantomJS...")
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        console.log(stdout);
        done(err, stderr);
    });

};
