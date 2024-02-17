import express from 'express'
import { Books, Lists, Genres } from '../models/bookstore.js'

const router = express.Router()

router.get('/authors', async (req, res) => {
    try {
            const topAuthors = await Lists.find({}, {topAuthors: {$slice :[Math.random()*103, 8]}, _id: 0, genres: 0, latest: 0, popular: 0 })
            return res.status(200).json({ success: true, data: topAuthors[0].topAuthors })
    } catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})

router.get('/popular', async (req, res) => {
    const { limit, page } = req.query
    try {
        if (!page && !limit) {
            const popular = await Lists.find({}, { popular: { $slice: [0, 10] }, _id: 0, genres: 0, latest: 0, topAuthors: 0 })
            const books = await Books.find({ _id: { $in: popular[0].popular } }, { selfLink: 0 })
            return res.status(200).json({ success: true, data: books })
        } else {
            const popular = await Lists.find({}, { popular: { $slice: [Number(page) * Number(limit), Number(limit)] }, _id: 0, genres: 0, latest: 0, topAuthors: 0 })
            const books = await Books.find({ _id: { $in: popular[0].popular } }, { selfLink: 0 })
            return res.status(200).json({ success: true, data: books })
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})

router.get('/latest', async (req, res) => {
    const { limit, page } = req.query
    try {
        if (!limit) {
            const latest = await Lists.find({}, { latest: { $slice: [Number(page) * Number(limit), 18] }, _id: 0, genres: 0, popular: 0, topAuthors: 0 })
            const books = await Books.find({ _id: { $in: latest[0].latest } }, { selfLink: 0 })
            return res.status(200).json({ success: true, data: books })
        } else if (!page) {
            const latest = await Lists.find({}, { latest: { $slice: [0, Number(limit)] }, _id: 0, genres: 0, popular: 0, topAuthors: 0 })
            const books = await Books.find({ _id: { $in: latest[0].latest } }, { selfLink: 0 })
            return res.status(200).json({ success: true, data: books })
        } else if (!page && !limit) {
            const popular = await Lists.find({}, { latest: { $slice: [0, 10] }, _id: 0, genres: 0, popular: 0, topAuthors: 0 })
            const books = await Books.find({ _id: { $in: latest[0].latest } }, { selfLink: 0 })
            return res.status(200).json({ success: true, data: books })
        } else {
            const latest = await Lists.find({}, { latest: { $slice: [Number(page) * Number(limit), Number(limit)] }, _id: 0, genres: 0, popular: 0, topAuthors: 0 })
            const books = await Books.find({ _id: { $in: latest[0].latest } }, { selfLink: 0 })
            return res.status(200).json({ success: true, data: books })
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})
    
router.get("/genres", async (req, res) => {
    const { limit, page } = req.query
    try {
        if (!limit && !page) {
            const genres = await Genres.find({}).limit(10).skip(0)
            return res.status(200).json({ success: true, data: genres })
        } else {
            const genres = await Genres.find({}).limit(Number(limit)).skip(Number(page)*Number(limit))
            return res.status(200).json({ success: true, data: genres })
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})

router.get('/books', async (req, res) => {
    const { authors, categories, limit, page } = req.query
    try {
        if(authors){
            const book = await Books.find({authors: authors }).limit(Number(limit)).skip(Number(page)*Number(limit))
            res.status(200).json({ success: true, data: book })
        } else if(categories){
            const book = await Books.find({categories: categories }).limit(Number(limit)).skip(Number(page)*Number(limit))
            res.status(200).json({ success: true, data: book })
        } else{
            const book = await Books.find().limit(10).skip(0)
            res.status(200).json({ success: true, data: book })
        }
    } catch (error) {
        res.status(200).json({ success: false, msg: error })
    }
})

router.get('/book/:id', async (req, res) => {
    const {id} = req.params
    try {
        const book = await Books.find({ _id: id })
        res.status(200).json({ success: true, data: book })
    } catch (error) {
        res.status(200).json({ success: false, msg: error })
    }
})



router.get('/search', async (req, res) => {
    try {
        const { q, limit, genres, page } = req.query
        const reg = new RegExp(q, 'i')
        if (!q) {
            const book = await Books.find({ categories: {$in : [genres]} }).limit(Number(limit)).skip(Number(page)*Number(limit))
            return res.status(200).json({ success: true, data: book })
        } else if (!genres) {
            const book = await Books.find({title: { $regex: reg }} ).limit(Number(limit)).skip(Number(page)*Number(limit))
            return res.status(200).json({ success: true, data: book })
        } else if (q && genres) {
            const book = await Books.find({ $and: [{title: { $regex: reg }}, {categories: {$in : [genres]}}] }).limit(Number(limit)).skip(Number(page)*Number(limit))
            return res.status(200).json({ success: true, data: book })
        } else if (!q){
            return res.status(400).json({ success: false, msg: "provide search query" })
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: err })
    }
})

export default router