document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.getElementById("about");
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const tooltip = document.querySelector('.tooltip');

  aboutSection.classList.add("hidden");

  let blinking = false; // Variable to track blinking state

  learnMoreBtn.addEventListener("click", function () {
    aboutSection.classList.toggle("hidden");
    aboutSection.classList.toggle("scroll-show");

    // Scroll to the about section
    aboutSection.scrollIntoView({ behavior: "smooth" });

    // Show the tooltip when clicking "Learn More"
    showTooltip();
    
    // Toggle blinking state
    blinking = !blinking;

    // Toggle the animation based on the blinking state
    if (blinking) {
      tooltip.style.animationPlayState = 'running';
    } else {
      tooltip.style.animationPlayState = 'paused';
    }
  });

  // Add event listener for scroll
  window.addEventListener("scroll", function () {
    if (isInViewport(aboutSection)) {
      aboutSection.classList.add("scroll-show");
      // Show the tooltip when about section is visible
      showTooltip();
    } else {
      aboutSection.classList.remove("scroll-show");
      // Hide the tooltip when about section is not visible
      hideTooltip();
    }
  });

  // Helper function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Show tooltip function
  function showTooltip() {
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
  }

  // Hide tooltip function
  function hideTooltip() {
    tooltip.style.display = "none";
    tooltip.style.opacity = "0";
  }
});
