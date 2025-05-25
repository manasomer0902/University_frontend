// Student Registration Form Validation
function validateForm() {
    const fields = {
        username: document.getElementById('username').value.trim(),
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        gender: document.getElementById('gender').value.trim(),
        course: document.getElementById('course').value.trim()
    };
    

    // Check if any field is empty
    for (let field in fields) {
        if (!fields[field]) {
            alert("Please fill in all required fields");
            return false;
        }
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(fields.phone)) {
        alert("Please enter a valid 10-digit phone number");
        return false;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        alert("Please enter a valid email address");
        return false;
    }

    alert("Registration successful!");
    return true;
}


// Function to load courses from program list
async function loadCourses() {
    console.log('Starting to load courses...'); // Debug log
    try {
        const response = await fetch('programwise_student_list.html');
        console.log('Fetched response:', response.ok); // Debug log

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const courseElements = doc.querySelectorAll('.course');
        console.log('Found courses:', courseElements.length); // Debug log

        const courseSelect = document.getElementById('course');
        if (!courseSelect) {
            console.error('Course select element not found!');
            return;
        }
        
        // Clear existing options except the first one
        while (courseSelect.options.length > 1) {
            courseSelect.remove(1);
        }
        
        // Add courses from program list
        courseElements.forEach(course => {
            const courseName = course.textContent;
            const option = document.createElement('option');
            option.value = courseName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            option.textContent = courseName;
            courseSelect.appendChild(option);
            console.log(`Added course ${index + 1}:`, courseName); // Debug log
        });
        console.log('Finished loading courses:', courseSelect.options.length - 1); // Debug 
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Load courses when the page loads
window.addEventListener('load', () => {
    console.log('Page loaded, initializing course loading...'); // Debug log
    loadCourses();
});