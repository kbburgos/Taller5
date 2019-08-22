import express, {Application} from "express";
import morgan from "morgan";
const bodyParser =  require("body-parser");;
const path = require("path");
const passport = require('passport');
const exphbs = require('express-handlebars');
const validator = require('express-validator');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const {  conexion } = require('./config/keys');
const {  database } = require('./config/keys');
//requires
require('./config/passport');
//impots de rutas personalizadas
import indexRoutes from "./routes/indexRoutes";
class Server {
  public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();  }

  config():void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    //static files
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    //configuraciones login
    this.app.use(conexion);
    this.app.use(session({
      secret: 'Taller5',
      resave: false,
      saveUninitialized: false,
      store: new MySQLStore(database)
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(validator());
  }


  router():void {
    this.app.use("/",indexRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();
