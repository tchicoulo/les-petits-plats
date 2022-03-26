"use strict";

const filterContainers = document.querySelectorAll(".filter-container");

console.log(filterContainers);

filterContainers.forEach((filterContainer, index) => {
  filterContainer.addEventListener("click", (e) => openFilter(e, index));
});

function openFilter(e, index) {
  const ingredientElement = document.querySelector(".filter-ingredients");
  const appliancesElement = document.querySelector(".filter-appliances");
  const utensilsElement = document.querySelector(".filter-utensils");

  const ingredientsElementList = document.querySelector(
    ".container-ingredients"
  );
  const appliancesElementList = document.querySelector(".container-appliances");
  const utensilsElementList = document.querySelector(".container-utensils");

  console.log(ingredientsElementList);
  console.log(appliancesElementList);
  console.log(utensilsElementList);

  console.log(e);
  console.log(index);
  if (index === 0) {
    ingredientElement.classList.add("hide");
    ingredientsElementList.classList.add("show");

    console.log("ok index 0");
  } else if (index === 1) {
    console.log("ok index 1");
  } else if (index === 2) {
    console.log("ok index 2");
  }
}
