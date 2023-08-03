const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  w: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};
let lastkey = "";

const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
    }
  });
});

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if ((keys.w.pressed && lastkey === "w") || keys.ArrowUp.pressed) {
    // for continue movement if empty space
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: { x: 0, y: -5 },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if ((keys.a.pressed && lastkey === "a") || keys.ArrowLeft.pressed) {
    // for continue movement if empty space
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: { x: -5, y: 0 },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if ((keys.s.pressed && lastkey === "s") || keys.ArrowDown.pressed) {
    // for continue movement if empty space
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: { x: 0, y: 5 },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if ((keys.d.pressed && lastkey === "d") || keys.ArrowRight.pressed) {
    // for continue movement if empty space
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: { x: 5, y: 0 },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }
  boundries.forEach((boundary) => {
    boundary.draw();

    // for collision detection
    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundary,
      })
    ) {
      player.velocity.y = 0;
      player.velocity.x = 0;
    }
  });
  player.update();
  // player.velocity.y = 0;
  // player.velocity.x = 0;
}
animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastkey = "w";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastkey = "ArrowUp";
      break;
    case "a":
      keys.a.pressed = true;
      lastkey = "a";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastkey = "ArrowLeft";
      break;
    case "s":
      keys.s.pressed = true;
      lastkey = "s";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastkey = "ArrowDown";
      break;
    case "d":
      keys.d.pressed = true;
      lastkey = "d";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastkey = "ArrowRight";
      break;

    default:
      break;
  }
});
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      lastkey = "w";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      lastkey = "ArrowUp";
      break;
    case "a":
      keys.a.pressed = false;
      lastkey = "a";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      lastkey = "ArrowLeft";
      break;
    case "s":
      keys.s.pressed = false;
      lastkey = "s";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      lastkey = "ArrowDown";
      break;
    case "d":
      keys.d.pressed = false;
      lastkey = "d";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      lastkey = "ArrowRight";
      break;

    default:
      break;
  }
});