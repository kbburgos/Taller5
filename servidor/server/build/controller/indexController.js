"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const { isNoLoggedIn } = require('../config/auth');
const pool = require('./../config/database');
const registros_historicos_1 = __importDefault(require("./../models/registros_historicos"));
class IndexController {
    index(req, res) {
        res.render("login");
        return;
    }
    login(req, res, next) {
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
    logout(req, res) {
        req.logOut();
        res.redirect('/');
    }
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rows = yield pool.query("select * from autor");
                res.render("historico", { autores: rows });
            }
            catch (e) {
                console.log(e);
                res.status(500);
            }
        });
    }
    getAutores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rows = yield pool.query("select * from autor");
                res.json(rows);
            }
            catch (e) {
                console.log(e);
                res.status(500);
            }
        });
    }
    getRegistroByAutor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let autor = req.params.autor;
            try {
                let doc = yield registros_historicos_1.default.find({ autores: { $regex: new RegExp(autor), $options: 'i' } }).sort({ calificacion_promedio: "desc" });
                res.status(200).json(doc);
            }
            catch (e) {
                console.log(e);
                res.status(500);
            }
        });
    }
    loadautores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let autoresdist = [];
                let doc = yield registros_historicos_1.default.distinct("autores");
                console.log(doc);
                for (let idx = 0; idx < doc.length; idx++) {
                    if (doc[idx].indexOf("-") > -1) {
                        let subautor = doc[idx].split("-");
                        for (let idx2 = 0; idx2 < subautor.length; idx2++) {
                            if (subautor[idx2].indexOf("?") === -1 && autoresdist.indexOf(subautor[idx2]) === -1) {
                                autoresdist.push(subautor[idx2]);
                            }
                        }
                    }
                    else if (doc[idx].indexOf("?") === -1 && autoresdist.indexOf(doc[idx]) === -1) {
                        autoresdist.push(doc[idx]);
                    }
                }
                for (let idx3 = 0; idx3 < autoresdist.length; idx3++) {
                    yield pool.query('insert into autor (nombre_completo) values (?)	', [autoresdist[idx3]]);
                }
                res.json(autoresdist);
            }
            catch (e) {
                console.log(e);
                res.status(500);
            }
        });
    }
}
exports.default = new IndexController();
