const express = require('express')
const router = express.Router()


const { Article, generateResponse } = require('./../models/article')

// Render the login page
router.get("/login", (req, res) => {
    res.render("articles/login.ejs");
});

// Handle user login
router.post("/login", (req, res) => {
    // Your logic for handling user login goes here
});


router.post("/signup", (req, res) => {
    // Your logic for handling user login goes here
});




// Router for new article 
router.get('/new', (req, res) => {

    res.render('articles/new', { article: new Article() })

})

//Edit Router: Passive 
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})



// Routers for article thats created: this is where slug is used. 

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({
        slug: req.params.slug
    })
    if (article == null) res.redirect('/')
    let response;
    if (article.prompt) {
        response = await generateResponse(article.prompt);
    }
    res.render('articles/show', { article: article, response: response })
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
        res.render('articles/show', { article: article, response: response })
    }
});
//DELETE router 

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


//Open AI Routes

module.exports = router






