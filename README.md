# 🤖 Chatbot Flow Builder

A visual chatbot flow builder built with **React** and **React Flow**. Easily create and connect text-based chatbot nodes, edit them, and validate flow structure with real-time feedback.

---

## 🚀 Live Demo

🌐 [Try the App](https://chatbot-flow-builder-blond-pi.vercel.app)

---

## 📹 Demo Video

🎬 [Watch the Demo](https://github.com/Sumitkatkam/Chatbot-flow-builder/blob/main/ChatBot%20Flow.mp4)  

---

## ✨ Features

- 🔧 Add, connect, and edit **Text Nodes**
- 🔌 Visual connection between nodes using **React Flow**
- ✅ Enforces only one **start node** (no incoming edges)
- ✅ Enforces only one **end node** (no outgoing edges)
- 💾 Save flow as JSON with visual preview
- 🧠 Clean and intuitive UX
- 🎯 Extensible for future node types

---

## 📦 Tech Stack

- ⚛️ React
- 🕸️ React Flow
- 🎨 Tailwind CSS
- ⚡ Vite
- ☁️ Vercel (for deployment)

---

## 📁 Folder Structure

src/
├── components/
│ ├── FlowCanvas.jsx
│ └── nodes/
│ └── TextNode.jsx
├── App.jsx
└── main.jsx

## 📄 Save Validation Logic

Only one node must have no incoming edges (start node)

Only one node can have no outgoing edge (end node)

All nodes can have multiple incoming edges, but only one outgoing edge

Alerts are shown if validations fail
