document.getElementById("forgotForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
  
    try {
      const res = await fetch("https://uni-backend-lojc.onrender.com/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
  
      const data = await res.json();
      document.getElementById("message").innerText = data.message || data.error;
      document.getElementById("message").style.color = data.success ? "green" : "red";
    } catch (err) {
      console.error(err);
      document.getElementById("message").innerText = "Error sending reset link.";
      document.getElementById("message").style.color = "red";
    }
  });
  