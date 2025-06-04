const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
   const button = accordion.querySelector('.accordion__tag');
   button.addEventListener('click', () => {
      button.setAttribute('aria-expanded', 'true');
   });

   accordion.addEventListener('mouseleave', () => {
      button.setAttribute('aria-expanded', 'false');
   });
});

// Toggle theme
document.getElementById('theme-toggle').addEventListener('change', () => {
   document.body.classList.toggle('darkmode');
});
