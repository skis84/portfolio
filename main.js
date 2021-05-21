// Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

const animationContainer = document.querySelector(".animationContainer");

// Set Initial State of menu
let showMenu = false;
 
menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    if (animationContainer) {
      animationContainer.classList.add("closeAnimation");
    }
    navItems.forEach(item => {
      item.classList.add("show");
    });
    // Set Menu state
    showMenu = true;
  } else {
    // Some changes to trigger analysis
    console.log("Add some changes here just for the sake of changes")
   
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    if (animationContainer) {
      animationContainer.classList.remove("show");
    }
    navItems.forEach(item => {
      item.classList.remove("show");
    });
    // Set Menu state
    showMenu = false;
  }
}
