var git  = require( 'gift');
// console.log(git);

// https://github.com/notatestuser/gift

var repoPaths = [
  "/home/michieljoris/mysrc/javascript/cachejs",
  "/home/michieljoris/mysrc/javascript/bb-server", 
  "/home/michieljoris/mysrc/javascript/html-builder", 
  "/home/michieljoris/mysrc/javascript/recaster", 
  "/home/michieljoris/mysrc/javascript/url_washer",
  "/home/michieljoris/www/sites/firstdoor"
    
];

function sync(repoPath, cb) {
    var repo = git(repoPath);
    console.log("Processing:", repo.path);
    repo.status(function(err, repoStatus) {
        if (err) {
            console.log('Error fetching status: ' , err);   
            cb();
        }
        else {
            console.log("Status:", repoStatus.files);   
            if (Object.keys(repoStatus.files).length>0) {
                console.log('Adding files');
                repo.add('.', function(err) {
                    if (err) {
                        console.log('Error staging files: ' , err);   
                        cb();
                    }
                    else {
                            var message = 'gitjs sync ' + new Date();
                        console.log('Commiting: ' + message);
                        
                        repo.commit(message, function(err) {
                            if (err) {
                                console.log('Error commiting:' , err);   
                                cb();
                            }
                            else {
                                console.log('Pushing', repo);
                                repo.remote_push('origin', function(err) {
                                    if (err) console.log('Error pushing:' , err);
                                    else console.log('Done!');
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


