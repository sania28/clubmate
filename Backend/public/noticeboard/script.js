
const titleText = "📰 Notice Board";
const titleElement = document.getElementById("typewriter");
let i = 0;

function typeWriter() {
  if (i < titleText.length) {
    titleElement.innerHTML += titleText.charAt(i);
    i++;
    setTimeout(typeWriter, 100); 
  }
}
typeWriter();


const notices = [
  {
    title: "📢 Recruitment Drive",
    message: "Join us for Robonixx recruitment on 10th August at Lab 2, 4PM.",
    date: "2025-08-01",
    author: "Admin"
  },
  {
    title: "📅 Weekly Sync Meeting",
    message: "Don't miss our team sync every Friday at 5 PM in Innovation Lab.",
    date: "2025-07-31",
    author: "Core Team"
  },
  {
    title: "🛠️ Maintenance Alert",
    message: "The server will be under maintenance on 3rd August, 1AM - 4AM.",
    date: "2025-07-30",
    author: "Tech Support"
  }
];

const noticeList = document.getElementById("notice-list");

notices.forEach((notice, index) => {
  const card = document.createElement("div");
  card.className = "notice-card";
  card.style.animationDelay = `${index * 0.2}s`; 

  card.innerHTML = `
    <h3>${notice.title}</h3>
    <p>${notice.message}</p>
    <div class="notice-meta">${notice.date} · ${notice.author}</div>
  `;

  noticeList.appendChild(card);
});
