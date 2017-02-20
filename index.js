const app = require('./app');
const morgan = require('morgan');
const parser = require('body-parser');
const session = require('express-session');

app
// Setup
  .set('views', './templates')
  .set('view cache', false)
  .set('view engine', 'pug')
  .set('x-powered-by', false)
  // Middleware
  .use(morgan('combined'))
  .use(parser.urlencoded({extended: true}))
  .use(session({
    name: 'trueapi',
    resave: false,
    saveUninitialized: false,
    secret: process.env.LG_SECRET
  }))
  .use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
  })
  // Content
  .use('/:target/command', require('./controllers/command'))
  .use('/:target/pair', require('./controllers/pair'))
  // Fallback
  .all('*', (req, res) => res.sendStatus(404))
  // Run
  .listen(3000);
