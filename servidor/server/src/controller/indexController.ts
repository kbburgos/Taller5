import { Request, Response } from "express";
const passport = require('passport');
const { isNoLoggedIn } = require('../config/auth');
class IndexController {
  public index(req: Request, res: Response) {
    res.render("login");
    return;
  }

  public login(req: Request, res: Response, next: any) {
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

  public logout (req:Request, res:Response){
    req.logOut();
    res.redirect('/');
  }

  public home(req:Request, res:Response){
    res.send("hola");
  }
}
export default new IndexController();
