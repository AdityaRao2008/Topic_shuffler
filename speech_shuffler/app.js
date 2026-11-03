const input = document.getElementById('topicInput');
let pool = [];

// Load your specific image keywords into the starter state box
input.value = "java\nair\nwater\npages";

function syncPool() {
    const list = input.value.split('\n').map(t => t.trim()).filter(t => t.length > 0);
    document.getElementById('topicCounter').innerText = `Detected ${list.length} total topics`;
    
    if (pool.length === 0 || pool.some(item => !list.includes(item)) || pool.length > list.length) {
        pool = [...list];
    }
    document.getElementById('poolCounter').innerText = `Remaining in loop: ${pool.length}`;
}

input.addEventListener('input', syncPool);
syncPool();

document.getElementById('shuffleBtn').addEventListener('click', () => {
    const list = input.value.split('\n').map(t => t.trim()).filter(t => t.length > 0);
    if (list.length === 0) return alert("Please add items first!");
    
    if (pool.length === 0) pool = [...list];

    const btn = document.getElementById('shuffleBtn');
    const topicTxt = document.getElementById('screenTopic');
    const labelTxt = document.getElementById('screenLabel');

    btn.disabled = true;
    labelTxt.innerText = "SHUFFLING...";
    labelTxt.style.color = "#3b82f6";
    
    let ticks = 0;
    const timer = setInterval(() => {
        topicTxt.innerText = list[Math.floor(Math.random() * list.length)];
        topicTxt.className = "screen-topic rolling";
        
        if (++ticks >= 15) {
            clearInterval(timer);
            const idx = Math.floor(Math.random() * pool.length);
            const choice = pool.splice(idx, 1)[0];
            
            topicTxt.innerText = choice;
            topicTxt.className = "screen-topic";
            
            labelTxt.innerText = pool.length === 0 ? "LOOP DONE! REBOOTING POOL..." : "UNIQUE TOPIC DEPLOYED";
            labelTxt.style.color = pool.length === 0 ? "#f59e0b" : "#10b981";
            
            syncPool();
            btn.disabled = false;
        }
    }, 70);
});
