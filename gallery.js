import sources from "./images.js";

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
  image.addEventListener("click", () => animate(index));
  toggle(image).src = `img/gallery/${source}`;

  list.append(item);

  return image;
});

const fade = image => {
  toggle(image).removeAttribute("loading");
};

const animate = async index => {
  const { innerWidth } = window;
  const direction = list.id == scrollerID ? -1 : 1;

  if (direction > 0) {
    // Show arrows for browsing
    showElement("#arrows");
    if (index == 0) {
      // Show only right arrow
      hideElement("#arrowleft");
    } else if (index == 7) {
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

  const thumbnail =
    images[direction > 0 ? index : Math.round(list.scrollLeft / innerWidth)];
  if (thumbnail) {
    const duplicate = thumbnail.cloneNode();

    if (direction > 0) toggle(duplicate);

    await body.appendChild(duplicate);

    // Set list id to thumbnails if direction is -1
    if (direction < 0) {
      toggle(list).id = thumbnailsID;
      thumbnail.scrollIntoView({ block: "center" });
      if (list.scrollLeft) list.scrollLeft = 0;
    }

    const animations = {
      opacity: [1, 0]
    };
    // Reverse animation if direction is -1
    if (direction < 0)
      Object.values(animations).forEach(keyframes => keyframes.reverse());

    requestAnimationFrame(() => {
      toggle(thumbnail);
      toggle(direction < 0 ? list : duplicate);
      list
        .animate(
          {
            opacity: animations.opacity
          },
          {
            duration: 10
          }
        )
        .addEventListener(
          "finish",
          () => {
            if (direction > 0) {
              list.id = scrollerID;
              list.scrollLeft = index * innerWidth;
            }
            toggle(thumbnail);
            duplicate.remove();
          },
          { once: true }
        );
    });
  }
};

window.addEventListener("keyup", ({ key }) => {
  if (key != "Escape" || list.id != scrollerID) return;
  animate();
});

// Add image list to body
body.append(list);
