module.exports = {
  DEPLOY_URL: process.env.DEPLOY_URL,
  MONGO_URL:  process.env.MONGOLAB_URI || 'mongodb://localhost/JAQblogger',
  SECRET: 'ANYFUCKINGTHINGIWANT',
  MAILGUN_KEY: process.env.MAILGUN_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

  'googleAuth' : {
    'clientID'      : process.env.GOOGLE_CLIENTID, // your App ID
    'clientSecret'  : process.env.GOOGLE_CLIENTSECRET, // your App Secret
    //'callbackURL'   : 'https://jaqd.herokuapp.com/auth/google/callback'
    'callbackURL'   : process.env.GOOGLE_CALLBACKURL || 'http://localhost:8080/auth/google/callback'

  }
};