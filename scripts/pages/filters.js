import { recipes } from "../../data/recipes.js";

setTimeout(() => {
  const ingredientElement = document.querySelectorAll(".ingredients-list li");
  for (let i = 0; i < ingredientElement.length; i++) {
    ingredientElement[i].addEventListener("click", () =>
      addFilterIngredientTag(i, ingredientElement)
    );
  }
}, 300);

function ingredientsDisplay(arrayFilteredRecipeIndex) {
  let ingredientList = document.querySelector(".ingredients-list");
  let ingredientsTags = [];
  let uniqueIngredientsSet = new Set();
  let uniqueIngredientsList = [];
  ingredientList.innerHTML = "";

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];

    let recipe = recipes[recipeIndex];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];

      if (detailsIngredients.quantity) {
        //normaliser les ingrédients et les mettre en minuscule
        let detailsIngredientsNormalize = detailsIngredients.ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        ingredientsTags.push(detailsIngredientsNormalize);
        uniqueIngredientsSet.add(detailsIngredientsNormalize);
      }
    }
  }
  uniqueIngredientsList = Array.from(uniqueIngredientsSet).sort();
  console.log(uniqueIngredientsList);

  for (
    let uniqueIngredient = 0;
    uniqueIngredient < uniqueIngredientsList.length;
    uniqueIngredient++
  ) {
    ingredientList.innerHTML += `<li>${uniqueIngredientsList[uniqueIngredient]}</li>`;
  }
}

function appliancesDisplay(arrayFilteredRecipeIndex) {
  let appliancesList = document.querySelector(".appliances-list");
  let appliancesTags = [];

  let uniqueAppliancesSet = new Set();
  let uniqueAppliancesList = [];
  appliancesList.innerHTML = "";

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];
    let recipe = recipes[recipeIndex];
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

export { filterIngredients, ingredientsDisplay, appliancesDisplay };
