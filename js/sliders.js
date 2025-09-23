export function initSliders() {
  // pobieramy wszystkie slidery na stronie
  const containers = document.querySelectorAll('.projects__images');
  let activeContainer = null; // aktualnie przeciągany slider

  // funkcja ustawiająca pozycję handle i szerokość górnego obrazka
  function setPosFromClientX(container, clientX) {
    const rect = container.getBoundingClientRect();
    let offset = clientX - rect.left; // odległość kursora od lewej kontenera
    offset = Math.max(0, Math.min(offset, rect.width)); // ograniczamy do szerokości kontenera
    const percent = (offset / rect.width) * 100;
    container.style.setProperty('--pos', `${percent}%`); // ustawiamy zmienną CSS
  }

  // funkcja ustawiająca wysokość kontenera zgodnie z proporcjami obrazka
  function fixHeight(container, firstImg) {
    if (!firstImg.naturalWidth) return;
    const w = container.clientWidth;
    const h = w * (firstImg.naturalHeight / firstImg.naturalWidth);
    container.style.height = `${h}px`;
  }

  containers.forEach((container) => {
    const firstImg = container.querySelector('.projects__first');
    container.style.setProperty('--pos', '50%'); // startowa pozycja suwaka (50%)

    // ustawienie wysokości po załadowaniu obrazka
    if (firstImg.complete) fixHeight(container, firstImg);
    else firstImg.addEventListener('load', () => fixHeight(container, firstImg));

    // obsługa rozpoczęcia przeciągania
    container.addEventListener('pointerdown', (e) => {
      activeContainer = container;
      setPosFromClientX(container, e.clientX);
      e.preventDefault(); // zapobiegamy przypadkowemu zaznaczeniu tekstu lub scrollowi
    });
  });

  // przesuwanie suwaka (dla aktywnego slidera)
  window.addEventListener('pointermove', (e) => {
    if (!activeContainer) return;
    setPosFromClientX(activeContainer, e.clientX);
  });

  // zakończenie przeciągania
  window.addEventListener('pointerup', () => {
    activeContainer = null;
  });

  // zmiana rozmiaru okna – dopasowanie wysokości wszystkich sliderów
  window.addEventListener('resize', () => {
    containers.forEach((container) => {
      const firstImg = container.querySelector('.projects__first');
      fixHeight(container, firstImg);
    });
  });
}
