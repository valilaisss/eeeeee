const sources = [
  "assets/images/draw-1.svg",
  "assets/images/draw-2.svg",
  "assets/images/draw-3.svg",
  "assets/images/draw-4.svg",
  "assets/images/draw-5.svg"
];

const drawArea = document.getElementById("drawArea");

let mouseX = 0;
let mouseY = 0;
let lastX = 0;
let lastY = 0;
let isInside = false;
let moved = false;
let lastSpawnTime = 0;
const spawnInterval = 10; // миллисекунды между картинками

drawArea.addEventListener("pointermove", (e) => {
  const rect = drawArea.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  isInside = true;
  moved = true;
});

drawArea.addEventListener("pointerleave", () => {
  isInside = false;
});

function draw() {
  const now = Date.now();

  if (isInside && moved && now - lastSpawnTime > spawnInterval) {
    // плавная интерполяция
    lastX += (mouseX - lastX) * 0.2;
    lastY += (mouseY - lastY) * 0.2;

    // Получаем актуальные размеры родителя
    const maxX = drawArea.clientWidth;
    const maxY = drawArea.clientHeight;

    // Ограничиваем координаты, чтобы штамп не выходил за пределы
    let x = lastX - 20; // ширина штампа ~40px, корректируем
    let y = lastY - 20;
    x = Math.min(Math.max(x, 0), maxX - 40);
    y = Math.min(Math.max(y, 0), maxY - 40);

    const img = document.createElement("img");
    img.src = sources[Math.floor(Math.random() * sources.length)];
    img.className = "stamp";
    img.style.left = x + "px";
    img.style.top = y + "px";

    drawArea.appendChild(img);

    requestAnimationFrame(() => {
      img.style.opacity = 1;
      img.style.transform = "scale(1)";
    });

    setTimeout(() => {
      img.style.opacity = 0;
      img.style.transform = "scale(0.5)";
      setTimeout(() => img.remove(), 500);
    }, 2000);

    lastSpawnTime = now;
    moved = false;
  }

  requestAnimationFrame(draw);
}

draw();