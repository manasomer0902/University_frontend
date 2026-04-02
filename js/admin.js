// ================= AUTH CHECK =================
function checkLoginStatus() {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!token || isLoggedIn !== "true") {
    window.location.href = "login.html";
    return false;
  }
  return true;
}


// ================= LOGOUT =================
async function handleLogout() {
  const username = localStorage.getItem("username");

  try {
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    });

  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Always clear local data
    localStorage.clear();
    window.location.href = "login.html";
  }
}


// ================= MESSAGE UI =================
function showMessage(container, text, type = "info") {
  container.innerHTML = `<p style="color:${type === "error" ? "red" : "#333"}">${text}</p>`;
}


// ================= LOAD FEEDBACKS =================
async function loadFeedbacks() {
  const container = document.getElementById("feedbackContainer");

  if (!container) return;

  showMessage(container, "Loading feedbacks...");

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token");

    const response = await fetch(`${BASE_URL}/feedbacks`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = "login.html";
        return;
      }
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // ================= EMPTY STATE =================
    if (!data || data.length === 0) {
      showMessage(container, "No feedback available.");
      return;
    }

    container.innerHTML = "";

    // ================= RENDER CARDS =================
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "feedback-card";

      div.innerHTML = `
        <div class="feedback-name">${item.name || "Anonymous"}</div>
        <div class="feedback-text">${item.feedback}</div>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Feedback loading error:", err);

    showMessage(container, "Error loading feedbacks", "error");

    // Redirect if auth error
    if (err.message.includes("auth") || err.message.includes("401")) {
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "login.html";
      }, 1500);
    }
  }
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

  if (!checkLoginStatus()) return;

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Load feedbacks
  loadFeedbacks();

});