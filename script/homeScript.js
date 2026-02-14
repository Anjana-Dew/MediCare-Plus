
// med services display
const medButtons = document.querySelectorAll('.med-btn');
const titleEl = document.querySelector('.service-title');
const descEl = document.querySelector('.service-description');
const imgEl = document.querySelector('.service-image');

    function setContent(button) {
      medButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const newTitle = button.getAttribute('data-title');
      const newContent = button.getAttribute('data-content');
      const newImg = button.getAttribute('data-img');

      titleEl.textContent = newTitle;
      descEl.textContent = newContent;

       if(newImg) {
        imgEl.src = newImg;
        imgEl.alt = newTitle;
        imgEl.style.display = "block";
      } else {
        imgEl.style.display = "none";
      }
  }

  
  const defaultButton = document.querySelector('.med-btn.active');
  if (defaultButton) {
    setContent(defaultButton);
  }


  medButtons.forEach(button => {
    button.addEventListener('click', () => setContent(button));
  });

  
//info-section display
const discoverBtn = document.getElementById('discover-btn');
const findBtn = document.getElementById('find-btn');
const contactBtn = document.getElementById('contact-btn');

const discoverSection = document.getElementById('discover-section');
const findSection = document.getElementById('find-section');
const contactSection = document.getElementById('contact-section');

const allSections = [discoverSection, findSection, contactSection];

// Make sure all are hidden initially
allSections.forEach(sec => sec.classList.remove('active'));

function toggleSection(section) {
  
  if (section.classList.contains('active')) {
    section.classList.remove('active');
  } else {
    
    allSections.forEach(sec => sec.classList.remove('active'));
    section.classList.add('active');
  }
}

discoverBtn.addEventListener('click', () => toggleSection(discoverSection));
findBtn.addEventListener('click', () => toggleSection(findSection));
contactBtn.addEventListener('click', () => toggleSection(contactSection));

function toggleSection(section) {
  if (section.classList.contains('active')) {
    section.classList.remove('active');
    document.body.style.overflow = "auto";
  } else {
    allSections.forEach(sec => sec.classList.remove('active'));
    section.classList.add('active');
    document.body.style.overflow = "hidden";
  }
}



// Navbar scroll effect
window.addEventListener("scroll", function() {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 380) { 
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});