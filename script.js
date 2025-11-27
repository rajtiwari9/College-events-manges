// ------------------ Elements ------------------
const main = document.getElementById("mainContent");
const header = document.getElementById("headerText");

// ------------------ Data ------------------
// ------------------ Data ------------------
let clubs = {
  "TARANG CLUB": [
    { title: "OPEN MIC", date: "2025-11-20", status: "Upcoming", desc: "Show your talent in the ultimate open mic battle.<br/>VENUE - BASKETBALL COURT" },
    { title: "Instrumental Performance", date: "2025-11-10", status: "Ongoing", desc: "Perform songs, poetry, or stand-up.<br/>VENUE - SHIVANAND AUDI" }
  ],
  "UTKARSH CLUB": [
    { title: "TECHNICAL QUIZ", date: "2025-11-22", status: "Upcoming", desc: "It's time to show your technical knowledge.<br/>VENUE - ME DEPT." },
    { title: "AI Workshop", date: "2025-11-15", status: "Ongoing", desc: "Hands-on session on Machine Learning and AI tools." }
  ],
  "CODING CLUB": [
    { title: "Hackathon 2.0", date: "2025-12-01", status: "Upcoming", desc: "48-hour coding challenge — build something innovative!<br/>VENUE - LAB BLOCK" },
    { title: "Bug Hunt", date: "2025-11-18", status: "Ongoing", desc: "Find and fix as many bugs as you can.<br/>VENUE - CS LAB 2" }
  ],
  "SHIKHAR CLUB": [
    { title: "Nature Through Lens", date: "2025-11-25", status: "Upcoming", desc: "Capture the beauty of nature in your own style.<br/>VENUE - CAMPUS GARDEN" },
    { title: "Photo Editing Workshop", date: "2025-11-12", status: "Ongoing", desc: "Learn advanced editing techniques.<br/>VENUE - MEDIA ROOM" }
  ],
  "ARJUN CLUB": [
     { title: "Cricket Tournament", date: "2025-12-05", status: "Upcoming", desc: "Inter-department cricket competition.<br/>VENUE - SPORTS GROUND" },
     { title: "Badminton Championship", date: "2025-11-19", status: "Ongoing", desc: "Smash and serve to victory!<br/>VENUE - INDOOR ARENA" }
   ],
  "R AND D CLUB": [
    { title: "Poetry Slam", date: "2025-11-27", status: "Upcoming", desc: "Let words flow and emotions rise.<br/>VENUE - SEMINAR HALL" },
    { title: "Story Writing Contest", date: "2025-11-14", status: "Ongoing", desc: "Pen down your imagination.<br/>VENUE - LIBRARY HALL" }
  ],
  "DANCE CREW": [
    { title: "Dance Battle", date: "2025-11-23", status: "Upcoming", desc: "Solo and group dance competition.<br/>VENUE - CENTRAL STAGE" },
    { title: "Zumba Workshop", date: "2025-11-13", status: "Ongoing", desc: "Groove to fitness beats.<br/>VENUE - GYM HALL" }
  ],
  "CHALCHITRA CLUB": [
    { title: "Cricket Tournament", date: "2025-12-05", status: "Upcoming", desc: "Inter-department cricket competition.<br/>VENUE - SPORTS GROUND" },
    { title: "Badminton Championship", date: "2025-11-19", status: "Ongoing", desc: "Smash and serve to victory!<br/>VENUE - INDOOR ARENA" }
  ],
   "MANCHAN CLUB": [
    { title: "Cricket Tournament", date: "2025-12-05", status: "Upcoming", desc: "Inter-department cricket competition.<br/>VENUE - SPORTS GROUND" },
    { title: "Badminton Championship", date: "2025-11-19", status: "Ongoing", desc: "Smash and serve to victory!<br/>VENUE - INDOOR ARENA" }
  ]
};


// ------------------ Helper ------------------
function updateHeader(title, subtitle) {
  header.querySelector("h1").innerHTML = title;
  header.querySelector("p").textContent = subtitle;
}

