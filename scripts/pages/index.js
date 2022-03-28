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
  filterContainer.addEventListener("click", () => openFilter(index));
});

filterListArrowCloseButton.forEach((filterClosebutton, index) => {
  filterClosebutton.addEventListener("click", (e) => closeFilter(e, index));
});

document.addEventListener("click", (e) => {
  const filterContainersList = document.querySelectorAll(".container-list");

  // filterContainersList.forEach((containerList) => {
  //   if (containerList.classList.contains("show")) {
  //     console.log("yes");
  //     closeFilter(e);
  //   } else {
  //     console.log("no");
  //     e.preventDefault();
  //   }
  // });
});

function openFilter(index) {
  if (index === 0) {
    ingredientElement.classList.add("hide");
    ingredientsElementList.classList.add("show");
  } else if (index === 1) {
    appliancesElement.classList.add("hide");
    appliancesElementList.classList.add("show");
  } else if (index === 2) {
    utensilsElement.classList.add("hide");
    utensilsElementList.classList.add("show");
  }
}

function closeFilter(e, index) {
  if (index === "undefined") {
    e.preventDefault();
  } else if (index === 0) {
    ingredientElement.classList.remove("hide");
    ingredientsElementList.classList.remove("show");
    console.log(index);
  } else if (index === 1) {
    appliancesElement.classList.remove("hide");
    appliancesElementList.classList.remove("show");
    console.log(index);
  } else if (index === 2) {
    utensilsElement.classList.remove("hide");
    utensilsElementList.classList.remove("show");
    console.log(index);
  }
}
