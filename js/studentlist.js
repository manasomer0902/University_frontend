// Toggle student list visibility
function toggleStudents(element) {
    const allStudentLists = document.querySelectorAll('.students');
    allStudentLists.forEach(list => {
        if (list !== element.nextElementSibling) {
            list.classList.remove('show');
        }
    });

    const studentsList = element.nextElementSibling;
    
    // ✅ Restore student visibility when toggling
    const students = studentsList.querySelectorAll('li');
    students.forEach(student => {
        student.style.display = "list-item"; // <-- This brings them back!
    });
    studentsList.classList.toggle('show');
}

// Search function
function filterPrograms() {
    const input = document.getElementById('searchBar').value.toLowerCase().trim();
    const courses = document.querySelectorAll('.course');
    const programSections = document.querySelectorAll('.program-section');

    let found = false;

    courses.forEach(course => {
        const courseName = course.textContent.toLowerCase();
        const studentList = course.nextElementSibling;
        const students = studentList.querySelectorAll('li');

        let studentMatch = false;

        students.forEach(student => {
            student.innerHTML = student.textContent; // Reset highlights

            if (input && student.textContent.toLowerCase().includes(input)) {
                // Highlight match
                student.innerHTML = student.textContent.replace(new RegExp(input, "gi"), match => `<span class="highlight">${match}</span>`);
                student.style.display = "list-item"; // ✅ Ensure visibility
                studentMatch = true;
                found = true;
            } else {
                student.style.display = "none"; // ✅ Just hide students individually
            }
        });

        course.style.display = "block"; // Always show course heading

        // ✅ Don't use direct display on studentList, just collapse via class
        if (input && (studentMatch || courseName.includes(input))) {
            studentList.classList.add("show"); // Expand list if match
            students.forEach(student => {
                if (courseName.includes(input)) {
                    student.innerHTML = student.textContent;
                    student.style.display = "list-item";
                }
            });
            found = true;
        } else {
            studentList.classList.remove("show"); // Collapse if no match
        }
    });

    if (input === "") {
        courses.forEach(course => {
            course.style.display = "block";
            course.nextElementSibling.classList.remove("show"); // Collapse all
            const students = course.nextElementSibling.querySelectorAll('li');
            students.forEach(student => {
                student.style.display = "list-item"; // Reset display
                student.innerHTML = student.textContent;
            });
        });
        programSections.forEach(section => {
            section.style.display = "block";
        });
        return;
    }

    if (!found) {
        alert("No match found!");
        courses.forEach(course => {
            course.style.display = "block";
            course.nextElementSibling.classList.remove("show"); // Collapse list
        });
        programSections.forEach(section => {
            section.style.display = "block";
        });
    } else {
        programSections.forEach(section => {
            const visibleCourses = section.querySelectorAll('.course');
            let anyVisible = false;
            visibleCourses.forEach(course => {
                if (course.style.display !== "none") {
                    anyVisible = true;
                }
            });
            section.style.display = anyVisible ? "block" : "none";
        });
    }
}


// Clear function (if using clear button)
function clearSearch() {
    document.getElementById('searchBar').value = "";
    const courses = document.querySelectorAll('.course');
    const programSections = document.querySelectorAll('.program-section');
    const studentLists = document.querySelectorAll('.students');
    const students = document.querySelectorAll('.students li');

    // Reset visibility
    courses.forEach(course => {
        course.style.display = "block";
    });

    programSections.forEach(section => {
        section.style.display = "block";
    });

    studentLists.forEach(list => {
        list.classList.remove('show'); // collapse the list
    });

    students.forEach(student => {
        student.style.display = "list-item"; // restore student display
        student.innerHTML = student.textContent;
    });
}
