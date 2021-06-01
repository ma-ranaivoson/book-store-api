const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    uploadImage,
} = require('../controllers/books');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileType = file.mimetype.split('/')[1];

        cb(null, file.fieldname + '-' + uniqueSuffix + `.${fileType}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileType = file.mimetype.split('/')[0];

        // If the file is not an image
        if (fileType !== 'image') {
            cb(null, false);
        } else {
            cb(null, true);
        }
    },
});

router.route('/').get(getBooks).post(upload.single('image'),addBook);

router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
