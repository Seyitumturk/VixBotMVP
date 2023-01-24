const mongoose = require('mongoose')


const slugify = require('slugify')

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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"
});



const openai = new OpenAIApi(configuration);


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    prompt: {
        type: String,
        required: true,

    },
    response: {
        type: String,
    }
})

// Slugs make the URL look prettier, replacing complex numeric ID with text
// Every single time we do validation in our database, create, delete, save, update an article. This function in paramter will bu run


articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next()
})

const generateResponse = async (prompt) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0
        });
        return response.data.choices[0].text;
    } catch (err) {
        console.error(err);
        return `An error occurred while generating the response: ${err.message}`;
    }
};


const Article = mongoose.model('Article', articleSchema);
module.exports = { Article, generateResponse: generateResponse }


