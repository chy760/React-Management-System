const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const dataAdd = require('date-fns')

// json 데이터 설정
app.use(bodyParser.json());
// url 인코드 설정
app.use(bodyParser.urlencoded({ extended: true }));
// database 정보 읽어옴
const data = fs.readFileSync('./database.json');
// data 파싱
const conf = JSON.parse(data);
// mysql 라이브러리 불러옴
const mysql = require('mysql');
// DB 연결
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// multer 라이브러리 사용
const multer = require('multer');

// 파일업로드 설정
const upload = multer({dest: './upload'});

// http://localhost:5000/api/customers 접속시 DB/json 데이터 반환
app.get('/api/customers', (req, res) => {
  // select query, 파라메터값(err, rows, fields) - rows 전체 데이터
    connection.query(
      "SELECT * FROM CUSTOMER_NEW WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
        console.log(err);
        console.log(rows);
      }
    )
})

// 파일공유 - 사용자는 image 경로 접근 -> 실제는 upload 경로 맵핑
app.use("/image", express.static("./upload")); 

// DB 추가, 클라이언트가 api(http://localhost:5000/api/customers) post 방식
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER_NEW VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  
  // 전송 데이터 debug
  console.log(image);
  console.log(name);
  console.log(birthday);
  console.log(gender);
  console.log(job);
  console.log(sql);

  let params = [image, name, birthday, gender, job];
  
  // connection query 함수를 이용하여 DB 연결
  connection.query(sql, params, 
      (err, rows, fields) => {
          res.send(rows);
          // query debug 
          console.log(err);
          console.log(rows);
      }
  );
});

// 특정경로id(http://localhost:5000/api/customers/:id)로 접속하면 데이터 수정
app.delete('/api/customers/:id', (req,res) => {
  let sql = 'UPDATE CUSTOMER_NEW SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params, 
    (err, rows, fields) => {
        res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));