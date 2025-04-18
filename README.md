# 🚀 Linkspire Networking & Job Board App

A modern, responsive frontend application built with **React + Vite** that helps professionals showcase their profiles, explore job opportunities, and connect with others in their field. The app supports dynamic views, job filtering, localStorage persistence, toast notifications, and animated UI transitions — all without using complex routing libraries.

---

## ✨ Features

- ⚡ **Fast Setup** with [Vite](https://vitejs.dev/)
- 🔥 **React 19** with **lazy-loaded components** and `Suspense`
- 🎨 **Tailwind CSS** for responsive design and dark mode support
- 💬 **Toast Notifications** via `react-toastify`
- 🎞️ **Framer Motion** animations for smooth UI transitions
- 💡 **Onboarding Modal** for first-time users (controlled via `localStorage`)
- 🌐 **Hash-based routing** (`#Profiles`, `#Jobs`, `#For You`) without React Router
- 💼 **Job filtering** by location and type with applied job tracking
- 🧠 **Featured Profiles** and **network graph** rendering
- 🧪 Extensible component structure for Profile Cards, Job Cards, Modals, etc.

---

## 📦 Tech Stack

| Tech | Purpose |
|------|---------|
| [React](https://reactjs.org/) | UI library |
| [Vite](https://vitejs.dev/) | Fast build tool |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Notifications |
| [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) + `Suspense` | Lazy component loading |

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AhmadPiracha/linkspire-app.git
cd linkspire-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

> App will be running at `http://localhost:5173`

---

## 🌈 Usage Guide

- Switch between **Profiles**, **Jobs**, and **For You** using the top navigation.
- Apply filters in the **Jobs** section by location or job type.
- Use the **Connect** and **Apply** buttons to interact — a modal will open with additional actions.
- First-time visitors will see a quick **onboarding modal**.
- Applied jobs and filters are **saved to localStorage**, so your state persists on reload.
- Use the **dark/light toggle** in the navbar for theme switching.
- Navigate directly using hash links like:
  - `/#Profiles`
  - `/#Jobs`
  - `/#For You`

---

## 📁 Project Structure

```bash
.
├── components/
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── ProfileCard.jsx (lazy)
│   ├── JobCard.jsx (lazy)
│   ├── Modal.jsx (lazy)
│   └── NetworkGraph.jsx (lazy)
├── data/
│   └── data.js
├── App.jsx
├── main.jsx
├── index.css
└── vite.config.js
```

---

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📬 Contact

For feedback, collaboration, or job opportunities:
- GitHub: [@ahmadpiracha](https://github.com/ahmadpiracha)
- Email: ahmadpiracha3@gmail.com

---

> Built with ❤️ using React + Vite + Tailwind + Framer Motion
```

---

Would you like me to generate badges (build, license, etc.) or tailor this to a specific GitHub repo structure?