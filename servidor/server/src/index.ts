import express, {Application} from "express";
import morgan from "morgan";
import bodyParser  from "body-parser";
import path from "path";
import mongoose from 'mongoose'
import passport from 'passport';
import exphbs from 'express-handlebars';
const validator = require('express-validator');
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);
const conexion = require("./config/keys").conexion;
const database = require("./config/keys").database;
const ejsLint = require('ejs-lint');
//requires
require('./config/passport');
//impots de rutas personalizadas
import indexRoutes from "./router/indexRouter";
class Server {
  public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router(); 
    this.global();
   }

  config():void {
    ejsLint.lint();
    this.app.set("port", process.env.PORT || 3000);
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    //static files
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(morgan("dev"));
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
    this.app.use(bodyParser.json());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(validator());
  }

  global():void{
    this.app.use((req:any ,res:any ,next:any) =>{
      this.app.locals.user = req.user;
      next();
    });
  }

  router():void {
    this.app.use("/",indexRoutes);
  }

  start(): void {

    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
      mongoose.connect("mongodb+srv://admin:admin@cluster0-bgnms.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true,dbName: 'taller5_daw' },)
      .then(db=>{console.log("No Relational Data Base Connected");}).catch(e=>console.log(e))
      ;
    
    });
  }
}
const server = new Server();
server.start();
