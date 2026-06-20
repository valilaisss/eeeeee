const maskCircles = [
    [0.3531, 0.5083, 0.2948],
    [0.6055, 0.2912, 0.2026],
    [0.9797, 0.8176, 0.1073],
];

new p5((p) => {
    let img;
    let maskLayer;
    let revealed80Logged = false;
    let frameCounter = 0;
    
    let preloadedBg = null;
    let preloadedLeft = null;
    let preloadedRight = null;
    
    // Получаем родительский контейнер
    const parent = document.getElementById("canvas-parent");

    function getParentSize() {
        if (!parent) return { width: window.innerWidth, height: window.innerHeight };
        return {
            width: parent.clientWidth,
            height: parent.clientHeight
        };
    }

    function initMaskLayer() {
        const { width, height } = getParentSize();
        maskLayer = p.createGraphics(width, height);
        maskLayer.clear();
        maskLayer.fill(255);

        for (const [x, y, size] of maskCircles) {
            maskLayer.circle(width * x, height * y, width * size);
        }
    }
    
    function preloadImages() {
        preloadedBg = new Image();
        preloadedBg.src = "assets/images/bg-human.svg";
        
        preloadedLeft = new Image();
        preloadedLeft.src = "assets/images/left-part-human.svg";
        
        preloadedRight = new Image();
        preloadedRight.src = "assets/images/right-part-human.svg";
    }

    p.setup = async function () {
        img = await p.loadImage("assets/images/draw-picture.png");
        preloadImages();
        
        const { width, height } = getParentSize();
        p.createCanvas(width, height).parent("#canvas-parent");
        initMaskLayer();
    };

    p.draw = function () {
        if (!img || !maskLayer) {
            return;
        }

        // Рисуем только если мышь внутри canvas
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            maskLayer.fill(255);
            maskLayer.circle(p.mouseX, p.mouseY, p.width * 0.35);
        }
        
        frameCounter++;
        if (frameCounter >= 30 && !revealed80Logged) {
            maskLayer.loadPixels();
            
            let revealedPixels = 0;
            let sampledPixels = 0;
            const step = 8;
            
            for (let i = 3; i < maskLayer.pixels.length; i += step * 4) {
                sampledPixels++;
                if (maskLayer.pixels[i] > 0) {
                    revealedPixels++;
                }
            }
            
            const revealedPercent = (revealedPixels / sampledPixels);
            console.log(`Открыто: ${Math.round(revealedPercent * 100)}%`);
            
            if (revealedPercent >= 0.99 && !revealed80Logged) {
                console.log("lyuboy");
                revealed80Logged = true;
                
                if (!document.querySelector('.new-images-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'new-images-overlay';
                    
                    const bgImg = document.createElement('img');
                    bgImg.src = "assets/images/bg-human.svg";
                    bgImg.className = 'overlay-bg';
                    
                    const leftImg = document.createElement('img');
                    leftImg.src = "assets/images/left-part-human.svg";
                    leftImg.className = 'overlay-left';
                    
                    const rightImg = document.createElement('img');
                    rightImg.src = "assets/images/right-part-human.svg";
                    rightImg.className = 'overlay-right';
                    
                    overlay.appendChild(bgImg);
                    overlay.appendChild(leftImg);
                    overlay.appendChild(rightImg);
                    
                    document.querySelector('#canvas-parent').appendChild(overlay);
                    
                    function addTextBetween() {
                        if (document.querySelector('.text-between')) return;
                        const textDiv = document.createElement('div');
                        textDiv.className = 'text-between';
                        textDiv.innerHTML = `<p>Недостаток сна может привести к ряду заболеваний. Результаты 153 исследований с участием более пяти миллионов человек четко указывают на связь недостатка сна с диабетом, высоким давлением, заболеваниями сердечно-сосудистой системы, ишемической болезнью 
и ожирением. Также отмечена связь недосыпа с пониженной мозговой активностью и даже, 
в отдаленной перспективе, слабоумием.</p>`;
                        overlay.appendChild(textDiv);
                        requestAnimationFrame(() => {
                            textDiv.classList.add('show');
                        });
                    }
                    
                    leftImg.addEventListener('click', () => {
                        leftImg.classList.add('slide-out');
                        rightImg.classList.add('slide-out');
                        addTextBetween();
                    });
                    rightImg.addEventListener('click', () => {
                        leftImg.classList.add('slide-out');
                        rightImg.classList.add('slide-out');
                        addTextBetween();
                    });
                }
            }
            frameCounter = 0;
        }
        
        const maskedImg = img.get();
        maskedImg.mask(maskLayer);
        p.image(maskedImg, 0, 0, p.width, p.height);
    };

    p.windowResized = function () {
        const { width, height } = getParentSize();
        p.resizeCanvas(width, height);
        initMaskLayer();
        revealed80Logged = false;
        frameCounter = 0;
        
        const existingOverlay = document.querySelector('.new-images-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
    };
});