// Initalizing webcames
navigator.getUserMedia = navigator.getUserMedia|| navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia;


const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d');
let model;

function toggleAbout (hide, show){
  let toHide = "";
  let toShow = "";

  if (aboutToggle == false){
    toHide = hide;
    toShow = show;
    aboutToggle = true;
    document.getElementById("aboutP").style.display = "block";
  } else {
    toHide = show;
    toShow = hide;
    aboutToggle = false;
    document.getElementById("aboutP").style.display = "none";
  }

  document.getElementById(toHide).style.display = "none";
  document.getElementById(toShow).style.display = "inline-block";
}

//Stopwatch
const watch = document.querySelector("#stopwatch");
let millisecound = 0;
let timer;
function timeStart(){
    clearInterval(timer);
    timer = setInterval(() => {
      millisecound += 10;

      let dateTimer = new Date(millisecound);

      watch.innerHTML = 
      ('0'+dateTimer.getUTCHours()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCSeconds()).slice(-2);
    }, 10);
  }

timeStart();
function timeReset(){
    setInterval(timer)
    millisecound = 0;
    watch.innerHTML = "00:00:00";
  }
  function timeEnd() {
    watch.style.color = "red";
    clearInterval(timer);
    watch.innerHTML = "00:00:00";
  }
var idVar;  
handTrack.startVideo(video)
    .then(status => {
    if(status){
        navigator.getUserMedia(
            {video: {}},
         stream =>{
            video.srcObject = stream;
            idVar = setInterval(runDetection, 1000);
        },
        err => console.log(err)
        );
    }
});
// var x = document.getElementById('stop-text');

video.style.display = "none";//this single line of code hides the other video
function runDetection(){
    model.detect(video)
    .then(predictions => {
        console.log(predictions);
        model.renderPredictions(predictions, canvas, context, video); 
        if(predictions.length > 0){
            audio.play();
            timeReset();
            // x.classList.toggle('active');
        }
    });
    // x.classList.toggle('inactive');
}
//Start/stop buttons
document.addEventListener('click', (e) => {
  const el = e.target;
  if(el.id === 'start') timeStart();
  if(el.id === 'end'){ 
      timeEnd();
      handTrack.stopVideo(video); 
      clearInterval(idVar);
      context.clearRect(0, 0, canvas.width, canvas.height);
  }
})

// This is for the drop down texts
function myFunction() {
  var paragraph = document.getElementById('paragraph');
  var button = document.getElementById('arrowImg');
  paragraph.classList.toggle('active');
  button.classList.toggle('active');
}
function myFunction2() {
  var paragraph = document.getElementById('paragraph2');
  var button = document.getElementById('arrowImg2');
  paragraph.classList.toggle('active');
  button.classList.toggle('active');
}
const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 20,
    iouThreshold: 0.5,
    scoreThreshold: 0.79,   
}
//copy and pasted from handtrack website, i have no idea what the fuck this does lmfao
handTrack.load(modelParams).then(lmodel => {
        model = lmodel;
    });

        