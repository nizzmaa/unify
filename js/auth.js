function showSignup() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
}

function showLogin() {
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}

/* SIGNUP */
function signup() {

  const name = document.getElementById("signupName").value;
  const college = document.getElementById("signupCollege").value;
  const dept = document.getElementById("signupDept").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !college || !dept || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

      const uid = userCredential.user.uid;

      return db.collection("users").doc(uid).set({
        name: name,
        college: college,
        department: dept,
        email: email
      });

    })
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => alert(error.message));
}

/* LOGIN */
function login() {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => alert(error.message));
}