## 📘 **Project Title: MERN Stack Notes Vault**

---

### 🎯 **Objective**

Develop a secure, full-stack **Notes Vault** web application that allows authenticated users to create, manage, and organize their notes. Incorporate **Markdown support**, **view-only sharing**, and **version history**, with strong emphasis on **security**, **scalability**, and **user experience**.

---

## 🔧 **Technology Stack**

### **Frontend:**

* **Framework**: React (with **Vite** for blazing-fast builds)
* **Routing**: React Router (with protected routes)
* **State Management**: Context API / Redux (optional)
* **Editor**: Rich text with **Tiptap**
* **Styling**: TailwindCSS or Chakra UI
* **UX Features**: Dark mode toggle, responsive design

### **Backend:**

* **Framework**: Express.js
* **Language**: Node.js (ES Modules or TypeScript optional)
* **Authentication**: JWT-based login/signup with **HTTP-only cookies**
* **Rate Limiting**: Auth endpoints protected using `express-rate-limit`
* **Security Middlewares**: Helmet, CORS, Input sanitization

### **Database:**

* **MongoDB (Atlas or Local)**
* **ODM**: Mongoose

---

## 🧠 **Core Features**

### 🔐 **Authentication & Authorization**

* User registration and login with **JWT**
* JWT stored in **HTTP-only cookies** to prevent XSS
* Middleware to **verify tokens** and protect routes
* **Token expiration** handling on frontend (auto logout)

### 📝 **Notes Management (CRUD)**

* Create, read, update, delete notes
* Markdown formatting with **live preview**
* **Rich text support** (via Tiptap)
* Attach tags/categories to each note
* Filter/search notes by tags or title
* **Only owners** can access or modify their notes

## 📦 **Deployment**

* **Frontend**: Vercel
* **Backend**: Render
* **Database**: MongoDB Atlas

---