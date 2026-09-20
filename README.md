# NotesApp

A clean, minimalist note-taking workspace built with Node.js, Express, MongoDB, and Handlebars. Designed for distraction-free writing, rich formatting, and straightforward organization.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Handlebars](https://img.shields.io/badge/Template-Handlebars.js-f0772b?style=flat-square)](https://handlebarsjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

---

## The Story Behind NotesApp

Back in 2021, I started building NotesApp as a hands-on way to learn full-stack web development. I wanted to move beyond tutorials and build a real application from scratch, exploring how authentication, REST APIs, databases, and server-rendered templates fit together.

Over time, as I used the app and refined my development skills, I kept improving it: moving to a borderless Notion-style interface, building an auto-save engine so I never lose notes, adding smart clipboard pasting for content from tools like ChatGPT, and polishing the overall workflow. NotesApp represents both where my full-stack journey began and how continuous iteration can turn a learning project into a daily driver.

---

## Features

### Borderless Document Editor
- **Distraction-Free Canvas**: Clean, borderless writing surface focused on your text.
- **Auto-Expanding Titles**: Multi-line note titles that wrap naturally as you type instead of cutting off.
- **Focus Mode**: Collapse the sidebar anytime with `Ctrl+\` to give yourself more room to write.
- **Full-Width Toggle**: Switch between a centered reading column and full-width canvas.

### Auto-Save Engine
- **No Manual Saving Needed**: Notes sync to the database automatically as you write.
- **Efficient Diffing**: Compares note state before firing network requests, skipping redundant database writes.
- **Debounced Requests**: Changes are batched with an 800ms debounce to keep server load light.
- **Beacon API Support**: Uses `navigator.sendBeacon` to save any pending edits even if you close the tab or navigate away.

### Rich Text & Clipboard Handling
- **Smart Paste Support**: Pasting from ChatGPT or web pages preserves structure (headings, lists, code blocks, bold, italics) without breaking note styling or turning entire paragraphs bold.
- **Formatting Controls**: Inline toolbar for headings, quotes, code blocks, lists, and links. Can be toggled with `Ctrl+Shift+F`.

### Notebooks & Organization
- **Notebook Categories**: Group notes into dedicated notebooks (Work, Personal, Ideas, etc.).
- **Quick Switcher**: Change or assign notebooks directly from the editor header.
- **Manage Notebooks**: Create, rename, and organize notebooks from a dedicated dashboard.

### Dual Views & Search
- **Grid and Table Views**: Choose between visual preview cards or a compact data table.
- **Live Search**: Instant client-side filtering across note titles, notebooks, and content.
- **Clickable Rows**: Click anywhere on a table row or card to jump straight into editing.

### Authentication & Security
- **User Accounts**: Authentication powered by Passport.js with password hashing via `bcryptjs`.
- **Email Confirmation**: Account activation flow via Nodemailer.
- **Session Security**: Session cookies stored and encrypted in MongoDB.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating**: Express-Handlebars
- **Authentication**: Passport.js (Local Strategy), Bcryptjs
- **Frontend / Styling**: Vanilla JavaScript, jQuery, Bootstrap 4.6, Poppins typography, custom CSS

---

## Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| `Ctrl + \` or `Cmd + \` | Toggle sidebar (Focus mode) | Anywhere |
| `Ctrl + Shift + F` | Toggle formatting toolbar | Editor |
| `Ctrl + B` | Bold text | Editor |
| `Ctrl + I` | Italicize text | Editor |
| `Ctrl + U` | Underline text | Editor |
| `Tab` | Insert 4-space indent | Editor |
| `Enter` | Move focus from title to note body | Title field |

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas connection string)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/ferilsunu/NotesApp.git
cd NotesApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the project root:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/notesapp
JWT_SECRET=your_jwt_secret_key
USER=your_email@domain.com
PASSWORD=your_email_app_password
APP_URL=http://localhost:3000/
```

### 4. Run the app
```bash
# Production start
npm start

# Development mode with auto-reload
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Project Structure

```text
NotesApp/
├── config/              # Passport authentication configuration
├── models/              # Mongoose data models (User, Note, Notebook)
├── public/              # Static files (CSS stylesheets, custom scripts, icons)
│   ├── css/
│   │   └── custom-style.css
│   └── js/
│       └── custom-script.js
├── routes/              # Express route handlers
│   ├── auth.js          # Authentication and email verification
│   ├── notes.js         # Notes CRUD and auto-save endpoints
│   └── notebooks.js     # Notebook management
├── views/               # Handlebars views and partial templates
│   ├── layouts/
│   ├── partials/
│   ├── add_note.handlebars
│   ├── edit_note.handlebars
│   ├── index.handlebars
│   └── notebooks.handlebars
├── app.js               # Express application entry point
├── package.json
└── README.md
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Built by [Feril Sunu](https://github.com/ferilsunu).
