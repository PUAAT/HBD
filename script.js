const waxSeal = document.getElementById('wax-seal');
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letterCard = document.getElementById('letter-card');
const memoriesContainer = document.getElementById('memories-container');

// 你的 6 張專屬回憶照片檔案清單
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
    
    // 隨機抽取一張相片
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    img.src = randomPhoto;
    img.classList.add('memory-fragment');
    
    // 隨機設定相片的起始角度與結束角度（讓它有緩緩旋轉飄落的感覺）
    const startRot = (Math.random() * 40 - 20) + 'deg'; // -20度 到 20度
    const endRot = (Math.random() * 80 - 40) + 'deg';
    
    // 隨機出現的水平位置 (避免超出左右邊界)
    const leftPos = Math.random() * 80 + 5; // 5% 到 85%
    
    // 隨機飄落速度 (8秒 到 16秒不等，非常緩慢優雅)
    const duration = Math.random() * 8 + 8; 

    img.style.setProperty('--start-rot', startRot);
    img.style.setProperty('--end-rot', endRot);
    img.style.left = leftPos + '%';
    img.style.animationDuration = duration + 's';

    memoriesContainer.appendChild(img);

    // 當動畫結束後，將圖片從網頁移除（避免記憶體浪費卡頓）
    setTimeout(() => {
        if(img.parentNode) {
            img.parentNode.removeChild(img);
        }
    }, duration * 1000);
}

// 點擊封蠟開信
waxSeal.addEventListener('click', () => {
    // 1. 觸發信封蓋與封蠟動畫
    envelope.classList.add('open');
    
    // 2. 信封淡出並流暢展開手寫信
    setTimeout(() => {
        envelopeWrapper.style.opacity = '0';
        envelopeWrapper.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            letterCard.classList.remove('hidden');
            
            // 3. 信件一展開，回憶碎片就開始飄落！
            spawnMemory(); // 馬上飄第一張
            memoryInterval = setInterval(spawnMemory, 3500); // 之後每 3.5 秒掉落一張
            
        }, 500);
    }, 700);
});