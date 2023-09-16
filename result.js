var mysql = require('mysql');
var express = require('express');

var app = express();

var connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'student_result'
})

connection.connect()

app.get('/result/:name/:sub1/:sub2/:sub3/:sub4/:sub5', function (req, res) {
     var name = req.params.name;
     var sub1 = parseInt(req.params.sub1);
     var sub2 = parseInt(req.params.sub2);
     var sub3 = parseInt(req.params.sub3);
     var sub4 = parseInt(req.params.sub4);
     var sub5 = parseInt(req.params.sub5);
     var total = sub1 + sub2 + sub3 + sub4 + sub5;
     var average = total / 5;
     var cnt=0
     var result="";
     if(sub1<35){
          cnt++;
     }
     if(sub2<35){
          cnt++;
     }
     if(sub3<35){
          cnt++;
     }
     if(sub4<35){
          cnt++;
     }
     if(sub5<35){
          cnt++;
     }
     if(cnt==0){
               result="Pass";
     }
     else if(cnt<3){
              result="ATKT";
     }
     else{
              result="Fail";
     }
     

     var insert_query = "INSERT INTO `result`(`name`, `sub1`, `sub2`, `sub3`, `sub4`, `sub5`, `total`, `average`,`result`) VALUES ('" + name + "','" + sub1 + "','" + sub2 + "','" + sub3 + "','" + sub4 + "','" + sub5 + "', '"+total+"','"+average+"','"+result+"')"

     connection.query(insert_query, function (error, results, field) {
          if (error) throw error;
          res.redirect('/result');
     })
})

app.get('/result', function (req, res) {
     // var data = req.params.data;
     // var select_query = "SELECT id, name, sub1, sub2, sub3, sub4, sub5, total, average, result, (sub1+sub2+sub3+sub4+sub5) AS total, (sub1+sub2+sub3+sub4+sub5)/5 AS average, CASE WHEN sub1 > 30 AND sub2 > 30 AND sub3 > 30 AND sub4 > 30 AND sub5 > 30 THEN 'pass' WHEN sub1 < 30 AND sub2 < 30 AND sub3 < 30 AND sub4 < 30 AND sub5 < 30 THEN 'fail' ELSE 'atkt' END AS result F.ROM result";
     var select_query = "SELECT * FROM result";

     connection.query(select_query, function (error, results, field) {
          if (error) throw error;
          res.send(results);
     })
})

     // app.get('/result', function (req, res) {
     //      var update_query = "UPDATE result SET total = (sub1+sub2+sub3+sub4+sub5) FROM result"
     //      connection.query(update_query, function (error, results, field) {
     //           if (error) throw error;
     //           res.redirect('/result');
     //      })
     // })

app.get('/result/:id', function (req, res){
     var id = req.params.id;

     var select_one = "select * from result where id = " +id;
     connection.query(select_one, function (error, results, field) {
          if (error) throw error;
          res.send(results);
     })
})

app.get('/result/result/:result', function (req, res){
     var result = req.params.result;

     var search_result = "select * from result where `result` = ('"+result+"')";
     connection.query(search_result, function (error, results, field) {
          if (error) throw error;
          res.send(results);
     })
})

app.get('/result/student/top5', function(req, res){

     var search_top5 = "select * from `result` ORDER BY `total` DESC LIMIT 5";
     connection.query(search_top5, function (error, results, field) {
          if (error) throw error;
          res.send(results);
     })

})

app.get('/result/update/:id/:sub1/:sub2/:sub3/:sub4/:sub5', function(req, res){

     var id = req.params.id;
     var sub1 = parseInt(req.params.sub1);
     var sub2 = parseInt(req.params.sub2);
     var sub3 = parseInt(req.params.sub3);
     var sub4 = parseInt(req.params.sub4);
     var sub5 = parseInt(req.params.sub5);
     var total = sub1 + sub2 + sub3 + sub4 + sub5;
     var average = total / 5;
     var cnt=0
     var result="";
     if(sub1<35){
          cnt++;
     }
     if(sub2<35){
          cnt++;
     }
     if(sub3<35){
          cnt++;
     }
     if(sub4<35){
          cnt++;
     }
     if(sub5<35){
          cnt++;
     }
     if(cnt==0){
               result="Pass";
     }
     else if(cnt<3){
              result="ATKT";
     }
     else{
              result="Fail";
     }

     var update_query = "UPDATE `result` SET `sub1` = '"+sub1+"', `sub2` = '"+sub2+"', `sub3` = '"+sub3+"', `sub4` = '" +sub4+ "', `sub5` = '" + sub5 + "', `total` = '" + total + "', `average` = '" + average + "', `result` = '"+result+"' WHERE `id` = '" + id + "'";
     connection.query(update_query, function (error, results, field) {
          if (error) throw error;
          res.send(results);
     })

})

app.listen(5000);
