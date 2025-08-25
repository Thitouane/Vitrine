function startRobotInTheVent(canvas) {
  const ctx = canvas.getContext("2d");

  const playerImg = new Image();
  playerImg.src = "escapevent/wobot.png";
  const obstacleImg1 = new Image();
  obstacleImg1.src = "escapevent/evil_wobot.png";
  const obstacleImg2 = new Image();
  obstacleImg2.src = "escapevent/evil_long_wobot.png";
  const flyingEnemyImg = new Image();
  flyingEnemyImg.src = "escapevent/evil_flying_wobot.png";

  canvas.width = 800;
  canvas.height = 400;

  let scrollSpeed = 6; // vitesse de base

  const player = {
    x: 50,
    y: 300,
    width: 64,
    height: 64,
    dy: 0,
    gravity: 0.6,
    jumpPower: -12.8,
    grounded: false,
  };

  let obstacles = [];
  let obstacleTimer = 0;
  const obstacleInterval = 90;
  const groundHeight = 50;

  let score = 0;
  let gameOver = false;

  // Détecter mobile
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  function spawnObstacle() {
    const type = Math.random();

    if (type < 0.3) {
      // Volant
      obstacles.push({
        type: "flying",
        x: canvas.width,
        width: 64,
        height: 64,
        y: canvas.height - groundHeight - 150, // haut
        image: flyingEnemyImg,
      });
    } else {
      // Normal au sol
      const height = Math.random() < 0.5 ? 64 : 32;
      const y = canvas.height - groundHeight - height;

      obstacles.push({
        type: height === 64 ? "tall" : "short",
        x: canvas.width,
        width: 64,
        height: 64,
        y: y,
        image: height === 64 ? obstacleImg2 : obstacleImg1,
      });
    }
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
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // Obstacle logic
    obstacleTimer++;
    if (obstacleTimer > obstacleInterval) {
      spawnObstacle();
      obstacleTimer = 0;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= scrollSpeed;

      // Définir les hitboxes ajustées
      const playerHitbox = {
        x: player.x + 10,
        y: player.y + 10,
        width: player.width - 20,
        height: player.height - 20
      };

      const obsHitbox = {
        x: obs.x + 8,
        y: obs.y + 8,
        width: obs.width - 16,
        height: obs.height - 16
      };

      // Debug : Dessiner les hitboxes (à enlever après tests)
      // ctx.strokeStyle = "lime";
      // ctx.strokeRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);

      // ctx.strokeStyle = "red";
      // ctx.strokeRect(obsHitbox.x, obsHitbox.y, obsHitbox.width, obsHitbox.height);

      // Collision avec hitboxes réduites
      if (
        playerHitbox.x < obsHitbox.x + obsHitbox.width &&
        playerHitbox.x + playerHitbox.width > obsHitbox.x &&
        playerHitbox.y < obsHitbox.y + obsHitbox.height &&
        playerHitbox.y + playerHitbox.height > obsHitbox.y
      ) {
        gameOver = true;
        ctx.fillStyle = "#fff";
        ctx.font = "24px 'Press Start 2P'";
        ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2);

        ctx.font = "16px 'Press Start 2P'";
        
        const retryText = isMobile ? "Press to Retry" : "Press R to Retry";
        const retryPos = isMobile ? canvas.width / 2 - 124 : canvas.width / 2 - 136;
        ctx.fillText(retryText, retryPos, canvas.height / 2 + 40);
      }

      // Utilise les dimensions de l’image sans déformation
      const spriteHeight  = obs.type === "tall" ? 128 : 64;
      const spriteWidth = 64;

      // Repositionne pour que la base touche le sol
      const drawY = obs.type === "flying" ? canvas.height - groundHeight - (spriteHeight * 2) : canvas.height - groundHeight - spriteHeight;

      ctx.drawImage(obs.image, obs.x, obs.y, obs.width, obs.height);

      // Met à jour aussi les données d'obstacle pour collision (si nécessaire)
      obs.y = drawY;
      obs.width = spriteWidth;
      obs.height = spriteHeight;

      // Supprimer obstacle
      if (obs.x + obs.width < 0) {
        obstacles.splice(i, 1);
      }
    }

    // Score
    score++;
    ctx.fillStyle = "#fff";
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText("Score: " + score, 10, 30);

    scrollSpeed += 0.001; // ajuste la valeur pour contrôler l'accélération

    requestAnimationFrame(loop);
  }

  // Contrôles
  // Contrôles clavier (PC)
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.grounded && !gameOver) {
      player.dy = player.jumpPower;
    }
    if (e.code === "KeyR" && gameOver) {
      resetGame();
    }
  });

  // Détection mobile : si on touche le canvas, on saute
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // empêche le scroll de la page
    if (player.grounded && !gameOver) {
      player.dy = player.jumpPower;
    }
  });

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); 
    if (!gameOver && player.grounded) {
      player.dy = player.jumpPower;
    } else if (gameOver) {
      resetGame(); // si le jeu est terminé, un appui redémarre le jeu
    }
  });

  loop();
}
