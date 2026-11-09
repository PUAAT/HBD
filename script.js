const giftBox = document.getElementById('gift-box');
const giftScreen = document.getElementById('gift-screen');
const letterScreen = document.getElementById('letter-screen');

giftBox.addEventListener('click', () => {
    // 觸發蓋子飛開動畫
    giftBox.classList.add('open');
    
    // 淡出禮物盒，滑出信紙
    setTimeout(() => {
        giftScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');
    }, 600);
});