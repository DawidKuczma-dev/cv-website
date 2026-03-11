export function initScrollAnimations() {
  const sectionsConfig = [
    { selector: '.skills', threshold: 0.5 },
    { selector: '.education', threshold: 0.5 },
    { selector: '.experience', threshold: 0.7 },
  ];

  sectionsConfig.forEach(({ selector, threshold }) => {
    const section = document.querySelector(selector);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(section);
  });
}
