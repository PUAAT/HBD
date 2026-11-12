const waxSeal = document.getElementById('wax-seal');
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letterCard = document.getElementById('letter-card');
const paperTexture = document.getElementById('paper-texture');
const memoriesContainer = document.getElementById('memories-container');
const memoryBtn = document.getElementById('memory-trigger-btn');
const memoryTextOverlay = document.getElementById('memory-text-overlay'); // 新增：抓取文字圖層

const photos = [
    '88888888.jpg',
    '666666666.jpg',
    '4444444444.jpg',
    '333333333.jpg',
    '222222222.jpg',
    '00002.jpg'
];

let memoryInterval;

// 產生單片飄落的相片
function spawnMemory() {
    const img = document.createElement('img');
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    img.src = randomPhoto;
    img.classList.add('memory-fragment');
    
    const startRot = (Math.random() * 40 - 20) + 'deg'; 
    const endRot = (Math.random() * 80 - 40) + 'deg';
    const leftPos = Math.random() * 70 + 10;
    const duration = Math.random() * 6 + 7; 

    img.style.setProperty('--start-rot', startRot);
    img.style.setProperty('--end-rot', endRot);
    img.style.left = leftPos + '%';
    img.style.animationDuration = duration + 's';

    memoriesContainer.appendChild(img);

    setTimeout(() => {
        if(img.parentNode) {
            img.parentNode.removeChild(img);
        }
    }, duration * 1000);
}

// 1. 點擊封蠟開信
waxSeal.addEventListener('click', () => {
    envelope.classList.add('open');
    
    setTimeout(() => {
        envelopeWrapper.style.opacity = '0';
        envelopeWrapper.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            letterCard.classList.remove('hidden');
        }, 500);
    }, 700);
});

// 2. 讀完信後，點擊驚喜紙條按鈕觸發回憶與字幕
memoryBtn.addEventListener('click', () => {
    // 隱藏按鈕
    memoryBtn.style.opacity = '0';
    memoryBtn.style.pointerEvents = 'none';

    // 讓信紙溫柔地變暗、失焦
    paperTexture.classList.add('dimmed');
    
    // 延遲 1 秒後，讓「我們倆在van真的太少照片紀念了」緩緩浮現
    setTimeout(() => {
        memoryTextOverlay.classList.add('show');
    }, 1000);

    // 延遲 0.5 秒開始飄照片
    setTimeout(() => {
        spawnMemory();
        memoryInterval = setInterval(spawnMemory, 2500); 
    }, 500);
});