window.onload = () => {
  // -------------------- Loading Screen & Fade Text --------------------
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const introVideo = document.getElementById('intro-video');
  const fadeTextContainer = document.getElementById('fadeText');

  const fadeText = "Your Personal Travel Planner";

  function fadeInText() {
    if (!fadeTextContainer) return;
    fadeTextContainer.innerHTML = '';
    fadeText.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.classList.add('letter');
      if (char === ' ') span.innerHTML = '&nbsp;';
      if (['Y', 'P', 'T'].includes(char)) span.classList.add('orange');
      else span.classList.add('white');
      fadeTextContainer.appendChild(span);
      setTimeout(() => {
        span.style.opacity = 1;
      }, 80 * index);
    });
  }

  function fadeOutLoading() {
    loadingScreen.style.transition = "opacity 1s ease";
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
      fadeInText();
      ScrollTrigger.refresh(); // 🔑 force recalculation after reveal
    }, 1000);
  }

  introVideo.onended = fadeOutLoading;
  setTimeout(() => {
    if (loadingScreen.style.display !== 'none') fadeOutLoading();
  }, 5500);

  // -------------------- Hero Slider --------------------
  let slideIndex = 0;
  const slides = document.querySelectorAll(".hero-slide");

  function showSlides() {
    slides.forEach(s => (s.style.opacity = 0));
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.opacity = 1;
    setTimeout(showSlides, 4000);
  }

  if (slides.length > 0) showSlides();

  // -------------------- GSAP Animations --------------------
  gsap.registerPlugin(ScrollTrigger);

  const panels = document.querySelectorAll(".story-panel");

  panels.forEach(panel => {
    const video = panel.querySelector("video");
    if (!video && panel.dataset.image) {
      panel.style.backgroundImage = `url(${panel.dataset.image})`;
    }
  });

  panels.forEach((panel, i) => {
    gsap.fromTo(
      panel,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.2
        }
      }
    );

    if (i < panels.length - 1) {
      gsap.to(panel, {
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: panels[i + 1],
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.2
        }
      });
    }
  });

  // 🔑 Ensure GSAP recalculates after everything is loaded
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
};
