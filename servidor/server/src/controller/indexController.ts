import express, { Request, Response } from "express";
const passport = require('passport');
import pool from './../config/database';
import mongoose from 'mongoose';
import historicos from "./../models/registros_historicos";
let app = express();
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


  public async home(req:Request, res:Response){
    
    try{
      let rows =  await pool.query("select * from autor");
      
      //res.render("historico",{autores:rows});

    }catch(e){
      console.log(e);
      res.status(500);
      
    }
  }


  public async ingresarCalificacion(req:Request, res:Response){
    const {nota,libro,usuario} = req.body;
    try{
      let rows =  await pool.query("INSERT INTO calificacion (libro, usuario, calificacion) values(?,?,?)",[libro,usuario,nota]);
      
    }catch(e){
      console.log(e);
      res.status(500);
    }
    //console.log(req.body);
    res.status(200).json(req.body);
  }
  

  public async getAutores(req:Request, res:Response){
    try{
      let rows =  await pool.query("select * from autor");
      res.json(rows);
    }catch(e){
      console.log(e);
      res.status(500);
    }
  }

  public async getRegistroByAutor(req:Request, res:Response){
    let autor = req.params.autor;
    try{
    let doc = await historicos.find({autores: {$regex:new RegExp(autor), $options: 'i'}}).sort({calificacion_promedio:"desc"})
    res.status(200).json(doc);
    }catch(e){
      console.log(e);
      res.status(500);
      
    }
  }

 //me estresa tu red :) 


  public async loadautores(req:Request, res:Response){
    try{
      let autoresdist:Array<string>=[];
      let doc = await historicos.distinct("autores");
      console.log(doc);
      
      for (let idx = 0; idx<doc.length;idx++){
      
       
       
        if(doc[idx].indexOf("-")>-1){
          
          let subautor = doc[idx].split("-");
          for(let idx2=0; idx2<subautor.length;idx2++ ){
            if(subautor[idx2].indexOf("?")===-1&&autoresdist.indexOf(subautor[idx2])===-1){
             
              
              autoresdist.push(subautor[idx2]);
            }
          }
        }
        else if(doc[idx].indexOf("?")===-1&&autoresdist.indexOf(doc[idx])===-1){
         
          autoresdist.push(doc[idx]);
        }

        

      }
      for (let idx3 = 0; idx3<autoresdist.length;idx3++){
        await pool.query('insert into autor (nombre_completo) values (?)	', [autoresdist[idx3]]);
      }
     res.json(autoresdist)
    }catch(e){
      console.log(e);
      res.status(500);
    }
  }

  public verDatosUsuario(req:Request, res:Response){
    let {cedula} = req.params;
    //res.render("calificacion");
      //select titulo, lib.isbn as isbn, cal.usuario as usuario from calificacion as cal join libro lib where lib.isbn = cal.libro;
      pool.query("select titulo, lib.isbn as isbn, cal.usuario as usuario from calificacion as cal join libro lib where lib.isbn = cal.libro and cal.usuario = ?",[cedula],(err:any, rows:any)=>{
        res.render("notas",{data: rows});
        return;
      });
    
  }
}

export default new IndexController();

