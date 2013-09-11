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
        describe : 'command line options passed to phantomjs'
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
    
    // https://github.com/ariya/phantomjs/wiki/API-Reference#command-line-options
    if(opts){
        Object.keys(opts).forEach(function(key) {
            var val = opts[key];
            if (!/^\-\-/.test(key)) {
                key = '--' + key;
            } 
            childArgs.push(key + '=' + val);
        });
    }
    
    if(script) childArgs.push(script);
    
    if(args){
        childArgs = childArgs.concat(args);
    }

    exports.log("Running PhantomJS...")
    var cp = childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        done(err);
    });
    
    cp.stdout.on('data', function (data) {
        process.stdout.write(data);
    });

    cp.stderr.on('data', function (data) {
       process.stderr.write(data);
    });

};
