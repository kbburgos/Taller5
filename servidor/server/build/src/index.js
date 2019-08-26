"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const validator = require('express-validator');
const express_session_1 = __importDefault(require("express-session"));
const MySQLStore = require('express-mysql-session')(express_session_1.default);
const conexion = require("./config/keys").conexion;
const database = require("./config/keys").database;
//requires
require('./config/passport');
//impots de rutas personalizadas
const indexRouter_1 = __importDefault(require("./router/indexRouter"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.router();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.set('view engine', 'ejs');
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        //static files
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '/public')));
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //configuraciones login
        this.app.use(conexion);
        this.app.use(express_session_1.default({
            secret: 'Taller5',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(database)
        }));
        this.app.use(body_parser_1.default.json());
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use(validator());
    }
    router() {
        this.app.use("/", indexRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port: ", this.app.get("port"));
            mongoose_1.default.connect("mongodb+srv://admin:admin@cluster0-bgnms.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, dbName: 'taller5_daw' })
                .then(db => { console.log("No Relational Data Base Connected"); }).catch(e => console.log(e));
        });
    }
}
const server = new Server();
server.start();
