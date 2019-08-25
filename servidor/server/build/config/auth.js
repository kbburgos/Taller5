"use strict";
module.exports = {
    isLoggedIn(req, res, next) {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    isNoLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    }
};
