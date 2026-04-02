document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("forgotForm");
  const message = document.getElementById("message");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    // ================= VALIDATION =================
    if (!email) {
      showMessage("Please enter your email.", "error");
      emailInput.focus();
      return;
    }

    // ================= LOADING STATE =================
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      showMessage(data.message || "Reset link sent!", "success");

      // Optional: clear input
      form.reset();

    } catch (err) {
      console.error("Forgot password error:", err);
      showMessage(err.message || "Error sending reset link.", "error");
    } finally {
      button.disabled = false;
      button.textContent = "Send Reset Link";
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