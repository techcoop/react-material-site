// This prebuild file will generate some files that require filesystem work
// TODO fix overal pretty awful file
// TODO watcher process kill will fail if they change from port localhost:3000

// 1) Create components index file
// 2) TODO Determine missing translates and translate with google API

var isReachable = require('is-reachable');
var spawn = require('child_process').spawn
var chokidar = require('chokidar')
var fs = require('fs')

// Detect watch command
var isWatch = false
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--watch') {
    isWatch = true
  }
}

// Is child watcher process
var isWatcher = false
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--watcher') {
    isWatcher = true
  }
}

// Create index file on first load
createIndex()

// Start prebuild child process
prebuild()

function prebuild() {
  // If this is --watch, spawn child process
  if (isWatch) {
    spawnWatcher()
  }

  // If this is in child process, do stuff
  if (isWatcher) {
    setInterval(function() {
      isReachable('localhost:3000').then(reachable => {
        if (!reachable) {
          process.exit()
        }
      });
    }, 2000)

    var watcher = chokidar.watch('src/views/**/*.js', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true,
      ignorePermissionErrors: true
    })

    watcher
      .on('add', () => createIndex())
      .on('unlink', () => createIndex())
  }
}

// Spawn watcher process
function spawnWatcher() {
  var subprocess = spawn(process.argv[0], ['prebuild.js', '--watcher'], {detached: true, stdio: 'ignore'})
  subprocess.unref()
}

// Creates index file for views
function createIndex() {
  var directory = 'src/views'
  var directories = fs.readdirSync(directory)

  try {
    var lines = ['// This is a generated file, do not edit, or disable "prebuild" command in package.json if you want to take control']
    for (var i = 0; i < directories.length; i++) {
      var path = directory + '/' + directories[i];
      if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
        var file = directories[i] + '.js'
        if (fs.existsSync(directory + '/' + directories[i] + '/' + file)) {
          lines.push('export { default as ' + directories[i] + ' } from \'./' + directories[i] + '/' + directories[i] + '\'')
        }
      }
    }

    fs.writeFileSync(directory + '/index.js', lines.join('\n') + '\n');
  } catch (err) {
    console.log(err)
  }
}