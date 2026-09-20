# NotesApp 📝

> A sleek, minimalist, Notion-inspired personal and team note-taking workspace built for distraction-free writing, rich media formatting, and seamless organization.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Handlebars](https://img.shields.io/badge/Template-Handlebars.js-f0772b?style=flat-square)](https://handlebarsjs.com/)
[![Design](https://img.shields.io/badge/Design_System-Poppins_SaaS-2563eb?style=flat-square)](https://fonts.google.com/specimen/Poppins)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

---

## 🌟 The Story Behind NotesApp

Every developer has a defining milestone—the project where abstract theory turns into tangible craftsmanship. For **Feril Sunu**, NotesApp was that pivotal journey in **2021**.

Conceived as an entry point into full-stack software engineering, NotesApp began with a fundamental question: *How can we craft a digital workspace that feels as effortless, fast, and tactile as thought itself?* What started as an exploration of asynchronous JavaScript, RESTful APIs, and document datastores has since evolved into a refined, production-grade workspace application combining modern UX sensibilities, intelligent clipboard parsing, and resilient auto-saving architecture.

---

## ✨ Key Capabilities & Features

### 📄 Borderless Notion-Style Workspace
- **Seamless Canvas**: Write distraction-free on a clean, borderless document surface.
- **Dynamic Multi-line Titles**: Large typography titles wrap effortlessly and auto-expand to accommodate long headings without horizontal truncation.
- **Zen Focus & Sidebar Collapse**: Toggle the sidebar anytime (`Ctrl+\`) to give your thoughts the full viewport.
- **Full-Width Canvas Mode**: Expand the writing canvas from compact 860px to 100% viewport width with one click.

### ⚡ Intelligent Auto-Save Engine
- **Zero Interruption**: Say goodbye to manual save buttons. Changes automatically synchronize to the database in real-time.
- **Client State Diffing**: Sophisticated dirty-checking compares document states before issuing requests, eliminating redundant writes.
- **Debounced Network I/O**: Network requests are intelligently throttled (800ms debounce) to optimize server throughput.
- **Page Unload Protection**: Utilizes the `Navigator.sendBeacon` API to ensure in-flight edits are flushed reliably even when navigating away or closing tabs.

### 📋 Rich Text & ChatGPT Clipboard Sanitizer
- **Smart Paste Processing**: Copy content directly from ChatGPT, web articles, or Markdown sources without losing headings, bullet lists, code blocks, or bold formatting.
- **Style Cleansing**: Strips invasive external background colors, foreign fonts, and problematic root-level bold tags to keep your document typography clean and uniform.
- **Formatting Toolbar**: Floating, sticky formatting controls for Headings (H1/H2/H3), Blockquotes, Code Blocks, Strikethrough, Alignments, and Links. Hide or show toolbar with `Ctrl+Shift+F`.

### 📂 Notebooks & Hierarchical Organization
- **Notebook Management**: Group notes by projects, personal journals, or technical documentation.
- **Instant Switcher**: Rapidly switch or assign notebook categories from the breadcrumb selector.
- **CRUD Operations**: Full notebook creation, renaming, and filtering workflows.

### 🔍 Dual Views & Instant Search
- **Grid vs. Table View**: Switch seamlessly between visual cards with rich content previews and high-density data tables.
- **Instant Search**: Real-time client-side search filtering across titles, content, and notebooks with zero latency.
- **Interactive Rows**: Click anywhere on a table row or card to immediately open and edit.

### 🛡️ Enterprise-Grade Authentication & Security
- **Passport.js Authentication**: Secure session-based auth with salted and hashed passwords using `bcryptjs`.
- **Email Verification**: Built-in verification workflow via Nodemailer and secure token hashing.
- **Session Protection**: Encrypted MongoDB session storage with `express-session` and `connect-mongo`.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Asynchronous event-driven JavaScript server environment |
| **Web Framework** | Express.js | Robust routing, middleware pipeline, and HTTP server |
| **Database** | MongoDB & Mongoose | Schematized document database with ACID transactions |
| **Template Engine** | Express-Handlebars | Semantic server-rendered views with custom helpers |
| **Authentication** | Passport.js & Bcrypt | User authentication, session management, password hashing |
| **Typography & UI** | Poppins & CSS Design System | Modern minimalist SaaS aesthetics, sleek custom scrollbars |
| **Client-Side Engine** | Modern Vanilla JS & jQuery | Contenteditable engine, DOMParser sanitizer, DataTables |

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>\</kbd> or <kbd>Cmd</kbd> + <kbd>\</kbd> | Toggle Sidebar (Focus Mode) | Global |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | Toggle Formatting Toolbar | Editor Canvas |
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | Bold Selection | Editor Canvas |
| <kbd>Ctrl</kbd> + <kbd>I</kbd> | Italicize Selection | Editor Canvas |
| <kbd>Ctrl</kbd> + <kbd>U</kbd> | Underline Selection | Editor Canvas |
| <kbd>Tab</kbd> | Indent Text (4 spaces) | Editor Canvas |
| <kbd>Enter</kbd> | Move from Title to Editor Body | Title Field |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/ferilsunu/NotesApp.git
cd NotesApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/notesapp
JWT_SECRET=your_jwt_secret_key_here
USER=your_email@domain.com
PASSWORD=your_email_app_password
APP_URL=http://localhost:3000/
```

### 4. Run Application
```bash
# Start the production server
npm start

# Or run with nodemon for live development reloading
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```text
NotesApp/
├── config/              # Passport & authentication configuration
├── models/              # Mongoose database models (User, Note, Notebook)
├── public/              # Static assets
│   ├── css/
│   │   └── custom-style.css   # Poppins design system & responsive styling
│   └── js/
│       └── custom-script.js   # Global utility scripts
├── routes/              # Express routing modules
│   ├── auth.js          # Authentication & verification endpoints
│   ├── notes.js         # Notes CRUD & auto-save endpoints
│   └── notebooks.js     # Notebooks management endpoints
├── views/               # Handlebars templates
│   ├── layouts/         # Base layout wrappers
│   ├── partials/        # Reusable headers, footers, sidebars, modals
│   ├── add_note.handlebars
│   ├── edit_note.handlebars
│   ├── index.handlebars
│   └── notebooks.handlebars
├── .env.example         # Environment template
├── app.js               # Application entry point & middleware bootstrap
└── package.json         # Project metadata & dependencies
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use it for personal or commercial projects.

---

<div align="center">
  <sub>Crafted with passion and precision by <strong><a href="https://github.com/ferilsunu">Feril Sunu</a></strong></sub>
</div>
