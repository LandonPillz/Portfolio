"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = document.querySelectorAll(
    '.main-nav a[href^="#"]'
  );
  const revealElements = document.querySelectorAll(".reveal");
  const pageSections = document.querySelectorAll("main section[id]");
  const currentYear = document.querySelector("#current-year");

  /**
   * Close the mobile navigation.
   */
  const closeMenu = () => {
    menuToggle?.classList.remove("active");
    navigation?.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  /**
   * Open or close the mobile navigation.
   */
  menuToggle?.addEventListener("click", () => {
    if (!navigation) {
      return;
    }

    const isOpen = navigation.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  /**
   * Reveal sections and cards as the user scrolls.
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
        threshold: 0.1,
        rootMargin: "0px 0px -45px 0px"
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

  /**
   * Highlight the navigation link for the section currently in view.
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
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${sectionId}`
            );
          });
        });
      },
      {
        threshold: 0.25,
        rootMargin: "-15% 0px -55% 0px"
      }
    );

    pageSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /**
   * Automatically maintain the footer copyright year.
   */
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
});
