module.exports = {
  DEPLOY_URL: process.env.DEPLOY_URL,
  MONGO_URL:  process.env.MONGOLAB_URI || 'mongodb://localhost/JAQblogger',
  SECRET: 'ANYFUCKINGTHINGIWANT',
  MAILGUN_KEY: 'key-8f9b4ef34787644895e78ab359389d2b',
  MAILGUN_DOMAIN: 'sandbox9408007ca16d4905af0d1602eed3ea60.mailgun.org',
  
  'googleAuth' : {
    'clientID'      : '825949035576-t22hs85kirk3emo4blk7rscr4onc73mr.apps.googleusercontent.com', // your App ID
    'clientSecret'  : 'W0u52t-1lPv8tUs_Rrdz_loY', // your App Secret
    //'callbackURL'   : 'https://jaqd.herokuapp.com/auth/google/callback'
    'callbackURL'   : process.env.GOOGLE_CALLBACKURL || 'http://localhost:8080/auth/google/callback'
    
  }
};
