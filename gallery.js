import sources from "./images.js";
("use strict");

let selectedIndex = 0;

// Create ul element and set ID to thumbnails
const list = document.createElement("ul");
const scrollerID = "scroller";
const thumbnailsID = "thumbnails";
list.id = thumbnailsID;

// Add event listener to left arrow in scroller view
const leftArrow = document.querySelector("#arrowleft");
if (leftArrow) {
  leftArrow.addEventListener("click", () => {
    list.id = thumbnailsID;
    animate(--selectedIndex);
  });
}

// Add event listener to right arrow in scroller view
const rightArrow = document.querySelector("#arrowright");
if (rightArrow) {
  rightArrow.addEventListener("click", () => {
    list.id = thumbnailsID;
    animate(++selectedIndex);
  });
}

const { body } = document;

// Define toggle function to make element hidden or not
const toggle = element => {
  element.classList.toggle("hidden");
  return element;
};

const showElement = elementName => {
  const element = document.querySelector(elementName);
  if (element) {
    element.classList.remove("hidden");
  }
};

const hideElement = elementName => {
  const element = document.querySelector(elementName);
  if (element) {
    element.classList.add("hidden");
  }
};

const template = document.querySelector("template");
const images = sources.map((source, index) => {
  const item = template.content.cloneNode(true);
  const image = item.querySelector("img");

  image.addEventListener("load", () => fade(image));
  image.addEventListener("click", () => {
    animate(index);
  });
  toggle(image).src = `img/gallery/${source}`;

  list.append(item);

  return image;
});

console.log(images);

const fade = image => {
  toggle(image).removeAttribute("loading");
};

const animate = async index => {
  const direction = list.id == scrollerID ? -1 : 1;

  if (direction > 0) {
    // Show arrows for browsing
    showElement("#arrows");
    if (index == 0) {
      // Show only right arrow
      hideElement("#arrowleft");
    } else if (index == images.length - 1) {
      // Show only left arrow
      hideElement("#arrowright");
    } else {
      // Show both arrows
      showElement("#arrowleft");
      showElement("#arrowright");
    }
  } else {
    hideElement("#arrows"); // Hide arrows in thumbnail view
  }

  const thumbnail = images[index];

  if (thumbnail) {
    if (direction > 0) {
      // Open big image
      list.id = scrollerID;
      list.style.opacity = 1;

      for (let i = 0; i < list.children.length; i++) {
        let child = list.children.item(i);
        if (i == index) {
          // Show
          child.style.visibility = "visible";
        } else {
          child.style.visibility = "hidden";
        }
      }
    } else {
      list.style.opacity = 1;
      list.id = thumbnailsID;

      for (let i = 0; i < list.children.length; i++) {
        // Show all
        list.children.item(i).style.visibility = "visible";
      }
    }
  }
};

window.addEventListener("keyup", ({ key }) => {
  if (key != "Escape" || list.id != scrollerID) return;
  animate();
});

window.addEventListener("touch", () => {
  if (list.id != scrollerID) return;
  animate();
});

// Add image list to body
body.append(list);
