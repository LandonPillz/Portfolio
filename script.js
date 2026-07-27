"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = document.querySelectorAll(".main-nav a");
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");
  const currentYear = document.querySelector("#current-year");

  /*
   * Mobile navigation
   */
  const closeMenu = () => {
    menuToggle?.classList.remove("active");
    navigation?.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navigation?.classList.toggle("open");

    menuToggle.classList.toggle("active", Boolean(isOpen));
    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  /*
   * Scroll reveal animation
   */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /*
   * Active navigation link
   */
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute("id");

          navigationLinks.forEach((link) => {
            const href = link.getAttribute("href");

            link.classList.toggle(
              "active",
              href === `#${sectionId}`
            );
          });
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-15% 0px -50% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /*
   * Automatically update footer year
   */
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
});
