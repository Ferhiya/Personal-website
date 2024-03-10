// Get references to the player elements
const nowPlaying = document.querySelector('.now-playing');
const trackArt = document.querySelector('.track-art img');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');
const playpauseBtn = document.querySelector('.playpause-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');
const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');
const currentTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');

// Define your track list
const trackList = [
  {
    name: 'Morning coffee',
    artist: 'Soyb, Amine Maxwell',
    image: 'img/headphones.jpg',
    source: 'songs/track1.mp3'
  },
  {
    name: 'I´m On My Way',
    artist: 'Avanti',
    image: 'img/headphones.jpg',
    source: 'songs/track2.mp3'
  },
  {
    name: 'Whispers',
    artist: 'Popsicles',
    image: 'img/headphones.jpg',
    source: 'songs/track3.mp3'
  },
  {
    name: 'Calling',
    artist: 'Avanti',
    image: 'img/headphones.jpg',
    source: 'songs/track4.mp3'
  },
  {
    name: 'Higher',
    artist: 'Avanti',
    image: 'img/headphones.jpg',
    source: 'songs/track5.mp3'
  },
  {
    name: 'Beautiful Liar',
    artist: 'Markvard, AgusAlvarez',
    image: 'img/headphones.jpg',
    source: 'songs/track5.mp3'
  },
  // Add more tracks as needed
];

// Initialize variables
let trackIndex = 0;
let isPlaying = false;
let updateTimer;
// Load the default track when the page loads or reloads
loadTrack(trackIndex); // <-- Load "Morning Coffee" by default
// Function to load the currently selected track
function loadTrack(trackIndex) {
  const track = trackList[trackIndex];
  trackArt.src = track.image;
  trackName.textContent = track.name;
  trackArtist.textContent = track.artist;
  audio.src = track.source;
  nowPlaying.textContent = `PLAYING ${trackIndex + 1} OF ${trackList.length}`;
}

// Function to play or pause the track
function playpauseTrack() {
  if (isPlaying) {
    audio.pause();
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  } else {
    audio.play();
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  isPlaying = !isPlaying;
}

// Function to play the next track
function nextTrack() {
  trackIndex = (trackIndex + 1) % trackList.length;
  loadTrack(trackIndex);
  playpauseTrack();
}

// Function to play the previous track
function prevTrack() {
  trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
  loadTrack(trackIndex);
  playpauseTrack();
}

// Function to update the seek slider
function seekTo() {
  const seekto = audio.duration * (seekSlider.value / 100);
  audio.currentTime = seekto;
}

// Function to set the volume
function setVolume() {
  audio.volume = volumeSlider.value / 100;
}

// Update the seek slider as the track plays
audio.addEventListener('timeupdate', function() {
  const position = audio.currentTime / audio.duration;
  seekSlider.value = position * 100;

  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

  currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
});
