// =============================
// Firebase Auth + User Data
// =============================

auth.onAuthStateChanged(user => {

  if (!user) {
    window.location.href = "index.html";
  } else {

    db.collection("users").doc(user.uid).get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          document.getElementById("userName").innerText = data.name;
          document.getElementById("userCollege").innerText = data.college.toUpperCase();
          document.getElementById("userDept").innerText = data.department.toUpperCase();
          document.getElementById("userInitial").innerText =
            data.name.charAt(0).toUpperCase();
        }
      });
  }
});

let activeDropdown = null;
let selectedRole = "";
const collegeDropdown = document.getElementById("collegeDropdown");

// =============================
// TUTOR ROLE (ADD HERE)
// =============================

function setRole(role) {
  selectedRole = role;
  document.getElementById("subjectBox").style.display = "block";
}

// =============================
// CARD DROPDOWN
// =============================

function closeAllCardDropdowns() {
  document.querySelectorAll(".card-dropdown")
    .forEach(d => d.classList.remove("show"));
  activeDropdown = null;
}

function toggleDropdown(id) {
  const element = document.getElementById(id);

  if (activeDropdown && activeDropdown !== element) {
    closeAllCardDropdowns();
  }

  element.classList.toggle("show");
  activeDropdown = element.classList.contains("show") ? element : null;
}

// =============================
// SIDEBAR DROPDOWN
// =============================

function toggleColleges(event) {
  event.stopPropagation();
  collegeDropdown.classList.toggle("show");
}

// =============================
// COLLABORATE
// =============================

function sendCollab() {

  const name = document.getElementById("collabName").value;
  const college = document.getElementById("collabCollege").value;
  const desc = document.getElementById("projectDesc").value;

  if (!name || !college || !desc) {
    document.getElementById("collabMsg").innerText =
      "Please fill all fields.";
    return;
  }

  realtimeDB.ref("collaborations").push({
    name: name,
    college: college,
    description: desc,
    timestamp: Date.now()
  });

  document.getElementById("collabMsg").innerText =
    "Collaboration request submitted!";

  document.getElementById("collabName").value = "";
  document.getElementById("collabCollege").value = "";
  document.getElementById("projectDesc").value = "";
}

// =============================
// REALTIME SIDEBAR DISPLAY
// =============================

realtimeDB.ref("collaborations").on("value", snapshot => {

  const list = document.getElementById("collabList");
  list.innerHTML = "";

  snapshot.forEach(child => {

    const data = child.val();

    const div = document.createElement("div");
    div.className = "collab-item";

    div.innerHTML = `
      <strong>${data.name}</strong><br>
      <small>${data.college}</small><br>
      <span class="collab-desc">${data.description}</span>
    `;

    list.appendChild(div);
  });

});

// =============================
// LOGOUT
// =============================

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// =============================
// EVENT POPUPS (ADDED)
// =============================

function showArtEvent() {
  document.getElementById("modalTitle").innerText = "Arts Event";
  document.getElementById("modalMessage").innerText =
    "No art events appearing nearby";
  document.getElementById("eventModal").style.display = "flex";
}

function showTechEvent() {
  document.getElementById("modalTitle").innerText = "Tech Event";
  document.getElementById("modalMessage").innerText =
    "TECHFEST HAPPENING AT GECW ON 28 FEB";
  document.getElementById("eventModal").style.display = "flex";
}

function showSportsEvent() {
  document.getElementById("modalTitle").innerText = "Sports Event";
  document.getElementById("modalMessage").innerText =
    "Intercollege football tournament next month -gcek";
  document.getElementById("eventModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("eventModal").style.display = "none";
}

// =============================
// LIBRARY MESSAGE (ADDED)
// =============================

function showLibrary() {
  const box = document.getElementById("libraryMessage");
  box.innerText = "Notes will be posted here.";

  setTimeout(() => {
    box.innerText = "";
  }, 2500);
}