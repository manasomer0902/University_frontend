// Feedback Form Validation and Submission
function validateFeedback() {
    const name = document.getElementById('name').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (!name || !feedback) {
        alert("All fields must be filled out.");
        if (!name) document.getElementById('name').focus();
        else document.getElementById('feedback').focus();
        return false;
    }

    // ✅ Send POST request to backend
    fetch("https://uni-backend-lojc.onrender.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, feedback })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = "thankyou.html";
    })
    .catch(error => {
        console.error("Error submitting feedback:", error);
        alert("Something went wrong. Please try again later.");
    });

    return false; // Stop default form submit
}
