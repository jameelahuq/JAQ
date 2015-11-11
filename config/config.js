module.exports = {
  MONGO_URL:  'mongodb://heroku_r2b74cqs:54gu0trj6t8ps5n3ic5u77abmc@ds053784.mongolab.com:53784/heroku_r2b74cqs',
  SECRET: 'ANYFUCKINGTHINGIWANT',
  MAILGUN_KEY: process.env.MAILGUN_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  
  'googleAuth' : {
    'clientID'      : '825949035576-t22hs85kirk3emo4blk7rscr4onc73mr.apps.googleusercontent.com', // your App ID
    'clientSecret'  : 'W0u52t-1lPv8tUs_Rrdz_loY', // your App Secret
    'callbackURL'   : 'http://jaqd.herokuapp.com/auth/google/callback'
  }
};
