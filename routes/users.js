const router = require('express').Router()
const userController = require('../controllers/users')

router.get('/', userController.getAll)
router.get('/:id', userController.getSingle)
router.post("/", userController.addUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router