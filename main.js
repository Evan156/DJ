song1 = "";
song2 = "";

song3 = "";
song4 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftwrist = 0;
scoreRightwrist = 0;


function preload() {

  song1 = loadSound("Believer.mp3");
  song2 = loadSound("Bad_Boy.mp3");
  song3 = loadSound("Thunder.mp3");
  song4 = loadSound("WWWWRY.mp3");

}

function setup() {

  canvas = createCanvas(500, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

}

function modelLoaded() {

  console.log("PoseNet is on");

}

function gotPoses(results) {

  if (results.length > 0) {

    console.log(results)

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    scoreLeftwrist = results[0].pose.keypoints[9].score


    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    scoreRighttwrist = results[0].pose.keypoints[10].score
  }
}


function draw() {

  image(video, 0, 0, 500, 500);

  if (scoreLeftwrist > 0.2) {
    fill("blue")
    stroke("red")
    circle(leftWristX, leftWristY, 20)
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;

    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume = " + volume;
  }
  if (scoreRightwrist > 0.2) {
    fill("blue")
    stroke("red")
    circle(rightWristX, rightWristY, 20)
    
    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    }
    
    if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      song.rate(1.0);
    }

    if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    }

    if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2.0);
    }
    
    if (rightWristY > 400 && rightWristY <= 500) {
      document.getElementById("speed").innerHTML = "Speed = 2.5x";
      song.rate(2.5);
    }

    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume = " + volume;


  }





}

function play() {

  SS = document.getElementById("songs").value
  if (SS == "Beliver") {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
  }

  if (SS == "Bad_Boy") {
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
  }

  if (SS == "Thunder") {
    song3.play();
    song3.setVolume(1);
    song3.rate(1);
  }

  if (SS == "W_W") {
    song4.play();
    song4.setVolume(1);
    song4.rate(1);
  }
}