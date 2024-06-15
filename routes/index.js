const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("Hello World")
})
router.use('/contacts', require('./users'))

module.exports = router;