// ------------------ HOME VIEW ------------------
function showHome() {
  updateHeader("Welcome to <span>CampusConnect</span>", "Discover and register for amazing college events — easy, fast & secure.");
  main.innerHTML = `
    <div class="club-grid">
      ${Object.keys(clubs).map(c => `
        <div class="club-card">
          <h3>${c}</h3>
          <p>${clubs[c].length} Events</p>
          <button onclick="showEvents('${c}')">View Events</button>
        </div>`).join("")}
    </div>`;
}
showHome();

// ------------------ CLUB EVENTS VIEW ------------------
function showEvents(club) {
  updateHeader(`${club} Events`, `Browse upcoming & ongoing events by ${club}`);
  main.innerHTML = `
    <div class="event-grid">
      ${clubs[club].map(e => `
        <div class="event-card">
          <h3>${e.title}</h3>
          <p><b>Date:</b> ${e.date}</p>
          <p><b>Status:</b> ${e.status}</p>
          <p>${e.desc}</p>
          <button class="register-btn" onclick="openRegister('${club}','${e.title}')">Register</button>
        </div>`).join("")}
    </div>
    <div class="back-btn"><button onclick="showHome()">← Back</button></div>`;
}

// ------------------ REGISTRATION MODAL ------------------
let selectedEvent = null;

function openRegister(club, title) {
  selectedEvent = { club, title };
  const modal = document.getElementById("registerModal");
  modal.style.display = "flex";
  document.getElementById("regForm").reset();
  document.getElementById("paymentDetails").classList.add("hidden");
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("registerModal").style.display = "none";
};

document.getElementById("paymentMethod").addEventListener("change", e => {
  const val = e.target.value;
  const box = document.getElementById("paymentDetails");
  box.classList.remove("hidden");
  const info = {
    "UPI": `UPI ID: <b>campusconnect@upi</b><br>Pay via any UPI app.`,
    "Bank Transfer": `Bank A/C: <b>1234567890</b><br>IFSC: <b>CC001234</b>`,
    "QR Code": `Scan QR to pay:<br><img src="https://api.qrserver.com/v1/create-qr-code/?data=CampusConnectPayment&size=160x160" alt="QR" />`
  };
  box.innerHTML = info[val] || "";
  if (!val) box.classList.add("hidden");
});

document.getElementById("regForm").onsubmit = e => {
  e.preventDefault();
  const { regName, regDept, regRoll, regPhone, regEmail, paymentMethod } = e.target;
  if (![regName, regDept, regRoll, regPhone, regEmail, paymentMethod].every(i => i.value.trim())) {
    return alert("Please fill all fields.");
  }
  alert(`✅ Registered for "${selectedEvent.title}"\nName: ${regName.value}\nPayment: ${paymentMethod.value}`);
  document.getElementById("registerModal").style.display = "none";
};

// ------------------ NAVBAR ------------------
document.getElementById("homeBtn").onclick = showHome;

document.getElementById("eventsBtn").onclick = showAllEvents;
document.getElementById("aboutBtn").onclick = () => {
  updateHeader("About CampusConnect", "A simple event platform built for college communities.");
  main.innerHTML = `<div class="info"><p>CampusConnect helps students discover events and register easily.</p></div>`;
};
document.getElementById("contactBtn").onclick = () => {
  updateHeader("Contact Us", "We are here to help.");
  main.innerHTML = `<div class="info"><p>Name: Raj Tiwari <br/> Email: tiwariraj6352@gmail.com<br>Phone: +91 7804870637</p></div>`;
};

// ------------------ ALL EVENTS VIEW ------------------
function showAllEvents() {
  updateHeader("All Events", "All clubs — all events");
  let all = [];
  for (let c in clubs) all = all.concat(clubs[c].map(ev => ({ ...ev, club: c })));
  main.innerHTML = `
    <div class="event-grid">
      ${all.map(e => `
        <div class="event-card">
          <h3>${e.title}</h3>
          <p><b>Club:</b> ${e.club}</p>
          <p><b>Date:</b> ${e.date}</p>
          <p>${e.desc}</p>
          <button class="register-btn" onclick="openRegister('${e.club}','${e.title}')">Register</button>
        </div>`).join("")}
    </div>`;
}

