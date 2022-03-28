"use strict";

const filterContainers = document.querySelectorAll(".filter-container");
const filterListArrowCloseButton = document.querySelectorAll(
  ".container-list img"
);

const ingredientElement = document.querySelector(".filter-ingredients");
const appliancesElement = document.querySelector(".filter-appliances");
const utensilsElement = document.querySelector(".filter-utensils");
const ingredientsElementList = document.querySelector(".container-ingredients");
const appliancesElementList = document.querySelector(".container-appliances");
const utensilsElementList = document.querySelector(".container-utensils");

filterContainers.forEach((filterContainer, index) => {
  filterContainer.addEventListener("click", () => toggleFilter(index));
});

filterListArrowCloseButton.forEach((filterClosebutton, index) => {
  filterClosebutton.addEventListener("click", (e) => closeFilter(e, index));
});

document.addEventListener("click", (e) => {
  // const filterContainersList = document.querySelectorAll(".container-list");

  // filterContainersList.forEach((containerList) => {
  //   if (containerList.classList.contains("show")) {
  //     console.log("yes");
  //     closeFilter(e);
  //   } else {
  //     console.log("no");
  e.preventDefault();
  //   }
  // });
});

function toggleFilter(index) {
  if (index === 0) {
    ingredientElement.classList.toggle("hide");
    ingredientsElementList.classList.toggle("show");
  } else if (index === 1) {
    appliancesElement.classList.toggle("hide");
    appliancesElementList.classList.toggle("show");
  } else if (index === 2) {
    utensilsElement.classList.toggle("hide");
    utensilsElementList.classList.toggle("show");
  }
}

function closeFilter(e, index) {
  if (index === "undefined") {
    e.preventDefault();
  }
  toggleFilter(index);
}
