const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
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

// http://localhost:5000/api/customers 접속시 DB/json 데이터 반환
app.get('/api/customers', (req, res) => {
  // select query, 파라메터값(err, rows, fields) - rows 전체 데이터
    connection.query(
      "SELECT * FROM CUSTOMER_NEW",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`));