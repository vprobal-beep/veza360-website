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
  const processObserver = new IntersectionObserver(
    ([entry]) => {
      if (reduceMotionPreference.matches) {
        processSection.classList.remove("is-animated");
        return;
      }

      if (entry.isIntersecting) {
        processSection.classList.add("is-animated");
        processObserver.unobserve(processSection);
      }
    },
    { threshold: 0.25 },
  );

  processObserver.observe(processSection);
  reduceMotionPreference.addEventListener?.("change", () => {
    if (reduceMotionPreference.matches) processSection.classList.remove("is-animated");
  });
}
