export default  {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    isNoLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
};
