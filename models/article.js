const mongoose = require('mongoose')
const slugify = require('slugify')

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
        unqie: true
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

module.exports = mongoose.model('Article', articleSchema)
