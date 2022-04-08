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
  if (index === 0) {
    ingredientElement.classList.toggle("hide");
    ingredientsElementList.classList.toggle("show");

    appliancesElement.classList.remove("hide");
    appliancesElementList.classList.remove("show");

    utensilsElement.classList.remove("hide");
    utensilsElementList.classList.remove("show");
  } else if (index === 1) {
    appliancesElement.classList.toggle("hide");
    appliancesElementList.classList.toggle("show");

    ingredientElement.classList.remove("hide");
    ingredientsElementList.classList.remove("show");

    utensilsElement.classList.remove("hide");
    utensilsElementList.classList.remove("show");
  } else if (index === 2) {
    utensilsElement.classList.toggle("hide");
    utensilsElementList.classList.toggle("show");

    appliancesElement.classList.remove("hide");
    appliancesElementList.classList.remove("show");

    ingredientElement.classList.remove("hide");
    ingredientsElementList.classList.remove("show");
  }
}

function closeFilter(e, index) {
  if (index === "undefined") {
    e.preventDefault();
  }
  toggleFilter(index);
}
