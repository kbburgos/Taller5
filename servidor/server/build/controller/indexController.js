"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const { isNoLoggedIn } = require('../config/auth');
class IndexController {
    index(req, res) {
        res.render("login");
        return;
    }
    login(req, res, next) {
        req.check('email', 'Username is Required').notEmpty();
        req.check('pass', 'Password is Required').notEmpty();
        const errors = req.validationErrors();
        if (errors.length > 0) {
            res.redirect('/');
        }
        passport.authenticate('local.signin', {
            successRedirect: '/panel',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    }
    logout(req, res) {
        req.logOut();
        res.redirect('/');
    }
    home(req, res) {
        res.send("hola");
    }
}
exports.default = new IndexController();
