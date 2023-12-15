const checkInView = (el) => {
  if (el.getBoundingClientRect().y < window.innerHeight) return true;
};

function throttleFunction(func, delay) {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
}

function manageScrollActions(objList) {
  objList.forEach((obj) => {
    if (obj.type === "array") {
      const elems = document.querySelectorAll(`.${obj.current}`);
      if (!!elems) {
        elems.forEach((elem) => {
          if (checkInView(elem)) {
            elem.classList.add(obj.appendable);
          }
        });
      }
    }
    if (obj.type === "block") {
      const elem = document.querySelector(`.${obj.current}`);
      if (!!elem) {
        if (checkInView(elem)) elem.classList.add(obj.appendable);
        else elem.classList.remove(obj.appendable);
      }
    }
  });
}

const scrollElems = [
  {
    current: "pointer__arrow",
    appendable: "pointer__arrow_shown",
    removable: "pointer__arrow_hidden",
    type: "array",
  },
  {
    current: "achieves__item",
    appendable: "achieves__item_shown",
    removable: "achieves__item_hidden",
    type: "array",
  },
  {
    current: "li_hidden",
    appendable: "li_shown",
    removable: "li_hidden",
    type: "array",
  },
];

document.addEventListener(
  "scroll",
  throttleFunction(() => manageScrollActions(scrollElems), 10)
);

const handleMenuOpening = () => {
  const burger = document.querySelector(".burger");
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__nav");
  burger.addEventListener("click", () => {
    burger.classList.toggle("burger_active");
    header.classList.toggle("header_active");
    headerMenu.classList.toggle("header__nav_active");
  });
};

handleMenuOpening();
