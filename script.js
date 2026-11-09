// DOM 元素
const gameScreen = document.getElementById('game-screen');
const giftScreen = document.getElementById('gift-screen');
const letterScreen = document.getElementById('letter-screen');
const gameArea = document.getElementById('game-area');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const giftBox = document.getElementById('gift-box');

// 遊戲設定
const targetScore = 19;
let score = 0;
let gameInterval;
let isGameOver = false;

// 專屬回憶符號 (楓葉、吉伊、零食、聊天)
const memories = ['🍁', '🐹', '🍫', '💬']; 

// 監聽滑鼠與觸控來移動籃子
gameArea.addEventListener('mousemove', moveBasket);
gameArea.addEventListener('touchmove', moveBasketTouch, { passive: false });

function moveBasket(e) {
    if (isGameOver) return;
    let rect = gameArea.getBoundingClientRect();
    let x = e.clientX - rect.left;
    updateBasketPosition(x, rect.width);
}

function moveBasketTouch(e) {
    if (isGameOver) return;
    e.preventDefault();
    let rect = gameArea.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    updateBasketPosition(x, rect.width);
}

function updateBasketPosition(x, maxWidth) {
    let basketWidth = basket.offsetWidth;
    // 確保籃子不會跑出邊界
    if (x < basketWidth / 2) x = basketWidth / 2;
    if (x > maxWidth - basketWidth / 2) x = maxWidth - basketWidth / 2;
    basket.style.left = `${x}px`;
}

// 產生掉落的回憶
function spawnItem() {
    if (isGameOver) return;

    const item = document.createElement('div');
    item.classList.add('item');
    item.innerText = memories[Math.floor(Math.random() * memories.length)];
    
    // 隨機水平位置
    let maxX = gameArea.offsetWidth - 35; 
    let randomX = Math.floor(Math.random() * maxX);
    item.style.left = `${randomX}px`;
    item.style.top = '-40px';
    
    gameArea.appendChild(item);
    dropItem(item);
}

// 讓物品掉落與碰撞判定
function dropItem(item) {
    let pos = -40;
    const speed = 3 + Math.random() * 2; // 隨機掉落速度

    function step() {
        if (isGameOver) {
            item.remove();
            return;
        }

        pos += speed;
        item.style.top = `${pos}px`;

        // 碰撞判定 (檢查是否碰到籃子)
        let itemRect = item.getBoundingClientRect();
        let basketRect = basket.getBoundingClientRect();

        if (
            itemRect.bottom >= basketRect.top &&
            itemRect.top <= basketRect.bottom &&
            itemRect.right >= basketRect.left &&
            itemRect.left <= basketRect.right
        ) {
            // 接到了！
            score++;
            scoreDisplay.innerText = score;
            item.remove();
            
            // 檢查是否過關
            if (score >= targetScore) {
                endGame();
            }
            return; // 停止這個物品的動畫
        }

        // 如果掉出界外就移除
        if (pos > gameArea.offsetHeight) {
            item.remove();
            return;
        }

        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// 結束遊戲，進入禮物階段
function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    
    // 淡出遊戲，淡入禮物
    setTimeout(() => {
        gameScreen.classList.add('hidden');
        giftScreen.classList.remove('hidden');
    }, 500);
}

// 拆禮物互動
giftBox.addEventListener('click', () => {
    giftBox.classList.add('shake'); // 加入震動動畫
    
    setTimeout(() => {
        giftScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');
    }, 600); // 震動完後切換畫面
});

// 開始遊戲迴圈 (每800毫秒掉落一個)
gameInterval = setInterval(spawnItem, 800);