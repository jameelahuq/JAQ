/**
 * Created by HUQ on 10/28/15.
 */
// set up ======================================================================
// get all the tools we need
// var express  = require('express');
// var app      = express();
// var port     = process.env.PORT || 8080;


// var mongoose = require('mongoose');
// var passport = require('passport');
// var flash    = require('connect-flash');

// var morgan       = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
// var session      = require('express-session');

// var configDB = require('./config/database.js');

// var debug = require('debug')('MUT:server');
// var http = require('http');



// configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

//allow cross-origin requests
// var corsMiddleware = function(req, res, next) {
//   console.log("middleware initiated");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   next();
// };

// app.use(corsMiddleware);


// set up our express application
// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser()); // get information from html forms




//TODO: do I need this if I deleted ejs?
//app.set('view engine', 'ejs'); // set up ejs for templating

// // required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

//// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



//// create http server ==========================================================
// var server = http.createServer(app);


//// launch ======================================================================
//app.listen(port);
//console.log('The magic happens on port ' + port);
///**
// * Listen on provided port, on all network interfaces.
// */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


