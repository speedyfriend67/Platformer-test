<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Difficult Platformer Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="800" height="600"></canvas>

  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Player
    const player = {
      x: 50,
      y: 50,
      width: 20,
      height: 20,
      color: "blue",
      velocityX: 0,
      velocityY: 0,
      jumping: false
    };

    // Gravity
    const gravity = 1;

    // Platforms
    const platforms = [
      { x: 0, y: canvas.height - 20, width: canvas.width, height: 20, color: "green" },
      { x: 200, y: 400, width: 100, height: 10, color: "brown" },
      // Add more platforms as needed
    ];

    // Handle keyboard input
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !player.jumping) {
        player.velocityY = -15; // Jumping force
        player.jumping = true;
      }
    });

    // Update game state
    function update() {
      // Apply gravity to the player
      player.velocityY += gravity;
      player.y += player.velocityY;

      // Check for collisions with platforms
      platforms.forEach(platform => {
        if (
          player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y < platform.y + platform.height &&
          player.y + player.height > platform.y
        ) {
          // Collided with a platform
          player.jumping = false;
          player.velocityY = 0;
          player.y = platform.y - player.height;
        }
      });

      // Update player position
      player.x += player.velocityX;

      // Draw everything
      draw();
    }

    // Draw the game elements
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Draw platforms
      platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      });
    }

    // Game loop
    function gameLoop() {
      update();
      requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
  </script>
</body>
</html>
