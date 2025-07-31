// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementsByClassName("close")[0];

// Search functionality
document.getElementById("searchBar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    const text = course.innerText.toLowerCase();
    course.style.display = text.includes(query) ? "block" : "none";
  });
});

// Modal functionality
document.querySelectorAll(".button-link").forEach(el => {
  if (el.tagName.toLowerCase() === "button") {
    el.addEventListener("click", function () {
      const course = this.parentElement;
      const title = course.querySelector("h3").innerText;
      const duration = course.querySelector("p").innerText;

      modalTitle.innerText = title;
      modalDesc.innerText = `${duration}\n\nMore information about this course will go here.`;

      modal.style.display = "block";
    });
  }
});

// Close modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = event => {
  if (event.target == modal) modal.style.display = "none";
};
