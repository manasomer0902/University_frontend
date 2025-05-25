document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelector('.menu-links');
  
    if (menu && menuLinks) {
      menu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuLinks.classList.toggle('show');
      });
  
      document.addEventListener('click', () => {
        menuLinks.classList.remove('show');
      });
  
      menuLinks.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent menu from closing when clicking links
      });

      const links = menuLinks.querySelectorAll('a');
      links.forEach(link => {
       link.addEventListener('click', () => {
        menuLinks.classList.remove('show');
        });
      });
    }
  });