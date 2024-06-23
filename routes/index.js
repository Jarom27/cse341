const router = require('express').Router()

router.use('/', require('./swagger'))
router.get('/', (req, res) => {
    // #swagger.tags = ['Hello']
    res.send("Hello World")
})
router.use('/contacts', require('./users'))

module.exports = router;