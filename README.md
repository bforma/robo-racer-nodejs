# Robo Racer

## Getting started

`git clone git@github.com:bforma/robo-racer.git`

install Node.js (http://nodejs.org/)

install NVM (https://github.com/creationix/nvm)

`npm install`

## Development

Use nodemon for automatic code reloading: `npm install -g nodemon`
And start the app using: `nodemon app.js`

Or don't use nodemon, and start the app with: `node app.js`

And point your browser to http://localhost:3000

## Running tests

`karma start` (will watch the test directory and run when files change)
`karma start --single-run` (will run the test suite once)