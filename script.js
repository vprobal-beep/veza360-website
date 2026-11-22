const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuButton && navigation) {
  const setMenuOpen = (isOpen) => {
    navigation.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setMenuOpen(false);
  });
}

const heroVideo = document.querySelector(".hero-video");
const reduceMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroVideo) {
  const syncHeroMotion = () => {
    if (reduceMotionPreference.matches) {
      heroVideo.pause();
      return;
    }

    heroVideo.play().catch(() => {});
  };

  syncHeroMotion();
  reduceMotionPreference.addEventListener?.("change", syncHeroMotion);
}

const processSection = document.querySelector(".engineering-process");

if (processSection && "IntersectionObserver" in window) {
  const processTarget = processSection.querySelector(".engineering-process-steps") || processSection;

  if (!reduceMotionPreference.matches) {
    processSection.classList.add("is-waiting");
  }

  const processObserver = new IntersectionObserver(
    ([entry]) => {
      if (reduceMotionPreference.matches) {
        processSection.classList.remove("is-waiting", "is-animated");
        return;
      }

      if (entry.isIntersecting) {
        processSection.classList.remove("is-waiting");
        processSection.classList.add("is-animated");
        processObserver.unobserve(processTarget);
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
  );

  const startProcessObservation = () => {
    processObserver.observe(processTarget);
  };

  if (window.scrollY > 0) {
    startProcessObservation();
  } else {
    window.addEventListener("scroll", startProcessObservation, { once: true, passive: true });
  }

  reduceMotionPreference.addEventListener?.("change", () => {
    if (reduceMotionPreference.matches) {
      processSection.classList.remove("is-waiting", "is-animated");
    }
  });
}

// Keep legacy About links aligned with the standalone About Us page.
document.querySelectorAll('a[href="index.html#about"], a[href="#about"]').forEach((link) => {
  link.setAttribute("href", "about.html");
});

document.querySelectorAll(".platform-video-frame[data-video-src]").forEach((frame) => {
  const poster = frame.querySelector(".platform-video-poster");
  if (!poster) return;

  poster.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = frame.dataset.videoSrc;
    iframe.title = frame.dataset.videoTitle || "Explainer Video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
  });
});
