const mongoose = require('mongoose')
const slugify = require('slugify')
const { Configuration, OpenAIApi } = require("openai");
const User = require('./user')


const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
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
    },
    temperature: {
        type: Number,
        required: true,
        default: 0
    }
})

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next()
})

const generateResponse = async (prompt, temperature) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: temperature
        });
        return response.data.choices[0].text;
    } catch (err) {
        console.error(err);
        return `An error occurred while generating the response: ${err.message}`;
    }
};

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article, generateResponse: generateResponse }
