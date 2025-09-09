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
| 🔐 **⚡ Redis Caching**     |Backend caching middleware for faster responses on GET routes  |


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
├── .git/                    # Git versioning files
├── .github/                 # GitHub workflows
│   └── workflows/
│       └── jekyll-docker.yml
├── Backend/                 # Backend source code
│   ├── controllers/         # Route controllers
│   │   ├── auth.controller.js
│   │   └── dashBoard.controller.js
│   ├── DB/                  # Database connections
│   │   ├── database.connection.js
│   │   └── redis.connection.js       # Redis client connection
│   ├── middleware/          # Middleware for auth, caching, validation
│   │   ├── auth.middleware.js
│   │   ├── cache.middleware.js       # Redis caching middleware
│   │   ├── jwtverification.middleware.js
│   │   ├── multer.js
│   │   └── projectChecker.middleware.js
│   ├── modals/              # MongoDB models
│   │   ├── project.modal.js
│   │   └── user.modal.js
│   ├── routes/              # API routes
│   │   ├── auth.route.js
│   │   ├── dashboard.route.js
│   │   └── upload.js
│   ├── service/             # Service modules
│   │   ├── cache.service.js           # Redis caching service
│   │   ├── cloudinary.js
│   │   ├── hashPassword.js
│   │   ├── jwtTokenGenerateAndDecode.js
│   │   └── roleVerification.js
│   ├── .env                 # Environment variables
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   ├── package.json
│   ├── package-lock.json
│   └── Readme.md
├── frontend/                # Frontend source code
│   ├── auth/               # Authentication pages
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── auth.css
│   │   └── auth.js
│   ├── dashBoard/          # Dashboards
│   │   ├── admin-dashboard.html
│   │   ├── member-dashboard.html
│   │   └── styles.css
│   ├── noticeboard/        # Notice board module
│   │   ├── noticeboard.html
│   │   ├── script.js
│   │   └── style.css
│   ├── team/               # Team management module
│   │   ├── team.html
│   │   ├── team.css
│   │   └── team.js
│   ├── others/             # Additional pages
│   │   ├── about.html
│   │   ├── contact.html
│   │   └── docuSharing.html
│   ├── public/             # Static assets
│   │   ├── login.png
│   │   └── sign-up.png
│   ├── index.html
│   ├── LICENSE
│   ├── License.md
│   └── script.js
├── .gitignore
├── index.html
├── README.md
└── script.js
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
