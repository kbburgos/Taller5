const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import pool from './database';
//const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'pass',
  passReqToCallback: true
}, async (req:any, email:any, pass:any, done:any) => {
  let rows = await pool.query('SELECT * FROM usuario WHERE cedula = ? and correo = ?', [pass,email]);
  if (rows.length == 1) {
    let user = rows[0].cedula;
    let mail = rows[0].correo;
    if(email == mail){
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
  done(null, user);
});

passport.deserializeUser(async (id:any, done:any) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE cedula = ?', [id]);
  done(null, rows[0]);
});
