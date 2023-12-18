const express = require('express')
const app = express()
const methodOverride = require('method-override')
const path = require('path')
const hbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const {select,GenerateDate} = require('./helpers/hb-helpers.js')
const passport = require('passport')
require('dotenv').config()


/*--------- Database Connection---------*/
require('./db/db')
/*--------- End Database Connection---------*/



/*--------- Middleware Configs ---------*/
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'/public')));
app.engine('handlebars',hbs({
defaultLayout:'indexLayout', 
helpers:{
    select:select,
    GenerateDate:GenerateDate}}))
app.set('view engine','handlebars')
//express-session
app.use(session({
    secret: 'FerilCodingKing',
    resave: true,
    saveUninitialized: true
}))
//connect-flash
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_message  = req.flash('success_message')
    res.locals.custom_error = req.flash('custom_error')
    res.locals.error = req.flash('error')
    next()
})
//PassportJS
app.use(passport.initialize());
app.use(passport.session());
//Routes
const indexRouter = require('./routers/indexRouter')
app.use('/',indexRouter)


/*--------- End of Middleware Configs ---------*/

/*--------- Server Error Handler ---------*/
app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).render('500')
  })
/*--------- End Server Error Handler ---------*/


/* Firing the Server */
app.listen(process.env.PORT,()=>{
    console.log('server running')
})
/* End Firing the Server */