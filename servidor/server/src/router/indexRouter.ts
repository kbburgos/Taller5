import {Router} from "express";
import indexController from "../controller/indexController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/", indexController.index);
    this.router.post("/login", indexController.login);
    this.router.post("/logout",indexController.logout);
    this.router.get("/panel",indexController.home);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
