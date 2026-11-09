const waxSeal = document.getElementById('wax-seal');
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letterCard = document.getElementById('letter-card');

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
        }, 500);
    }, 700);
});