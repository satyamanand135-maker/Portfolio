// import { AdditiveAnimationBlendMode } from "three/src/constants.js";

const bioData = `// Initialize System...
// authorized_access: true
// status: active

const satyam = {
  role: "full-stack chaos coordinator",
  stack: ["React", "Python", "Data Science"],
  mission: "building digital ecosystems that don't mid.",
  vibe: "pixel_perfect",
  coffee: 0,
  sanity: "low"
};

// > bypass_firewall.exe... [SUCCESS]
// > let's cook.
console.log("ready to build something insane.");`;

let charIndex = 0;
let started = false;

function openTerminal(e) {
    e.preventDefault(); // Stops the page from jumping
    
    const wrapper = document.getElementById("terminal-container");
    const trigger = document.getElementById("read-more-trigger");

    wrapper.classList.add("open"); // Slides it down
    trigger.style.display = "none"; // Hides the button after click

    if (!started) {
        started = true;
        setTimeout(typeWriter, 600); // Wait for slide to finish
    }
}

function typeWriter() {
    const container = document.getElementById("typewriter-code");
    if (charIndex < bioData.length) {
        container.textContent += bioData.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40); 
    }
}



const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.addEventListener("DOMContentLoaded", () => {
    const blockContainer = document.getElementById("blocks"); 
    const blockSize = 50;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / blockSize);
    const numRows = Math.ceil(screenHeight / blockSize);
    const numBlocks = numCols * numRows;

    function createBloack() {
        for (let i = 0; i < numBlocks; i++) {
            const block = document.createElement("div");
            block.classList.add("block");
            block.dataset.index = i;
            block.addEventListener("mouseover", highlightRandomNeighbors);
            blockContainer.appendChild(block);
        }
    }

    function highlightRandomNeighbors() {
        const index = parseInt(this.dataset.index);
        const neighbors = [
            index - 1, index + 1,
            index - numCols, index + numCols,
            index - numCols - 1, index - numCols + 1,
            index + numCols - 1, index + numCols + 1
        ].filter(i => 
            i >= 0 && i < numBlocks && Math.abs((i % numCols) - (index % numCols)) <= 1
        );

        this.classList.add("highlight");
        setTimeout(() => this.classList.remove("highlight"), 500);

        shuffleArray(neighbors).slice(0, 1).forEach((neighborIndex) => {
            const neighbor = blockContainer.children[neighborIndex];
            if (neighbor) {
                neighbor.classList.add("highlight");
                setTimeout(() => neighbor.classList.remove("highlight"), 500);
            }
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createBloack();
});


const glitchTitles = ["「 satyam anand 」",
    "『 satyam anand 』",
    "⟨ satyam anand ⟩",
    "| satyam anand |",
    "// satyam anand"];

function glitch() {
    const randomTitle = glitchTitles[Math.floor(Math.random() * glitchTitles.length)];
    document.title = randomTitle;
    
    setTimeout(glitch, Math.random() * 1500 + 500);
}

glitch();