require('colors');
var git  = require( 'gift');

// console.log(git);

// https://github.com/notatestuser/gift

var repoPaths = [
  "/home/michieljoris/mysrc/javascript/cachejs",
  "/home/michieljoris/mysrc/javascript/bb-server", 
  "/home/michieljoris/mysrc/javascript/html-builder", 
  "/home/michieljoris/mysrc/javascript/recaster", 
  "/home/michieljoris/mysrc/javascript/denodify", 
  "/home/michieljoris/mysrc/javascript/url_washer",
  "/home/michieljoris/mysrc/javascript/js-project",
  "/home/michieljoris/mysrc/javascript/commit",
  "/home/michieljoris/www/sites/firstdoor",
  "/home/michieljoris/www/sites/testsite"
    
];

function sync(repoPath, cb) {
    var repo = git(repoPath);
    console.log("Processing:", repo.path);
    repo.status(function(err, repoStatus) {
        if (err) {
            console.log('Error fetching status: '.red , err);   
            cb();
        }
        else {
            if (repoStatus.clean) {
                console.log('All up to date'.green);
                cb();
            }
            else if (Object.keys(repoStatus.files).length>0) {
                console.log('Adding files');
                repo.add('-A', function(err) {
                    if (err) {
                        console.log('Error staging files: '.red , err);   
                        cb();
                    }
                    else {
                        var message = 'gitjs sync ' + new Date();
                        console.log('Commiting: ' + message);
                        
                        repo.commit(message, function(err) {
                            if (err) {
                                console.log('Error commiting:'.red , err);   
                                cb();
                            }
                            else {
                                console.log('Pushing', repo);
                                repo.remote_push('origin', function(err) {
                                    if (err) console.log('Error pushing:'.error , err);
                                    else console.log('Done!'.green);
                                    cb();
                                });
                            
                            }
                        });
                    }
                });
            
            }
            else cb();
        
        }
    });
}


function recur() {
    var repoPath = repoPaths.pop();
    if (repoPath) {
        sync(repoPath, function() {
            recur();
        });
    }
}

recur();


