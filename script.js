document.addEventListener("DOMContentLoaded", function () {
   const scrollContainer = document.querySelector(".exclusive-episodes");

   // Check if the screen size is for mobile
   if (window.matchMedia("(max-width: 480px)").matches) {  
       let scrollAmount = 0;
       let scrollSpeed = 2; // Adjust speed
       let autoScrollActive = true; // Track if auto-scroll is active
       let autoScrollTimeout; // Store timeout ID

       function autoScroll() {
           let maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth; // Get width dynamically

           if (!autoScrollActive || scrollAmount >= maxScroll) {
               return; // Stop auto-scroll if user interacts or max scroll reached
           }

           scrollAmount += scrollSpeed;
           scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });

           autoScrollTimeout = setTimeout(autoScroll, 50); // Adjust delay for smoothness
       }

       // **Fix Jitter: Wait until layout stabilizes**
       setTimeout(() => {
           autoScroll(); // Start auto-scrolling after a short delay
       }, 300); // Delay (300ms) allows images & elements to fully load

       // Stop auto-scroll on user interaction
       function stopAutoScroll() {
           autoScrollActive = false;
           clearTimeout(autoScrollTimeout);
       }

       scrollContainer.addEventListener("touchstart", stopAutoScroll);
       scrollContainer.addEventListener("wheel", stopAutoScroll);
       scrollContainer.addEventListener("mousedown", stopAutoScroll);
   }
});


window.addEventListener("scroll", function() {
   let navbar = document.querySelector(".navbar");

   console.log("Scroll position:", window.scrollY); // Debugging

   if (window.scrollY > 50) { 
       navbar.classList.add("scrolled");
   } else {
       navbar.classList.remove("scrolled");
   }
});


const videos = [
    { 
        src: "videos/1.webm", 
        title: "Bonus Episode 06", 
        desc: "Guests Ashish, Ranveer, Jaspreet, Apoorva join Samay to hilariously critique India's latent talents.", 
        playLink: "episodes/bonus6.html", 
        infoLink: "disclaimer.html" 
    },
    { 
        src: "videos/2.webm", 
        title: "Bonus Episode 01", 
        desc: "Guests Arpit, Bappa, Sahil and Amin join Samay to hilariously critique India's latent talents.", 
        playLink: "episodes/bonus1.html", 
        infoLink: "disclaimer.html" 
    },
    { 
        src: "videos/3.webm", 
        title: "Episode 08", 
        desc: "Guests Poonam, Vivek, Sagar, Vidit join Samay to hilariously critique India's latent talents", 
        playLink: "episodes/ep8.html", 
        infoLink: "disclaimer.html" 
    }
];

let currentIndex = 0;
const videoElement = document.getElementById("bg-video");
const sourceElement = document.getElementById("video-source");
const titleElement = document.getElementById("movie-title");
const descElement = document.getElementById("movie-desc");
const playButton = document.getElementById("play-button");
const infoButton = document.getElementById("info-button");
let fading = null; // Prevent overlapping fade effects

// 🔵 Function to smoothly fade volume
function adjustVolume(targetVolume) {
    if (fading) clearInterval(fading); // Stop any ongoing fade

    fading = setInterval(() => {
        if (videoElement.volume < targetVolume) {
            videoElement.volume = Math.min(videoElement.volume + 0.08, targetVolume);
        } else if (videoElement.volume > targetVolume) {
            videoElement.volume = Math.max(videoElement.volume - 0.08, targetVolume);
        } else {
            clearInterval(fading); // Stop when the target volume is reached
        }
    }, 50);
}

// 🔵 Function to check if the video is in viewport (fade earlier)
function isVideoInView() {
    const rect = videoElement.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
}
// 📌 **Fix:** Video starts fading when only 20% is out of view (before it was 40%)

// 🔵 Scroll event to handle audio fade
function handleScroll() {
    if (isVideoInView()) {
        adjustVolume(1);  // Fade-in audio when visible
    } else {
        adjustVolume(0);  // Fade-out audio earlier when scrolling down
    }
}

// 🔵 Play video & handle autoplay
async function playVideoWithAudio() {
    try {
        videoElement.muted = false;
        await videoElement.play();
    } catch (error) {
        console.log("Autoplay blocked, playing muted...");
        videoElement.muted = true;
        videoElement.play();
    }
}

// 🔵 Function to change video smoothly
function changeVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    videoElement.style.opacity = "0";

    setTimeout(() => {
        sourceElement.src = videos[currentIndex].src;
        videoElement.load();

        videoElement.oncanplay = async () => {
            await playVideoWithAudio();
            videoElement.style.opacity = "1";
        };

        // ✅ Update Movie Title & Description
        titleElement.textContent = videos[currentIndex].title;
        descElement.textContent = videos[currentIndex].desc;

        // ✅ Update Play & More Info Button Links
        playButton.href = videos[currentIndex].playLink;
        infoButton.href = videos[currentIndex].infoLink;

    }, 700);
}

// 🔵 Listen for scroll events
window.addEventListener("scroll", handleScroll);

// 🔵 When video ends, change it
videoElement.addEventListener("ended", changeVideo);

// 🔵 Play video on page load
document.addEventListener("DOMContentLoaded", async () => {
    await playVideoWithAudio();
    videoElement.style.display = "block";
    handleScroll(); // Check initial visibility
});


 

videoElement.muted = true;
videoElement.play().then(() => {
    setTimeout(() => {
        videoElement.muted = false;
    }, 1000); // 1 second delay
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 480) { // Adjust breakpoint as needed
        let video = document.getElementById("bg-video"); // Change to your video ID
        if (video) {
            video.muted = true;
        }
    }
});


document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        videoElement.pause(); // Pause video when tab is minimized
    } else {
        videoElement.play(); // Resume video when tab is maximized
    }
});



window.onload = function() {
    document.body.style.visibility = "visible"; 
  };