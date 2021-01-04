var hideButton = event => {
  let button = document.querySelector('#submit')
  button.style.display= 'none'
  
};

const gameState = {
  questionsComplete: []
};

var numCorrect = 1;
(function() {
  // Selectors
  var screenS = document.querySelector(".start-main");

  //Templates
  var startScreen = `
    <main class="start-main">
      <div class="start-wrapper">
        <div class="start-header">
          <h1>
            Go Your Owen Way
          </h1>
        </div>
        <!-- <container> -->
        <div class="start-avatar">
          <img src="../images/butter-girl.png" alt="Buttercup Fund">
        </div>
        <div class="start-opener">
          What a beautiful Monday! Even more exciting is it's the first Monday of the month. On the first day of the month the entire office gets free catered lunch! I should go talk to Owen to see what was ordered and wish him a Happy Free Lunch Day. 
        </div>
        <!-- </container> -->
        <div class="start-footer">
          <button class="start-btn">Start The Party</button>
        </div>
      </div>
    </main>`;

  var playScreen = `
    <main class="game-main">
      <div class="game-wrapper">
        <div class="game-header">
          <h1>
            Go Your Owen Way
          </h1>
        </div>
        <canvas id="gameCanvas"></canvas>
        <div id="question-modal" class="modal"></div>
        <div class="game-footer">
          <button class="back-btn">Back Button</button>
        </div>
      </div>
    </main>`;

  var deathScreen = `
    <main class="death-main">
      <div class="death-wrapper">
        <div class="death-header">
          <h1>
            You Burned The Butter!
          </h1>
        </div>
        <div class="death-avatar">
          <img  src="../images/frying-pan-dead.png" class="death-avitar-img" alt="Buttercup Fund">
        </div>
        <div class="death-footer">
          <button class="back-btn">Start Over</button>
        </div>
      </div>
    </main>`;
    var winScreen = `
    <main class="win-main">
      <div class="win-wrapper">
        <div class="win-header">
          <h1>
            Winner!
          </h1>
        </div>
        <div class="win-avatar">
        <img src="../images/butter-girl.png" alt="Buttercup Fund">
        </div>
        <div class="win-footer">
          <button class="back-btn">Start Over</button>
        </div>
      </div>
    </main>`;
  var modalShell = data => {
    var html = `
      <div id="quiz" data-question="${data.id}" data-answer="${data.correctAnswer}" class="modal-content">
        <div class="modal-header">
          <span class='close'>X</span>
          <h2>${data.modalHeader}</h2>
        </div>
        <div class="modal-body">
          <p>${data.modalQuestion}</p><br>
          <form class="answers">
          <input type="radio" name="quiz" value="a">${data.modalAnswers.a}</input><br><br>
          <input type="radio" name="quiz" value="b">${data.modalAnswers.b}</input><br><br>
          <input type="radio" name="quiz" value="c">${data.modalAnswers.c}</input><br><br>
          <input type="radio" name="quiz" value="d">${data.modalAnswers.d}</input>
          </form>
        </div>
        <div class="modal-footer">
          <button id="submit" class="modal-btn">${data.modalBtn}</button>
        </div>
      </div>`;
          
      return html;
  
  };

  


  //Events
  var eventBindings = function() {
    
    var startBtn = document.querySelector(".start-btn");
    var deadBtn = document.querySelector(".death-btn");
    var backBtn = document.querySelector(".back-btn");
    var winBtn = document.querySelector(".win-btn");
    if (startBtn) {
      startBtn.addEventListener(
        "click",
        handleScreenSwap(screenS, playScreen, "start")
      );
    }
    if (backBtn) {
      backBtn.addEventListener(
        "click",
        handleScreenSwap(screenS, startScreen, "back")
      );
    }
    if (deadBtn) {
      deadBtn.addEventListener(
        "click",
        handleScreenSwap(screenS, deathScreen, "start")
      );
    }
    if (winBtn) {
      winBtn.addEventListener(
        "click",
        handleScreenSwap(screenS, winScreen, "start")
      );
    }

  };

  var handleScreenSwap = function(parentScreen, childScreen, screenType) {
    return function() {
      parentScreen.dataset.screen = screenType;
      parentScreen.innerHTML = childScreen;

      eventBindings();
      if (screenType === "start") {
        var canvas, ctx;
        canvas = document.getElementById("gameCanvas");
        if (gameCanvas.getContext) {
          ctx = canvas.getContext("2d");

          var rectangle = {
            // blue: {
            //   x: 220,
            //   y: 20,
            //   width: 15,
            //   height: 10,
            //   type: "supplyCloset",
            //   modal: {
            //     id: 0,
            //     modalHeader: `Go Your Owen Way`,
            //     modalQuestion: `Why won't you buy beef jerky?!`,
            //     modalBtn: `Save Owen!`
            //   }
            // },
            red: {
              x: 250,
              y: 20,
              width: 15,
              height: 10,
              type: "meredtihS",
              modal: {
                id: 0,
                modalHeader: `Meredith HR`,
                modalQuestion: `Oh hey, I need to plan for B&B this week. I can't remember what the the second B stands for...`,
                modalAnswers: {
                  a: `Beer`,
                  b: `Bagels`,
                  c: `Beer or Bagels depending on the week`,
                  d: `Brunch!`
                },
                correctAnswer: "c",
                modalBtn: `That's Easy`
              }
            },
            // purple: {
            //   x: 150,
            //   y: 50,
            //   width: 15,
            //   height: 10,
            //   type: "frontDesk",
            //   modal: {
            //     id: 2,
            //     modalHeader: `Go Your Owen Way`,
            //     modalQuestion: `Where is Owen? How will I plan my food life?!`,
            //     modalBtn: `Look for clues...`
            //   }
            // },
            brown: {
              x: 30,
              y: 75,
              width: 15,
              height: 10,
              type: "andrewS",
              modal: {
                id: 1,
                modalHeader: `Andrew Dev`,
                modalQuestion: `Swag, you up for a game?`,
                modalAnswers: {
                  a: `I have no time for games!`,
                  b: `What are you talking about?`,
                  c: `I love ping-pong but I'm on a food mission.`,
                  d: `What is swag?`
                },
                correctAnswer: "c",
                modalBtn: `Gucci`
              }
            },
            green: {
              x: 250,
              y: 75,
              width: 15,
              height: 10,
              type: "margeuriteP",
              modal: {
                id: 2,
                modalHeader: `Margueritte Former Client Services`,
                modalQuestion: `This old goat is a ghost. Any ideas why?`,
                modalAnswers: {
                  a: `We "boo" people when they leave Backstop. In a super-friendly-good-luck kinda way.`,
                  b: `Oh no! The revenants are coming for me!`,
                  c: `You died tragically of starvation when we ran out of sting cheese?`,
                  d: `There's no such thing as ghosts.`
                },
                correctAnswer: "a",
                modalBtn: `Boo`
              }
            },
            orange: {
              x: 50,
              y: 110,
              width: 15,
              height: 10,
              type: "gunnarO",
              modal: {
                id: 3,
                modalHeader: `Gunnar IT`,
                modalQuestion: `I need to plan a quarterly outing. I guess I'll do my usual. People dig my usual.`,
                modalAnswers: {
                  a: `Bowling`,
                  b: `Whirlyball`,
                  c: `A Klingon Christmas Carol`,
                  d: `Whirlyball AND Bowling!`
                },
                correctAnswer: "d",
                modalBtn: `People Dig...`
              }
            },
            pink: {
              x: 175,
              y: 110,
              width: 15,
              height: 10,
              type: "kateK",
              modal: {
                id: 4,
                modalHeader: `Kate Client Services`,
                modalQuestion: `Wow, today is free lunch day and I hear it's going to hit seventy this Friday for the first time this year. What a week! Do you know what we do on First Friday?`,
                modalAnswers: {
                  a: `Perform a ritual asking the spirits for a good summer. It includes a sun dance.`,
                  b: `Stare longingly out the window.`,
                  c: `It's too dangerous to work. We leave early to find a patio and have some drinks!`,
                  d: `I hate the sun! Bah humbug.`
                },
                correctAnswer: "c",
                modalBtn: `Sun!`
              }
            },
            white: {
              x: 250,
              y: 100,
              width: 15,
              height: 10,
              type: "deanneF",
              modal: {
                id: 5,
                modalHeader: `Deanne Knowledge Management`,
                modalQuestion: `BUC is right around the corner and I'm pumped! You know what BUC stands for right?`,
                modalAnswers: {
                  a: `Backstop Usurpers Confernce`,
                  b: `Backstop Umpire Convention`,
                  c: `Backstop User Carnival`,
                  d: `Backstop User Conference`
                },
                correctAnswer: "d",
                modalBtn: `Of Course...`
              }
            },
            yellow: {
              x: 0,
              y: 0,
              width: 10,
              height: 12
            }
          };

          function drawgameStop() {
            //Rectangle Locations
            // ctx.fillStyle = "blue";
            // ctx.fillRect(
            //   rectangle.blue.x,
            //   rectangle.blue.y,
            //   rectangle.blue.width,
            //   rectangle.blue.height
            // );

            ctx.fillStyle = "red";
            ctx.fillRect(
              rectangle.red.x,
              rectangle.red.y,
              rectangle.red.width,
              rectangle.red.height
            );

            // ctx.fillStyle = "purple";
            // ctx.fillRect(
            //   rectangle.purple.x,
            //   rectangle.purple.y,
            //   rectangle.purple.width,
            //   rectangle.purple.height
            // );

            ctx.fillStyle = "brown";
            ctx.fillRect(
              rectangle.brown.x,
              rectangle.brown.y,
              rectangle.brown.width,
              rectangle.brown.height
            );

            ctx.fillStyle = "green";
            ctx.fillRect(
              rectangle.green.x,
              rectangle.green.y,
              rectangle.green.width,
              rectangle.green.height
            );

            ctx.fillStyle = "orange";
            ctx.fillRect(
              rectangle.orange.x,
              rectangle.orange.y,
              rectangle.orange.width,
              rectangle.orange.height
            );

            ctx.fillStyle = "pink";
            ctx.fillRect(
              rectangle.pink.x,
              rectangle.pink.y,
              rectangle.pink.width,
              rectangle.pink.height
            );

            ctx.fillStyle = "white";
            ctx.fillRect(
              rectangle.white.x,
              rectangle.white.y,
              rectangle.white.width,
              rectangle.white.height
            );
          }

          // Avatar
          function drawButter() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "yellow";
            ctx.fillRect(
              rectangle.yellow.x,
              rectangle.yellow.y,
              rectangle.yellow.width,
              rectangle.yellow.height
            );
          }

          drawButter();
          drawgameStop();

          //Key Events
          window.addEventListener("keydown", keysPressed, false);
          window.addEventListener("keyup", keysReleased, false);

          var keys = [];

          function keysPressed(e) {
            // store an entry for every key pressed
            e.preventDefault();
            keys[e.keyCode] = true;

            // left
            if (keys[37]) {
              rectangle.yellow.x -= 5;
              // console.log("left");
            }

            // right
            if (keys[39]) {
              rectangle.yellow.x += 5;
            }

            // down
            if (keys[38]) {
              rectangle.yellow.y -= 5;
            }

            // up
            if (keys[40]) {
              rectangle.yellow.y += 5;
            }

            drawButter();
            drawgameStop();

            var modal = document.getElementById("question-modal");
            var btn = document.getElementById("open-modal");
            
            function showResults() {

              // dom containers and selectors
              const quizContainer = document.getElementById("quiz");
              const modalAnswersContainer = quizContainer.querySelectorAll('.answers');
              const modalAnswers = modalAnswersContainer;
              const selector = `input[name=quiz]:checked`;
              const userAnswer = (document.querySelector(selector) || {}).value;
              const answerId = document.querySelector('[data-answer]').dataset;
              const modalBody = document.querySelector('.modal-body');

              // if answer is correct
              if (userAnswer === answerId.answer) {
                // add to the number of correct answers
                numCorrect++;
                // color the answers green
                document.querySelector('.modal-header').style.color = "lightgreen";
              } else {
                // if answer is wrong or blank
                // color the answers red
                document.querySelector('.modal-header').style.color = "red";
                
                // show death screen
                modalBody.innerHTML = deathScreen;
                hideButton();
                // restart
                const restartBtn = document.querySelector('.back-btn');
                restartBtn.addEventListener('click', () => {
                  window.location = window.location;
                });
              }
              // push question id into state array of questions completed
              gameState.questionsComplete.push(answerId.question);
              // then check state to see if we have answered all correctly
              if (gameState.questionsComplete.length >= 6) {
                modalBody.innerHTML = winScreen;
                hideButton();
                // restart
                const restartBtn = document.querySelector('.back-btn');
                restartBtn.addEventListener('click', () => {
                  window.location = window.location;
                });
              }
            };

           


            // apply type to staticObject
            function collision(staticObject) {
              var movingObject = rectangle.yellow;
              var collisionRight =
                movingObject.x > staticObject.x + staticObject.width;
              var collisionLeft =
                movingObject.x + movingObject.width < staticObject.x;
              var collisionUp =
                movingObject.y > staticObject.y + staticObject.height;
              var collisionBottom =
                movingObject.y + movingObject.height < staticObject.y;

              if (
                !(
                  collisionRight ||
                  collisionLeft ||
                  collisionUp ||
                  collisionBottom
                ) /*&& !(modal.style.display = 'block')*/
              ) {
                // stuff happens!
                var shouldRender = true;
                gameState.questionsComplete.forEach((question) => {
                  if (staticObject.modal.id === parseInt(question)) {
                    shouldRender = false;
                  }
                });

                if (shouldRender) {
                  var modalContent = modalShell(staticObject.modal);
                  modal.innerHTML = modalContent;
  
                  var close = modal.getElementsByClassName("close")[0];
                  close.onclick = function() {
                    modal.style.display = "none";
                  };
  
                  modal.style.display = "block";
                  // check the staticObject.type in a switch statement
                  const modalBtn = document.getElementById("submit");
                  modalBtn.addEventListener("click", showResults);
                }
              }
            }

            // When the user clicks outside the modal -- close it.
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            };

            // collision(rectangle.blue);
            collision(rectangle.red);
            // collision(rectangle.purple);
            collision(rectangle.brown);
            collision(rectangle.green);
            collision(rectangle.orange);
            collision(rectangle.pink);
            collision(rectangle.white);
          }

          

          function keysReleased(e) {
            // mark keys that were released
            keys[e.keyCode] = false;
          }
        }
      }
    };
  };

  // Init
  screenS.innerHTML = startScreen;
  eventBindings();
})();
