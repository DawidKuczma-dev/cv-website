const buttons = document.querySelectorAll('.lang-switcher>button');
let currentLang = 'pl';

buttons.forEach((btn) => {
   btn.addEventListener('click', () => {
      changeActive();
      const selectedLang = btn.dataset.lang;
      if (selectedLang !== currentLang) {
         currentLang = selectedLang;
         loadLanguage(selectedLang);
      }
   });
});

function changeActive() {
   buttons.forEach((btn) => {
      btn.classList.toggle('active');
   });
}

async function loadLanguage(lang) {
   const res = await fetch(`assets/lang/${lang}.json`);
   const dict = await res.json();

   document.querySelectorAll('[data-i18n').forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = dict[key] || key;
   });
}
