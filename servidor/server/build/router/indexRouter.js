"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controller/indexController"));
const { isLoggedIn, isNoLoggedIn } = require('../config/auth');
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", indexController_1.default.index);
        this.router.post("/login", indexController_1.default.login);
        this.router.post("/logout", indexController_1.default.logout);
        this.router.get("/panel", isLoggedIn, indexController_1.default.home);
        this.router.get("/loadautores", isLoggedIn, indexController_1.default.loadautores);
        this.router.get("/autores", isLoggedIn, indexController_1.default.getAutores);
        this.router.get("/libautor/:autor", isLoggedIn, indexController_1.default.getRegistroByAutor);
        this.router.get("/notas/:cedula", isLoggedIn, indexController_1.default.verDatosUsuario);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
