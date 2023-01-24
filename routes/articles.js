const express = require('express')
const router = express.Router()


const { Article, generateResponse } = require('./../models/article')


// Test router
router.get('/test', (req, res) => {
    res.render('articles/test')
})


// Router for new article 
router.get('/new', (req, res) => {

    res.render('articles/new', { article: new Article() })

})

//Edit Router: Passive 
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })

})



// Routers for article thats created 
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({
        slug: req.params.slug
    })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})


//Posting a new article through new -> _form_fields.ejs

// router.post('/', async (req, res) => {

//     let article = new Article({

//         title: req.body.title,
//         description: req.body.description,
//         markdown: req.body.markdown,
//     })
//     try {
//         article = await article.save()
//         res.redirect(`/articles/${article.slug}`)
//         await article.save()
//     } catch (e) {
//         console.log(e)
//         res.render('articles/new', { article: article })
//     }
// })


// Router for creating a new article. 
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        prompt: req.body.prompt || "",
        response: ""
    });
    let response;
    if (req.body.prompt) {
        console.log("Prompt: ", req.body.prompt);
        response = await generateResponse(req.body.prompt);
        console.log("Response: ", response);
    }
    try {
        article = await article.save()
        res.render('articles/show', { article: article, response: response })
    }
    catch (e) {
        console.log(e)
        res.render('articles/new', { article: article })
    }
});
//DELETE router 

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


//Open AI Routes

module.exports = router






