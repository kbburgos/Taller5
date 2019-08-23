const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
//const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'cedula',
  passwordField: 'pass',
  passReqToCallback: true
}, async (req:any, cedula:any, mail:any, done:any) => {
  let rows = await pool.query('SELECT * FROM usuario WHERE cedula = ?', [cedula]);
  if (rows.length == 1) {
    let user = rows[0];
    let email = rows[3];
    if(mail == email){
        done(null, user);
    }
    else {
      done(null, false);
    }
  } else {
    return done(null, false);
  }
}));


passport.serializeUser((user:any, done:any) => {
  done(null, user.ruc);
});

passport.deserializeUser(async (id:any, done:any) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE cedula = ?', [id]);
  done(null, rows[0]);
});
