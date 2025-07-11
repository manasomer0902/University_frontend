// Toggle password visibility
function toggleVisibility(id, icon) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
  icon.textContent = input.type === "password" ? "👁️" : "🙈";
}

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  error.textContent = "";
  loading.style.display = "block";

  try {
    const response = await fetch("https://uni-backend-lojc.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    loading.style.display = "none";

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      error.textContent = "Invalid username or password";
    }
  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Server error. Please try again later.";
    console.error(err);
  }
});
