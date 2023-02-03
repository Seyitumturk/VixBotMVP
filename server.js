const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express()

const mongoose = require('mongoose')
const { Article } = require('./models/article')

const articleRouter = require('./routes/articles')
const loginRouter = require("./routes/users");
//this uses users because users is tied to registers 
const registerRouter = require("./routes/users");


const User = require('./models/user')


const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog')
mongoose.set('strictQuery', true);


app.set('view engine', 'ejs')

// Allowing express server to recieve our form parameters.
app.use(express.urlencoded({
    extended: false
}))

app.use(methodOverride('_method'))

// Se


app.get('/', async (req, res) => {

    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

// LOGIN - LOGOUT SETUP
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    // Verify the user credentials

    User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err || !user) {
            return res.status(400).send('Incorrect email or password');
        }
        req.session.user = user;
        res.send('Logged in');
    });



    res.send('Successfully logged in!');
});

app.get('/logout', (req, res) => {
    // Destroy the user's session
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.send('Error logging out!');
        } else {
            res.send('Successfully logged out!');
        }
    });
});


//
app.use('/articles', articleRouter)
app.use("/users", loginRouter);
app.use("/registers", registerRouter);



app.listen(2000)
