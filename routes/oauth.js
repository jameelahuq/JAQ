// app/routes.js

module.exports = function(app, passport) {
  //var frontUrl = http://localhost
  // route for home page
  //TODO: go to our frontend page
  app.get('/', function(req, res) {
    res.render('index', {user: req.user}); // load the index.ejs file
  });

  //
  //router.get('/', function(req, res){
  //  Car.find(function(err, cars){
  //    var data = {
  //      allCars : cars,
  //    };
  //    if (req.user) {
  //      data.currentUserName = req.user.displayName;
  //    }
  //    res.json(data);
  //  });
  //});

  app.get('/userdata', isLoggedIn, function(req, res) {
    console.log("retrieving user credentials");
    var data = req.user;
    res.json(data);

    //TODO: this page will be frontend
    //res.render('profile.ejs', {
    //  user : req.user // get the user out of session and pass to template
    //});
  });

  // route for showing the profile page
  app.get('/profile', isLoggedIn, function(req, res) {
    console.log("retrieving user credentials");
    var data = req.user;
    res.json(data);

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
        successRedirect : '/#/profile',
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