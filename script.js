// =============== Нажатие на "сон" =================
document.getElementById("nap-word").addEventListener("click", () => {
  if(document.querySelector(".active-sleep-box")) return;

  const box = document.createElement("div");
  box.innerHTML = `
  <p style='text-align: justify; display: flex; flex-direction: column; gap: 0;'>
    --- не пассивное состояние, а активный
    нейробиологический процесс, выполняющий
    функции жизнеобеспечения, которые
    невозможны в состоянии бодрствования. Это
    важнейшая физиологическая потребность,
    сравнимая с дыханием и питанием.
  </p>
  `;

  box.className = "active-sleep-box";
  drawArea.appendChild(box);

  requestAnimationFrame(() => {
    box.style.opacity = 1;
    box.style.transform = "scale(1)";
  });

  box.addEventListener("click", () => {
    box.style.opacity = 0;
    box.style.transform = "scale(0.5)";
    setTimeout(() => box.remove(), 500);
  });
});


// ===================== DOMContentLoaded =====================
document.addEventListener('DOMContentLoaded', () => {

  let currentIndex = 0;
  const totalSlides = 5;

  const backgrounds = [
    'url("assets/images/bg-screen-3.svg")',
    'url("assets/images/bg-slide-1.svg")',
    'url("assets/images/bg-slide-2.svg")',
    'url("assets/images/bg-slide-3.svg")',
    'url("assets/images/bg-slide-4.svg")'
  ];

  const thirdScreen = document.querySelector('.third-screen');
  const slideContents = document.querySelectorAll('.slide-content');
  const pageNumber = document.querySelector('.page-number');

  const overlay = document.querySelector('.info-overlay');
  const textBox = document.querySelector('.info-text');
  const closeBtn = document.querySelector('.close-button');

  let activeButton = null;

  // ===== ПРЕДЗАГРУЗКА КАРТИНОК (без цикла) =====
  const img1 = new Image(); img1.src = 'assets/images/bg-screen-3.svg';
  const img2 = new Image(); img2.src = 'assets/images/bg-slide-1.svg';
  const img3 = new Image(); img3.src = 'assets/images/bg-slide-2.svg';
  const img4 = new Image(); img4.src = 'assets/images/bg-slide-3.svg';
  const img5 = new Image(); img5.src = 'assets/images/bg-slide-4.svg';

  // ===== СМЕНА ФОНА ЧЕРЕЗ OPACITY =====
  const bgSlides = document.querySelectorAll('.bg-container .slide-bg');

  function showSlide(index) {

    // скрываем overlay и восстанавливаем кнопку
    if (overlay.classList.contains('active')) overlay.classList.remove('active');
    if (activeButton) { activeButton.style.display = 'block'; activeButton = null; }

    // ======== АНИМАЦИЯ ФОНА ========
    bgSlides.forEach((bg, i) => {
        bg.classList.toggle('active', i === index);
    });

    // ======== Контент слайдов ========
    slideContents.forEach((content, i) => {
      content.style.display = i === index ? 'block' : 'none';
    });

    // Номер страницы
    pageNumber.textContent = `(${String(index).padStart(2, '0')})`;

    // Позиция текста overlay
    const infoTextPositions = ['19.16%', '64.94%', '67.64%', '65%', '65%'];
    textBox.style.top = infoTextPositions[index];

    currentIndex = index;
  }

  // ===== Стрелки навигации =====
  document.querySelector('.arrow-left').onclick = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = totalSlides - 1;
    showSlide(newIndex);
  };

  document.querySelector('.arrow-right').onclick = () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= totalSlides) newIndex = 0;
    showSlide(newIndex);
  };

  // ===== OVERLAY =====
  document.querySelectorAll('.inf-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const id = btn.dataset.id;
      if (!id) return;

      const hidden = document.getElementById(id);
      if (!hidden) return;

      textBox.innerHTML = hidden.innerHTML;

      activeButton = btn;
      activeButton.style.display = 'none';
      overlay.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.remove('active');

    if (activeButton) {
      activeButton.style.display = 'block';
      activeButton = null;
    }
  });

  // ===== ПОКАЗЫВАЕМ ПЕРВЫЙ СЛАЙД =====
  showSlide(0);
});






// ================= FOURTH SCREEN SCROLL ANIMATIONS =================
// ================= FOURTH SCREEN SCROLL ANIMATIONS =================
// Эффекты при скролле на четвертом экране:
// - надпись "не вреди — поспи" уезжает вверх и исчезает
// - левая девочка уезжает влево
// - правая девочка уезжает вправо
// Анимация начинается только после того, как экран полностью виден,
// и продолжается при дальнейшем скролле вниз.

// ================= FOURTH SCREEN SCROLL ANIMATIONS =================
// ================= FOURTH SCREEN SCROLL ANIMATIONS =================
// Элементы начинают движение только когда экран полностью виден,
// и при дальнейшем скролле вниз уезжают в стороны/вверх.

// ===== Обработка клика по надписи "не вреди — поспи" =====
document.addEventListener('DOMContentLoaded', () => {
    const napWordBed = document.getElementById('nap-word-box');
    if (!napWordBed) return;

    napWordBed.addEventListener('click', () => {
        // 1. Плавное исчезновение надписи
        changeZoom();
        napWordBed.style.transition = 'opacity 0.3s ease';
        napWordBed.style.opacity = '0';
        setTimeout(() => {
            napWordBed.style.display = 'none';
        }, 500);

        // 2. Анимация ухода девочек
        const leftGirl = document.querySelector('.girl-left');
        const rightGirl = document.querySelector('.girl-right');
        if (leftGirl && rightGirl) {
            // Добавляем плавный переход
            leftGirl.style.transition = 'transform 3s ease';
            rightGirl.style.transition = 'transform 3s ease';
            // Левая девочка уезжает влево, правая — вправо
            leftGirl.style.transform = 'translateX(-150%)';
            rightGirl.style.transform = 'translateX(150%)';
            // После завершения анимации скрываем элементы (опционально)
            setTimeout(() => {
                leftGirl.style.display = 'none';
                rightGirl.style.display = 'none';
            }, 1000);
        }
    });
});