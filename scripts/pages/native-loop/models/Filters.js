import { recipes } from "../../../../data/recipes.js";

setTimeout(() => {
  const ingredientElement = document.querySelectorAll(".ingredients-list li");
  for (let i = 0; i < ingredientElement.length; i++) {
    ingredientElement[i].addEventListener("click", () =>
      addFilterIngredientTag(i, ingredientElement)
    );
  }
}, 300);

function ingredientsDisplay(ingredientNameList) {
  let ingredientList = document.querySelector(".ingredients-list");
  ingredientList.innerHTML = "";

  for (let i = 0; i < ingredientNameList.length; i++) {
    ingredientList.innerHTML += `<li>${ingredientNameList[i]}</li>`;
  }
}

function addFilterIngredientTag(i, ingredientElement) {
  const filterTag = document.querySelector(".tag");
  console.log(ingredientElement[i].innerHTML);
  ingredientElement[i].remove();

  filterTag.innerHTML += `
    <div class="filtered-details">
      <span>${ingredientElement[i].innerHTML}</span>
      <img class="delete-selected-filter" src="./assets/icons/delete.svg" />
    </div>
  `;

  deleteFiltertag();
}

function deleteFiltertag() {
  const deleteTag = document.querySelectorAll(".delete-selected-filter");
  for (let i = 0; i < deleteTag.length; i++) {
    deleteTag[i].addEventListener("click", (e) => {
      e.path[1].remove();
    });
  }
}

function filterIngredients(arrayFilteredRecipeIndex) {
  console.log(arrayFilteredRecipeIndex);

  ingredientsDisplay(arrayFilteredRecipeIndex);
}

export { filterIngredients, ingredientsDisplay };
