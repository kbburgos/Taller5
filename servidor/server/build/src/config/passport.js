"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
//const helpers = require('./helpers');
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, (req, email, pass, done) => __awaiter(this, void 0, void 0, function* () {
    let rows = yield pool.query('SELECT * FROM usuario WHERE cedula = ? and correo = ?', [pass, email]);
    if (rows.length == 1) {
        let user = rows[0].cedula;
        let mail = rows[0].correo;
        if (email == mail) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    else {
        return done(null, false);
    }
})));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const rows = yield pool.query('SELECT * FROM usuario WHERE cedula = ?', [id]);
    done(null, rows[0]);
}));
