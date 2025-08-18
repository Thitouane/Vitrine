// public/escapevent/RobotInTheVent.js

function startRobotInTheVent(canvas) {
  const ctx = canvas.getContext("2d");

  // Dimensions
  canvas.width = 800;
  canvas.height = 400;

  // Joueur
  const player = {
    x: 50,
    y: 300,
    width: 32,
    height: 32,
    color: "#FFD700",
    dy: 0,
    gravity: 0.6,
    jumpPower: -12,
    grounded: false,
  };

  // Obstacles
  let obstacles = [];
  let obstacleTimer = 0;
  const obstacleInterval = 90; // frames

  // Sol
  const groundHeight = 50;

  // Score
  let score = 0;
  let gameOver = false;

  function spawnObstacle() {
    obstacles.push({
      x: canvas.width,
      y: canvas.height - groundHeight - 30,
      width: 30,
      height: 30,
      color: "#FF4444",
    });
  }

  function resetGame() {
    obstacles = [];
    obstacleTimer = 0;
    score = 0;
    player.y = 300;
    player.dy = 0;
    gameOver = false;
    loop();
  }

  function loop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sol
    ctx.fillStyle = "#555";
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // Joueur physique
    player.y += player.dy;
    player.dy += player.gravity;

    if (player.y + player.height >= canvas.height - groundHeight) {
      player.y = canvas.height - groundHeight - player.height;
      player.dy = 0;
      player.grounded = true;
    } else {
      player.grounded = false;
    }

    // Dessiner joueur
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacles
    obstacleTimer++;
    if (obstacleTimer > obstacleInterval) {
      spawnObstacle();
      obstacleTimer = 0;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= 6;

      // Collision
      if (
        player.x < obs.x + obs.width &&
        player.x + player.width > obs.x &&
        player.y < obs.y + obs.height &&
        player.y + player.height > obs.y
      ) {
        gameOver = true;
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to Retry", canvas.width / 2 - 70, canvas.height / 2 + 40);
      }

      // Dessiner obstacle
      ctx.fillStyle = obs.color;
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      // Supprimer obstacles hors écran
      if (obs.x + obs.width < 0) {
        obstacles.splice(i, 1);
      }
    }

    // Score
    score++;
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(loop);
  }

  // Contrôles
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.grounded && !gameOver) {
      player.dy = player.jumpPower;
    }
    if (e.code === "KeyR" && gameOver) {
      resetGame();
    }
  });

  loop();
}
