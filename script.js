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
    // 1. Make sure this ID matches your HTML (it was "blocks" in your screenshot)
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
            // Attach the listener here so it has access to the variables
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

        // Highlight current
        this.classList.add("highlight");
        setTimeout(() => this.classList.remove("highlight"), 500);

        // Highlight neighbors - FIXING THE nIndex TYPO HERE
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