'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".image-slider");

  let currentSlider = null;   // Hangi slider açık?
  let currentIndex = 0;       // O slider’daki hangi resim?
  
  // Slider başlatma
  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    let localIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    prevBtn.addEventListener("click", () => {
      localIndex = (localIndex - 1 + slides.length) % slides.length;
      showSlide(localIndex);
    });

    nextBtn.addEventListener("click", () => {
      localIndex = (localIndex + 1) % slides.length;
      showSlide(localIndex);
    });

    showSlide(localIndex);

    // Lightbox açma
    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        openLightbox(slider, i);
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  function openLightbox(slider, index) {
    currentSlider = slider;
    currentIndex = index;
    const slides = currentSlider.querySelectorAll(".slide");
    lightbox.style.display = "block";
    lightboxImg.src = slides[currentIndex].src;
  }

  function showLightboxSlide(index) {
    const slides = currentSlider.querySelectorAll(".slide");
    currentIndex = (index + slides.length) % slides.length;
    lightboxImg.src = slides[currentIndex].src;
  }

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightboxPrev.addEventListener("click", () => {
    showLightboxSlide(currentIndex - 1);
  });

  lightboxNext.addEventListener("click", () => {
    showLightboxSlide(currentIndex + 1);
  });

  // ESC + yön tuşları
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "Escape") lightbox.style.display = "none";
      if (e.key === "ArrowLeft") showLightboxSlide(currentIndex - 1);
      if (e.key === "ArrowRight") showLightboxSlide(currentIndex + 1);
    }
  });
});
