/****** MAKE BALLOONS WITH NUMBERS ON THEM *********/

document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.container');
  const balloons = document.getElementById('balloons');
  const balloonCount = 10; 
  let radius;

  // Adjust radius based on device width
  if (window.innerWidth <= 768) {
    radius = 100; // Adjusted radius for mobile devices
  } else {
    radius = 180; // Default radius for desktop devices
  }
  let balloonSize =50;
  const orbitSpeed = 0.0012; 

  function createBalloon(number) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    const balloonText = document.createElement('span');
    balloonText.classList.add('balloon-text');
    balloonText.textContent = number; // Set the number text

    balloon.appendChild(balloonText);
    balloons.appendChild(balloon);

    return balloon;
  }

  // Create balloons in a full circle layout centered
  for (let i = 0; i < balloonCount; i++) {
    const balloon = createBalloon(i); 
    const angle = (Math.PI * 2 * i) / balloonCount;

    animateBalloon(balloon, angle);
  }

   /****** MAKE BALLOONS SPIN *********/

  function animateBalloon(balloon, startAngle) {
    const start = performance.now();

    function update() {
      const time = performance.now() - start;
      const angle = startAngle + orbitSpeed * time;

      
      //Math.cos(angle) * radius - calculates horizontal component of the circular motion
      //container.offsetWidth / 2 centers the circle horizontally 
      //balloonSize / 2 offsets the position by half the balloon's size, so the balloon's center is placed correctly
      const x = Math.cos(angle) * radius + container.offsetWidth / 2 - balloonSize / 2;
      let y;
      if (window.innerWidth <= 768) {
        y = Math.sin(angle) * radius + container.offsetHeight / 2 - balloonSize / 2 - 120; // Adjusted radius for mobile devices
      } else {
        y =Math.sin(angle) * radius + container.offsetHeight / 2 - balloonSize / 2;      
      }
      balloon.style.left = `${x}px`;
      balloon.style.top = `${y}px`;

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
});
  
  
/****** HAVE WEAPON FOLLOW CURSOR *********/

  document.addEventListener("DOMContentLoaded", function() {
    const rightArm = document.querySelector('.right-arm');
    const weapon = document.querySelector('.weapon');
    const stickFigure = document.getElementById('stick-figure');
  
    document.addEventListener('mousemove', function(event) {
      const stickFigureRect = stickFigure.getBoundingClientRect();
      const armRect = rightArm.getBoundingClientRect();
      const weaponRect = weapon.getBoundingClientRect();
      const stickFigureX = stickFigureRect.left + stickFigureRect.width / 2;
      const stickFigureY = stickFigureRect.top + stickFigureRect.height / 2;
      const mouseX = event.clientX - stickFigureX;
      const mouseY = event.clientY - stickFigureY;
  
      const radians = Math.atan2(mouseY, mouseX);
      const angle = radians * (180 / Math.PI);
  
      if (mouseX >= 0) {
        //rightArm.style.transform = `rotate(${angle}deg)`;
        weapon.style.transform = `rotate(${angle}deg)`;
      }
    });
  });
  

/****** CHANGE CURSOR TO LOOK LIKE A TARGET *********/

  const cursorContainer = document.querySelector('.cursor-container');
  const verticalLine = document.querySelector('.vertical-line');
  const horizontalLine = document.querySelector('.horizontal-line');
  
  function moveCursor(e) {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
  
    cursorContainer.style.left = `${mouseX}px`;
    cursorContainer.style.top = `${mouseY}px`;
    
    // Update the lines' positions relative to the circle
    verticalLine.style.transform = `translate(-50%, -50%)`;
    horizontalLine.style.transform = `translate(-50%, -50%)`;
  }
  
  window.addEventListener('mousemove', moveCursor);

/****** SHOOTING *********/

