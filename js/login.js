// ================= PASSWORD TOGGLE =================
function toggleVisibility(id, icon) {
  const input = document.getElementById(id);

  if (!input) return; // safety

  input.type = input.type === "password" ? "text" : "password";

  // Change icon
  icon.textContent = input.type === "password" ? "👁️" : "🙈";
}


// ================= LOGIN HANDLER =================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  if (!form) return; // prevents crash on other pages

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Reset UI
    error.textContent = "";
    loading.style.display = "block";

    // Disable button while loading (NEW 🔥)
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Logging in...";

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      // Handle non-200 responses (NEW 🔥)
      if (!response.ok) {
        throw new Error("Server responded with error");
      }

      const data = await response.json();

      if (data.success) {
        // Store auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", "true");

        // Redirect
        window.location.href = "admin.html";

      } else {
        error.textContent = "Invalid username or password";
      }

    } catch (err) {
      console.error("Login error:", err);
      error.textContent = "Server error. Please try again later.";
    } finally {
      // Reset UI (always runs)
      loading.style.display = "none";
      button.disabled = false;
      button.textContent = "Login";
    }

  });

});