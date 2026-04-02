document.addEventListener("DOMContentLoaded", () => {

  // Select elements
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelector(".menu-links");

  // Safety check (prevents errors if elements not found)
  if (!menu || !menuLinks) return;

  // ================= TOGGLE MENU =================
  menu.addEventListener("click", (e) => {
    e.stopPropagation();

    // Toggle dropdown
    menuLinks.classList.toggle("show");

    // Optional: add active state to menu icon
    menu.classList.toggle("active");
  });


  // ================= CLOSE WHEN CLICK OUTSIDE =================
  document.addEventListener("click", () => {
    menuLinks.classList.remove("show");
    menu.classList.remove("active");
  });


  // ================= PREVENT CLOSING WHEN CLICK INSIDE =================
  menuLinks.addEventListener("click", (e) => {
    e.stopPropagation();
  });


  // ================= CLOSE ON LINK CLICK =================
  const links = menuLinks.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      menuLinks.classList.remove("show");
      menu.classList.remove("active");
    });
  });


  // ================= ESC KEY SUPPORT =================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuLinks.classList.remove("show");
      menu.classList.remove("active");
    }
  });

});