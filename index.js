//sequelize 모듈을 Sequelize 변수에 가져옴
const Sequelize = require('sequelize');
//Sequelize 로 DB 커넥션한것을 sequelize 변수에 가져옴
const sequelize = new Sequelize('Education', 'root', 'admin_123!', {
    host: '52.79.46.222',
    dialect: 'mariadb' 
});

//.define(A,B)  A = 테이블명
const User = sequelize.define("users1", {
    identity: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    name: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING
});

const Book = sequelize.define("books1", {
    title: Sequelize.DataTypes.STRING,
    contents: Sequelize.DataTypes.STRING
});

Book.belongsTo(User);
User.hasMany(Book);

sequelize.sync().then(async () => {
    console.log("Sync done");
    const user = await User.create({
        identity: "gyu192",
        password: "1234",
        name: "박현규",
        email: "hyungyu192@gmail.com"
    });
    const book = await Book.create({
        title: "tree",
        contents: "bernarberber"
    });
    user.addBooks1(book);
        
    const users = await User.findAll({
        include: [Book]
    });

    console.log(
        users.map((user) => {
            const books = user.books1s.map((book) => {
                return book.dataValues;
            });
        user.dataValues.books = books;
        return user.dataValues;

        })
    );
});