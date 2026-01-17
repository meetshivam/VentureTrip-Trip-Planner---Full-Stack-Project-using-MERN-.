# 🗺️ VentureTrip | Trip Planner

A **full-stack MERN web application** that helps users plan trips to major global destinations and view **real-time weather forecasts**.

---

## 🚀 Features

* 🌍 Plan trips to major cities around the world
* ☁️ Fetch **real-time weather data** using Open-Meteo API
* 💾 Persistent data storage using **MongoDB (local)**
* ⚡ Fast and responsive UI

---

## 🛠️ Tech Stack

**Frontend**

* React
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (Community Edition – Local via MongoDB Compass)

**API**

* Open-Meteo Weather API

---

## 📌 Project Setup Notes

> ⚠️ This project is designed to run **entirely on a local server**.
> MongoDB runs locally on your machine and stores data using **MongoDB Compass**.
> Internet is only required for fetching weather data from the Open-Meteo API.

---

## 🏁 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd venture-trip-planner
```

---

### 2️⃣ Start MongoDB (macOS)

Ensure MongoDB Community Edition is installed.

```bash
brew services start mongodb-community
```

You should see:

```
MongoDB started successfully
```

Now:

* Open **MongoDB Compass**
* Connect to `mongodb://localhost:27017`

---

### 3️⃣ Install Dependencies

Run this in **both server and client folders**.

```bash
npm install
```

---

### 4️⃣ Start the Backend Server

```bash
cd server
node server.js
```

Backend will start running on the configured port.

---

### 5️⃣ Start the Frontend (Client)

Open a **new terminal window**:

```bash
cd client
npm run dev
```

You’ll see a local development URL like:

```
http://localhost:5173
```

➡️ **Command + Click** on the port to open the app in your browser.

---

## ⏹️ How to Stop Services (Important)

### 🛑 Stop Frontend (Client)

In the terminal where the client is running:

```bash
Ctrl + C
```

---

### 🛑 Stop Backend (Server)

In the terminal where the server is running:

```bash
Ctrl + C
```

---

### 🛑 Stop MongoDB (macOS)

To stop MongoDB running as a background service:

```bash
brew services stop mongodb-community
```

To verify MongoDB status:

```bash
brew services list
```

---

### 🧹 Optional: Kill Port Manually (If Stuck)

If a port is still busy:

```bash
lsof -i :5173
kill -9 <PID>
```

(Replace `5173` with the required port number)

---

## ✅ You’re All Set!

Your **Venture Trip Planner** runs locally with:

* MongoDB connected
* Backend API live
* Frontend UI rendered

---

## 👨‍💻 Author

**Created by Shivam Gautam**

---

⭐ If you like this project, consider giving it a star on GitHub!

## 📄 License

This project is licensed under the **MIT License**.

You are free to:

* Use, copy, modify, and distribute this project
* Use it for personal, academic, or commercial purposes

See the **LICENSE** file for full details.
