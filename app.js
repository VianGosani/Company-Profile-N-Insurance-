'use strict';
//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//konfigurasi koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pweb'
});
 
//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


  //set views file
  app.set('views',path.join(__dirname,'view'));
  //set view engine
  app.set('view engine', 'hbs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //set folder public sebagai static folder untuk static file
  app.use('/assets',express.static(__dirname + '/public'));

//route untuk homepage
//baca tabel tim
app.get('/',(req, res) => {
  let sql = "SELECT * FROM tim";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('index',{
      results: results
    });
  });
});
app.get('/index',(req, res) => {
  let sql = "SELECT * FROM tim";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('index',{
      results: results
    });
  });
}); 
app.post('/login',(req, res) => {
  let sql = "SELECT * FROM tim";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('dashboard',{
      results: results
    });
  });
});
app.get('/dashboard',(req, res) => {
  let sql = "SELECT * FROM tim";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('dashboard',{
      results: results
    });
  });
}); 
app.get('/dashboard2',(req, res) => {
  let sql = "SELECT * FROM kontak";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('dashboard2',{
      results: results
    });
  });
}); 
//route untuk insert data tim
app.post('/save',(req, res) => {
  let data = {id: req.body.id,nama: req.body.nama, nim: req.body.nim,tugas: req.body.tugas,gambar: req.body.gambar};
  let sql = "INSERT INTO tim SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('dashboard');
  });
});
//kontak
app.post('/kontak',(req, res) => {
  let data = {email: req.body.email,catatan: req.body.catatan};
  let sql = "INSERT INTO kontak SET ?";
  let query = conn.query(sql, data,(err, results2) => {
    if(err) throw err;
    res.redirect('/');
  });
});
//route untuk update data
app.post('/update',(req, res) => {
  var namaz=req.body.nama;
  let sql = "UPDATE tim SET nama='"+namaz+"', nim='"+req.body.nim+"', tugas='"+req.body.tugas+"', gambar='"+req.body.gambar+"' WHERE tim.id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('dashboard');
  });
});
 
//route untuk delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM tim WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('dashboard');
  });
});
app.post('/delete2',(req, res) => {
  let sql = "DELETE FROM kontak WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('dashboard2');
  });
});
//ke laman login (blm ada auth)
app.get('/secondpage', (request, response) => {
    response.render('login');
});
//logout (blm ada auth)
app.get('/keluar',(req, res) => {
  let sql = "SELECT * FROM tim";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('index',{
      results: results
    });
  });
});


app.use(express.static(__dirname+'/'));
app.listen(4000, function(){
console.log('Server is running on port 4000');
});