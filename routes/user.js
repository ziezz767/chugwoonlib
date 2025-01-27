// routes/user.js
'user strict';

const express = require('express'),
  router = express.Router(),
  db = require('../db/db');

// 로그인
router.post('/sign-in', (req, res) => {
  const user = req.body;
  db.query(`SELECT * FROM users WHERE id LIKE ?`, [user.id],
    (err, result) => {
      if (err) 
        throw err;
      if (result != false && result[0].id == user.id && result[0].pw == user.pw)
        res.json(result);
      else 
        res.json(false);
    });
});

// 로그인
router.post('/read', (req, res) => {
  const user = req.body;
  db.query(`SELECT * FROM users WHERE id LIKE ?`, [user.id],
    (err, result) => {
      if (err) 
        throw err;
      if (result != false && result[0].id == user.id && result[0].pw == user.pw)
        res.json(true);
      else 
        res.json(false);
    });
});

// 회원가입
router.post('/sign-up', (req, res) => {
  const user = req.body;
  db.query(`INSERT INTO
      users(id, name, email, pw, is_manager)
      VALUES('${user.id}', '${user.name}', '${user.email}', '${user.pw}', 'N')`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.json(false);
      }
      return res.json(true);
    });
});

// 회원 관리 페이지 이동
router.get('/management', (req, res) => {
  res.render('user/management');
});

// 회원 데이터 읽어오기 (조회)
router.get('/read', (req, res) => {
  db.query(`SELECT * FROM users`, (err1, users) => {
    if (err1) throw err;
    res.json(users);
  });
});

// 회원(관리자) 등록 페이지 이동
router.get('/create', (req, res) => {
  res.render('user/create');
});

// 회원(관리자) 등록
router.post('/create', (req, res) => {
  const user = req.body;
  db.query(`INSERT INTO 
      users(id, name, email, pw, is_manager) 
      VALUES('${user.id}', '${user.name}', '${user.email}', '${user.pw}', 'Y')`,
    (err, result) => {
      if (err) throw err;
      res.json(true);
  });
});

// 회원(관리자) 등록 페이지 이동
router.get('/:id/update', (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, user) => {
    res.render('user/update', user[0]);
  });
});

// 회원 수정
router.post('/:id/update', (req, res) => {
  const user = req.body,
    originId = req.params.id;
    console.log(originId)
  db.query(`UPDATE users 
    SET id=?, name=?, email=?, pw=?, is_manager=? WHERE id=?`,
    [user.id, user.name, user.email, user.pw, user.isManager, originId],
    (err, user) => {
      if (err) throw err;
      res.json(true);
    });
});

// 회원 삭제
router.post('/:id/delete', (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query(`DELETE FROM users WHERE id=?`, [id], (err, user) => {
    if (err) throw err;
    res.json(true);
  });
});

module.exports = router;