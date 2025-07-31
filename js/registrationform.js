// ✅ Validate the student registration form
function validateForm() {
    const fields = {
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value.trim(),
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        gender: document.getElementById('gender').value,
        course: document.getElementById('course').value
    };

    // Check for empty fields
    for (let field in fields) {
        if (!fields[field]) {
            alert("Please fill in all required fields.");
            return false;
        }
    }

    // Validate 10-digit phone number
    if (!/^\d{10}$/.test(fields.phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Password validation (optional): minimum 6 characters
    if (fields.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    alert("Registration successful!");
    return true;
}

// ✅ Load course options dynamically from programmedetails.html
async function loadCourses() {
    try {
        const response = await fetch('programmedetails.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const courseElements = doc.querySelectorAll('.course h3');
        const courseSelect = document.getElementById('course');

        // Clear old options (except default first)
        while (courseSelect.options.length > 1) {
            courseSelect.remove(1);
        }

        // Append course titles as <option>
        courseElements.forEach(h3 => {
            const title = h3.textContent.trim();
            if (title) {
                const option = document.createElement('option');
                option.value = title; // Keep original title as value
                option.textContent = title;
                courseSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error loading courses:", error);
    }
}

// ✅ Trigger course loading on page load
window.addEventListener('DOMContentLoaded', loadCourses);
