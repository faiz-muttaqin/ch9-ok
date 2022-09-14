const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')

route.get('/', (req,res) =>{
    res.send('test')
})
// API User
route.post('/api/user', userController.register)
route.get('/api/user', userController.getUser)

module.exports = route