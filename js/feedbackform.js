// ================= MESSAGE HANDLER =================
function showMessage(text, type) {
    let msg = document.getElementById("feedbackMessage");

    if (!msg) {
        msg = document.createElement("p");
        msg.id = "feedbackMessage";
        document.querySelector(".feedback-container").prepend(msg);
    }

    msg.textContent = text;
    msg.style.color = type === "error" ? "red" : "green";

    // Auto hide after 3 sec
    setTimeout(() => {
        msg.textContent = "";
    }, 3000);
}


// ================= MAIN =================
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("feedbackForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 🚫 stop reload

        const nameInput = document.getElementById("name");
        const feedbackInput = document.getElementById("feedback");

        const name = nameInput.value.trim();
        const feedback = feedbackInput.value.trim();

        // ================= VALIDATION =================
        if (!name || !feedback) {
            showMessage("All fields must be filled.", "error");

            if (!name) nameInput.focus();
            else feedbackInput.focus();

            return;
        }

        // ================= BUTTON LOADING =================
        const button = form.querySelector("button");
        button.disabled = true;
        button.textContent = "Submitting...";

        try {
            const response = await fetch(`${BASE_URL}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, feedback })
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            const data = await response.json();

            // Success message
            showMessage(data.message || "Feedback submitted!", "success");

            // Reset form
            form.reset();

            // Redirect after delay 🔥
            setTimeout(() => {
                window.location.href = "thankyou.html";
            }, 1500);

        } catch (error) {
            console.error("Error submitting feedback:", error);
            showMessage("Something went wrong. Try again later.", "error");
        } finally {
            button.disabled = false;
            button.textContent = "Submit Feedback";
        }

    });

});