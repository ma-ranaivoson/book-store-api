const asyncHandler = require('../middlewares/asyncHandler');
const Book = require('../models/Book');
const ErrorResponse = require('../utils/ErrorResponse');

// @route   GET /api/v1/books
// @desc    Get all books to the database
// @access  Public
exports.getBooks = asyncHandler(async (req, res, next) => {
    // Show books with limit, sort, page (PAGINATION)
    let query = Book.find();

    // Limit the results
    if (req.query.limit) {
        query = query.limit(parseInt(req.query.limit));
    }

    // Adding page using skip
    if (req.query.page) {
        query = query.skip(parseInt(req.query.page) - 1);
    }

    // Sort the results in ASC by default
    query = query.sort({ title: 1 });

    const books = await query;

    if (!books) {
        next(new ErrorResponse('There is no book in the database'));
    }

    // Pagination object
    const pagination = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Book.countDocuments();

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    res.status(200).json({
        success: true,
        count: books.length,
        pagination,
        data: books,
    });
});

// @route   GET /api/v1/books/:id
// @desc    Get a single book by id
// @access  Public
exports.getBook = asyncHandler(async (req, res, next) => {
    const books = await Book.findById(req.params.id);

    if (!books) {
        return next(
            new ErrorResponse(
                `There is no book with the id of ${req.params.id} in the database`,
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        data: books,
    });
});

// @route   POST /api/v1/books
// @desc    Adding a book
// @access  Private
exports.addBook = asyncHandler(async (req, res, next) => {
    const book = req.body;
    const file = req.file;

    if(!file) {
        return next(new ErrorResponse('No image found', 404));
    }

    if (!book) {
        return next(new ErrorResponse('No book added', 404));
    }

    book.cover = `uploads/${file.filename}`;

    await Book.create(book);

    res.status(201).json({
        success: true,
        data: book,
    });
});

// @route   PUT /api/v1/books/:id
// @desc    Update a book
// @access  Private
exports.updateBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });

    if (!book) {
        return next(new ErrorResponse('No book found', 404));
    }

    res.status(200).json({
        success: true,
        data: book,
    });
});

// @route   DELETE /api/v1/books/:id
// @desc    Delete a book
// @access  Private
exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorResponse('No book found', 404));
    }

    book.remove();

    res.status(200).json({
        success: true,
        data: {},
    });
});
