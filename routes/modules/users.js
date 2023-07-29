const express = require('express')
const router = express.Router()

router.use('/login', (req, res) => {
  res.render('login')
})


router.use('/register', (req, res) => {
  res.render('register')
})

module.exports = router