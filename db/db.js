const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1', // DB 서버 도메인
  user: 'root', // 지정한 유저 아이디
  password: 'root', //  지정한 패스워드
  database: 'booksrental' // 데이터 베이스 이름
});

db.connect();

module.exports = db;
