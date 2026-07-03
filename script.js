const startButton = document.getElementById("startBtn");

startButton.addEventListener("click", () => {
    document.querySelector("#bcis").scrollIntoView({
        behavior: "smooth"
    });
});

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

sections.forEach(section => {

    observer.observe(section);

});
// ===============================
// Flip Cards
// ===============================

const cards = document.querySelectorAll(".flip-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});
// ===============================
// AI Bias Simulator
// ===============================

const slider = document.getElementById("biasSlider");
const accuracy = document.getElementById("accuracy");
const biasText = document.getElementById("biasText");

slider.addEventListener("input", () => {

    const value = slider.value;

    const score = Math.round(50 + value * 0.48);

    accuracy.textContent = `Accuracy: ${score}%`;

    if(value > 80){

        biasText.textContent =
        "The model performs well because the training data includes many different people.";

    }

    else if(value > 50){

        biasText.textContent =
        "The dataset is becoming less diverse. Performance may begin to vary between groups.";

    }

    else if(value > 25){

        biasText.textContent =
        "The AI is showing noticeable bias because many groups are underrepresented.";

    }

    else{

        biasText.textContent =
        "The dataset is highly biased. Predictions become much less reliable for many people.";

    }

});
// ===============================
// Timeline Progress
// ===============================

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".timeline-progress");

window.addEventListener("scroll", () => {

    const rect = timeline.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    const visible = windowHeight - rect.top;

    const total = rect.height;

    let percent = (visible / total) * 100;

    percent = Math.max(0, Math.min(percent,100));

    progress.style.height = percent + "%";

});
// =====================================================
// CURSOR GLOW + NEURAL DUST
// =====================================================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

    createParticle(e.clientX, e.clientY);

});

// =====================================================
// CREATE PARTICLE
// =====================================================

function createParticle(x, y){

    const particle = document.createElement("div");

    particle.classList.add("particle");

    // Random size
    const size = Math.random() * 7 + 3;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Random position around cursor
    const offsetX = (Math.random() - 0.5) * 25;
    const offsetY = (Math.random() - 0.5) * 25;

    particle.style.left = (x + offsetX) + "px";
    particle.style.top = (y + offsetY) + "px";

    // Random color
    const colors = [
        "#56b4ff",
        "#8b5cf6",
        "#ffffff"
    ];

    const color = colors[Math.floor(Math.random()*colors.length)];

    particle.style.background = color;
    particle.style.boxShadow = `0 0 12px ${color}`;

    // Random lifetime

    particle.style.animationDuration =
        (0.8 + Math.random()*0.6) + "s";

    document.body.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },1500);

}
// =====================================================
// DARK / LIGHT MODE
// =====================================================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeToggle.textContent="☀️";

    }

    else{

        themeToggle.textContent="🌙";

    }

});
// =====================================================
// NEURAL NETWORK BACKGROUND
// =====================================================

const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

const nodes = [];

const NODE_COUNT = 60;

for(let i=0;i<NODE_COUNT;i++){

    nodes.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        dx:(Math.random()-.5)*0.5,

        dy:(Math.random()-.5)*0.5,

        r:2+Math.random()*2

    });

}

function animateNetwork(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw connections

    for(let i=0;i<nodes.length;i++){

        for(let j=i+1;j<nodes.length;j++){

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < 140){

                ctx.beginPath();

                ctx.strokeStyle =
                "rgba(86,180,255," + (1-dist/140)*0.22 + ")";

                ctx.moveTo(nodes[i].x,nodes[i].y);

                ctx.lineTo(nodes[j].x,nodes[j].y);

                ctx.stroke();

            }

        }

    }

    // Draw nodes

    nodes.forEach(node=>{

        ctx.beginPath();

        ctx.fillStyle="#56b4ff";

        ctx.shadowBlur=12;

        ctx.shadowColor="#56b4ff";

        ctx.arc(node.x,node.y,node.r,0,Math.PI*2);

        ctx.fill();

        node.x+=node.dx;
        node.y+=node.dy;

        if(node.x<0||node.x>canvas.width)
            node.dx*=-1;

        if(node.y<0||node.y>canvas.height)
            node.dy*=-1;

    });

    requestAnimationFrame(animateNetwork);

}

animateNetwork();
// =====================================================
// LOADING SCREEN
// =====================================================

const loader = document.getElementById("loader");

const loadingText = document.getElementById("loadingText");

const messages = [

    "Initializing Neural Network...",

    "Connecting Synapses...",

    "Loading AI Ethics Module...",

    "Preparing Brain-Computer Interface...",

    "Welcome to NeuroStrike."

];

let messageIndex = 0;

const textInterval = setInterval(()=>{

    messageIndex++;

    if(messageIndex < messages.length){

        loadingText.textContent = messages[messageIndex];

    }

},600);

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.pointerEvents="none";

        clearInterval(textInterval);

    },3000);

});
// =====================================
// 3D Brain Tilt
// =====================================

const brain =
document.querySelector(".brain-svg");

document.addEventListener("mousemove",(e)=>{

const x =
(e.clientX/window.innerWidth-.5)*20;

const y =
(e.clientY/window.innerHeight-.5)*20;

brain.style.transform=
`rotateY(${x}deg)
 rotateX(${-y}deg)`;

});