let allowShooting = true;

  function shootBall(e) {
    
    if (!allowShooting) {
      return; // Exit the function if the limit of 10 numbers is reached
  }

    const weapon = document.querySelector('.weapon');

    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);
  
    const ballDistanceX = mouseX - weapon.getBoundingClientRect().left;
    const ballDistanceY = mouseY - weapon.getBoundingClientRect().top;
    const angle = Math.atan2(ballDistanceY, ballDistanceX);
    const speed = 5; // Adjust the speed
  
    let ballX = weapon.getBoundingClientRect().left;
    let ballY = weapon.getBoundingClientRect().top;
  
    const animateBall = setInterval(() => {
      ballX += Math.cos(angle) * speed;
      ballY += Math.sin(angle) * speed;
  
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;
  
      // Check if the ball is close to the target position to stop the animation
      if (Math.abs(ballX - mouseX) < speed && Math.abs(ballY - mouseY) < speed) {
        clearInterval(animateBall);
        ball.remove();
      }
    }, 10);

    const balloons = document.querySelectorAll('.balloon');
  
    const checkCollision = setInterval(() => {
      balloons.forEach(balloon => {
        if (isColliding(ball, balloon)) {
          const number = balloon.textContent;
          displayNumberAtBottom(number);
          clearInterval(checkCollision);
          ball.remove();
        }
      });
    }, 10);
  }

  function isColliding(ball, balloon) {
    const ballRect = ball.getBoundingClientRect();//getBoundingClientRect retrieves the position and dimensions of an element relative to the viewport.
    const balloonRect = balloon.getBoundingClientRect();//getBoundingClientRect returns an object with properties like top, bottom, left, right
  
    return !(
      ballRect.right < balloonRect.left ||
      ballRect.left > balloonRect.right ||
      ballRect.bottom < balloonRect.top ||
      ballRect.top > balloonRect.bottom
    ); // checking if the ball is within the designated area anywhere
  }
  
  /****** MAKE THE NUMBERS APPEAR AT THE BOTTOM AFTER SHOT AT *********/
 
  
  function displayNumberAtBottom(number) {
    const bottomContainer = document.querySelector('.bottom-container');
    const displayedNumbers = document.querySelectorAll('.number-display').length;
    const checkButton = document.querySelector('.check');
  
    if (displayedNumbers < 10) {
      const numberDisplay = document.createElement('div');
      numberDisplay.textContent = number;
      numberDisplay.classList.add('number-display');
      bottomContainer.appendChild(numberDisplay);
  
      if (displayedNumbers === 9) {  //only allow 10 numbers to be displayed
        allowShooting = false;
        checkButton.style.display = 'block';
      }
    }
  }
  
 
  document.addEventListener('click', function(e) {
    shootBall(e);
  });
  
 
  // Function to clear all displayed numbers
function clearAllNumbers() {
  numbersArray = [];
  const bottomContainer = document.querySelector('.bottom-container');
  bottomContainer.innerHTML = ''; // Remove all content inside bottom container

  allowShooting = true; // Allow shooting again
  const checkButton = document.querySelector('.check');
  checkButton.style.display = 'none'; // Hide the check button again
  numberOfBallsShot = 0; // Reset the number of shots taken
  numberOfNumbersDisplayed = 0; // Reset the number of displayed numbers
}


// Event listener for the clear button
const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearAllNumbers);


/****** CREATE A POPUP WINDOW FOR SUBMITTING OR GOING BACK *********/


function showModal() {

  const modal = document.querySelector('.modal');
  const numbersList = document.querySelector('.numbers-list');

  // Fetch numbers from getNumbers() function
  const numbers = getNumbers();

  numbers.forEach(number => {
    const p = document.createElement('p');
    p.textContent = number;
    numbersList.appendChild(p);
  });
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.style.display = 'flex';
}


function hideModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.style.display = 'none';
  clearAllNumbers();
}

function clearNumbersInModal() {
  const numbersList = document.querySelector('.numbers-list');
  numbersList.innerHTML = ''; // Clear numbers in the modal
}


document.querySelector('.go-back-button').addEventListener('click', function() {
  clearNumbersInModal();
  closeModal(); // Assuming closeModal is a function to hide the modal
});

function getNumbers() {
  const bottomContainer = document.querySelector('.bottom-container');
  const numberElements = bottomContainer.querySelectorAll('.number-display');
  
  // Extract text content from each element and map to an array
  const numbersArray = Array.from(numberElements).map(element => element.textContent);
  
  return numbersArray;
}

/****** CREATE A POPUP WINDOW FOR SUBMITTING *********/

function submitNumbers() {
  const numbers = getNumbers();
  console.log('Numbers submitted:', numbers);
  openNewPopup();
  //closeModal();
  
}

function closeModal() {
  // Logic to hide or close the modal
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'none'; // For example, hiding the modal
}

function openNewPopup() {
  const newModal = document.querySelector('.new-modal');
  const message = document.createElement('p');
  message.textContent = 'Yay! You submitted your phone number. It is posted to the console.';
  newModal.appendChild(message);
  newModal.style.display = 'block';
}

document.querySelector('.submit-button').addEventListener('click', submitNumbers);
document.querySelector('.restart').addEventListener('click', restart);


function restart(){
  const modal = document.querySelector('.new-modal');
  modal.style.display = 'none';
  closeModal();
  clearNumbersInModal()
}


/****** BUTTONS *********/

const checkButton = document.querySelector('.check');
checkButton.addEventListener('click', showModal);

const goBackButton = document.querySelector('.go-back-button');
goBackButton.addEventListener('click', hideModal);

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', submitNumbers);

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restarttNumbers);
  
  
  