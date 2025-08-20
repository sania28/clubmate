# Clubmate – Robonixx Club Management System

**ClubMate** is an open-source web platform designed to streamline the operations of student technical clubs like **Robonixx**. It provides tools for event scheduling, team coordination, project tracking, announcements, and resource sharing — all in one place.

---

## 🚀 Features

| Feature                      | Description                                                   |
| ---------------------------- | ------------------------------------------------------------- |
| 📅 **Event Calendar**        | Schedule events, register participants, and manage timelines. |
| 🧑‍💻 **Team Management**       | Add, update, or remove members and assign roles.              |
| 📂 **Project Tracker**       | Showcase ongoing projects, updates, and completion status.    |
| 📰 **Notice Board**          | Pin announcements and updates for all members.                |
| 📁 **Document Sharing**      | Upload meeting notes, resources, and relevant files.          |
| 🔐 **Role-Based Dashboards** | Separate admin and member views with appropriate privileges.  |

---

## 🛠️ Tech Stack

| Frontend           | Backend    | Database    | Tools       |
| ------------------ | ---------- | ----------- | ----------- |
| HTML/CSS           | Node.js    | MongoDB     | Git, GitHub |
| JavaScript / React | Express.js | or Firebase | VS Code     |

---

## 🧩 Project Structure

```bash
clubmate/
├── frontend/                # Frontend code organized by features
│   ├── auth/               # Authentication pages
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── auth.css
│   │   └── auth.js
│   ├── team/               # Team management module
│   │   ├── team.html
│   │   ├── team.css
│   │   └── team.js
│   ├── events/             # Event management pages
│   ├── projects/           # Project tracking module
│   ├── dashboard/          # User dashboards
│   ├── public/             # Static assets (images, icons)
│   ├── styles.css          # Global styles
│   └── index.html          # Landing page
├── backend/                # Merged backend with Cloudinary integration
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Authentication & validation
│   ├── uploads/            # File upload handling
│   ├── config/             # Database & Cloudinary config
│   └── server.js           # Main server file
├── docs/                   # Documentation and resources
└── README.md
```

---

## 🛣️ Roadmap

### ✅ Initial Phase – Planning

- Define core modules and features
- Set up the GitHub repository
- Draft README and contribution plan

### 🚧 Development Phase – To Do

- Build folder structure
- Implement basic user authentication
- Create event calendar module
- Add member management feature
- Enable project tracking UI
- Design dashboards (Admin & Member)
- Set up MongoDB/Firebase connection

### 🔮 Future Plans

- Notification system
- Analytics dashboard (attendance, participation)
- Mobile-friendly UI
- Dark mode toggle

---

## 🧑‍💻 How to Contribute

1. Fork this repository
2. Clone your fork:
   ```bash
   git clone https://github.com/sania28/clubmate.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
4. Make your changes and commit:
   ```bash
   git commit -m "Add: your message"
   ```
5. git push origin feature-name
6. Create a Pull Request (PR) to the main branch of this repo.

---

## 📌 Maintainers

- @sania28 – Project Admin

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🌐 Links

- 🔗 **Live Deployment**: _Not available yet_ — help us launch it!
- 🌟 **Star this project** if you find it useful or want to support development!

---
