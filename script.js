// Mobile Menu
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("nav a");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});



const counters = document.querySelectorAll(".counter");
const impactSection = document.getElementById("impactSection");

function runCounter() {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";

    const duration = 2000;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    let count = 0;

    const update = () => {
      count += increment;

      if (count < target) {
        counter.innerText = Math.floor(count).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString() + suffix;
      }
    };

    update();
  });
}

let hasRun = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasRun) {
      runCounter();
      hasRun = true;
    }
  });
}, { threshold: 0.4 });

observer.observe(impactSection);


const sections = document.querySelectorAll("section");


window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  /* ---- CUSTOM GROUPING ---- */

  if (current === "why-modern") {
    current = "about-section-v3";
  }

  /* -------------------------- */

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


const revealElements = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(section => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});


  const slidesV3 = document.querySelectorAll(".about-v3-slide");
        let currentV3 = 0;

        setInterval(() => {
            slidesV3[currentV3].classList.remove("active-v3");
            currentV3 = (currentV3 + 1) % slidesV3.length;
            slidesV3[currentV3].classList.add("active-v3");
        }, 4500);
