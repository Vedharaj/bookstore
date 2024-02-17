import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    authors: {
        type: mongoose.Schema.Types.Mixed
    },
    averageRating: {
        type: mongoose.Schema.Types.Mixed
    },
    buyLink: {
        type: mongoose.Schema.Types.Mixed
    },
    categories: {
        type: mongoose.Schema.Types.Mixed
    },
    description: {
        type: mongoose.Schema.Types.Mixed
    },
    language: {
        type: String
    },
    pageCount:{
        type: Number
    },
    previewLink: {
        type: String
    },
    publishedDate: {
        type: String
    },
    ratingsCount: {
        type: mongoose.Schema.Types.Mixed
    },
    selfLink: {
        type: String
    },
    thumbnail: {
        type: mongoose.Schema.Types.Mixed
    },
    title: {
        type: String
    },
    webReaderLink: {
        type: String
    },
})

const listsSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    genres: {
        type: [String]
    },
    latest: {
        type: [String]
    },
    popular: {
        type: [String]
    },
    topAuthors: {
        type: [String]
    },
})

const genresSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    genre: {
        type: String
    },
    imgurl: {
        type: String
    },
})

export const Books = mongoose.model('books', bookSchema)
export const Lists = mongoose.model('lists', listsSchema)
export const Genres = mongoose.model('genres', genresSchema)