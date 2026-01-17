# 📊 Automated Data Labeling Dashboard

An AI-powered full-stack dashboard that allows users to upload raw datasets (JSON / CSV), automatically label data using Large Language Models (Claude / OpenAI), review results, and track labeling progress — built using an **in-memory database** for fast prototyping and demos.

---

## 🚀 Features

- 📁 Upload datasets in **JSON or CSV** format  
- 🤖 **Automated data labeling** using LLMs (Claude / OpenAI)  
- 📝 Review and override AI-generated labels  
- 📊 Real-time labeling progress tracking  
- ⚡ In-memory database (no MongoDB required)  
- 🧠 Graceful handling of API rate limits (429 errors)  
- 🎨 Clean UI built with React & Ant Design  

---

## 🧠 Why In-Memory Database?

This project intentionally uses an **in-memory data store** instead of MongoDB to:

- Eliminate external setup for assignments and demos  
- Enable rapid prototyping and iteration  
- Clearly model dataset lifecycle states (`pending → labeled → reviewed`)  
- Keep the backend stateless and lightweight  

> The architecture allows easy migration to MongoDB or PostgreSQL later without changing API contracts.

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Ant Design
- Axios
- Vite

### Backend
- Node.js
- Express.js
- In-memory data store (JavaScript objects)
- Claude API (Anthropic) / OpenAI API
- CSV parsing (`csv-parse`)

---

## 📁 Project Structure

