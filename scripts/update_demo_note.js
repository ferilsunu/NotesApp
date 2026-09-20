const mongoose = require('mongoose');
const Note = require('../models/notes');
require('dotenv').config({ path: __dirname + '/../.env' });

const dbUrl = process.env.DB_URL || 'mongodb://notesapp_user:j7C9AOEdbAhntvHb36nm-J8zdEsClAP1@127.0.0.1:27017/notesapp?authSource=notesapp';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
  const noteId = '68ea6be8268492046e0b887c';
  const newTitle = 'Welcome to NoteX • The Story Behind It';
  const newContent = `<h2>Welcome to NoteX! 👋</h2>
<p>If you are reading this, welcome to my personal workspace. This project holds a deeply sentimental place in my journey as a software engineer.</p>

<h3>🌱 Where It All Began (2021)</h3>
<p>Back in 2021, I was fascinated by how code could turn a blank screen into a functional, living product. I wanted a personal digital sanctuary where I could capture fleeting ideas, technical discoveries, and daily reflections without distractions or clutter.</p>

<p>More than just building a note-taking tool, this project marked my <strong>official entry point into full-stack web development</strong>. Every layer of this application—from the Node.js/Express backend and MongoDB database models to Handlebars templating and authentication workflows—served as the foundational classroom where I learned how real-world full-stack systems operate.</p>

<blockquote>
  "Every great milestone in software engineering begins with a project you care about deeply. For me, NoteX was that spark."
  <br>— <strong>Feril Sunu</strong>
</blockquote>

<h3>💡 What This Project Taught Me</h3>
<ul>
  <li><strong>Full-Stack Architecture:</strong> Structuring scalable server-side rendering with Express and flexible database schemas with MongoDB.</li>
  <li><strong>Product Design & UX:</strong> Crafting focused, distraction-free workspaces with instant search, notebook categorization, and clean typography.</li>
  <li><strong>Engineering Growth:</strong> Deploying to Linux cloud servers, managing PM2 production processes, and continuously refining architecture.</li>
</ul>

<h3>🚀 Looking Ahead</h3>
<p>Years later, seeing this application evolve into a modern, refined workspace with Poppins typography, bespoke rich text editing, and streamlined notebook management is a reminder of the power of curiosity, persistence, and passion for software craftsmanship.</p>

<p>Feel free to explore, create notebooks, and write your own notes. Thank you for being here!</p>

<p>Warm regards,<br><strong>Feril Sunu</strong></p>`;

  const updated = await Note.findByIdAndUpdate(noteId, {
    title: newTitle,
    note: newContent,
    notebook: 'Musings & Memories',
    date: new Date()
  }, { new: true });

  if (updated) {
    console.log('SUCCESS: Note successfully updated ->', updated.title);
  } else {
    console.log('Note not found with id:', noteId);
  }
  process.exit(0);
}).catch(err => {
  console.error('Error updating note:', err);
  process.exit(1);
});