// ------------------ ADMIN LOGIN ------------------
document.getElementById("adminBtn").onclick = () => {
  document.getElementById("adminLogin").style.display = "flex";
  document.getElementById("adminPass").value = "";
};
document.getElementById("cancelAdmin").onclick = () => {
  document.getElementById("adminLogin").style.display = "none";
};
document.getElementById("loginAdmin").onclick = () => {
  const pass = document.getElementById("adminPass").value;
  if (pass === "admin123") {
    document.getElementById("adminLogin").style.display = "none";
    renderClubManager();
  } else alert("❌ Wrong Password!");
};

// ------------------ ADMIN PANEL: CLUB MANAGEMENT ------------------
function renderClubManager() {
  updateHeader("Admin Panel", "Manage Clubs & Their Events");

  main.innerHTML = `
    <div style="padding:30px; display:flex; justify-content:center;">
      <div style="max-width:900px; width:100%; background:#fffbe6; padding:28px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        <h2 style="margin-bottom:12px;">🏫 Manage Clubs</h2>

        <form id="addClubForm" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px;">
          <input id="newClubName" placeholder="Enter New Club Name" required style="flex:1 1 250px; padding:8px;" />
          <button type="submit" style="padding:8px 16px;">Add Club</button>
        </form>

        <div id="clubList"></div>

        <div style="margin-top:20px;">
          <button id="logoutAdmin" style="padding:8px 12px; border-radius:8px; background:#b6c29a;">Logout</button>
        </div>
      </div>
    </div>
  `;

  const clubList = document.getElementById("clubList");

  function renderClubList() {
    if (Object.keys(clubs).length === 0) {
      clubList.innerHTML = "<p>No clubs yet.</p>";
      return;
    }
    clubList.innerHTML = Object.keys(clubs).map(c => `
      <div style="background:#fff; margin-bottom:10px; padding:12px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <strong>${c}</strong> (${clubs[c].length} events)
        <div style="margin-top:6px;">
          <button class="openClub" data-name="${c}" style="padding:4px 8px;">📂 Open</button>
          <button class="deleteClub" data-name="${c}" style="padding:4px 8px; background:#e35; color:white;">🗑 Delete</button>
        </div>
      </div>`).join("");

    document.querySelectorAll(".openClub").forEach(btn => {
      btn.onclick = () => renderEventManager(btn.dataset.name);
    });
    document.querySelectorAll(".deleteClub").forEach(btn => {
      btn.onclick = () => {
        if (confirm(`Delete "${btn.dataset.name}" and all its events?`)) {
          delete clubs[btn.dataset.name];
          renderClubList();
        }
      };
    });
  }

  document.getElementById("addClubForm").onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById("newClubName").value.trim();
    if (!name) return alert("Enter a club name!");
    if (clubs[name]) return alert("Club already exists!");
    clubs[name] = [];
    e.target.reset();
    renderClubList();
  };

  document.getElementById("logoutAdmin").onclick = showHome;
  renderClubList();
}

