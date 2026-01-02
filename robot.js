// ===== CREATE ROBOT =====
let robot = document.createElement("div");
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

let container = document.createElement("div");
container.className = "robot-container";
container.appendChild(robot);
document.body.appendChild(container);

// ===== CREATE CHAT WINDOW =====
let chat = document.createElement("div");
chat.className = "chatbot-window";

chat.innerHTML = `
  <div class="chat-header">🤖 BhA-AI (Bhavan’s Artificial Intelligence)</div>
  <div class="chat-body" id="chatBody">
    <div class="bot-msg">Hello! How can I help you?</div>

    <button onclick="about()">About College</button>
    <button onclick="programs()">Programmes</button>
    <button onclick="faculty()">Faculty</button>
    <button onclick="syllabus()">Syllabus</button>
  </div>
`;

document.body.appendChild(chat);

// ✅ STORE chatBody PROPERLY
let chatBody = document.getElementById("chatBody");

// ===== TOGGLE CHAT =====
robot.onclick = function () {
  chat.style.display = chat.style.display === "block" ? "none" : "block";
};

// =======================================================
// ✅ ✅ ✅ LIVE ABOUT COLLEGE (FROM admin.html)
// =======================================================
function about() {

  let aboutData = JSON.parse(localStorage.getItem("aboutData")) || [];

  if (aboutData.length === 0) {
    chatBody.innerHTML = `
      <div class="bot-msg">❌ No About Data Added Yet</div>
      <button onclick="back()">Back</button>
    `;
    return;
  }

  let html = `<div class="bot-msg">About Bhavan's College</div>`;

  aboutData.forEach(item => {
    html += `<a href="${item.url}" target="_blank" style="display:block; margin:8px 0;">🔗 ${item.title}</a>`;
  });

  html += `<br><button onclick="back()">Back</button>`;

  chatBody.innerHTML = html;
}

// ===== STATIC PROGRAMS =====
function programs() {

  let programData = JSON.parse(localStorage.getItem("programData")) || [];

  if (programData.length === 0) {
    chatBody.innerHTML = `
      <div class="bot-msg">❌ No Programmes Added Yet</div>
      <button onclick="back()">Back</button>
    `;
    return;
  }

  let html = `<div class="bot-msg">Programs Offered</div>`;

  programData.forEach(p => {
    html += `<a href="${p.url}" target="_blank" style="display:block;margin:8px 0;">🎓 ${p.name}</a>`;
  });

  html += `<br><button onclick="back()">Back</button>`;

  chatBody.innerHTML = html;
}


// ===== FACULTY PLACEHOLDER (WE WILL CONNECT LATER) =====
function faculty() {
  chatBody.innerHTML = `
    <div class="bot-msg">Faculty Section will be connected ✅</div>
    <button onclick="back()">Back</button>
  `;
}

// ===== SYLLABUS PLACEHOLDER =====
function syllabus() {

  let syllabusData = JSON.parse(localStorage.getItem("syllabusData")) || [];

  if (syllabusData.length === 0) {
    chatBody.innerHTML = `
      <div class="bot-msg">❌ No Syllabus Uploaded Yet</div>
      <button onclick="back()">Back</button>
    `;
    return;
  }

  let html = `<div class="bot-msg">📚 Select Your Syllabus</div>`;

  syllabusData.forEach((s, i) => {
    html += `
      <button onclick="openSyllabus(${i})">
        📄 ${s.course}
      </button>
    `;
  });

  html += `<br><button onclick="back()">Back</button>`;
  chatBody.innerHTML = html;
}

function openSyllabus(index) {
  let data = JSON.parse(localStorage.getItem("syllabusData"));
  window.open(data[index].pdf, "_blank");
}


// ===== BACK BUTTON =====
function back() {
  chatBody.innerHTML = `
    <div class="bot-msg">Hello! How can I help you?</div>
    <button onclick="about()">About College</button>
    <button onclick="programs()">Programmes</button>
    <button onclick="faculty()">Faculty</button>
    <button onclick="syllabus()">Syllabus</button>
  `;
}
