// ================= FIREBASE SETUP =================
const firebaseConfig = {
  apiKey: "AIzaSyCYJY8PoJSoH_xiyrRHATjj-43j0Q9CrRQ",
  authDomain: "bha-ai-admin.firebaseapp.com",
  projectId: "bha-ai-admin"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ================= ROBOT UI =================
const robot = document.createElement("div");
robot.className = "robot-launcher";

robot.innerHTML = `
  <div class="robot-head">
    <div class="robot-face">
      <div>
        <div class="robot-eyes">
          <div class="eye"></div>
          <div class="eye"></div>
        </div>
        <div class="robot-mouth"></div>
      </div>
    </div>
  </div>
  <div class="robot-body"></div>
`;
const container = document.createElement("div");
container.className = "robot-container";
container.appendChild(robot);
document.body.appendChild(container);

// ================= CHAT WINDOW =================
const chat = document.createElement("div");
chat.className = "chatbot-window";

chat.innerHTML = `
  <div class="chat-header">🤖 BhA-AI</div>
  <div class="chat-body" id="chatBody"></div>
`;

document.body.appendChild(chat);
const chatBody = document.getElementById("chatBody");

// ================= TOGGLE =================
robot.onclick = () => {
  chat.style.display = chat.style.display === "block" ? "none" : "block";
  home();
};

// ================= HOME =================
function home() {
  chatBody.innerHTML = `
    <div class="bot-msg">Hello! How can I help you?</div>
    <button onclick="about()">🏫 About College</button>
    <button onclick="programs()">🎓 Programmes</button>
  `;
}

// ================= ABOUT =================
function about() {
  chatBody.innerHTML = `<div class="bot-msg">Loading...</div>`;

  db.collection("about").get().then(snapshot => {
    if (snapshot.empty) {
      chatBody.innerHTML = `<div class="bot-msg">No data available</div>
      <button onclick="home()">Back</button>`;
      return;
    }

    let html = `<div class="bot-msg">📘 About College</div>`;
    snapshot.forEach(doc => {
      const d = doc.data();
      html += `
        <a href="${d.url}" target="_blank"
           style="display:block;margin:8px 0;">🔗 ${d.title}</a>`;
    });

    html += `<button onclick="home()">Back</button>`;
    chatBody.innerHTML = html;
  });
}

// ================= PROGRAMMES =================
function programs() {
  chatBody.innerHTML = `<div class="bot-msg">Loading programmes...</div>`;

  db.collection("programs").get().then(snapshot => {
    if (snapshot.empty) {
      chatBody.innerHTML = `<div class="bot-msg">No programmes found</div>
      <button onclick="home()">Back</button>`;
      return;
    }

    let html = `<div class="bot-msg">🎓 Programmes</div>`;
    snapshot.forEach(doc => {
      const p = doc.data();
      html += `
        <a href="${p.url}" target="_blank"
           style="display:block;margin:8px 0;">📘 ${p.name}</a>`;
    });

    html += `<button onclick="home()">Back</button>`;
    chatBody.innerHTML = html;
  });
}