// ------------------ EVENT MANAGEMENT (Inside a Club) ------------------
function renderEventManager(club) {
  updateHeader(`${club} — Events`, "Add or edit club events");

  main.innerHTML = `
    <div style="padding:30px; display:flex; justify-content:center;">
      <div style="max-width:900px; width:100%; background:#fffbe6; padding:28px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        <h2>📅 ${club} Events</h2>
        <form id="eventForm" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
          <input id="eventTitle" placeholder="Event Title" required style="flex:1 1 200px; padding:8px;" />
          <input id="eventDate" type="date" required style="padding:8px;" />
          <select id="eventStatus" style="padding:8px;">
            <option>Upcoming</option><option>Ongoing</option><option>Completed</option>
          </select>
          <textarea id="eventDesc" placeholder="Event Description" required style="flex:1 1 100%; height:56px; padding:8px;"></textarea>
          <button type="submit" id="saveEvent" style="padding:10px 16px;">Add Event</button>
        </form>

        <div id="eventList"></div>

        <div style="margin-top:18px;">
          <button id="backToClubs" style="padding:8px 12px; border-radius:8px; background:#b6c29a;">⬅️ Back to Clubs</button>
        </div>
      </div>
    </div>
  `;

  const eventList = document.getElementById("eventList");
  const form = document.getElementById("eventForm");
  const saveBtn = document.getElementById("saveEvent");
  let editIndex = null;

  function renderEvents() {
    if (clubs[club].length === 0) {
      eventList.innerHTML = "<p>No events yet.</p>";
      return;
    }
    eventList.innerHTML = clubs[club].map((ev, i) => `
      <div style="background:#fff; padding:10px; border-radius:8px; margin-bottom:10px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <strong>${ev.title}</strong> — ${ev.date} <small>(${ev.status})</small>
        <div>${ev.desc}</div>
        <div style="margin-top:6px;">
          <button class="editEv" data-i="${i}" style="background:#007bff; color:#fff; padding:4px 8px;">✏️ Edit</button>
          <button class="delEv" data-i="${i}" style="background:#dc3545; color:#fff; padding:4px 8px;">🗑 Delete</button>
        </div>
      </div>`).join("");

    document.querySelectorAll(".editEv").forEach(btn => {
      btn.onclick = () => {
        const ev = clubs[club][btn.dataset.i];
        document.getElementById("eventTitle").value = ev.title;
        document.getElementById("eventDesc").value = ev.desc;
        document.getElementById("eventDate").value = ev.date;
        document.getElementById("eventStatus").value = ev.status;
        editIndex = btn.dataset.i;
        saveBtn.textContent = "Update Event";
      };
    });

    document.querySelectorAll(".delEv").forEach(btn => {
      btn.onclick = () => {
        if (confirm("Delete this event?")) {
          clubs[club].splice(btn.dataset.i, 1);
          renderEvents();
        }
      };
    });
  }

  form.onsubmit = e => {
    e.preventDefault();
    const title = document.getElementById("eventTitle").value.trim();
    const desc = document.getElementById("eventDesc").value.trim();
    const date = document.getElementById("eventDate").value;
    const status = document.getElementById("eventStatus").value;
    if (!title || !desc || !date) return alert("Fill all fields!");
    if (editIndex !== null) {
      clubs[club][editIndex] = { title, desc, date, status };
      editIndex = null;
      saveBtn.textContent = "Add Event";
    } else {
      clubs[club].push({ title, desc, date, status });
    }
    form.reset();
    renderEvents();
  };

  document.getElementById("backToClubs").onclick = renderClubManager;
  renderEvents();
}

// ------------------ HEADER BUTTONS (Explore & All Events) ------------------
document.getElementById("exploreClubsBtn").addEventListener("click", showHome);
document.getElementById("allEventsBtn").addEventListener("click", showAllEvents);

// ------------------ BACKGROUND ANIMATION ------------------
(() => {
  const canvas = document.getElementById("heroParticles");
  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  let parts = [];
  const create = () => {
    parts = Array.from({ length: (canvas.width * canvas.height) / 50000 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.8,
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5,
      a: Math.random() * 0.4 + 0.15
    }));
  };
  create();

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.y < 0) p.y = canvas.height;
      if (p.x > canvas.width) p.x = 0;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  draw();
}
)();
// Save Registration
document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const regData = {
    name: document.getElementById("regName").value,
    dept: document.getElementById("regDept").value,
    roll: document.getElementById("regRoll").value,
    phone: document.getElementById("regPhone").value,
    email: document.getElementById("regEmail").value,
    event: selectedEvent.title, // <-- yaha correct event name jaayega
    payment: document.getElementById("paymentMethod").value,
    time: new Date().toLocaleString()
  };

  // Store in localStorage
  let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
  allRegs.push(regData);
  localStorage.setItem("registrations", JSON.stringify(allRegs));

  alert("Registration Successful!");
  document.getElementById("registerModal").style.display = "none";
});
// Event click → Save event name
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("event-card") || e.target.closest(".event-card")) {

    const card = e.target.closest(".event-card");
    const eventName = card.querySelector("h3").innerText;

    localStorage.setItem("selectedEvent", eventName);

    // Modal open karna ho to
    document.getElementById("registerModal").style.display = "block";
  }
});

