// ================= MESSAGE HANDLER =================
function showMessage(text, type) {
    let msg = document.getElementById("formMessage");

    if (!msg) {
        msg = document.createElement("p");
        msg.id = "formMessage";
        document.querySelector(".form-container").prepend(msg);
    }

    msg.textContent = text;
    msg.style.color = type === "error" ? "red" : "green";

    // 🔥 Auto hide after 3 seconds
    setTimeout(() => {
        msg.textContent = "";
    }, 3000);
}


// ================= VALIDATION =================
function validateForm() {

    const fields = {
        username: document.getElementById('username')?.value.trim(),
        password: document.getElementById('password')?.value.trim(),
        name: document.getElementById('name')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        gender: document.getElementById('gender')?.value,
        course: document.getElementById('course')?.value
    };

    // ================= EMPTY CHECK =================
    for (let field in fields) {
        if (!fields[field]) {
            showMessage("Please fill in all required fields.", "error");
            return false;
        }
    }

    // ================= PHONE =================
    if (!/^\d{10}$/.test(fields.phone)) {
        showMessage("Enter a valid 10-digit phone number.", "error");
        return false;
    }

    // ================= EMAIL =================
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        showMessage("Enter a valid email address.", "error");
        return false;
    }

    // ================= PASSWORD =================
    if (fields.password.length < 6) {
        showMessage("Password must be at least 6 characters.", "error");
        return false;
    }

    return true;
}


// ================= FORM SUBMIT (MAIN FIX 🔥) =================
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("regForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // 🚫 stop page reload

            const isValid = validateForm();

            if (isValid) {
                showMessage("Registration successful!", "success");

                // 🔥 Reset form after success
                form.reset();
            }
        });
    }

    // Load courses on page load
    loadCourses();
});


// ================= LOAD COURSES =================
async function loadCourses() {
    try {
        const response = await fetch('programmedetails.html');

        if (!response.ok) {
            throw new Error("Failed to fetch course page");
        }

        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const courseElements = doc.querySelectorAll('.course h3');
        const courseSelect = document.getElementById('course');

        if (!courseSelect) return;

        // Clear old options except first
        courseSelect.length = 1;

        const added = new Set();

        courseElements.forEach(h3 => {
            const title = h3.textContent.trim();

            if (title && !added.has(title)) {
                const option = document.createElement('option');
                option.value = title;
                option.textContent = title;

                courseSelect.appendChild(option);
                added.add(title);
            }
        });

    } catch (error) {
        console.error("Error loading courses:", error);
        showMessage("Unable to load courses. Try refreshing.", "error");
    }
}