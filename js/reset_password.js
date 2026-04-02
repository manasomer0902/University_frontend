// ================= PASSWORD TOGGLE =================
function toggleVisibility(id, icon) {
  const input = document.getElementById(id);
  if (!input) return;

  input.type = input.type === "password" ? "text" : "password";
  icon.textContent = input.type === "password" ? "👁️" : "🙈";
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("resetForm");
  const message = document.getElementById("message");

  if (!form || !message) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const email = new URLSearchParams(window.location.search).get("email");

    // ================= VALIDATION =================
    if (!newPassword || !confirmPassword) {
      showMessage("Please fill all fields.", "error");
      return;
    }

    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      newPasswordInput.focus();
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      confirmPasswordInput.focus();
      return;
    }

    if (!email) {
      showMessage("Invalid or expired reset link.", "error");
      return;
    }

    // ================= LOADING =================
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Updating...";

    try {
      const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      showMessage(data.message || "Password updated!", "success");

      // Redirect after success
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);

    } catch (err) {
      console.error("Reset error:", err);
      showMessage(err.message || "Something went wrong.", "error");
    } finally {
      button.disabled = false;
      button.textContent = "Reset Password";
    }
  });

});


// ================= MESSAGE HANDLER =================
function showMessage(text, type) {
  const message = document.getElementById("message");

  if (!message) return;

  message.innerText = text;
  message.style.color = type === "error" ? "red" : "green";

  // Auto hide after 3 sec
  setTimeout(() => {
    message.innerText = "";
  }, 3000);
}