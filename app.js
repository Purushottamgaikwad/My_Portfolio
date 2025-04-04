let nav = document.querySelector("nav");
let menuicon = document.querySelector(".menu-icon");
let cross = document.querySelector(".cross");
document.addEventListener("wheel", (event) => {
  event.preventDefault(); // Prevent default scroll behavior

  const sections = document.querySelectorAll("section");
  
  // Find the section closest to the top
  let currentSection = [...sections].reduce((prev, curr) => {
      return Math.abs(curr.getBoundingClientRect().top) < Math.abs(prev.getBoundingClientRect().top) ? curr : prev;
  });

  let nextSection;
  if (event.deltaY > 0) {
      // Scroll down
      nextSection = currentSection.nextElementSibling;
  } else {
      // Scroll up
      nextSection = currentSection.previousElementSibling;
  }

  if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
  }
}, { passive: false });

window.addEventListener('scroll', () => {
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('nav a');

  sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 60; // Adjust for navbar height
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
              link.classList.remove('active');
              document.querySelector(`nav a[href*=${id}]`).classList.add('active');
          });
      }
  });
});


function toggleMenu(){
    nav.style.position="fixed"
    nav.style.display= "block";
    nav.style.left = "0";
    nav.style.transform= "translateX(0%)";
    menuicon.style.display="none";
    cross.style.display= "block";

}

function closemenu(){
    // nav.style.left = "-300px";
    nav.style.transform= "translateX(-100%)";
    menuicon.style.display="block";
    cross.style.display= "none";
    // nav.style.position="absolute"


}


let startY = 0; // Store initial touch position
let endY = 0; // Store final touch position
let isScrolling = false;

document.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
});

document.addEventListener("touchend", (event) => {
    if (isScrolling) return; // Prevent multiple triggers
    isScrolling = true;

    endY = event.changedTouches[0].clientY;
    let deltaY = startY - endY;

    const sections = document.querySelectorAll("section");
    const currentSection = [...sections].find(section =>
        section.getBoundingClientRect().top >= -50
    );

    let nextSection;
    if (deltaY > 100) {
        // Swipe Up → Scroll Down
        nextSection = currentSection?.nextElementSibling;
    } else if (deltaY < -100) {
        // Swipe Down → Scroll Up
        nextSection = currentSection?.previousElementSibling;
    }

    if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => isScrolling = false, 1000); // Delay to prevent multiple triggers
});
