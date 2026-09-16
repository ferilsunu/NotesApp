const notesModel = require('../models/notes')
const notebookModel = require('../models/notebooks')
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {sendConfirmationEmail} = require('../config/nodemailerConfig')
const passport = require('passport')

module.exports = {
    /*--------- Notes Controller ---------*/
    getIndex: async (req,res)=>{
        const user_logged = {name: req.user.name}
        const user = req.user
        const fetched_notes = await notesModel.find({user:req.user._id}).lean()
        res.render('index',{fetched_notes:fetched_notes,user:user,user_logged:user_logged})
    },
    getAddNote: async(req,res)=>{
        const user_logged = {name: req.user.name}
        const user = req.user
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        res.render('add_note',{fetched_notebooks:fetched_notebooks,user:user,user_logged:user_logged})
    },
    postAddNote: async (req,res)=>{
        if (!req.body.title || !req.body.note) {
            req.flash('error', 'Title and Note content are required')
            return res.redirect('/addNote')
        }
        await new notesModel({
            title: req.body.title,
            note: req.body.note,
            notebook: req.body.notebook,
            user: req.user._id
        }).save()
        req.flash('success_message', 'Note Created')
        res.redirect('/')
    },
    getSingleNotePage: async (req,res)=>{
        const user_logged = {name: req.user.name}
        const user = req.user
        const note_id = req.params.id
        const fetched_single_note = await notesModel.findOne({_id:note_id,user:req.user._id}).lean()
        if (!fetched_single_note) {
            req.flash('error', 'Note not found')
            return res.redirect('/')
        }
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        res.render('edit_note',{fetched_single_note:fetched_single_note, fetched_notebooks:fetched_notebooks,user:user,user_logged:user_logged})
    },
    editNote: async (req,res)=>{
        await notesModel.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            {title: req.body.title, note: req.body.note, notebook: req.body.notebook}
        )
        res.redirect('/')
    },
    deleteNotes: async (req,res)=> {
        const delete_id = req.params.id
        await notesModel.findOneAndDelete({_id:delete_id, user:req.user._id})
        res.redirect('/')
    },
    /*--------- End Notes Controller ---------*/

    /*--------- Notebooks Controller ---------*/
    getNotebooks: async (req,res)=>{
        const user_logged = {name: req.user.name}
        const user = req.user
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        res.render('notebooks',{fetched_notebooks:fetched_notebooks,user:user,user_logged:user_logged})
    },
    postNotebook: async (req,res)=>{
        if (req.body.notebook && req.body.notebook.trim()) {
            await new notebookModel({name: req.body.notebook.trim(), user: req.user._id}).save()
            req.flash('success_message', 'Notebook Created')
        }
        res.redirect('/notebooks')
    },
    getEditInfo: async (req,res)=>{
        const edit_id = req.body.new_id
        const fetched_edit_info = await notebookModel.findOne({_id:edit_id, user:req.user._id})
        res.send(fetched_edit_info)
    },
    editNotebook: async (req,res)=>{
        const update_id = req.body.editInputId
        const newName = req.body.editInput ? req.body.editInput.trim() : ''
        if (update_id && newName) {
            const existing = await notebookModel.findOne({_id: update_id, user: req.user._id})
            if (existing) {
                const oldName = existing.name
                await notebookModel.findByIdAndUpdate(update_id, {name: newName})
                await notesModel.updateMany({notebook: oldName, user: req.user._id}, {notebook: newName})
            }
        }
        res.redirect('/notebooks')
    },
    deleteNotebook: async (req,res)=>{
        try {
            const fetched_notebook = await notebookModel.findOne({_id: req.params.id, user: req.user._id})
            if (fetched_notebook) {
                await notebookModel.findByIdAndDelete(fetched_notebook._id)
                await notesModel.deleteMany({notebook: fetched_notebook.name, user: req.user._id})
            }
        } catch (e) {
            console.error('Error deleting notebook:', e)
        }
        res.redirect('/notebooks')
    },
    getNotebooksNotes: async (req,res)=>{
        const user = req.user
        const user_logged = {name: req.user.name}
        const fetched_notes = await notesModel.find({notebook: req.params.notebook, user: req.user._id}).lean()
        const notebook = {name: req.params.notebook}
        res.render('notebook_notes',{fetched_notes:fetched_notes, notebook:notebook,user:user,user_logged:user_logged})
    },
    /*--------- End Notebooks controller ---------*/

    notfound: (req,res)=>{
        res.status(404).render('404')
    },

    /*--------- Authentication Controllers ---------*/
    getLogin: (req,res)=>{
        if(req.user){
            res.redirect('/')
        } else {
            res.render('login')
        }
    },
    getRegister: (req,res)=>{
        if(req.user){
            res.redirect('/')
        } else {
            res.render('register')
        }
    },
    postRegister: async (req,res)=>{
        const user = req.body
        const user_Exists = await userModel.findOne({email: user.email})
        if (user_Exists) {
            req.flash('error', 'User Exists! Please Login')
            res.redirect('/login')
        } else {               
            try {
                const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '480s'})
                await new userModel({
                    name: user.name,
                    password: bcrypt.hashSync(user.password, 8),
                    email: user.email,
                    confirmationCode: token 
                }).save()
                sendConfirmationEmail(user.name, user.email, token)
                res.render('confirm_mail', {email: req.body.email})
            } catch(eror) {
                if(eror && eror.errors && eror.errors.hasOwnProperty('email')){
                    const message = eror.errors.email.message
                    req.flash('custom_error', message)
                }           
                res.redirect('/register')
            }
        }
    },
    confirmMail: async (req,res)=>{
        const token = req.params.token
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
            if(err){
                const message = {
                    message: 'Link Expired. Please Signup Again!',
                    title: 'Ooops!',
                    button_link: '/register',
                    button_message: 'Register'
                }
                await userModel.findOneAndRemove({confirmationCode: token})
                res.render('mail-confirmed', {message: message})
            } else {
                const confirm_message = {
                    message: 'Email Confirmed, You can login now',
                    title: 'Success!',
                    button_link: '/login',
                    button_message: 'Login'
                }
                await userModel.findOneAndUpdate({confirmationCode: token}, {status: 'active'})
                res.render('mail-confirmed', {message: confirm_message})
            }
        });
    },
    postLogin: (req,res)=>{res.redirect('/')},
    passportMiddleware: passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    logout: (req,res)=>{
        req.logout()
        res.redirect('/login')
    }
    /*--------- End Authentication Controllers ---------*/
}
