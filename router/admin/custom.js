const express = require('express')
const common = require('../../libs/common')
const mysql = require('mysql')
const router = express.Router()
var db=mysql.createPool({host: 'localhost', user: 'root', password: 'root', database: 'learner'});
const pathlb = require('path')
const fs = require('fs')

module.exports = function(){

  router.get('/',(req,res)=>{
    const promise = new Promise(function(resolve, reject) {
      db.query('SELECT * FROM custom_evaluation_table',(err,data)=>{
          if(err){
            reject(err)
          }else{
            resolve(data)
          }
      })
    });
    promise.then((evaluations)=>{
        res.render('admin/custom.ejs', {evaluations});
    }).catch(error=>{
      res.status(500).send('database error')
    })
  })
  router.post('/',(req,res)=>{
    const {title,description} = req.body
    let ext = pathlb.parse(req.files[0].originalname).ext
    let oldpath = req.files[0].path;  //当前路径
    let newpath = req.files[0].path+ext; //新建路径
    let newFilname = req.files[0].filname+ext;    //名字
    fs.rename(oldpath, newpath, (err)=>{
      if(err){
        res.status(500).send('file  opration  error').end()
      }else{
        if(req.body.mod_id){
          
        }else{
          db.query(`INSERT  INTO custom_evaluation_table \(title,description,src)  VALUES('${title}','${description}','${newFilname}')`,(err,data)=>{
            if(err){
              res.status(500).send('database err0r').end()
            }else{
              res.redirect('/admin/custom')
            }
          })
        }
      }
    })
  })
  return router;
}