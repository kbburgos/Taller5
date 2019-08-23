export default  {
    isLoggedIn (req:any, res:any, next:any) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    isNoLoggedIn (req:any, res:any, next:any) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
};
