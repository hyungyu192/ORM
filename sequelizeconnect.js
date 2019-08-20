// sequelize 접속
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'Education', // 데이터베이스 이름
  'root', // 유저 명
  'admin_123!', // 비밀번호
  {
    'host': '52.79.46.222', // 데이터베이스 호스트
    'dialect': 'mysql' // 사용할 데이터베이스 종류
  }
);

// User 변수에 .define으로 users1 테이블 정보를 불러옴
const User = sequelize.define('users1', {
    identity: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING
    }
  });
// Book 변수에 .define으로 books1 테이블 정보를 불러옴
  const Book = sequelize.define('books1', {
    title: {
      type: Sequelize.STRING,
    },
    contents: {
      type: Sequelize.STRING,
    }
  });

Book.belongsTo(User);
User.hasMany(Book);

//http 모듈을 http라는 변수에 가져옴
const http = require("http");

http.createServer(async (req,res) => {
    const users = await User.findAll();
    const books = await Book.findAll();
    res.writeHead(200, {
        "Content-Type" : "text/json; charset=utf-8",
    });

if (req.url === '/api/users'){
    res.end(JSON.stringify(users));
} else if(req.url === '/api/books'){
    res.end(JSON.stringify(books));
    }
}).listen(5248);