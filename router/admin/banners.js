const express=require('express');
const mysql  = require('mysql')
module.exports=function (){
  var db=mysql.createPool({host: 'localhost', user: 'root', password: 'root', database: 'learner'});
  const router = express.Router()
router.get('/',(req,res)=>{

  switch(req.query.act){
    case 'mod':
      db.query(`SELECT *FORM banner_table WHERE id=${req.query.id}`,(err,data)=>{
        if(err){
          console.error(err);
          res.status(500).send('database err').end()
        }else if(data.length==0){
        res.status(404).send('data not found').end();
        }else{
          db.query('SELECT * FROM banner_table', (err, banners)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else{
              res.render('admin/banners.ejs', {banners, mod_data: data[0]});
            }
          });
        }
      })
      break;
      case 'del':
        db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`, (err, data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.redirect('/admin/banners');
          }
        });
        break;
      default:
        db.query('SELECT * FROM banner_table', (err, banners)=>{
          if(err){
            console.error(err,8888888);
            res.status(500).send('database error').end();
          }else{
            res.render('admin/banners.ejs', {banners});
          }
        });
        break;
  }
})
router.post('/',(req,res)=>{
  let {title,description,href} = req.body
  if(!title || !description || !href){
    res.status(500).send('arg  error')
  }else{
    db.query(`INSERT INTO banner_table (title,description,href) VALUE ('${title}','${description}','${href}')`,(err,data)=>{
      if(err){

        res.status(500).send('database error').end()
      }else{
        res.redirect('/admin/banners');
      }
    })
  }
  
})






  return router
}