# 🚀 GZ Cron Web Alive

> Keep your Node.js apps awake effortlessly using scheduled self-pings 🕒

![npm](https://img.shields.io/npm/v/gzcronwebalive?color=brightgreen&logo=npm)
![downloads](https://img.shields.io/npm/dt/gzcronwebalive?logo=github&color=blue)
![license](https://img.shields.io/github/license/Godszeal/gzcronwebalive?color=yellow)

---

## 💡 Features
✅ Automatic minute-based cron pings  
✅ Keeps Render, Vercel, or Replit apps alive  
✅ Animated terminal logs with spinners and colors  
✅ Lightweight and easy to integrate  

---

## ⚙️ Installation

```bash
npm install gzcronwebalive
```

---

## 🧩 Usage Example

```js
const { startCron } = require('gzcronwebalive');

// Start cron job to keep your app alive
startCron();
```

---

## 📡 Environment Variables

| Variable | Description | Default |
|-----------|--------------|----------|
| `PORT` | Your app port | `3000` |
| `SELF_PING_URL` | The URL to ping | `http://localhost:3000` |

---

## 🖥️ Terminal Demo

```bash
🚀 Starting GZ Cron Web Alive...
🔁 Pinging self to keep app awake...
✅ Self-ping successful at 12:01:00 PM
```

---

## 🧠 Author
**God's Zeal**  
📦 [NPM Package](https://www.npmjs.com/package/gzcronwebalive)  
💻 [GitHub Repository](https://github.com/Godszeal/gzcronwebalive)

---

## ⚖️ License
MIT License © 2025 God's Zeal
