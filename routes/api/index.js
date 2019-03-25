const {Router} = require('express');
const usersRouter = require('./users');
const postsRouter = require('./posts');
const productsRouter = require('./products');

const router = new Router();

router.use('/users',usersRouter);
router.use('/posts',postsRouter);
router.use('/products',productsRouter);

module.exports = router;