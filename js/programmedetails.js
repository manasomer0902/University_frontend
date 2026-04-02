// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

  const searchBar = document.getElementById("searchBar");
  const courses = document.querySelectorAll(".course");

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeModal = document.querySelector(".close");

  // ================= SEARCH =================
  if (searchBar) {
    searchBar.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      courses.forEach(course => {
        const text = course.innerText.toLowerCase();

        // 🔥 Use flex/grid friendly display
        course.style.display = text.includes(query) ? "" : "none";
      });
    });
  }


  // ================= MODAL OPEN =================
  document.querySelectorAll(".button-link").forEach(el => {

    // Only for buttons (not links)
    if (el.tagName.toLowerCase() === "button") {

      el.addEventListener("click", function () {

        const course = this.closest(".course");
        if (!course) return;

        const title = course.querySelector("h3")?.innerText || "Course";
        const desc = course.querySelector("p")?.innerText || "";

        modalTitle.innerText = title;
        modalDesc.innerText = `${desc}\n\nMore details coming soon...`;

        openModal();
      });
    }
  });


  // ================= MODAL FUNCTIONS =================
  function openModal() {
    if (!modal) return;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 🔥 prevent scroll
  }

  function closeModalFunc() {
    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }


  // ================= CLOSE EVENTS =================
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc);
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // 🔥 ESC KEY SUPPORT
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalFunc();
    }
  });

});