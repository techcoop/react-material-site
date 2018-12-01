const { execSync } = require('child_process')

// Function for finishing up a sync
const finishSync = (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  }

  if (stderr) {
    console.log(stderr)
  }
}

// Make sure we have a directory
if (!process.argv[2]) {
  console.error(`You must pass a destination folder to the create script.`)
  process.exit()
}

const path = process.argv[2]

// Clone boilerplate repo
console.log(`\n`)
const gitCmd = `git clone https://github.com/techcoop/react-material-site-boilerplate.git ${path}`
execSync(gitCmd, finishSync)

// Remove existing 
execSync(`cd ${path} && rm -rf .git`, finishSync)

// Create new repo
execSync(`cd ${path} && git init && git add . && git commit -m "Initial commit from react-material-site"`, finishSync)

// Run install
console.log(`\nInstalling boilerplate...`)
execSync(`cd ${path} && npm install`, finishSync)

// Output something useful
console.log(`\n\n`)
console.log(`Done! Start your new site:\n\n`)
console.log(`cd ${path}`)
console.log(`yarn start`)
console.log(`\nor\n`)
console.log(`npm start`)
console.log(`\n\n`)