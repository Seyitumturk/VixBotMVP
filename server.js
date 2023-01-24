const express = require('express')
const mongoose = require('mongoose')
const { Article } = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog')
mongoose.set('strictQuery', true);


app.set('view engine', 'ejs')

// Allowing express server to recieve our form parameters.
app.use(express.urlencoded({
    extended: false
}))

app.use(methodOverride('_method'))


app.get('/', async (req, res) => {

    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(4000)
