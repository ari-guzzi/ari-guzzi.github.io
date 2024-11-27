//****************************** Set Up **************************************//

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

const roadWidth = canvas.width * 0.5;  // Road occupies 50% of canvas width
const laneWidth = roadWidth / 3;
const roadStartX = (canvas.width - roadWidth) / 2;

let frames = 0;
const degree = Math.PI / 180;
let currentLane = 1;

let assetsLoaded = 0;
let totalAssets = 2;

const car = new Image();
const hole = new Image();

car.src = "car.png";
hole.src = "hole.png";
var carX;
var carY;

car.onload = () => {
    const desiredWidth = 50; 
    const aspectRatio = car.naturalHeight / car.naturalWidth;
    car.width = desiredWidth;
    car.height = desiredWidth * aspectRatio;
    carX = roadStartX + laneWidth * (currentLane + 0.5) - car.width / 2;
    carY = canvas.height - car.height - 160;
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
        initializeGame();
    }
};
function updateCarPosition() {
    carX = roadStartX + laneWidth * (currentLane + 0.5) - car.width / 2;
    carY = canvas.height - car.height - 160;
}

hole.onload = () => {
    hole.width = 200; 
    hole.height = 200; 
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
        initializeGame();
    }
};

function initializeGame() {
    gameState.current = gameState.getReady; 
    holes = [];
    addInitialHole();
    holeInterval = setInterval(addHole, 1000 * 2); 
    draw();
}

//****************************** Holes and Collisions **************************************//

let holes = [];

function addInitialHole() {
    let holeLane = Math.floor(Math.random() * 3);
    createHole(holeLane);
}

function addHole() {
    let holeLane = Math.floor(Math.random() * 3);
    createHole(holeLane);
    score++;

}

function createHole(lane) {
    let holeX = roadStartX + laneWidth * (lane + 0.5) - hole.width / 2; // Center hole in lane
    // Create a new hole object with consistent width and height
    let newHole = {
        image: hole,
        x: holeX,
        y: -hole.height, // Start just above the top of the canvas
        width: 200,  
        height: 200  
    };
    holes.push(newHole);
}

let holeInterval;

function startAddingHoles() {
    if (holeInterval) {
        clearInterval(holeInterval); 
    }
    holeInterval = setInterval(addHole, 2000); 
}

function updateHoles() {
    holes.forEach(hole => {
        hole.y += 4; // Move holes down each frame
    });
    // Remove holes that have gone below the canvas
     holes = holes.filter(hole => hole.y < canvas.height);
}

function checkCollision() {
    updateCarPosition()
        holes.forEach(hole => {
            if (carX < hole.x + hole.width &&
                carX + car.width > hole.x &&
                carY < hole.y + hole.height &&
                carY + car.height > hole.y) {
                gameState.current = gameState.over;
            }
    });
}
//****************************** Drawing! **************************************//

function drawHoles() {
    holes.forEach(hole => {
        ctx.drawImage(hole.image, hole.x, hole.y, hole.width, hole.height);
        hole.y += 2; // Move hole down
    });

    // Remove holes that have moved past the canvas
    holes = holes.filter(hole => hole.y < canvas.height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawScore();
    drawRoad(); // Always draw the road
    if (gameState.current === gameState.game) {
        drawHoles(); // Draw holes only during the game
        updateCarPosition()
        ctx.drawImage(car, carX, carY, car.width, car.height);
    } else if (gameState.current === gameState.getReady) {
        showStartScreen();
    } else if (gameState.current === gameState.over) {
        showGameOverScreen();
    }
}

function drawRoad() {
    ctx.fillStyle = '#555'; 
    ctx.fillRect(roadStartX, 0, roadWidth, canvas.height);

    // Draw the lane dividers
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    for (let i = 1; i < 3; i++) { // Draw two lines to create three lanes
        ctx.beginPath();
        ctx.moveTo(roadStartX + i * laneWidth, 0);
        ctx.lineTo(roadStartX + i * laneWidth, canvas.height);
        ctx.stroke();
    }
}
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 10, 30); 
}

//****************************** Game stuff like controls, start screen, game over screen, loops, resets, etc. **************************************//

// Handle key presses
document.addEventListener('keydown', function(e) {
    if (gameState.current === gameState.getReady && e.key === " ") {
        gameState.current = gameState.game;
        loop(); // Start the game loop when space is pressed on the start screen
    } else if (gameState.current === gameState.game) {
        switch (e.key) {
            case "ArrowLeft":
                if (currentLane > 0) {
                    currentLane--;
                }
                break;
            case "ArrowRight":
                if (currentLane < 2) {
                    currentLane++;
                }
                updateCarPosition()
                break;
        }
    } else if (gameState.current === gameState.over && e.key === " ") {
        resetGame(); // Restart the game when space is pressed on the game over screen
    }
});

function showStartScreen() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Press Space to Start", canvas.width / 2, canvas.height / 2);
}

function showGameOverScreen() {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillStyle = 'white';
    ctx.fillText("Score:" + score, canvas.width / 2, canvas.height / 2 - 90);

    ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2);
}

let gameState = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
};

var score = 0;

function update() {
    if (frames % 120 === 0) { // Add new hole every 120 frames
        addHole();
    }
    updateHoles();
    checkCollision();
}

let animationFrameId;

function loop() {
    if (gameState.current !== gameState.over) {
        update();
        frames++;
        animationFrameId = requestAnimationFrame(loop);
    } else {
        cancelAnimationFrame(animationFrameId);  // Stop the loop
    }
    draw();
}

function resetGame() { 
    clearInterval(holeInterval);  // Stop adding holes
    holes = [];
    score = 0;
    currentLane = 1;
    frames = 0;
    gameState.current = gameState.game;
    startAddingHoles(); 
    loop(); 
}

draw();

loop();
