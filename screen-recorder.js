const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
let recorder, stream;

const startScreenRecording = async () => {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
    audio: true,
  });
  recorder = new MediaRecorder(stream);
  let testChunks = [];
  recorder.ondataavailable = (e) => testChunks.push(e.data);
  console.log(testChunks);
  recorder.onstop = (ev) => {
    let blobObj = new Blob(testChunks, { type: testChunks[0].type });
    video.src = URL.createObjectURL(blobObj);
  };
  recorder.start();
};

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");
  startScreenRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
