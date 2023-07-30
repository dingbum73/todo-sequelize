const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParsr = require('body-parser')
const routes = require('./routes/index')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT

// setting template engine
app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: '.hbs' }).engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParsr.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

// 設定middleware ，在passport之後
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})



app.use(routes)




app.listen(port, () => {
  console.log(`It's running on localhost:${port}`)
})