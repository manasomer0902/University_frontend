// Check login status function
function checkLoginStatus() {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (!token || !isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// Handle logout function
function handleLogout() {
  const username = localStorage.getItem("username");
  
  fetch("https://uni-backend-lojc.onrender.com/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })
  .then(() => {
    // Clear all login info
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");

    const menuLinks = document.querySelector(".menu-links");
    if (menuLinks) menuLinks.classList.remove("show");

    window.location.href = "login.html";
  })
  .catch(err => {
    console.error("Logout error:", err);
    // Force logout even if server request fails
    localStorage.clear();
    window.location.href = "login.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!checkLoginStatus()) return;

  // Setup logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Load feedbacks function
  async function loadFeedbacks() {
    const container = document.getElementById("feedbackContainer");
    container.innerHTML = "<p>Loading feedbacks...</p>";

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const response = await fetch("https://uni-backend-lojc.onrender.com/feedbacks", {
        headers: {
          "Authorization": token // Changed: Remove 'Bearer' as server expects raw token
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized - redirect to login
          localStorage.clear();
          window.location.href = "login.html";
          return;
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || data.length === 0) {
        container.innerHTML = "<p>No feedback available.</p>";
        return;
      }

      container.innerHTML = "";
      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "feedback-item";
        div.innerHTML = `
          <strong>${item.name || 'Anonymous'}</strong>
          <br>
          ${item.feedback}
        `;
        container.appendChild(div);
      });

    } catch (err) {
      console.error("Feedback loading error:", err);
      container.innerHTML = `<p>Error loading feedbacks: ${err.message}</p>`;
      
      // If it's an auth error, redirect to login after a brief delay
      if (err.message.includes("auth") || err.message.includes("401")) {
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "login.html";
        }, 2000);
      }
    }
  }

  // Load feedbacks when page loads
  loadFeedbacks();
});
