const bot = document.querySelector(".bot");
const bot_body = document.querySelector(".bot-body");
const eyes = document.querySelector(".eyes");
const antenna = document.querySelector(".antenna");
const face = document.querySelector(".face");
var smoothness = 10;
var botLoc = 0;
var increment = 0;
var curLoc = 0;
const offset = 100;
var flag = true;
var deg = 0;
var rotv = 0;
var distance = 0;
var relHeight = 0;
const botHeight = 390;
window.addEventListener("mousemove", (event) => {
  if (window.screen.height - event.clientY > botHeight) {
    relHeight = window.screen.height - event.clientY - botHeight;
  } else {
    relHeight = -(botHeight - (window.screen.height - event.clientY));
  }
  curLoc = event.clientX;
  if (flag) {
    setTimeout(() => {
      botMover();
    }, offset);
  }
});

const rotateFace = () => {
  var angle = -Math.round(Math.atan(relHeight / (curLoc - botLoc)) * 57.29);
  if (angle > 50) {
    angle = 30;
  }
  if (angle < -50) {
    angle = -30;
  }
  face.style.transform = `rotate(${angle}deg)`;
};
const botMover = () => {
  flag = false;
  const interval = setInterval(() => {
    rotateFace();
    distance = Math.abs(curLoc - botLoc);
    if (distance > 20) {
      if (botLoc < curLoc) {
        increment = distance / 500;
        rotv = (increment / 160) * 180;
        rotate("clk", rotv);
      } else {
        increment = -distance / 500;
        rotv = (increment / 160) * 180;
        rotate("aclk", rotv);
      }
      botLoc += increment;
      bot.style.left = `${botLoc}px`;
    } else {
      face.style.transform = "rotate(0deg)";
      flag = true;
      clearInterval(interval);
      return;
    }
  }, smoothness);
};

const rotate = (sense, angv) => {
  deg += angv;
  if (sense === "clk") {
    if (eyes.classList.contains("move-left")) {
      eyes.classList.remove("move-left");
      antenna.classList.remove("an-right");
    }
  } else if (sense === "aclk") {
    if (!eyes.classList.contains("move-left")) {
      eyes.classList.add("move-left");
      antenna.classList.add("an-right");
    }
  }

  bot_body.style.transform = `rotate(${deg}deg)`;
};
