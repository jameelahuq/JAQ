module.exports = {
  MONGO_URL:  process.env.MONGOLAB_URI,
  SECRET: 'ANYFUCKINGTHINGIWANT',
  MAILGUN_KEY: process.env.MAILGUN_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  
  'googleAuth' : {
    'clientID'      : '825949035576-t22hs85kirk3emo4blk7rscr4onc73mr.apps.googleusercontent.com', // your App ID
    'clientSecret'  : 'W0u52t-1lPv8tUs_Rrdz_loY', // your App Secret
    //'callbackURL'   : 'https://jaqd.herokuapp.com/auth/google/callback'
    'callbackURL'   : process.env.GOOGLE_CALLBACKURL
    
  }
};
