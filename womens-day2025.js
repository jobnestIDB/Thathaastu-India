// ===============================
// HORIZONTAL GALLERY FUNCTION
// ===============================

document.querySelectorAll(".activity-gallery").forEach(gallery => {

  // Always start from first image on refresh
  gallery.scrollLeft = 0;

  // Create arrows
  const prev = document.createElement("button");
  const next = document.createElement("button");

  prev.innerHTML = "&#10094;";
  next.innerHTML = "&#10095;";

  prev.className = "gallery-arrow prev-arrow";
  next.className = "gallery-arrow next-arrow";

  gallery.parentElement.style.position = "relative";
  gallery.parentElement.appendChild(prev);
  gallery.parentElement.appendChild(next);

  // Update arrow visibility
  function updateArrows() {
    if (gallery.scrollLeft <= 5) {
      prev.style.display = "none";
    } else {
      prev.style.display = "block";
    }

    if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 5) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  }

  updateArrows();

  // Manual scroll
  next.addEventListener("click", () => {
    gallery.scrollBy({ left: 300, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    gallery.scrollBy({ left: -300, behavior: "smooth" });
  });

  // Detect scroll to update arrows
  gallery.addEventListener("scroll", updateArrows);

// ===== AUTO SCROLL (Improved) =====

let autoScroll;

function startAutoScroll() {
  autoScroll = setInterval(() => {

    const maxScroll = gallery.scrollWidth - gallery.clientWidth;

    if (gallery.scrollLeft >= maxScroll - 5) {
      gallery.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      gallery.scrollBy({
        left: gallery.querySelector("img").clientWidth + 14,
        behavior: "smooth"
      });
    }

  }, 2500);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

startAutoScroll();

// Pause on hover
gallery.addEventListener("mouseenter", stopAutoScroll);

// Resume when mouse leaves
gallery.addEventListener("mouseleave", startAutoScroll);
});

// ===============================
// LIGHTBOX
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentIndex = 0;

document.querySelectorAll(".activity-gallery img").forEach(img => {

  img.addEventListener("click", function () {

    currentImages = Array.from(
      this.closest(".activity-gallery").querySelectorAll("img")
    );

    currentIndex = currentImages.indexOf(this);

    lightbox.style.display = "flex";
    lightboxImg.src = this.src;

  });

});

closeBtn.onclick = () => lightbox.style.display = "none";

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
};

document.addEventListener("keydown", e => {

  if (lightbox.style.display === "flex") {

    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") lightbox.style.display = "none";

  }

});

document.addEventListener("DOMContentLoaded", function() {
  
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

});