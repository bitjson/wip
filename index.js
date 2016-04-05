'use strict';

var wip = {};
var boxen = require('boxen');
var chalk = require('chalk');
var Configstore = require('configstore');
var exec = require('child_process').exec;
var pkg = require('./package.json');
var spawn = require('child_process').spawn;
var updateNotifier = require('update-notifier');
updateNotifier({ pkg: pkg }).notify();

wip.conf = new Configstore(pkg.name, {
  // default config
  sound: true,
  commitizen: false,
  leftHand: true,
  emoji: true
});

wip.box = function(contents, style){
  if(!style){
    style = 'single';
  }
  return boxen(
    contents,
    {
      padding: 1,
      margin: 1,
      borderStyle: style
    }
  );
};

wip.emojify = function(content){
  if(wip.conf.get('emoji') === true){
    return content;
  }
  return '';
};

wip.help = function(){
  var help = chalk.inverse.bold(' wip and naenae ' + pkg.version + ' ') + '\n\n';
  help += chalk.blue('Settings:') + '\n\n';
  help += '$ wip silently\n' + chalk.white.dim('wip without sound') + wip.emojify('  🔇 ') + '\n\n';
  help += '$ wip loudly\n' + chalk.white.dim('wip with sound') + wip.emojify('  🔊 ') + '\n\n';
  help += '$ wip with emoji\n' + chalk.white.dim('show all emoji') + wip.emojify(' 😄 ') + '\n\n';
  help += '$ wip without emoji\n' + chalk.white.dim('hide all emoji') + wip.emojify(' 😞 ') + '\n\n';
  help += '$ wip with cz\n' + chalk.white.dim('use commitizen') + wip.emojify('  🚀 ') + '\n\n';
  help += '$ wip without cz\n' + chalk.white.dim('use default git editor') + wip.emojify(' 💩 ');
  console.log(wip.box(help));
};

wip.sound = function (name, fallback){
  if(wip.conf.get('sound')){
    var player = require('play-sound')();
    player.play(__dirname + '/sound-fx/' + name +'.mp3', function(err){
      if(err){
        // couldn't play sound
        console.log(err);
        console.log(wip.box(chalk.white('🎵  🎵  🎵   ' + fallback + ' 🎵  🎵  🎵  '), 'double'));
      }
    });
  }
};

// confirm we're inside a repo (and Git is installed)
wip.confirmGitRepo = function(onSuccess){
  exec('git rev-parse --is-inside-work-tree',
    function(error, stdout){
      if(stdout.trim() !== 'true'){
        wip.sound('stanky-leg', 'Stanky Leg (STANK!)');
        var help = '\n\nTo start a new one, make sure Git is installed and run:\n\n  $ git init';
        console.log(wip.box(chalk.red('Couldn\'t find a Git repo.') + help, 'double'));
        process.exit();
      } else {
        onSuccess();
      }
  });
};

wip.recursiveCountWIPsInBatchesOf = function(maxCount, callback, currentNumber){
  if(!currentNumber){
    currentNumber = 0;
  }

  // make sure HEAD has a commit
  exec('git show-ref --head',
    function(error, stdout){
      if(stdout.trim() === ''){
        wip.noWipsAvailable();
      }

      // log maxCount commits
      exec('git rev-list --oneline --max-count=' + maxCount + ' --skip=' + currentNumber + ' HEAD',
        function(error, stdout){
          wip.handleGitErrors(error);
          var lastWipFound = false;
          var hitRepoInit = false;
          var lines = stdout.trim().split(/\r?\n/);
          if(lines.length < maxCount){
            hitRepoInit = true;
          }
          var nextLine = 0;
          do {
            var strings = lines[nextLine].split(' ');
            if(strings.length === 2 && strings[1] === 'WIP'){
              // commit message is exactly 'WIP'
              currentNumber++;
            } else {
              // reached a non-WIP commit
              lastWipFound = true;
              break;
            }
            nextLine++;
          } while (nextLine < lines.length);
          if(lastWipFound || hitRepoInit){
            // the initial commit was a WIP
            var includesInitialCommit = hitRepoInit && !lastWipFound;
            // pass final number of WIPs
            callback(currentNumber, includesInitialCommit);
          } else {
            // iterate again
            wip.recursiveCountWIPsInBatchesOf(maxCount, callback, currentNumber);
          }
      });
  });
};

wip.handleGitErrors = function (error){
  if (error !== null) {
    console.log(chalk.red('Git seems to think there\'s a problem. Please review the error and correct the issue:'));
    console.error(error.message);
    process.exit();
  }
};

wip.noWipsAvailable = function(){
  var help = 'It looks like there\'s nothing to naenae. You need to:\n\n';
  help += '$ wip\n\nbefore it\'s possible to naenae. See \'$ man wip\' for more information.';
  console.log(wip.box(chalk.yellow(help)));
  process.exit();
};

wip.makeCommit = function (numberOfWIPs){
  // commit or cz
  var subcommand = wip.conf.get('commitizen')? 'cz' : 'commit';
  var proc = spawn('git', [subcommand], {stdio : 'inherit'});
  proc.on('close', function(code){
    if(code === 0){
      // success
      wip.sound('naenae', 'Now watch me naenae');
      console.log(wip.box(chalk.green(wip.emojify('    👋 \n      ✅  \n\n') +
       'NaeNae complete.\nSquashed ' + numberOfWIPs + ' WIPs.')));
    } else {
      console.log(wip.box(
        chalk.yellow('Commit canceled.') +'\n\n' +
        chalk.white('Your changes are staged and ready to commit.')
      ));
    }
  });
};

module.exports = wip;
