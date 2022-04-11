const filterContainers = document.querySelectorAll(".filter-container");
const filterListArrowCloseButton = document.querySelectorAll(
  ".container-list img"
);
const filterContainersList = document.querySelectorAll(".container-list");

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

function toggleFilter(index) {
  resetFilter();
  if (index === 0) {
    ingredientElement.classList.add("hide");
    ingredientsElementList.classList.toggle("show");
  } else if (index === 1) {
    appliancesElementList.classList.toggle("show");
    appliancesElement.classList.add("hide");
  } else if (index === 2) {
    utensilsElementList.classList.toggle("show");
    utensilsElement.classList.add("hide");
  }
}

function closeFilter(e, index) {
  if (index === "undefined") {
    e.preventDefault();
  }
  resetFilter();
}

function resetFilter() {
  ingredientElement.classList.remove("hide");
  appliancesElement.classList.remove("hide");
  utensilsElement.classList.remove("hide");
  ingredientsElementList.classList.remove("show");
  appliancesElementList.classList.remove("show");
  utensilsElementList.classList.remove("show");
}
