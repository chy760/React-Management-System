const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
// json 데이터 설정
app.use(bodyParser.json());
// url 인코드 설정
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!!!'});
})
*/
// http://localhost:5000/api/customers 접속시 json 데이터 반환
app.get('/api/customers', (req, res) => {
    res.send(
        [
            {
              id: 1,
              image: 'http://placeimg.com/64/64/1',
              name: '나동빈',
              birthday: '961222',
              gender: '남자',
              job: '대학생'
            },
            {
              id: 2,
              image: 'http://placeimg.com/64/64/2',
              name: '홍길동',
              birthday: '971222',
              gender: '여자',
              job: '직장인'
            },
            {
              id: 3,
              image: 'http://placeimg.com/64/64/3',
              name: '동빈나',
              birthday: '981222',
              gender: '남자',
              job: '프로그래머'
            }
        ]
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`));