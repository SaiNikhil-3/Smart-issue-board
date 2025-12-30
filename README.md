# 📌 Smart Issue Board

A **Jira-style issue tracking web application** built using **React and Firebase**, designed to manage issues efficiently using a **Kanban board workflow**.

---

## 🚀 Live Demo
🔗 https://smart-issueboard.vercel.app/

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Styling:** CSS
- **State Management:** React Hooks
- **Hosting:** Vercel (recommended)

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login using Firebase Authentication
- Session-based login
- Displays logged-in user email
- Secure logout functionality

---

### 📝 Issue Management
- Create issues with:
  - Title
  - Description
  - Priority (Low / Medium / High)
- Similar issue detection before creation
- Issues stored securely in Firestore

---

### 📋 Kanban Board
- Three workflow columns:
  - **Open**
  - **In Progress**
  - **Done**
- Drag & Drop issues between columns
- Business rule enforced:
  - ❌ Open → Done (not allowed)
  - ✅ Open → In Progress → Done

---

### 🔍 Search & Filters
- Live search by issue title or description
- Filter issues by:
  - Status
  - Priority
- Real-time UI updates

---

### 📊 Task Bar & Counters
- Sticky task bar for quick access
- Issue count displayed on each column
- Clean and intuitive UI

---

### 🪟 Modal-Based Issue Creation
- Create Issue form opens in a modal popup
- Keeps board context visible
- Close modal via ❌ or background click

---

### 🗑️ Controlled Deletion
- Delete option available **only for Done issues**
- Confirmation prompt before deletion
- Prevents accidental data loss

---

## 📂 Project Structure

```
src/
 ├── App.jsx        # Main app & auth controller
 ├── Auth.jsx       # Login / Signup UI
 ├── Board.jsx      # Kanban board & issue logic
 ├── firebase.js    # Firebase configuration
 ├── App.css        # Styling
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit `.env` files to GitHub.

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🧠 Key Learning Outcomes

- Firebase Authentication & Firestore integration
- Drag-and-drop implementation using HTML5 APIs
- Business rule enforcement in UI
- Modular React component design
- Real-world state handling and filtering logic

---

## 📄 License
This project is for educational and demonstration purposes.

---

## 🙌 Author
**Majji Sai Nikhil**
