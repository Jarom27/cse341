const mongoDb = require('../database')
const { ObjectId } = require('mongodb')

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongoDb.getDatabase().db().collection('users').find()
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(users)
    })
}
const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id)
    const result = await mongoDb.getDatabase().db().collection('users').find({ _id: userId })
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(users)
    })
}
const addUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongoDb.getDatabase().db().collection('users').insertOne(user)
    if (response.acknowledged) {
        res.status(200).send()
    }
    else {
        res.status(500).json(response.error || "Server error ocurred while inserting a new user")
    }
}
const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id)
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongoDb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user)
    console.log(response)
    if (response.modifiedCount > 0) {
        res.status(200).send()
    }
    else {
        console.error(response.error)
        res.status(500).json(response.error || "Server error ocurred while updating user")
    }
}
const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id)
    const response = await mongoDb.getDatabase().db().collection('users').deleteOne({ _id: userId }, true)
    if (response.deletedCount > 0) {
        res.status(200).send()
    }
    else {
        res.status(500).json(response.error || "Server error ocurred while deleting the user")
    }
}
module.exports = {
    getAll,
    getSingle,
    addUser,
    updateUser,
    deleteUser
}