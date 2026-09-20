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
        const user_logged = {name: req.user.name, email: req.user.email}
        const user = req.user
        const fetched_notes = await notesModel.find({user:req.user._id}).sort({date: -1, _id: -1}).lean()
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        
        // Count notes per notebook for filter pills
        const notebooksWithCount = fetched_notebooks.map(nb => {
            const count = fetched_notes.filter(n => n.notebook === nb.name).length
            return { ...nb, noteCount: count }
        })

        res.render('index',{
            fetched_notes: fetched_notes,
            fetched_notebooks: notebooksWithCount,
            totalNotes: fetched_notes.length,
            totalNotebooks: fetched_notebooks.length,
            user: user,
            user_logged: user_logged,
            activeNav: 'notes'
        })
    },
    getAddNote: async(req,res)=>{
        const user_logged = {name: req.user.name, email: req.user.email}
        const user = req.user
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        res.render('add_note',{
            fetched_notebooks: fetched_notebooks,
            user: user,
            user_logged: user_logged,
            activeNav: 'addNote'
        })
    },
    postAddNote: async (req,res)=>{
        try {
            const title = (req.body.title && req.body.title.trim()) ? req.body.title.trim() : 'Untitled';
            const note = req.body.note || '';
            const notebook = req.body.notebook || 'General';

            const newNote = await new notesModel({
                title: title,
                note: note,
                notebook: notebook,
                user: req.user._id,
                date: new Date()
            }).save();

            const isJson = req.xhr || (req.headers.accept && req.headers.accept.includes('json')) || req.is('json') || req.headers['x-requested-with'] === 'XMLHttpRequest';
            if (isJson) {
                return res.json({ success: true, noteId: newNote._id, message: 'Note saved' });
            }

            req.flash('success_message', 'Note created successfully');
            res.redirect('/');
        } catch (err) {
            console.error('Error in postAddNote:', err);
            const isJson = req.xhr || (req.headers.accept && req.headers.accept.includes('json')) || req.is('json') || req.headers['x-requested-with'] === 'XMLHttpRequest';
            if (isJson) {
                return res.status(500).json({ success: false, error: err.message });
            }
            req.flash('error', 'Failed to create note');
            res.redirect('/addNote');
        }
    },
    getSingleNotePage: async (req,res)=>{
        const user_logged = {name: req.user.name, email: req.user.email}
        const user = req.user
        const note_id = req.params.id
        const fetched_single_note = await notesModel.findOne({_id:note_id,user:req.user._id}).lean()
        if (!fetched_single_note) {
            req.flash('error', 'Note not found')
            return res.redirect('/')
        }
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        res.render('edit_note',{
            fetched_single_note: fetched_single_note,
            fetched_notebooks: fetched_notebooks,
            user: user,
            user_logged: user_logged,
            activeNav: 'notes'
        })
    },
    editNote: async (req,res)=>{
        try {
            const title = (req.body.title && req.body.title.trim()) ? req.body.title.trim() : 'Untitled';
            const note = req.body.note || '';
            const notebook = req.body.notebook || 'General';

            const updated = await notesModel.findOneAndUpdate(
                {_id: req.params.id, user: req.user._id},
                {title: title, note: note, notebook: notebook},
                {new: true}
            );

            const isJson = req.xhr || (req.headers.accept && req.headers.accept.includes('json')) || req.is('json') || req.headers['x-requested-with'] === 'XMLHttpRequest';
            if (isJson) {
                if (!updated) {
                    return res.status(404).json({ success: false, error: 'Note not found' });
                }
                return res.json({ success: true, message: 'Saved', updated_at: new Date() });
            }

            req.flash('success_message', 'Note updated successfully');
            res.redirect('/');
        } catch (err) {
            console.error('Error in editNote:', err);
            const isJson = req.xhr || (req.headers.accept && req.headers.accept.includes('json')) || req.is('json') || req.headers['x-requested-with'] === 'XMLHttpRequest';
            if (isJson) {
                return res.status(500).json({ success: false, error: err.message });
            }
            req.flash('error', 'Failed to update note');
            res.redirect('/');
        }
    },
    deleteNotes: async (req,res)=> {
        const delete_id = req.params.id
        await notesModel.findOneAndDelete({_id:delete_id, user:req.user._id})
        req.flash('success_message', 'Note deleted successfully')
        res.redirect('/')
    },
    /*--------- End Notes Controller ---------*/

    /*--------- Notebooks Controller ---------*/
    getNotebooks: async (req,res)=>{
        const user_logged = {name: req.user.name, email: req.user.email}
        const user = req.user
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).sort({date: -1}).lean()
        const all_notes = await notesModel.find({user:req.user._id}).lean()
        
        // Calculate notes count per notebook
        const notebooksWithCount = fetched_notebooks.map(nb => {
            const count = all_notes.filter(n => n.notebook === nb.name).length
            return { ...nb, noteCount: count }
        })

        res.render('notebooks',{
            fetched_notebooks: notebooksWithCount,
            totalNotebooks: fetched_notebooks.length,
            totalNotes: all_notes.length,
            user: user,
            user_logged: user_logged,
            activeNav: 'notebooks'
        })
    },
    postNotebook: async (req,res)=>{
        if (req.body.notebook && req.body.notebook.trim()) {
            await new notebookModel({
                name: req.body.notebook.trim(),
                user: req.user._id,
                date: new Date()
            }).save()
            req.flash('success_message', 'Notebook created successfully')
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
                req.flash('success_message', 'Notebook updated successfully')
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
                req.flash('success_message', 'Notebook deleted successfully')
            }
        } catch (e) {
            console.error('Error deleting notebook:', e)
        }
        res.redirect('/notebooks')
    },
    getNotebooksNotes: async (req,res)=>{
        const user = req.user
        const user_logged = {name: req.user.name, email: req.user.email}
        const notebookName = req.params.notebook
        const fetched_notes = await notesModel.find({notebook: notebookName, user: req.user._id}).sort({date: -1, _id: -1}).lean()
        const fetched_notebooks = await notebookModel.find({user:req.user._id}).lean()
        const notebook = {name: notebookName, count: fetched_notes.length}
        res.render('notebook_notes',{
            fetched_notes: fetched_notes,
            fetched_notebooks: fetched_notebooks,
            notebook: notebook,
            user: user,
            user_logged: user_logged,
            activeNav: 'notebooks'
        })
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
