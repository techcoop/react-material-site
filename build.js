const glob = require('glob')
const { exec, execSync } = require('child_process')

// Compile babel
const cmd = `babel src --out-dir lib`
execSync(cmd)

// Copies .scss files to lib
glob('src/**/*.scss', {}, function(err, files) {
  if (err) {
    console.error('Could not write .scss files:')
    console.error(err)
  }

  files.forEach((file) => {
    exec(`cp ${file} ${file.replace('src/', 'lib/')}`)
  }) 
})