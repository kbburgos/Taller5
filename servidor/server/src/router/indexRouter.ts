import {Router} from "express";
import indexController from "../controller/indexController";
const { isLoggedIn, isNoLoggedIn } = require('../config/auth');

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/",indexController.index);
    this.router.post("/login", indexController.login);
    this.router.post("/logout",indexController.logout);
    this.router.get("/panel",isLoggedIn,indexController.home);
    this.router.get("/loadautores",isLoggedIn,indexController.loadautores)
    this.router.get("/autores",isLoggedIn,indexController.getAutores);
    this.router.get("/libautor/:autor",isLoggedIn,indexController.getRegistroByAutor);
    this.router.get("/notas/:cedula",isLoggedIn,indexController.verDatosUsuario);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
