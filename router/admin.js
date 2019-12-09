const express = require('express')
const common = require('../libs/common')
const mysql = require('mysql')
const db = mysql.createPool({host:'localhost',user:'root',password:'root',database:'learner'})

module.exports=function(){
  var router=express.Router();
// 检查的登陆状态
  router.use((req,res,next)=>{
    if(!req.session['admin_id'] && req.url != '/login'){
      res.redirect('/admin/login')
    }else{
      next()
    }
  })
  router.get('/login',(req,res)=>{
    res.render('admin/login.ejs',{})
  })
  router.post('/login', (req, res)=>{
    var username=req.body.username;
    var password=common.md5(req.body.password+common.MD5_SUFFIX);
      db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
        if(err){
          res.status(500).send('服务器失败').end()
        }else{
          // console.log(data)
          if(data.length==0){
            res.status(400).send('no this username').end()
          }else{
            if(data[0].password == password){
              req.session['admin_id']=data[0].ID;
              res.redirect('/admin/')
            }else{
              res.status(400).send('this password is incorrect').end();
            }
          }
        }
        
      })
  });


  router.get('/', (req, res)=>{
    res.render('admin/index.ejs', {});
  });

  router.get('/banners', (req, res)=>{
    res.render('admin/banners.ejs', {})
  });

  return router;
}