// 트랙 데이터 및 설정
const tracks = [
  { title: "HOME SWEET HOME", artist: "G-DRAGON", image: "./images/chart_image1.jpg", duration: "03:31", containerColor: "", audio:"./Music/HOME SWEET HOME.mp3" },
  { title: "Whiplash", artist: "aespa", image: "./images/chart_image2.jpg", duration: "03:05", containerColor: "", audio:"./Music/Whiplash.mp3" },
  { title: "나는 반딧불", artist: "황가람", image: "./images/chart_image3.jpg", duration: "03:36", containerColor: "", audio:"./Music/나는 반딧불.mp3"},
  { title: "APT.", artist: "로제", image: "./images/chart_image4.jpg", duration: "02:50", containerColor: "", audio:"./Music/아파트.mp3"},
  { title: "REBEL HEART", artist: "아이브", image: "./images/chart_image5.jpg", duration: "03:08", containerColor: "", audio:"./Music/REBEL HEART.mp3"},
  { title: "toxic till the end", artist: "로제", image: "./images/chart_image6.jpg", duration: "02:36", containerColor: "", audio:"./Music/toxic till the end.mp3"},
  { title: "Drowning", artist: "WOODZ", image: "./images/chart_image7.jpg", duration: "02:36", containerColor: "", audio:"./Music/Drowning.mp3"},
  { title: "Happy", artist: "데이식스", image: "./images/chart_image8.jpg", duration: "03:09", containerColor: "", audio:"./Music/HAPPY.mp3"},
  { title: "오늘만 I LOVE YOU", artist: "BOYNEXTDOOR", image: "./images/chart_image9.jpg", duration: "02:41", containerColor: "", audio:"./Music/오늘만 I LOVE YOU.mp3"},
  { title: "Power", artist: "G-DRAGON", image: "./images/chart_image10.jpg", duration: "02:23", containerColor: "", audio:"./Music/Power.mp3"},
];

const pastelColors = [
  "#F9C5D5", "#B5EAEA", "#98DDCA", "#DCD6F7", "#FEFDCA", 
  "#7286D3", "#F19ED2", "#7BD3EA", "#FFF574", "#C3FF93"
];

// 파스텔 색상 목록 (랜덤 배경색을 선택하기 위해 사용)
function getRandomPastelColor() {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
}
// 현재 트랙 인덱스, 재생 상태 및 인터벌 변수
let currentTrackIndex = 0;
let isPlaying = false;
let interval;

// DOM 요소 가져오기
const titleElement = document.getElementById("track-title");
const artistElement = document.getElementById("track-artist");
const progressElement = document.getElementById("progress");
const currentTimeElement = document.getElementById("current-time");
const totalTimeElement = document.getElementById("total-time");
const playButton = document.getElementById("play");
const musicPlayer = document.querySelector(".music-player");
const audioElement = document.getElementById("audio");
let currentRotation = 0; // 현재 회전 각도

// 현재 트랙 정보를 업데이트하는 함수
function updateTrack() {
  const track = tracks[currentTrackIndex];
  titleElement.textContent = track.title;
  artistElement.textContent = track.artist;
  document.querySelector(".album-art img").src = track.image;
  totalTimeElement.textContent = track.duration;
  progressElement.style.width = "0%";
  currentTimeElement.textContent = "00:00";
  musicPlayer.style.backgroundColor = getRandomPastelColor();

  audioElement.pause();  // 이전 오디오를 멈추고
  audioElement.load();   // 오디오를 로드
  audioElement.src = track.audio; // 트랙의 오디오 파일 로드

  audioElement.play();
}

// 진행 바를 업데이트하는 함수
function updateProgress() {
  const totalDuration = getDurationInSeconds(tracks[currentTrackIndex].duration);
  const progressPercent = (audioElement.currentTime / totalDuration) * 100;
  progressElement.style.width = `${progressPercent}%`;
  currentTimeElement.textContent = formatTime(Math.floor(audioElement.currentTime));
}

// "mm:ss" 형식의 문자열을 초 단위로 변환하는 함수
function getDurationInSeconds(duration) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

// 초 단위를 "mm:ss" 형식으로 변환하는 함수
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
// 재생/일시 정지 버튼 클릭 이벤트 핸들러
playButton.addEventListener("click", () => {
  const img = document.querySelector(".album-art img");
  isPlaying = !isPlaying;
  playButton.innerHTML = isPlaying ? "&#10073;&#10073;" : "&#9654;";
  if (isPlaying) {
    audioElement.play();
    interval = setInterval(updateProgress, 1000); // UI 업데이트 간격
  } else {
    audioElement.pause();
    clearInterval(interval);
  }
});
// 현재 트랙 재생이 끝났을 때 이벤트 처리
audioElement.addEventListener("ended", () => {
  clearInterval(interval);
  isPlaying = false;
  playButton.innerHTML = "&#9654;";
});
// 이전 트랙 버튼 클릭 이벤트 핸들러
document.getElementById("prev").addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  updateTrack();
  if (isPlaying) {
    audioElement.play();
  }
});
// 다음 트랙 버튼 클릭 이벤트 핸들러
document.getElementById("next").addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  updateTrack();
  if (isPlaying) {
    audioElement.play();
  }
});
// 키보드 이벤트를 통한 재생 시간 조정
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    audioElement.currentTime = Math.min(audioElement.currentTime + 5, audioElement.duration);
  } else if (event.key === "ArrowLeft") {
    audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
  }
  updateProgress(); // UI 업데이트
});

// 초기화
updateTrack();

// 닫기 버튼
const close = document.getElementById("close");
close.addEventListener('click', ()=>{
  document.getElementById('music_container').style.display = 'none';
  // 음악 멈추기
  audioElement.pause();
  clearInterval(interval);
  play_buttons.forEach(btn => btn.classList.remove('active'));
});

// 음악 시작 함수 (트랙 변경 시)
function music_start(event) {
  const music_container = document.getElementById('music_container');
  music_container.style.display= 'flex';
  const li = event.target.closest('li'); // 클릭된 li 요소
  const trackIndex = Array.from(li.parentElement.children).indexOf(li); // 트랙의 인덱스

  currentTrackIndex = trackIndex; // 해당 트랙의 인덱스를 설정
  updateTrack(); // 음악 플레이어 UI 업데이트

  // 음악이 이미 재생 중이라면 일시 정지하고 새 트랙을 시작
  if (isPlaying) {
    audioElement.pause(); // 현재 음악 일시 정지
    audioElement.currentTime = 0; // 트랙 시작 위치로 이동
  }

  audioElement.play().catch((error) => {
    console.error("음악 재생에 실패했습니다.", error);
  }); // 새 트랙 재생
  isPlaying = true; // 재생 상태 설정
  playButton.innerHTML = "&#10073;&#10073;"; // 일시 정지 버튼 표시

  interval = setInterval(updateProgress, 1000); // UI 업데이트 간격
}