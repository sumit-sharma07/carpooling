# 🚗 Smart Carpooling

A full-stack carpooling web app that connects drivers with empty seats to passengers traveling the same way. It helps people share rides, split travel costs, and reduce traffic and pollution.

🌐 **Live Demo:** [carpooling-pi.vercel.app](https://carpooling-pi.vercel.app)

---

## ✨ Features

- 👤 User registration and login
- 🔐 OTP verification
- 🚘 Offer a ride (publish source, destination, date, time, seats, price)
- 🔎 Search and browse available rides
- 🎫 Book a ride / seat
- 🔔 Alerts and notifications in the UI
- 📱 Responsive design

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- CSS
- JavaScript (JSX)

**Backend**
- Node.js
- Express.js
- REST APIs
- dotenv, CORS

**Deployment**
- Frontend: Vercel

---

## 📁 Project Structure

```
carpooling/
├── Backend/
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── Services/
│   ├── Utils/
│   ├── index.js
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── Views/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- npm
- A database (e.g. MongoDB) connection string

### 1. Clone the repository

```bash
git clone https://github.com/sum302/carpooling.git
cd carpooling
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
DB_URL=your_database_connection_string
JWT_SECRET=your_secret_key
```

> Update the variable names to match the ones used in your code.

Start the server:

```bash
npm start
```

### 3. Setup the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The app will run at **http://localhost:5173**

---

## 🔗 API Routes

| Module  | Description                          |
|---------|--------------------------------------|
| User    | Register, login, profile             |
| Ride    | Create, list, and search rides       |
| Booking | Book and manage ride bookings        |
| OTP     | Send and verify OTP                  |

---

## 🌍 CORS

The backend allows requests from:

- `http://localhost:5173` (local development)
- `https://carpooling-pi.vercel.app` (production)

If you deploy the frontend on a different URL, add it to the `cors` origin list in `Backend/index.js`.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**sum302**
GitHub: [@sum302](https://github.com/sum302)

---

⭐ If you like this project, give it a star!
