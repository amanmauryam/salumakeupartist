const slider = document.querySelector('.slider');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');
const cards = document.querySelectorAll('.card');
let cardWidth = getCardWidth(); // 👈 dynamic width + margin
let currentIndex = 0;

// Function to calculate card width + margin
function getCardWidth() {
  let style = getComputedStyle(cards[0]);
  let margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
  return cards[0].offsetWidth + margin;
}

function updateSlider() {
  slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

// Buttons
rightBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Responsive fix for resizing
window.addEventListener('resize', () => {
  cardWidth = getCardWidth(); // 👈 recalc on resize
  updateSlider();
});

// Mobile swipe detection
let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;
  if (Math.abs(diff) > 50) { // minimum swipe distance
    if (diff > 0 && currentIndex < cards.length - 1) {
      currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
    }
    updateSlider();
  }
}

const videoCard = document.getElementById('videoCard');
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const closeBtn = document.getElementById('closeBtn');

// Detect mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Helper function to extract YouTube ID from URL
function getYouTubeID(url) {
  // Match /shorts/VIDEO_ID or ?v=VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  if (watchMatch) return watchMatch[1];
  return null;
}

videoCard.addEventListener('click', () => {
  const youtubeURL = "https://www.youtube.com/shorts/q7yXp5O1_vU"; // Full YouTube URL
  const videoID = getYouTubeID(youtubeURL);

  if (!videoID) {
    alert("Invalid YouTube URL");
    return;
  }

  const embedURL = `https://www.youtube.com/embed/${videoID}?autoplay=1&controls=1&rel=0&playsinline=1`;

  if (isMobile) {
    // Mobile: open in lightbox
    lightboxVideo.src = embedURL;
    lightbox.style.display = 'flex';
  } else {
    // Desktop: inline play
    videoCard.innerHTML = `<iframe 
      src="${embedURL}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>`;
  }
});


videoCard.addEventListener('click', () => {
  const youtubeURL = "https://www.youtube.com/shorts/q7yXp5O1_vU";
  window.open(youtubeURL, '_blank'); // Opens in new tab
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxVideo.src = ""; // stop video
});



 const portfolioLightbox = document.getElementById('portfolioLightbox');
  const portfolioLightboxImg = document.getElementById('portfolioLightboxImg');
  const portfolioCloseBtn = document.getElementById('portfolioCloseBtn');
  const portfolioImages = document.querySelectorAll('.portfolioGallery img');

  portfolioImages.forEach(img => {
    img.addEventListener('click', () => {
      portfolioLightbox.style.display = 'flex';
      portfolioLightboxImg.src = img.src; // show clicked image
    });
  });

  portfolioCloseBtn.addEventListener('click', () => {
    portfolioLightbox.style.display = 'none';
    portfolioLightboxImg.src = ""; // stop image display
  });

  portfolioLightbox.addEventListener('click', (e) => {
    if(e.target === portfolioLightbox) {
      portfolioLightbox.style.display = 'none';
      portfolioLightboxImg.src = "";
    }
  });