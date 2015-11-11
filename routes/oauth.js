// app/routes.js

module.exports = function(app, passport) {
  //var frontUrl = http://localhost
  // route for home page
  //TODO: go to our frontend page
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  // route for login form
  // route for processing the login form
  // process the signup form
  //TODO: make your post request
  //app.post('/signup', passport.authenticate('local-signup', {
  //  successRedirect : '/profile', // redirect to the secure profile section
  //  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  //  failureFlash : true // allow flash messages
  //}));

  // route for processing the signup form

  // route for showing the profile page
  app.get('/profile', isLoggedIn, function(req, res) {
    console.log("retrieving user credentials");
    res.send(req.body);

    //TODO: this page will be frontend
    //res.render('profile.ejs', {
    //  user : req.user // get the user out of session and pass to template
    //});
  });

  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });



  //TODO: facebook routes


  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
      passport.authenticate('google', {
        //TODO: so this redirect will go to the frontpage
        //successRedirect: ,
        successRedirect : '/profile/#/',
        failureRedirect : '/'
      }));

  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect : '/#/profile',
        failureRedirect : '/'
      }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}