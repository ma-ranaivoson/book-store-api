const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a name of the book'],
        maxlength: [100, 'The title should be less than 100 characters'],
        unique: [true, 'Book title already exists'],
    },
    author: {
        type: String,
        required: [true, 'Please add the name of the author'],
        maxlength: [
            100,
            'The name of the author should be less than 100 characters',
        ],
    },
    publicationDate: {
        type: Date,
        required: [true, 'Please add the publication date of the book'],
    },
    ISBN: {
        type: Number,
        required: [true, 'Please add the ISBN'],
        unique: true,
    },
    cover: {
        type: String,
        default: 'no-photo.jpg',
    },
    aboutTheAuthor: {
        type: String,
        maxlength: [
            1500,
            "The author's information should be less than 1500 characters",
        ],
    },
    synopsis: {
        type: String,
        minlength: 150,
        maxlength: 2000,
        required: [true, 'Please add the synopsis of the book'],
    },
});

module.exports = mongoose.model('Book', BookSchema);
