let capture;

const pixelStrings = [
  "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/()1{}[]?-_+~<>i!lI;:,`'.    `".split(
    ""
  ),
  ["░", "▒", "▓", "█"],
  [".", "*", "e", "s", "@"],
];
let isBnW = true;
pixelString = pixelStrings[0];
// get input from radio input name="choice"
document.getElementsByName("choice").forEach((x) => {
  x.addEventListener("change", (event) => {
    pixelString = pixelStrings[event.target.value - 1];
  });
});

document.getElementById("color").addEventListener("change", (event) => {
  event.target.checked ? (isBnW = false) : (isBnW = true);
});
function setup() {
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  capture.position(410, 25);
  capture.size(40, 40);
}

function draw() {
  background(0);
  capture.loadPixels();
  const actualwidth = width / capture.width;
  const actualheight = height / capture.height;
  for (let i = 0; i < capture.width; i++) {
    for (let j = 0; j < capture.height; j++) {
      const pixelIndex = (i + j * capture.width) * 4;
      const r = capture.pixels[pixelIndex + 0];
      const g = capture.pixels[pixelIndex + 1];
      const b = capture.pixels[pixelIndex + 2];
      //   console.log(r, g, b);
      //   fill(r, g, b);
      //   console.log(r, g, b);
      //   rect(i * 10, j * 10, 10, 10);
      if (isBnW) {
        fill((r + g + b) / 3);
      } else {
        fill(r, g, b);
      }
      const avg = (r + g + b) / 3;
      const charIndex = floor(map(avg, 0, 255, 0, pixelString.length - 1));

      text(pixelString[charIndex], i * actualwidth, j * actualheight);
    }
  }
}
