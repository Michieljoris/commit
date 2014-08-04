require('colors');
var git  = require( 'gift');

// console.log(process.platform);

// console.log(git);

// https://github.com/notatestuser/gift

var repoPaths = [
  "/home/michieljoris/mysrc/javascript/bb-server", 
  "/home/michieljoris/mysrc/javascript/recaster", 
  "/home/michieljoris/mysrc/javascript/cachejs",
  "/home/michieljoris/mysrc/javascript/url_washer",
  "/home/michieljoris/mysrc/javascript/node-crawler",
  "/home/michieljoris/mysrc/javascript/bb-blog",
    
  "/home/michieljoris/mysrc/javascript/html-builder", 
  "/home/michieljoris/mysrc/javascript/denodify", 
  "/home/michieljoris/mysrc/javascript/denodify-core", 
    
  "/home/michieljoris/mysrc/javascript/cape", 
  "/home/michieljoris/www/sites/test-cape", 
    
    
    
  "/home/michieljoris/mysrc/javascript/adea", 
  "/home/michieljoris/mysrc/javascript/deploy-demo", 
  "/home/michieljoris/mysrc/javascript/node-haproxy", 
  "/home/michieljoris/mysrc/javascript/serf-rpc", 
  "/home/michieljoris/mysrc/javascript/vouchdb", 
    
    
  "/home/michieljoris/mysrc/javascript/crypto-utils", 
    
  "/home/michieljoris/mysrc/javascript/logthis", 
    
  // "/home/michieljoris/mysrc/javascript/roster/app",  //develop
  "/home/michieljoris/mysrc/javascript/tw", 
  "/home/michieljoris/mysrc/javascript/validate_doc_update", 
  "/home/michieljoris/mysrc/javascript/trello-export", 
  "/home/michieljoris/mysrc/javascript/monad", 
    
  "/home/michieljoris/www/sites/quilt",
    
  "/home/michieljoris/www/sites/firstdoor", //newlayout branch
  "/home/michieljoris/mysrc/javascript/phantom-sitemap", 
    
  "/home/michieljoris/www/sites/dbeditor",
  "/home/michieljoris/www/sites/greenglass",
  "/home/michieljoris/www/sites/michieljoris.github.io",
  "/home/michieljoris/www/sites/seo_laundry",
  "/home/michieljoris/www/sites/personalinfo",
  "/home/michieljoris/www/sites/roster_help",
  "/home/michieljoris/www/sites/hexo-blog",
    
    
  "/home/michieljoris/mysrc/javascript/blog",
  "/home/michieljoris/www/sites/edge4", 
  "/home/michieljoris/mysrc/javascript/deploymeteor", 
  "/home/michieljoris/mysrc/javascript/less-monitor", 
    
  "/home/michieljoris/www/sites/testsite",
    
  "/home/michieljoris/mysrc/job_applications",
  "/home/michieljoris/mysrc/lisp/scheme/sicp",
  "/home/michieljoris/mysrc/code-x",
    
  // "/home/michieljoris/.i3wm",
  // "/home/michieljoris/.emacs.d",
    
  "/home/michieljoris/mysrc/javascript/js-project",
  "/home/michieljoris/mysrc/javascript/commit"
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
                        var message = 'Sync ' + new Date();
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


