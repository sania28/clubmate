// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
});

// Typewriter Effect for Hero Title
function typewriterEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  // Define text with markers for highlighting
  const textData = [
    {
      parts: ["Streamline Your ", "Technical Club", " Operations"],
      highlights: [false, true, false],
    },
    {
      parts: ["Manage Your ", "Student Events", " Efficiently"],
      highlights: [false, true, false],
    },
    {
      parts: ["Organize Your ", "Tech Community", " Better"],
      highlights: [false, true, false],
    },
  ];

  let textIndex = 0;
  let partIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 2500;

  function type() {
    const currentData = textData[textIndex];
    const currentPart = currentData.parts[partIndex];
    const isHighlighted = currentData.highlights[partIndex];

    let displayText = "";

    // Build display text up to current position
    for (let i = 0; i < partIndex; i++) {
      if (currentData.highlights[i]) {
        displayText += `<span class="highlight">${currentData.parts[i]}</span>`;
      } else {
        displayText += currentData.parts[i];
      }
    }

    // Add current part being typed
    if (partIndex < currentData.parts.length) {
      const currentText = isDeleting
        ? currentPart.substring(0, charIndex)
        : currentPart.substring(0, charIndex);

      if (isHighlighted) {
        displayText += `<span class="highlight">${currentText}</span>`;
      } else {
        displayText += currentText;
      }
    }

    // Update display
    heroTitle.innerHTML =
      displayText + '<span class="typewriter-cursor">|</span>';

    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting) {
      // Typing forward
      charIndex++;
      if (charIndex > currentPart.length) {
        // Move to next part
        partIndex++;
        charIndex = 0;

        if (partIndex >= currentData.parts.length) {
          // Finished typing all parts, start deleting after pause
          typeSpeed = pauseTime;
          isDeleting = true;
          partIndex = currentData.parts.length - 1;
          charIndex = currentData.parts[partIndex].length;
        }
      }
    } else {
      // Deleting backward
      charIndex--;
      if (charIndex < 0) {
        // Move to previous part
        partIndex--;
        if (partIndex < 0) {
          // Finished deleting, move to next text
          isDeleting = false;
          textIndex = (textIndex + 1) % textData.length;
          partIndex = 0;
          charIndex = 0;
        } else {
          charIndex = currentData.parts[partIndex].length;
        }
      }
    }

    setTimeout(type, typeSpeed);
  }

  // Start the typewriter effect
  type();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .hero-card, .tech-category"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Initialize typewriter effect
  setTimeout(typewriterEffect, 500); // Small delay for better UX
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Simple form validation for future contact forms
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Copy to clipboard functionality (for future use with code snippets)
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
    document.body.prepend(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (error) {
      console.error("Copy failed:", error);
    } finally {
      textArea.remove();
    }
  }
}

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect and typewriter cursor
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .typewriter-cursor {
        color: #ffd700;
        animation: blink 1s infinite;
        font-weight: 100;
        margin-left: 2px;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .hero-title {
        min-height: 12rem; /* Increased for multi-line content */
        line-height: 1.1;
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            gap: 1rem;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .nav-link {
            font-size: 1.2rem;
            padding: 1rem;
        }
        
        .hero-title {
            min-height: 9rem;
            font-size: 2.5rem;
        }
        
        .typewriter-cursor {
            margin-left: 1px;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }
});
