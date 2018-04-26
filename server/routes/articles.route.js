const router = require('express').Router()
const {
    getArticles, getOneArticle, getByAuthor, getByCategory,
    create, update, deletes
} = require('../controllers/articles.controller')

router.get('/', function (req, res) {
    // nanti ganti get all articles
    res.status(200).send({
        message: 'Articles'
    })
})
    // .get('/:id', getOneArticle)
    // .get('/author/:name', getByAuthor)
    // .get('/category/:name', getByCategory)
    // .post('/create', create)
    // .put('/update/:id', update)
    // .delete('/delete/:id', deletes)

module.exports = router