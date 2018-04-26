const router = require('express').Router()
const {
    getArticles, getOneArticle, getByAuthor, getByCategory,
    create, update, deletes
} = require('../controllers/articles.controller')
const {loginAuth} = require('../middleware/loginAuth')

router.get('/', getArticles)
    .get('/:id', getOneArticle)
    .get('/author/:id', getByAuthor)
    .get('/category/:name', getByCategory)
    .post('/create', loginAuth, create)
    .put('/update/:id', loginAuth, update)
    .delete('/delete/:id', loginAuth, deletes)

module.exports = router