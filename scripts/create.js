const { execSync } = require('child_process')

// Make sure we have a directory
if (!process.argv[2]) {
  console.error(`You must pass a destination folder to the create script.`)
  process.exit()
}

const path = process.argv[2]

// Clone boilerplate repo
console.log(`Creating copy of boilerplate:\n`)
const gitCmd = `git clone git@github.com:techcoop/react-material-site-boilerplate.git ${path}`
execSync(gitCmd, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  }

  if (stdout) {
    console.log(stdout)
  }

  if (stderr) {
    console.log(stderr)
  }
})

console.log(`\n\nInstalling boilerplate:\n`)
const installCmd = `cd ${path} && yarn install`
execSync(installCmd, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  }

  if (stdout) {
    console.log(stdout)
  }

  if (stderr) {
    console.log(stderr)
  }
})

console.log(`\n\n`)
console.log(`Done... start your new site:\n`)
console.log(`cd ${path}`)
console.log(`yarn start`)
console.log(`or`)
console.log(`npm start`)
console.log(`\n\n`)