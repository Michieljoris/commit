var git  = require( 'gift');
// console.log(git);

// https://github.com/notatestuser/gift

var repoPaths = [
  "/home/michieljoris/mysrc/javascript/cachejs"  
];

var repo = git(repoPaths[0]);
function sync(repoPath, cb) {
    console.log("Processing:", repo.path);
    repo.status(function(err, repoStatus) {
        if (err) {
            console.log('Error fetching status: ' , err);   
            cb();
        }
        else {
            console.log("Status:", repoStatus.files);   
            Object.keys
            if (Object.keys(repoStatus.files).length>0) {
                console.log('Adding files');
                repo.add('.', function(err) {
                    if (err) {
                        console.log('Error staging files: ' , err);   
                        cb();
                    }
                    else {
                        console.log('Commiting');
                        repo.commit('from gitjs', function(err) {
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


