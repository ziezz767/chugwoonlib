// 모듈
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    
const router = express.Router();

// 포트 설정
const PORT = process.env.PORT || 3000;

// 기본 앱 세팅
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우팅
app.use('/', require('./routes/home'));
app.use('/book', require('./routes/book'));
app.use('/user', require('./routes/user'));
app.use('/rental', require('./routes/rental'));

// 서버 온
app.listen(PORT, () => console.log(`서버가 ${PORT} 포트에서 정상 가동되었습니다.`));

