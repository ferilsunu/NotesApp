const express = require('express')
const router = express.Router()

const {  getIndex,getAddNote,postAddNote,
         getNotebooks,postNotebook,deleteNotes,
         getEditInfo,editNotebook,getSingleNotePage,
         editNote,deleteNotebook,getNotebooksNotes,
         getLogin,getRegister,postRegister,
         confirmMail, postLogin,
         passportMiddleware,logout,notfound} = require('../controllers/indexController')

 
/*--------- Importing the required modules ---------*/
const {authenticatedChecker} = require('../config/authChecker')
const userModel = require('../models/user')
/*--------- End of importing the  modules ---------*/


/*--------- Passport js config ---------*/
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {customFiledOptions,verifyCallback,serializeUser,deserializeUser} = require('../config/passportConfig')
const strategy = new LocalStrategy(customFiledOptions,verifyCallback)
passport.use(strategy)
passport.serializeUser(serializeUser);  
passport.deserializeUser(deserializeUser);
/*--------- end of Passport js config ---------*/
         
/*--------- Authentication Routes ---------*/
router.route('/').get(authenticatedChecker,getIndex)
router.route('/login').get(getLogin)
router.route('/login').post(passportMiddleware,postLogin)
router.route('/logout').get(logout)
router.route('/confirm/:token').get(confirmMail)
router.route('/register')
.get(getRegister)
.post(postRegister)
/*--------- End of Authentication Routes ---------*/

/*--------- Notes Routes ---------*/
router.route('/notes/:id').delete(authenticatedChecker,deleteNotes)
router.route('/SingleNote/:id').get(authenticatedChecker,getSingleNotePage)
router.route('/editNote/:id').put(authenticatedChecker,editNote)
router.route('/addNote')
.get(authenticatedChecker,getAddNote)
.post(authenticatedChecker,postAddNote)
/*--------- End of Notes Routes ---------*/

/*--------- Notebooks Routes ---------*/
router.route('/notebooks',authenticatedChecker).get(authenticatedChecker,getNotebooks)
router.route('/notebooks/delete/:id').delete(authenticatedChecker,deleteNotebook)
router.route('/addNotebook',authenticatedChecker).post(authenticatedChecker,postNotebook)
router.route('/getEditInfo').post(authenticatedChecker,getEditInfo)
router.route('/editNotebook').put(authenticatedChecker,editNotebook)
router.route('/notebooks/:notebook').get(authenticatedChecker,getNotebooksNotes)
/*--------- End of Notebooks Routes ---------*/


/*--------- Error Page ---------*/
router.route('*').get(notfound)
/*--------- End Of Error Page ---------*/


module.exports = router